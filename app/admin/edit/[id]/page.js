'use client';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import './edit.css';

export default function EditUserPage() {
  const { id } = useParams();
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstname, setFirstname] = useState('');
  const [fullname, setFullname] = useState('');
  const [lastname, setLastname] = useState('');
  const [username, setUsername] = useState('');
  const [gender, setGender] = useState('');
  const [birthday, setBirthday] = useState('');
  const [birthmonth, setBirthmonth] = useState('');
  const [yearmonth, setYearmonth] = useState('');

  useEffect(() => {
    async function fetchUser() {
      const res = await fetch(`http://itdev.cmtc.ac.th:3000/api/users/${id}`);
      const data = await res.json();

      setEmail(data.email || '');
      setPassword(data.password || '');
      setFirstname(data.firstname || '');
      setFullname(data.fullname || '');
      setLastname(data.lastname || '');
      setUsername(data.username || '');
      setGender(data.sex || '');
      
      const bDate = data.birthday ? new Date(data.birthday) : null;
      if (bDate) {
        setBirthday(String(bDate.getDate()));
        setBirthmonth(String(bDate.getMonth() + 1)); // JS month = 0-11
        setYearmonth(String(bDate.getFullYear()));
      }
    }

    fetchUser();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fullBirthday = `${yearmonth}-${birthmonth.padStart(2, '0')}-${birthday.padStart(2, '0')}`;

    const updatedUser = {
      email,
      password,
      firstname,
      fullname,
      lastname,
      username,
      sex: gender,
      birthday: fullBirthday
    };

    const res = await fetch(`http://itdev.cmtc.ac.th:3000/api/users/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedUser),
    });

    if (res.ok) {
      alert('User updated successfully!');
      router.push('/admin/users');
    } else {
      alert('Failed to update user');
    }
  };

  return (
    <form className="signup-form" onSubmit={handleSubmit}>
      <h1 className="signup-title">Edit User</h1>

      <div className="form-group">
        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
        <input type="email" className="form-control" id="exampleInputEmail1" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </div>

      <div className="form-group">
        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
        <input type="password" className="form-control" id="exampleInputPassword1" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </div>

      <div className="form-row">
        <div className="form-col">
          <label htmlFor="prefix" className="form-label">คำนำหน้า</label>
          <select className="form-select" id="prefix" value={firstname} onChange={(e) => setFirstname(e.target.value)} required>
            <option disabled value=""></option>
            <option>เด็กชาย</option>
            <option>เด็กหญิง</option>
            <option>นาย</option>
            <option>นางสาว</option>
            <option>นาง</option>
            <option>ไม่ระบุ</option>
          </select>
        </div>

        <div className="form-col-large">
          <label htmlFor="firstName" className="form-label">Full name</label>
          <input type="text" className="form-control" id="fullname" value={fullname} onChange={(e) => setFullname(e.target.value)} required />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="lastName" className="form-label">Last name</label>
        <input type="text" className="form-control" id="lastName" value={lastname} onChange={(e) => setLastname(e.target.value)} required />
      </div>

      <div className="form-group">
        <label htmlFor="userName" className="form-label">User name</label>
        <input type="text" className="form-control" id="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
      </div>

      <div className="form-row">
        <div className="form-col-large">
          <label htmlFor="gender" className="form-label">เพศ</label>
          <select className="form-select" id="gender" value={gender} onChange={(e) => setGender(e.target.value)} required>
            <option disabled value=""></option>
            <option>ชาย</option>
            <option>หญิง</option>
            <option>ไม่ระบุ</option>
          </select>
        </div>

        <div className="form-col">
          <label htmlFor="birthday" className="form-label">วันเกิด</label>
          <select className="form-select" id="birthday" value={birthday} onChange={(e) => setBirthday(e.target.value)} required>
            {[...Array(31)].map((_, i) => (
              <option key={i} value={i + 1}>{i + 1}</option>
            ))}
          </select>
        </div>

        <div className="form-col">
          <label htmlFor="birthmonth" className="form-label">เดือนเกิด</label>
          <select className="form-select" id="birthmonth" value={birthmonth} onChange={(e) => setBirthmonth(e.target.value)} required>
            {[...Array(12)].map((_, i) => (
              <option key={i} value={i + 1}>{i + 1}</option>
            ))}
          </select>
        </div>

        <div className="form-col">
          <label htmlFor="yearmonth" className="form-label">ปีเกิด</label>
          <select className="form-select" id="yearmonth" value={yearmonth} onChange={(e) => setYearmonth(e.target.value)} required>
            {[...Array(2025 - 1940 + 1)].map((_, i) => (
              <option key={i} value={1940 + i}>{1940 + i}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="form-submit">
        <button type="submit" className="btn-submit">Save Changes</button>
      </div>
    </form>
  );
}
