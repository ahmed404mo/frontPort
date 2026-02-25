"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MessageSquare, Trash2, Mail, User, Calendar, Loader2, Inbox, Reply, AlertTriangle, X } from "lucide-react"

interface Message {
  _id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
}

export default function MessagesPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(true)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  
  // 🚨 State الجديدة للمودال
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [selectedMsgId, setSelectedMsgId] = useState<string | null>(null)

  const fetchMessages = async () => {
    try {
      const token = localStorage.getItem("token")
      const res = await fetch("https://portfolioapi-flame.vercel.app/message", {
        headers: { "Authorization": `Bearer ${token}` }
      })
      const result = await res.json()
      const fetchedData = result?.data?.messages || result?.data?.message || result?.data || [];
      setMessages(Array.isArray(fetchedData) ? fetchedData : []);
    } catch (error) {
      console.error("Error fetching messages:", error)
      setMessages([]); 
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchMessages() }, [])

  // 🗑️ دالة الحذف الفعلية بعد التأكيد
  const confirmDelete = async () => {
    if (!selectedMsgId) return
    
    setDeletingId(selectedMsgId)
    setShowDeleteModal(false) // نقفل المودال فوراً
    
    try {
      const token = localStorage.getItem("token")
      const res = await fetch(`https://portfolioapi-flame.vercel.app/message/${selectedMsgId}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` }
      })

      if (res.ok) {
        setMessages(messages.filter(msg => msg._id !== selectedMsgId))
      }
    } catch (error) {
      console.error("Delete error:", error)
    } finally {
      setDeletingId(null)
      setSelectedMsgId(null)
    }
  }

  // دالة فتح المودال
  const openDeleteModal = (id: string) => {
    setSelectedMsgId(id)
    setShowDeleteModal(true)
  }

  const handleReply = (email: string, name: string) => {
    const subject = encodeURIComponent(`Regarding your message on Ahmed's Portfolio`);
    const body = encodeURIComponent(`Hi ${name},\n\n`);
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
  }

  if (loading) {
    return (
      <div className="flex-1 h-[80vh] flex items-center justify-center">
        <Loader2 className="text-[#00BFFF] animate-spin" size={40} />
      </div>
    )
  }

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8 relative">
      
      {/* 🚨 Delete Confirmation Modal (Popup) */}
      <AnimatePresence>
        {showDeleteModal && (
          <>
            {/* Backdrop Layer */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowDeleteModal(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
            />
            
            {/* Modal Content */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-[#161B22] border border-[#30363D] rounded-2xl p-6 z-[101] shadow-2xl"
            >
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center text-red-500">
                  <AlertTriangle size={32} />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-white">Confirm Deletion</h3>
                  <p className="text-[#9CA3AF]">Are you sure you want to delete this message? This action cannot be undone.</p>
                </div>
                <div className="flex w-full gap-3 pt-4">
                  <button 
                    onClick={() => setShowDeleteModal(false)}
                    className="flex-1 px-4 py-3 bg-[#30363D] text-white font-semibold rounded-xl hover:bg-[#3b424b] transition-all"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={confirmDelete}
                    className="flex-1 px-4 py-3 bg-red-500 text-white font-semibold rounded-xl hover:bg-red-600 transition-all shadow-lg shadow-red-500/20"
                  >
                    Yes, Delete
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
          <MessageSquare className="text-[#00BFFF]" /> Inbound Messages
        </h1>
        <p className="text-[#9CA3AF]">Manage and respond to messages from your portfolio visitors.</p>
      </motion.div>

      {messages.length === 0 ? (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-[#161B22] border border-[#30363D] rounded-2xl p-20 flex flex-col items-center justify-center text-center space-y-4">
          <div className="p-6 rounded-full bg-[#0D1117] text-[#6B7280]"><Inbox size={64} strokeWidth={1} /></div>
          <h2 className="text-xl font-semibold text-white">Your inbox is empty</h2>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          <AnimatePresence>
            {messages.map((msg) => (
              <motion.div
                key={msg._id} layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-[#161B22] border border-[#30363D] rounded-2xl overflow-hidden hover:border-[#00BFFF]/30 transition-all group"
              >
                <div className="p-6 space-y-4">
                  <div className="flex flex-wrap justify-between items-start gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-[#00BFFF]/10 rounded-full flex items-center justify-center text-[#00BFFF]"><User size={24} /></div>
                      <div>
                        <h3 className="text-lg font-bold text-white">{msg.name}</h3>
                        <div className="flex items-center gap-2 text-[#9CA3AF] text-sm"><Mail size={14} />{msg.email}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <button onClick={() => handleReply(msg.email, msg.name)} className="p-3 bg-[#00BFFF]/10 text-[#00BFFF] rounded-xl hover:bg-[#00BFFF] hover:text-white transition-all"><Reply size={20} /></button>
                      
                      {/* 🚨 التغيير هنا: بننادي على openDeleteModal */}
                      <button 
                        onClick={() => openDeleteModal(msg._id)} 
                        disabled={deletingId === msg._id}
                        className="p-3 bg-red-500/10 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all disabled:opacity-50"
                      >
                        {deletingId === msg._id ? <Loader2 className="animate-spin" size={20} /> : <Trash2 size={20} />}
                      </button>
                    </div>
                  </div>
                  <div className="bg-[#0D1117] p-4 rounded-xl border border-[#30363D] text-[#9CA3AF] leading-relaxed italic">"{msg.message}"</div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  )
}