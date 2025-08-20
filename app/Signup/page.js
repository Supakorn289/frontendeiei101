'use client'

import { useState } from 'react'
import Swal from 'sweetalert2'
import './signup.css';
import { useRouter } from 'next/navigation'

export default function Signup() {
  const router = useRouter()

  const [email, setEmail] = useState('')
  const [firstname, setFirstname] = useState('')
  const [fullname, setFullname] = useState('')
  const [lastname, setLastname] = useState('')
  const [gender, setGender] = useState('')
  const [birthday, setBirthday] = useState('')
  const [birthmonth, setBirthmonth] = useState('')
  const [yearmonth, setYearmonth] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
    const res = await fetch('https://backend-nextjs-virid.vercel.app/api/users', {
      method: 'POST',
      headers: {
        Accept : 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, firstname, fullname, lastname, gender, birthday, birthmonth, yearmonth, username, password }),
    })

    const result = await res.json();
    console.log(result);
    if (res.ok) {
      Swal.fire({
        icon: 'success',
        position: 'center',
        toast: false,
        title: '<h3>บันทึกข้อมูลเรียบร้อยแล้ว</h3>',
        showConfirmButton: false,
        timer: 2000
        }).then(function () {
        router.push('/Login');
      });
      setEmail('')
      setFirstname('')
      setFullname('')
      setLastname('')
      setGender('')
      setBirthday('')
      setBirthmonth('')
      setYearmonth('')
      setUsername('')
      setPassword('')
    } else {
      Swal.fire({
        title: 'Error!',
        text: 'เกิดข้อผิดพลาด!',
        icon: 'error',
        position: 'center',
        toast: false,
        confirmButtonText: 'ตกลง'
      })
    }
  } catch (error) {
    Swal.fire({
      icon: 'error',
      position: 'center',
      toast: false,
      title: 'ข้อผิดพลาดเครือข่าย',
      text: 'ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้',
    })
  }
  }
  return (
    
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h1 className="signup-title">SignUp Page</h1>

        <div className="form-group">
          <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
          <input type="email"  className="form-control" id="exampleInputEmail1" name="email" onChange={(e) => setEmail(e.target.value)} required />
        </div>

        <div className="form-group">
          <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
          <input type="password" className="form-control" id="exampleInputPassword1" name="password" onChange={(e) => setPassword(e.target.value)} required/>
        </div>

        <div className="form-row">
          <div className="form-col">
            <label htmlFor="prefix" className="form-label">คำนำหน้า</label>
            <select className="form-select" id="prefix" required name="firstname" onChange={(e) => setFirstname(e.target.value)} defaultValue="">
              <option value="" disabled></option>
              <option>เด็กชาย</option>
              <option>เด็กหญิง</option>
              <option>นาย</option>
              <option>นางสาว</option>
              <option>นาง</option>
              <option>ไม่ระบุ</option>
            </select>
          </div>

          <div className="form-col-large">
            <label htmlFor="firstName" className="form-label">First name</label>
            <input type="text" className="form-control" id="fullname" name="fullname" onChange={(e) => setFullname(e.target.value)} required />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="lastName" className="form-label">Last name</label>
          <input type="text" className="form-control" id="lastName"  name="lastname" onChange={(e) => setLastname(e.target.value)} required />
        </div>
        
         <div className="form-group">
          <label htmlFor="userName" className="form-label">User name</label>
          <input type="text" className="form-control" id="username"  name="username" onChange={(e) => setUsername(e.target.value)} required />
        </div>

        <div className="form-row">
          <div className="form-col-large">
            <label htmlFor="gender" className="form-label">เพศ</label>
            <select className="form-select" id="gender" required name="gender" onChange={(e) => setGender(e.target.value)} defaultValue="">
              <option value="" disabled></option>
              <option>ชาย</option>
              <option>หญิง</option>
              <option>ไม่ระบุ</option>
            </select>
          </div>

          <div className="form-col">
            <label htmlFor="birthday" className="form-label">วันเกิด</label>
            <select className="form-select" id="birthday" name="birthday" onChange={(e) => setBirthday(e.target.value)} required defaultValue="">
              <option value="" disabled></option>
              {[...Array(31)].map((_, i) => (
                <option key={i} value={i + 1}>{i + 1}</option>
              ))}
            </select>
          </div>

          <div className="form-col">
            <label htmlFor="birthmonth" className="form-label">เดือนเกิด</label>
            <select className="form-select" id="birthmonth" required name="birthmonth" onChange={(e) => setBirthmonth(e.target.value)} defaultValue="">
              <option value="" disabled></option>
              {[...Array(12)].map((_, i) => (
                <option key={i} value={i + 1}>{i + 1}</option>
              ))}
            </select>
          </div>

          <div className="form-col">
            <label htmlFor="yearmonth" className="form-label">ปีเกิด</label>
            <select className="form-select" id="yearmonth" required name="yearmonth" onChange={(e) => setYearmonth(e.target.value)} defaultValue="">
              <option value="" disabled></option>
              {[...Array(2025 - 1940 + 1)].map((_, i) => (
                <option key={i} value={1940 + i}>{1940 + i}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-check">
          <input type="checkbox" className="form-check-input" id="exampleCheck1" />
          <label className="form-check-label" htmlFor="exampleCheck1">ยอมรับเงื่อนไขทั้งหมด</label>
        </div>

        <div className="form-submit">
          <button type="submit" className="btn-submit">Sign Up</button>
        </div>
      </form>
    </div>
  );
}
