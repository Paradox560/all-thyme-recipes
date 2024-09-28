import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";
import * as dotenv from "dotenv"

dotenv.config()

export async function POST(req, res) {
    try {
        //retrieve API key from environmnet variable
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)
        //set gemini model to use
        const model = genAI.getGenerativeModel({
          model: "gemini-1.5-flash",
          systemInstruction: `
            You are a food specialist, you take in all of the ingredients and their respective expiration dates and return a list of recipes that can be made with these ingredients.
            Try to prioritize including the items with the earliest expiration dates but this is not a hard requirement, you can choose from any of the ingredients provided but only these.
            The "name" should be the name of the meal, the "image" should be the image of the meal in the form of the image address, the "description" should be the description of the meal,
            the "ingredients" should be the ingredient list for this meal, and finally the "link" is the link to the recipe with steps to make the meal.
            You should return in the following JSON format:
            {
              recipeInfo:[
                {
                  "name": str,
                  "image": str,
                  "description": str,
                  "link": str
                }
              ]
            }
            `,
          generationConfig: { responseMimeType: "application/json" }
        })
        //receive "prompt" from request
        const data = await req.text()
        //set actual prompt from request
        const prompt = [
                    { role: 'system', content: "say hi" },
                    { role: 'user', content: data.text },
                    ]
        //generate ai response from the model
        const result = await model.generateContent(data)
        const response = await result.response;
        const textList = await response.text()
        // Parse the JSON response from the Gemini API
        const flashcards = JSON.parse(textList).recipeInfo
        //Return the flashcards as a JSON response
        return NextResponse.json(flashcards)
    } catch (error) {
        console.log("GenAI request error: %s", error)
    }
}