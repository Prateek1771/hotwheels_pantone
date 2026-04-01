import { useState, useRef } from 'react';
import cars from '../data/cars';

export default function Intro() {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [exitingIdx, setExitingIdx]   = useState(null);
  const exitTimer = useRef(null);

  function handleSwatchClick(i) {
    if (i === selectedIdx) return;
    clearTimeout(exitTimer.current);
    setExitingIdx(selectedIdx);
    exitTimer.current = setTimeout(() => setExitingIdx(null), 380);
    setSelectedIdx(i);
  }

  return (
    <section className="intro speed-bg">
      <div className="intro-bg-type">HW</div>

      <div className="intro-left">
        <div className="intro-series">Silver Series · 2025</div>
        <h1 className="intro-title">
          <span className="outline">Hot Wheels</span>
          <span className="x">×</span>
          <span className="pantone-stroke">Pantone</span>
        </h1>
        <div className="intro-descriptor">06 Cars · 06 Colors · One Collection</div>
        <div className="scroll-cue">
          <span className="scroll-cue-text">Scroll to explore</span>
          <div className="scroll-arrow">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                 stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"/>
              <polyline points="5 12 12 19 19 12"/>
            </svg>
          </div>
        </div>
      </div>

      {/* Car stage — only visible on mobile/tablet */}
      <div className="intro-car-stage">
        {exitingIdx !== null && (
          <img
            className="intro-stage-car car-exit"
            src={`/assets/image ${exitingIdx + 1}.webp`}
            alt=""
            draggable="false"
          />
        )}
        <img
          key={selectedIdx}
          className="intro-stage-car car-enter"
          src={`/assets/image ${selectedIdx + 1}.webp`}
          alt={cars[selectedIdx].name}
          draggable="false"
        />
      </div>

      <div className="intro-right">
        <div className="intro-color-stack">
          {cars.map((car, i) => (
            <div
              key={car.pantone}
              className="intro-swatch"
              data-active={i === selectedIdx ? 'true' : undefined}
              style={{ background: car.color, animationDelay: `${0.1 + i * 0.1}s` }}
              onClick={() => handleSwatchClick(i)}
            >
              <img
                className="intro-swatch-car"
                src={`/assets/image ${i + 1}.webp`}
                alt={car.name}
                draggable="false"
              />
              <span className="intro-swatch-num">P · {car.pantone}</span>
              <span className="intro-swatch-name">{car.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
