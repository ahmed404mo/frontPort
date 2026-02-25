"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Loader2, Code2, GraduationCap } from "lucide-react"
import ParticlesBackground from "@/components/particles-background"

interface Skill {
  _id: string;
  name: string;
  level: number;
  icon: string;
  category?: string; 
}

const SkillBar = ({ skill, color }: { skill: Skill; color: string }) => (
  <div className="space-y-3">
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-3">
        {/* عرض الأيقونة (سواء رابط أو Base64) */}
        <div className="w-8 h-8 rounded-lg bg-[#0D1117] border border-[#30363D] p-1.5 flex items-center justify-center">
           {skill.icon?.startsWith("http") || skill.icon?.startsWith("data:image") ? (
             <img src={skill.icon} alt={skill.name} className="w-full h-full object-contain" />
           ) : (
             <Code2 size={16} className="text-[#9CA3AF]" />
           )}
        </div>
        <span className="font-medium text-[#E6EDF3]">{skill.name}</span>
      </div>
      <span className="text-sm font-bold" style={{ color }}>{skill.level}%</span>
    </div>
    <div className="w-full bg-[#0D1117] rounded-full h-2 overflow-hidden border border-[#30363D]">
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: `${skill.level}%` }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="h-full rounded-full"
        style={{ backgroundColor: color }}
      />
    </div>
  </div>
);

export default function SkillsPage() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const res = await fetch("https://portfolioapi-flame.vercel.app/skills");
        const result = await res.json();
        const fetchedData = result.data || [];
        setSkills(Array.isArray(fetchedData) ? fetchedData : []);
      } catch (error) {
        console.error("Error fetching skills:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSkills();
  }, []);

  // 🚨 التعديل الجوهري: لو المهارة مفيهاش category، هنعتبرها technical افتراضياً عشان تظهر
  const techSkills = skills.filter(s => s.category === "technical" || !s.category);
  const eduSkills = skills.filter(s => s.category === "educational");

  if (loading) return (
    <div className="min-h-screen bg-[#0D1117] flex items-center justify-center">
      <Loader2 className="text-[#00BFFF] animate-spin" size={48} />
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0D1117] relative overflow-hidden text-white pb-20">
      <ParticlesBackground />

      <section className="relative pt-32 pb-12 px-4 z-10 text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-4">
          Technical <span className="text-[#00BFFF]">Expertise</span>
        </h1>
        <p className="text-[#9CA3AF] max-w-2xl mx-auto text-lg">
          Bridging the gap between advanced web development and early childhood education.
        </p>
      </section>

      <section className="px-4 sm:px-6 lg:px-8 relative z-10 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="p-8 rounded-2xl bg-[#161B22] border border-[#30363D] shadow-xl"
          >
            <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
              <Code2 className="text-[#00BFFF]" /> Development Skills
            </h2>
            <div className="space-y-6">
              {techSkills.length > 0 ? (
                techSkills.map(skill => <SkillBar key={skill._id} skill={skill} color="#00BFFF" />)
              ) : (
                <p className="text-[#6B7280] italic">No technical skills found.</p>
              )}
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="p-8 rounded-2xl bg-[#161B22] border border-[#30363D] shadow-xl"
          >
            <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
              <GraduationCap className="text-[#3B82F6]" /> Educational Mastery
            </h2>
            <div className="space-y-6">
              {eduSkills.length > 0 ? (
                eduSkills.map(skill => <SkillBar key={skill._id} skill={skill} color="#3B82F6" />)
              ) : (
                <p className="text-[#6B7280] italic">No educational skills found.</p>
              )}
            </div>
          </motion.div>

        </div>
      </section>
    </div>
  );
}