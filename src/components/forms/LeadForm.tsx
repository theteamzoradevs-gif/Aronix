"use client";

import { useCallback, useState } from "react";
import { products } from "@/lib/data";
import { site } from "@/lib/data";
import {
  filterFieldInput,
  isFieldValid,
  isFormSubmittable,
  sanitizeLeadPayload,
  validateLeadForm,
  type LeadField,
  type LeadFormPayload,
} from "@/lib/form-validation";
import { submitLead } from "@/lib/submit-lead";
import { cn } from "@/lib/utils";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { fieldInputClass, ValidatedField } from "@/components/forms/ValidatedField";

type LeadFormVariant = "hero" | "popup" | "modal";

interface LeadFormProps {
  variant?: LeadFormVariant;
  source?: string;
  showProductSelect?: boolean;
  initialMessage?: string;
  className?: string;
  onSuccess?: () => void;
}

type FormValues = {
  name: string;
  email: string;
  phone: string;
  product: string;
  message: string;
  website: string;
};

type FormErrors = Partial<Record<LeadField, string>>;

const initialValues = (message = ""): FormValues => ({
  name: "",
  email: "",
  phone: "",
  product: "",
  message,
  website: "",
});

export function LeadForm({
  variant = "modal",
  source = "website",
  showProductSelect = false,
  initialMessage = "",
  className,
  onSuccess,
}: LeadFormProps) {
  const [values, setValues] = useState<FormValues>(() => initialValues(initialMessage));
  const [touched, setTouched] = useState<Partial<Record<LeadField, boolean>>>({});
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const isHero = variant === "hero";
  const inputClass = isHero ? "hero-form-input" : "popup-form-input";
  const submitLabel = isHero ? "Get free quote" : "Get quote";

  const validateField = useCallback((field: LeadField, nextValues: FormValues) => {
    const payload: LeadFormPayload = {
      name: nextValues.name,
      email: nextValues.email,
      phone: nextValues.phone,
      message: nextValues.message,
    };
    const fieldErrors = validateLeadForm(payload);
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

    const allTouched: Partial<Record<LeadField, boolean>> = {
      name: true,
      email: true,
      phone: true,
      message: true,
    };
    setTouched(allTouched);

    const payload = sanitizeLeadPayload({
      name: values.name,
      email: values.email,
      phone: values.phone,
      message: values.message,
      product: values.product || undefined,
      source,
      website: values.website,
    });

    const fieldErrors = validateLeadForm(payload);
    setErrors(fieldErrors);
    if (!isFormSubmittable(payload)) return;

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
    onSuccess?.();
  };

  if (submitted) {
    return (
      <div className={cn("space-y-4 text-center", className)}>
        <div
          className={cn(
            "mx-auto flex h-12 w-12 items-center justify-center rounded-full",
            isHero ? "bg-accent/20 text-accent" : "bg-green-100 text-green-700"
          )}
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <p className={cn("text-sm leading-relaxed", isHero ? "text-white/80" : "text-text-muted")}>
          Thank you! We&apos;ll respond within 24 hours on business days.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <a
            href={`tel:${site.phone}`}
            className={cn("btn-accent cursor-pointer text-sm", isHero && "!text-text")}
          >
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
    );
  }

  return (
    <form onSubmit={handleSubmit} className={cn("space-y-3", className)} noValidate>
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

      <ValidatedField
        id={`${variant}-name`}
        label="Name"
        error={errors.name}
        touched={touched.name}
        valid={isFieldValid("name", values.name)}
      >
        <input
          id={`${variant}-name`}
          type="text"
          placeholder="Your Name"
          value={values.name}
          onChange={(e) => handleChange("name", e.target.value)}
          onBlur={() => handleBlur("name")}
          onPaste={(e) => {
            e.preventDefault();
            const text = e.clipboardData.getData("text");
            handleChange("name", values.name + text);
          }}
          autoComplete="name"
          aria-invalid={Boolean(touched.name && errors.name)}
          aria-describedby={errors.name ? `${variant}-name-error` : undefined}
          className={fieldInputClass(
            inputClass,
            touched.name,
            errors.name,
            isFieldValid("name", values.name),
            true
          )}
        />
      </ValidatedField>

      <ValidatedField
        id={`${variant}-email`}
        label="Email"
        error={errors.email}
        touched={touched.email}
        valid={isFieldValid("email", values.email)}
      >
        <input
          id={`${variant}-email`}
          type="email"
          placeholder="Your Email"
          value={values.email}
          onChange={(e) => handleChange("email", e.target.value)}
          onBlur={() => handleBlur("email")}
          aria-invalid={Boolean(touched.email && errors.email)}
          className={fieldInputClass(
            inputClass,
            touched.email,
            errors.email,
            isFieldValid("email", values.email),
            true
          )}
        />
      </ValidatedField>

      <ValidatedField
        id={`${variant}-phone`}
        label="Phone Number"
        error={errors.phone}
        touched={touched.phone}
        valid={isFieldValid("phone", values.phone)}
      >
        <input
          id={`${variant}-phone`}
          type="tel"
          inputMode="numeric"
          pattern="[6-9][0-9]{9}"
          placeholder="Phone Number"
          value={values.phone}
          onChange={(e) => handlePhoneChange(e.target.value)}
          onBlur={() => handleBlur("phone")}
          autoComplete="tel"
          aria-invalid={Boolean(touched.phone && errors.phone)}
          className={fieldInputClass(
            inputClass,
            touched.phone,
            errors.phone,
            isFieldValid("phone", values.phone),
            true
          )}
        />
      </ValidatedField>

      {showProductSelect && (
        <select
          value={values.product}
          onChange={(e) => setValues((prev) => ({ ...prev, product: e.target.value }))}
          className={cn(inputClass, "cursor-pointer")}
        >
          <option value="">Select product (optional)</option>
          {products.map((product) => (
            <option key={product.slug} value={product.slug}>
              {product.title}
            </option>
          ))}
        </select>
      )}

      <ValidatedField
        id={`${variant}-message`}
        label="Message"
        error={errors.message}
        touched={touched.message}
        valid={isFieldValid("message", values.message)}
      >
        <textarea
          id={`${variant}-message`}
          placeholder="Your Message"
          rows={isHero ? 3 : 4}
          value={values.message}
          onChange={(e) => handleChange("message", e.target.value)}
          onBlur={() => handleBlur("message")}
          aria-invalid={Boolean(touched.message && errors.message)}
          className={fieldInputClass(
            inputClass,
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
        disabled={submitting || !isFormSubmittable(sanitizeLeadPayload({
          name: values.name,
          email: values.email,
          phone: values.phone,
          message: values.message,
        }))}
        className={cn(
          "w-full cursor-pointer rounded-full px-6 py-3 text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-70",
          isHero
            ? "bg-accent text-ink hover:bg-accent/90"
            : "btn-accent !w-full"
        )}
      >
        {submitting ? (
          <span className="inline-flex items-center justify-center gap-2">
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
            Sending...
          </span>
        ) : (
          submitLabel
        )}
      </button>
    </form>
  );
}
