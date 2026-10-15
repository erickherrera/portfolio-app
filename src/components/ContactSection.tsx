"use client";

import React, { useState } from "react";
import { MdEmail, MdPerson, MdBusiness, MdMessage, MdSend } from "react-icons/md";
import { useTheme } from "@/components/ThemeProvider";
import { SITE } from "@/data/site";
import { validateContactForm, type ContactErrors } from "@/lib/validation";
import type { ContactFormData } from "@/types";

interface ContactSectionProps {
  title?: string;
  subtitle?: string;
  className?: string;
}

const EMPTY_FORM: ContactFormData = {
  name: "",
  email: "",
  company: "",
  message: "",
};

const ContactSection: React.FC<ContactSectionProps> = ({
  title = "Get In Touch",
  subtitle = "I'm always interested in hearing about new opportunities. \n Drop me a message and I'll get back to you as soon as possible!",
  className = "",
}) => {
  const { colors } = useTheme();
  const [formData, setFormData] = useState<ContactFormData>(EMPTY_FORM);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">(
    "idle"
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => {
      if (!prev[name as keyof ContactFormData]) return prev;
      const next = { ...prev };
      delete next[name as keyof ContactFormData];
      return next;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors = validateContactForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      setSubmitStatus("success");
      setFormData(EMPTY_FORM);
    } catch (error) {
      console.error("Error submitting contact form:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputStyle = (hasError: boolean): React.CSSProperties => ({
    backgroundColor: colors.background,
    color: colors.foreground,
    border: `1px solid ${hasError ? "#EF4444" : colors.border}`,
  });

  const handleFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.target.style.borderColor = colors.primary;
    e.target.style.boxShadow = `0 0 0 3px ${colors.primary}20`;
  };

  const handleBlur =
    (hasError: boolean) =>
    (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      e.target.style.borderColor = hasError ? "#EF4444" : colors.border;
      e.target.style.boxShadow = "none";
    };

  const fieldClassName =
    "w-full pl-10 pr-3 py-3 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2";

  return (
    <div className={`max-w-3xl mx-auto px-4 sm:px-6 ${className}`}>
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="text-3xl font-extrabold mb-4" style={{ color: colors.foreground }}>
          {title}
        </h2>
        <div className="w-20 h-2 mx-auto rounded-full" style={{ backgroundColor: colors.accent }} />
        <div className="mt-6 text-lg max-w-xl mx-auto">
          {subtitle
            .split("\n")
            .map((line) => line.trim())
            .filter(Boolean)
            .map((line, index) => (
              <p
                key={line}
                className={index > 0 ? "mt-2" : ""}
                style={{ color: colors.foreground }}
              >
                {line}
              </p>
            ))}
        </div>
      </div>

      {/* Contact Form */}
      <div
        className="rounded-2xl p-8 md:p-10 shadow-lg transition-all duration-300"
        style={{
          backgroundColor: colors.surface,
          border: `2px solid ${colors.accent}`,
        }}
      >
        <form onSubmit={handleSubmit} className="space-y-6" noValidate>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name Field */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium mb-2"
                style={{ color: colors.foreground }}
              >
                Name *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MdPerson style={{ color: colors.secondary }} className="text-xl" />
                </div>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={fieldClassName}
                  style={inputStyle(Boolean(errors.name))}
                  onFocus={handleFocus}
                  onBlur={handleBlur(Boolean(errors.name))}
                  placeholder="Full Name"
                  aria-invalid={Boolean(errors.name)}
                />
              </div>
              {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
            </div>

            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium mb-2"
                style={{ color: colors.foreground }}
              >
                Email *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MdEmail style={{ color: colors.secondary }} className="text-xl" />
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={fieldClassName}
                  style={inputStyle(Boolean(errors.email))}
                  onFocus={handleFocus}
                  onBlur={handleBlur(Boolean(errors.email))}
                  placeholder="email@company.com"
                  aria-invalid={Boolean(errors.email)}
                />
              </div>
              {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
            </div>
          </div>

          {/* Company Field */}
          <div>
            <label
              htmlFor="company"
              className="block text-sm font-medium mb-2"
              style={{ color: colors.foreground }}
            >
              Company (Optional)
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MdBusiness style={{ color: colors.secondary }} className="text-xl" />
              </div>
              <input
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                className={fieldClassName}
                style={inputStyle(false)}
                onFocus={handleFocus}
                onBlur={handleBlur(false)}
                placeholder="Company Name"
              />
            </div>
          </div>

          {/* Message Field */}
          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium mb-2"
              style={{ color: colors.foreground }}
            >
              Message *
            </label>
            <div className="relative">
              <div className="absolute top-3 left-3 pointer-events-none">
                <MdMessage style={{ color: colors.secondary }} className="text-xl" />
              </div>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={5}
                className={`${fieldClassName} resize-none`}
                style={inputStyle(Boolean(errors.message))}
                onFocus={handleFocus}
                onBlur={handleBlur(Boolean(errors.message))}
                placeholder="Send me a message!"
                aria-invalid={Boolean(errors.message)}
              />
            </div>
            {errors.message && <p className="mt-1 text-sm text-red-500">{errors.message}</p>}
          </div>

          {/* Submit Button */}
          <div className="flex flex-col items-center space-y-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center px-8 py-3 rounded-lg font-bold text-white transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              style={{
                backgroundColor: isSubmitting ? colors.secondary : colors.accent,
                boxShadow: isSubmitting ? "none" : `0 4px 14px 0 ${colors.accent}40`,
              }}
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3" />
                  Sending...
                </>
              ) : (
                <>
                  <MdSend className="mr-2 text-xl" />
                  Send Message
                </>
              )}
            </button>

            {/* Status Messages */}
            <div role="status" aria-live="polite">
              {submitStatus === "success" && (
                <p className="text-green-600 font-medium animate-fade-in">
                  ✓ Message sent successfully! I&apos;ll get back to you soon.
                </p>
              )}
              {submitStatus === "error" && (
                <p className="text-red-600 font-medium animate-fade-in">
                  ✗ Something went wrong. Please try again or email me directly.
                </p>
              )}
            </div>
          </div>
        </form>
      </div>

      {/* Alternative Contact Methods */}
      <div className="mt-12 text-center">
        <p className="text-sm" style={{ color: colors.textMuted }}>
          Prefer to reach out directly? Email me at{" "}
          <a
            href={`mailto:${SITE.email}`}
            className="font-medium hover:underline transition-colors duration-200"
            style={{ color: colors.accent }}
          >
            {SITE.email}
          </a>
        </p>
      </div>

      <style jsx>{`
        textarea::placeholder,
        input::placeholder {
          color: ${colors.foreground} !important;
          opacity: 0.6;
        }

        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default ContactSection;
