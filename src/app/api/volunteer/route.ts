import { NextResponse } from "next/server";
import { z } from "zod";

const volunteerSchema = z.object({
  fullName: z.string().min(2, "Full name required"),
  email: z.string().email("Valid email required"),
  phone: z.string().optional(),
  city: z.string().optional(),
  areaOfInterest: z.string().min(2, "Area of interest required"),
  availability: z.string().optional(),
  experience: z.string().optional(),
  motivation: z.string().optional(),
  honeypot: z.string().max(0, "Spam detected").optional(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = volunteerSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Validation failed", details: result.error.format() },
        { status: 400 }
      );
    }

    const data = result.data;
    console.log(`[Volunteer Application] Received from: ${data.email} | Focus: ${data.areaOfInterest}`);

    return NextResponse.json(
      {
        success: true,
        message: "Volunteer application recorded successfully for coordinator review.",
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error occurred." },
      { status: 500 }
    );
  }
}
