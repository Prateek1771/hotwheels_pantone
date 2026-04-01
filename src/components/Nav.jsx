export default function Nav({ counter }) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-[900] flex items-center justify-between px-11 py-5 pointer-events-none">
      <div className="pointer-events-auto flex items-center gap-3">
        <img src="/assets/logo.png" alt="Hot Wheels" className="logo pt-1 pr-3" />
        <span className="nav-tag">Silver Series</span>
      </div>
      <div className="nav-mono">{counter}</div>
    </nav>
  );
}
