const ITEMS = ['Hot Wheels', 'Pantone', 'Silver Series', '2025', 'Six Cars', 'Six Colors', 'Click to see the origin story'];

export default function Ticker() {
  // Duplicate items for seamless infinite loop
  const all = [...ITEMS, ...ITEMS];
  return (
    <div className="ticker">
      <div className="ticker-inner">
        {all.map((item, i) => (
          <span key={i}>{item}<span className="dot"> · </span></span>
        ))}
      </div>
    </div>
  );
}
