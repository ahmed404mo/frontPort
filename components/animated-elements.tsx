"use client"

import { motion } from "framer-motion"

export function ProgrammingLanguages() {
  const languages = ["JavaScript", "React", "TypeScript", "Python", "CSS", "HTML", "Next.js", "Tailwind"]

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {languages.map((lang, i) => (
        <motion.div
          key={i}
          className="absolute text-sm font-semibold text-[#00BBF9]/30 whitespace-nowrap"
          initial={{ opacity: 0.1, x: Math.random() * 100 - 50, y: Math.random() * 100 - 50 }}
          animate={{
            opacity: [0.1, 0.3, 0.1],
            x: [Math.random() * 100 - 50, Math.random() * 200 - 100, Math.random() * 100 - 50],
            y: [Math.random() * 100 - 50, Math.random() * 200 - 100, Math.random() * 100 - 50],
          }}
          transition={{
            duration: 8 + i * 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
          style={{
            left: `${(i * 12.5) % 100}%`,
            top: `${(i * 25) % 100}%`,
          }}
        >
          {lang}
        </motion.div>
      ))}
    </div>
  )
}

export function FloatingStars() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-[#FEE440] rounded-full"
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: [0.3, 1, 0.3], y: [-20, 20, -20] }}
          transition={{ duration: 3 + i, repeat: Number.POSITIVE_INFINITY }}
          style={{
            left: `${20 + i * 15}%`,
            top: `${10 + i * 10}%`,
          }}
        />
      ))}
    </div>
  )
}

export function FloatingClouds() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-4xl opacity-20"
          initial={{ x: -100 }}
          animate={{ x: 500 }}
          transition={{ duration: 20 + i * 5, repeat: Number.POSITIVE_INFINITY }}
          style={{
            top: `${15 + i * 20}%`,
          }}
        >
          ☁️
        </motion.div>
      ))}
    </div>
  )
}

export function FloatingBooks() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute opacity-20"
          initial={{ opacity: 0, rotate: 0 }}
          animate={{ opacity: [0.2, 0.6, 0.2], rotate: [0, 10, -10, 0] }}
          transition={{ duration: 4 + i, repeat: Number.POSITIVE_INFINITY }}
          style={{
            right: `${10 + i * 15}%`,
            top: `${20 + i * 15}%`,
          }}
        >
          📚
        </motion.div>
      ))}
    </div>
  )
}
