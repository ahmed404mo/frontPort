"use client"

import React, { useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { BookOpen, Heart, Lightbulb, Users } from "lucide-react"
import { ProgrammingLanguages } from "@/components/animated-elements"

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  const values = [
    {
      icon: BookOpen,
      title: "Lifelong Learning",
      description:
        "Learning never stops. Whether it's mastering a new framework or a new educational theory, I'm always eager to grow.",
    },
    {
      icon: Heart,
      title: "Child-Centered",
      description:
        "Every tool, game, or story I create is built with the child's perspective in mind. Their curiosity and well-being are the priority.",
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description:
        "Using technology (like Python or Next.js) to solve old problems in new ways and make complex ideas simple and fun.",
    },
    {
      icon: Users,
      title: "Collaboration",
      description:
        "Working with educators, designers, and developers to bring ideas to life. Great things are rarely built alone.",
    },
  ]

  // كود الـ Canvas: Network Graph أزرق زي الصورة (nodes و lines متصلة مع حركة خفيفة)
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId: number
    const nodes: { x: number; y: number; vx: number; vy: number; radius: number }[] = []
    const numNodes = 20 // عدد النودز للشبكة
    const width = canvas.width
    const height = canvas.height

    // إنشاء النودز عشوائيًا
    const createNodes = (w: number, h: number) => {
      nodes.length = 0
      for (let i = 0; i < numNodes; i++) {
        nodes.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.5, // حركة بطيئة جدًا
          vy: (Math.random() - 0.5) * 0.5,
          radius: Math.random() * 3 + 2,
        })
      }
    }

    // حساب المسافة بين نودزين
    const distance = (x1: number, y1: number, x2: number, y2: number) => {
      return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2)
    }

    const draw = () => {
      const w = canvas.width
      const h = canvas.height
      if (w === 0 || h === 0) {
        animationFrameId = requestAnimationFrame(draw)
        return
      }

      // خلفية سوداء غامقة زي الصورة
      ctx.fillStyle = "#0a0a1a" // أسود غامق
      ctx.fillRect(0, 0, w, h)

      // حركة النودز مع ارتداد
      nodes.forEach(node => {
        node.x += node.vx
        node.y += node.vy
        if (node.x < 0 || node.x > w) node.vx *= -1
        if (node.y < 0 || node.y > h) node.vy *= -1
      })

      // رسم الخطوط (connections) بين النودز القريبة
      ctx.strokeStyle = "rgba(30, 144, 255, 0.3)" // أزرق فاتح شفاف
      ctx.lineWidth = 1
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dist = distance(nodes[i].x, nodes[i].y, nodes[j].x, nodes[j].y)
          if (dist < 150) { // ربط النودز القريبة فقط
            ctx.beginPath()
            ctx.moveTo(nodes[i].x, nodes[i].y)
            ctx.lineTo(nodes[j].x, nodes[j].y)
            ctx.stroke()
          }
        }
      }

      // رسم النودز
      nodes.forEach(node => {
        ctx.fillStyle = "rgba(30, 144, 255, 0.8)" // أزرق للنودز
        ctx.beginPath()
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2)
        ctx.fill()

        // إضاءة خفيفة (glow) زي الصورة
        ctx.shadowColor = "rgba(30, 144, 255, 0.5)"
        ctx.shadowBlur = 5
        ctx.fill()
        ctx.shadowBlur = 0 // إعادة للطبيعي
      })

      animationFrameId = requestAnimationFrame(draw)
    }

    // Resize handling
    const resizeObserver = new ResizeObserver((entries) => {
      if (entries[0]) {
        const { width: newW, height: newH } = entries[0].contentRect
        canvas.width = newW
        canvas.height = newH
        createNodes(newW, newH)
        if (animationFrameId) cancelAnimationFrame(animationFrameId)
        draw()
      }
    })
    resizeObserver.observe(canvas)

    createNodes(width, height)
    draw()

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId)
      resizeObserver.unobserve(canvas)
    }
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-[#F9FAFB] to-white relative overflow-hidden">
      <ProgrammingLanguages />

      {/* Hero Section */}
      <section className="relative pt-20 pb-16 px-4 sm:px-6 lg:px-8 z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-4"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-[#1E293B]">Ahmed's World</h1>
            <p className="text-xl text-[#64748B]">Welcome to my digital playground – where education meets innovation</p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
            {/* Canvas Container - Network Graph */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative h-96 w-full rounded-3xl overflow-hidden shadow-2xl border border-[#1E90FF]/30"
            >
              <canvas ref={canvasRef} className="w-full h-full" />
            </motion.div>

            {/* Right - Intro */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <div className="space-y-4">
                <h2 className="text-3xl font-bold text-[#1E293B]">My Universe</h2>
                <p className="text-lg text-[#64748B] leading-relaxed">
                  Dive into a connected world of ideas, where every node represents a passion, and every link is a collaboration.
                </p>
                <p className="text-lg text-[#64748B] leading-relaxed">
                  From coding interactive stories to designing child-friendly apps, this graph visualizes the flow of creativity.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="text-xl font-bold text-[#1E293B]">Explore Connections</h3>
                <ul className="space-y-2 text-[#64748B]">
                  <li className="flex items-start gap-3">
                    <span className="text-[#1E90FF] font-bold mt-1 text-lg">→</span>
                    <span>Interactive learning tools built with Next.js and Python.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#1E90FF] font-bold mt-1 text-lg">→</span>
                    <span>Stories and games that spark young imaginations.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#1E90FF] font-bold mt-1 text-lg">→</span>
                    <span>Collaborative projects linking education and tech.</span>
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>

          {/* Values Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-12"
          >
            <div className="text-center space-y-4">
              <h2 className="text-4xl font-bold text-[#1E293B]">Core Principles</h2>
              <p className="text-lg text-[#64748B]">The nodes that power my network</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {values.map((value, i) => {
                const Icon = value.icon
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    whileHover={{ scale: 1.02, y: -2 }}
                    className="p-8 rounded-2xl bg-gradient-to-br from-white to-[#F9FAFB] border-2 border-[#1E90FF]/20 hover:border-[#1E90FF]/50 transition-all duration-300 hover:shadow-xl"
                  >
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-lg bg-gradient-to-br from-[#1E90FF] to-[#00BFFF] text-white">
                        <Icon size={24} />
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-xl font-bold text-[#1E293B]">{value.title}</h3>
                        <p className="text-[#64748B]">{value.description}</p>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Education/Next Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white relative z-10">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="text-center space-y-4">
              <h2 className="text-4xl font-bold text-[#1E293B]">Next Connections</h2>
              <p className="text-lg text-[#64748B]">Join the network</p>
            </div>

            <div className="space-y-6">
              <div className="p-8 rounded-2xl bg-gradient-to-r from-[#1E90FF]/10 to-[#00BFFF]/10 border-l-4 border-[#1E90FF]">
                <h3 className="text-2xl font-bold text-[#1E293B] mb-2">Faculty of Early Childhood Education</h3>
                <p className="text-[#64748B] mb-3">Currently Building the Future</p>
                <p className="text-[#64748B] leading-relaxed">
                  Linking pedagogy with pixels – every lesson a new edge in the graph of knowledge.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}