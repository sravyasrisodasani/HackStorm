"use client"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import axios from "axios"
import MarketAnalyzer from "../components/MarketAnalyzer"
import CompetitorChart from "../components/CompetitorChart"
import RiskLens from "../components/RiskLens"
import ScoreCard from "../components/ScoreCard"
import IndiaHeatmap from "../components/IndiaHeatmap"
import OriginalityCheck from "../components/OriginalityCheck"
import ChatBot from "../components/ChatBot"

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"

const STEPS = [
  { id: "market", label: "Analyzing market demand...", icon: "🔍" },
  { id: "competitors", label: "Mapping competitors...", icon: "📊" },
  { id: "risks", label: "Running RiskLens AI...", icon: "😈" },
  { id: "scorecard", label: "Generating score card...", icon: "🏆" },
  { id: "heatmap", label: "Building India heatmap...", icon: "🗺️" },
  { id: "originality", label: "Checking originality...", icon: "✅" }
]

const EXAMPLES = [
  "AI app for restaurant management in Tier 2 Indian cities",
  "Affordable cloud kitchen platform for small food entrepreneurs",
  "AI tutor for BTech students focused on placement preparation",
  "WhatsApp-based CRM for local shop owners in India",
  "HRMS hire to retire platform for Indian SMEs"
]

