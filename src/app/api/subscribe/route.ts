export async function POST(req: Request) {
  try {
    const body = await req.json();

    const res = await fetch(
      "https://script.google.com/macros/s/AKfycbxSbk_cKQmu6idySJWrUeCtY9KrozK5xa5oG8cHYpSp3-PDqqLeSfGRH3tj5b7Z4Sgj/exec",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }
    );

    const data = await res.text();

    return new Response(data, { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response("Error", { status: 500 });
  }
}
