import Link from 'next/link';

export default function Login() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
      <form style={{ maxWidth: 500, width: '90%', padding: 30, border: '1px solid #dee2e6', borderRadius: 8, boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', backgroundColor: '#ffffff' }}>
        <h1 className="text-4xl text-center text-blue-500 mb-5">Login Page</h1>

        <div className="mb-3" style={{ marginBottom: 25 }}>
          <label htmlFor="exampleInputEmail1" className="form-label">Email address</label><br />
          <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" style={{ padding: 12 }} />
          <div id="emailHelp" className="form-text" style={{ marginTop: 5 }}>เราจะไม่แชร์อีเมล์ของคุณกับบุคคลอื่นใด</div>
        </div>

        <div className="mb-3" style={{ marginBottom: 25 }}>
          <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
          <input type="password" className="form-control" id="exampleInputPassword1" style={{ padding: 12 }} />
        </div>

        <div className="mb-3 form-check" style={{ marginBottom: 30 }}>
          <input type="checkbox" className="form-check-input" id="exampleCheck1" />
          <label className="form-check-label" htmlFor="exampleCheck1">จดจำฉันไว้</label>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <button type="submit" className="btn btn-primary" style={{ padding: '12px 25px' }}>Login</button>
          
          <Link href="/Signup" passHref>
            <button type="button" className="btn btn-outline-secondary" style={{ padding: '12px 25px' }}>
              Sign Up
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
}
