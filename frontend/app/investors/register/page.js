"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import axios from "axios"

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"

export default function InvestorRegister() {
  const router = useRouter()
  const [form, setForm] = useState({
    name: "", firm: "", email: "", phone: "",
    sectors: "", ticket_size: "", stage: "", bio: "",
    linkedin: "", equity_expected: "", investment_horizon: "",
    board_seat: "", value_add: "", portfolio_companies: "", location: ""
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")

  const update = (field, value) => setForm(prev => ({ ...prev, [field]: value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    try {
      await axios.post(`${API}/investors/register`, form)
      setSuccess(true)
    } catch (err) {
      setError(err.response?.data?.detail || "Registration failed. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  if (success) return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-6">
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="card text-center max-w-md w-full">
        <div className="text-5xl mb-4">🎉</div>
        <h2 className="text-2xl font-bold text-white mb-2">Registration Successful!</h2>
        <p className="text-gray-400 mb-6">Your investor profile is now live. Founders can discover and contact you.</p>
        <div className="flex gap-3">
          <button onClick={() => router.push("/investors")} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition-all">View Investors</button>
          <button onClick={() => router.push("/")} className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-3 rounded-xl font-semibold transition-all">Go Home</button>
        </div>
      </motion.div>
    </div>
  )

  const Field = ({ label, field, type = "text", placeholder, required = false, children }) => (
    <div>
      <label className="text-gray-400 text-sm mb-2 block">{label} {required && "*"}</label>
      {children || (
        <input required={required} type={type} value={form[field]} onChange={e => update(field, e.target.value)}
          className="w-full bg-gray-800 text-white px-4 py-3 rounded-xl border border-gray-700 focus:border-blue-500 focus:outline-none text-sm"
          placeholder={placeholder} />
      )}
    </div>
  )

  const Select = ({ label, field, options, required = false }) => (
    <div>
      <label className="text-gray-400 text-sm mb-2 block">{label} {required && "*"}</label>
      <select required={required} value={form[field]} onChange={e => update(field, e.target.value)}
        className="w-full bg-gray-800 text-white px-4 py-3 rounded-xl border border-gray-700 focus:outline-none text-sm">
        <option value="">Select...</option>
        {options.map(o => <option key={o}>{o}</option>)}
      </select>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-950">
      <div className="border-b border-gray-800 px-6 py-4 flex items-center gap-3">
        <button onClick={() => router.push("/investors")} className="text-gray-500 hover:text-white transition-colors">← Back</button>
        <div className="w-px h-4 bg-gray-700" />
        <span className="text-white font-semibold">Register as Investor</span>
      </div>

      <div className="max-w-2xl mx-auto p-6">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">💼 Investor Registration</h1>
          <p className="text-gray-400">Create your complete investor profile and get discovered by promising startups</p>
        </motion.div>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Basic Info */}
          <div className="card">
            <h3 className="text-blue-400 font-semibold mb-4 text-sm">👤 Basic Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field label="Full Name" field="name" placeholder="Arjun Mehta" required />
              <Field label="Firm / Fund Name" field="firm" placeholder="Blume Ventures" required />
              <Field label="Email" field="email" type="email" placeholder="arjun@blume.vc" required />
              <Field label="Phone" field="phone" placeholder="+91 98765 43210" required />
              <Field label="Location" field="location" placeholder="Bangalore, India" />
              <Field label="LinkedIn URL" field="linkedin" placeholder="https://linkedin.com/in/yourprofile" />
            </div>
          </div>

          {/* Investment Details */}
          <div className="card">
            <h3 className="text-purple-400 font-semibold mb-4 text-sm">💰 Investment Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Select label="Ticket Size" field="ticket_size" required options={["₹10L - ₹50L", "₹50L - ₹2Cr", "₹2Cr - ₹10Cr", "₹10Cr - ₹50Cr", "₹50Cr+"]} />
              <Select label="Investment Stage" field="stage" required options={["Pre-Seed", "Seed", "Pre-Seed, Seed", "Seed, Series A", "Series A", "Series A, Series B+", "Series B+"]} />
              <Select label="Equity Expected" field="equity_expected" required options={["1% - 5%", "5% - 10%", "10% - 15%", "15% - 20%", "20% - 25%", "25%+", "Negotiable"]} />
              <Select label="Investment Horizon" field="investment_horizon" options={["1-2 years", "3-5 years", "5-7 years", "7+ years", "Flexible"]} />
              <Select label="Board Seat Required" field="board_seat" options={["Yes - Board Seat", "Yes - Observer Seat", "No - Passive Investor", "Flexible"]} />
              <Field label="Sectors of Interest" field="sectors" placeholder="SaaS, AI/ML, FinTech, EdTech" required />
            </div>
          </div>

          {/* Value Add & Portfolio */}
          <div className="card">
            <h3 className="text-green-400 font-semibold mb-4 text-sm">🚀 Value Add & Portfolio</h3>
            <div className="space-y-4">
              <div>
                <label className="text-gray-400 text-sm mb-2 block">What value do you bring beyond capital?</label>
                <textarea value={form.value_add} onChange={e => update("value_add", e.target.value)}
                  className="w-full bg-gray-800 text-white px-4 py-3 rounded-xl border border-gray-700 focus:border-blue-500 focus:outline-none text-sm resize-none"
                  rows={2} placeholder="Network, mentorship, hiring support, market access..." />
              </div>
              <div>
                <label className="text-gray-400 text-sm mb-2 block">Notable Portfolio Companies</label>
                <input value={form.portfolio_companies} onChange={e => update("portfolio_companies", e.target.value)}
                  className="w-full bg-gray-800 text-white px-4 py-3 rounded-xl border border-gray-700 focus:border-blue-500 focus:outline-none text-sm"
                  placeholder="Razorpay, Zepto, Meesho..." />
              </div>
              <div>
                <label className="text-gray-400 text-sm mb-2 block">Bio / Investment Thesis *</label>
                <textarea required value={form.bio} onChange={e => update("bio", e.target.value)}
                  className="w-full bg-gray-800 text-white px-4 py-3 rounded-xl border border-gray-700 focus:border-blue-500 focus:outline-none text-sm resize-none"
                  rows={3} placeholder="Tell founders about your investment thesis and what you look for..." />
              </div>
            </div>
          </div>

          {error && <p className="text-red-400 text-sm bg-red-900/20 border border-red-800 px-4 py-3 rounded-xl">{error}</p>}

          <button type="submit" disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 text-white font-bold py-4 rounded-xl text-base transition-all flex items-center justify-center gap-2">
            {loading ? (
              <><div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />Registering...</>
            ) : "Register as Investor 🚀"}
          </button>
        </form>
      </div>
    </div>
  )
}
