"use client"
import { motion } from "framer-motion"

export default function IndiaHeatmap({ data }) {
  const cities = data.city_demand || []
  const maxScore = Math.max(...cities.map(c => c.demand_score), 1)

  const getColor = (score) => {
    const ratio = score / maxScore
    if (ratio >= 0.85) return { bg: "bg-blue-600", text: "text-blue-100", border: "border-blue-500" }
    if (ratio >= 0.70) return { bg: "bg-blue-500", text: "text-blue-100", border: "border-blue-400" }
    if (ratio >= 0.55) return { bg: "bg-purple-600", text: "text-purple-100", border: "border-purple-500" }
    if (ratio >= 0.40) return { bg: "bg-yellow-600", text: "text-yellow-100", border: "border-yellow-500" }
    return { bg: "bg-gray-700", text: "text-gray-300", border: "border-gray-600" }
  }

  const sorted = [...cities].sort((a, b) => b.demand_score - a.demand_score)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-white">🗺️ India Market Heatmap</h2>
        <span className="text-xs text-gray-500 bg-gray-800 px-3 py-1 rounded-full">Demand by City</span>
      </div>

      {/* Top Launch City */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="card bg-gradient-to-r from-blue-900/40 to-purple-900/40 border-blue-700/50"
      >
        <div className="flex items-center gap-4">
          <div className="text-4xl">🏆</div>
          <div>
            <p className="text-gray-400 text-xs mb-1">Recommended Launch City</p>
            <h3 className="text-2xl font-bold text-white">{data.top_launch_city}</h3>
            <p className="text-blue-300 text-sm mt-1">{data.top_launch_reason}</p>
          </div>
        </div>
      </motion.div>

      {/* City Grid - Visual Heatmap */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="card">
        <h3 className="text-gray-400 text-sm mb-4">City Demand Heatmap</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {sorted.map((city, i) => {
            const colors = getColor(city.demand_score)
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
                className={`${colors.bg} border ${colors.border} rounded-xl p-3 text-center cursor-pointer hover:scale-105 transition-transform`}
                title={city.reason}
              >
                <div className={`text-xl font-bold ${colors.text}`}>{city.demand_score}</div>
                <div className={`text-xs font-semibold ${colors.text} mt-1`}>{city.city}</div>
                <div className={`text-xs opacity-70 ${colors.text}`}>{city.state}</div>
              </motion.div>
            )
          })}
        </div>

        {/* Legend */}
        <div className="flex items-center gap-4 mt-4 flex-wrap">
          <span className="text-gray-600 text-xs">Demand:</span>
          {[
            { color: "bg-blue-600", label: "Very High (85+)" },
            { color: "bg-blue-500", label: "High (70-84)" },
            { color: "bg-purple-600", label: "Medium (55-69)" },
            { color: "bg-yellow-600", label: "Low (40-54)" },
            { color: "bg-gray-700", label: "Emerging (<40)" }
          ].map((l, i) => (
            <div key={i} className="flex items-center gap-1">
              <div className={`w-3 h-3 rounded ${l.color}`} />
              <span className="text-gray-500 text-xs">{l.label}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* City Details List */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
        <h3 className="text-gray-400 text-sm mb-3">City-wise Analysis</h3>
        <div className="space-y-2">
          {sorted.slice(0, 5).map((city, i) => (
            <div key={i} className="card card-hover flex items-center gap-4">
              <div className="text-lg font-bold text-gray-500 w-6">{i + 1}</div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-white font-semibold text-sm">{city.city}, {city.state}</span>
                  <span className="text-blue-400 font-bold text-sm">{city.demand_score}/100</span>
                </div>
                <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${city.demand_score}%` }}
                    transition={{ delay: 0.5 + i * 0.1, duration: 0.6 }}
                    className="h-full bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"
                  />
                </div>
                <p className="text-gray-500 text-xs mt-1">{city.reason}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Tier 2 Opportunity */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="card border-purple-800/50 bg-purple-900/10">
        <h3 className="text-purple-400 font-semibold mb-2 text-sm">🌟 Tier 2 City Opportunity</h3>
        <p className="text-gray-300 text-sm leading-relaxed">{data.tier2_opportunity}</p>
      </motion.div>
    </div>
  )
}