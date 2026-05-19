import { addInquiry } from "@/lib/firestore/inquiries";
import type { InquiryInput } from "@/lib/firestore/types";
import { isFirebaseConfigured } from "@/lib/firebase";

const MAIL_ENDPOINT = "https://otp-khaki-iota.vercel.app/send-mail";
const NOTIFICATION_EMAIL = "balajieng.works12@gmail.com";

type InquirySource = "contact-form" | "quote-dialog" | "balaji-ai";

const SOURCE_LABELS: Record<InquirySource, string> = {
  "contact-form": "Contact Form",
  "quote-dialog": "Quote Dialog",
  "balaji-ai": "Balaji AI",
};

function buildSubject(input: InquiryInput, source: InquirySource) {
  const service = input.service?.trim() || "General Inquiry";
  const name = input.name?.trim() || "Unknown Customer";
  return `[${SOURCE_LABELS[source]}] ${service} - ${name}`;
}

function buildMessage(input: InquiryInput, source: InquirySource, inquiryId?: string) {
  const lines: string[] = [
    `Source: ${SOURCE_LABELS[source]}`,
    inquiryId ? `Inquiry ID: ${inquiryId}` : "Inquiry ID: Pending / Not saved in Firestore",
    `Name: ${input.name || "-"}`,
    `Phone: ${input.phone || "-"}`,
  ];

  if (input.email?.trim()) lines.push(`Email: ${input.email}`);
  if (input.service?.trim()) lines.push(`Service: ${input.service}`);
  if (input.quantity?.trim()) lines.push(`Quantity: ${input.quantity}`);
  if (input.material?.trim()) lines.push(`Material: ${input.material}`);
  if (input.message?.trim()) {
    lines.push("");
    lines.push("Project Details:");
    lines.push(input.message);
  }

  return lines.join("\n");
}

async function sendInquiryMail(input: InquiryInput, source: InquirySource, inquiryId?: string) {
  const response = await fetch(MAIL_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      to: NOTIFICATION_EMAIL,
      subject: buildSubject(input, source),
      message: buildMessage(input, source, inquiryId),
    }),
  });

  if (!response.ok) {
    const errorText = await response.text().catch(() => "");
    throw new Error(errorText || "Failed to send inquiry notification email.");
  }
}

export async function submitInquiryLead(input: InquiryInput, source: InquirySource) {
  let inquiryId: string | undefined;
  let adminSaved = false;
  let emailSent = false;
  let adminError: unknown;
  let emailError: unknown;

  if (isFirebaseConfigured()) {
    try {
      inquiryId = await addInquiry({ ...input, source });
      adminSaved = true;
    } catch (error) {
      adminError = error;
    }
  }

  try {
    await sendInquiryMail(input, source, inquiryId);
    emailSent = true;
  } catch (error) {
    emailError = error;
  }

  if (!adminSaved && !emailSent) {
    throw new Error(
      adminError instanceof Error
        ? adminError.message
        : emailError instanceof Error
          ? emailError.message
          : "Failed to submit inquiry.",
    );
  }

  return { inquiryId, adminSaved, emailSent };
}
