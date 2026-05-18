"use client"
import { useState, useEffect, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import axios from "axios"
import MarketAnalyzer from "../../components/MarketAnalyzer"
import CompetitorChart from "../../components/CompetitorChart"
import RiskLens from "../../components/RiskLens"
import ScoreCard from "../../components/ScoreCard"
import IndiaHeatmap from "../../components/IndiaHeatmap"
import OriginalityCheck from "../../components/OriginalityCheck"
import ChatBot from "../../components/ChatBot"

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"

const STEPS = [
  { id: "market", label: "Analyzing market demand...", icon: "🔍" },
  { id: "competitors", label: "Mapping competitors...", icon: "📊" },
  { id: "risks", label: "Running RiskLens AI...", icon: "😈" },
  { id: "scorecard", label: "Generating score card...", icon: "🏆" },
  { id: "heatmap", label: "Building India heatmap...", icon: "🗺️" },
  { id: "originality", label: "Checking originality...", icon: "✅" }
]

function ResultsContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const idea = searchParams.get("idea") || ""

  const [currentStep, setCurrentStep] = useState(0)
  const [done, setDone] = useState(false)
  const [data, setData] = useState({})
  const [error, setError] = useState(null)
  const [activeTab, setActiveTab] = useState("market")

  useEffect(() => {
    if (!idea) { router.push("/"); return }
    runAnalysis()
  }, [idea])

  const runAnalysis = async () => {
    try {
      // Step 1 - Market
      setCurrentStep(0)
      const market = await axios.post(`${API}/analyze/market`, { idea })
      setData(d => ({ ...d, market: market.data }))

      // Step 2 - Competitors
      setCurrentStep(1)
      const competitors = await axios.post(`${API}/analyze/competitors`, { idea })
      setData(d => ({ ...d, competitors: competitors.data }))

      // Step 3 - Risks
      setCurrentStep(2)
      const risks = await axios.post(`${API}/analyze/risklens`, { idea })
      setData(d => ({ ...d, risks: risks.data }))

      // Step 4 - Scorecard
      setCurrentStep(3)
      const scorecard = await axios.post(`${API}/generate/scorecard`, {
        idea,
        market_score: market.data.market_demand_score || 70,
        saturation: competitors.data.saturation_level || "medium",
        trend: market.data.trend_direction || "growing"
      })
      setData(d => ({ ...d, scorecard: scorecard.data }))

      // Step 5 - Heatmap
      setCurrentStep(4)
      const heatmap = await axios.post(`${API}/analyze/heatmap`, { idea })
      setData(d => ({ ...d, heatmap: heatmap.data }))

      // Step 6 - Originality
      setCurrentStep(5)
      const originality = await axios.post(`${API}/analyze/originality`, { idea })
      setData(d => ({ ...d, originality: originality.data }))

      setDone(true)
    } catch (err) {
      console.error(err)
      setError("Analysis failed. Please try again.")
    }
  }

  if (error) return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center">
      <div className="text-center">
        <div className="text-4xl mb-4">❌</div>
        <p className="text-red-400 mb-4">{error}</p>
        <button onClick={() => router.push("/")} className="bg-blue-600 text-white px-6 py-3 rounded-xl">Try Again</button>
      </div>
    </div>
  )

  if (!done) return (
    <div className="min-h-screen hero-bg grid-overlay flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="text-4xl mb-3">🚀</div>
          <h2 className="text-2xl font-bold text-white mb-2">Analyzing Your Idea</h2>
          <p className="text-gray-500 text-sm truncate">{idea}</p>
        </div>

        <div className="space-y-3">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0.3 }}
              animate={{ opacity: i <= currentStep ? 1 : 0.3 }}
              className="flex items-center gap-3 p-3 rounded-xl"
              style={{
                background: i === currentStep ? "rgba(0,50,100,0.3)" : "rgba(10,10,30,0.5)",
                border: i === currentStep ? "1px solid rgba(0,150,255,0.4)" : "1px solid rgba(100,100,255,0.1)",
                boxShadow: i === currentStep ? "0 0 15px rgba(0,150,255,0.1)" : "none"
              }}
            >
              <span className="text-xl">{step.icon}</span>
              <span className={`text-sm flex-1 ${i < currentStep ? "text-neon-green" : i === currentStep ? "text-neon-blue" : "text-gray-600"}`}>
                {step.label}
              </span>
              {i < currentStep && <span className="text-neon-green text-sm">✓</span>}
              {i === currentStep && (
                <div className="w-4 h-4 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
              )}
            </motion.div>
          ))}
        </div>

        <div className="mt-6 h-2 rounded-full overflow-hidden" style={{background: "rgba(100,100,255,0.1)"}}>
          <motion.div
            className="h-full rounded-full loading-bar"
            animate={{ width: `${((currentStep + 1) / STEPS.length) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
        <p className="text-gray-600 text-xs text-center mt-2">{currentStep + 1} of {STEPS.length} analyses complete</p>
      </div>
    </div>
  )

  const TABS = [
    { id: "market", label: "Market", icon: "🔍" },
    { id: "competitors", label: "Competitors", icon: "📊" },
    { id: "risks", label: "RiskLens", icon: "😈" },
    { id: "scorecard", label: "Score Card", icon: "🏆" },
    { id: "heatmap", label: "Heatmap", icon: "🗺️" },
    { id: "originality", label: "Originality", icon: "✅" }
  ]

  return (
    <div className="min-h-screen hero-bg grid-overlay">
      {/* Top Bar */}
      <div className="px-6 py-4 flex items-center justify-between" style={{borderBottom: "1px solid rgba(100,100,255,0.15)", background: "rgba(5,5,16,0.8)", backdropFilter: "blur(10px)"}}>

        <div className="flex items-center gap-3">
          <button onClick={() => router.push("/")} className="text-gray-500 hover:text-white transition-colors">← Back</button>
          <div className="w-px h-4 bg-gray-700" />
          <span className="text-white font-semibold">StartupIQ AI</span>
        </div>
        <div className="text-gray-500 text-sm truncate max-w-xs hidden md:block">{idea}</div>
        <div className="flex items-center gap-2">
          <a href="/investors" className="text-xs bg-purple-900/40 hover:bg-purple-800/40 text-purple-400 border border-purple-800 px-3 py-1.5 rounded-lg transition-all">
            💼 Find Investors
          </a>
          <div className="w-2 h-2 bg-green-400 rounded-full pulse-dot" />
          <span className="text-green-400 text-xs">Analysis Complete</span>
        </div>
      </div>

      {/* Score Banner */}
      {data.scorecard && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="px-6 py-3 flex items-center justify-between"
          style={{background: "rgba(0,50,100,0.2)", borderBottom: "1px solid rgba(0,150,255,0.2)", backdropFilter: "blur(10px)"}}
        >
          <span className="text-gray-400 text-sm">Overall Opportunity Score</span>
          <div className="flex items-center gap-2">
            <span className="text-3xl font-bold text-neon-blue">{data.scorecard.overall_score}</span>
            <span className="text-gray-500">/100</span>
            <span className={`text-xs px-2 py-1 rounded-full badge-neon ${
              data.scorecard.overall_score >= 70 ? "badge-green" :
              data.scorecard.overall_score >= 50 ? "badge-orange" : "badge-red"
            }`}>
              {data.scorecard.india_market_readiness?.toUpperCase()}
            </span>
          </div>
        </motion.div>
      )}

      {/* Tabs */}
      <div className="px-6 overflow-x-auto" style={{borderBottom: "1px solid rgba(100,100,255,0.15)", background: "rgba(5,5,16,0.6)"}}>
        <div className="flex gap-1 min-w-max">
          {TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-3 text-sm font-medium transition-all border-b-2 whitespace-nowrap ${
                activeTab === tab.id
                  ? "border-cyan-400 text-cyan-400 tab-active"
                  : "border-transparent text-gray-500 hover:text-gray-300"
              }`}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-6 max-w-6xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === "market" && data.market && <MarketAnalyzer data={data.market} idea={idea} />}
            {activeTab === "competitors" && data.competitors && <CompetitorChart data={data.competitors} />}
            {activeTab === "risks" && data.risks && <RiskLens data={data.risks} />}
            {activeTab === "scorecard" && data.scorecard && <ScoreCard data={data.scorecard} idea={idea} />}
            {activeTab === "heatmap" && data.heatmap && <IndiaHeatmap data={data.heatmap} />}
            {activeTab === "originality" && data.originality && <OriginalityCheck data={data.originality} />}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="text-center py-6 text-xs" style={{color: "rgba(100,100,150,0.5)"}}>
        Source: Web Intelligence + AI Synthesis | All insights are advisory recommendations only. Not financial or legal advice.
      </div>

      <ChatBot idea={idea} />
    </div>
  )
}

export default function Results() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-950 flex items-center justify-center"><div className="text-white">Loading...</div></div>}>
      <ResultsContent />
    </Suspense>
  )
}