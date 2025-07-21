import './signup.css';

export default function Signup() {
  return (
    <div className="signup-container">
      <form className="signup-form">
        <h1 className="signup-title">SignUp Page</h1>

        <div className="form-group">
          <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
          <input type="email" className="form-control" id="exampleInputEmail1" />
        </div>

        <div className="form-group">
          <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
          <input type="password" className="form-control" id="exampleInputPassword1" />
        </div>

        <div className="form-row">
          <div className="form-col">
            <label htmlFor="prefix" className="form-label">คำนำหน้า</label>
            <select className="form-select" id="prefix" required>
              <option disabled selected value></option>
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
            <input type="text" className="form-control" id="firstName" required />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="lastName" className="form-label">Last name</label>
          <input type="text" className="form-control" id="lastName" required />
        </div>

        <div className="form-row">
          <div className="form-col-large">
            <label htmlFor="gender" className="form-label">เพศ</label>
            <select className="form-select" id="gender" required>
              <option disabled selected value></option>
              <option>ชาย</option>
              <option>หญิง</option>
              <option>ไม่ระบุ</option>
            </select>
          </div>

          <div className="form-col">
            <label htmlFor="birthday" className="form-label">วันเกิด</label>
            <select className="form-select" id="birthday" required>
              {[...Array(31)].map((_, i) => (
                <option key={i} value={i + 1}>{i + 1}</option>
              ))}
            </select>
          </div>

          <div className="form-col">
            <label htmlFor="birthmonth" className="form-label">เดือนเกิด</label>
            <select className="form-select" id="birthmonth" required>
              {[...Array(12)].map((_, i) => (
                <option key={i} value={i + 1}>{i + 1}</option>
              ))}
            </select>
          </div>

          <div className="form-col">
            <label htmlFor="yearmonth" className="form-label">ปีเกิด</label>
            <select className="form-select" id="yearmonth" required>
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
