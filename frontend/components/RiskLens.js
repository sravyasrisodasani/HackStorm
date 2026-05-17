"use client"
import { motion } from "framer-motion"

export default function RiskLens({ data }) {
  const timingColor = data.market_timing?.includes("perfect") ? "text-green-400" :
    data.market_timing?.includes("early") ? "text-yellow-400" : "text-red-400"

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-white">😈 RiskLens AI</h2>
        <span className="text-xs text-red-400 bg-red-900/30 border border-red-800 px-3 py-1 rounded-full">Brutally Honest Analysis</span>
      </div>

      {/* Biggest Risk Banner */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-red-950/50 border border-red-800 rounded-2xl p-5"
      >
        <div className="flex items-start gap-3">
          <span className="text-2xl">⚠️</span>
          <div>
            <h3 className="text-red-400 font-bold mb-1">Biggest Risk</h3>
            <p className="text-white text-sm leading-relaxed">{data.biggest_risk}</p>
          </div>
        </div>
      </motion.div>

      {/* 5 Failure Reasons */}
      <div>
        <h3 className="text-gray-400 text-sm mb-3">5 Reasons This Could Fail</h3>
        <div className="space-y-3">
          {(data.top_5_failure_reasons || []).map((reason, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="risk-card flex items-start gap-3"
            >
              <span className="text-red-500 font-bold text-sm mt-0.5 flex-shrink-0">{i + 1}</span>
              <p className="text-gray-300 text-sm leading-relaxed">{reason}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Competitor Response + Timing */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="card border-orange-800/50">
          <h3 className="text-orange-400 font-semibold mb-2 text-sm">🥊 Competitor Response</h3>
          <p className="text-gray-300 text-sm leading-relaxed">{data.competitor_response}</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="card">
          <h3 className="text-gray-400 font-semibold mb-2 text-sm">⏰ Market Timing</h3>
          <p className={`text-sm font-semibold ${timingColor}`}>{data.market_timing}</p>
        </motion.div>
      </div>

      {/* Fix These First */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="card border-green-800/50">
        <h3 className="text-green-400 font-semibold mb-4 text-sm">✅ Fix These Before You Start</h3>
        <div className="space-y-3">
          {(data.three_things_to_fix || []).map((fix, i) => (
            <div key={i} className="flex items-start gap-3">
              <span className="w-6 h-6 bg-green-900 text-green-400 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">{i + 1}</span>
              <p className="text-gray-300 text-sm leading-relaxed">{fix}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}