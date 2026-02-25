"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { 
  UserCircle, 
  FolderKanban, 
  Wrench, 
  MessageSquare, 
  ArrowUpRight,
  Info // أضفنا الأيقونة الجديدة
} from "lucide-react"

export default function DashboardHome() {
  // بيانات الكروت الـ 5 (بعد إضافة About Me)
  const cards = [
    {
      title: "Profile Info",
      href: "/dashboard/profile",
      icon: UserCircle,
      iconColor: "text-[#3B82F6]",
      bgHover: "hover:border-[#3B82F6]/50 hover:shadow-[#3B82F6]/10",
    },
    {
      title: "About Me", // 👈 الكارت الجديد
      href: "/dashboard/about",
      icon: Info,
      iconColor: "text-[#00BFFF]",
      bgHover: "hover:border-[#00BFFF]/50 hover:shadow-[#00BFFF]/10",
    },
    {
      title: "My Projects",
      href: "/dashboard/projects",
      icon: FolderKanban,
      iconColor: "text-[#A855F7]",
      bgHover: "hover:border-[#A855F7]/50 hover:shadow-[#A855F7]/10",
    },
    {
      title: "Skills & Tools",
      href: "/dashboard/skills",
      icon: Wrench,
      iconColor: "text-[#22C55E]",
      bgHover: "hover:border-[#22C55E]/50 hover:shadow-[#22C55E]/10",
    },
    {
      title: "Inbound Messages",
      href: "/dashboard/messages",
      icon: MessageSquare,
      iconColor: "text-[#EAB308]",
      bgHover: "hover:border-[#EAB308]/50 hover:shadow-[#EAB308]/10",
    },
  ]

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-2"
      >
        <h1 className="text-3xl font-bold text-white">Welcome Back, Ahmed 👋</h1>
        <p className="text-[#9CA3AF]">Everything you need to manage your professional brand in one place.</p>
      </motion.div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {cards.map((card, index) => (
          <Link href={card.href} key={card.title}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`bg-[#161B22] p-6 rounded-2xl border border-[#30363D] transition-all duration-300 group cursor-pointer shadow-lg flex flex-col items-center text-center gap-4 h-full ${card.bgHover}`}
            >
              <div className={`p-4 rounded-2xl bg-[#0D1117] border border-[#30363D] group-hover:scale-110 transition-transform ${card.iconColor}`}>
                <card.icon size={32} strokeWidth={1.5} />
              </div>
              
              <h3 className="text-lg font-semibold text-white group-hover:text-[#00BFFF] transition-colors">
                {card.title}
              </h3>
              
              <div className="flex-1 flex items-end">
                <ArrowUpRight 
                  size={20} 
                  className="text-[#6B7280] group-hover:text-white transition-colors" 
                />
              </div>
            </motion.div>
          </Link>
        ))}
      </div>
    </div>
  )
}