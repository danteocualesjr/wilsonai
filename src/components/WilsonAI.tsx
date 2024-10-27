'use client'
import { useState } from 'react'
import { Sparkles, Send } from 'lucide-react'

const VolleyballIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="11" stroke="currentColor" strokeWidth="2"/>
    <path d="M12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3" stroke="currentColor" strokeWidth="2"/>
    <path d="M21 12C21 16.9706 16.9706 21 12 21" stroke="currentColor" strokeWidth="2"/>
    <circle cx="9" cy="10" r="1.5" fill="currentColor"/>
    <circle cx="15" cy="10" r="1.5" fill="currentColor"/>
  </svg>
)

export default function WilsonAI() {
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant'; content: string }[]>([])
  const [input, setInput] = useState('')

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { role: 'user', content: input }])
      setTimeout(() => {
        setMessages(prev => [...prev, { role: 'assistant', content: `You said: ${input}` }])
      }, 1000)
      setInput('')
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-white p-4">
      <div className="w-full max-w-2xl rounded-xl bg-white shadow-lg">
        {/* Header */}
        <div className="flex items-center gap-2 border-b border-gray-200 p-4">
          <VolleyballIcon />
          <span className="text-xl font-semibold">WilsonAI</span>
          <Sparkles className="h-5 w-5 text-yellow-500" />
        </div>

        {/* Messages */}
        <div className="h-96 overflow-y-auto p-4 space-y-4">
          {messages.map((message, index) => (
            <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div 
                className={`rounded-lg px-4 py-2 max-w-[80%] ${
                  message.role === 'user' 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                {message.content}
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="border-t border-gray-200 p-4">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              className="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
            />
            <button
              onClick={handleSend}
              className="rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 transition-colors"
            >
              <Send className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}