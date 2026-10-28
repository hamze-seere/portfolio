"use client";

import { useActionState, type ReactNode } from "react";
import { sendContactMessage } from "@/app/actions/contact";
import { contactLimits, type ContactField, type ContactState } from "@/lib/contact";

const initialState: ContactState = { status: "idle" };

const inputClass =
  "bg-surface border-border text-fg placeholder:text-muted/70 focus-visible:border-accent mt-1.5 block w-full rounded-md border px-3 py-2 text-base aria-invalid:border-danger";

/** Works without JavaScript too: a Server Action is a normal form POST when JS is unavailable. */
export function ContactForm() {
  const [state, formAction, pending] = useActionState(sendContactMessage, initialState);

  const errorFor = (field: ContactField) =>
    state.status === "error" ? state.fieldErrors?.[field]?.[0] : undefined;
  const valueFor = (field: ContactField) =>
    state.status === "error" ? state.values?.[field] : undefined;

  if (state.status === "success") {
    return (
      <p role="status" className="rounded-lg border border-accent/40 bg-accent/5 p-4">
        {state.message}
      </p>
    );
  }

  return (
    <form action={formAction} className="space-y-4">
      <Field label="Name" name="name" error={errorFor("name")}>
        <input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          required
          maxLength={contactLimits.name}
          defaultValue={valueFor("name")}
          aria-invalid={Boolean(errorFor("name")) || undefined}
          aria-describedby={errorFor("name") ? "name-error" : undefined}
          className={inputClass}
        />
      </Field>
      <Field label="Email" name="email" error={errorFor("email")}>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          maxLength={contactLimits.email}
          defaultValue={valueFor("email")}
          aria-invalid={Boolean(errorFor("email")) || undefined}
          aria-describedby={errorFor("email") ? "email-error" : undefined}
          className={inputClass}
        />
      </Field>
      <Field label="Message" name="message" error={errorFor("message")}>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          minLength={10}
          maxLength={contactLimits.message}
          defaultValue={valueFor("message")}
          aria-invalid={Boolean(errorFor("message")) || undefined}
          aria-describedby={errorFor("message") ? "message-error" : undefined}
          className={inputClass}
        />
      </Field>

      {/* Honeypot: invisible to people and screen readers, tempting to naive bots. */}
      <div className="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={pending}
          className="rounded-md bg-accent px-5 py-2.5 font-medium text-accent-fg transition-colors hover:bg-accent-strong disabled:opacity-60"
        >
          {pending ? "Sending…" : "Send message"}
        </button>
        <p aria-live="polite" className="text-sm text-danger">
          {state.status === "error" ? state.message : ""}
        </p>
      </div>
    </form>
  );
}

function Field({
  label,
  name,
  error,
  children,
}: {
  label: string;
  name: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={name} className="text-sm font-medium">
        {label}
      </label>
      {children}
      {error ? (
        <p id={`${name}-error`} className="mt-1 text-sm text-danger">
          {error}
        </p>
      ) : null}
    </div>
  );
}
