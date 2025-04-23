import { groq } from "@ai-sdk/groq"
import { generateText } from "ai"

export async function POST(req: Request) {
  try {
    const { legislation } = await req.json()

    if (!legislation) {
      return Response.json({ error: "Legislation text is required" }, { status: 400 })
    }

    // Check if this is a bill title request (not full text)
    const isBillTitleRequest = legislation.includes("Please explain this legislation")

    const systemPrompt = isBillTitleRequest
      ? "You are an expert in legal analysis and plain language communication. Your task is to explain legislation based on its title. Even if you don't have the full text, provide a helpful explanation of what this type of bill likely covers, its potential provisions, and implications based on similar legislation. Be informative and educational. Do not use asterisks or markdown formatting in your response. Do not mention that you don't have the full text - instead, provide the best explanation you can based on the title."
      : "You are an expert in legal analysis and plain language communication. Your task is to explain complex legislation in clear, concise terms that anyone can understand. Focus on breaking down legal jargon, explaining key provisions, and highlighting practical implications. Organize your explanation in a structured way with clear sections. Be objective and factual in your analysis. Do not use asterisks or markdown formatting in your response."

    const result = await generateText({
      model: groq("llama-3.1-8b-instant"),
      prompt: `I need a clear explanation of the following legislation in simple terms that anyone can understand. Please break down the key points, explain any legal jargon, and highlight the practical implications for ordinary citizens:\n\n${legislation}`,
      system: systemPrompt,
    })

    // Clean up the text by removing asterisks and any markdown formatting
    const cleanedText = result.text.replace(/\*\*/g, "").replace(/\*/g, "")

    return Response.json({ explanation: cleanedText })
  } catch (error) {
    console.error("Error generating explanation:", error)
    return Response.json({ error: "Failed to generate explanation" }, { status: 500 })
  }
}
