import type { ContactFormData } from "@/types";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type ContactErrors = Partial<Record<keyof ContactFormData, string>>;

export function validateContactForm(
  data: Partial<ContactFormData>
): ContactErrors {
  const errors: ContactErrors = {};

  if (!data.name?.trim()) {
    errors.name = "Name is required";
  }

  if (!data.email?.trim()) {
    errors.email = "Email is required";
  } else if (!EMAIL_REGEX.test(data.email)) {
    errors.email = "Please enter a valid email";
  }

  if (!data.message?.trim()) {
    errors.message = "Message is required";
  }

  return errors;
}

export function hasErrors(errors: ContactErrors): boolean {
  return Object.keys(errors).length > 0;
}

export function isValidEmail(email: string): boolean {
  return EMAIL_REGEX.test(email);
}
