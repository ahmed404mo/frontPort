"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Home, Compass } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0D1117] flex items-center justify-center px-4 relative overflow-hidden">
      {/* تأثير الإضاءة في الخلفية */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-[#00BFFF]/10 rounded-full blur-[100px] pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center relative z-10"
      >
        {/* أيقونة البوصلة المتحركة */}
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 150 }}
          className="flex justify-center mb-8"
        >
          <div className="p-6 bg-[#161B22] rounded-full border border-[#30363D] shadow-lg shadow-[#00BFFF]/20">
            <Compass className="text-[#00BFFF] w-12 h-12 md:w-16 md:h-16 animate-pulse" />
          </div>
        </motion.div>

        {/* رقم 404 بتدرج لوني */}
        <h1 className="text-7xl md:text-9xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#00BFFF] to-[#3B82F6] mb-4 drop-shadow-lg">
          404
        </h1>
        
        <h2 className="text-2xl md:text-4xl font-bold text-white mb-4">
          Lost in Space?
        </h2>
        
        <p className="text-[#9CA3AF] max-w-md mx-auto mb-10 text-base md:text-lg leading-relaxed">
          Oops! The page you are looking for doesn't exist, has been moved, or is temporarily unavailable.
        </p>

        {/* زرار العودة للرئيسية */}
        <Link href="/">
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#00BFFF] text-white font-bold rounded-2xl hover:shadow-lg hover:shadow-[#00BFFF]/30 transition-all group"
          >
            <Home size={20} className="group-hover:-translate-y-1 transition-transform" />
            Back to Homepage
          </motion.button>
        </Link>
      </motion.div>
    </div>
  )
}