"use client";

import { useCallback, useState } from "react";
import { site } from "@/lib/data";
import {
  filterFieldInput,
  isFieldValid,
  isFormSubmittable,
  sanitizeLeadPayload,
  validateLeadForm,
  type LeadField,
} from "@/lib/form-validation";
import { submitLead } from "@/lib/submit-lead";
import { fieldInputClass, ValidatedField } from "@/components/forms/ValidatedField";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";

type FormValues = {
  name: string;
  email: string;
  phone: string;
  message: string;
  website: string;
};

export function ContactForm() {
  const [values, setValues] = useState<FormValues>({
    name: "",
    email: "",
    phone: "",
    message: "",
    website: "",
  });
  const [touched, setTouched] = useState<Partial<Record<LeadField, boolean>>>({});
  const [errors, setErrors] = useState<Partial<Record<LeadField, string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const validateField = useCallback((field: LeadField, nextValues: FormValues) => {
    const fieldErrors = validateLeadForm(
      {
        name: nextValues.name,
        email: nextValues.email,
        phone: nextValues.phone,
        message: nextValues.message,
      },
      { requireMessage: false }
    );
    setErrors((prev) => ({ ...prev, [field]: fieldErrors[field] }));
  }, []);

  const handleChange = (field: LeadField, value: string) => {
    const filtered = filterFieldInput(field, value);
    const next = { ...values, [field]: filtered };
    setValues(next);
    if (touched[field]) validateField(field, next);
    setSubmitError(null);
  };

  const handleBlur = (field: LeadField) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    validateField(field, values);
  };

  const handlePhoneChange = (value: string) => {
    handleChange("phone", value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;

    setTouched({ name: true, email: true, phone: true, message: true });

    const payload = sanitizeLeadPayload({
      ...values,
      source: "contact",
    });

    const fieldErrors = validateLeadForm(payload, { requireMessage: false });
    setErrors(fieldErrors);
    if (!isFormSubmittable(payload, { requireMessage: false })) return;

    setSubmitting(true);
    setSubmitError(null);

    const result = await submitLead(payload);
    setSubmitting(false);

    if (!result.success) {
      if (result.errors) setErrors((prev) => ({ ...prev, ...result.errors }));
      setSubmitError(result.error ?? "Submission failed. Please try again.");
      return;
    }

    setSubmitted(true);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="h-full space-y-3.5 rounded-2xl border border-border-light bg-white p-4 shadow-[var(--shadow-soft)] md:space-y-4 md:rounded-3xl md:p-8"
      noValidate
    >
      <h3 className="font-display text-base font-semibold text-ink md:text-xl">Send us a message</h3>

        <input
          type="text"
          name="website"
          value={values.website}
          onChange={(e) => setValues((prev) => ({ ...prev, website: e.target.value }))}
          className="hidden"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden
        />

        {submitted ? (
          <div className="space-y-4 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-700">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="text-sm leading-relaxed text-text-muted">
              Thank you. We&apos;ll respond within 24 hours on business days. For urgent enquiries:
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <a href={`tel:${site.phone}`} className="btn-accent cursor-pointer text-sm">
                Call {site.phone}
              </a>
              <a
                href={`https://wa.me/${site.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-[#25D366]/40 bg-[#25D366]/10 text-[#1a9e4a] transition-colors hover:bg-[#25D366]/20"
                aria-label="WhatsApp"
              >
                <WhatsAppIcon />
              </a>
            </div>
          </div>
        ) : (
          <>
            <ValidatedField
              id="contact-name"
              label="Name"
              required
              error={errors.name}
              touched={touched.name}
              valid={isFieldValid("name", values.name)}
            >
              <input
                id="contact-name"
                type="text"
                placeholder="Name*"
                value={values.name}
                onChange={(e) => handleChange("name", e.target.value)}
                onBlur={() => handleBlur("name")}
                onPaste={(e) => {
                  e.preventDefault();
                  handleChange("name", values.name + e.clipboardData.getData("text"));
                }}
                autoComplete="name"
                aria-invalid={Boolean(touched.name && errors.name)}
                className={fieldInputClass(
                  "popup-form-input text-base md:text-sm",
                  touched.name,
                  errors.name,
                  isFieldValid("name", values.name),
                  true
                )}
              />
            </ValidatedField>

            <ValidatedField
              id="contact-email"
              label="Email"
              required
              error={errors.email}
              touched={touched.email}
              valid={isFieldValid("email", values.email)}
            >
              <input
                id="contact-email"
                type="email"
                placeholder="Email*"
                value={values.email}
                onChange={(e) => handleChange("email", e.target.value)}
                onBlur={() => handleBlur("email")}
                aria-invalid={Boolean(touched.email && errors.email)}
                className={fieldInputClass(
                  "popup-form-input text-base md:text-sm",
                  touched.email,
                  errors.email,
                  isFieldValid("email", values.email),
                  true
                )}
              />
            </ValidatedField>

            <ValidatedField
              id="contact-phone"
              label="Phone Number"
              required
              error={errors.phone}
              touched={touched.phone}
              valid={isFieldValid("phone", values.phone)}
            >
              <input
                id="contact-phone"
                type="tel"
                inputMode="numeric"
                pattern="[6-9][0-9]{9}"
                placeholder="Phone Number*"
                value={values.phone}
                onChange={(e) => handlePhoneChange(e.target.value)}
                onBlur={() => handleBlur("phone")}
                autoComplete="tel"
                aria-invalid={Boolean(touched.phone && errors.phone)}
                className={fieldInputClass(
                  "popup-form-input text-base md:text-sm",
                  touched.phone,
                  errors.phone,
                  isFieldValid("phone", values.phone),
                  true
                )}
              />
            </ValidatedField>

            <ValidatedField
              id="contact-message"
              label="Message"
              error={errors.message}
              touched={touched.message}
              valid={isFieldValid("message", values.message)}
            >
              <textarea
                id="contact-message"
                placeholder="Your Message (optional)"
                rows={4}
                value={values.message}
                onChange={(e) => handleChange("message", e.target.value)}
                onBlur={() => handleBlur("message")}
                aria-invalid={Boolean(touched.message && errors.message)}
                className={fieldInputClass(
                  "popup-form-input text-base md:text-sm",
                  touched.message,
                  errors.message,
                  isFieldValid("message", values.message)
                )}
              />
            </ValidatedField>

            {submitError && (
              <p className="text-center text-xs text-red-600" role="alert">
                {submitError}
              </p>
            )}

            <button
              type="submit"
              disabled={
                submitting ||
                !isFormSubmittable(
                  sanitizeLeadPayload({
                    name: values.name,
                    email: values.email,
                    phone: values.phone,
                    message: values.message,
                    source: "contact",
                  }),
                  { requireMessage: false }
                )
              }
              className="btn-accent w-full cursor-pointer py-3 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-70 md:w-auto md:py-2.5"
            >
              {submitting ? (
                <span className="inline-flex items-center gap-2">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  Sending...
                </span>
              ) : (
                "Send message"
              )}
            </button>
          </>
        )}
      </form>
  );
}
