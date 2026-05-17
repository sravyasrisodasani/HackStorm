"use client"
import { motion } from "framer-motion"

export default function OriginalityCheck({ data }) {
  const verdictConfig = {
    ORIGINAL: { color: "text-green-400", bg: "bg-green-900/30 border-green-700", icon: "🟢", label: "ORIGINAL IDEA" },
    SIMILAR_EXISTS: { color: "text-yellow-400", bg: "bg-yellow-900/30 border-yellow-700", icon: "🟡", label: "SIMILAR EXISTS" },
    ALREADY_EXISTS: { color: "text-red-400", bg: "bg-red-900/30 border-red-700", icon: "🔴", label: "ALREADY EXISTS" }
  }

  const recConfig = {
    BUILD_IT: { color: "text-green-400", bg: "bg-green-900/20", icon: "🚀", label: "BUILD IT" },
    PIVOT_SLIGHTLY: { color: "text-yellow-400", bg: "bg-yellow-900/20", icon: "🔄", label: "PIVOT SLIGHTLY" },
    RECONSIDER: { color: "text-red-400", bg: "bg-red-900/20", icon: "⚠️", label: "RECONSIDER" }
  }

  const verdict = verdictConfig[data.verdict] || verdictConfig.SIMILAR_EXISTS
  const rec = recConfig[data.recommendation] || recConfig.BUILD_IT
  const score = data.originality_score || 0

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-white">✅ Originality Check</h2>
        <span className="text-xs text-gray-500 bg-gray-800 px-3 py-1 rounded-full">Does This Already Exist?</span>
      </div>

      {/* Main Verdict */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`card border ${verdict.bg} text-center py-8`}
      >
        <div className="text-5xl mb-3">{verdict.icon}</div>
        <h3 className={`text-2xl font-bold ${verdict.color} mb-2`}>{verdict.label}</h3>
        <p className="text-gray-300 text-sm max-w-md mx-auto">{data.verdict_explanation}</p>
        <div className="mt-4 flex items-center justify-center gap-2">
          <span className="text-gray-500 text-sm">Originality Score:</span>
          <span className={`text-2xl font-bold ${verdict.color}`}>{score}/100</span>
        </div>
      </motion.div>

      {/* Originality Score Bar */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="card">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-gray-400">Originality Score</span>
          <span className="text-white font-bold">{score}/100</span>
        </div>
        <div className="h-3 bg-gray-800 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${score}%` }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="h-full rounded-full bg-gradient-to-r from-blue-600 to-purple-600"
          />
        </div>
        <div className="flex justify-between text-xs text-gray-600 mt-1">
          <span>Already Exists</span>
          <span>Completely Original</span>
        </div>
      </motion.div>

      {/* Existing Products */}
      {data.existing_products && data.existing_products.length > 0 && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <h3 className="text-gray-400 text-sm mb-3">Similar Products Found</h3>
          <div className="space-y-3">
            {data.existing_products.map((product, i) => (
              <div key={i} className="card card-hover">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <span className="text-white font-semibold text-sm">{product.name}</span>
                    <span className="text-gray-500 text-xs ml-2">({product.country})</span>
                  </div>
                  <span className="text-yellow-400 text-xs font-bold">{product.similarity_percentage}% similar</span>
                </div>
                <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden mb-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${product.similarity_percentage}%` }}
                    transition={{ delay: 0.4 + i * 0.1 }}
                    className="h-full bg-yellow-600 rounded-full"
                  />
                </div>
                <p className="text-blue-400 text-xs">💡 Your angle: {product.how_different_you_can_be}</p>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Unique Angle */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="card border-blue-800/50 bg-blue-900/10">
        <h3 className="text-blue-400 font-semibold mb-2 text-sm">💡 Unique Angle Available</h3>
        <p className="text-white text-sm leading-relaxed">{data.unique_angle_available}</p>
      </motion.div>

      {/* Recommendation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className={`card ${rec.bg} border`}
      >
        <div className="flex items-center gap-3 mb-2">
          <span className="text-2xl">{rec.icon}</span>
          <h3 className={`font-bold ${rec.color}`}>{rec.label}</h3>
        </div>
        <p className="text-gray-300 text-sm">{data.recommendation_reason}</p>
      </motion.div>
    </div>
  )
}