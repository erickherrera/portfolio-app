// ContactMe.tsx
import React, { useState } from 'react';
import { MdEmail, MdPerson, MdBusiness, MdMessage, MdSend } from 'react-icons/md';

interface ContactMeProps {
  title?: string;
  subtitle?: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    foreground: string;
    hero: string;
  };
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
  subtitle = "I'm always interested in hearing about new opportunities. Drop me a message and I'll get back to you as soon as possible!",
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

  return (
    <div className={`max-w-4xl mx-auto px-4 sm:px-6 ${className}`}>
      {/* Header */}
      <div className="text-center mb-12">
        <h2 
          className="text-3xl font-extrabold mb-4"
          style={{ color: colors.foreground }}
        >
          {title}
        </h2>
        <div className="w-20 h-2 mx-auto rounded-full" style={{ backgroundColor: colors.accent }}></div>
        <p 
          className="mt-6 text-lg max-w-2xl mx-auto"
          style={{ color: colors.foreground === '#171717' ? '#6B7280' : '#9CA3AF' }}
        >
          {subtitle}
        </p>
      </div>

      {/* Contact Form */}
      <div 
        className="rounded-2xl p-8 md:p-10 shadow-lg transition-all duration-300"
        style={{
          backgroundColor: colors.foreground === '#171717' ? '#F9FAFB' : '#1F2937',
          border: `2px solid ${colors.accent}`
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
                    borderColor: errors.name ? '#EF4444' : colors.foreground === '#171717' ? '#E5E7EB' : '#374151',
                    borderWidth: '1px',
                    borderStyle: 'solid'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = colors.primary;
                    e.target.style.boxShadow = `0 0 0 3px ${colors.primary}20`;
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = errors.name ? '#EF4444' : colors.foreground === '#171717' ? '#E5E7EB' : '#374151';
                    e.target.style.boxShadow = 'none';
                  }}
                  placeholder="John Doe"
                />
              </div>
              {errors.name && (
                <p className="mt-1 text-sm text-red-500">{errors.name}</p>
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
                    borderColor: errors.email ? '#EF4444' : colors.foreground === '#171717' ? '#E5E7EB' : '#374151',
                    borderWidth: '1px',
                    borderStyle: 'solid'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = colors.primary;
                    e.target.style.boxShadow = `0 0 0 3px ${colors.primary}20`;
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = errors.email ? '#EF4444' : colors.foreground === '#171717' ? '#E5E7EB' : '#374151';
                    e.target.style.boxShadow = 'none';
                  }}
                  placeholder="john@company.com"
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">{errors.email}</p>
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
                  borderColor: colors.foreground === '#171717' ? '#E5E7EB' : '#374151',
                  borderWidth: '1px',
                  borderStyle: 'solid'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = colors.primary;
                  e.target.style.boxShadow = `0 0 0 3px ${colors.primary}20`;
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = colors.foreground === '#171717' ? '#E5E7EB' : '#374151';
                  e.target.style.boxShadow = 'none';
                }}
                placeholder="Awesome Company Inc."
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
                  borderColor: errors.message ? '#EF4444' : colors.foreground === '#171717' ? '#E5E7EB' : '#374151',
                  borderWidth: '1px',
                  borderStyle: 'solid'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = colors.primary;
                  e.target.style.boxShadow = `0 0 0 3px ${colors.primary}20`;
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = errors.message ? '#EF4444' : colors.foreground === '#171717' ? '#E5E7EB' : '#374151';
                  e.target.style.boxShadow = 'none';
                }}
                placeholder="Tell me about your project or opportunity..."
              />
            </div>
            {errors.message && (
              <p className="mt-1 text-sm text-red-500">{errors.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex flex-col items-center space-y-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center px-8 py-3 rounded-lg font-bold text-white transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              style={{
                backgroundColor: isSubmitting ? colors.secondary : colors.primary,
                boxShadow: isSubmitting ? 'none' : `0 4px 14px 0 ${colors.primary}40`
              }}
              onMouseEnter={(e) => {
                if (!isSubmitting) {
                  e.currentTarget.style.backgroundColor = colors.secondary;
                  e.currentTarget.style.boxShadow = `0 6px 20px 0 ${colors.secondary}40`;
                }
              }}
              onMouseLeave={(e) => {
                if (!isSubmitting) {
                  e.currentTarget.style.backgroundColor = colors.primary;
                  e.currentTarget.style.boxShadow = `0 4px 14px 0 ${colors.primary}40`;
                }
              }}
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
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
              <p className="text-green-600 font-medium animate-fade-in">
                ✓ Message sent successfully! I'll get back to you soon.
              </p>
            )}
            {submitStatus === 'error' && (
              <p className="text-red-600 font-medium animate-fade-in">
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
          style={{ color: colors.foreground === '#171717' ? '#6B7280' : '#9CA3AF' }}
        >
          Prefer to reach out directly? Email me at{' '}
          <a 
            href="mailto:erickmherrera@outlook.com" 
            className="font-medium hover:underline transition-colors duration-200"
            style={{ color: colors.primary }}
          >
            erickmherrera@outlook.com
          </a>
        </p>
      </div>

      <style jsx>{`
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