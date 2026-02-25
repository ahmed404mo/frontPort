import type React from "react"
import { Inter } from "next/font/google"
import "./globals.css"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Ahmed | Full-stack Developer",
  description: "Crafting modern web applications and creative digital solutions",
  openGraph: {
    title: "Ahmed | Full-stack Developer",
    description: "Crafting modern web applications and creative digital solutions",
    type: "website",
  },
}
//   children,
// }: {
//   children: React.ReactNode
// }) {
//   return (
//     <html lang="en">
//       <body className={`${inter.className} bg-[#0D1117] text-white antialiased`}>
//         <Navigation />
//         <main className="min-h-screen">{children}</main>
//         <Footer />
//       </body>
//     </html>
//   )
// }
// app/layout.tsx
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning> 
      <body className={`${inter.className} bg-[#0D1117] text-white antialiased`}>
        <Navigation />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  )
}