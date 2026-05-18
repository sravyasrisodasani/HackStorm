"use client"
import { motion } from "framer-motion"
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts"

export default function MarketAnalyzer({ data, idea }) {
  const score = data.market_demand_score || 0
  const scoreColor = score >= 70 ? "#00ff64" : score >= 50 ? "#ff9600" : "#ff3264"
  const scoreShadow = score >= 70 ? "0 0 20px rgba(0,255,100,0.4)" : score >= 50 ? "0 0 20px rgba(255,150,0,0.4)" : "0 0 20px rgba(255,50,100,0.4)"

  const tierData = [
    { name: "Tier 1", value: data.tier1_demand === "high" ? 85 : data.tier1_demand === "medium" ? 60 : 35 },
    { name: "Tier 2", value: data.tier2_demand === "high" ? 85 : data.tier2_demand === "medium" ? 60 : 35 }
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-white">🔍 Market Opportunity Analysis</h2>
        <span className="text-xs px-3 py-1 rounded-full badge-neon badge-blue">Source: Web Intelligence + AI Synthesis</span>
      </div>

      {/* Top Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { value: score, label: "Demand Score /100", color: scoreColor, shadow: scoreShadow, suffix: "" },
          { value: `${data.trend_direction === "growing" ? "↑" : data.trend_direction === "declining" ? "↓" : "→"} ${data.trend_percentage}%`, label: "Trend / Year", color: "#00d4ff", shadow: "0 0 15px rgba(0,212,255,0.3)" },
          { value: data.market_size_inr, label: "Market Size", color: "#bf00ff", shadow: "0 0 15px rgba(191,0,255,0.3)" },
          { value: data.trend_direction, label: "Market Trend", color: "#00ff64", shadow: "0 0 15px rgba(0,255,100,0.3)" }
        ].map((stat, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
            className="card text-center" style={{borderColor: `${stat.color}30`, boxShadow: `${stat.shadow}, inset 0 0 20px rgba(0,0,0,0.3)`}}>
            <div className="text-3xl font-bold mb-1 capitalize" style={{ color: stat.color, textShadow: stat.shadow }}>{stat.value}</div>
            <div className="text-xs" style={{color: "rgba(150,150,200,0.7)"}}>{stat.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Target + Niche */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}
          className="card" style={{borderColor: "rgba(0,150,255,0.3)", boxShadow: "0 0 15px rgba(0,100,255,0.08)"}}>
          <h3 className="font-semibold mb-2 text-sm text-neon-blue">🎯 Best Target Audience</h3>
          <p className="text-gray-300 text-sm leading-relaxed">{data.best_target_audience}</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}
          className="card" style={{borderColor: "rgba(150,0,255,0.3)", boxShadow: "0 0 15px rgba(100,0,255,0.08)"}}>
          <h3 className="font-semibold mb-2 text-sm text-neon-purple">💡 Recommended Niche</h3>
          <p className="text-gray-300 text-sm leading-relaxed">{data.recommended_niche}</p>
        </motion.div>
      </div>

      {/* Pain Points */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
        className="card" style={{borderColor: "rgba(255,50,100,0.3)", boxShadow: "0 0 15px rgba(255,0,80,0.06)"}}>
        <h3 className="font-semibold mb-4 text-sm text-neon-red">🔥 Top Customer Pain Points</h3>
        <div className="space-y-3">
          {(data.top_3_pain_points || []).map((pain, i) => (
            <div key={i} className="flex items-start gap-3 p-3 rounded-xl" style={{background: "rgba(255,50,100,0.05)", border: "1px solid rgba(255,50,100,0.15)"}}>
              <span className="font-bold text-sm mt-0.5 text-neon-red">{i + 1}.</span>
              <p className="text-gray-300 text-sm">{pain}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* India Demand Chart */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
        className="card" style={{borderColor: "rgba(255,150,0,0.3)", boxShadow: "0 0 15px rgba(255,100,0,0.06)"}}>
        <h3 className="font-semibold mb-4 text-sm text-neon-orange">🇮🇳 India Demand by City Tier</h3>
        <ResponsiveContainer width="100%" height={120}>
          <BarChart data={tierData} barSize={60}>
            <XAxis dataKey="name" tick={{ fill: "#8888aa", fontSize: 12 }} axisLine={false} tickLine={false} />
            <YAxis hide />
            <Tooltip contentStyle={{ background: "#0a0a1e", border: "1px solid rgba(100,100,255,0.3)", borderRadius: "8px", color: "#fff" }} />
            <Bar dataKey="value" radius={[8, 8, 0, 0]}>
              <Cell fill="#0066ff" />
              <Cell fill="#9900ff" />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        <p className="text-xs mt-2" style={{color: "rgba(150,150,200,0.6)"}}>{data.india_specific_insight}</p>
      </motion.div>
    </div>
  )
}