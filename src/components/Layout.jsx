import Header from "./Header";
import Link from "./Link";

export default function Layout({ isHome, children }) {
  return (
    <>
      <a className="skip-link" href="#main-content">跳到主要内容</a>
      <div className="texture-overlay" aria-hidden="true" />
      <Header isHome={isHome} />
      {children}
      <footer className="site-footer">
        <p>© {new Date().getFullYear()} 柴化鑫 · 体验设计师作品集</p>
        <Link href={isHome ? "/#home" : "/#projects"}>{isHome ? "回到顶部" : "返回项目案例"}</Link>
      </footer>
    </>
  );
}
