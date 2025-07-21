export default function Signup() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
      <form style={{ maxWidth: 500, width: '90%', padding: 30, border: '1px solid #dee2e6', borderRadius: 8, boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', backgroundColor: '#ffffff' }}>
        <h1 className="text-4xl text-center text-blue-500 mb-5">SignUp Page</h1>

        <div className="mb-3" style={{ marginBottom: 25 }}>
          <label htmlFor="exampleInputEmail1" className="form-label">Email address</label><br />
          <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" style={{ padding: 12 }} />
        </div>

        <div className="mb-3" style={{ marginBottom: 25 }}>
          <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
          <input type="password" className="form-control" id="exampleInputPassword1" style={{ padding: 12 }} />
        </div>

        {/* คำนำหน้า + ชื่อ */}
        <div style={{ display: 'flex', gap: '15px', marginBottom: 25 }}>
          <div style={{ flex: 1 }}>
            <label htmlFor="prefix" className="form-label">คำนำหน้า</label>
            <select className="form-select" id="prefix" required>
              <option selected disabled value></option>
              <option>เด็กชาย</option>
              <option>เด็กหญิง</option>
              <option>นาย</option>
              <option>นางสาว</option>
              <option>นาง</option>
              <option>ไม่ระบุ</option>
            </select>
          </div>

          <div style={{ flex: 2 }}>
            <label htmlFor="firstName" className="form-label">First name</label>
            <input type="text" className="form-control" id="firstName" required />
          </div>
        </div>
        
          <div >
            <label htmlFor="lastName" className="form-label">Last name</label>
            <input type="text" className="form-control" id="lastName" required />
          </div>
          <div style={{ display: 'flex', gap: '15px', marginBottom: 25 }}>
          <div style={{ flex: 2 }}>
            <label htmlFor="gender" className="form-label">เพศ</label>
            <select className="form-select" id="gender" required>
              <option selected disabled value></option>
              <option>ชาย</option>
              <option>หญิง</option>
              <option>ไม่ระบุ</option>
            </select>
          </div>
          <div style={{ flex: 1 }}>
            <label htmlFor="birthday" className="form-label">วันเกิด</label>
            <select className="form-select" id="birthday" required>
           {[...Array(31)].map((_, i) => (
            <option key={i} value={i + 1}> {i + 1} </option>  ))}
            </select>
            </div>
            <div style={{ flex: 1 }}>
            <label htmlFor="birthmonth" className="form-label">เดือนเกิด</label>
            <select className="form-select" id="birthmonth" required>
           {[...Array(12)].map((_, i) => (
            <option key={i} value={i + 1}> {i + 1} </option>  ))}
            </select>
            </div>
            <div style={{ flex: 1 }}>
            <label htmlFor="yearmonth" className="form-label">ปีเกิด</label>
            <select className="form-select" id="yearmonth" required>
               {[...Array(2025 - 1940 + 1)].map((_, i) => (
                <option key={i} value={1940 + i}>{1940 + i}</option> ))}
            </select>
            </div>
          </div>
        
        <div className="mb-3 form-check" style={{ marginBottom: 30 }}>
          <input type="checkbox" className="form-check-input" id="exampleCheck1" />
          <label className="form-check-label" htmlFor="exampleCheck1">ยอมรับเงื่อนไขทั้งหมด</label>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <button type="submit" className="btn btn-primary" style={{ padding: '12px 25px' }}>Sign Up</button>
        </div>
      </form>
    </div>
  );
}
