'use client'
import { useEffect, useRef, useState } from 'react';
import Swal from 'sweetalert2'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import './edit.css'

export default function Page() {
  const router = useRouter()
  const params = useParams();
  const id = params.id;

  const [loading, setLoading] = useState(true)
  const [firstname, setFirstname] = useState('') // คำนำหน้า
  const [fullname, setFullname] = useState('') // ชื่อ
  const [lastname, setLastname] = useState('') // นามสกุล
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  // Refs for interactive effects
  const wrapperRef = useRef(null)
  const cardRef = useRef(null)
  const glowRef = useRef(null)

  useEffect(() => {
    // เพิ่มคลาสให้ body เฉพาะหน้านี้
    document.body.classList.add('admin-edit-users')
    return () => document.body.classList.remove('admin-edit-users')
  }, [])

  useEffect(() => {
    async function getUsers() {
      try {
        const res = await fetch(`http://itdev.cmtc.ac.th:3000/api/users/${id}`);
        if (!res.ok) {
          console.error('Failed to fetch data');
          setLoading(false)
          return;
        }
        const data = await res.json();

        if (Array.isArray(data) && data.length > 0) {
          const user = data[0];
          setFirstname(user.firstname || '');
          setFullname(user.fullname || '');
          setLastname(user.lastname || '');
          setUsername(user.username || '');
          setPassword(user.password || '');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false)
      }
    }

    getUsers();
  }, [id]);

  // Mouse interactive: 3D tilt + cursor glow
  const handleMouseMove = (e) => {
    const wrapper = wrapperRef.current
    const card = cardRef.current
    const glow = glowRef.current
    if (!wrapper || !card || !glow) return

    const rect = card.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2

    const dx = e.clientX - cx
    const dy = e.clientY - cy

    // Normalize to [-1, 1]
    const nx = Math.max(-1, Math.min(1, dx / (rect.width / 2)))
    const ny = Math.max(-1, Math.min(1, dy / (rect.height / 2)))

    // Apply tilt via CSS variables (used by CSS for transform)
    const tiltX = (-ny * 6).toFixed(2) + 'deg'
    const tiltY = (nx * 6).toFixed(2) + 'deg'
    card.style.setProperty('--tiltX', tiltX)
    card.style.setProperty('--tiltY', tiltY)
    card.style.setProperty('--tiltZ', '2px')

    // Cursor glow follows pointer
    glow.style.transform = `translate3d(${e.clientX - 120}px, ${e.clientY - 120}px, 0)`
    glow.style.opacity = 1
  }

  const handleMouseLeave = () => {
    const card = cardRef.current
    const glow = glowRef.current
    if (card) {
      card.style.setProperty('--tiltX', '0deg')
      card.style.setProperty('--tiltY', '0deg')
      card.style.setProperty('--tiltZ', '0')
    }
    if (glow) {
      glow.style.opacity = 0
    }
  }

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://itdev.cmtc.ac.th:3000/api/users', {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
        },
        body: JSON.stringify({ id, firstname, fullname, lastname, username, password }),
      })
      const result = await res.json();
      console.log(result);
      if (res.ok) {
        Swal.fire({
          icon: 'success',
          title: '<h3>ปรับปรุงข้อม��ลเรียบร้อยแล้ว</h3>',
          showConfirmButton: false,
          timer: 2000
        }).then(function () {
          router.push('/register')
        });
      } else {
        Swal.fire({
          title: 'Error!',
          text: 'เกิดข้อผิดพลาด!',
          icon: 'error',
          confirmButtonText: 'ตกลง'
        })
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'ข้อผิดพลาดเครือข่าย',
        text: 'ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้',
      })
    }
  }

  return (
    <div
      ref={wrapperRef}
      className="edit-wrapper"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Cursor neon glow */}
      <div ref={glowRef} className="cursor-glow" aria-hidden="true" />

      {/* Back chip */}
      <Link href="/admin/users" className="back-btn" prefetch={false}>
        <span className="back-arrow">←</span> กลับไปหน้าผู้ใช้
      </Link>

      <div ref={cardRef} className="edit-card">
        <div className="edit-header">
          <div className="edit-badge"><i className="bi bi-person-gear"></i></div>
          <h2>แก้��ขข้อมูลสมาชิก</h2>
          <div className="subtitle">เลขรายการ: #{id}</div>
        </div>

        <form onSubmit={handleUpdateSubmit} className="edit-form">
          {loading ? (
            <div className="form-section"><div className="helper">กำลังโหลดข้อมูล...</div></div>
          ) : (
            <>
              <div className="form-section">
                <h3>ข้อมูลทั่วไป</h3>
                <label>
                  คำนำหน้า
                  <select
                    name="firstname"
                    value={firstname}
                    onChange={(e) => setFirstname(e.target.value)}
                    required
                  >
                    <option value="">เลือกคำนำหน้า</option>
                    <option value="นาย">นาย</option>
                    <option value="นาง">นาง</option>
                    <option value="นางสาว">นางสาว</option>
                  </select>
                </label>

                <label>
                  ชื่อ
                  <div className="input-wrap">
                    <i className="bi bi-person input-icon"></i>
                    <input
                      type="text"
                      className="input has-icon"
                      placeholder="ชื่อจริง"
                      value={fullname}
                      onChange={(e) => setFullname(e.target.value)}
                      required
                    />
                  </div>
                </label>

                <label>
                  นามสกุล
                  <div className="input-wrap">
                    <i className="bi bi-person-vcard input-icon"></i>
                    <input
                      type="text"
                      className="input has-icon"
                      placeholder="นามสกุล"
                      value={lastname}
                      onChange={(e) => setLastname(e.target.value)}
                      required
                    />
                  </div>
                </label>
              </div>

              <div className="form-section">
                <h3>บัญชีผู้ใช้</h3>
                <label>
                  ชื่อผู้ใช้ (Username)
                  <div className="input-wrap">
                    <i className="bi bi-at input-icon"></i>
                    <input
                      type="text"
                      className="input has-icon"
                      placeholder="username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                  </div>
                </label>

                <label>
                  รหัสผ่าน
                  <div className="input-wrap password-wrap">
                    <i className="bi bi-shield-lock input-icon"></i>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      className="input has-icon"
                      placeholder="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      className="toggle-visibility"
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword(v => !v)}
                    >
                      <i className={showPassword ? 'bi bi-eye-slash' : 'bi bi-eye'}></i>
                    </button>
                    <div className="helper">อย่างน้อย 8 ตัวอักษร ประกอบด้วย ตัวพิมพ์ใหญ่ ตัวเลข และอักขระพิเศษ</div>
                  </div>
                </label>
              </div>

              <button type="submit" className="btn-save">บันทึกการเปลี่ยนแปลง</button>
            </>
          )}
        </form>
      </div>
    </div>
  )
}
