"use client"
import { motion } from "framer-motion"

export default function RiskLens({ data }) {
  const timingColor = data.market_timing?.includes("perfect") ? "#00ff64" :
    data.market_timing?.includes("early") ? "#ff9600" : "#ff3264"

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-white">😈 RiskLens AI</h2>
        <span className="text-xs px-3 py-1 rounded-full badge-neon badge-red">Brutally Honest Analysis</span>
      </div>

      {/* Biggest Risk Banner */}
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
        className="rounded-2xl p-5" style={{background: "rgba(150,0,30,0.15)", border: "1px solid rgba(255,50,100,0.4)", boxShadow: "0 0 30px rgba(255,0,80,0.1), inset 0 0 30px rgba(0,0,0,0.3)"}}>
        <div className="flex items-start gap-3">
          <span className="text-2xl">⚠️</span>
          <div>
            <h3 className="font-bold mb-1 text-neon-red">Biggest Risk</h3>
            <p className="text-gray-200 text-sm leading-relaxed">{data.biggest_risk}</p>
          </div>
        </div>
      </motion.div>

      {/* 5 Failure Reasons */}
      <div>
        <h3 className="text-sm mb-3" style={{color: "rgba(150,150,200,0.7)"}}>5 Reasons This Could Fail</h3>
        <div className="space-y-3">
          {(data.top_5_failure_reasons || []).map((reason, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
              className="flex items-start gap-3 p-4 rounded-xl"
              style={{background: "rgba(100,0,20,0.2)", border: "1px solid rgba(255,50,100,0.2)", boxShadow: "0 0 10px rgba(255,0,80,0.04)"}}>
              <span className="font-bold text-sm mt-0.5 flex-shrink-0 text-neon-red">{i + 1}</span>
              <p className="text-gray-300 text-sm leading-relaxed">{reason}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Competitor Response + Timing */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
          className="card" style={{borderColor: "rgba(255,150,0,0.3)", boxShadow: "0 0 15px rgba(255,100,0,0.06)"}}>
          <h3 className="font-semibold mb-2 text-sm text-neon-orange">🥊 Competitor Response</h3>
          <p className="text-gray-300 text-sm leading-relaxed">{data.competitor_response}</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
          className="card">
          <h3 className="font-semibold mb-2 text-sm" style={{color: "rgba(150,150,200,0.8)"}}>⏰ Market Timing</h3>
          <p className="text-sm font-semibold" style={{ color: timingColor, textShadow: `0 0 10px ${timingColor}` }}>{data.market_timing}</p>
        </motion.div>
      </div>

      {/* Fix These First */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
        className="card" style={{borderColor: "rgba(0,255,100,0.3)", boxShadow: "0 0 15px rgba(0,255,80,0.06)"}}>
        <h3 className="font-semibold mb-4 text-sm text-neon-green">✅ Fix These Before You Start</h3>
        <div className="space-y-3">
          {(data.three_things_to_fix || []).map((fix, i) => (
            <div key={i} className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 text-neon-green"
                style={{background: "rgba(0,150,50,0.2)", border: "1px solid rgba(0,255,100,0.3)", boxShadow: "0 0 8px rgba(0,255,100,0.15)"}}>
                {i + 1}
              </span>
              <p className="text-gray-300 text-sm leading-relaxed">{fix}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}