// ContactMe.tsx
"use client";

import React, { useState } from 'react';
import { MdEmail, MdPerson, MdBusiness, MdMessage, MdSend } from 'react-icons/md';
import SectionHeading from './SectionHeading';
import { ThemeColors } from '../types/theme';

interface ContactMeProps {
  title?: string;
  subtitle?: string;
  colors: ThemeColors;
  onSubmit?: (formData: ContactFormData) => void;
  className?: string;
}

interface ContactFormData {
  name: string;
  email: string;
  company: string;
  message: string;
}

const ContactMe: React.FC<ContactMeProps> = ({
  title = "Get In Touch",
  subtitle = "I'm always interested in hearing about new opportunities. \n Drop me a message and I'll get back to you as soon as possible!",
  colors,
  onSubmit,
  className = ""
}) => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    company: '',
    message: ''
  });

  const [errors, setErrors] = useState<Partial<ContactFormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // Validate email format
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Validate form
  const validateForm = () => {
    const newErrors: Partial<ContactFormData> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error for this field when user starts typing
    if (errors[name as keyof ContactFormData]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // If custom onSubmit handler is provided, use it
      if (onSubmit) {
        await onSubmit(formData);
      } else {
        // Default behavior: log to console (replace with your email service)
        console.log('Form submitted:', formData);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
      }

      setSubmitStatus('success');
      // Reset form
      setFormData({
        name: '',
        email: '',
        company: '',
        message: ''
      });
    } catch (error) {
      setSubmitStatus('error');
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Split subtitle by newline characters and render each line
  const renderSubtitle = () => {
    const lines = subtitle.split('\n').map(line => line.trim()).filter(line => line.length > 0);
    
    return (
      <div className="mt-6 text-lg max-w-xl mx-auto">
        {lines.map((line, index) => (
          <p 
            key={index}
            className={index > 0 ? "mt-2" : ""}
            style={{ color: colors.foreground }}
          >
            {line}
          </p>
        ))}
      </div>
    );
  };

  return (
    <div className={`max-w-3xl mx-auto px-4 sm:px-6 ${className}`}>
      {/* Header */}
      <div className="text-center mb-12">
        <SectionHeading title={title} />
        {renderSubtitle()}
      </div>

      {/* Contact Form */}
      <div 
        className="rounded-2xl p-8 md:p-10 shadow-lg transition-all duration-300 clip-corner"
        style={{
          backgroundColor: colors.surface,
          border: `2px solid ${colors.border}`,
          boxShadow: `0 0 40px -18px ${colors.glow}`
        }}
      >
        <form onSubmit={handleSubmit} className="space-y-6">
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
                  className="w-full pl-10 pr-3 py-3 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2"
                  style={{
                    backgroundColor: colors.background,
                    color: colors.foreground,
                    borderColor: errors.name ? colors.danger : colors.borderStrong,
                    borderWidth: '1px',
                    borderStyle: 'solid'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = colors.primary;
                    e.target.style.boxShadow = `0 0 0 3px ${colors.primary}20`;
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = errors.name ? colors.danger : colors.borderStrong;
                    e.target.style.boxShadow = 'none';
                  }}
                  placeholder="Full Name"
                />
              </div>
              {errors.name && (
                <p className="mt-1 text-sm" style={{ color: colors.danger }}>{errors.name}</p>
              )}
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
                  className="w-full pl-10 pr-3 py-3 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2"
                  style={{
                    backgroundColor: colors.background,
                    color: colors.foreground,
                    borderColor: errors.email ? colors.danger : colors.borderStrong,
                    borderWidth: '1px',
                    borderStyle: 'solid'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = colors.primary;
                    e.target.style.boxShadow = `0 0 0 3px ${colors.primary}20`;
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = errors.email ? colors.danger : colors.borderStrong;
                    e.target.style.boxShadow = 'none';
                  }}
                  placeholder="email@company.com"
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm" style={{ color: colors.danger }}>{errors.email}</p>
              )}
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
                className="w-full pl-10 pr-3 py-3 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2"
                style={{
                  backgroundColor: colors.background,
                  color: colors.foreground,
                  borderColor: colors.borderStrong,
                  borderWidth: '1px',
                  borderStyle: 'solid'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = colors.primary;
                  e.target.style.boxShadow = `0 0 0 3px ${colors.primary}20`;
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = colors.borderStrong;
                  e.target.style.boxShadow = 'none';
                }}
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
                className="w-full pl-10 pr-3 py-3 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 resize-none"
                style={{
                  backgroundColor: colors.background,
                  color: colors.foreground,
                  borderColor: errors.message ? colors.danger : colors.borderStrong,
                  borderWidth: '1px',
                  borderStyle: 'solid'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = colors.primary;
                  e.target.style.boxShadow = `0 0 0 3px ${colors.primary}20`;
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = errors.message ? colors.danger : colors.borderStrong;
                  e.target.style.boxShadow = 'none';
                }}
                placeholder="Send me a message!"
              />
            </div>
            {errors.message && (
              <p className="mt-1 text-sm" style={{ color: colors.danger }}>{errors.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex flex-col items-center space-y-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center px-8 py-3 rounded-lg font-bold transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none focus-visible:ring-2 focus-visible:ring-offset-2"
              style={{
                backgroundColor: isSubmitting ? colors.secondary : colors.accent,
                color: isSubmitting ? colors.onSecondary : colors.onAccent,
                boxShadow: isSubmitting ? 'none' : `0 4px 14px -4px ${colors.accent}66`,
                outlineColor: colors.focus
              }}
              onMouseEnter={(e) => {
                if (!isSubmitting) {
                  e.currentTarget.style.backgroundColor = colors.primary;
                  e.currentTarget.style.color = colors.onPrimary;
                  e.currentTarget.style.boxShadow = `0 6px 20px -6px ${colors.glow}`;
                }
              }}
              onMouseLeave={(e) => {
                if (!isSubmitting) {
                  e.currentTarget.style.backgroundColor = colors.accent;
                  e.currentTarget.style.color = colors.onAccent;
                  e.currentTarget.style.boxShadow = `0 4px 14px -4px ${colors.accent}66`;
                }
              }}
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-current mr-3"></div>
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
            {submitStatus === 'success' && (
              <p className="font-medium animate-fade-in" style={{ color: colors.success }}>
                ✓ Message sent successfully! I&apos;ll get back to you soon.
              </p>
            )}
            {submitStatus === 'error' && (
              <p className="font-medium animate-fade-in" style={{ color: colors.danger }}>
                ✗ Something went wrong. Please try again or email me directly.
              </p>
            )}
          </div>
        </form>
      </div>

      {/* Alternative Contact Methods */}
      <div className="mt-12 text-center">
        <p 
          className="text-sm"
          style={{ color: colors.muted }}
        >
          Prefer to reach out directly? Email me at{' '}
          <a 
            href="mailto:erickmherrera@outlook.com" 
            className="font-medium hover:underline transition-colors duration-200"
            style={{ color: colors.accent }}
          >
            erickmherrera@outlook.com
          </a>
        </p>
      </div>

      <style jsx>{`
          textarea::placeholder {
          color: ${colors.muted} !important;
          opacity: 1;
        }
        
        input::placeholder {
          color: ${colors.muted} !important;
          opacity: 1;
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

export default ContactMe;