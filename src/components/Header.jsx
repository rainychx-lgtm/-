import { useEffect, useState } from "react";
import Link from "./Link";

const navItems = [
  ["首页", "home"],
  ["项目案例", "projects"],
  ["AI 工作流", "workflow"],
  ["联系", "contact"],
];

export default function Header({ isHome }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);
      if (!isHome) return;
      const current = navItems.reduce((result, [, id]) => {
        const section = document.getElementById(id);
        return section && section.getBoundingClientRect().top <= 160 ? id : result;
      }, "home");
      setActive(current);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHome]);

  useEffect(() => {
    const handleKey = (event) => event.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <header className={`site-header${scrolled ? " is-scrolled" : ""}`}>
      <Link className="brand" href="/#home" aria-label="返回首页">
        <span className="brand-mark">XD</span>
        <span className="brand-text">EXPERIENCE DESIGNER</span>
      </Link>

      <button
        className="nav-toggle"
        type="button"
        aria-label={open ? "关闭导航" : "打开导航"}
        aria-expanded={open}
        aria-controls="site-navigation"
        onClick={() => setOpen((value) => !value)}
      >
        <span />
        <span />
      </button>

      <nav id="site-navigation" className={`site-nav${open ? " is-open" : ""}`} aria-label="主导航">
        {navItems.map(([label, id]) => (
          <Link
            key={id}
            href={`/#${id}`}
            className={isHome && active === id ? "is-active" : undefined}
            aria-current={isHome && active === id ? "location" : undefined}
            onClick={() => setOpen(false)}
          >
            {label}
          </Link>
        ))}
      </nav>

      <Link className="header-cta" href="/#contact">
        <span aria-hidden="true" />AVAILABLE
      </Link>
    </header>
  );
}
