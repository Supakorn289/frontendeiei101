import Link from 'next/link';
import './login1.css'; // อย่าลืมนำเข้า CSS

export default function Login() {
  return (
    <div className="signup-container">
      <form className="signup-form">
        <h1 className="signup-title">Login Page</h1>

        <div className="form-group">
          <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
          <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
          <div id="emailHelp" className="form-text">เราจะไม่แชร์อีเมล์ของคุณกับบุคคลอื่นใด</div>
        </div>

        <div className="form-group">
          <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
          <input type="password" className="form-control" id="exampleInputPassword1" />
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
