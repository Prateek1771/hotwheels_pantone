import { useRef, useEffect } from 'react';

const COLORS = ['#1B3054','#6B1934','#C8102E','#FD4F00','#C8720A','#E8B800'];

export default function Finale() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) el.classList.add('in-view'); },
      { threshold: 0.35 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="finale" ref={sectionRef}>
      <div className="finale-content">
        <img src="/assets/logo.png" alt="Hot Wheels" className="finale-logo" />
        <h2 className="finale-title">
          <span className="finale-eyebrow">Hot Wheels × Pantone</span>
          <span className="finale-word">Silver</span>
          <span className="finale-word">Series</span>
        </h2>
        <p className="finale-sub">Six cars · Six colors · One collection · 2025</p>
        <div className="finale-swatches">
          {COLORS.map(c => <div key={c} style={{ background: c }} />)}
        </div>
      </div>
      <div className="finale-sticker">
        <div className="finale-sticker-inner">
          <span className="finale-sticker-top">New Set</span>
          <span className="finale-sticker-main">Coming</span>
          <span className="finale-sticker-main">Soon</span>
          <span className="finale-sticker-dots">· · ·</span>
        </div>
      </div>

      <div className="finale-color-strip">
        {COLORS.map(c => <div key={c} style={{ background: c }} />)}
      </div>
    </section>
  );
}
