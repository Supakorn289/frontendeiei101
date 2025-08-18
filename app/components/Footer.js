"use client";

import { useEffect, useRef } from "react";

export default function Footer() {
  const footerRef = useRef(null);
  const lastHeartRef = useRef(0);

  const handleMouseMove = (e) => {
    const el = footerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    el.style.setProperty("--mx", `${x}%`);
    el.style.setProperty("--my", `${y}%`);

    // Heart sparkles (rate-limited)
    const now = Date.now();
    if (now - lastHeartRef.current > 120) {
      lastHeartRef.current = now;
      const heart = document.createElement("span");
      heart.className = "footer-heart";
      heart.textContent = "❤";
      heart.style.left = `${e.clientX - rect.left}px`;
      heart.style.top = `${e.clientY - rect.top}px`;
      el.appendChild(heart);
      setTimeout(() => {
        heart.remove();
      }, 1600);
    }
  };

  const year = new Date().getFullYear();

  useEffect(() => {
    const el = footerRef.current;
    if (!el) return;
    el.classList.add("footer-mounted");
  }, []);

  return (
    <footer
      ref={footerRef}
      className="site-footer bg-body-tertiary text-center"
      onMouseMove={handleMouseMove}
    >
      <div className="container p-4 pb-0 content-wrap">
        <section className="mb-4">
          <a
            data-mdb-ripple-init=""
            className="btn text-white btn-floating m-1 social-btn fb"
            href="#!"
            role="button"
            aria-label="Facebook"
          >
            <i className="fab fa-facebook-f" />
          </a>

          <a
            data-mdb-ripple-init=""
            className="btn text-white btn-floating m-1 social-btn tw"
            href="#!"
            role="button"
            aria-label="Twitter"
          >
            <i className="fab fa-twitter" />
          </a>

          <a
            data-mdb-ripple-init=""
            className="btn text-white btn-floating m-1 social-btn gg"
            href="#!"
            role="button"
            aria-label="Google"
          >
            <i className="fab fa-google" />
          </a>

          <a
            data-mdb-ripple-init=""
            className="btn text-white btn-floating m-1 social-btn ig"
            href="#!"
            role="button"
            aria-label="Instagram"
          >
            <i className="fab fa-instagram" />
          </a>

          <a
            data-mdb-ripple-init=""
            className="btn text-white btn-floating m-1 social-btn ln"
            href="#!"
            role="button"
            aria-label="LinkedIn"
          >
            <i className="fab fa-linkedin-in" />
          </a>

          <a
            data-mdb-ripple-init=""
            className="btn text-white btn-floating m-1 social-btn gh"
            href="#!"
            role="button"
            aria-label="GitHub"
          >
            <i className="fab fa-github" />
          </a>
         
        </section>
      </div>

      <style jsx>{``}</style>
    </footer>
  );
}
