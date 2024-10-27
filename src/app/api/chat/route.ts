import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { message } = await req.json();
    console.log('Received message:', message);

    // Test Ollama connection
    const testResponse = await fetch('http://127.0.0.1:11434/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'mistral',
        prompt: message,
        stream: false
      }),
    });

    // Log the raw response
    const responseText = await testResponse.text();
    console.log('Raw Ollama response:', responseText);

    // Parse the response
    const data = JSON.parse(responseText);
    console.log('Parsed Ollama response:', data);

    if (!testResponse.ok) {
      throw new Error(`Ollama API error: ${testResponse.status}`);
    }

    // Check if we have a response field
    if (!data.response) {
      console.error('No response field in data:', data);
      throw new Error('Invalid response structure from Ollama');
    }

    return NextResponse.json({ 
      response: data.response,
      debug: {
        status: testResponse.status,
        data: data
      }
    });

  } catch (error) {
    console.error('Detailed error:', error);
    return NextResponse.json({
      error: 'Failed to get response',
      details: error.message
    }, { 
      status: 500 
    });
  }
}