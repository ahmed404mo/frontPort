"use client"

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { ProgrammingLanguages } from "@/components/animated-elements"
// --- 1. ضيف السطر ده ---
import Link from "next/link" 

export default function ProjectsPage() {
  const projects = [
    {
      id: 1,
      title: "Week 1",
      description: "Introduction and basic setup for the project.",
      tags: ["HTML", "CSS"],
      hoverColor: "group-hover:from-[#FEE440]/40 group-hover:to-[#FFD60A]/40",
    },
    {
      id: 2,
      title: "Week 2",
      description: "Adding interactivity and animations.",
      tags: ["JavaScript", "Framer Motion"],
      hoverColor: "group-hover:from-[#00BBF9]/40 group-hover:to-[#00F5D4]/40",
    },
    {
      id: 3,
      title: "Week 3",
      description: "Working with APIs and dynamic content.",
      tags: ["React", "API"],
      hoverColor: "group-hover:from-[#9B5DE5]/40 group-hover:to-[#F15BB5]/40",
    },
    {
      id: 4,
      title: "Week 4",
      description: "Final touches and deployment.",
      tags: ["Next.js", "Deployment"],
      hoverColor: "group-hover:from-[#00F5D4]/40 group-hover:to-[#00BBF9]/40",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-[#F8F9FA] to-white relative overflow-hidden">
      <ProgrammingLanguages />

      {/* Header Section (زي ما هو) */}
      <section className="relative pt-20 pb-12 px-4 sm:px-6 lg:px-8 z-10">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center space-y-4"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-[#2D3748]">Weekly Projects</h1>
            <p className="text-lg text-[#556B7F] max-w-2xl mx-auto">
              Explore weekly progress and milestones achieved throughout the month.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 bg-gradient-to-br ${project.hoverColor}`}
              >
                {/* Project Content */}
                <div className="p-8 space-y-4">
                  <h3 className="text-2xl font-bold text-[#2D3748]">{project.title}</h3>
                  <p className="text-[#556B7F] text-sm leading-relaxed">{project.description}</p>

                  {/* Tags (زي ما هو) */}
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 text-xs font-semibold bg-[#00BBF9]/10 text-[#00BBF9] rounded-full border border-[#00BBF9]/20"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* --- 2. عدّل الزرار هنا --- */}
                  <Link href={`/projects/${project.id}`} passHref>
                    <motion.button
                      whileHover={{ x: 5 }}
                      className="inline-flex items-center gap-2 text-[#00BBF9] font-semibold hover:text-[#9B5DE5] transition-colors mt-4"
                    >
                      View Details
                      <ArrowRight size={16} />
                    </motion.button>
                  </Link>
                  {/* --- نهاية التعديل --- */}
                  
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section (زي ما هو) */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-[#2D3748]">Ready for the Next Step?</h2>
            <p className="text-lg text-[#556B7F] leading-relaxed">
              Let's continue building, learning, and creating something extraordinary together.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#9B5DE5] to-[#00F5D4] text-white font-semibold rounded-full hover:shadow-lg transition-all hover:scale-105"
            >
              Start a Project
              <ArrowRight size={20} />
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  )
}