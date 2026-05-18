"use client"
import { motion } from "framer-motion"

export default function OriginalityCheck({ data }) {
  const verdictConfig = {
    ORIGINAL: { color: "#00ff64", shadow: "0 0 20px rgba(0,255,100,0.4)", bg: "rgba(0,100,30,0.2)", border: "rgba(0,255,100,0.4)", icon: "🟢", label: "ORIGINAL IDEA" },
    SIMILAR_EXISTS: { color: "#ff9600", shadow: "0 0 20px rgba(255,150,0,0.4)", bg: "rgba(100,60,0,0.2)", border: "rgba(255,150,0,0.4)", icon: "🟡", label: "SIMILAR EXISTS" },
    ALREADY_EXISTS: { color: "#ff3264", shadow: "0 0 20px rgba(255,50,100,0.4)", bg: "rgba(100,0,20,0.2)", border: "rgba(255,50,100,0.4)", icon: "🔴", label: "ALREADY EXISTS" }
  }
  const recConfig = {
    BUILD_IT: { color: "#00ff64", bg: "rgba(0,100,30,0.15)", border: "rgba(0,255,100,0.3)", icon: "🚀", label: "BUILD IT" },
    PIVOT_SLIGHTLY: { color: "#ff9600", bg: "rgba(100,60,0,0.15)", border: "rgba(255,150,0,0.3)", icon: "🔄", label: "PIVOT SLIGHTLY" },
    RECONSIDER: { color: "#ff3264", bg: "rgba(100,0,20,0.15)", border: "rgba(255,50,100,0.3)", icon: "⚠️", label: "RECONSIDER" }
  }

  const verdict = verdictConfig[data.verdict] || verdictConfig.SIMILAR_EXISTS
  const rec = recConfig[data.recommendation] || recConfig.BUILD_IT
  const score = data.originality_score || 0

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-white">✅ Originality Check</h2>
        <span className="text-xs px-3 py-1 rounded-full badge-neon badge-purple">Does This Already Exist?</span>
      </div>

      {/* Main Verdict */}
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
        className="card text-center py-8"
        style={{background: verdict.bg, border: `1px solid ${verdict.border}`, boxShadow: `${verdict.shadow}, inset 0 0 30px rgba(0,0,0,0.3)`}}>
        <div className="text-5xl mb-3">{verdict.icon}</div>
        <h3 className="text-2xl font-black mb-2" style={{ color: verdict.color, textShadow: verdict.shadow }}>{verdict.label}</h3>
        <p className="text-gray-300 text-sm max-w-md mx-auto">{data.verdict_explanation}</p>
        <div className="mt-4 flex items-center justify-center gap-2">
          <span className="text-sm" style={{color: "rgba(150,150,200,0.7)"}}>Originality Score:</span>
          <span className="text-2xl font-black" style={{ color: verdict.color, textShadow: verdict.shadow }}>{score}/100</span>
        </div>
      </motion.div>

      {/* Score Bar */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="card">
        <div className="flex justify-between text-sm mb-2">
          <span style={{color: "rgba(150,150,200,0.7)"}}>Originality Score</span>
          <span className="text-white font-bold">{score}/100</span>
        </div>
        <div className="h-3 rounded-full overflow-hidden" style={{background: "rgba(100,100,255,0.1)"}}>
          <motion.div initial={{ width: 0 }} animate={{ width: `${score}%` }} transition={{ delay: 0.3, duration: 0.8 }}
            className="h-full rounded-full"
            style={{ background: verdict.color, boxShadow: `0 0 10px ${verdict.color}` }} />
        </div>
        <div className="flex justify-between text-xs mt-1" style={{color: "rgba(100,100,150,0.5)"}}>
          <span>Already Exists</span>
          <span>Completely Original</span>
        </div>
      </motion.div>

      {/* Existing Products */}
      {data.existing_products && data.existing_products.length > 0 && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <h3 className="text-sm mb-3" style={{color: "rgba(150,150,200,0.7)"}}>Similar Products Found</h3>
          <div className="space-y-3">
            {data.existing_products.map((product, i) => (
              <div key={i} className="card card-hover">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <span className="text-white font-semibold text-sm">{product.name}</span>
                    <span className="text-xs ml-2" style={{color: "rgba(150,150,200,0.5)"}}>({product.country})</span>
                  </div>
                  <span className="text-xs font-bold text-neon-orange">{product.similarity_percentage}% similar</span>
                </div>
                <div className="h-1.5 rounded-full overflow-hidden mb-2" style={{background: "rgba(100,100,255,0.1)"}}>
                  <motion.div initial={{ width: 0 }} animate={{ width: `${product.similarity_percentage}%` }} transition={{ delay: 0.4 + i * 0.1 }}
                    className="h-full rounded-full" style={{ background: "#ff9600", boxShadow: "0 0 6px #ff9600" }} />
                </div>
                <p className="text-xs text-neon-blue">💡 Your angle: {product.how_different_you_can_be}</p>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Unique Angle */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
        className="card" style={{borderColor: "rgba(0,150,255,0.3)", background: "rgba(0,50,100,0.15)", boxShadow: "0 0 15px rgba(0,100,255,0.08)"}}>
        <h3 className="font-semibold mb-2 text-sm text-neon-blue">💡 Unique Angle Available</h3>
        <p className="text-gray-200 text-sm leading-relaxed">{data.unique_angle_available}</p>
      </motion.div>

      {/* Recommendation */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
        className="card" style={{background: rec.bg, border: `1px solid ${rec.border}`, boxShadow: `0 0 15px ${rec.color}15`}}>
        <div className="flex items-center gap-3 mb-2">
          <span className="text-2xl">{rec.icon}</span>
          <h3 className="font-black" style={{ color: rec.color, textShadow: `0 0 10px ${rec.color}` }}>{rec.label}</h3>
        </div>
        <p className="text-gray-300 text-sm">{data.recommendation_reason}</p>
      </motion.div>
    </div>
  )
}