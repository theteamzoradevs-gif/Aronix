export const FORM_PATTERNS = {
  name: /^[A-Za-z ]{2,50}$/,
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  phone: /^[6-9]\d{9}$/,
} as const;

export const FORM_LIMITS = {
  name: { min: 2, max: 50 },
  message: { min: 10, max: 500 },
  company: { max: 100 },
} as const;

export type LeadField = "name" | "email" | "phone" | "message" | "company";

export interface LeadFormPayload {
  name: string;
  email: string;
  phone: string;
  message: string;
  company?: string;
  product?: string;
  source?: string;
  website?: string;
}

export function sanitizeInput(value: string): string {
  return value
    .trim()
    .replace(/[<>]/g, "")
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "");
}

/** Strip disallowed characters as the user types — invalid keys never appear in the field. */
export function filterNameInput(value: string): string {
  return value.replace(/[^A-Za-z ]/g, "").slice(0, FORM_LIMITS.name.max);
}

export function filterEmailInput(value: string): string {
  return value.replace(/[^\w.@+-]/g, "").slice(0, 100);
}

export function filterPhoneInput(value: string): string {
  const digits = value.replace(/\D/g, "");
  if (!digits) return "";
  if (!/^[6-9]/.test(digits)) return "";
  return digits.slice(0, 10);
}

export function filterMessageInput(value: string): string {
  return value
    .replace(/[<>]/g, "")
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "")
    .slice(0, FORM_LIMITS.message.max);
}

export function filterCompanyInput(value: string): string {
  return value.replace(/[<>]/g, "").slice(0, FORM_LIMITS.company.max);
}

export function filterFieldInput(field: LeadField, value: string): string {
  switch (field) {
    case "name":
      return filterNameInput(value);
    case "email":
      return filterEmailInput(value);
    case "phone":
      return filterPhoneInput(value);
    case "message":
      return filterMessageInput(value);
    case "company":
      return filterCompanyInput(value);
    default:
      return value;
  }
}

export function isFormSubmittable(
  data: LeadFormPayload,
  options: { requireMessage?: boolean } = {}
): boolean {
  return Object.keys(validateLeadForm(data, { requireMessage: false, ...options })).length === 0;
}

export function sanitizeLeadPayload(data: LeadFormPayload): LeadFormPayload {
  return {
    name: sanitizeInput(data.name),
    email: sanitizeInput(data.email).toLowerCase(),
    phone: sanitizeInput(data.phone).replace(/\D/g, ""),
    message: sanitizeInput(data.message),
    company: data.company ? sanitizeInput(data.company) : undefined,
    product: data.product ? sanitizeInput(data.product) : undefined,
    source: data.source ? sanitizeInput(data.source) : undefined,
    website: data.website ? sanitizeInput(data.website) : undefined,
  };
}

export function validateName(value: string): string | null {
  const trimmed = sanitizeInput(value);
  if (!trimmed) return "Name is required.";
  if (trimmed.length < FORM_LIMITS.name.min) return "Name must be at least 2 characters.";
  if (trimmed.length > FORM_LIMITS.name.max) return "Name must be at most 50 characters.";
  if (!FORM_PATTERNS.name.test(trimmed)) return "Name can only contain letters and spaces.";
  return null;
}

export function validateEmail(value: string): string | null {
  const trimmed = sanitizeInput(value);
  if (!trimmed) return "Email is required.";
  if (!FORM_PATTERNS.email.test(trimmed)) return "Enter a valid email address.";
  return null;
}

export function validatePhone(value: string): string | null {
  const digits = sanitizeInput(value).replace(/\D/g, "");
  if (!digits) return "Phone number is required.";
  if (!FORM_PATTERNS.phone.test(digits)) return "Enter a valid 10-digit Indian mobile number.";
  return null;
}

export function validateMessage(value: string): string | null {
  const trimmed = sanitizeInput(value);
  if (!trimmed) return "Message is required.";
  if (trimmed.length < FORM_LIMITS.message.min) return "Message must be at least 10 characters.";
  if (trimmed.length > FORM_LIMITS.message.max) return "Message must be at most 500 characters.";
  return null;
}

export function validateCompany(value: string): string | null {
  const trimmed = sanitizeInput(value);
  if (!trimmed) return null;
  if (trimmed.length > FORM_LIMITS.company.max) return "Company name must be at most 100 characters.";
  return null;
}

export function validateLeadForm(
  data: LeadFormPayload,
  options: { requireMessage?: boolean } = { requireMessage: false }
): Partial<Record<LeadField, string>> {
  const errors: Partial<Record<LeadField, string>> = {};

  const nameError = validateName(data.name);
  if (nameError) errors.name = nameError;

  const emailError = validateEmail(data.email);
  if (emailError) errors.email = emailError;

  const phoneError = validatePhone(data.phone);
  if (phoneError) errors.phone = phoneError;

  if (options.requireMessage === true) {
    const messageError = validateMessage(data.message);
    if (messageError) errors.message = messageError;
  } else if (sanitizeInput(data.message)) {
    const messageError = validateMessage(data.message);
    if (messageError) errors.message = messageError;
  }

  if (data.company) {
    const companyError = validateCompany(data.company);
    if (companyError) errors.company = companyError;
  }

  return errors;
}

export function isFieldValid(field: LeadField, value: string): boolean {
  switch (field) {
    case "name":
      return validateName(value) === null;
    case "email":
      return validateEmail(value) === null;
    case "phone":
      return validatePhone(value) === null;
    case "message": {
      const trimmed = sanitizeInput(value);
      if (!trimmed) return true;
      return validateMessage(value) === null;
    }
    case "company":
      return validateCompany(value) === null;
    default:
      return false;
  }
}
