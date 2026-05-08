const API_VERSION = "v1";
const MODEL_NAME = "gemini-2.5-flash";

function setCorsHeaders(res) {
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,POST");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );
}

async function handleAnalyzeRequest(req, res) {
  setCorsHeaders(res);

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const prompt = req.body?.prompt;

  if (!prompt) {
    res.status(400).json({ error: "Prompt is required" });
    return;
  }

  if (!process.env.GEMINI_API_KEY) {
    // Return a mock response if no API key is configured
    res.status(200).json({
      success: true,
      data: "### ⚠️ AI Simulation Mode\n\nNo `GEMINI_API_KEY` was found in the `.env` file, so the application is running in simulation mode.\n\nHere is a simulated AI analysis based on your data:\n\n* **Occupancy Trends**: We notice a strong 15% increase in member arrivals over the weekend.\n* **Revenue Prediction**: Projected ADR shows a healthy growth pattern due to an increase in long-stay bookings.\n* **Recommendations**: Consider introducing a targeted loyalty campaign next month to convert one-time visitors into members.\n\n> *To enable real AI analysis, please configure your GEMINI_API_KEY in the `.env` file.*"
    });
    return;
  }

  try {
    const endpoint = `https://generativelanguage.googleapis.com/${API_VERSION}/models/${MODEL_NAME}:generateContent?key=${process.env.GEMINI_API_KEY}`;

    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [
          {
            role: "user",
            parts: [{ text: prompt }],
          },
        ],
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      res.status(response.status).json({ error });
      return;
    }

    const data = await response.json();
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text) {
      res.status(502).json({ error: "Invalid response from Gemini API" });
      return;
    }

    res.status(200).json({ success: true, data: text });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export { handleAnalyzeRequest };
