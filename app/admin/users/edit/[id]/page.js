'use client'
import { useEffect, useRef, useState } from 'react';
import Swal from 'sweetalert2';
import { useParams, useRouter } from 'next/navigation';
import './edit.css';

export default function Page() {
  const router = useRouter();
  const params = useParams();
  const id = params.id;

  // Form state
  const [firstname, setFirstname] = useState(''); // prefix (นาย/นาง/นางสาว)
  const [fullname, setFullname] = useState('');
  const [lastname, setLastname] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [items, setItems] = useState([]);
  const [showPassword, setShowPassword] = useState(false);

  // UI refs for effects
  const cardRef = useRef(null);
  const cursorRef = useRef(null);

  // Fetch user information
  useEffect(() => {
    async function getUsers() {
      try {
        const res = await fetch(`https://backend-nextjs-virid.vercel.app/api/users/${id}`);
        if (!res.ok) {
          console.error('Failed to fetch data');
          return;
        }
        const data = await res.json();
        setItems(data || []);

        // Initialize form state from API
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
      }
    }

    getUsers();
  }, [id]);

  // Cursor glow follow + card tilt interactions
  useEffect(() => {
    const cursor = cursorRef.current;
    const card = cardRef.current;
    if (!cursor || !card) return;

    const onMouseMove = (e) => {
      const x = e.clientX - 120; // center glow (240px)
      const y = e.clientY - 120;
      cursor.style.opacity = '1';
      cursor.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    };

    const onMouseLeaveWindow = () => {
      cursor.style.opacity = '0';
      cursor.style.transform = 'translate3d(-9999px, -9999px, 0)';
    };

    const onCardMove = (e) => {
      const rect = card.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / (rect.width / 2); // -1..1
      const dy = (e.clientY - cy) / (rect.height / 2); // -1..1
      const max = 8; // degrees
      const tiltX = (-dy * max).toFixed(2);
      const tiltY = (dx * max).toFixed(2);
      card.style.setProperty('--tiltX', `${tiltX}deg`);
      card.style.setProperty('--tiltY', `${tiltY}deg`);
      card.style.setProperty('--tiltZ', '0');
    };

    const onCardLeave = () => {
      card.style.setProperty('--tiltX', '0deg');
      card.style.setProperty('--tiltY', '0deg');
      card.style.setProperty('--tiltZ', '0');
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseleave', onMouseLeaveWindow);
    card.addEventListener('mousemove', onCardMove);
    card.addEventListener('mouseleave', onCardLeave);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseleave', onMouseLeaveWindow);
      card.removeEventListener('mousemove', onCardMove);
      card.removeEventListener('mouseleave', onCardLeave);
    };
  }, []);

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('https://backend-nextjs-virid.vercel.app/api/users', {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          // 'Content-Type': 'application/json', // keep as original API behavior
        },
        body: JSON.stringify({ id, firstname, fullname, lastname, username, password }),
      });
      const result = await res.json();
      console.log(result);
      if (res.ok) {
        Swal.fire({
          icon: 'success',
          title: '<h3>ปรับปรุงข้อมูลเรียบร้อยแล้ว</h3>',
          showConfirmButton: false,
          timer: 2000,
        }).then(function () {
          router.push('/admin/users');
        });
        setFirstname('');
        setFullname('');
        setLastname('');
        setUsername('');
        setPassword('');
      } else {
        Swal.fire({
          title: 'Error!',
          text: 'เกิดข้อผิดพลาด!',
          icon: 'error',
          confirmButtonText: 'ตกลง',
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'ข้อผิดพลาดเครือข่าย',
        text: 'ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้',
      });
    }
  };

  const loaded = items && items.length > 0;

  return (
    <div className="edit-wrapper">
      {/* Back button chip */}
      <button
        className="back-btn"
        type="button"
        onClick={() => router.push('/admin/users')}
        aria-label="ย้อนกลับ"
      >
        <span className="back-arrow">←</span> กลับไปหน้ารายชื่อ
      </button>

      {/* Cursor glow layer */}
      <div ref={cursorRef} className="cursor-glow" aria-hidden="true" />

      {/* Glass card */}
      <div ref={cardRef} className="edit-card">
        <div className="edit-card-header">
          <div className="edit-badge">✦</div>
          <h1 className="edit-title">แก้ไขข้อมูลสมัครสมาชิก #{id}</h1>
          <div className="subtitle">ธีม ชมพู • ดำ • ทอง แบบทันสมัย</div>
        </div>

        <form onSubmit={handleUpdateSubmit} className="edit-form">
          <section className="form-section">
            <h3>ข้อมูลทั่วไป</h3>

            <label>
              คำนำหน้า
              <div className="input-wrap">
                <span className="input-icon">👤</span>
                <select
                  className="input has-icon"
                  name="firstname"
                  value={firstname}
                  onChange={(e) => setFirstname(e.target.value)}
                  required
                >
                  <option value="" disabled>
                    เลือกคำนำหน้า
                  </option>
                  <option value="นาย">นาย</option>
                  <option value="นาง">นาง</option>
                  <option value="นางสาว">นางสาว</option>
                </select>
              </div>
            </label>

            <label>
              ชื่อ
              <input
                className="input"
                type="text"
                placeholder="ชื่อ"
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
                required
              />
              <div className="helper">กรอกชื่อจริงของผู้ใช้</div>
            </label>

            <label>
              นามสกุล
              <input
                className="input"
                type="text"
                placeholder="นามสกุล"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
                required
              />
            </label>
          </section>

          <section className="form-section">
            <h3>ข้อมูลเข้าสู่ระบบ</h3>

            <label>
              Username
              <div className="input-wrap">
                <span className="input-icon">@</span>
                <input
                  className="input has-icon"
                  type="text"
                  placeholder="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
            </label>

            <label className="password-wrap">
              Password
              <input
                className="input"
                type={showPassword ? 'text' : 'password'}
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="toggle-visibility"
                onClick={() => setShowPassword((s) => !s)}
                aria-label={showPassword ? 'ซ่อนรหัสผ่าน' : 'แสดงรหัสผ่าน'}
              >
                {showPassword ? 'ซ่อน' : 'แสดง'}
              </button>
            </label>
          </section>

          <button type="submit" className="btn-submit" disabled={!loaded}>
            ปรับปรุงข้อมูล
          </button>
        </form>
      </div>
    </div>
  );
}
