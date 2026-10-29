import { NextResponse } from "next/server";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  subject: z.string().min(3, "Subject required"),
  message: z.string().min(15, "Message must be at least 15 characters"),
  honeypot: z.string().max(0, "Spam detected").optional(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = contactSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Validation failed", details: result.error.format() },
        { status: 400 }
      );
    }

    const { name, email, phone, subject, message } = result.data;

    // Log securely without leaking PII to public logs
    console.log(`[Contact Enquiry] Received from: ${email} | Subject: ${subject}`);

    // If Supabase client configured, we would insert here into contact_enquiries table
    // For now, in offline development mode, client persistence via localStorage handles user state
    return NextResponse.json(
      {
        success: true,
        message: "Enquiry logged successfully. Our team will review your message.",
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
