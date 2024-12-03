// Import Next.js Response utility

import { NextResponse } from 'next/server';

// API route handler for POST requests

export async function POST(req: Request) {
  try {
    
    // Extract message from request body
    
    const { message } = await req.json();

    console.log('Received message:', message);

    // Make request to local Ollama API endpoint
    
    const testResponse = await fetch('http://127.0.0.1:11434/api/generate', {

      method: 'POST',

      headers: {
        
        'Content-Type': 'application/json',

      },
      
      body: JSON.stringify({
        
        model: 'mistral', // Using Mistral language model
        
        prompt: message, // Pass user message as prompt

        stream: false // Get complete response, not streaming

      }),
      
    });

    // Get raw response text for logging

    const responseText = await testResponse.text();

    console.log('Raw Ollama response:', responseText);

    // Parse JSON response

    const data = JSON.parse(responseText);

    console.log('Parsed Ollama response:', data);

    // Check if request was successful
    
    if (!testResponse.ok) {

      throw new Error(`Ollama API error: ${testResponse.status}`);
      
    }

    // Validate response structure

    if (!data.response) {
      
      console.error('No response field in data:', data);

      throw new Error('Invalid response structure from Ollama');
      
    }

    // Return successful response with AI output and debug info

    return NextResponse.json({ 

      response: data.response,
      
      debug: {

        status: testResponse.status,
        
        data: data

      }
      
    });

  } catch (error) {

    // Log and return error response

    console.error('Detailed error:', error);
    
    return NextResponse.json({

      error: 'Failed to get response',
      
      details: error.message

    }, { 
      
      status: 500 // Return 500 status code for server errors

    });
    
  }
}