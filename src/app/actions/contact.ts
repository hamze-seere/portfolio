"use server";

import { headers } from "next/headers";
import { z } from "zod";
import { siteConfig } from "@/config/site";
import { contactSchema, type ContactState } from "@/lib/contact";
import { clientKey, rateLimit } from "@/lib/rate-limit";

/**
 * Contact form handler (a Server Action).
 *
 * Defence in depth, in order of cheapest check first:
 *  1. Next.js rejects Server Action calls whose Origin doesn't match the host (CSRF protection).
 *  2. Honeypot: a hidden field humans never fill in. Bots that do get a fake success.
 *  3. Per-client rate limit (5 messages / 10 minutes).
 *  4. Strict schema validation with zod — the client-side checks are only for UX.
 *  5. The email is sent as plain text via Resend's API; the key never leaves the server.
 */
export async function sendContactMessage(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const success: ContactState = {
    status: "success",
    message: "Thanks — your message is on its way. I'll reply within a few days.",
  };

  if (formData.get("company")) return success; // honeypot tripped: pretend it worked

  const key = await clientKey(await headers());
  try {
    const { allowed } = await rateLimit(key);
    if (!allowed) {
      return {
        status: "error",
        message: "Too many messages from your network. Please try again in a few minutes.",
      };
    }
  } catch (err) {
    console.error("[contact] rate limiter error", err);
    return {
      status: "error",
      message: "The form is temporarily unavailable. Please email me instead.",
    };
  }

  const raw = {
    name: String(formData.get("name") ?? ""),
    email: String(formData.get("email") ?? ""),
    message: String(formData.get("message") ?? ""),
  };
  const parsed = contactSchema.safeParse(raw);
  if (!parsed.success) {
    return {
      status: "error",
      message: "Please fix the highlighted fields.",
      fieldErrors: z.flattenError(parsed.error).fieldErrors,
      values: raw,
    };
  }

  const { RESEND_API_KEY, CONTACT_FROM_EMAIL, CONTACT_TO_EMAIL } = process.env;
  if (!RESEND_API_KEY || !CONTACT_FROM_EMAIL || !CONTACT_TO_EMAIL) {
    return {
      status: "error",
      message: `The form isn't configured. Please email ${siteConfig.email}.`,
    };
  }

  const { name, email, message } = parsed.data;
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: CONTACT_FROM_EMAIL,
        to: [CONTACT_TO_EMAIL],
        reply_to: email,
        subject: `Portfolio contact from ${name}`,
        // Plain text only: user input is never interpreted as HTML in the inbox.
        text: `From: ${name} <${email}>\n\n${message}`,
      }),
      cache: "no-store",
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) throw new Error(`Resend responded ${res.status}`);
  } catch (err) {
    // Log server-side for debugging; never echo provider errors back to the visitor.
    console.error("[contact] send failed", err);
    return {
      status: "error",
      message: `Something went wrong sending your message. Please email ${siteConfig.email}.`,
      values: raw,
    };
  }

  return success;
}
