"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"

const EXAMPLES = [
  "AI app for restaurant management in Tier 2 Indian cities",
  "Affordable cloud kitchen platform for small food entrepreneurs",
  "AI tutor for BTech students focused on placement preparation",
  "WhatsApp-based CRM for local shop owners in India",
  "HRMS hire to retire platform for Indian SMEs"
]

const FEATURES = [
  { icon: "🔍", label: "Market Analysis", color: "text-neon-blue" },
  { icon: "📊", label: "Competitors", color: "text-neon-purple" },
  { icon: "😈", label: "RiskLens AI", color: "text-neon-red" },
  { icon: "🏆", label: "Score Card", color: "text-neon-orange" },
  { icon: "🗺️", label: "India Heatmap", color: "text-neon-green" },
  { icon: "✅", label: "Originality", color: "text-neon-pink" },
  { icon: "💼", label: "Investors", color: "text-neon-blue" },
  { icon: "💬", label: "AI Copilot", color: "text-neon-purple" }
]

export default function Home() {
  const [idea, setIdea] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleAnalyze = () => {
    if (!idea.trim() || idea.trim().length < 10) return
    setLoading(true)
    router.push(`/results?idea=${encodeURIComponent(idea.trim())}`)
  }

  return (
    <main className="min-h-screen hero-bg grid-overlay flex flex-col items-center justify-center p-6 relative overflow-hidden">

      {/* Background glow orbs */}
      <div className="absolute top-20 left-20 w-96 h-96 rounded-full opacity-10 blur-3xl" style={{background: "radial-gradient(circle, #0066ff, transparent)"}} />
      <div className="absolute bottom-20 right-20 w-80 h-80 rounded-full opacity-10 blur-3xl" style={{background: "radial-gradient(circle, #9900ff, transparent)"}} />
      <div className="absolute top-1/2 left-1/2 w-64 h-64 rounded-full opacity-5 blur-3xl -translate-x-1/2 -translate-y-1/2" style={{background: "radial-gradient(circle, #00ffaa, transparent)"}} />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-center mb-10 relative z-10"
      >
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl"
            style={{background: "rgba(0,100,255,0.2)", border: "1px solid rgba(0,150,255,0.5)", boxShadow: "0 0 20px rgba(0,150,255,0.3)"}}>
            🚀
          </div>
          <h1 className="text-5xl font-black tracking-tight">
            <span className="text-white">Startup</span>
            <span className="gradient-text">IQ</span>
            <span className="text-white"> AI</span>
          </h1>
        </div>
        <p className="text-gray-400 text-xl mb-2">AI-Powered Startup Intelligence Platform</p>
        <div className="flex items-center justify-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-400 pulse-dot" style={{boxShadow: "0 0 8px #00ff64"}} />
          <p className="text-gray-500 text-sm">Validate any startup idea in 60 seconds • Built for India</p>
        </div>
      </motion.div>

      {/* Main Input */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="w-full max-w-2xl relative z-10"
      >
        <div className="card" style={{border: "1px solid rgba(0,150,255,0.3)", boxShadow: "0 0 40px rgba(0,100,255,0.1), inset 0 0 40px rgba(0,0,0,0.3)"}}>
          <label className="text-gray-400 text-sm mb-3 block font-medium">Enter your startup idea</label>
          <textarea
            className="w-full rounded-xl p-4 text-base resize-none transition-all input-neon"
            rows={4}
            value={idea}
            onChange={(e) => setIdea(e.target.value)}
            placeholder="Example: AI app for restaurant management targeting small restaurants in Tier 2 Indian cities..."
            onKeyDown={(e) => { if (e.key === "Enter" && e.ctrlKey) handleAnalyze() }}
          />
          <button
            onClick={handleAnalyze}
            disabled={loading || idea.trim().length < 10}
            className="w-full mt-4 font-bold py-4 rounded-xl text-lg transition-all flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
            style={{
              background: idea.trim().length >= 10 ? "linear-gradient(135deg, rgba(0,100,255,0.3), rgba(150,0,255,0.3))" : "rgba(30,30,50,0.5)",
              border: idea.trim().length >= 10 ? "1px solid rgba(0,150,255,0.6)" : "1px solid rgba(100,100,100,0.3)",
              boxShadow: idea.trim().length >= 10 ? "0 0 20px rgba(0,100,255,0.2), inset 0 0 20px rgba(0,100,255,0.05)" : "none",
              color: idea.trim().length >= 10 ? "#00d4ff" : "#666"
            }}
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                Analyzing...
              </>
            ) : (
              <>🔍 Analyze This Idea</>
            )}
          </button>
        </div>

        {/* Examples */}
        <div className="mt-5">
          <p className="text-gray-600 text-xs mb-3 text-center">Try an example</p>
          <div className="flex flex-wrap gap-2 justify-center">
            {EXAMPLES.map((ex, i) => (
              <button
                key={i}
                onClick={() => setIdea(ex)}
                className="text-xs px-3 py-2 rounded-lg transition-all"
                style={{
                  background: "rgba(10,10,30,0.8)",
                  border: "1px solid rgba(100,100,255,0.2)",
                  color: "#8888cc"
                }}
                onMouseEnter={e => {
                  e.target.style.borderColor = "rgba(0,150,255,0.5)"
                  e.target.style.color = "#00d4ff"
                  e.target.style.boxShadow = "0 0 10px rgba(0,150,255,0.1)"
                }}
                onMouseLeave={e => {
                  e.target.style.borderColor = "rgba(100,100,255,0.2)"
                  e.target.style.color = "#8888cc"
                  e.target.style.boxShadow = "none"
                }}
              >
                {ex.substring(0, 38)}...
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Features Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.5 }}
        className="mt-12 grid grid-cols-4 md:grid-cols-8 gap-4 max-w-3xl w-full relative z-10"
      >
        {FEATURES.map((f, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 + i * 0.05 }}
            className="text-center"
          >
            <div className="text-2xl mb-1">{f.icon}</div>
            <div className={`text-xs ${f.color} font-medium`}>{f.label}</div>
          </motion.div>
        ))}
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-8 flex gap-8 relative z-10"
      >
        {[
          { value: "60s", label: "Analysis Time" },
          { value: "8", label: "AI Features" },
          { value: "India", label: "Specific Data" }
        ].map((stat, i) => (
          <div key={i} className="text-center">
            <div className="text-2xl font-black gradient-text">{stat.value}</div>
            <div className="text-gray-600 text-xs">{stat.label}</div>
          </div>
        ))}
      </motion.div>

      <p className="text-gray-700 text-xs mt-8 text-center max-w-md relative z-10">
        All insights are AI-generated advisory recommendations only. Not financial or legal advice.
        Source: Web Intelligence + AI Synthesis
      </p>
    </main>
  )
}