import nodemailer, { type Transporter } from "nodemailer";
import { SITE } from "@/data/site";
import type { ContactFormData } from "@/types";

let transporter: Transporter | null = null;

function getTransporter(): Transporter {
  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_PASSWORD;

  if (!user || !pass) {
    throw new Error("Email credentials are not configured");
  }

  if (!transporter) {
    transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user, pass },
    });
  }

  return transporter;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function notificationEmail({ name, email, company, message }: ContactFormData) {
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeCompany = escapeHtml(company || "Not provided");
  const safeMessage = escapeHtml(message);

  return {
    from: process.env.EMAIL_USER,
    to: SITE.email,
    replyTo: email,
    subject: `New Contact Form Submission from ${name}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #3b5264;">New Contact Form Submission</h2>

        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #51273c; margin-top: 0;">Contact Details</h3>
          <p><strong>Name:</strong> ${safeName}</p>
          <p><strong>Email:</strong> ${safeEmail}</p>
          <p><strong>Company:</strong> ${safeCompany}</p>
        </div>

        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #51273c; margin-top: 0;">Message</h3>
          <p style="line-height: 1.6; white-space: pre-wrap;">${safeMessage}</p>
        </div>

        <div style="margin-top: 30px; padding: 15px; background-color: #e8f4f8; border-radius: 8px;">
          <p style="margin: 0; font-size: 14px; color: #666;">
            This email was sent from your portfolio contact form.
            Reply directly to <strong>${safeEmail}</strong> to respond to ${safeName}.
          </p>
        </div>
      </div>
    `,
  };
}

function confirmationEmail({ email, name, company, message }: ContactFormData) {
  const safeName = escapeHtml(name);
  const safeCompany = escapeHtml(company || "Not provided");
  const safeMessage = escapeHtml(message);

  return {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Thanks for reaching out! - Erick Herrera",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #3b5264;">Thank you for your message, ${safeName}!</h2>

        <p style="font-size: 16px; line-height: 1.6;">
          I've received your message and will get back to you as soon as possible.
          I typically respond within 24-48 hours.
        </p>

        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #51273c; margin-top: 0;">Your Message Summary</h3>
          <p><strong>Company:</strong> ${safeCompany}</p>
          <p><strong>Message:</strong></p>
          <p style="font-style: italic; color: #666; white-space: pre-wrap;">"${safeMessage}"</p>
        </div>

        <p style="font-size: 16px; line-height: 1.6;">
          Best regards,<br>
          <strong>Erick Herrera</strong><br>
          Software Engineer
        </p>

        <div style="margin-top: 30px; padding: 15px; background-color: #e8f4f8; border-radius: 8px;">
          <p style="margin: 0; font-size: 14px; color: #666;">
            You can also reach me directly at:
            <a href="mailto:${SITE.email}" style="color: #3b5264;">${SITE.email}</a>
          </p>
        </div>
      </div>
    `,
  };
}

export async function sendContactEmails(data: ContactFormData): Promise<void> {
  const client = getTransporter();
  await Promise.all([
    client.sendMail(notificationEmail(data)),
    client.sendMail(confirmationEmail(data)),
  ]);
}
