'use client'
// Import necessary React hooks and icons
import { useState, useRef, useEffect } from 'react'
import { Sparkles, Send } from 'lucide-react'

// Custom volleyball icon component that renders a volleyball SVG with eyes
const VolleyballIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Outer circle of the volleyball */}
    <circle cx="12" cy="12" r="11" stroke="currentColor" strokeWidth="2"/>
    {/* Left curve line */}
    <path d="M12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3" stroke="currentColor" strokeWidth="2"/>
    {/* Right curve line */}
    <path d="M21 12C21 16.9706 16.9706 21 12 21" stroke="currentColor" strokeWidth="2"/>
    {/* Left eye */}
    <circle cx="9" cy="10" r="1.5" fill="currentColor"/>
    {/* Right eye */}
    <circle cx="15" cy="10" r="1.5" fill="currentColor"/>
  </svg>
)

export default function WilsonAI() {
  // State management for chat messages array
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant'; content: string }[]>([])
  // State for input field value
  const [input, setInput] = useState('')
  // State to track when API request is in progress
  const [isLoading, setIsLoading] = useState(false)
  // Reference for auto-scrolling to bottom of chat
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Function to smoothly scroll to bottom of messages container
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  // Effect hook to trigger scroll when messages update
  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Handler for sending messages to the AI
  const handleSend = async () => {
    // Only proceed if there's non-empty input and no request in progress
    if (input.trim() && !isLoading) {
      setIsLoading(true)
      // Add user's message to chat immediately
      setMessages(prev => [...prev, { role: 'user', content: input }])
      
      try {
        // Make API request to chat endpoint
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ message: input }),
        });

        // Check if response was successful
        if (!response.ok) {
          throw new Error(`API returned ${response.status}`);
        }

        const data = await response.json();
        
        // Check for API-level errors
        if (data.error) {
          throw new Error(data.error);
        }

        // Add AI's response to chat
        setMessages(prev => [...prev, { 
          role: 'assistant', 
          content: data.response 
        }]);
      } catch (error) {
        console.error('Chat error:', error);
        // Display error message in chat if something went wrong
        setMessages(prev => [...prev, { 
          role: 'assistant', 
          content: `Error: ${error.message}. Please try again.` 
        }]);
      } finally {
        setInput('') // Clear input field
        setIsLoading(false) // Reset loading state
      }
    }
  }

  return (
    // Main container with full height and centered content
    <div className="flex min-h-screen items-center justify-center bg-white p-4">
      {/* Chat interface container with max width and shadow */}
      <div className="w-full max-w-2xl rounded-xl bg-white shadow-lg">
        {/* Header section with logo and title */}
        <div className="flex items-center gap-2 border-b border-gray-200 p-4">
          <VolleyballIcon />
          <span className="text-xl font-semibold">WilsonAI</span>
          <Sparkles className="h-5 w-5 text-yellow-500" />
        </div>

        {/* Scrollable messages container */}
        <div className="h-96 overflow-y-auto p-4 space-y-4">
          {/* Map through and render all chat messages */}
          {messages.map((message, index) => (
            <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div 
                className={`rounded-lg px-4 py-2 max-w-[80%] ${
                  message.role === 'user' 
                    ? 'bg-blue-500 text-white' // Style for user messages
                    : 'bg-gray-100 text-gray-800' // Style for AI messages
                }`}
              >
                {message.content}
              </div>
            </div>
          ))}
          {/* Loading animation dots */}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-gray-100 rounded-lg px-4 py-2">
                <div className="flex space-x-2 items-center">
                  {/* Three bouncing dots with different animation delays */}
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} /> {/* Invisible element for scroll anchoring */}
        </div>

        {/* Input and send button section */}
        <div className="border-t border-gray-200 p-4">
          <div className="flex gap-2">
            {/* Text input field for user messages */}
            <input
              type="text"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()} // Allow sending with Enter key
              className="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
              disabled={isLoading}
            />
            {/* Send button with loading state */}
            <button
              onClick={handleSend}
              className={`rounded-lg px-4 py-2 text-white transition-colors ${
                isLoading 
                  ? 'bg-blue-300 cursor-not-allowed' // Disabled style during loading
                  : 'bg-blue-500 hover:bg-blue-600' // Interactive style when enabled
              }`}
              disabled={isLoading}
            >
              <Send className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}