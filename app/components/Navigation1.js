'use client'
import { motion } from 'framer-motion'
import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navItems = [
  { path: '/', name: 'หน้าแรก' },
  { path: '/about', name: 'เกี่ยวกับเรา' },
  { path: '/services', name: 'บริการของเรา' },
  { path: '/contact', name: 'ติดต่อเรา' },
]

export default function Navbar() {
  const pathname = usePathname() || '/'
  const [hovered, setHovered] = useState(pathname)

  return (
    <nav className="sticky top-0 bg-white/70 backdrop-blur-md z-50">
      <div className="container mx-auto px-4 flex items-center justify-between py-3">
        {/* โลโก้ */}
        <Link href="/" className="text-xl font-bold">
          <img src="/IT.png" alt="Logo" width={30} height={24} className="inline-block mr-2" />
          เทคโนโลยีสารสนเทศ
        </Link>
        {/* เมนู */}
        <div className="flex gap-6 relative">
          {navItems.map(item => (
            <Link
              key={item.path}
              href={item.path}
              className={`relative px-2 py-1 ${
                pathname === item.path ? 'text-black font-semibold' : 'text-gray-600'
              }`}
              onMouseEnter={() => setHovered(item.path)}
              onMouseLeave={() => setHovered(pathname)}
            >
              {item.name}
              {hovered === item.path && (
                <motion.div
                  layoutId="hoverBg"
                  className="absolute inset-0 bg-gray-200 rounded"
                  transition={{ type: 'spring', bounce: 0.2, stiffness: 120, damping: 9 }}
                />
              )}
            </Link>
          ))}
        </div>
        {/* Search + buttons */}
        {/* ใส่ form และลิงก์ login/signup */}
      </div>
    </nav>
  )
}
