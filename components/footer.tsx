import { Mail, Linkedin, Github, Facebook } from "lucide-react" // 1. غيرت Instagram لـ Facebook
import Link from "next/link"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-[#161B22] border-t border-[#30363D] text-white py-12 relative z-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="font-bold text-lg mb-2">Ahmed</h3>
            <p className="text-sm text-[#9CA3AF]">
              Early Childhood Education Student | Creative Educator | Educational Technology Enthusiast
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-[#9CA3AF] hover:text-[#00BFFF] transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/projects" className="text-[#9CA3AF] hover:text-[#00BFFF] transition-colors">
                  Projects
                </Link>
              </li>
              <li>
                <Link href="/skills" className="text-[#9CA3AF] hover:text-[#00BFFF] transition-colors">
                  Skills
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-[#9CA3AF] hover:text-[#00BFFF] transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Links (تم تعديل اللينكات) */}
          <div>
            <h3 className="font-bold text-lg mb-4">Connect</h3>
            <div className="flex gap-4">
              <a
                href="mailto:mo879938@gmail.com" // 2. لينك الإيميل
                className="text-[#9CA3AF] hover:text-[#00BFFF] hover:scale-110 transition-all"
                aria-label="Email"
              >
                <Mail size={20} />
              </a>
              <a
                href="https://www.linkedin.com/in/ahmed-mokhtar-a23a10372" // 3. لينك لينكدإن
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#9CA3AF] hover:text-[#00BFFF] hover:scale-110 transition-all"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="https://github.com/ahmed404mo" // 4. لينك جيت هاب
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#9CA3AF] hover:text-[#00BFFF] hover:scale-110 transition-all"
                aria-label="GitHub"
              >
                <Github size={20} />
              </a>
              <a
                href="https://www.facebook.com/share/17cxdv8hxb/" // 5. لينك فيسبوك
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#9CA3AF] hover:text-[#00BFFF] hover:scale-110 transition-all"
                aria-label="Facebook" // 6. غيرنا الـ label
              >
                <Facebook size={20} /> {/* 7. غيرنا الأيقونة */}
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-[#30363D] pt-8 text-center text-sm text-[#9CA3AF]">
          <p>&copy; {currentYear} Ahmed. All rights reserved. | Faculty of Early Childhood Education</p>
        </div>
      </div>
    </footer>
  )
}