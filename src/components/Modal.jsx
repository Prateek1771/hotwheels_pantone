import { useState, useEffect, useRef } from 'react';

export default function Modal({ car, onClose }) {
  const [videoPlaying, setVideoPlaying] = useState(false);
  const videoRef = useRef(null);

  // Reset video state whenever a new car opens
  useEffect(() => {
    if (car) {
      setVideoPlaying(false);
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.src = '';
      }
    }
  }, [car]);

  // Escape key closes modal
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') handleClose(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, []);

  function handleClose() {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.src = '';
    }
    setVideoPlaying(false);
    onClose();
  }

  function toggleVideo() {
    const v = videoRef.current;
    if (!v) return;
    if (!videoPlaying) {
      v.src = car.video;
      v.play().catch(() => {});
      setVideoPlaying(true);
    } else {
      v.pause();
      v.src = '';
      setVideoPlaying(false);
    }
  }

  const isOpen = car !== null;
  const searchUrl = car
    ? `https://www.google.com/search?q=${encodeURIComponent(car.real.year + ' ' + car.real.make + ' ' + car.real.model)}`
    : '#';

  return (
    <div id="modal" className={isOpen ? 'open' : ''} {...(!isOpen ? { inert: '' } : {})}>
      {/* Pantone accent strip */}
      <div id="modalAccent" style={{ background: car ? car.color : 'transparent' }} />

      {/* Header */}
      <div className="mh">
        <button className="mh-back" onClick={handleClose}>← Back</button>
        <div className="mh-meta">
          {car ? `ORIGIN · ${car.real.year} · ${car.real.origin} · PANTONE ${car.pantone}` : 'ORIGIN STORY'}
        </div>
        <button className="mh-close" onClick={handleClose} aria-label="Close">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
               stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
            <line x1="1" y1="1" x2="13" y2="13"/>
            <line x1="13" y1="1" x2="1" y2="13"/>
          </svg>
        </button>
      </div>

      {/* Single scroll body */}
      <div className="modal-scroll">

        {/* 1. Hero image / video */}
        <div className="modal-hero">
          <img
            id="realImg"
            src={car ? car.photo : ''}
            alt={car ? car.name : ''}
            style={{ display: videoPlaying ? 'none' : '' }}
          />
          <video
            ref={videoRef}
            id="realVideo"
            playsInline
            style={{
              position: 'absolute', inset: 0, width: '100%', height: '100%',
              objectFit: 'cover', zIndex: 2, background: '#000',
              display: videoPlaying ? 'block' : 'none'
            }}
          />
          <div
            className="real-glow"
            style={{ background: car ? `radial-gradient(ellipse at center, ${car.color} 0%, transparent 65%)` : '' }}
          />
          <div className="real-fade" />
        </div>

        {/* 2. Real car details */}
        <div className="modal-real-info">
          <div className="origin-badge">Origin Story</div>
          <div className="real-provenance">
            {car ? `${car.real.year} · ${car.real.origin} · ${car.real.category}` : ''}
          </div>
          <div className="real-name">{car ? car.real.model : ''}</div>
          <div className="spec-badges">
            {car ? [car.real.engine, car.real.power, car.real.drive].map(s => (
              <span key={s} className="spec-badge">{s}</span>
            )) : null}
          </div>
          <button
            className="video-btn"
            onClick={toggleVideo}
            disabled={!car}
            title={car ? 'Watch origin video' : 'Video coming soon'}
          >
            <span className="play-ring">{videoPlaying ? '■' : '▶'}</span>
            <span>{videoPlaying ? 'Stop Video' : 'Play Origin Story'}</span>
          </button>
          <a
            className="search-btn"
            href={searchUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Search Online
          </a>
        </div>

        {/* 3. Hot Wheels section */}
        <div className="modal-hw-section">
          <div className="hw-label">Hot Wheels Interpretation</div>
          <p className="hw-tribute-text">{car ? car.hw.desc : ''}</p>
          <div className="hw-img-wrap">
            <div
              className="hw-img-glow"
              style={{ background: car ? car.color : '' }}
            />
            <img
              className="hw-card-img"
              src={car ? car.card : ''}
              alt={car ? `${car.name} Hot Wheels` : ''}
            />
          </div>
          <div className="hw-divider" />
          <div>
            {car ? [
              ['Scale', car.hw.scale],
              ['Number', car.hw.number],
              ['Year', car.hw.year],
              ['Pantone', car.pantone],
            ].map(([k, v]) => (
              <div key={k} className="hw-spec-row">
                <span className="hw-spec-key">{k}</span>
                <span className="hw-spec-val">{v}</span>
              </div>
            )) : null}
          </div>
          <div className="hw-pantone-pill">
            <div
              className="hw-pantone-pill-inner"
              style={car ? { background: car.color, color: car.textColor } : {}}
            >
              {car ? `PANTONE ${car.pantone}` : ''}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
