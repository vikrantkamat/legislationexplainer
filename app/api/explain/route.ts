import { groq } from "@ai-sdk/groq"
import { generateText } from "ai"

export async function POST(req: Request) {
  try {
    const { legislation } = await req.json()

    if (!legislation) {
      return Response.json({ error: "Legislation text is required" }, { status: 400 })
    }

    // Check if this is a bill title request (not full text)
    const isBillTitleRequest =
      legislation.includes("Please explain this legislation") || legislation.includes("explain this bill")

    // Extract bill number if available
    let billNumber = null
    if (isBillTitleRequest) {
      // Try to extract bill number from the request
      const billNumberMatch = legislation.match(/([HS]\.\s*\d+|[HS]R\s*\d+|H\.\s*R\.\s*\d+)/i)
      if (billNumberMatch) {
        billNumber = billNumberMatch[0].replace(/\s+/g, "")
      }
    }

    // Create a more authoritative system prompt
    const systemPrompt = `You are an expert legislative analyst providing factual, authoritative explanations of legislation. 
    
Your task is to explain legislation in clear, simple language that anyone can understand, while maintaining complete accuracy.

IMPORTANT GUIDELINES:
1. Use definitive, authoritative language. Avoid hedging terms like "if", "could", "should", "would", "might", "may".
2. Present information as established facts, not possibilities or opinions.
3. Base your explanation ONLY on the actual text of the legislation provided.
4. Break down complex legal concepts into plain language without oversimplification.
5. Organize your explanation in a clear, structured format.
6. Focus on what the legislation DOES establish, not what it might do or could lead to.
7. Do not include any personal opinions, political commentary, or subjective assessments.
8. Do not use asterisks or markdown formatting in your response.
9. When explaining a bill by its number or title, state clearly that your explanation is based on the official text from Congress.gov, Senate.gov, or House.gov.
10. Present the information as if you have directly analyzed the official bill text from government sources.

Your explanation should read as an authoritative, factual breakdown that a government agency would provide.`

    // If we have a bill number, include it in the prompt
    const promptPrefix = billNumber
      ? `I need a factual explanation of bill ${billNumber} based on the official text from Congress.gov. Explain in simple terms what this legislation establishes and its key provisions:\n\n`
      : `I need a factual explanation of the following legislation based on its official text. Explain in simple terms what this legislation establishes and its key provisions:\n\n`

    const result = await generateText({
      model: groq("llama-3.1-8b-instant"),
      prompt: `${promptPrefix}${legislation}`,
      system: systemPrompt,
      temperature: 0.1, // Lower temperature for more factual, deterministic responses
    })

    // Clean up the text by removing asterisks and any markdown formatting
    const cleanedText = result.text.replace(/\*\*/g, "").replace(/\*/g, "")

    return Response.json({ explanation: cleanedText })
  } catch (error) {
    console.error("Error generating explanation:", error)
    return Response.json({ error: "Failed to generate explanation" }, { status: 500 })
  }
}
