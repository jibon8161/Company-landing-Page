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

    // Check if the response is OK
    if (!res.ok) {
      throw new Error(
        `Google Apps Script responded with status: ${res.status}`
      );
    }

    // Try to parse as JSON first, then fall back to text
    let data;
    const contentType = res.headers.get("content-type");

    if (contentType?.includes("application/json")) {
      data = await res.json();
    } else {
      data = await res.text();
      // If it's HTML, it might be a Google authorization page
      if (data.includes("Google") && data.includes("script")) {
        throw new Error(
          "Google Apps Script authorization required - check deployment permissions"
        );
      }
    }

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (err) {
    console.error("Error in form submission:", err);
    return new Response(
      JSON.stringify({
        error: "Failed to submit form",
        details: err instanceof Error ? err.message : "Unknown error",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
