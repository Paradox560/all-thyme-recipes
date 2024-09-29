// import { GoogleGenerativeAI } from "@google/generative-ai";
// import { NextResponse } from "next/server";
// import * as dotenv from "dotenv";

// dotenv.config();

// export async function POST(sysPrompt: string, req: Request, res: Response) {
//   try {
//     //retrieve API key from environmnet variable
//     const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
//     //set gemini model to use
//     const model = genAI.getGenerativeModel({
//       model: "gemini-1.5-flash",
//       systemInstruction: sysPrompt,
//       generationConfig: { responseMimeType: "application/json" },
//     });
//     //receive "prompt" from request
//     const data = await req.text();
//     //set actual prompt from request
//     // const prompt = [
//     //   { role: "system", content: "say hi" },
//     //   { role: "user", content: data.text },
//     // ];
//     //generate ai response from the model
//     const result = await model.generateContent(data);
//     const response = await result.response;
//     const textList = await response.text();
//     // Parse the JSON response from the Gemini API
//     const information = JSON.parse(textList).info;
//     //Return the flashcards as a JSON response
//     return NextResponse.json(information);
//   } catch (error) {
//     console.log("GenAI request error: %s", error);
//   }
// }

import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-pro", generationConfig: {
        responseMimeType: "application/json"
      }
    });

    const { systemPrompt, userPrompt } = await req.json();

    const result = await model.generateContent({
      contents: [
        {
          role: "user",
          parts: [{ text: systemPrompt }]
        },
        {
          role: "user",
          parts: [{ text: userPrompt }]
        }
      ]
    });

    const response = await result.response;
    const textResponse = response.text();

    // Assuming the response is JSON, parse it
    const information = JSON.parse(textResponse);

    return NextResponse.json(information);
  } catch (error) {
    console.error("GenAI request error:", error);
    return NextResponse.json({ error: "An error occurred processing your request" }, { status: 500 });
  }
}