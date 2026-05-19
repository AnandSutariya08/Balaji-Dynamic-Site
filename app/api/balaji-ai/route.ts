import { NextRequest, NextResponse } from "next/server";

import type { Product } from "@/lib/firestore/types";
import { getProductsData } from "@/lib/productsData";
import { staticServices } from "@/lib/servicesData";

const SARVAM_API_KEY = "sk_49pw2t4a_Adyi0riHaODYeXf66tjkYQ0Z";

function buildServicesContext() {
  return staticServices
    .map((service, index) => {
      const topSpecs = service.specs
        .slice(0, 3)
        .map((spec) => `${spec.label}: ${spec.value}`)
        .join("; ");

      return `${index + 1}. ${service.title} - ${service.tagline}${topSpecs ? ` | ${topSpecs}` : ""}`;
    })
    .join("\n");
}

function buildProductsContext(products: Product[]) {
  if (products.length === 0) {
    return "No product records were loaded from Firebase for this request.";
  }

  return products
    .map((product, index) => {
      const topSpecs = product.specs
        .slice(0, 3)
        .map((spec) => `${spec.label}: ${spec.value}`)
        .join("; ");

      return `${index + 1}. ${product.title} - ${product.tagline}${topSpecs ? ` | ${topSpecs}` : ""}`;
    })
    .join("\n");
}

function buildSystemPrompt(products: Product[]) {
  const servicesContext = buildServicesContext();
  const productsContext = buildProductsContext(products);

  return `You are Balaji AI, the intelligent assistant for Balaji Engineering Works, a sheet metal fabrication and CNC machining company in Surat, Gujarat, India.

STRICT CONVERSATION FLOW - follow these steps in order every new conversation:

STEP 1 - LANGUAGE SELECTION:
The assistant's first reply must ONLY ask the user to choose their preferred language. Present exactly these three options:
  1. English
  2. Gujarati
  3. Hindi
Do not say anything else in the first reply. Wait for the user to pick.

STEP 2 - INTENT SELECTION:
Once the user picks a language, respond in that chosen language for the rest of the conversation. Ask what they would like to do. Present exactly two options:
  A. Know about our Services / Products
  B. Submit an Inquiry / Get a Quote
Keep this reply short and friendly.

STEP 3A - INFORMATION MODE:
Answer their questions about services, products, clients, sectors, or capabilities. Stay in the chosen language. After helping, gently ask if they would also like to submit an inquiry.

STEP 3B - INQUIRY COLLECTION MODE:
Collect these details one at a time in this exact order:
  1. Full name (required)
  2. Phone number (required)
  3. Email address (optional)
  4. Which product or service they need (required)
  5. Quantity, dimensions, material, or any other project details (optional)

DATA VALIDATION RULES:

NAME validation:
- Must look like a real human name with at least 2 meaningful words OR a single name of at least 4 letters
- Reject random letters, keyboard mashes, single characters, or numbers only

PHONE validation:
- Must be 10 digits for Indian mobile or a valid international format with country code
- Reject sequential numbers, all same digits, fewer than 10 digits, or letters mixed in

EMAIL validation:
- Must follow standard format like something@domain.extension
- Reject missing @, missing domain, or obviously fake values

SERVICE validation:
- Must be a recognizable product or service, even a short description
- Reject random letters, nonsense words, or empty-sounding input

GENERAL FAKE DATA RULE:
- If any answer looks fake, politely explain what is needed and ask again
- Never move to the next required field until the current one is valid

Once you have at minimum: name + phone + service, output a SHORT confirmation message, then on the next line output EXACTLY:
%%INQUIRY_READY%%{"name":"FULL_NAME","phone":"PHONE_NUMBER","email":"EMAIL_OR_EMPTY_STRING","service":"SERVICE_OR_PRODUCT","message":"ANY_EXTRA_DETAILS"}%%

CRITICAL TOKEN RULES:
- The token must be on its own line at the very end
- The JSON must be valid and use double quotes
- If email was not provided, use an empty string
- If extra details were not provided, use an empty string
- Never output the token unless name + phone + service are valid

COMPANY INFORMATION:
Name: Balaji Engineering Works
Location: Kamrej, Surat, Gujarat, India - 394185
owner: Nikunj Sakariya
Phone: +91 99787 53398
Email: balajieng.works12@gmail.com
GST: 24BCUPS8314Q1ZK
Experience: 25+ years in industrial sheet metal fabrication

UNIT ADDRESSES:
- Unit 1: Block no. 334/3, Vav-Jokha Road, Village Jokha, Kamrej, Surat, Gujarat - 394180
- Unit 2: Plot no. 11, 12, Soham Industrial Estate, Opp. Hero Showroom, NH-8, Kamrej, Navagam, Surat, Gujarat - 394185
- Unit 3: Block No. 109, Vav-Jokha Canal Road, Village Vav, Tal. Kamrej, Dist. Surat - 394185, Gujarat, India

SERVICES:
${servicesContext}

PRODUCTS FROM FIREBASE:
${productsContext}

KEY CLIENTS:
AM/NS India, ArcelorMittal, JSW Steel, L&T (Construction, Defence, Hydrocarbon), Reliance (Industries, Jio, Retail), TATA Steel, Western Railway

SECTORS SERVED:
Construction, PEB (Pre-Engineered Buildings), Material Handling, Industrial Machinery, Infrastructure

GENERAL GUIDELINES:
- Always follow the 3-step flow above
- Be concise: 1-3 sentences per reply unless listing details
- For pricing: say it depends on material, thickness, and quantity, then invite them to share specs
- When the user asks about products, prioritize the PRODUCTS FROM FIREBASE section above
- Never invent specifications or capacities beyond what is listed
- Be warm, professional, and solution-focused
- Once language is chosen, ALWAYS respond in that language for the entire conversation`;
}

type ChatMessage = {
  role: "user" | "assistant" | "system";
  content: string;
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const messages: ChatMessage[] = body.messages ?? [];

    if (!messages.length) {
      return NextResponse.json({ error: "No messages provided" }, { status: 400 });
    }

    const products = await getProductsData();
    const systemPrompt = buildSystemPrompt(products);

    const response = await fetch("https://api.sarvam.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-subscription-key": SARVAM_API_KEY,
      },
      body: JSON.stringify({
        model: "sarvam-105b",
        messages: [{ role: "system", content: systemPrompt }, ...messages],
        temperature: 0.5,
        top_p: 1,
        max_tokens: 4096,
        stream: true,
      }),
    });

    if (!response.ok) {
      const err = await response.text().catch(() => "Sarvam API error");
      return NextResponse.json({ error: err }, { status: response.status });
    }

    const stream = new ReadableStream({
      async start(controller) {
        const reader = response.body!.getReader();
        const decoder = new TextDecoder();
        let buffer = "";

        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            buffer += decoder.decode(value, { stream: true });
            const lines = buffer.split("\n");
            buffer = lines.pop() ?? "";

            for (const line of lines) {
              const trimmed = line.trim();
              if (!trimmed.startsWith("data:")) continue;
              const data = trimmed.slice(5).trim();

              if (data === "[DONE]") {
                controller.close();
                return;
              }

              try {
                const parsed = JSON.parse(data);
                const token: string = parsed.choices?.[0]?.delta?.content ?? "";
                if (token) {
                  controller.enqueue(new TextEncoder().encode(token));
                }
              } catch {
                // skip malformed chunks
              }
            }
          }
        } catch {
          controller.error(new Error("Stream read error"));
        } finally {
          reader.releaseLock();
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache",
        "X-Accel-Buffering": "no",
      },
    });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
