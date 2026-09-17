import * as z from "zod";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

const leadAnalysisSchema = z.object({
    classification: z
        .enum(["HOT", "COLD"])
        .describe("Classification of the lead as HOT or COLD"),

    score: z
        .number()
        .min(0)
        .max(100)
        .describe("Score the lead from 0 to 100"),

    reason: z
        .array(z.string())
        .describe("Reasons explaining why the lead received this score"),
});

type InputType = {
    leadId: string;
    question: string;
};

export async function leadAnalysis(inputType: InputType) {
    console.log(
        "This is the input question field:",
        inputType.question
    );

    const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: `
            You are an expert business lead analyst.

            Analyze the following lead information and determine:
            1. Whether the lead is HOT or COLD.
            2. A score from 0 to 100.
            3. The reasons behind the score.

            Lead information:
            ${inputType.question}
                    `,
        config: {
            responseMimeType: "application/json",
            responseJsonSchema: z.toJSONSchema(leadAnalysisSchema),
        },
    });

    console.log("AI response:", response.text);

    const result = leadAnalysisSchema.parse(
        JSON.parse(response.text!)
    );

    return result;
}