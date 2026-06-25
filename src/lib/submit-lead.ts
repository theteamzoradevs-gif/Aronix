import type { LeadFormPayload } from "@/lib/form-validation";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/xrewppea";

export async function submitLead(
  payload: LeadFormPayload
): Promise<{ success: boolean; error?: string; errors?: Partial<Record<string, string>> }> {
  if (payload.website) {
    return { success: true };
  }

  const source = payload.source ?? "website";
  const subject =
    source === "contact"
      ? "New contact message — Aronix Infra"
      : source === "hero"
        ? "New hero quote request — Aronix Infra"
        : `New quote request (${source}) — Aronix Infra`;

  try {
    const response = await fetch(FORMSPREE_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name: payload.name,
        email: payload.email,
        phone: payload.phone,
        message: payload.message,
        company: payload.company,
        product: payload.product,
        source,
        _subject: subject,
        _replyto: payload.email,
        _gotcha: payload.website ?? "",
      }),
    });

    const data = (await response.json()) as {
      ok?: boolean;
      error?: string;
      errors?: Array<{ message: string; field?: string }>;
    };

    if (!response.ok) {
      const fieldErrors: Partial<Record<string, string>> = {};
      data.errors?.forEach((err) => {
        if (err.field) fieldErrors[err.field as keyof typeof fieldErrors] = err.message;
      });

      return {
        success: false,
        error: data.error ?? "Submission failed. Please try again.",
        errors: Object.keys(fieldErrors).length > 0 ? fieldErrors : undefined,
      };
    }

    return { success: true };
  } catch {
    return {
      success: false,
      error: "Network error. Please check your connection and try again.",
    };
  }
}
