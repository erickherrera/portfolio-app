import { NextResponse } from "next/server";
import { sendContactEmails } from "@/lib/contact";
import { getClientIp, rateLimit } from "@/lib/rate-limit";
import { hasErrors, validateContactForm } from "@/lib/validation";
import type { ContactFormData } from "@/types";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const ip = getClientIp(request.headers);
  const { allowed, retryAfterMs } = rateLimit(`contact:${ip}`);

  if (!allowed) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      {
        status: 429,
        headers: { "Retry-After": String(Math.ceil(retryAfterMs / 1000)) },
      }
    );
  }

  let body: Partial<ContactFormData>;
  try {
    body = (await request.json()) as Partial<ContactFormData>;
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const data: ContactFormData = {
    name: (body.name ?? "").trim(),
    email: (body.email ?? "").trim(),
    company: (body.company ?? "").trim(),
    message: (body.message ?? "").trim(),
  };

  const errors = validateContactForm(data);
  if (hasErrors(errors)) {
    return NextResponse.json(
      { error: "Validation failed", errors },
      { status: 400 }
    );
  }

  try {
    await sendContactEmails(data);
    return NextResponse.json({
      success: true,
      message: "Email sent successfully",
    });
  } catch (error) {
    console.error("Error sending contact email:", error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
