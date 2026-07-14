import Layout from "../components/Layout";
import Link from "../components/Link";

export default function NotFoundPage() {
  return (
    <Layout isHome={false}>
      <main className="not-found" id="main-content">
        <p className="eyebrow"><span aria-hidden="true" />ERROR / 404</p>
        <h1>页面没有找到</h1>
        <p>这个地址可能已移动，返回首页继续浏览作品。</p>
        <Link className="button primary" href="/">返回首页</Link>
      </main>
    </Layout>
  );
}
