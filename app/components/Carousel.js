'use client';
import { useEffect, useRef } from 'react';
import './carousel.css';

export default function Carousel() {
  const heartLayerRef = useRef(null);

  useEffect(() => {
    // ensure Bootstrap JS is loaded for Carousel behavior
    import('bootstrap/dist/js/bootstrap.bundle.min.js');

    // spawn floating hearts periodically
    const layer = heartLayerRef.current;
    if (!layer) return;
    const MAX_HEARTS = 12;

    const spawnHeart = () => {
      const heart = document.createElement('span');
      heart.className = 'heart';
      if (layer.childElementCount >= MAX_HEARTS) return;
      const size = Math.random() * 8 + 6; // 6 - 14px
      const duration = Math.random() * 5 + 7; // 7 - 12s
      const left = Math.random() * 100; // percentage
      heart.style.setProperty('--size', `${size}px`);
      heart.style.setProperty('--duration', `${duration}s`);
      heart.style.left = `${left}%`;
      layer.appendChild(heart);
      // cleanup after animation
      setTimeout(() => heart.remove(), duration * 1000);
    };

    let interval = null;
    let running = false;
    const start = () => {
      if (running) return;
      running = true;
      interval = setInterval(spawnHeart, 1400);
    };
    const stop = () => {
      running = false;
      if (interval) {
        clearInterval(interval);
        interval = null;
      }
    };

    // Use IntersectionObserver to only animate when visible
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) start();
          else stop();
        });
      },
      { root: null, threshold: 0.2 }
    );
    observer.observe(layer);

    // Start if page is initially visible and in viewport
    start();

    return () => {
      stop();
      observer.disconnect();
    };
  }, []);

  return (
    <div
      id="carouselExampleFade"
      className="romance-carousel carousel slide carousel-fade"
      data-bs-ride="carousel"
      data-bs-interval="4200"
    >
      {/* floating hearts layer */}
      <div ref={heartLayerRef} className="heart-layer" aria-hidden="true" />
      {/* vignette overlay */}
      <div className="romance-vignette" aria-hidden="true" />

      <div className="carousel-indicators">
        <button type="button" data-bs-target="#carouselExampleFade" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
        <button type="button" data-bs-target="#carouselExampleFade" data-bs-slide-to="1" aria-label="Slide 2"></button>
        <button type="button" data-bs-target="#carouselExampleFade" data-bs-slide-to="2" aria-label="Slide 3"></button>
      </div>

      <div className="carousel-inner">
        <div className="carousel-item active">
          <img
            src="https://it.cmtc.ac.th/wp-content/uploads/2024/07/895663_0.jpg"
            className="d-block w-100"
            alt="ภาพที่ 1" width={1920} height={690}
          />
          <div className="carousel-caption text-start">
            <h5 className="caption-title">เทคนิค</h5>
            <p className="caption-sub">เรียนรู้อย่างมีประสิทธิภาพ ทำงานอย่างชาญฉลาด</p>
          </div>
        </div>
        <div className="carousel-item">
          <img
            src="https://it.cmtc.ac.th/wp-content/uploads/2024/07/893813.jpg"
            className="d-block w-100"
            alt="ภาพที่ 2" width={1920} height={690}
          />
          <div className="carousel-caption">
            <h5 className="caption-title">เทคโนโลยี</h5>
            <p className="caption-sub">เปลี่ยนโลก เพื่อการศึกษา ขับเคลื่อนอนาคต</p>
          </div>
        </div>
        <div className="carousel-item">
          <img
            src="https://cdn.chiangmainews.co.th/wp-content/uploads/2023/07/23105235/1690084355_061603-chiangmainews.jpg"
            className="d-block w-100"
            alt="ภาพที่ 3" width={1920} height={690}
          />
          <div className="carousel-caption text-end">
            <h5 className="caption-title">สารสนเทศ</h5>
            <p className="caption-sub">เพื่อการตัดสินใจ พลังความรู้ อย่างมีระบบ</p>
          </div>
        </div>
      </div>

      <button
        className="carousel-control-prev romance-control"
        type="button"
        data-bs-target="#carouselExampleFade"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true" />
        <span className="visually-hidden">Previous</span>
      </button>

      <button
        className="carousel-control-next romance-control"
        type="button"
        data-bs-target="#carouselExampleFade"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true" />
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
}
