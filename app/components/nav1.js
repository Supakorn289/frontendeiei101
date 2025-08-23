import Link from "next/link";
import './nav1.css';

export default function Navbar1() {
  return (

    <nav class="navbar navbar-expand-lg navbar-custom mt-3 mx-3">
    <div class="container-fluid">
      <a class="navbar-brand d-flex align-items-center" href="#">
        <span class="badge bg-purple me-2">B</span> FrontEnd
      </a>
      <div class="collapse navbar-collapse justify-content-end">
        <ul class="navbar-nav mb-2 mb-lg-0">
          <li class="nav-item"><a class="nav-link" href="#">หน้าแรก</a></li>
          <li class="nav-item"><a class="nav-link" href="#">เกี่ยวกับเรา</a></li>
          <li class="nav-item"><a class="nav-link" href="#">บริการของเรา</a></li>
          <li class="nav-item"><a class="nav-link" href="#">ติดต่อเรา</a></li>
        </ul>
        <button class="btn btn-outline-light ms-3" type="button">เข้าสู่ระบบ</button>
      </div>
    </div>
  </nav>

  );
}
