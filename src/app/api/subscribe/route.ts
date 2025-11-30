export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Use environment variable
    const GOOGLE_SHEET_WEBHOOK = process.env.GOOGLE_SHEET_WEBHOOK;

    if (!GOOGLE_SHEET_WEBHOOK) {
      throw new Error("Google Sheet webhook URL not configured");
    }

    const res = await fetch(GOOGLE_SHEET_WEBHOOK, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await res.text();

    return new Response(data, { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response("Error", { status: 500 });
  }
}
