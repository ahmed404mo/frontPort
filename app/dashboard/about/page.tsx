"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Save, 
  Loader2, 
  CheckCircle2,
  Info,
  ArrowLeft,
  Cpu,
  Type,
  Image as ImageIcon // 👈 ضفنا أيقونة الصورة هنا
} from "lucide-react"

export default function AboutDashboard() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  // 1. حالة البيانات (ضفنا فيها aboutImage)
  const [formData, setFormData] = useState({
    pageTitle: "",
    pageSubtitle: "",
    missionTitle: "",
    missionDescription: "",
    aboutImage: "" // 👈 حقل الصورة الجديد
  })

  // 2. جلب بيانات About
  const fetchAboutData = async () => {
    try {
      // 👈 وحدنا اللينك هنا عشان يكلم نفس الباك إند
      const res = await fetch("https://portfolioapi-flame.vercel.app/about", { cache: "no-store" }) 
      const result = await res.json()
      
      if (result.data) {
        setFormData({
          pageTitle: result.data.pageTitle || "Behind the Systems",
          pageSubtitle: result.data.pageSubtitle || "Engineering high-performance solutions...",
          missionTitle: result.data.missionTitle || "Technical Vision",
          missionDescription: result.data.missionDescription || "I am a Full-Stack Developer...",
          aboutImage: result.data.aboutImage || "" // 👈 جلب الصورة لو موجودة
        })
      }
    } catch (error) {
      console.error("Error fetching about data:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchAboutData() }, [])

  // 3. تحديث بيانات About
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    const token = localStorage.getItem("token")

    try {
      const res = await fetch("https://portfolioapi-flame.vercel.app/about", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      })

      if (res.ok) {
        setShowSuccess(true)
        setTimeout(() => setShowSuccess(false), 3000)
      } else {
         const errorData = await res.json()
         alert(`Error: ${errorData.message || "Failed to update"}`)
      }
    } catch (error) {
      console.error("Update error:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (loading) return (
    <div className="h-[80vh] flex items-center justify-center">
      <Loader2 className="animate-spin text-[#00BFFF]" size={40} />
    </div>
  )

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-8">
      
      {/* 🔙 زرار الرجوع */}
      <motion.button
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={() => router.push("/dashboard")}
        className="flex items-center gap-2 text-[#9CA3AF] hover:text-[#00BFFF] transition-colors group mb-2"
      >
        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
        <span className="font-medium text-sm italic">Back to Dashboard</span>
      </motion.button>

      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
            <Info className="text-[#00BFFF]" /> About Page Content
          </h1>
          <p className="text-[#9CA3AF]">Manage the text, image, and mission statement on your public About page.</p>
        </div>
        
        <AnimatePresence>
          {showSuccess && (
            <motion.div 
              initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}
              className="bg-green-500/10 text-green-500 px-4 py-2 rounded-xl border border-green-500/20 flex items-center gap-2"
            >
              <CheckCircle2 size={18} /> Content Saved
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Left Column: Hero Section Content */}
        <div className="space-y-6">
          <div className="bg-[#161B22] border border-[#30363D] p-6 rounded-2xl space-y-4 shadow-lg">
            <div className="flex items-center gap-2 text-[#00BFFF] mb-2 font-bold text-xs uppercase tracking-wider">
              <Type size={16} /> Hero Section
            </div>
            
            <div className="space-y-1">
              <label className="text-xs text-[#9CA3AF]">Page Main Title</label>
              <input 
                required
                value={formData.pageTitle}
                onChange={e => setFormData({...formData, pageTitle: e.target.value})}
                placeholder="e.g. Behind the Systems"
                className="w-full bg-[#0D1117] border border-[#30363D] rounded-xl px-4 py-3 text-white focus:border-[#00BFFF] outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs text-[#9CA3AF]">Page Subtitle</label>
              <textarea 
                rows={3}
                required
                value={formData.pageSubtitle}
                onChange={e => setFormData({...formData, pageSubtitle: e.target.value})}
                placeholder="Engineering high-performance solutions..."
                className="w-full bg-[#0D1117] border border-[#30363D] rounded-xl px-4 py-3 text-white focus:border-[#00BFFF] outline-none resize-none"
              />
            </div>

            {/* 👈 ضفنا حقل الصورة هنا */}
            <div className="space-y-1 pt-2">
              <label className="text-xs text-[#9CA3AF]">About Page Image URL (Optional)</label>
              <div className="relative">
                <ImageIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6B7280]" size={16} />
                <input 
                  value={formData.aboutImage}
                  onChange={e => setFormData({...formData, aboutImage: e.target.value})}
                  placeholder="https://example.com/image.png"
                  className="w-full bg-[#0D1117] border border-[#30363D] rounded-xl pl-10 pr-4 py-3 text-white focus:border-[#00BFFF] outline-none"
                />
              </div>
              <p className="text-[10px] text-[#6B7280] mt-1 pl-1">Leave empty to use your default profile avatar.</p>
            </div>
          </div>
        </div>

        {/* Right Column: Mission Content */}
        <div className="space-y-6">
          <div className="bg-[#161B22] border border-[#30363D] p-6 rounded-2xl space-y-4 shadow-lg">
            <div className="flex items-center gap-2 text-[#00BFFF] mb-2 font-bold text-xs uppercase tracking-wider">
              <Cpu size={16} /> Technical Mission
            </div>
            
            <div className="space-y-1">
              <label className="text-xs text-[#9CA3AF]">Mission Title</label>
              <input 
                required
                value={formData.missionTitle}
                onChange={e => setFormData({...formData, missionTitle: e.target.value})}
                placeholder="e.g. Technical Vision"
                className="w-full bg-[#0D1117] border border-[#30363D] rounded-xl px-4 py-3 text-white focus:border-[#00BFFF] outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs text-[#9CA3AF]">Mission Description (Your Bio)</label>
              <textarea 
                rows={6}
                required
                value={formData.missionDescription}
                onChange={e => setFormData({...formData, missionDescription: e.target.value})}
                placeholder="I am a Full-Stack Developer specializing in..."
                className="w-full bg-[#0D1117] border border-[#30363D] rounded-xl px-4 py-3 text-white focus:border-[#00BFFF] outline-none resize-none leading-relaxed"
              />
            </div>
          </div>

          <button 
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 bg-gradient-to-r from-[#00BFFF] to-[#3B82F6] text-white font-bold rounded-2xl hover:shadow-lg hover:shadow-[#00BFFF]/30 transition-all flex items-center justify-center gap-2 group"
          >
            {isSubmitting ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} className="group-hover:scale-110 transition-transform" />}
            Save About Content
          </button>
        </div>
      </form>
    </div>
  )
}