import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Prompt } from 'next/font/google';
import "./globals.css";
import Navigation from "./components/Navigation";
import ThemeToggle from './components/ThemeToggle';


const prompt = Prompt({
  subsets: ['thai', 'latin'], // รองรับภาษาไทย
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});
export const metadata = {
  title: 'เว็บไซต์ของคุณ',
  description: 'เว็บไซต์ที่ใช้ฟอนต์ Prompt',
};


export default function RootLayout({ children }) {
  return (
    <html lang="th">
      <body>
        <div className="navbar">
          <Navigation />
          <ThemeToggle />
        </div>
        <main style={{ padding: '2rem', textAlign: 'center' }}>
          {children}
        </main>
      </body>
    </html>
  );
}