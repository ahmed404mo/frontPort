"use client"

import type React from "react"

import { motion } from "framer-motion"
import { Mail, Phone, MapPin, Send } from "lucide-react"
import { useState } from "react"
import { ProgrammingLanguages } from "@/components/animated-elements"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus("")

    // --- إنشاء نص الرسالة المنسق للواتساب ---
    const whatsappMessage = `مرحباً! أنا ${formData.name} (${formData.email})\nالموضوع: ${formData.subject}\nالرسالة: ${formData.message}\n\nيرجى الرد في أقرب وقت ممكن!`
    
    // --- رابط الواتساب ---
    const whatsappUrl = `https://wa.me/201096790839?text=${encodeURIComponent(whatsappMessage)}`
    
    try {
      // --- فتح الواتساب في tab جديد ---
      window.open(whatsappUrl, '_blank')
      
      console.log("WhatsApp opened with message:", whatsappMessage)
      setSubmitStatus("what's app is opened 📱")
      setFormData({ name: "", email: "", subject: "", message: "" })
    } catch (error) {
      console.error("Error opening WhatsApp:", error)
      setSubmitStatus("حدث خطأ! تأكد من تثبيت الواتساب وجرب مرة أخرى. 😔")
    } finally {
      setIsSubmitting(false)
    }
  }

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
      link: "#", // غيرته لـ # عشان مش هيفتح واتساب هنا
    },
    {
      icon: MapPin,
      title: "Location",
      value: "badr, Elbahira",
      link: "#",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-[#F9FAFB] to-white relative overflow-hidden">
      <ProgrammingLanguages />

      {/* Header Section */}
      <section className="relative pt-20 pb-12 px-4 sm:px-6 lg:px-8 z-10">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center space-y-4"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-[#1E293B]">Get In Touch</h1>
            <p className="text-lg text-[#64748B] max-w-2xl mx-auto">
              Have a question or want to collaborate? I'd love to hear from you. Send me a message and I'll respond as
              soon as possible.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {contactInfo.map((info, index) => {
              const Icon = info.icon
              return (
                <motion.a
                  key={info.title}
                  href={info.link}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, y: -2 }}
                  className="group p-6 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-all border-2 border-[#1E90FF]/10 hover:border-[#1E90FF]/30 duration-300"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#1E90FF] to-[#00BFFF] flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                      <Icon size={24} />
                    </div>
                    <div>
                      <h3 className="font-bold text-[#1E293B]">{info.title}</h3>
                      <p className="text-[#64748B] text-sm">{info.value}</p>
                    </div>
                  </div>
                </motion.a>
              )
            })}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-2xl mx-auto">
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            onSubmit={handleSubmit}
            className="bg-white rounded-3xl p-8 shadow-2xl border-2 border-[#1E90FF]/10"
          >
            <div className="space-y-6">
              {/* Name Field */}
              <div>
                <label className="block text-sm font-semibold text-[#1E293B] mb-2">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  className="text-[#1E293B] w-full px-4 py-3 rounded-lg border border-[#F1F5F9] focus:border-[#1E90FF] focus:outline-none focus:ring-2 focus:ring-[#1E90FF]/20 transition-all"
                  required
                  disabled={isSubmitting}
                />
              </div>

              {/* Email Field */}
              <div>
                <label className="block text-sm font-semibold text-[#1E293B] mb-2">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  className="text-[#1E293B] w-full px-4 py-3 rounded-lg border border-[#F1F5F9] focus:border-[#1E90FF] focus:outline-none focus:ring-2 focus:ring-[#1E90FF]/20 transition-all"
                  required
                  disabled={isSubmitting}
                />
              </div>

              {/* Subject Field */}
              <div>
                <label className="block text-sm font-semibold text-[#1E293B] mb-2">Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="What is this about?"
                  className="text-[#1E293B] w-full px-4 py-3 rounded-lg border border-[#F1F5F9] focus:border-[#1E90FF] focus:outline-none focus:ring-2 focus:ring-[#1E90FF]/20 transition-all"
                  required
                  disabled={isSubmitting}
                />
              </div>

              {/* Message Field */}
              <div>
                <label className="block text-sm font-semibold text-[#1E293B] mb-2">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your message here..."
                  rows={5}
                  className="text-[#1E293B] w-full px-4 py-3 rounded-lg border border-[#F1F5F9] focus:border-[#1E90FF] focus:outline-none focus:ring-2 focus:ring-[#1E90FF]/20 transition-all resize-none"
                  required
                  disabled={isSubmitting}
                />
              </div>

              {/* Submit Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isSubmitting}
                className="text-[#1E293B] w-full py-3 bg-gradient-to-r from-[#1E90FF] to-[#00BFFF] text-white font-semibold rounded-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send size={20} />
                {isSubmitting ? "Opening WhatsApp..." : "Send Message"}
              </motion.button>

              {/* Status Message */}
              {submitStatus && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`text-center font-semibold ${
                    submitStatus.includes("what's app is opened") ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {submitStatus}
                </motion.p>
              )}
            </div>
          </motion.form>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-4"
          >
            <h2 className="text-3xl font-bold text-[#1E293B]">Let's Connect</h2>
            <p className="text-[#64748B]">Follow me on social media for updates on my latest projects and insights.</p>
          </motion.div>
        </div>
      </section>
    </div>
  )
}