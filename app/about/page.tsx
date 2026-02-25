"use client"

import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Lightbulb, Loader2, Target, Rocket, ShieldCheck, Cpu, Database, Code2 } from "lucide-react"
import ParticlesBackground from "@/components/particles-background"
import Image from "next/image"

// 1. تعريف واجهات البيانات
interface ProfileData {
  fullName: string;
  avatar: string;
}

interface AboutData {
  pageTitle: string;
  pagesSubtitle?: string; 
  pageSubtitle?: string; 
  missionTitle: string;
  missionDescription: string;
  aboutImage?: string; // 👈 حقل الصورة الخاصة بصفحة About
}

export default function AboutPage() {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [about, setAbout] = useState<AboutData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [profileRes, aboutRes] = await Promise.all([
          fetch("https://portfolioapi-flame.vercel.app/profile", { cache: "no-store" }),
          fetch("https://portfolioapi-flame.vercel.app/about", { cache: "no-store" })
        ]);

        const profileResult = await profileRes.json();
        const aboutResult = await aboutRes.json();
        
        console.log("Profile Response:", profileResult);
        console.log("About Response:", aboutResult);
        
        if (profileResult?.data) {
          setProfile(profileResult.data.profile || profileResult.data);
        }
        
        if (aboutResult?.data) {
          setAbout(aboutResult.data.about || aboutResult.data);
        }

      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // المبادئ ثابتة برمجياً حالياً لضمان شكل الأيقونات
  const values = [
    {
      icon: Code2,
      title: "Full-Stack Mastery",
      description: "Expertise in building scalable web applications using React.js, Next.js, and Node.js with a focus on performance.",
    },
    {
      icon: Database,
      title: "Database Management",
      description: "Proficient in both NoSQL (MongoDB) and Relational Databases (SQL/Sequelize) to ensure secure and optimized data architecting.",
    },
    {
      icon: Lightbulb,
      title: "Modern Architecture",
      description: "Leveraging Express.js and Mongoose to create robust RESTful APIs and clean, maintainable backend systems.",
    },
    {
      icon: ShieldCheck,
      title: "Quality First",
      description: "Committed to writing clean, documented, and secure code that follows industry best practices and design patterns.",
    },
  ]

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0D1117] flex items-center justify-center">
        <Loader2 className="text-[#00BFFF] animate-spin" size={48} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0D1117] relative overflow-hidden text-white">
      <ParticlesBackground />

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 px-4 sm:px-6 lg:px-8 z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto space-y-4"
        >
          <h1 className="text-5xl md:text-6xl font-bold">
            {about?.pageTitle || "Behind the Systems"}
          </h1>
          <p className="text-xl text-[#9CA3AF]">
            {about?.pagesSubtitle || about?.pageSubtitle || "Engineering high-performance solutions with modern stacks"}
          </p>
        </motion.div>
      </section>

      {/* Main Content Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32">
            
            {/* Left - Profile/About Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative flex justify-center"
            >
              <div className="relative w-72 h-72 md:w-80 md:h-80 lg:w-[400px] lg:h-[400px]">
                <div className="absolute inset-0 bg-[#00BFFF]/20 rounded-full blur-[80px] animate-pulse" />
                <div className="relative w-full h-full rounded-3xl overflow-hidden border border-[#30363D] shadow-2xl">
                  {/* 👈 ربط الصورة بـ aboutImage الأول، لو مفيش هيقرأ صورة الـ profile */}
                  <Image 
                    src={about?.aboutImage || profile?.avatar || "/portTwo.png"} 
                    alt={`${profile?.fullName || "Ahmed Mokhtar"} - Full Stack Developer`}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </motion.div>

            {/* Right - Bio Content */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="space-y-8"
            >
              <div className="space-y-4">
                <h2 className="text-3xl font-bold flex items-center gap-3">
                  <Cpu className="text-[#00BFFF]" /> 
                  {about?.missionTitle || "Technical Vision"}
                </h2>
                <p className="text-lg text-[#9CA3AF] leading-relaxed">
                  {about?.missionDescription || "I am a Full-Stack Developer specializing in the MERN stack (MongoDB, Express, React, Node.js). I build end-to-end applications with advanced state management in Next.js and robust backend logic using Sequelize and Mongoose."}
                </p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                <div className="p-6 rounded-2xl bg-[#161B22] border border-[#30363D] hover:border-[#00BFFF]/40 transition-colors group">
                  <Rocket className="text-[#00BFFF] mb-3 group-hover:scale-110 transition-transform" size={24} />
                  <h4 className="font-bold text-white">Scale & Speed</h4>
                  <p className="text-sm text-[#6B7280] mt-1">Optimizing frontend rendering and backend query performance.</p>
                </div>
                <div className="p-6 rounded-2xl bg-[#161B22] border border-[#30363D] hover:border-[#00BFFF]/40 transition-colors group">
                  <ShieldCheck className="text-[#00BFFF] mb-3 group-hover:scale-110 transition-transform" size={24} />
                  <h4 className="font-bold text-white">Clean Architecture</h4>
                  <p className="text-sm text-[#6B7280] mt-1">Implementing MVC patterns and modular code structures.</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Core Principles Grid */}
          <div className="space-y-16">
            <div className="text-center space-y-3">
              <h2 className="text-4xl font-bold">Guiding Principles</h2>
              <p className="text-[#9CA3AF] max-w-xl mx-auto text-lg">My commitment to excellence through modern technology and efficient engineering.</p>
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
                    className="p-10 rounded-3xl bg-[#161B22] border border-[#30363D] hover:border-[#00BFFF]/50 transition-all group"
                  >
                    <div className="flex flex-col sm:flex-row items-start gap-6">
                      <div className="p-4 rounded-2xl bg-[#00BFFF]/10 text-[#00BFFF] group-hover:bg-[#00BFFF] group-hover:text-white transition-all duration-300">
                        <Icon size={28} />
                      </div>
                      <div className="space-y-3">
                        <h3 className="text-2xl font-bold">{value.title}</h3>
                        <p className="text-[#9CA3AF] text-lg leading-relaxed">{value.description}</p>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}