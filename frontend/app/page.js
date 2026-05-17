"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"

const EXAMPLES = [
  "AI app for restaurant management in Tier 2 Indian cities",
  "Affordable cloud kitchen platform for small food entrepreneurs",
  "AI tutor for BTech students focused on placement preparation",
  "WhatsApp-based CRM for local shop owners in India",
  "Hyperlocal delivery service for home cooked food"
]

export default function Home() {
  const [idea, setIdea] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleAnalyze = async () => {
    if (!idea.trim() || idea.trim().length < 10) return
    setLoading(true)
    router.push(`/results?idea=${encodeURIComponent(idea.trim())}`)
  }

  return (
    <main className="min-h-screen bg-gray-950 flex flex-col items-center justify-center p-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-xl">🚀</div>
          <h1 className="text-4xl font-bold text-white">StartupIQ <span className="text-blue-500">AI</span></h1>
        </div>
        <p className="text-gray-400 text-xl mb-2">AI-Powered Startup Intelligence Platform</p>
        <p className="text-gray-600 text-sm">Validate any startup idea in 60 seconds • Built for India</p>
      </motion.div>

      {/* Main Input Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="w-full max-w-2xl"
      >
        <div className="card">
          <label className="text-gray-400 text-sm mb-3 block">Enter your startup idea</label>
          <textarea
            className="w-full bg-gray-900 text-white rounded-xl p-4 text-base border border-gray-700 focus:border-blue-500 focus:outline-none resize-none transition-all"
            rows={4}
            value={idea}
            onChange={(e) => setIdea(e.target.value)}
            placeholder="Example: AI app for restaurant management targeting small restaurants in Tier 2 Indian cities..."
            onKeyDown={(e) => { if (e.key === "Enter" && e.ctrlKey) handleAnalyze() }}
          />

          <button
            onClick={handleAnalyze}
            disabled={loading || idea.trim().length < 10}
            className="w-full mt-4 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl text-lg transition-all flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Analyzing...
              </>
            ) : (
              <>🔍 Analyze This Idea</>
            )}
          </button>
        </div>

        {/* Example Ideas */}
        <div className="mt-6">
          <p className="text-gray-600 text-xs mb-3 text-center">Try an example</p>
          <div className="flex flex-wrap gap-2 justify-center">
            {EXAMPLES.map((ex, i) => (
              <button
                key={i}
                onClick={() => setIdea(ex)}
                className="text-xs bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white px-3 py-2 rounded-lg transition-all border border-gray-700 hover:border-gray-500"
              >
                {ex.substring(0, 40)}...
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Features Preview */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mt-12 grid grid-cols-3 md:grid-cols-6 gap-4 max-w-3xl w-full"
      >
        {[
          { icon: "🔍", label: "Market Analysis" },
          { icon: "📊", label: "Competitors" },
          { icon: "😈", label: "RiskLens AI" },
          { icon: "��", label: "Score Card" },
          { icon: "🗺️", label: "India Heatmap" },
          { icon: "✅", label: "Originality Check" }
        ].map((f, i) => (
          <div key={i} className="text-center">
            <div className="text-2xl mb-1">{f.icon}</div>
            <div className="text-gray-600 text-xs">{f.label}</div>
          </div>
        ))}
      </motion.div>

      <p className="text-gray-700 text-xs mt-8 text-center max-w-md">
        All insights are AI-generated advisory recommendations only. Not financial or legal advice.
        Source: Web Intelligence + AI Synthesis
      </p>
    </main>
  )
}