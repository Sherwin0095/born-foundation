import { NextResponse } from "next/server";
import { z } from "zod";
import {
  checkRateLimit,
  getClientIp,
  isSameOriginOrLocal,
  maskEmail,
} from "@/lib/security";
import { createSupabaseServerClient } from "@/lib/supabase/server";

const volunteerSchema = z.object({
  fullName: z.string().trim().min(2, "Full name required").max(120),
  email: z.string().trim().email("Valid email required").max(160),
  phone: z.string().trim().max(30).optional(),
  city: z.string().trim().max(100).optional(),
  areaOfInterest: z.string().trim().min(2, "Area of interest required").max(120),
  availability: z.string().trim().max(120).optional(),
  experience: z.string().trim().max(1500).optional(),
  motivation: z.string().trim().max(1500).optional(),
  safeguardingAcknowledged: z
    .boolean()
    .refine((v) => v === true, "Safeguarding vetting acknowledgement is required"),
  honeypot: z.string().max(0, "Spam detected").optional(),
});

export async function POST(request: Request) {
  if (!isSameOriginOrLocal(request)) {
    return NextResponse.json({ error: "Cross-origin submission rejected." }, { status: 403 });
  }

  const clientIp = getClientIp(request);
  const rate = checkRateLimit(`volunteer:${clientIp}`, 10, 60_000);
  if (!rate.allowed) {
    return NextResponse.json(
      { error: "Too many submissions. Please wait a moment before trying again." },
      {
        status: 429,
        headers: { "Retry-After": String(rate.retryAfterSeconds) },
      }
    );
  }

  try {
    const body = await request.json();
    const result = volunteerSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Validation failed", details: result.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const data = result.data;
    const supabase = await createSupabaseServerClient();
    if (supabase) {
      const { error: dbError } = await supabase.from("volunteer_applications").insert({
        full_name: data.fullName,
        email: data.email,
        phone: data.phone || null,
        city: data.city || null,
        area_of_interest: data.areaOfInterest,
        availability: data.availability || null,
        experience: data.experience || null,
        motivation: data.motivation || null,
        status: "pending",
      });
      if (dbError) {
        console.error("[Volunteer Application] Database persistence error");
        return NextResponse.json(
          { error: "Unable to record application right now." },
          { status: 500 }
        );
      }
    }

    console.info(
      `[Volunteer Application] Recorded (${maskEmail(data.email)}) | Focus: ${data.areaOfInterest}`
    );

    return NextResponse.json(
      {
        success: true,
        mode: supabase ? "supabase" : "offline_validated",
        message: "Volunteer expression of interest recorded for screening & safeguarding review.",
      },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { error: "Invalid request payload." },
      { status: 400 }
    );
  }
}
