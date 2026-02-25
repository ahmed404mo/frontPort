"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Plus, 
  Trash2, 
  Loader2, 
  Wrench, 
  Code2, 
  Save,
  GraduationCap,
  Briefcase
} from "lucide-react"

// 1. تعريف شكل المهارة المحدث ليشمل القسم
interface Skill {
  _id: string;
  name: string;
  icon: string;
  level: number;
  category: string; 
}

export default function SkillsDashboard() {
  const [skills, setSkills] = useState<Skill[]>([])
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // 2. تحديث الـ Form Data لتشمل القسم افتراضياً
  const [formData, setFormData] = useState({
    name: "",
    icon: "",
    level: 80,
    category: "technical" 
  })

  // 3. جلب المهارات من الباك إند
  const fetchSkills = async () => {
    try {
      const res = await fetch("https://portfolioapi-flame.vercel.app/skills")
      const result = await res.json()
      // الباك إند يرسل البيانات مباشرة في result.data
      const fetchedSkills = result.data || [];
      setSkills(Array.isArray(fetchedSkills) ? fetchedSkills : []);
    } catch (error) {
      console.error("Error fetching skills:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchSkills() }, [])

  // 4. إضافة مهارة جديدة مع القسم المختار
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    const token = localStorage.getItem("token")

    try {
      const res = await fetch("https://portfolioapi-flame.vercel.app/skills", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      })

      if (res.ok) {
        await fetchSkills() 
        setIsModalOpen(false)
        setFormData({ name: "", icon: "", level: 80, category: "technical" })
      } else {
        const errorData = await res.json()
        alert(`Error: ${errorData.message || "Failed to add skill"}`)
      }
    } catch (error) {
      console.error("Submit error:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  // 5. حذف مهارة
  const deleteSkill = async (id: string) => {
    if (!confirm("Are you sure you want to delete this skill?")) return
    setIsDeleting(id)
    const token = localStorage.getItem("token")
    try {
      const res = await fetch(`https://portfolioapi-flame.vercel.app/skills/${id}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` }
      })
      if (res.ok) {
        setSkills(skills.filter(s => s._id !== id))
      }
    } catch (error) {
      console.error("Delete error:", error)
    } finally {
      setIsDeleting(null)
    }
  }

  if (loading) return <div className="h-[80vh] flex items-center justify-center"><Loader2 className="animate-spin text-[#00BFFF]" size={40} /></div>

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
            <Wrench className="text-[#00BFFF]" /> Skills Management
          </h1>
          <p className="text-[#9CA3AF]">Organize your tech stack and educational expertise.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-6 py-3 bg-[#00BFFF] text-white font-bold rounded-xl hover:shadow-lg transition-all"
        >
          <Plus size={20} /> Add New Skill
        </button>
      </div>

      {/* Skills List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <AnimatePresence>
          {skills.map((skill) => (
            <motion.div
              key={skill._id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#161B22] border border-[#30363D] p-5 rounded-2xl flex items-center justify-between group hover:border-[#00BFFF]/40 transition-all"
            >
              <div className="flex items-center gap-4 flex-1">
                <div className="w-12 h-12 bg-[#0D1117] rounded-xl flex items-center justify-center border border-[#30363D] overflow-hidden p-2">
                  {skill.icon.startsWith('http') ? (
                    <img src={skill.icon} alt={skill.name} className="w-full h-full object-contain" />
                  ) : (
                    <span className="text-2xl">{skill.icon}</span> 
                  )}
                </div>
                <div className="flex-1 space-y-2">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-bold text-white">{skill.name}</h3>
                      <span className="text-[10px] uppercase tracking-widest text-[#9CA3AF] bg-[#0D1117] px-2 py-0.5 rounded border border-[#30363D]">
                        {skill.category === "technical" ? "Technical" : "Educational"}
                      </span>
                    </div>
                    <span className="text-xs text-[#00BFFF] font-mono">{skill.level}%</span>
                  </div>
                  <div className="w-full bg-[#0D1117] h-1.5 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.level}%` }}
                      className="h-full bg-gradient-to-r from-[#00BFFF] to-[#3B82F6]" 
                    />
                  </div>
                </div>
              </div>
              <button 
                onClick={() => deleteSkill(skill._id)}
                className="ml-4 p-2 text-[#6B7280] hover:text-red-500 transition-colors"
                disabled={isDeleting === skill._id}
              >
                {isDeleting === skill._id ? <Loader2 className="animate-spin" size={18} /> : <Trash2 size={18} />}
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Add Skill Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsModalOpen(false)} className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
            <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }} className="relative w-full max-w-md bg-[#161B22] border border-[#30363D] rounded-3xl p-8 shadow-2xl">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <Code2 className="text-[#00BFFF]" /> New Skill
              </h2>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <label className="text-sm text-[#9CA3AF]">Skill Name</label>
                  <input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} placeholder="e.g. Next.js" className="w-full bg-[#0D1117] border border-[#30363D] rounded-xl px-4 py-3 text-white focus:border-[#00BFFF] outline-none" />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm text-[#9CA3AF]">Category</label>
                  <select 
                    value={formData.category}
                    onChange={e => setFormData({...formData, category: e.target.value})}
                    className="w-full bg-[#0D1117] border border-[#30363D] rounded-xl px-4 py-3 text-white outline-none focus:border-[#00BFFF]"
                  >
                    <option value="technical">Technical Skills (Work)</option>
                    <option value="educational">Educational Mastery (College)</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-[#9CA3AF]">Icon URL</label>
                  <input required value={formData.icon} onChange={e => setFormData({...formData, icon: e.target.value})} placeholder="https://cdn.icon.png" className="w-full bg-[#0D1117] border border-[#30363D] rounded-xl px-4 py-3 text-white focus:border-[#00BFFF] outline-none" />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-[#9CA3AF]">
                    <label>Level</label>
                    <span>{formData.level}%</span>
                  </div>
                  <input type="range" min="0" max="100" value={formData.level} onChange={e => setFormData({...formData, level: parseInt(e.target.value)})} className="w-full accent-[#00BFFF] h-2 bg-[#0D1117] rounded-lg appearance-none cursor-pointer" />
                </div>

                <div className="flex gap-4 pt-4">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-3 text-[#9CA3AF] hover:bg-white/5 rounded-xl transition-all">Cancel</button>
                  <button disabled={isSubmitting} className="flex-1 py-3 bg-[#00BFFF] text-white font-bold rounded-xl hover:shadow-lg flex items-center justify-center gap-2">
                    {isSubmitting ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
                    Save Skill
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}