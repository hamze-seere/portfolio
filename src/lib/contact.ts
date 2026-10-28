import { z } from "zod";

// Shared between the server action (authoritative validation) and the form (field limits).
export const contactLimits = { name: 100, email: 254, message: 5000 } as const;

/** Removes ASCII control characters (keeps \n and \t in the message body). */
const stripControl = (s: string) => s.replace(/[\u0000-\u0008\u000B-\u001F\u007F]/g, "");

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Please enter your name.")
    .max(contactLimits.name, "That name is too long.")
    // Names end up in an email subject line: forbid CR/LF to rule out header injection.
    .regex(/^[^\r\n]*$/, "Name can't contain line breaks.")
    .transform(stripControl),
  email: z.email("Please enter a valid email address.").max(contactLimits.email),
  message: z
    .string()
    .trim()
    .min(10, "Please write at least a sentence (10+ characters).")
    .max(contactLimits.message, "Please keep it under 5,000 characters.")
    .transform(stripControl),
});

export type ContactField = keyof z.infer<typeof contactSchema>;

export type ContactState =
  | { status: "idle" }
  | { status: "success"; message: string }
  | {
      status: "error";
      message: string;
      fieldErrors?: Partial<Record<ContactField, string[]>>;
      values?: Partial<Record<ContactField, string>>;
    };
