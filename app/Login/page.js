'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Swal from 'sweetalert2'
import './login1.css'; // อย่าลืมนำเข้า CSS

export default function Login() {
    const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await fetch('https://backend-nextjs-virid.vercel.app/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });
    const data = await res.json();
    console.log(username);
    if (data.token) {
    localStorage.setItem('token', data.token);  
    Swal.fire({
        icon: 'success',
        title: '<h3>Login Successfuly!</h3>',
        showConfirmButton: false,
        timer: 2000
        }).then(function () {
        //router.push('/admin/users');
        window.location.href = "/admin/users";
      });
    } else {
      
    Swal.fire({
        icon: 'warning',
        title: '<h3>Login Failed!</h3>',
        showConfirmButton: false,
        timer: 2000
        }).then(function () {
          router.push('/signin');
      });
 
    }
  };
  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleLogin}>
        <h1 className="signup-title">Login Page</h1>

        <div className="form-group">
          <label htmlFor="exampleInputEmail1" className="form-label">Username</label>
          <input type="text" className="form-control" id="formGroupExampleInput" defaultValue={username} placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
          <div id="usernameHelp" className="form-text">เราจะไม่แชร์อีเมล์ของคุณกับบุคคลอื่นใด</div>
        </div>

        <div className="form-group">
          <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
          <input type="password" className="form-control" id="formGroupExampleInput2" defaultValue={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
        </div>

        <div className="form-check">
          <input type="checkbox" className="form-check-input" id="exampleCheck1" />
          <label className="form-check-label" htmlFor="exampleCheck1">จดจำฉันไว้</label>
        </div>

        <div className="form-submit-space">
          <button type="submit" className="btn-submit">Login</button>

          <Link href="/Signup" passHref>
            <button type="button" className="btn-outline">Sign Up</button>
          </Link>
        </div>
      </form>
    </div>
  );
}
