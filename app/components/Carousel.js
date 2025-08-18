'use client';
import { useEffect } from 'react';
import './carousel.css';

export default function Carousel() {
  
  useEffect(() => {
    // ensure Bootstrap JS is loaded for Carousel behavior
    import('bootstrap/dist/js/bootstrap.bundle.min.js');
  }, []);

  return (
    <div
      id="carouselExampleFade"
      className="romance-carousel carousel slide carousel-fade"
      data-bs-ride="carousel"
      data-bs-interval="4200"
    >
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
            <h5 className="caption-title">Love in the Air</h5>
            <p className="caption-sub">ละอองความรักสีชมพู ทาบทอด้วยประกายสีทอง</p>
          </div>
        </div>
        <div className="carousel-item">
          <img
            src="https://it.cmtc.ac.th/wp-content/uploads/2024/07/893813.jpg"
            className="d-block w-100"
            alt="ภาพที่ 2" width={1920} height={690}
          />
          <div className="carousel-caption">
            <h5 className="caption-title">Golden Moments</h5>
            <p className="caption-sub">ชมพู ดำ ทอง ผสานเป็นจังหวะของหัวใจ</p>
          </div>
        </div>
        <div className="carousel-item">
          <img
            src="https://cdn.chiangmainews.co.th/wp-content/uploads/2023/07/23105235/1690084355_061603-chiangmainews.jpg"
            className="d-block w-100"
            alt="ภาพที่ 3" width={1920} height={690}
          />
          <div className="carousel-caption text-end">
            <h5 className="caption-title">Forever Yours</h5>
            <p className="caption-sub">ทุกสไลด์บอกเล่าเรื่องราวความรักอันนุ่มนวล</p>
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
