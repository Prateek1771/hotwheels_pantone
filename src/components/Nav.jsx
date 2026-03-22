export default function Nav({ counter }) {
  return (
    <nav className="fixed top-[3px] left-0 right-0 z-[900] flex items-center justify-between px-11 py-4 pointer-events-none">
      <div className="pointer-events-auto flex items-center gap-3">
        <img src="/assets/logo.png" alt="Hot Wheels" className="logo" />
        <span className="nav-tag">Silver Series</span>
      </div>
      <div className="nav-mono">{counter}</div>
    </nav>
  );
}
