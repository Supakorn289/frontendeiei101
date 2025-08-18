'use client'
import Link from "next/link";
import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import './navbar.css';

export default function Navbar() {
  const router = useRouter()
  const navRef = useRef(null)
  const glowRef = useRef(null)

  const [elevated, setElevated] = useState(false)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [glow, setGlow] = useState({ x: -9999, y: -9999, visible: false })

  useEffect(() => {
    const onScroll = () => setElevated(window.scrollY > 8)
    window.addEventListener('scroll', onScroll)
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleMouseMove = (e) => {
    const nav = navRef.current
    if (!nav) return
    const rect = nav.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const dx = e.clientX - cx
    const dy = e.clientY - cy
    const nx = Math.max(-1, Math.min(1, dx / (rect.width / 2)))
    const ny = Math.max(-1, Math.min(1, dy / (rect.height / 2)))

    setTilt({ x: (-ny * 2), y: (nx * 2) })

    const localX = e.clientX - rect.left - 120
    const localY = e.clientY - rect.top - 120
    setGlow({ x: localX, y: localY, visible: true })
  }
  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 })
    setGlow((g) => ({ ...g, visible: false }))
  }

  const navStyle = {
    position: 'relative',
    transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
    transformStyle: 'preserve-3d',
    transition: 'transform .25s ease, box-shadow .25s ease',
    boxShadow: elevated
      ? '0 10px 28px rgba(40, 7, 22, 0.45)'
      : undefined,
  }

  const glowStyle = {
    position: 'absolute',
    width: '240px',
    height: '240px',
    borderRadius: '50%',
    left: 0,
    top: 0,
    pointerEvents: 'none',
    transform: `translate3d(${glow.x}px, ${glow.y}px, 0)`,
    opacity: glow.visible ? 1 : 0,
    transition: 'opacity .25s ease, transform .05s linear',
    background: 'radial-gradient(closest-side, rgba(255,111,181,0.38), rgba(255,194,230,0.30), transparent 70%)',
    mixBlendMode: 'screen',
    filter: 'blur(16px) saturate(1.05)',
    zIndex: 0,
  }

  return (
    <nav
      ref={navRef}
      className="navbar navbar-expand-lg neo-nav"
      style={navStyle}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div ref={glowRef} style={glowStyle} aria-hidden="true" />
      <div className="container-fluid position-relative" style={{ zIndex: 1 }}>
        {/* โลโก้และชื่อ + ปุ่มย้อนกลับ */}
        <div className="d-flex align-items-center gap-2">
          <button type="button" className="btn btn-back" onClick={() => router.back()}>
            <i className="bi bi-arrow-left"></i>
            <span className="d-none d-md-inline ms-1">Back</span>
          </button>
          <Link href="/" className="navbar-brand d-flex align-items-center gap-2">
            <img src="IT.png" alt="Logo" width={30} height={24} className="d-inline-block align-text-top" />
            เทคโนโลยีสารสนเทศ
          </Link>
        </div>

        {/* ปุ่ม toggle บน mobile */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        {/* เมนูหลัก */}
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" aria-current="page" href="/">
                หน้าแรก
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href="/about">
                เกี่ยวกับเรา
              </Link>
            </li>
            <li className="nav-item dropdown">
              <Link
                className="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                บริการของเรา
              </Link>
              <ul className="dropdown-menu">
                <li>
                  <Link className="dropdown-item" href="https://getbootstrap.com/">
                    Bootstrap
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" href="https://github.com/">
                    Github
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" href="https://vercel.com/">
                    Vercel
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" href="https://www.figma.com/">
                    Figma
                  </Link>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <Link className="dropdown-item" href="#">
                    Something else here
                  </Link>
                </li>
              </ul>
            </li>
            <li className="nav-item">
              <Link href="/contact" className="nav-link">
                ติดต่อเรา
              </Link>
            </li>
          </ul>

          {/* Search Bar */}
          <form className="d-flex" role="search">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button className="btn btn-outline-warning" type="submit">
              Search
            </button>
          </form>

          {/* ปุ่ม Login / Signup */}
          <div className="login-signup-group">
            <Link href="/Login" className="btn btn-primary btn-login-signup">
              เข้าสู่ระบบ
            </Link>
            <Link href="/Signup" className="btn btn-primary btn-login-signup">
              สมัครสมาชิก
            </Link>
            <Link href="/admin/users" className="btn btn-primary btn-login-signup">
              Admin
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
