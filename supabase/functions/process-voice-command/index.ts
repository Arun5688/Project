import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { transcript } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const systemPrompt = `You are an AI assistant for a Crime Rate Detector (CRD) system used by law enforcement investigators.

Your job is to parse voice commands and extract structured information. Categorize commands into:
- SEARCH: Search for cases (e.g., "Show me all armed robberies in Sector 9")
- FILTER: Apply filters to existing results
- TEMPORAL: Time-based queries (e.g., "this month", "last week", "between January and March")
- LOCATION: Location-based queries (e.g., "near Sector 9", "in downtown area")
- DETAILS: Request case details
- CLARIFICATION: When command is ambiguous, ask clarifying questions

Extract parameters like:
- Crime type (robbery, assault, burglary, theft, etc.)
- Location/sector
- Time range
- Case ID

Respond in JSON format:
{
  "type": "SEARCH" | "FILTER" | "TEMPORAL" | "LOCATION" | "DETAILS" | "CLARIFICATION",
  "confidence": 0-1,
  "parameters": {
    "crimeType": string | null,
    "location": string | null,
    "timeRange": string | null,
    "caseId": string | null
  },
  "query": "natural language query",
  "clarification": "question to ask if ambiguous" | null,
  "response": "user-friendly response"
}`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: transcript }
        ],
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded, please try again later." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Payment required, please add credits to your workspace." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      return new Response(
        JSON.stringify({ error: "AI processing error" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const data = await response.json();
    const aiResponse = data.choices[0].message.content;
    
    // Try to parse JSON response
    let parsedResponse;
    try {
      // Extract JSON from markdown code blocks if present
      const jsonMatch = aiResponse.match(/```json\s*([\s\S]*?)\s*```/) || 
                        aiResponse.match(/```\s*([\s\S]*?)\s*```/);
      const jsonStr = jsonMatch ? jsonMatch[1] : aiResponse;
      parsedResponse = JSON.parse(jsonStr);
    } catch (e) {
      // If parsing fails, create a basic response
      parsedResponse = {
        type: "CLARIFICATION",
        confidence: 0.5,
        parameters: {},
        query: transcript,
        response: aiResponse,
        clarification: "I understood your command but need more details. Could you be more specific?"
      };
    }

    return new Response(
      JSON.stringify(parsedResponse),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error("Error in process-voice-command:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
