"use client"
import { motion } from "framer-motion"
import { ScatterChart, Scatter, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, ZAxis } from "recharts"

const COLORS = ["#3B82F6", "#8B5CF6", "#EC4899", "#F59E0B", "#10B981"]

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const d = payload[0].payload
    return (
      <div className="bg-gray-900 border border-gray-700 rounded-xl p-3 text-sm max-w-xs">
        <p className="text-white font-bold">{d.name}</p>
        <p className="text-gray-400">Price: {d.pricing}</p>
        <p className="text-green-400 text-xs mt-1">✓ {d.strength}</p>
        <p className="text-red-400 text-xs">✗ {d.weakness}</p>
      </div>
    )
  }
  return null
}

export default function CompetitorChart({ data }) {
  const competitors = data.competitors || []

  const chartData = competitors.map((c, i) => ({
    ...c,
    x: 20 + (i * 15) + Math.random() * 10,
    y: 30 + (i * 12) + Math.random() * 15,
    z: 400
  }))

  const saturationColor = data.saturation_level === "low" ? "text-green-400" :
    data.saturation_level === "medium" ? "text-yellow-400" : "text-red-400"

  const saturationBg = data.saturation_level === "low" ? "bg-green-900/30 border-green-800" :
    data.saturation_level === "medium" ? "bg-yellow-900/30 border-yellow-800" : "bg-red-900/30 border-red-800"

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-white">📊 Competitor Intelligence</h2>
        <span className={`text-xs px-3 py-1 rounded-full border ${saturationBg} ${saturationColor} font-semibold`}>
          {data.saturation_level?.toUpperCase()} SATURATION
        </span>
      </div>

      {/* Bubble Chart */}
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }} className="card">
        <h3 className="text-gray-400 text-sm mb-1">Competitor Positioning Map</h3>
        <p className="text-gray-600 text-xs mb-4">Price vs Feature Richness — Empty space = Your opportunity</p>
        <div className="relative">
          <ResponsiveContainer width="100%" height={280}>
            <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
              <XAxis type="number" dataKey="x" name="Price" tick={{ fill: "#6b7280", fontSize: 11 }} label={{ value: "Price →", position: "insideBottom", fill: "#6b7280", fontSize: 11 }} domain={[0, 100]} />
              <YAxis type="number" dataKey="y" name="Features" tick={{ fill: "#6b7280", fontSize: 11 }} label={{ value: "Features →", angle: -90, position: "insideLeft", fill: "#6b7280", fontSize: 11 }} domain={[0, 100]} />
              <ZAxis type="number" dataKey="z" range={[200, 400]} />
              <Tooltip content={<CustomTooltip />} />
              <Scatter data={chartData}>
                {chartData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} fillOpacity={0.8} />)}
              </Scatter>
            </ScatterChart>
          </ResponsiveContainer>
          {/* Your opportunity zone */}
          <div className="absolute bottom-8 right-8 border-2 border-dashed border-green-500/40 rounded-xl p-3 bg-green-900/10">
            <p className="text-green-400 text-xs font-semibold">YOUR OPPORTUNITY</p>
            <p className="text-green-600 text-xs">Unoccupied space</p>
          </div>
        </div>
      </motion.div>

      {/* Gap Analysis */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="card border-green-800/50">
          <h3 className="text-green-400 font-semibold mb-2 text-sm">🎯 Market Gap</h3>
          <p className="text-white text-sm leading-relaxed">{data.market_gap}</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="card border-blue-800/50">
          <h3 className="text-blue-400 font-semibold mb-2 text-sm">⚡ Your Winning Angle</h3>
          <p className="text-white text-sm leading-relaxed">{data.differentiation_opportunity}</p>
        </motion.div>
      </div>

      {/* Competitor Cards */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
        <h3 className="text-gray-400 text-sm mb-3">All Competitors</h3>
        <div className="space-y-3">
          {competitors.map((c, i) => (
            <div key={i} className="card card-hover flex items-start gap-4">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm font-bold flex-shrink-0" style={{ background: COLORS[i % COLORS.length] }}>
                {c.name?.[0]}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-white font-semibold text-sm">{c.name}</span>
                  <span className="text-gray-400 text-xs">{c.pricing}</span>
                </div>
                <p className="text-gray-500 text-xs mb-2">{c.target_customer}</p>
                <div className="flex gap-4">
                  <span className="text-green-400 text-xs">✓ {c.strength}</span>
                  <span className="text-red-400 text-xs">✗ {c.weakness}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      <p className="text-gray-600 text-xs">{data.saturation_explanation}</p>
    </div>
  )
}