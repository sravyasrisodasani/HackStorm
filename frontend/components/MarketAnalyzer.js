"use client"
import { motion } from "framer-motion"
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts"

export default function MarketAnalyzer({ data, idea }) {
  const score = data.market_demand_score || 0
  const scoreColor = score >= 70 ? "#22c55e" : score >= 50 ? "#eab308" : "#ef4444"

  const tierData = [
    { name: "Tier 1 Cities", value: data.tier1_demand === "high" ? 85 : data.tier1_demand === "medium" ? 60 : 35 },
    { name: "Tier 2 Cities", value: data.tier2_demand === "high" ? 85 : data.tier2_demand === "medium" ? 60 : 35 }
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-white">🔍 Market Opportunity Analysis</h2>
        <span className="text-xs text-gray-500 bg-gray-800 px-3 py-1 rounded-full">Source: Web Intelligence + AI Synthesis</span>
      </div>

      {/* Top Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="card text-center">
          <div className="text-4xl font-bold mb-1" style={{ color: scoreColor }}>{score}</div>
          <div className="text-gray-500 text-xs">Demand Score /100</div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="card text-center">
          <div className="text-2xl font-bold text-blue-400 mb-1">
            {data.trend_direction === "growing" ? "↑" : data.trend_direction === "declining" ? "↓" : "→"} {data.trend_percentage}%
          </div>
          <div className="text-gray-500 text-xs">Trend / Year</div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="card text-center">
          <div className="text-lg font-bold text-purple-400 mb-1">{data.market_size_inr}</div>
          <div className="text-gray-500 text-xs">Market Size</div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="card text-center">
          <div className="text-lg font-bold text-green-400 mb-1 capitalize">{data.trend_direction}</div>
          <div className="text-gray-500 text-xs">Market Trend</div>
        </motion.div>
      </div>

      {/* Target Audience + Niche */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="card">
          <h3 className="text-blue-400 font-semibold mb-2 text-sm">🎯 Best Target Audience</h3>
          <p className="text-white text-sm leading-relaxed">{data.best_target_audience}</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="card">
          <h3 className="text-purple-400 font-semibold mb-2 text-sm">💡 Recommended Niche</h3>
          <p className="text-white text-sm leading-relaxed">{data.recommended_niche}</p>
        </motion.div>
      </div>

      {/* Pain Points */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="card">
        <h3 className="text-red-400 font-semibold mb-4 text-sm">🔥 Top Customer Pain Points</h3>
        <div className="space-y-3">
          {(data.top_3_pain_points || []).map((pain, i) => (
            <div key={i} className="flex items-start gap-3">
              <span className="text-red-500 font-bold text-sm mt-0.5">{i + 1}.</span>
              <p className="text-gray-300 text-sm">{pain}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* India Demand Chart */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="card">
        <h3 className="text-yellow-400 font-semibold mb-4 text-sm">🇮🇳 India Demand by City Tier</h3>
        <ResponsiveContainer width="100%" height={120}>
          <BarChart data={tierData} barSize={40}>
            <XAxis dataKey="name" tick={{ fill: "#9ca3af", fontSize: 12 }} axisLine={false} tickLine={false} />
            <YAxis hide />
            <Tooltip contentStyle={{ background: "#111827", border: "1px solid #374151", borderRadius: "8px", color: "#fff" }} />
            <Bar dataKey="value" radius={[6, 6, 0, 0]}>
              {tierData.map((_, i) => <Cell key={i} fill={i === 0 ? "#3B82F6" : "#8B5CF6"} />)}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        <p className="text-gray-500 text-xs mt-2">{data.india_specific_insight}</p>
      </motion.div>
    </div>
  )
}