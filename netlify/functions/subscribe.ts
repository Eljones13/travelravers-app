import crypto from "crypto";

type NetlifyEvent = {
  httpMethod: string;
  body: string | null;
};

type NetlifyResponse = {
  statusCode: number;
  headers: Record<string, string>;
  body: string;
};

const GENRES = ["Techno", "House", "Drum & Bass", "Psytrance", "Multi-genre"] as const;
type Genre = (typeof GENRES)[number];

const JSON_HEADERS = { "Content-Type": "application/json" };

export const handler = async (event: NetlifyEvent): Promise<NetlifyResponse> => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, headers: JSON_HEADERS, body: JSON.stringify({ error: "Method not allowed" }) };
  }

  let email: string | undefined;
  let genre: string | undefined;

  try {
    ({ email, genre } = JSON.parse(event.body ?? "{}"));
  } catch {
    return { statusCode: 400, headers: JSON_HEADERS, body: JSON.stringify({ error: "Invalid JSON" }) };
  }

  if (!email || !genre || !(GENRES as readonly string[]).includes(genre)) {
    return { statusCode: 400, headers: JSON_HEADERS, body: JSON.stringify({ error: "email and a valid genre are required" }) };
  }

  const apiKey = process.env.MAILCHIMP_API_KEY;
  const listId = process.env.MAILCHIMP_LIST_ID;

  if (!apiKey || !listId) {
    return { statusCode: 500, headers: JSON_HEADERS, body: JSON.stringify({ error: "Server misconfigured" }) };
  }

  const dc = apiKey.split("-").pop();
  const subscriberHash = crypto.createHash("md5").update(email.toLowerCase()).digest("hex");

  const authHeader = `Basic ${Buffer.from(`anystring:${apiKey}`).toString("base64")}`;
  const baseUrl = `https://${dc}.api.mailchimp.com/3.0/lists/${listId}/members/${subscriberHash}`;

  // Upsert member — PUT is idempotent so existing subscribers are handled gracefully
  const memberRes = await fetch(baseUrl, {
    method: "PUT",
    headers: { Authorization: authHeader, "Content-Type": "application/json" },
    body: JSON.stringify({
      email_address: email,
      status_if_new: "subscribed",
      status: "subscribed",
    }),
  });

  if (!memberRes.ok) {
    const err = (await memberRes.json()) as { detail?: string };
    return {
      statusCode: 502,
      headers: JSON_HEADERS,
      body: JSON.stringify({ error: err.detail ?? "Mailchimp error" }),
    };
  }

  // Apply genre tag
  await fetch(`${baseUrl}/tags`, {
    method: "POST",
    headers: { Authorization: authHeader, "Content-Type": "application/json" },
    body: JSON.stringify({ tags: [{ name: genre as Genre, status: "active" }] }),
  });

  return { statusCode: 200, headers: JSON_HEADERS, body: JSON.stringify({ ok: true }) };
};
