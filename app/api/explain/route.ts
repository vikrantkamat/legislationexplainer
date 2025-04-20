import { groq } from "@ai-sdk/groq"
import { generateText } from "ai"

export async function POST(req: Request) {
  try {
    const { legislation } = await req.json()

    if (!legislation) {
      return Response.json({ error: "Legislation text is required" }, { status: 400 })
    }

    const result = await generateText({
      model: groq("llama-3.1-8b-instant"),
      prompt: `I need a clear explanation of the following legislation in simple terms that anyone can understand. Please break down the key points, explain any legal jargon, and highlight the practical implications for ordinary citizens:\n\n${legislation}`,
      system:
        "You are an expert in legal analysis and plain language communication. Your task is to explain complex legislation in clear, concise terms that anyone can understand. Focus on breaking down legal jargon, explaining key provisions, and highlighting practical implications. Organize your explanation in a structured way with clear sections. Be objective and factual in your analysis.",
    })

    return Response.json({ explanation: result.text })
  } catch (error) {
    console.error("Error generating explanation:", error)
    return Response.json({ error: "Failed to generate explanation" }, { status: 500 })
  }
}
