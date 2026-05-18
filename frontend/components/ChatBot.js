"use client"
import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import axios from "axios"

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"

const QUICK_QUESTIONS = [
  "How do I validate this idea further?",
  "What should be my pricing strategy?",
  "How do I find my first 10 customers?",
  "What are the biggest risks I should address first?",
  "How much funding do I need to start?"
]

export default function ChatBot({ idea }) {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([
    { role: "bot", text: `Hi! I'm your AI Business Advisor. Ask me anything about your startup idea${idea ? ` — "${idea.substring(0, 50)}..."` : ""}. I'm here to help! 🚀` }
  ])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const sendMessage = async (text) => {
    const msg = text || input.trim()
    if (!msg) return
    setInput("")
    setMessages(prev => [...prev, { role: "user", text: msg }])
    setLoading(true)
    try {
      const res = await axios.post(`${API}/chat`, { message: msg, idea: idea || "" })
      setMessages(prev => [...prev, { role: "bot", text: res.data.reply }])
    } catch (e) {
      setMessages(prev => [...prev, { role: "bot", text: "Sorry, I'm having trouble connecting. Please try again in a moment." }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {/* Floating Button */}
      <motion.button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 w-14 h-14 text-white rounded-full shadow-2xl flex items-center justify-center text-2xl z-50 transition-all"
        style={{
          background: "rgba(0,100,255,0.3)",
          border: "1px solid rgba(0,150,255,0.6)",
          boxShadow: "0 0 20px rgba(0,150,255,0.3), 0 0 40px rgba(0,100,255,0.1)"
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {open ? "×" : "💬"}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 w-80 md:w-96 rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden"
            style={{
              height: "500px",
              background: "rgba(5,5,20,0.95)",
              border: "1px solid rgba(0,150,255,0.3)",
              boxShadow: "0 0 40px rgba(0,100,255,0.15), inset 0 0 40px rgba(0,0,0,0.5)",
              backdropFilter: "blur(20px)"
            }}
          >
            {/* Header */}
            <div className="px-4 py-3 flex items-center gap-3" style={{borderBottom: "1px solid rgba(0,150,255,0.2)", background: "rgba(0,50,100,0.2)"}}>
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm" style={{background: "rgba(0,100,255,0.3)", border: "1px solid rgba(0,150,255,0.5)", boxShadow: "0 0 10px rgba(0,150,255,0.3)"}}>🤖</div>
              <div>
                <p className="text-white font-semibold text-sm">AI Business Advisor</p>
                <p className="text-xs flex items-center gap-1 text-neon-green">
                  <span className="w-1.5 h-1.5 rounded-full inline-block bg-green-400" style={{boxShadow: "0 0 5px #00ff64"}} />
                  Online
                </p>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div className={`max-w-xs px-3 py-2 rounded-xl text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "bg-blue-600 text-white rounded-br-sm"
                      : "bg-gray-800 text-gray-200 rounded-bl-sm"
                  }`}>
                    {msg.text}
                  </div>
                </motion.div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-gray-800 px-3 py-2 rounded-xl rounded-bl-sm">
                    <div className="flex gap-1">
                      {[0,1,2].map(i => (
                        <div key={i} className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
                      ))}
                    </div>
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Quick Questions */}
            {messages.length === 1 && (
              <div className="px-4 pb-2">
                <p className="text-gray-600 text-xs mb-2">Quick questions:</p>
                <div className="flex flex-wrap gap-1">
                  {QUICK_QUESTIONS.slice(0, 3).map((q, i) => (
                    <button
                      key={i}
                      onClick={() => sendMessage(q)}
                      className="text-xs bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white px-2 py-1 rounded-lg transition-all border border-gray-700"
                    >
                      {q.substring(0, 30)}...
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="border-t border-gray-700 p-3 flex gap-2">
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === "Enter" && !e.shiftKey && sendMessage()}
                placeholder="Ask anything about your startup..."
                className="flex-1 bg-gray-800 text-white text-sm px-3 py-2 rounded-xl border border-gray-700 focus:border-blue-500 focus:outline-none"
              />
              <button
                onClick={() => sendMessage()}
                disabled={loading || !input.trim()}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 text-white px-3 py-2 rounded-xl transition-all text-sm"
              >
                →
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
