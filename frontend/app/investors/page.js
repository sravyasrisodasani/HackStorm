"use client"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import axios from "axios"

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"

const DEMO_INVESTORS = [
  { id: 1, name: "Arjun Mehta", firm: "Blume Ventures", email: "arjun@blume.vc", phone: "+91 98765 43210", sectors: "SaaS, AI/ML, B2B", ticket_size: "₹50L - ₹2Cr", stage: "Pre-Seed, Seed", bio: "Early stage investor focused on B2B SaaS and AI startups in India. Previously founded 2 startups.", linkedin: "https://linkedin.com", equity_expected: "5% - 10%", investment_horizon: "5-7 years", board_seat: "Yes - Observer Seat", value_add: "Strong network in enterprise sales, hiring support, product mentorship", portfolio_companies: "Razorpay, Setu, Smallcase", location: "Bangalore" },
  { id: 2, name: "Priya Sharma", firm: "Kalaari Capital", email: "priya@kalaari.com", phone: "+91 87654 32109", sectors: "FinTech, EdTech, D2C", ticket_size: "₹1Cr - ₹5Cr", stage: "Seed, Series A", bio: "Passionate about consumer tech and fintech disruption in Tier 2 India. 10+ portfolio companies.", linkedin: "https://linkedin.com", equity_expected: "10% - 15%", investment_horizon: "5-7 years", board_seat: "Yes - Board Seat", value_add: "Deep FinTech regulatory expertise, RBI connections, D2C brand building", portfolio_companies: "Slice, Jar, Freo", location: "Mumbai" },
  { id: 3, name: "Rahul Gupta", firm: "Sequoia India", email: "rahul@sequoia.com", phone: "+91 76543 21098", sectors: "HealthTech, AgriTech, AI/ML", ticket_size: "₹5Cr - ₹20Cr", stage: "Series A, Series B+", bio: "Growth stage investor with focus on impact-driven startups solving real Indian problems.", linkedin: "https://linkedin.com", equity_expected: "15% - 20%", investment_horizon: "7+ years", board_seat: "Yes - Board Seat", value_add: "Global network, US market entry support, follow-on funding access", portfolio_companies: "Byju's, Unacademy, Meesho", location: "Delhi" },
  { id: 4, name: "Sneha Patel", firm: "Nexus Venture Partners", email: "sneha@nexusvp.com", phone: "+91 65432 10987", sectors: "SaaS, B2B, Enterprise", ticket_size: "₹2Cr - ₹10Cr", stage: "Seed, Series A", bio: "Enterprise SaaS specialist. Helped 15+ startups scale from 0 to ₹10Cr ARR.", linkedin: "https://linkedin.com", equity_expected: "10% - 15%", investment_horizon: "5-7 years", board_seat: "Yes - Observer Seat", value_add: "Enterprise sales playbook, CXO introductions, SaaS metrics coaching", portfolio_companies: "Postman, Druva, Uniphore", location: "Bangalore" },
  { id: 5, name: "Vikram Singh", firm: "Matrix Partners", email: "vikram@matrix.in", phone: "+91 54321 09876", sectors: "FinTech, InsurTech, B2B", ticket_size: "₹1Cr - ₹8Cr", stage: "Pre-Seed, Seed, Series A", bio: "FinTech focused investor. Former banker turned VC. Strong network in BFSI sector.", linkedin: "https://linkedin.com", equity_expected: "5% - 15%", investment_horizon: "3-5 years", board_seat: "Flexible", value_add: "BFSI partnerships, regulatory guidance, banking integrations", portfolio_companies: "Khatabook, OkCredit, Niyo", location: "Mumbai" },
  { id: 6, name: "Ananya Krishnan", firm: "Accel India", email: "ananya@accel.com", phone: "+91 43210 98765", sectors: "EdTech, Consumer, D2C", ticket_size: "₹50L - ₹3Cr", stage: "Pre-Seed, Seed", bio: "Consumer and EdTech investor. Believes in founders building for Bharat, not just metros.", linkedin: "https://linkedin.com", equity_expected: "5% - 10%", investment_horizon: "5-7 years", board_seat: "No - Passive Investor", value_add: "Consumer brand building, Tier 2 market expertise, content strategy", portfolio_companies: "Vedantu, Doubtnut, Classplus", location: "Bangalore" }
]

