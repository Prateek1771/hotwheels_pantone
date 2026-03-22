export default function ProgressBar({ width, bgColor }) {
  return (
    <div
      className="fixed top-0 left-0 h-[3px] z-[1000] transition-[width,background] duration-300 ease-out"
      style={{ width, background: bgColor }}
    />
  );
}
