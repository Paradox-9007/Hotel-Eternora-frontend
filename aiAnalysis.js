// Replace this with your actual Render URL after deploying the backend!
const PROD_BACKEND_URL = "https://your-future-backend-url.onrender.com";

const BACKEND_URL =
  window.location.hostname === "localhost" ||
  window.location.hostname === "127.0.0.1"
    ? "http://localhost:3000"
    : PROD_BACKEND_URL;

// ─────────────────────────────────────────────
// AI Content Generator
// ─────────────────────────────────────────────

class AIContentGenerator {
  constructor() {
    // Queue

    this.requestQueue = [];

    this.activeRequests = new Set();

    this.maxConcurrentRequests = 1;

    // Timing

    this.requestTimeout = 25000;

    this.lastRequestTime = 0;

    this.minRequestGap = 3000;

    // Retry

    this.retryLimit = 2;

    // Cache

    this.cache = new Map();
  }

  // ─────────────────────────────────────────────
  // Public Generate Function
  // ─────────────────────────────────────────────

  async generateAiContent(
    elementId,
    SetPrompt,
    UserPrompt
  ) {
    const requestKey =
      `${elementId}-${SetPrompt}-${UserPrompt}`;

    // Prevent duplicate requests

    if (
      this.activeRequests.has(
        requestKey
      )
    ) {
      console.warn(
        "Duplicate request skipped."
      );

      return "duplicate";
    }

    return new Promise(
      (resolve, reject) => {
        this.requestQueue.push({
          elementId,
          SetPrompt,
          UserPrompt,
          resolve,
          reject,
          key: requestKey,
          timestamp: Date.now(),
        });

        this.processQueue();
      }
    );
  }

  // ─────────────────────────────────────────────
  // Queue Processor
  // ─────────────────────────────────────────────

  async processQueue() {
    if (
      this.requestQueue.length === 0 ||
      this.activeRequests.size >=
        this.maxConcurrentRequests
    ) {
      return;
    }

    const request =
      this.requestQueue.shift();

    // Expired request

    if (
      Date.now() -
        request.timestamp >
      30000
    ) {
      request.resolve("timeout");
      return;
    }

    this.activeRequests.add(
      request.key
    );

    try {
      await this.processRequest(
        request
      );
    } finally {
      this.activeRequests.delete(
        request.key
      );

      this.processQueue();
    }
  }

  // ─────────────────────────────────────────────
  // Main Request Handler
  // ─────────────────────────────────────────────

  async processRequest(request) {
    const {
      elementId,
      SetPrompt,
      UserPrompt,
      resolve,
      reject,
    } = request;

    const target =
      document.getElementById(
        elementId
      );

    if (!target) {
      reject(
        new Error(
          "Target element not found"
        )
      );

      return;
    }

    // ─────────────────────────────────────────────
    // Prompt
    // ─────────────────────────────────────────────

const prompt = `
DATASET:
${SetPrompt}

USER REQUEST:
${UserPrompt}
`;

    // ─────────────────────────────────────────────
    // Cache Check
    // ─────────────────────────────────────────────

    if (
      this.cache.has(prompt)
    ) {
      target.innerHTML =
        this.cache.get(prompt);

      resolve("cached");

      return;
    }

    // ─────────────────────────────────────────────
    // Loading State
    // ─────────────────────────────────────────────

    target.innerHTML = `
      <div class="ai-loading">

        <div class="ai-spinner"></div>

        <div class="ai-loading-text">
          Generating AI insights...
        </div>

      </div>
    `;

    // ─────────────────────────────────────────────
    // Request Delay
    // ─────────────────────────────────────────────

    const now = Date.now();

    const waitTime =
      this.minRequestGap -
      (now - this.lastRequestTime);

    if (waitTime > 0) {
      await new Promise(
        (resolveDelay) =>
          setTimeout(
            resolveDelay,
            waitTime
          )
      );
    }

    this.lastRequestTime =
      Date.now();

    // ─────────────────────────────────────────────
    // Retry Logic
    // ─────────────────────────────────────────────

    let attempt = 0;

    while (
      attempt <=
      this.retryLimit
    ) {
      try {
        const controller =
          new AbortController();

        const timeoutId =
          setTimeout(() => {
            console.warn(
              "AI request timeout"
            );

            controller.abort();
          }, this.requestTimeout);

        // ─────────────────────────────────────────────
        // API Request
        // ─────────────────────────────────────────────

        const response =
          await fetch(
            `${BACKEND_URL}/api/analyze`,
            {
              method: "POST",

              signal:
                controller.signal,

              headers: {
                "Content-Type":
                  "application/json",
              },

              body: JSON.stringify({
                prompt,
              }),
            }
          );

        clearTimeout(timeoutId);

        const payload =
          await response.json();

        // ─────────────────────────────────────────────
        // Error Handling
        // ─────────────────────────────────────────────

        if (!response.ok) {
          if (
            response.status === 429
          ) {
            throw new Error(
              "AI service is busy. Please try again shortly."
            );
          }

          throw new Error(
            payload.error ||
              `HTTP ${response.status}`
          );
        }

        const rawText =
          payload?.data;

        if (!rawText) {
          throw new Error(
            "Empty AI response"
          );
        }

        // ─────────────────────────────────────────────
        // Markdown Rendering
        // ─────────────────────────────────────────────

        let renderedHtml;

        if (
          typeof marked !==
          "undefined"
        ) {
          renderedHtml =
            marked.parse(rawText);
        } else {
          // Fallback

          renderedHtml =
            rawText.replace(
              /\n/g,
              "<br>"
            );
        }

        // ─────────────────────────────────────────────
        // Final HTML
        // ─────────────────────────────────────────────

        const finalHtml = `
          <div class="ai-result">
            ${renderedHtml}
          </div>
        `;

        // ─────────────────────────────────────────────
        // Render
        // ─────────────────────────────────────────────

        target.innerHTML =
          finalHtml;
        try {
          localStorage.setItem(`ai_result_${elementId}`, finalHtml);
        } catch (e) {}

        // ─────────────────────────────────────────────
        // Save Cache
        // ─────────────────────────────────────────────

        this.cache.set(
          prompt,
          finalHtml
        );

        resolve("success");

        return;

      } catch (error) {
        console.error(
          `Attempt ${
            attempt + 1
          } failed:`,
          error
        );

        attempt++;

        // Retry

        if (
          attempt <=
          this.retryLimit
        ) {
          await new Promise(
            (retryResolve) =>
              setTimeout(
                retryResolve,
                2500
              )
          );

          continue;
        }

        // Final Error State

        target.innerHTML = `
          <div class="ai-error">

            <strong>
              AI analysis unavailable
            </strong>

            <br><br>

            ${
              error.message ||
              "Unknown error"
            }

          </div>
        `;

        reject(error);
      }
    }
  }
}

// ─────────────────────────────────────────────
// Singleton
// ─────────────────────────────────────────────

const aiContentGenerator =
  new AIContentGenerator();

// ─────────────────────────────────────────────
// Export
// ─────────────────────────────────────────────

export const generateAiContent = (
  elementId,
  SetPrompt,
  UserPrompt
) =>
  aiContentGenerator.generateAiContent(
    elementId,
    SetPrompt,
    UserPrompt
  );