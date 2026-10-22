
import Groq from "groq-sdk";
import config from "../config/env.config.js";

const groq = new Groq({
  apiKey: config.groqApiKey,
});

const MODEL = config.groqModel || "openai/gpt-oss-20b";

const sleep = (ms) =>
  new Promise((resolve) => setTimeout(resolve, ms));

const getStatus = (error) =>
  Number(error.status ?? error.error?.code ?? error.code);

async function retryGroq(request, maxAttempts = 3) {
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await request();
    } catch (error) {
      const status = getStatus(error);

      if (
        ![429, 500, 502, 503, 504].includes(status) ||
        attempt === maxAttempts
      ) {
        throw error;
      }

      const delay = 1000 * 2 ** (attempt - 1);
      await sleep(delay);
    }
  }
}

const responseShape = {
  intent: "normal_chat | possible_support | explicit_support",
  reply: "string",
  issue: "string",
  description: "string",
  category: "string",
  department: "string",
  tokens: ["string"],
  priority: "low | medium | high | critical",
  confidence: "number between 0 and 1",
  suggestedSolution: "string",
  decision: "suggested | human-review",
  escalationReason: "string",
};

const systemPrompt = `
You are Hank, an AI support assistant for company employees.

You handle general chat and IT support requests.

CLASSIFICATION:
- Greetings and general questions: normal_chat.
- Workplace technical or operational problems: possible_support.
- Messages beginning with @support: explicit_support.

SUPPORT DECISION POLICY:
- Use "suggested" for routine, low-risk problems with safe
  troubleshooting steps.
- Use "human-review" if resolution requires administrator
  privileges, company-side configuration, specialist access,
  physical repair, or human judgment.
- Escalate suspected security incidents, compromised accounts,
  data exposure, and major service outages.
- Escalate if the employee explicitly requests a human.
- When a user reports that standard troubleshooting already
  failed and further investigation requires internal access,
  use "human-review".
- Do not automatically escalate every VPN, Wi-Fi, or login issue.
- Never claim a suggested solution has already fixed the problem.
- Confidence reflects confidence in the analysis, not proof
  that the issue is resolved.

RESPONSE RULES:
- For normal_chat, reply conversationally.
- For support, provide a practical suggestedSolution if safe.
- Keep escalationReason specific when decision is human-review.
- Return valid JSON only, matching this structure:
${JSON.stringify(responseShape)}
`;

function normalizeResult(data) {
  const validIntents = [
    "normal_chat",
    "possible_support",
    "explicit_support",
  ];

  const validPriorities = [
    "low",
    "medium",
    "high",
    "critical",
  ];

  const confidence = Number(data.confidence);

  return {
    intent: validIntents.includes(data.intent)
      ? data.intent
      : "normal_chat",

    reply: String(data.reply ?? ""),
    issue: String(data.issue ?? ""),
    description: String(data.description ?? ""),
    category: String(data.category ?? "General"),
    department: String(data.department ?? "Support"),

    tokens: Array.isArray(data.tokens)
      ? data.tokens.map(String)
      : [],

    priority: validPriorities.includes(data.priority)
      ? data.priority
      : "medium",

    confidence: Number.isFinite(confidence)
      ? Math.max(0, Math.min(1, confidence))
      : 0.5,

    suggestedSolution: String(data.suggestedSolution ?? ""),

    decision:
      data.decision === "human-review"
        ? "human-review"
        : "suggested",

    escalationReason: String(data.escalationReason ?? ""),
  };
}

async function callAI({ message, history = [] }) {
  if (typeof message !== "string" || !message.trim()) {
    throw new Error("Message is required");
  }

  const previousMessages = history.map((item) => ({
    role: item.senderType === "ai" ? "assistant" : "user",
    content: String(item.message ?? ""),
  }));

  const completion = await retryGroq(() =>
    groq.chat.completions.create({
      model: MODEL,
      messages: [
        {
          role: "system",
          content: systemPrompt,
        },
        ...previousMessages,
        {
          role: "user",
          content: message,
        },
      ],
      response_format: {
        type: "json_object",
      },
      temperature: 0.2,
      max_completion_tokens: 1400,
    })
  );

  const content = completion.choices[0]?.message?.content;

  if (!content) {
    throw new Error("Groq returned an empty response");
  }

  const result = normalizeResult(JSON.parse(content));

  if (/^@support\b/i.test(message)) {
    result.intent = "explicit_support";
  }

  return result;
}

export async function understandMessage({
  message,
  history = [],
}) {
  return callAI({ message, history });
}

export async function analyzeTicket({ issue }) {
  const result = await callAI({ message: issue });

  if (
    result.intent === "normal_chat" &&
    !result.description.trim()
  ) {
    throw new Error("Message is not a support issue");
  }

  return {
    intent: result.intent,
    description: result.description.trim() || issue,
    category: result.category,
    department: result.department,
    tokens: result.tokens,
    priority: result.priority,
    confidence: result.confidence,
    suggestedSolution: result.suggestedSolution,
    decision: result.decision,
    escalationReason: result.escalationReason,
  };
}
