import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  return (
<nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
  <Link href="/" className="navbar-brand d-flex align-items-center gap-2"><img src="IT.png" alt="Logo" width={30} height={24} className="d-inline-block align-text-top" /> เทคโนโลยีสารสนเทศ</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" href="/">หน้าแรก</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" href="/about">เกี่ยวกับเรา</Link>
        </li>
        <li className="nav-item dropdown">
          <Link className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            บริการของเรา
          </Link>
          <ul className="dropdown-menu">
            <li><Link className="dropdown-item" href="https://getbootstrap.com/">Bootstrap</Link></li>
            <li><Link className="dropdown-item" href="https://github.com/">Github</Link></li>
            <li><Link className="dropdown-item" href="https://vercel.com/">Vercel</Link></li>
            <li><Link className="dropdown-item" href="https://www.figma.com/">Figma</Link></li>
            <li><hr className="dropdown-divider" /></li>
            <li><Link className="dropdown-item" href="#">Something else here</Link></li>
          </ul>
        </li>
        <li className="nav-item">
          <Link href="/contact" className="nav-link" aria-disabled="true">ติดต่อเรา</Link>
        </li>
      </ul>
<div style={{display: 'flex', gap: 5}}>
  <button style={{backgroundColor: '#007bff', color: 'white', padding: '10px 20px', border: 'none', borderRadius: 5, cursor: 'pointer'}}>
    <Link style={{color: 'white'}}classname="nav-link" href="/Login">เข้าสู่ระบบ</Link>
  </button>
  <button style={{backgroundColor: '#007bff', padding: '10px 20px', border: 'none', borderRadius: 5, cursor: 'pointer'}}>
    <Link style={{color: 'white'}}classname="nav-link" href="Signup" >สมัครสมาชิก</Link>
  </button>
</div>
      <form className="d-flex" role="search">
        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
        <button className="btn btn-outline-warning" type="submit">Search</button>
      </form>
    </div>
  </div>
</nav>
  );
}