"use client"
import { motion } from "framer-motion"

export default function IndiaHeatmap({ data }) {
  const cities = data.city_demand || []
  const maxScore = Math.max(...cities.map(c => c.demand_score), 1)

  const getStyle = (score) => {
    const ratio = score / maxScore
    if (ratio >= 0.85) return { bg: "rgba(0,100,255,0.3)", border: "rgba(0,150,255,0.6)", color: "#00d4ff", shadow: "0 0 15px rgba(0,150,255,0.3)" }
    if (ratio >= 0.70) return { bg: "rgba(100,0,255,0.25)", border: "rgba(150,0,255,0.5)", color: "#bf00ff", shadow: "0 0 12px rgba(150,0,255,0.25)" }
    if (ratio >= 0.55) return { bg: "rgba(0,150,100,0.2)", border: "rgba(0,255,150,0.4)", color: "#00ff96", shadow: "0 0 10px rgba(0,255,150,0.2)" }
    if (ratio >= 0.40) return { bg: "rgba(150,100,0,0.2)", border: "rgba(255,200,0,0.4)", color: "#ffc800", shadow: "0 0 8px rgba(255,200,0,0.2)" }
    return { bg: "rgba(30,30,60,0.3)", border: "rgba(100,100,150,0.3)", color: "#8888aa", shadow: "none" }
  }

  const sorted = [...cities].sort((a, b) => b.demand_score - a.demand_score)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-white">🗺️ India Market Heatmap</h2>
        <span className="text-xs px-3 py-1 rounded-full badge-neon badge-blue">Demand by City</span>
      </div>

      {/* Top Launch City */}
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
        className="card" style={{borderColor: "rgba(0,150,255,0.4)", background: "rgba(0,50,100,0.2)", boxShadow: "0 0 30px rgba(0,100,255,0.1)"}}>
        <div className="flex items-center gap-4">
          <div className="text-4xl">🏆</div>
          <div>
            <p className="text-xs mb-1" style={{color: "rgba(150,150,200,0.7)"}}>Recommended Launch City</p>
            <h3 className="text-2xl font-black text-neon-blue" style={{textShadow: "0 0 15px rgba(0,212,255,0.5)"}}>{data.top_launch_city}</h3>
            <p className="text-sm mt-1" style={{color: "rgba(150,200,255,0.8)"}}>{data.top_launch_reason}</p>
          </div>
        </div>
      </motion.div>

      {/* City Grid */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="card">
        <h3 className="text-sm mb-4" style={{color: "rgba(150,150,200,0.7)"}}>City Demand Heatmap</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {sorted.map((city, i) => {
            const style = getStyle(city.demand_score)
            return (
              <motion.div key={i} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.05 }}
                className="rounded-xl p-3 text-center cursor-pointer hover:scale-105 transition-transform"
                style={{ background: style.bg, border: `1px solid ${style.border}`, boxShadow: style.shadow }}
                title={city.reason}>
                <div className="text-xl font-black" style={{ color: style.color, textShadow: style.shadow }}>{city.demand_score}</div>
                <div className="text-xs font-semibold mt-1" style={{ color: style.color }}>{city.city}</div>
                <div className="text-xs opacity-60" style={{ color: style.color }}>{city.state}</div>
              </motion.div>
            )
          })}
        </div>

        {/* Legend */}
        <div className="flex items-center gap-4 mt-4 flex-wrap">
          <span className="text-xs" style={{color: "rgba(100,100,150,0.6)"}}>Demand:</span>
          {[
            { color: "#00d4ff", label: "Very High (85+)" },
            { color: "#bf00ff", label: "High (70-84)" },
            { color: "#00ff96", label: "Medium (55-69)" },
            { color: "#ffc800", label: "Low (40-54)" },
            { color: "#8888aa", label: "Emerging" }
          ].map((l, i) => (
            <div key={i} className="flex items-center gap-1">
              <div className="w-3 h-3 rounded" style={{ background: l.color, boxShadow: `0 0 5px ${l.color}` }} />
              <span className="text-xs" style={{color: "rgba(150,150,200,0.6)"}}>{l.label}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Top 5 Cities */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
        <h3 className="text-sm mb-3" style={{color: "rgba(150,150,200,0.7)"}}>Top Cities Analysis</h3>
        <div className="space-y-2">
          {sorted.slice(0, 5).map((city, i) => {
            const style = getStyle(city.demand_score)
            return (
              <div key={i} className="card card-hover flex items-center gap-4">
                <div className="text-lg font-bold w-6" style={{color: "rgba(100,100,150,0.5)"}}>{i + 1}</div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-white font-semibold text-sm">{city.city}, {city.state}</span>
                    <span className="font-bold text-sm" style={{ color: style.color, textShadow: style.shadow }}>{city.demand_score}/100</span>
                  </div>
                  <div className="h-1.5 rounded-full overflow-hidden" style={{background: "rgba(100,100,255,0.1)"}}>
                    <motion.div initial={{ width: 0 }} animate={{ width: `${city.demand_score}%` }}
                      transition={{ delay: 0.5 + i * 0.1, duration: 0.6 }}
                      className="h-full rounded-full"
                      style={{ background: style.color, boxShadow: `0 0 6px ${style.color}` }} />
                  </div>
                  <p className="text-xs mt-1" style={{color: "rgba(150,150,200,0.5)"}}>{city.reason}</p>
                </div>
              </div>
            )
          })}
        </div>
      </motion.div>

      {/* Tier 2 Opportunity */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
        className="card" style={{borderColor: "rgba(150,0,255,0.3)", background: "rgba(60,0,100,0.15)", boxShadow: "0 0 20px rgba(100,0,255,0.08)"}}>
        <h3 className="font-semibold mb-2 text-sm text-neon-purple">🌟 Tier 2 City Opportunity</h3>
        <p className="text-gray-300 text-sm leading-relaxed">{data.tier2_opportunity}</p>
      </motion.div>
    </div>
  )
}