export default function InvestorsPage() {
  const router = useRouter()
  const [investors, setInvestors] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [selectedSector, setSelectedSector] = useState("All")
  const [selectedStage, setSelectedStage] = useState("All")
  const [selectedInvestor, setSelectedInvestor] = useState(null)

  useEffect(() => { fetchInvestors() }, [])

  const fetchInvestors = async () => {
    try {
      const res = await axios.get(`${API}/investors/list`)
      setInvestors(res.data.length > 0 ? res.data : DEMO_INVESTORS)
    } catch {
      setInvestors(DEMO_INVESTORS)
    } finally {
      setLoading(false)
    }
  }

  const downloadExcel = () => {
    const headers = ["Name", "Firm", "Email", "Phone", "Location", "Sectors", "Ticket Size", "Stage", "Equity Expected", "Investment Horizon", "Board Seat", "Value Add", "Portfolio Companies", "Bio", "LinkedIn"]
    const rows = investors.map(inv => [
      inv.name, inv.firm, inv.email, inv.phone, inv.location || "",
      inv.sectors, inv.ticket_size, inv.stage, inv.equity_expected || "",
      inv.investment_horizon || "", inv.board_seat || "", inv.value_add || "",
      inv.portfolio_companies || "", inv.bio, inv.linkedin || ""
    ])
    const csv = [headers, ...rows].map(r => r.map(c => `"${(c || "").replace(/"/g, '""')}"`).join(",")).join("\n")
    const blob = new Blob([csv], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "startupiq_investors.csv"
    a.click()
    URL.revokeObjectURL(url)
  }

  const sectors = ["All", "SaaS", "FinTech", "EdTech", "HealthTech", "AgriTech", "D2C", "B2B", "AI/ML"]
  const stages = ["All", "Pre-Seed", "Seed", "Series A", "Series B+"]

  const filtered = investors.filter(inv => {
    const matchSearch = inv.name?.toLowerCase().includes(search.toLowerCase()) ||
      inv.firm?.toLowerCase().includes(search.toLowerCase()) ||
      inv.sectors?.toLowerCase().includes(search.toLowerCase())
    const matchSector = selectedSector === "All" || inv.sectors?.includes(selectedSector)
    const matchStage = selectedStage === "All" || inv.stage?.includes(selectedStage)
    return matchSearch && matchSector && matchStage
  })

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Header */}
      <div className="border-b border-gray-800 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={() => router.push("/")} className="text-gray-500 hover:text-white transition-colors">← Back</button>
          <div className="w-px h-4 bg-gray-700" />
          <span className="text-white font-semibold">StartupIQ AI — Investor Connect</span>
        </div>
        <div className="flex gap-2">
          <button onClick={downloadExcel} className="bg-green-700 hover:bg-green-600 text-white text-sm px-4 py-2 rounded-xl transition-all flex items-center gap-2">
            📊 Export Excel
          </button>
          <button onClick={() => router.push("/investors/register")} className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-xl transition-all">
            + Register as Investor
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-6">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
          <h1 className="text-3xl font-bold text-white mb-2">💼 Investor Connect</h1>
          <p className="text-gray-400">Click any investor to see their full profile and contact details</p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {[
            { label: "Active Investors", value: `${investors.length}+` },
            { label: "Total Capital Available", value: "₹50Cr+" },
            { label: "Sectors Covered", value: "8+" }
          ].map((stat, i) => (
            <div key={i} className="card text-center">
              <div className="text-2xl font-bold text-blue-400">{stat.value}</div>
              <div className="text-gray-500 text-xs mt-1">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-6">
          <input type="text" placeholder="Search by name, firm, sector..."
            value={search} onChange={e => setSearch(e.target.value)}
            className="bg-gray-800 text-white px-4 py-2 rounded-xl border border-gray-700 focus:border-blue-500 focus:outline-none text-sm flex-1 min-w-48" />
          <select value={selectedSector} onChange={e => setSelectedSector(e.target.value)}
            className="bg-gray-800 text-white px-4 py-2 rounded-xl border border-gray-700 focus:outline-none text-sm">
            {sectors.map(s => <option key={s}>{s}</option>)}
          </select>
          <select value={selectedStage} onChange={e => setSelectedStage(e.target.value)}
            className="bg-gray-800 text-white px-4 py-2 rounded-xl border border-gray-700 focus:outline-none text-sm">
            {stages.map(s => <option key={s}>{s}</option>)}
          </select>
        </div>

        {/* Investor Grid */}
        {loading ? (
          <div className="text-center py-20 text-gray-500">Loading investors...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((inv, i) => (
              <motion.div key={inv.id || i}
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                onClick={() => setSelectedInvestor(inv)}
                className="card card-hover cursor-pointer hover:border-blue-600/50 transition-all"
              >
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                    {inv.name?.[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-white font-semibold truncate">{inv.name}</h3>
                    <p className="text-gray-400 text-sm truncate">{inv.firm}</p>
                    {inv.location && <p className="text-gray-600 text-xs">📍 {inv.location}</p>}
                  </div>
                </div>
                <div className="flex flex-wrap gap-1 mb-3">
                  <span className="text-xs bg-blue-900/40 text-blue-400 px-2 py-1 rounded-full">{inv.stage}</span>
                  <span className="text-xs bg-purple-900/40 text-purple-400 px-2 py-1 rounded-full">{inv.ticket_size}</span>
                  {inv.equity_expected && <span className="text-xs bg-green-900/40 text-green-400 px-2 py-1 rounded-full">{inv.equity_expected} equity</span>}
                </div>
                <p className="text-gray-500 text-xs mb-3"><span className="text-gray-400">Sectors: </span>{inv.sectors}</p>
                <p className="text-gray-400 text-xs mb-4 line-clamp-2">{inv.bio}</p>
                <button className="w-full bg-blue-600/20 hover:bg-blue-600 text-blue-400 hover:text-white text-xs py-2 rounded-lg transition-all border border-blue-800 hover:border-blue-600">
                  View Full Profile →
                </button>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Full Profile Modal */}
      <AnimatePresence>
        {selectedInvestor && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-gray-900 border border-gray-700 rounded-2xl max-w-2xl w-full my-4"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-800">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center text-white font-bold text-2xl">
                    {selectedInvestor.name?.[0]}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">{selectedInvestor.name}</h2>
                    <p className="text-gray-400">{selectedInvestor.firm}</p>
                    {selectedInvestor.location && <p className="text-gray-500 text-sm">📍 {selectedInvestor.location}</p>}
                  </div>
                </div>
                <button onClick={() => setSelectedInvestor(null)} className="text-gray-500 hover:text-white text-2xl w-8 h-8 flex items-center justify-center">×</button>
              </div>

              <div className="p-6 space-y-4">
                {/* Investment Details */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {[
                    { label: "Ticket Size", value: selectedInvestor.ticket_size, color: "blue" },
                    { label: "Equity Expected", value: selectedInvestor.equity_expected || "Negotiable", color: "green" },
                    { label: "Stage", value: selectedInvestor.stage, color: "purple" },
                    { label: "Investment Horizon", value: selectedInvestor.investment_horizon || "Flexible", color: "yellow" },
                    { label: "Board Seat", value: selectedInvestor.board_seat || "Flexible", color: "orange" },
                    { label: "Sectors", value: selectedInvestor.sectors, color: "pink" }
                  ].map((item, i) => (
                    <div key={i} className="card text-center">
                      <p className="text-gray-500 text-xs mb-1">{item.label}</p>
                      <p className="text-white text-sm font-semibold">{item.value}</p>
                    </div>
                  ))}
                </div>

                {/* Bio */}
                <div className="card">
                  <h3 className="text-blue-400 font-semibold text-sm mb-2">About</h3>
                  <p className="text-gray-300 text-sm leading-relaxed">{selectedInvestor.bio}</p>
                </div>

                {/* Value Add */}
                {selectedInvestor.value_add && (
                  <div className="card">
                    <h3 className="text-green-400 font-semibold text-sm mb-2">💡 Value Beyond Capital</h3>
                    <p className="text-gray-300 text-sm">{selectedInvestor.value_add}</p>
                  </div>
                )}

                {/* Portfolio */}
                {selectedInvestor.portfolio_companies && (
                  <div className="card">
                    <h3 className="text-purple-400 font-semibold text-sm mb-2">🏆 Portfolio Companies</h3>
                    <p className="text-gray-300 text-sm">{selectedInvestor.portfolio_companies}</p>
                  </div>
                )}

                {/* Contact */}
                <div className="card border-blue-800/50 bg-blue-900/10">
                  <h3 className="text-blue-400 font-semibold text-sm mb-3">📞 Contact Details</h3>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-gray-500 text-sm w-16">Email:</span>
                      <a href={`mailto:${selectedInvestor.email}`} className="text-blue-400 text-sm hover:underline">{selectedInvestor.email}</a>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-500 text-sm w-16">Phone:</span>
                      <span className="text-white text-sm">{selectedInvestor.phone}</span>
                    </div>
                    {selectedInvestor.linkedin && (
                      <div className="flex items-center gap-2">
                        <span className="text-gray-500 text-sm w-16">LinkedIn:</span>
                        <a href={selectedInvestor.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-400 text-sm hover:underline">View Profile</a>
                      </div>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <a href={`mailto:${selectedInvestor.email}?subject=Startup Pitch - StartupIQ&body=Hi ${selectedInvestor.name},%0D%0A%0D%0AI found your profile on StartupIQ AI and would love to connect about my startup.%0D%0A%0D%0ABest regards`}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl text-sm font-semibold transition-all text-center">
                    📧 Send Email
                  </a>
                  {selectedInvestor.linkedin && (
                    <a href={selectedInvestor.linkedin} target="_blank" rel="noopener noreferrer"
                      className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-3 rounded-xl text-sm font-semibold transition-all text-center">
                      LinkedIn →
                    </a>
                  )}
                  <button onClick={() => setSelectedInvestor(null)}
                    className="bg-gray-800 hover:bg-gray-700 text-gray-400 py-3 px-4 rounded-xl text-sm transition-all">
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
