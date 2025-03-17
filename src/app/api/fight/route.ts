// app/api/gemini/route.ts
import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(request: Request)
{
    try {
        const url = new URL(request.url);
        
        const pokemonA = url.searchParams.get('pokemonA');
        const pokemonB = url.searchParams.get('pokemonB');

        const apiKey = process.env.GEMINI_API_KEY;

        const prompt = `who would win in a fight between ${pokemonA} and ${pokemonB}. Respond in the following form: {"id": this should be the number id of the winning pokemon and contained, "reason": this should be the reason behind the choice of the winning pokemon}. Do not include anything else in the response`;

        if (!apiKey) {
        return NextResponse.json({ error: 'Missing GOOGLE_API_KEY' }, { status: 500 });
        }

        if (!prompt || typeof prompt !== 'string') {
        return NextResponse.json({ error: 'Missing or invalid prompt' }, { status: 400 });
        }

        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

        const result = await model.generateContent(prompt);
        const response = await result.response;

        const text = response.text();

        return NextResponse.json({ result: text }, { status: 200 });

    } catch (error: unknown) {
        console.error('Gemini API Error:', error);
        return NextResponse.json({ error: error || 'Internal Server Error' }, { status: 500 });
    }
}