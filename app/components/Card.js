'use client'
import { useEffect, useRef } from 'react'
import './card.css'

export default function Card() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    // Reveal on scroll
    const revealEls = Array.from(section.querySelectorAll('.reveal'))
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in-view')
            io.unobserve(e.target)
          }
        })
      },
      { threshold: 0.18 }
    )
    revealEls.forEach((el) => io.observe(el))

    // Subtle tilt + shine on mouse move
    const cards = Array.from(section.querySelectorAll('.neo-card'))
    const onMove = (ev) => {
      const card = ev.currentTarget
      const rect = card.getBoundingClientRect()
      const x = ev.clientX - rect.left
      const y = ev.clientY - rect.top
      const rx = ((y / rect.height) - 0.5) * -6 // rotateX
      const ry = ((x / rect.width) - 0.5) * 6  // rotateY
      card.style.setProperty('--rx', `${rx}deg`)
      card.style.setProperty('--ry', `${ry}deg`)
      card.style.setProperty('--mx', `${x}px`)
      card.style.setProperty('--my', `${y}px`)
      card.classList.add('hovering')
    }
    const onLeave = (ev) => {
      const card = ev.currentTarget
      card.style.setProperty('--rx', '0deg')
      card.style.setProperty('--ry', '0deg')
      card.classList.remove('hovering')
    }
    cards.forEach((c) => {
      c.addEventListener('mousemove', onMove)
      c.addEventListener('mouseleave', onLeave)
    })

    return () => {
      io.disconnect()
      cards.forEach((c) => {
        c.removeEventListener('mousemove', onMove)
        c.removeEventListener('mouseleave', onLeave)
      })
    }
  }, [])

  return (
    <div ref={sectionRef} className="container-fluid team-section">
      <div className="row">
        <div className="col-md-12 text-center mb-2"></div>
        <div className="col-md-12 text-center mb-4">
          <h3 className="team-title">บุคลากร</h3>
          <div className="title-underline" />
        </div>
      </div>

      <div className="row g-3 g-md-4">
        <div className="col-md-4">
          <div className="neo-card reveal">
            <div className="shine" />
            <div className="portrait">
              <img src="https://it.cmtc.ac.th/wp-content/uploads/2025/05/Thapanan1.png" alt="อาจารย์ฐาปนันท์ ปัญญามี" />
            </div>
            <div className="text-center">
              <p className="name"><span className="accent">อาจารย์</span>ฐาปนันท์ ปัญญามี</p>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="neo-card reveal">
            <div className="shine" />
            <div className="portrait">
              <img src="https://it.cmtc.ac.th/wp-content/uploads/2025/05/Anuchat2.png" alt="อาจารย์อนุชาติ รังสิยานนท์" />
            </div>
            <div className="text-center">
              <p className="name"><span className="accent">อาจารย์</span>อนุชาติ รังสิยานนท์</p>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="neo-card reveal">
            <div className="shine" />
            <div className="portrait">
              <img src="https://it.cmtc.ac.th/wp-content/uploads/2025/05/Tharit3.png" alt="อาจารย์ธฤต ไชยมงคล" />
            </div>
            <div className="text-center">
              <p className="name"><span className="accent">อาจารย์</span>ธฤต ไชยมงคล</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}