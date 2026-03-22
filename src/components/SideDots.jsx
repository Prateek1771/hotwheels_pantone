const LABELS = ['Intro', 'P·533', 'P·195', 'P·186', 'P·021', 'P·2013', 'P·123', 'End'];

export default function SideDots({ activeIdx, cars, onDotClick }) {
  return (
    <div id="sideDots">
      {LABELS.map((lbl, i) => {
        const isCarDot = i > 0 && i < 7;
        const car = isCarDot ? cars[i - 1] : null;
        return (
          <div
            key={i}
            className={'sdot' + (i === activeIdx ? ' active' : '')}
            data-tip={lbl}
            onClick={() => onDotClick(i)}
            style={car ? { borderColor: car.color, background: car.color + '55' } : {}}
          />
        );
      })}
    </div>
  );
}
