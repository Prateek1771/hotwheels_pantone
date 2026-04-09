import { useState, useRef, useEffect, useCallback } from 'react';
import cars from './data/cars';
import ProgressBar from './components/ProgressBar';
import Nav from './components/Nav';
import SideDots from './components/SideDots';
import Intro from './components/Intro';
import Ticker from './components/Ticker';
import Exhibit from './components/Exhibit';
import Finale from './components/Finale';
import Modal from './components/Modal';
import Loader from './components/Loader';

const colors = cars.map(c => c.color);
const TOTAL_SECTIONS = 8; // intro + 6 cars + finale

export default function App() {
  const [loading, setLoading] = useState(true);
  const [activeIdx, setActiveIdx] = useState(0);
  const [progWidth, setProgWidth] = useState('0%');
  const [progColor, setProgColor] = useState('#C8102E');
  const [openCarIdx, setOpenCarIdx] = useState(null);
  const wrapRef = useRef(null);
  const sectionsRef = useRef([]);
  const rafRef = useRef(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    sectionsRef.current = [
      wrap.querySelector('.intro'),
      ...Array.from(wrap.querySelectorAll('.exhibit')),
      wrap.querySelector('.finale'),
    ].filter(Boolean);
  }, []);

  const handleScroll = useCallback(() => {
    if (rafRef.current) return;
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null;
      const wrap = wrapRef.current;
      if (!wrap) return;

      const total = wrap.scrollHeight - wrap.clientHeight;
      setProgWidth(total > 0 ? `${(wrap.scrollTop / total) * 100}%` : '0%');

      const sections = sectionsRef.current;
      const mid = wrap.scrollTop + wrap.clientHeight / 2;
      let idx = 0;
      sections.forEach((s, i) => { if (s.offsetTop <= mid) idx = i; });
      setActiveIdx(idx);

      const ei = idx - 1;
      setProgColor(ei >= 0 && ei < colors.length ? colors[ei] : '#C8102E');
    });
  }, []);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    wrap.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      wrap.removeEventListener('scroll', handleScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [handleScroll]);

  function scrollToSection(i) {
    const s = sectionsRef.current[i];
    if (s) s.scrollIntoView({ behavior: 'smooth' });
  }

  const counter = `${String(activeIdx + 1).padStart(2, '0')} / ${String(TOTAL_SECTIONS).padStart(2, '0')}`;

  return (
    <>
      {loading && <Loader onDone={() => setLoading(false)} />}
      
      <div className={`site-content ${loading ? 'is-loading' : ''}`}>
        <ProgressBar width={progWidth} bgColor={progColor} />
        <Nav counter={counter} />
        <SideDots activeIdx={activeIdx} cars={cars} onDotClick={scrollToSection} />

        <div id="wrap" ref={wrapRef}>
          <Intro />
          <Ticker />
          {cars.map((car, i) => (
            <Exhibit key={i} car={car} index={i} onCarClick={setOpenCarIdx} />
          ))}
          <Finale />
        </div>

        <Modal
          car={openCarIdx !== null ? cars[openCarIdx] : null}
          onClose={() => setOpenCarIdx(null)}
        />
      </div>
    </>
  );
}
