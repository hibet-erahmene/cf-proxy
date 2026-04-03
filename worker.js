const RENDER_URL = "https://obd2-dashboard.onrender.com"; // <-- change this

export default {
  async fetch(request, env, ctx) {

    const url = new URL(request.url);
    if (request.method !== "POST" || url.pathname !== "/data") {
      return new Response("Not found", { status: 404 });
    }

    const body = await request.text();

    const renderResp = await fetch(RENDER_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key":    request.headers.get("x-api-key") || ""
      },
      body: body
    });

    const respText = await renderResp.text();
    return new Response(respText, {
      status:  renderResp.status,
      headers: { "Content-Type": "application/json" }
    });
  }
};
