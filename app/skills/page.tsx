"use client"

import { motion } from "framer-motion"
import { ProgrammingLanguages } from "@/components/animated-elements"

export default function SkillsPage() {
  const skillCategories = [
    {
      category: "Frontend Development",
      skills: [
        { name: "React", level: 90 },
        { name: "Next.js", level: 85 },
        { name: "Tailwind CSS", level: 95 },
        { name: "TypeScript", level: 80 },
      ],
    },
    {
      category: "Educational Skills",
      skills: [
        { name: "Curriculum Design", level: 90 },
        { name: "Child Development", level: 85 },
        { name: "Interactive Learning", level: 88 },
        { name: "Content Creation", level: 82 },
      ],
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
            <h1 className="text-5xl md:text-6xl font-bold text-[#1E293B]">My Skills</h1>
            <p className="text-lg text-[#64748B] max-w-2xl mx-auto">
              A comprehensive overview of my technical expertise and professional capabilities.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Skills Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {skillCategories.map((category, categoryIndex) => (
              <motion.div
                key={category.category}
                initial={{ opacity: 0, x: categoryIndex % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: categoryIndex * 0.1 }}
                className="space-y-6"
              >
                <div>
                  <h2 className="text-2xl font-bold text-[#1E293B] mb-2">{category.category}</h2>
                  <div className="h-1 w-16 bg-gradient-to-r from-[#1E90FF] to-[#00BFFF] rounded-full"></div>
                </div>

                <div className="space-y-4">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: categoryIndex * 0.1 + skillIndex * 0.05 }}
                      className="space-y-2"
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-semibold text-[#1E293B]">{skill.name}</span>
                        <span className="text-sm font-bold text-[#1E90FF]">{skill.level}%</span>
                      </div>
                      <div className="w-full bg-[#F1F5F9] rounded-full h-3 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          transition={{ delay: categoryIndex * 0.1 + skillIndex * 0.05 + 0.2, duration: 0.8 }}
                          className="h-full bg-gradient-to-r from-[#1E90FF] to-[#00BFFF] rounded-full"
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Skills Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white relative z-10">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center space-y-8"
          >
            <h2 className="text-3xl font-bold text-[#1E293B]">Other Competencies</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { title: "Communication", description: "Clear and effective communication skills" },
                { title: "Problem Solving", description: "Creative solutions to complex challenges" },
                { title: "Team Collaboration", description: "Working effectively in team environments" },
                { title: "Project Management", description: "Organizing and managing projects efficiently" },
                { title: "Adaptability", description: "Quick learner and adaptable to new technologies" },
                { title: "Leadership", description: "Guiding and mentoring team members" },
              ].map((competency, index) => (
                <motion.div
                  key={competency.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, y: -2 }}
                  className="p-6 rounded-2xl bg-gradient-to-br from-[#1E90FF]/10 to-[#00BFFF]/10 border-2 border-[#1E90FF]/20 hover:border-[#1E90FF]/50 transition-all duration-300 hover:shadow-xl"
                >
                  <h3 className="font-bold text-lg text-[#1E293B] mb-2">{competency.title}</h3>
                  <p className="text-[#64748B] text-sm">{competency.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}