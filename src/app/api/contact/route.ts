import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Types for the request body
interface ContactFormData {
  name: string;
  email: string;
  company: string;
  message: string;
}

export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const body: ContactFormData = await request.json();
    const { name, email, company, message } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Create transporter for Outlook/Hotmail
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER, // Your Gmail address
        pass: process.env.EMAIL_PASSWORD, // Your Gmail app password
      },
    });


    // Verify connection configuration
    await transporter.verify();

    // Email content for you (the recipient)
    const mailOptionsToYou = {
      from: process.env.EMAIL_USER, // Your email
      to: 'erickmherrera.jobs@outlook.com', // Your jobs email
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #3b5264;">New Contact Form Submission</h2>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #51273c; margin-top: 0;">Contact Details</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Company:</strong> ${company || 'Not provided'}</p>
          </div>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #51273c; margin-top: 0;">Message</h3>
            <p style="line-height: 1.6; white-space: pre-wrap;">${message}</p>
          </div>
          
          <div style="margin-top: 30px; padding: 15px; background-color: #e8f4f8; border-radius: 8px;">
            <p style="margin: 0; font-size: 14px; color: #666;">
              This email was sent from your portfolio contact form.
              You can reply directly to <strong>${email}</strong> to respond to ${name}.
            </p>
          </div>
        </div>
      `,
      replyTo: email // This allows you to reply directly to the sender
    };

    // Email confirmation for the sender
    const mailOptionsToSender = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Thanks for reaching out! - Erick Herrera',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #3b5264;">Thank you for your message, ${name}!</h2>
          
          <p style="font-size: 16px; line-height: 1.6;">
            I've received your message and will get back to you as soon as possible. 
            I typically respond within 24-48 hours.
          </p>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #51273c; margin-top: 0;">Your Message Summary</h3>
            <p><strong>Company:</strong> ${company || 'Not provided'}</p>
            <p><strong>Message:</strong></p>
            <p style="font-style: italic; color: #666; white-space: pre-wrap;">"${message}"</p>
          </div>
          
          <p style="font-size: 16px; line-height: 1.6;">
            Best regards,<br>
            <strong>Erick Herrera</strong><br>
            Software Engineer
          </p>
          
          <div style="margin-top: 30px; padding: 15px; background-color: #e8f4f8; border-radius: 8px;">
            <p style="margin: 0; font-size: 14px; color: #666;">
              You can also reach me directly at: 
              <a href="mailto:erickmherrera.jobs@outlook.com" style="color: #3b5264;">erickmherrera.jobs@outlook.com</a>
            </p>
          </div>
        </div>
      `
    };

    // Send both emails
    await Promise.all([
      transporter.sendMail(mailOptionsToYou),
      transporter.sendMail(mailOptionsToSender)
    ]);

    return NextResponse.json(
      { 
        message: 'Email sent successfully',
        success: true 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error sending email:', error);
    
    // Return different error messages based on the error type
    let errorMessage = 'Failed to send email';
    
    if (error instanceof Error) {
      // Don't expose sensitive error details in production
      if (process.env.NODE_ENV === 'development') {
        errorMessage = error.message;
      }
    }

    return NextResponse.json(
      { 
        error: errorMessage,
        success: false 
      },
      { status: 500 }
    );
  }
}