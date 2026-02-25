"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { ArrowRight, Loader2, Github, ExternalLink, Code } from "lucide-react"
import ParticlesBackground from "@/components/particles-background"
import Link from "next/link"
import Image from "next/image"

// تعريف شكل المشروع من الباك اند
interface Project {
  _id: string;
  title: string;
  description: string;
  image: string;
  techStack: string[];
  githubLink?: string;
  liveLink?: string;
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch("https://portfolioapi-flame.vercel.app/project");
        const data = await res.json();
        // الباك اند بتاعك بيرجع المشاريع في data.data.message
        // setProjects(data.data || []);
        const fetchedProjects = data.data?.projects || data.data || [];
setProjects(Array.isArray(fetchedProjects) ? fetchedProjects : []);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

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

      {/* Header Section */}
      <section className="relative pt-32 pb-12 px-4 sm:px-6 lg:px-8 z-10">
        <div className="max-w-6xl mx-auto text-center space-y-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold">
              Featured <span className="gradient-text">Work</span>
            </h1>
            <p className="text-lg text-[#9CA3AF] max-w-2xl mx-auto mt-4">
              A collection of educational tools and web applications designed to make an impact.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.length > 0 ? (
              projects.map((project, index) => (
                <motion.div
                  key={project._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="group relative bg-[#161B22] rounded-2xl overflow-hidden border border-[#30363D] hover:border-[#00BFFF]/50 transition-all duration-500 flex flex-col"
                >
                  {/* Image Container */}
                  <div className="relative h-48 w-full overflow-hidden">
                    <Image
                      src={project.image || "/project-placeholder.png"}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#161B22] to-transparent opacity-60" />
                  </div>

                  {/* Content */}
                  <div className="p-6 space-y-4 flex-grow flex flex-col">
                    <h3 className="text-xl font-bold text-white group-hover:text-[#00BFFF] transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-[#9CA3AF] text-sm leading-relaxed line-clamp-3">
                      {project.description}
                    </p>

                    {/* Tech Stack Tags */}
                    <div className="flex flex-wrap gap-2 pt-2">
                      {project.techStack.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider bg-[#00BFFF]/10 text-[#00BFFF] rounded border border-[#00BFFF]/20"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Links */}
                    <div className="flex items-center gap-4 pt-6 mt-auto">
                      {project.githubLink && (
                        <a 
                          href={project.githubLink} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-[#9CA3AF] hover:text-white transition-colors"
                          title="GitHub Repository"
                        >
                          <Github size={20} />
                        </a>
                      )}
{project.liveLink ? (
  <a 
    href={project.liveLink} 
    target="_blank" 
    rel="noopener noreferrer" 
    className="ml-auto"
  >
    <motion.div 
      whileHover={{ x: 5 }}
      className="flex items-center gap-1 text-xs font-bold text-[#00BFFF] cursor-pointer"
    >
      View Live <ExternalLink size={14} />
    </motion.div>
  </a>
) : (
  <span className="ml-auto text-xs text-[#6B7280] italic">
    Coming Soon
  </span>
)}
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full text-center py-20 bg-[#161B22] rounded-2xl border border-dashed border-[#30363D]">
                <Code className="mx-auto text-[#6B7280] mb-4" size={48} />
                <p className="text-[#9CA3AF]">No projects found. Add some from your dashboard!</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center bg-gradient-to-r from-[#161B22] to-[#0D1117] p-12 rounded-3xl border border-[#30363D] shadow-2xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="space-y-6"
          >
            <h2 className="text-3xl md:text-4xl font-bold">Have a Project in Mind?</h2>
            <p className="text-[#9CA3AF] max-w-xl mx-auto">
              I'm always open to discussing new projects, educational tools, or partnerships in early childhood tech.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#00BFFF] to-[#3B82F6] text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-[#00BFFF]/30 transition-all hover:scale-105"
            >
              Start a Conversation
              <ArrowRight size={20} />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}