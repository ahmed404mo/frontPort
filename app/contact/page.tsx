"use client"

import type React from "react"
import { motion } from "framer-motion"
import { Mail, Phone, MapPin, Send, Loader2, CheckCircle2 } from "lucide-react"
import { useState } from "react"
import { ProgrammingLanguages } from "@/components/animated-elements"
import ParticlesBackground from "@/components/particles-background"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState({ type: "", msg: "" })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus({ type: "", msg: "" })

    try {
      const response = await fetch("https://portfolioapi-flame.vercel.app/message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setSubmitStatus({ type: "success", msg: "Message sent successfully! I'll get back to you soon. 🚀" })
        setFormData({ name: "", email: "", message: "" })
      } else {
        throw new Error("Failed to send message")
      }
    } catch (error) {
      setSubmitStatus({ type: "error", msg: "Something went wrong. Please try again later. 😔" })
    } finally {
      setIsSubmitting(false)
    }
  }

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault()
  //   setIsSubmitting(true)
  //   setSubmitStatus({ type: "", msg: "" })

  //   console.log("🚀 Sending Message:", formData)

  //   try {
  //     // 1. استخدام رابط اللوكال هوست عشان نضمن إن الباك اند شغال
  //     const response = await fetch("http://localhost:5000/message", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         "Accept": "application/json"
  //       },
  //       body: JSON.stringify({
  //         name: formData.name.trim(),
  //         email: formData.email.trim(),
  //         message: formData.message.trim()
  //       }),
  //     })

  //     // 2. قراءة الرد من السيرفر عشان لو في خطأ نعرفه
  //     const result = await response.json()
  //     console.log("📩 Server Response:", result)

  //     if (response.ok) {
  //       setSubmitStatus({ type: "success", msg: "Message sent successfully! I'll get back to you soon. 🚀" })
  //       setFormData({ name: "", email: "", message: "" }) // تصفير الفورم
  //     } else {
  //       // لو السيرفر رفض، هيعرض لك رسالة الباك اند الحقيقية
  //       setSubmitStatus({ type: "error", msg: result.message || "Failed to send message 😔" })
  //     }
  //   } catch (error) {
  //     console.error("🌐 Fetch Error:", error)
  //     setSubmitStatus({ type: "error", msg: "Connection error. Is backend running on port 5000? 🔌" })
  //   } finally {
  //     setIsSubmitting(false)
  //   }
  // }

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      value: "mo879938@gmail.com",
      link: "mailto:mo879938@gmail.com",
    },
    {
      icon: Phone,
      title: "Phone",
      value: "+20 (0109) 679-0839",
      link: "tel:+201096790839",
    },
    {
      icon: MapPin,
      title: "Location",
      value: "Badr, Elbahira, Egypt",
      link: "#",
    },
  ]

  return (
    <div className="min-h-screen bg-[#0D1117] relative overflow-hidden text-white">
      <ParticlesBackground />

      {/* Header Section */}
      <section className="relative pt-32 pb-12 px-4 sm:px-6 lg:px-8 z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto space-y-4"
        >
          <h1 className="text-5xl md:text-6xl font-bold">
            Get In <span className="gradient-text">Touch</span>
          </h1>
          <p className="text-lg text-[#9CA3AF] max-w-2xl mx-auto">
            Have a project in mind or just want to say hi? My inbox is always open.
          </p>
        </motion.div>
      </section>

      {/* Main Content */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Contact Info Cards */}
          <div className="space-y-6 lg:col-span-1">
            {contactInfo.map((info, index) => {
              const Icon = info.icon
              return (
                <motion.a
                  key={info.title}
                  href={info.link}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-4 p-6 rounded-2xl bg-[#161B22] border border-[#30363D] hover:border-[#00BFFF]/50 transition-all group"
                >
                  <div className="w-12 h-12 rounded-full bg-[#00BFFF]/10 flex items-center justify-center text-[#00BFFF] group-hover:bg-[#00BFFF] group-hover:text-white transition-all">
                    <Icon size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-white">{info.title}</h3>
                    <p className="text-[#9CA3AF] text-sm">{info.value}</p>
                  </div>
                </motion.a>
              )
            })}
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              onSubmit={handleSubmit}
              className="bg-[#161B22] rounded-3xl p-8 border border-[#30363D] shadow-2xl space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-[#9CA3AF]">Your Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Ahmed Mokhtar"
                    className="w-full bg-[#0D1117] text-white px-4 py-3 rounded-xl border border-[#30363D] focus:border-[#00BFFF] focus:outline-none transition-all"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-[#9CA3AF]">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="mo879938@gmail.com"
                    className="w-full bg-[#0D1117] text-white px-4 py-3 rounded-xl border border-[#30363D] focus:border-[#00BFFF] focus:outline-none transition-all"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-[#9CA3AF]">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project..."
                  rows={6}
                  className="w-full bg-[#0D1117] text-white px-4 py-3 rounded-xl border border-[#30363D] focus:border-[#00BFFF] focus:outline-none transition-all resize-none"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-gradient-to-r from-[#00BFFF] to-[#3B82F6] text-white font-bold rounded-xl hover:shadow-lg hover:shadow-[#00BFFF]/30 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isSubmitting ? <Loader2 className="animate-spin" /> : <Send size={20} />}
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>

              {/* Status Feedbacks */}
              {submitStatus.msg && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className={`flex items-center gap-2 justify-center p-4 rounded-xl ${
                    submitStatus.type === "success" ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500"
                  }`}
                >
                  {submitStatus.type === "success" && <CheckCircle2 size={20} />}
                  <p className="font-medium">{submitStatus.msg}</p>
                </motion.div>
              )}
            </motion.form>
          </div>
        </div>
      </section>
    </div>
  )
}