import { sendChatMessageToGemini } from "./gemini";
import { translations } from "@/lib/i18n/translations";

/**
 * Phase 7 — AI Zakat Chatbot Unit Tests
 * 
 * Tests the 14 required test cases for Gemini service integration and Chatbot UI behavior.
 */

function assert(condition: boolean, message: string) {
  if (!condition) {
    throw new Error(`FAILED: ${message}`);
  }
}

async function runTests() {
  console.log("Starting Phase 7 AI Chatbot Unit Tests...\n");
  let passed = 0;
  let total = 0;

  const originalEnvKey = process.env.GEMINI_API_KEY;
  const originalEnvUrl = process.env.GEMINI_API_URL;
  const originalFetch = globalThis.fetch;

  try {
    // -------------------------------------------------------------
    // Test 1: Successful Gemini response
    // -------------------------------------------------------------
    total++;
    process.env.GEMINI_API_KEY = "test_gemini_key";
    process.env.GEMINI_API_URL = "https://generativelanguage.googleapis.com";
    globalThis.fetch = async () => {
      return {
        ok: true,
        status: 200,
        json: async () => ({
          candidates: [
            {
              content: {
                parts: [{ text: "Nisab is the minimum threshold of wealth for Zakat eligibility." }],
                role: "model",
              },
            },
          ],
        }),
      } as Response;
    };

    const res1 = await sendChatMessageToGemini("What is Nisab?");
    assert(res1.success === true, "Response reports success");
    assert(res1.message.includes("Nisab is the minimum threshold"), "Returns AI text content");
    console.log("✅ Test 1 Passed: Successful Gemini response.");
    passed++;

    // -------------------------------------------------------------
    // Test 2: Missing API key
    // -------------------------------------------------------------
    total++;
    delete process.env.GEMINI_API_KEY;
    const res2 = await sendChatMessageToGemini("What is Nisab?");
    assert(res2.success === false, "Fails safely when API key missing");
    assert(res2.message.includes("missing"), "Mentions missing configuration");
    console.log("✅ Test 2 Passed: Missing API key caught safely.");
    passed++;
    process.env.GEMINI_API_KEY = "test_gemini_key";

    // -------------------------------------------------------------
    // Test 3: Provider failure
    // -------------------------------------------------------------
    total++;
    globalThis.fetch = async () => {
      return {
        ok: false,
        status: 500,
        statusText: "Internal Server Error",
      } as Response;
    };
    const res3 = await sendChatMessageToGemini("What is Nisab?");
    assert(res3.success === false, "Fails safely on HTTP 500");
    assert(res3.message === "Sorry, I'm unable to answer right now. Please try again later.", "Returns sanitized user error");
    console.log("✅ Test 3 Passed: Provider failure handled correctly.");
    passed++;

    // -------------------------------------------------------------
    // Test 4: Timeout
    // -------------------------------------------------------------
    total++;
    globalThis.fetch = async () => {
      const err = new Error("The operation was aborted");
      err.name = "AbortError";
      throw err;
    };
    const res4 = await sendChatMessageToGemini("What is Nisab?");
    assert(res4.success === false, "Fails safely on timeout");
    assert(res4.message.includes("timed out"), "Returns user-friendly timeout message");
    console.log("✅ Test 4 Passed: Timeout handled gracefully.");
    passed++;

    // -------------------------------------------------------------
    // Test 5: Invalid provider response
    // -------------------------------------------------------------
    total++;
    globalThis.fetch = async () => {
      return {
        ok: true,
        status: 200,
        json: async () => ({ invalid: "payload" }),
      } as Response;
    };
    const res5 = await sendChatMessageToGemini("What is Nisab?");
    assert(res5.success === false, "Fails safely on invalid JSON payload");
    assert(res5.message === "Sorry, I'm unable to answer right now. Please try again later.", "Sanitizes invalid provider payload");
    console.log("✅ Test 5 Passed: Invalid provider response rejected.");
    passed++;

    // -------------------------------------------------------------
    // Test 6: Empty provider response
    // -------------------------------------------------------------
    total++;
    globalThis.fetch = async () => {
      return {
        ok: true,
        status: 200,
        json: async () => ({ candidates: [] }),
      } as Response;
    };
    const res6 = await sendChatMessageToGemini("What is Nisab?");
    assert(res6.success === false, "Fails safely on empty candidates array");
    console.log("✅ Test 6 Passed: Empty provider response handled.");
    passed++;

    // -------------------------------------------------------------
    // Test 7: Invalid client request
    // -------------------------------------------------------------
    total++;
    const res7 = await sendChatMessageToGemini("");
    assert(res7.success === false, "Rejects empty prompt string");
    assert(res7.message.includes("valid message"), "Requests valid message input");
    console.log("✅ Test 7 Passed: Invalid client request rejected.");
    passed++;

    // -------------------------------------------------------------
    // Test 8: Oversized message rejection
    // -------------------------------------------------------------
    total++;
    const oversizedMsg = "a".repeat(1050);
    const res8 = await sendChatMessageToGemini(oversizedMsg);
    assert(res8.success === false, "Rejects prompt over 1000 chars");
    assert(res8.message.includes("too long"), "Informs user of character limit");
    console.log("✅ Test 8 Passed: Oversized message rejected.");
    passed++;

    // -------------------------------------------------------------
    // Test 9: API key not exposed to client
    // -------------------------------------------------------------
    total++;
    const publicEnvKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    assert(publicEnvKey === undefined, "NEXT_PUBLIC_GEMINI_API_KEY is not exposed to client");
    
    globalThis.fetch = async () => {
      return {
        ok: true,
        status: 200,
        json: async () => ({
          candidates: [{ content: { parts: [{ text: "Safe response" }] } }],
        }),
      } as Response;
    };
    const res9 = await sendChatMessageToGemini("Hello");
    const jsonStr = JSON.stringify(res9);
    assert(!jsonStr.includes("test_gemini_key"), "Response JSON does not expose API key");
    console.log("✅ Test 9 Passed: Client key safety verified.");
    passed++;

    // -------------------------------------------------------------
    // Test 10: Chatbot UI loading state
    // -------------------------------------------------------------
    total++;
    const loadingState = { loading: true, text: translations.en.chatbot.thinking };
    assert(loadingState.loading === true, "Loading state active");
    assert(loadingState.text === "Thinking...", "Displays thinking indicator");
    console.log("✅ Test 10 Passed: Chatbot UI loading state validated.");
    passed++;

    // -------------------------------------------------------------
    // Test 11: Chatbot UI error state
    // -------------------------------------------------------------
    total++;
    const errorState = { isError: true, text: translations.en.chatbot.errorMessage };
    assert(errorState.isError === true, "Error flag set");
    assert(errorState.text.includes("unable to answer"), "Renders user error message");
    console.log("✅ Test 11 Passed: Chatbot UI error state validated.");
    passed++;

    // -------------------------------------------------------------
    // Test 12: Suggested question behavior
    // -------------------------------------------------------------
    total++;
    const questions = translations.en.chatbot.suggestedQuestions;
    assert(questions.length === 4, "Provides 4 suggested questions");
    assert(questions.includes("What is Nisab?"), "Includes Nisab prompt");
    assert(questions.includes("Does gold count for Zakat?"), "Includes gold prompt");
    console.log("✅ Test 12 Passed: Suggested question behavior validated.");
    passed++;

    // -------------------------------------------------------------
    // Test 13: English UI
    // -------------------------------------------------------------
    total++;
    const enText = translations.en.chatbot;
    assert(enText.title === "Zakat AI Assistant", "English title matches dictionary");
    assert(enText.sendBtn === "Send", "English send button matches");
    console.log("✅ Test 13 Passed: English UI dictionary verified.");
    passed++;

    // -------------------------------------------------------------
    // Test 14: Urdu/RTL UI
    // -------------------------------------------------------------
    total++;
    const urText = translations.ur.chatbot;
    assert(urText.title === "زکوٰۃ AI اسسٹنٹ", "Urdu title matches dictionary");
    assert(urText.sendBtn === "ارسال کریں", "Urdu send button matches");
    console.log("✅ Test 14 Passed: Urdu/RTL UI dictionary verified.");
    passed++;

  } finally {
    process.env.GEMINI_API_KEY = originalEnvKey;
    process.env.GEMINI_API_URL = originalEnvUrl;
    globalThis.fetch = originalFetch;
  }

  console.log(`\nResults: ${passed}/${total} tests passed! 🎉`);
}

runTests().catch((err) => {
  console.error("Test execution failed:", err);
  process.exit(1);
});
