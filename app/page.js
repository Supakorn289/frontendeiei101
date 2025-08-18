'use client'
import { useEffect, useRef } from 'react'
import Carousel from "./components/Carousel";
import Card from "./components/Card";


export default function Home() {
  const heroRef = useRef(null)
  const glowRef = useRef(null)

  useEffect(() => {
    const hero = heroRef.current
    const glow = glowRef.current
    if (!hero || !glow) return
    const onMove = (e) => {
      const rect = hero.getBoundingClientRect()
      const x = e.clientX - rect.left - 140
      const y = e.clientY - rect.top - 140
      glow.style.transform = `translate3d(${x}px, ${y}px, 0)`
      glow.style.opacity = 1
    }
    const onLeave = () => { glow.style.opacity = 0 }
    hero.addEventListener('mousemove', onMove)
    hero.addEventListener('mouseleave', onLeave)
    return () => {
      hero.removeEventListener('mousemove', onMove)
      hero.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  useEffect(() => {
    const items = document.querySelectorAll('.reveal-up')
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-in')
          io.unobserve(entry.target)
        }
      })
    }, { threshold: 0.2 })
    items.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  return (
    <main className="home-root">
      <section ref={heroRef} className="home-hero">
        <div ref={glowRef} className="home-cursor-glow" aria-hidden="true" />
        <div className="hero-inner" ><center>
          <h1 className="hero-title">Home Page</h1>
          <div className="hero-subtitle">ยินดีต้อนรับ</div>
       </center> </div>
      </section>

      <div className="hero-frame reveal-up">
        <Carousel/>
      </div>

      <section className="home-section">
        <div className="section-title"></div>
        <div className="reveal-up">
          <Card/>
        </div>
      </section>
    </main>
  )
}
