import { useEffect } from 'react';

const STRIPS = [
  { color: '#1B3054', car: '/assets/svgs/image 7.svg'  },
  { color: '#6B1934', car: '/assets/svgs/image 8.svg'  },
  { color: '#C8102E', car: '/assets/svgs/image 9.svg'  },
  { color: '#FD4F00', car: '/assets/svgs/image 10.svg' },
  { color: '#C8720A', car: '/assets/svgs/image 11.svg' },
  { color: '#E8B800', car: '/assets/svgs/image 12.svg' },
];

// Last strip: delay 0.6s + animation 2.3s = 2.9s total
const DONE_MS = 3000;

export default function Loader({ onDone }) {
  useEffect(() => {
    const t = setTimeout(onDone, DONE_MS);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <div className="loader">
      {STRIPS.map((s, i) => (
        <div
          key={i}
          className="loader-strip"
          style={{ background: s.color, animationDelay: `${i * 0.12}s` }}
        >
          <img
            className="loader-car"
            src={s.car}
            alt=""
            draggable="false"
          />
        </div>
      ))}
    </div>
  );
}
