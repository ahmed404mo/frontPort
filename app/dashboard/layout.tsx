"use client"

import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import Link from "next/link"
import { 
  LayoutDashboard, 
  UserCircle, 
  FolderKanban, 
  Wrench, 
  MessageSquare, 
  LogOut, 
  Loader2,
  Info // أضفنا أيقونة الـ About
} from "lucide-react"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [isAuthorized, setIsAuthorized] = useState(false)

  // 1. حماية الداشبورد
  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) {
      router.push("/login")
    } else {
      setIsAuthorized(true)
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("token")
    router.push("/login")
  }

  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-[#0D1117] flex items-center justify-center">
        <Loader2 className="text-[#00BFFF] animate-spin" size={48} />
      </div>
    )
  }

  // قائمة الروابط - تم إضافة About Me هنا ⬇️
  const navItems = [
    { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
    { name: "Profile Info", href: "/dashboard/profile", icon: UserCircle },
    { name: "About Me", href: "/dashboard/about", icon: Info }, // 👈 الرابط الجديد
    { name: "My Projects", href: "/dashboard/projects", icon: FolderKanban },
    { name: "Skills & Tools", href: "/dashboard/skills", icon: Wrench },
    { name: "Messages", href: "/dashboard/messages", icon: MessageSquare },
  ]

  return (
    <div className="min-h-screen bg-[#0D1117] text-white flex">
      {/* Sidebar */}
      <aside className="w-64 bg-[#161B22] border-r border-[#30363D] hidden md:flex flex-col">
        <div className="p-6 border-b border-[#30363D]">
          <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#00BFFF] to-[#3B82F6]">
            Admin Panel
          </h2>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  isActive 
                    ? "bg-[#00BFFF]/10 text-[#00BFFF] border border-[#00BFFF]/20" 
                    : "text-[#9CA3AF] hover:text-white hover:bg-[#30363D]/50"
                }`}
              >
                <item.icon size={20} />
                <span className="font-medium">{item.name}</span>
              </Link>
            )
          })}
        </nav>

        <div className="p-4 border-t border-[#30363D]">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-3 text-[#EF4444] hover:bg-[#EF4444]/10 rounded-xl transition-all font-medium"
          >
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  )
}