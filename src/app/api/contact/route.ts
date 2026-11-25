import { NextResponse } from "next/server";
import { z } from "zod";
import {
  checkRateLimit,
  getClientIp,
  isSameOriginOrLocal,
  maskEmail,
} from "@/lib/security";
import { createSupabaseServerClient } from "@/lib/supabase/server";

const contactSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(120),
  email: z.string().trim().email("Invalid email address").max(160),
  phone: z.string().trim().max(30).optional(),
  subject: z.string().trim().min(3, "Subject required").max(150),
  message: z.string().trim().min(15, "Message must be at least 15 characters").max(3000),
  honeypot: z.string().max(0, "Spam detected").optional(),
});

export async function POST(request: Request) {
  if (!isSameOriginOrLocal(request)) {
    return NextResponse.json({ error: "Cross-origin submission rejected." }, { status: 403 });
  }

  const clientIp = getClientIp(request);
  const rate = checkRateLimit(`contact:${clientIp}`, 10, 60_000);
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
    const result = contactSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Validation failed", details: result.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { name, email, phone, subject, message } = result.data;

    const supabase = await createSupabaseServerClient();
    if (supabase) {
      const { error: dbError } = await supabase.from("contact_enquiries").insert({
        name,
        email,
        phone: phone || null,
        subject,
        message,
        status: "new",
      });
      if (dbError) {
        console.error("[Contact Enquiry] Database persistence error");
        return NextResponse.json(
          { error: "Unable to record enquiry right now. Please try telephone contact." },
          { status: 500 }
        );
      }
    }

    console.info(`[Contact Enquiry] Logged (${maskEmail(email)}) | Subject: ${subject}`);

    return NextResponse.json(
      {
        success: true,
        mode: supabase ? "supabase" : "offline_validated",
        message: "Enquiry logged successfully. Our team will review your message.",
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
