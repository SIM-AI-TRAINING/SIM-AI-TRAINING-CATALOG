export default {
    async fetch(request, env, ctx) {
        const url = new URL(request.url)

        // =========================
        // 1. Tracking endpoint
        // =========================
        if (url.pathname === "/collect" && request.method === "POST") {
            const body = await request.text()

            // Optional: log incoming events (visible in Cloudflare logs)
            console.log("Tracking event:", body)

            // Forward to Google Analytics 4
            await fetch(
                "https://www.google-analytics.com/mp/collect?measurement_id=G-GPBY2GCLE9&api_secret=YoxVZFJs_T7S1561wfAKyZA",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body
                }
            )

            return new Response("ok", { status: 200 })
        }

        // =========================
        // 2. Fallback: serve site
        // =========================
        return fetch(request)
    }
}
