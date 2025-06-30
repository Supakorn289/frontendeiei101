'use client';

import Link from 'next/link';

export default function Navigation() {
  return (
    <nav className="navbar">
      <div>
        <Link href="/">หน้าแรก</Link>
        <Link href="/about">เกี่ยวกับ</Link>
        <Link href="/service">บริการ</Link>
        <Link href="/contact">ติดต่อ</Link>
      </div>
    </nav>
  );
}