const DEMO_INVESTORS = [
  { id: 1, name: "Arjun Mehta", firm: "Blume Ventures", email: "arjun@blume.vc", phone: "+91 98765 43210", sectors: "SaaS, AI/ML, B2B", ticket_size: "50L - 2Cr", stage: "Pre-Seed, Seed", bio: "Early stage investor focused on B2B SaaS and AI startups in India.", linkedin: "https://linkedin.com", equity_expected: "5% - 10%", investment_horizon: "5-7 years", board_seat: "Observer Seat", value_add: "Enterprise sales network, hiring support", portfolio_companies: "Razorpay, Setu, Smallcase", location: "Bangalore" },
  { id: 2, name: "Priya Sharma", firm: "Kalaari Capital", email: "priya@kalaari.com", phone: "+91 87654 32109", sectors: "FinTech, EdTech, D2C", ticket_size: "1Cr - 5Cr", stage: "Seed, Series A", bio: "Passionate about consumer tech and fintech disruption in Tier 2 India.", linkedin: "https://linkedin.com", equity_expected: "10% - 15%", investment_horizon: "5-7 years", board_seat: "Board Seat", value_add: "FinTech regulatory expertise, RBI connections", portfolio_companies: "Slice, Jar, Freo", location: "Mumbai" },
  { id: 3, name: "Rahul Gupta", firm: "Sequoia India", email: "rahul@sequoia.com", phone: "+91 76543 21098", sectors: "HealthTech, AgriTech, AI/ML", ticket_size: "5Cr - 20Cr", stage: "Series A, Series B+", bio: "Growth stage investor focused on impact-driven startups solving real Indian problems.", linkedin: "https://linkedin.com", equity_expected: "15% - 20%", investment_horizon: "7+ years", board_seat: "Board Seat", value_add: "Global network, US market entry support", portfolio_companies: "Byjus, Unacademy, Meesho", location: "Delhi" },
  { id: 4, name: "Sneha Patel", firm: "Nexus Venture Partners", email: "sneha@nexusvp.com", phone: "+91 65432 10987", sectors: "SaaS, B2B, Enterprise", ticket_size: "2Cr - 10Cr", stage: "Seed, Series A", bio: "Enterprise SaaS specialist. Helped 15+ startups scale from 0 to 10Cr ARR.", linkedin: "https://linkedin.com", equity_expected: "10% - 15%", investment_horizon: "5-7 years", board_seat: "Observer Seat", value_add: "Enterprise sales playbook, CXO introductions", portfolio_companies: "Postman, Druva, Uniphore", location: "Bangalore" },
  { id: 5, name: "Vikram Singh", firm: "Matrix Partners", email: "vikram@matrix.in", phone: "+91 54321 09876", sectors: "FinTech, InsurTech, B2B", ticket_size: "1Cr - 8Cr", stage: "Pre-Seed, Seed, Series A", bio: "FinTech focused investor. Former banker turned VC.", linkedin: "https://linkedin.com", equity_expected: "5% - 15%", investment_horizon: "3-5 years", board_seat: "Flexible", value_add: "BFSI partnerships, regulatory guidance", portfolio_companies: "Khatabook, OkCredit, Niyo", location: "Mumbai" },
  { id: 6, name: "Ananya Krishnan", firm: "Accel India", email: "ananya@accel.com", phone: "+91 43210 98765", sectors: "EdTech, Consumer, D2C", ticket_size: "50L - 3Cr", stage: "Pre-Seed, Seed", bio: "Consumer and EdTech investor. Believes in founders building for Bharat.", linkedin: "https://linkedin.com", equity_expected: "5% - 10%", investment_horizon: "5-7 years", board_seat: "Passive Investor", value_add: "Consumer brand building, Tier 2 market expertise", portfolio_companies: "Vedantu, Doubtnut, Classplus", location: "Bangalore" }
]
export default function Home() {
  const [view, setView] = useState("home")
  const [idea, setIdea] = useState("")
  const [loading, setLoading] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [data, setData] = useState({})
  const [activeTab, setActiveTab] = useState("market")
  const [selectedInvestor, setSelectedInvestor] = useState(null)
  const [showInvestors, setShowInvestors] = useState(false)

  const runAnalysis = async () => {
    if (!idea.trim() || idea.trim().length < 10) return
    setLoading(true)
    setView("loading")
    try {
      setCurrentStep(0)
      const market = await axios.post(`${API}/analyze/market`, { idea })
      setData(d => ({ ...d, market: market.data }))
      setCurrentStep(1)
      const competitors = await axios.post(`${API}/analyze/competitors`, { idea })
      setData(d => ({ ...d, competitors: competitors.data }))
      setCurrentStep(2)
      const risks = await axios.post(`${API}/analyze/risklens`, { idea })
      setData(d => ({ ...d, risks: risks.data }))
      setCurrentStep(3)
      const scorecard = await axios.post(`${API}/generate/scorecard`, {
        idea,
        market_score: market.data.market_demand_score || 70,
        saturation: competitors.data.saturation_level || "medium",
        trend: market.data.trend_direction || "growing"
      })
      setData(d => ({ ...d, scorecard: scorecard.data }))
      setCurrentStep(4)
      const heatmap = await axios.post(`${API}/analyze/heatmap`, { idea })
      setData(d => ({ ...d, heatmap: heatmap.data }))
      setCurrentStep(5)
      const originality = await axios.post(`${API}/analyze/originality`, { idea })
      setData(d => ({ ...d, originality: originality.data }))
      setView("results")
    } catch (err) {
      setView("home")
      alert("Analysis failed. Please check backend is running.")
    } finally {
      setLoading(false)
    }
  }

  const TABS = [
    { id: "market", label: "Market", icon: "🔍" },
    { id: "competitors", label: "Competitors", icon: "📊" },
    { id: "risks", label: "RiskLens", icon: "😈" },
    { id: "scorecard", label: "Score Card", icon: "🏆" },
    { id: "heatmap", label: "Heatmap", icon: "🗺️" },
    { id: "originality", label: "Originality", icon: "✅" }
  ]

  if (view === "loading") return (
    <div className="min-h-screen flex items-center justify-center p-6" style={{background:"var(--bg)"}}>
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="text-4xl mb-3">🚀</div>
          <h2 className="text-2xl font-bold text-white mb-2">Analyzing Your Idea</h2>
          <p className="text-sm truncate" style={{color:"var(--text2)"}}>{idea}</p>
        </div>
        <div className="space-y-3">
          {STEPS.map((step, i) => (
            <div key={step.id} className="flex items-center gap-3 p-3 rounded-xl" style={{background:"var(--bg2)",border:"1px solid var(--border)"}}>
              <span className="text-xl">{step.icon}</span>
              <span className={`text-sm flex-1 ${i < currentStep ? "text-green-400" : i === currentStep ? "text-white" : ""}`} style={i > currentStep ? {color:"var(--text3)"} : {}}>
                {step.label}
              </span>
              {i < currentStep && <span className="text-green-400 text-sm">✓</span>}
              {i === currentStep && <div className="w-4 h-4 border-2 border-t-transparent rounded-full animate-spin" style={{borderColor:"var(--teal)"}} />}
            </div>
          ))}
        </div>
        <div className="mt-6 h-2 rounded-full overflow-hidden" style={{background:"var(--border)"}}>
          <div className="h-full rounded-full transition-all duration-500" style={{width:`${((currentStep+1)/STEPS.length)*100}%`,background:"var(--teal)"}} />
        </div>
      </div>
    </div>
  )

  if (view === "results") return (
    <div className="min-h-screen" style={{background:"var(--bg)"}}>
      <div className="border-b px-6 py-4 flex items-center justify-between" style={{borderColor:"var(--border)"}}>
        <div className="flex items-center gap-3">
          <button onClick={() => setView("home")} style={{color:"var(--text3)"}} className="hover:text-white transition-colors">← New Analysis</button>
          <div className="w-px h-4" style={{background:"var(--border)"}} />
          <span className="font-semibold text-white">StartupIQ <span style={{color:"var(--teal)"}}>AI</span></span>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => setShowInvestors(!showInvestors)} className="text-xs px-3 py-1.5 rounded-lg transition-all" style={{background:"rgba(102,143,128,0.15)",color:"var(--teal)",border:"1px solid var(--teal)"}}>
            💼 {showInvestors ? "Hide" : "Find"} Investors
          </button>
          {data.scorecard && (
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-white">{data.scorecard.overall_score}</span>
              <span style={{color:"var(--text3)"}}>/100</span>
            </div>
          )}
        </div>
      </div>

      {showInvestors && (
        <div className="border-b px-6 py-4" style={{borderColor:"var(--border)",background:"var(--bg2)"}}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white font-semibold">💼 Investor Connect</h3>
            <span style={{color:"var(--text3)"}} className="text-xs">{DEMO_INVESTORS.length} investors available</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {DEMO_INVESTORS.map((inv, i) => (
              <button key={i} onClick={() => setSelectedInvestor(inv)}
                className="p-3 rounded-xl text-left transition-all hover:scale-105"
                style={{background:"var(--bg3)",border:"1px solid var(--border)"}}>
                <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-sm mb-2" style={{background:"var(--teal)"}}>
                  {inv.name[0]}
                </div>
                <p className="text-white text-xs font-semibold truncate">{inv.name}</p>
                <p className="text-xs truncate" style={{color:"var(--text3)"}}>{inv.firm}</p>
                <p className="text-xs mt-1" style={{color:"var(--olive)"}}>{inv.equity_expected}</p>
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="border-b overflow-x-auto" style={{borderColor:"var(--border)"}}>
        <div className="flex gap-1 px-6 min-w-max">
          {TABS.map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-3 text-sm font-medium transition-all border-b-2 whitespace-nowrap ${activeTab === tab.id ? "text-white" : "hover:text-white"}`}
              style={{borderBottomColor: activeTab === tab.id ? "var(--teal)" : "transparent", color: activeTab === tab.id ? "var(--text)" : "var(--text3)"}}>
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="p-6 max-w-6xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.div key={activeTab} initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-10}} transition={{duration:0.2}}>
            {activeTab === "market" && data.market && <MarketAnalyzer data={data.market} idea={idea} />}
            {activeTab === "competitors" && data.competitors && <CompetitorChart data={data.competitors} />}
            {activeTab === "risks" && data.risks && <RiskLens data={data.risks} />}
            {activeTab === "scorecard" && data.scorecard && <ScoreCard data={data.scorecard} idea={idea} />}
            {activeTab === "heatmap" && data.heatmap && <IndiaHeatmap data={data.heatmap} />}
            {activeTab === "originality" && data.originality && <OriginalityCheck data={data.originality} />}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="text-center py-4 text-xs" style={{color:"var(--text3)"}}>
        Source: Web Intelligence + AI Synthesis | Advisory recommendations only
      </div>

      <ChatBot idea={idea} />

      {selectedInvestor && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4" style={{background:"rgba(0,0,0,0.8)"}}>
          <motion.div initial={{opacity:0,scale:0.9}} animate={{opacity:1,scale:1}} className="rounded-2xl max-w-lg w-full max-h-screen overflow-y-auto" style={{background:"var(--bg2)",border:"1px solid var(--border)"}}>
            <div className="flex items-center justify-between p-6 border-b" style={{borderColor:"var(--border)"}}>
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-white font-bold text-xl" style={{background:"var(--teal)"}}>
                  {selectedInvestor.name[0]}
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">{selectedInvestor.name}</h2>
                  <p style={{color:"var(--text2)"}}>{selectedInvestor.firm}</p>
                  <p className="text-xs" style={{color:"var(--text3)"}}>📍 {selectedInvestor.location}</p>
                </div>
              </div>
              <button onClick={() => setSelectedInvestor(null)} className="text-2xl w-8 h-8 flex items-center justify-center" style={{color:"var(--text3)"}}>×</button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                {[
                  {label:"Ticket Size", value:selectedInvestor.ticket_size},
                  {label:"Equity Expected", value:selectedInvestor.equity_expected},
                  {label:"Stage", value:selectedInvestor.stage},
                  {label:"Horizon", value:selectedInvestor.investment_horizon},
                  {label:"Board Seat", value:selectedInvestor.board_seat},
                  {label:"Sectors", value:selectedInvestor.sectors}
                ].map((item,i) => (
                  <div key={i} className="p-3 rounded-xl text-center" style={{background:"var(--bg3)",border:"1px solid var(--border)"}}>
                    <p className="text-xs mb-1" style={{color:"var(--text3)"}}>{item.label}</p>
                    <p className="text-white text-sm font-semibold">{item.value}</p>
                  </div>
                ))}
              </div>
              <div className="p-4 rounded-xl" style={{background:"var(--bg3)",border:"1px solid var(--border)"}}>
                <p className="text-xs mb-2" style={{color:"var(--teal)"}}>About</p>
                <p className="text-sm" style={{color:"var(--text2)"}}>{selectedInvestor.bio}</p>
              </div>
              {selectedInvestor.value_add && (
                <div className="p-4 rounded-xl" style={{background:"var(--bg3)",border:"1px solid var(--border)"}}>
                  <p className="text-xs mb-2" style={{color:"var(--olive)"}}>Value Beyond Capital</p>
                  <p className="text-sm" style={{color:"var(--text2)"}}>{selectedInvestor.value_add}</p>
                </div>
              )}
              {selectedInvestor.portfolio_companies && (
                <div className="p-4 rounded-xl" style={{background:"var(--bg3)",border:"1px solid var(--border)"}}>
                  <p className="text-xs mb-2" style={{color:"var(--rose)"}}>Portfolio Companies</p>
                  <p className="text-sm" style={{color:"var(--text2)"}}>{selectedInvestor.portfolio_companies}</p>
                </div>
              )}
              <div className="p-4 rounded-xl" style={{background:"rgba(102,143,128,0.1)",border:"1px solid rgba(102,143,128,0.3)"}}>
                <p className="text-xs mb-3" style={{color:"var(--teal)"}}>Contact Details</p>
                <div className="space-y-2">
                  <div className="flex gap-2"><span className="text-xs w-16" style={{color:"var(--text3)"}}>Email:</span><a href={`mailto:${selectedInvestor.email}`} className="text-xs hover:underline" style={{color:"var(--teal)"}}>{selectedInvestor.email}</a></div>
                  <div className="flex gap-2"><span className="text-xs w-16" style={{color:"var(--text3)"}}>Phone:</span><span className="text-xs text-white">{selectedInvestor.phone}</span></div>
                </div>
              </div>
              <div className="flex gap-3">
                <a href={`mailto:${selectedInvestor.email}?subject=Startup Pitch - StartupIQ`} className="flex-1 py-3 rounded-xl text-sm font-semibold text-center text-white transition-all" style={{background:"var(--teal)"}}>
                  📧 Send Email
                </a>
                <button onClick={() => setSelectedInvestor(null)} className="py-3 px-4 rounded-xl text-sm transition-all" style={{background:"var(--bg3)",color:"var(--text3)"}}>
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6" style={{background:"var(--bg)"}}>
      <motion.div initial={{opacity:0,y:-30}} animate={{opacity:1,y:0}} transition={{duration:0.6}} className="text-center mb-12">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-xl" style={{background:"var(--teal)"}}>🚀</div>
          <h1 className="text-4xl font-bold text-white">StartupIQ <span style={{color:"var(--teal)"}}>AI</span></h1>
        </div>
        <p className="text-xl mb-2" style={{color:"var(--text2)"}}>AI-Powered Startup Intelligence Platform</p>
        <p className="text-sm" style={{color:"var(--text3)"}}>Validate any startup idea in 60 seconds • Built for India</p>
      </motion.div>

      <motion.div initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{duration:0.6,delay:0.2}} className="w-full max-w-2xl">
        <div className="card">
          <label className="text-sm mb-3 block" style={{color:"var(--text2)"}}>Enter your startup idea</label>
          <textarea
            className="w-full rounded-xl p-4 text-base focus:outline-none resize-none transition-all text-white"
            style={{background:"var(--bg3)",border:"1px solid var(--border)"}}
            rows={4}
            value={idea}
            onChange={e => setIdea(e.target.value)}
            placeholder="Example: AI app for restaurant management targeting small restaurants in Tier 2 Indian cities..."
            onKeyDown={e => { if (e.key === "Enter" && e.ctrlKey) runAnalysis() }}
          />
          <button onClick={runAnalysis} disabled={loading || idea.trim().length < 10}
            className="w-full mt-4 text-white font-bold py-4 rounded-xl text-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            style={{background:"var(--teal)"}}>
            {loading ? <><div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />Analyzing...</> : <>🔍 Analyze Now</>}
          </button>
        </div>

        <div className="mt-6">
          <p className="text-xs mb-3 text-center" style={{color:"var(--text3)"}}>Try an example</p>
          <div className="flex flex-wrap gap-2 justify-center">
            {EXAMPLES.map((ex, i) => (
              <button key={i} onClick={() => setIdea(ex)}
                className="text-xs px-3 py-2 rounded-lg transition-all"
                style={{background:"var(--bg2)",color:"var(--text2)",border:"1px solid var(--border)"}}>
                {ex.substring(0, 40)}...
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{duration:0.6,delay:0.4}} className="mt-12 grid grid-cols-3 md:grid-cols-6 gap-4 max-w-3xl w-full">
        {[
          {icon:"🔍",label:"Market Analysis"},
          {icon:"📊",label:"Competitors"},
          {icon:"😈",label:"RiskLens AI"},
          {icon:"🏆",label:"Score Card"},
          {icon:"🗺️",label:"India Heatmap"},
          {icon:"✅",label:"Originality Check"}
        ].map((f,i) => (
          <div key={i} className="text-center">
            <div className="text-2xl mb-1">{f.icon}</div>
            <div className="text-xs" style={{color:"var(--text3)"}}>{f.label}</div>
          </div>
        ))}
      </motion.div>

      <p className="text-xs mt-8 text-center max-w-md" style={{color:"var(--text3)"}}>
        All insights are AI-generated advisory recommendations only. Not financial or legal advice.
      </p>
    </main>
  )
}
