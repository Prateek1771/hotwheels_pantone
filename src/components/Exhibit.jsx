import { useRef, useEffect } from 'react';

export default function Exhibit({ car, index, onCarClick }) {
  const sectionRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) el.classList.add('in-view'); },
      { threshold: 0.45 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="exhibit" ref={sectionRef} data-index={index}>
      {/* LEFT: Pantone color + number + chip */}
      <div className="ex-left" style={{ background: car.color }}>
        <div className="ex-bg-num">{car.num}</div>
        <div className="ex-chip">
          <div className="ex-chip-band" style={{ background: car.color }} />
          <div className="ex-chip-label">
            <div className="word">Pantone</div>
            <div className="num">{car.pantone}</div>
          </div>
        </div>
      </div>

      {/* RIGHT: Dark + car image + info (clickable) */}
      <div className="ex-right" onClick={() => onCarClick(index)}>
        <div
          className="ex-glow"
          style={{ background: `radial-gradient(ellipse,${car.color} 0%,transparent 70%)` }}
        />
        <div className="ex-package">
          <img src={car.card} alt={`${car.name} packaging`} />
        </div>
        <div className="ex-car-wrap">
          <img src={car.img} alt={car.name} />
        </div>
        <div className="ex-info">
          <div className="ex-series">Silver Series · {car.num} of 06</div>
          <div className="ex-name">{car.name}</div>
          <div className="click-hint">Click to see origin</div>
        </div>
      </div>
    </section>
  );
}
