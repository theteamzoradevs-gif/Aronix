import { NextResponse } from "next/server";
import {
  sanitizeLeadPayload,
  validateLeadForm,
  type LeadFormPayload,
} from "@/lib/form-validation";
import { checkRateLimit } from "@/lib/rate-limit";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/xrewppea";

export async function POST(request: Request) {
  try {
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "unknown";

    const rate = checkRateLimit(ip);
    if (!rate.allowed) {
      return NextResponse.json(
        { success: false, error: "Too many requests. Please try again later." },
        { status: 429, headers: { "Retry-After": String(rate.retryAfterSec ?? 60) } }
      );
    }

    const body = (await request.json()) as LeadFormPayload;

    if (body.website) {
      return NextResponse.json({ success: true });
    }

    const sanitized = sanitizeLeadPayload(body);
    const errors = validateLeadForm(sanitized);

    if (Object.keys(errors).length > 0) {
      return NextResponse.json(
        { success: false, error: "Validation failed.", errors },
        { status: 400 }
      );
    }

    const source = sanitized.source ?? "website";
    const subject =
      source === "contact"
        ? "New contact message — Aronix Infra"
        : `New quote request (${source}) — Aronix Infra`;

    const formspreeRes = await fetch(FORMSPREE_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name: sanitized.name,
        email: sanitized.email,
        phone: sanitized.phone,
        message: sanitized.message,
        company: sanitized.company,
        product: sanitized.product,
        source,
        _subject: subject,
        _replyto: sanitized.email,
      }),
    });

    if (!formspreeRes.ok) {
      return NextResponse.json(
        { success: false, error: "Failed to send message. Please try again." },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { success: false, error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
