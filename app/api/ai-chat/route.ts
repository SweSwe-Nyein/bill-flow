import { NextResponse } from "next/server";
import OpenAI from "openai";
import {GoogleGenerativeAI} from "@google/generative-ai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function generateWithGemini(message: string) {
  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(message);
    const replyMessage = result.response.text(); 
    const theResponse = {
      role: 'assistant',
      content: replyMessage
    }
    return theResponse;
  } catch (error) {
    console.error('Gemini API Error:', error);
    throw new Error('Failed to generate response with Gemini AI');
  }
}

export async function POST(req: Request) {
  const body = await req.json();
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: body.messages,
    });
    const theResponse = completion.choices[0].message;

    return NextResponse.json({ output: theResponse }, { status: 200 });
  } catch (error) {
    console.error('OpenAI API Error:', error);
    try {
      const theResponse = await generateWithGemini(body.messages[body.messages.length - 1].content);
      return NextResponse.json({ output: theResponse }, { status: 200 });
    } catch (geminiError) {
      console.error('Gemini API Error:', geminiError);
      return NextResponse.json({ error: geminiError }, { status: 500 });
    }
  }
}