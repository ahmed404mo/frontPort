"use client"

import React, { useState } from 'react'
import { weeksData } from '../../data/weeksData'
import { motion } from 'framer-motion'
import { ArrowRight, X, PlayCircle, Globe, FileText, Download } from 'lucide-react' 
import { ProgrammingLanguages } from "@/components/animated-elements"
import { useParams } from 'next/navigation'

/**
 * كومبوننت الـ Modal
 */
const ResourceModal = ({ resource, onClose, domain }) => {
  let content;
  let videoSrc = resource.href;

  switch (resource.type) {
    case 'video':
      // --- إصلاح لليوتيوب ---
      if (videoSrc.includes('youtube.com/watch?v=')) {
        videoSrc = videoSrc.replace('watch?v=', 'embed/');
      } else if (videoSrc.includes('youtu.be/')) {
        const videoId = videoSrc.split('youtu.be/')[1].split('?')[0];
        videoSrc = `https://www.youtube.com/embed/${videoId}`;
      } 
      // --- إصلاح لجوجل درايف (الفيديوهات من Drive) ---
      else if (videoSrc.includes('drive.google.com/file/d/')) {
        const fileId = videoSrc.split('/file/d/')[1].split('/')[0];
        videoSrc = `https://drive.google.com/file/d/${fileId}/preview`;
      }
      content = (
        <iframe
          src={videoSrc}
          title="Video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className='w-full h-full aspect-video'
          style={{ width: '100%', height: '100%' }}
        ></iframe>
      );
      break;
    
    case 'website':
      content = (
        <iframe
          src={resource.href}
          title={resource.title}
          className='w-full h-full bg-white'
          sandbox="allow-scripts allow-same-origin"
        ></iframe>
      );
      break;

    case 'powerpoint':
      const fullPowerpointUrl = `${domain}${resource.href}`;
      content = (
        <iframe
          src={`https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(fullPowerpointUrl)}`}
          title={resource.title}
          className='w-full h-full bg-white'
          frameBorder="0"
        ></iframe>
      );
      break;

    case 'pdf':
      content = (
        <iframe
          src={resource.href}
          title={resource.title}
          className='w-full h-full'
        ></iframe>
      );
      break;
    
    default:
      content = <p>Unknown resource type</p>;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose} 
      className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.7, opacity: 0 }}
        onClick={(e) => e.stopPropagation()} 
        className="relative w-full max-w-4xl h-[80vh] bg-white rounded-2xl overflow-hidden shadow-2xl"
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 p-2 bg-gray-700 text-white rounded-full hover:bg-gray-900 transition-colors"
        >
          <X size={20} />
        </button>
        {content}
      </motion.div>
    </motion.div>
  );
};


/**
 * الصفحة الأساسية
 */
export default function WeekPage() {
  const params = useParams()
  const id = Number(params.id)
  const week = weeksData[id]
  
  const [selectedResource, setSelectedResource] = useState(null)

  // 🔴 غيّر ده للينك بتاعك على جيت هاب
  const YOUR_WEBSITE_DOMAIN = "https://YOUR-USERNAME.github.io/YOUR-REPO";

  if (!week) {
    return (
      <div className='p-6 h-screen flex justify-center items-center flex-col'>
        <h1 className='text-6xl font-bold text-blue-400'>Page not found now</h1>
        <p className='mt-2 text-gray-600'>The content will be available <span className='text-blue-700 font-bold'>next week.</span></p>
      </div>
    )
  }

  // 3. --- عدلنا الكارت الرابع هنا ---
  const resources = [
    {
      id: "video",
      title: "Video Lesson",
      description: "Watch this week's video lesson.",
      type: "video",
      href: week.video, // من الداتا
      tags: ["Video", "Lesson"],
      hoverColor: "group-hover:from-[#00BBF9]/40 group-hover:to-[#00F5D4]/40",
      icon: <PlayCircle className="mb-4 text-[#00BBF9]" size={40} />
    },
    {
      id: "website",
      title: "Interactive Activity",
      description: "Try the interactive website exercise.",
      type: "website",
      href: week.website, // من الداتا
      tags: ["Game", "HTML5"],
      hoverColor: "group-hover:from-[#9B5DE5]/40 group-hover:to-[#F15BB5]/40",
      icon: <Globe className="mb-4 text-[#9B5DE5]" size={40} />
    },
    {
      id: "powerpoint",
      title: "Presentation",
      description: "Review the PowerPoint slides.",
      type: "powerpoint",
      href: week.powerpoint, // من الداتا
      tags: ["Slides", "Review"],
      hoverColor: "group-hover:from-[#FEE440]/40 group-hover:to-[#FFD60A]/40",
      icon: <FileText className="mb-4 text-[#FFD60A]" size={40} />
    },
    {
      // --- ده الكارت الجديد ---
      id: "pdf",
      title: "Lesson Plan",
      description: "View or download the lesson plan.",
      type: "pdf",
      href: week.pdf, // <-- هيقرأ من الداتا
      tags: ["PDF", "Preparation"],
      hoverColor: "group-hover:from-red-500/20 group-hover:to-orange-500/20", // لون جديد
      icon: <Download className="mb-4 text-red-500" size={40} /> // أيقونة جديدة
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-[#F8F9FA] to-white relative overflow-hidden">
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
            <h1 className="text-5xl md:text-6xl font-bold text-[#2D3748]">{week.title}</h1>
            <p className="text-lg text-[#556B7F] max-w-2xl mx-auto">
              {week.description}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Resources Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {resources.map((resource, index) => (
              <motion.div
                key={resource.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 bg-gradient-to-br ${resource.hoverColor}`}
              >
                <div className="p-8 space-y-4">
                  {resource.icon}
                  <h3 className="text-2xl font-bold text-[#2D3748]">{resource.title}</h3>
                  <p className="text-[#556B7F] text-sm leading-relaxed">{resource.description}</p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {resource.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 text-xs font-semibold bg-[#00BBF9]/10 text-[#00BBF9] rounded-full border border-[#00BBF9]/20"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* الزرار بيفتح الـ Modal */}
                  <motion.button
                    onClick={() => setSelectedResource(resource)}
                    whileHover={{ x: 5 }}
                    className="inline-flex items-center gap-2 text-[#00BBF9] font-semibold hover:text-[#9B5DE5] transition-colors mt-4"
                  >
                    Open
                    <ArrowRight size={16} />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* الـ Modal */}
      {selectedResource && (
        <ResourceModal 
          resource={selectedResource} 
          onClose={() => setSelectedResource(null)}
          domain={YOUR_WEBSITE_DOMAIN} 
        />
      )}
    </div>
  )
}