// app/components/Navigation.js
'use client';
import Link from 'next/link';

export default function Navigation() {
  return (
    <nav style={{ padding: '1rem', borderBottom: '1px solid #eee' }}>
      <ul style={{ display: 'flex', gap: '1rem', listStyle: 'none' }}>
        <li id='home'><Link href="/">หน้าแรก</Link></li>
        <li id='about'><Link href="/about">เกี่ยวกับ</Link></li>
        <li id='service'><Link href="/service">บริการ</Link></li>
        <li id='contact'><Link href="/contact">ติดต่อ</Link></li>
      </ul>
    </nav>
  );
}