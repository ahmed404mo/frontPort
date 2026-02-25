"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { LogIn, Mail, Lock, Loader2, Eye, EyeOff, ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import ParticlesBackground from "@/components/particles-background"

export default function LoginPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({ email: "", password: "" })
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    // 1. تنظيف البيانات من أي مسافات مخفية
    const cleanEmail = formData.email.trim()
    const cleanPassword = formData.password.trim()

    console.log("🚀 Sending Data:", { email: cleanEmail, password: cleanPassword })

    try {
// في ملف app/login/page.tsx السطر 34
const response = await fetch("https://portfolioapi-flame.vercel.app/auth/login", {
  method: "POST",
  headers: { 
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    email: cleanEmail,
    password: cleanPassword
  }),
})

      const result = await response.json()
      console.log("📩 Full Server Response:", result)

      if (response.ok) {
        const token = result.data?.account?.token || result.data?.token || result.token || result.message?.token

        if (token) {
          localStorage.setItem("token", token)
          console.log("Token stored! ✅")
          router.push("/dashboard")
        } else {
          setError("Login successful, but token structure is unrecognized 🔑")
        }
      } else {
        // لو الرد مش OK، اعرض رسالة الباك اند
        setError(result.message || "Invalid credentials ❌")
      }
    } catch (err) {
      console.error("Fetch Error:", err)
      setError("Connection failed. Check your internet or server status 🌐")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0D1117] relative overflow-hidden flex items-center justify-center p-4 text-white">
      <ParticlesBackground />
      <Link
        href="/"
        className="absolute top-8 left-8 text-[#9CA3AF] hover:text-[#00BFFF] flex items-center gap-2 transition-colors z-20"
      >
        <ArrowLeft size={20} /> Back to Site
      </Link>

      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-md z-10">
        <div className="bg-[#161B22] p-8 rounded-3xl border border-[#30363D] shadow-2xl space-y-8 relative overflow-hidden">
          <div className="text-center space-y-2">
            <div className="inline-flex p-4 rounded-2xl bg-[#00BFFF]/10 text-[#00BFFF] mb-2">
              <LogIn size={32} />
            </div>
            <h1 className="text-3xl font-bold">
              Admin <span className="gradient-text">Login</span>
            </h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-[#9CA3AF]">Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6B7280]" size={20} />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="admin@example.com"
                  className="w-full bg-[#0D1117] text-white pl-12 pr-4 py-3 rounded-xl border border-[#30363D] focus:border-[#00BFFF] focus:outline-none transition-all"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-[#9CA3AF]">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6B7280]" size={20} />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full bg-[#0D1117] text-white pl-12 pr-12 py-3 rounded-xl border border-[#30363D] focus:border-[#00BFFF] focus:outline-none transition-all"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#6B7280] hover:text-[#00BFFF]"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {error && (
              <p className="text-red-500 text-sm font-medium text-center bg-red-500/10 p-3 rounded-lg border border-red-500/20">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-gradient-to-r from-[#00BFFF] to-[#3B82F6] text-white font-bold rounded-xl hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? <Loader2 className="animate-spin" /> : <LogIn size={20} />}
              {loading ? "Authenticating..." : "Sign In"}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  )
}