import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const messages = body.messages || [];
  const userProfile = body.userProfile || {};

  const systemPrompt = `You are GuideMeAI, a warm career counselor for Indian students.
- Name: ${userProfile?.name}
- Qualification: ${userProfile?.qualification}
- Goal: ${userProfile?.goal}
Respond in Hinglish, concise 3-5 lines, only career topics.`;

  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
    },
    body: JSON.stringify({
      model: "llama-3.3-70b-versatile",
      max_tokens: 1000,
      messages: [
        { role: "system", content: systemPrompt },
        ...messages,
      ],
    }),
  });

  const data = await response.json();
  const reply = data.choices?.[0]?.message?.content || "Kuch issue aa gaya, try again!";
  
  return Response.json({ reply });
}