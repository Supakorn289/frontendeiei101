'use client';
import { useEffect } from 'react';

export default function Carousel() {
  useEffect(() => {
    import('bootstrap/dist/js/bootstrap.bundle.min.js');
  }, []);

  return (
    <div
      id="carouselExampleFade"
      className="carousel slide carousel-fade"
      data-bs-ride="carousel"
      data-bs-interval="3000" 
    >
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img
            src="https://it.cmtc.ac.th/wp-content/uploads/2024/07/895663_0.jpg"
            className="d-block w-100"
            alt="ภาพที่ 1"width={1920} height={690}
          />
        </div>
        <div className="carousel-item">
          <img
            src="https://it.cmtc.ac.th/wp-content/uploads/2024/07/893813.jpg"
            className="d-block w-100"
            alt="ภาพที่ 2"width={1920} height={690}
          />
        </div>
        <div className="carousel-item">
          <img
            src="https://cdn.chiangmainews.co.th/wp-content/uploads/2023/07/23105235/1690084355_061603-chiangmainews.jpg"
            className="d-block w-100"
            alt="ภาพที่ 3"width={1920} height={690}
          />
        </div>
      </div>

      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleFade"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true" />
        <span className="visually-hidden">Previous</span>
      </button>

      <button
        className="carousel-control-next"
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
