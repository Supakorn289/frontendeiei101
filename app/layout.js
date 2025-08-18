import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Prompt } from 'next/font/google';
import Navbar from './components/Navigation';
import Footer from './components/Footer';
import styles from './Home.module.css';
import './layout-theme.css';
import './components/footer.css';

const prompt = Prompt({
  subsets: ['thai', 'latin'], // รองรับภาษาไทย
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});
export const metadata = {
  title: 'IT fontend',
  description: 'เว็บไซต์ที่ใช้ฟอนต์ Prompt',
};


export default function RootLayout({ children }) {
  return (
    <html lang="th">
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" />
      </head>
      <body className={`${prompt.className} romance-dark`}>
        <Navbar/>
        {children}
        <Footer/>
       
      </body>
    </html>
  );
}