import { useEffect } from "react";
import Layout from "../components/Layout";
import Link from "../components/Link";
import { caseStudies } from "../data/cases";

const workflowSteps = [
  ["01", "输入整理", "把访谈、需求、竞品和业务目标转化为结构化问题。"],
  ["02", "方案扩展", "用 Prompt 模板生成多组路径、页面结构和文案方向。"],
  ["03", "设计校验", "从可用性、一致性、可达性和业务表达上做快速审阅。"],
  ["04", "资产沉淀", "将组件、规则、案例复盘整理为可复用设计知识。"],
];

export default function HomePage() {
  useEffect(() => {
    const elements = document.querySelectorAll("[data-reveal]");
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      elements.forEach((element) => element.classList.add("is-visible"));
      return undefined;
    }
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      }),
      { rootMargin: "0px 0px -8%", threshold: 0.08 },
    );
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return (
    <Layout isHome>
      <main id="main-content">
        <section className="hero" id="home">
          <div className="hero-media" aria-hidden="true">
            <video
              src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260331_045634_e1c98c76-1265-4f5c-882a-4276f2080894.mp4"
              poster="/assets/hero-workspace.png"
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
            />
          </div>
          <div className="hero-grid" aria-hidden="true" />
          <div className="hero-content">
            <p className="eyebrow"><span aria-hidden="true" />UI / UX / EXPERIENCE DESIGN</p>
            <h1 className="hero-title">
              <span className="hero-title-line"><span className="hero-title-text">EXPERIENCE</span></span>
              <span className="hero-title-line"><span className="hero-title-text">DESIGNER</span></span>
            </h1>
            <p className="hero-subtitle">把复杂体验，设计成清晰可信的产品系统。</p>
            <p className="hero-copy">我是一名 UI、UX 与体验设计师，关注从问题定义、用户旅程、界面系统到 AI 辅助工作流的完整设计过程。</p>
            <div className="hero-actions">
              <Link className="button primary" href="/#projects">查看项目</Link>
              <Link className="button secondary" href="/#contact">联系合作</Link>
            </div>
            <p className="hero-trust">10+ YEARS EXPERIENCE&nbsp;&nbsp;·&nbsp;&nbsp;B2B / C-END&nbsp;&nbsp;·&nbsp;&nbsp;AI WORKFLOW</p>
          </div>
        </section>

        <section className="work-experience" aria-labelledby="about-title" data-reveal>
          <div className="work-title">
            <p>WORK EXPERIENCE <span aria-hidden="true">↘</span></p>
            <h2 id="about-title">个人经历</h2>
          </div>
          <div className="work-grid">
            <div className="work-visual">
              <img src="/assets/work-experience-visual-portrait.jpg" width="1200" height="1200" loading="lazy" decoding="async" alt="柴化鑫个人视觉形象" />
            </div>
            <div className="work-copy">
              <p className="eyebrow"><span aria-hidden="true" />ABOUT ME</p>
              <h2>Hi，I am Chai Huaxin</h2>
              <p>我把视觉系统、用户体验和 AI 工作流整合成可落地的设计能力，擅长从 0 到 1 搭建产品体验，也能围绕增长、效率和一致性持续推动体验升级。</p>
              <div className="work-info" aria-label="个人经历信息">
                <div><span>当前身份</span><strong>UI / UX / Experience Designer</strong></div>
                <div><span>服务方向</span><strong>B端 / C端 / AI Workflow</strong></div>
                <div><span>项目类型</span><strong>在线教育 / AI 产品 / 体验升级</strong></div>
                <div><span>个人优势</span><strong>AI 提效 / 用户体验 / 动效与动画 / 剪辑</strong></div>
              </div>
              <div className="work-stats" aria-label="经历数据">
                <div><strong>10+</strong><span>年设计经验</span></div>
                <div><strong>30+</strong><span>项目落地</span></div>
                <div><strong>1000+</strong><span>界面沉淀</span></div>
              </div>
              <div className="work-tags" aria-label="专注方向">
                <span>体验策略</span><span>产品设计</span><span>AI 工作流</span><span>设计系统</span>
              </div>
            </div>
          </div>
        </section>

        <section className="section" id="projects" aria-labelledby="projects-title">
          <p className="section-display-title">SELECTED WORK <span aria-hidden="true">↘</span></p>
          <div className="section-heading project-heading">
            <div><p className="eyebrow"><span aria-hidden="true" />SELECTED WORK / 01</p><h2 id="projects-title">项目案例</h2></div>
            <div className="project-meta" aria-label="项目概览"><span>05 CASES</span><span>2020—2026</span></div>
          </div>
          <div className="project-grid">
            {caseStudies.map((item) => (
              <article className="project-card" key={item.slug} data-reveal>
                <Link className="project-link" href={`/case/${item.slug}`} aria-label={`查看${item.title}详情`}>
                  <img src={item.thumbnail} width={item.thumbnailSize[0]} height={item.thumbnailSize[1]} loading="lazy" decoding="async" alt={`${item.title}项目缩略图`} />
                  <div className="project-body"><h3>{item.title}</h3><p>{item.category}</p></div>
                </Link>
              </article>
            ))}
          </div>
        </section>

        <section className="workflow-section" id="workflow" aria-labelledby="workflow-title">
          <p className="section-display-title">AI WORKFLOW <span aria-hidden="true">↘</span></p>
          <div className="workflow-copy">
            <p className="eyebrow"><span aria-hidden="true" />AI WORKFLOW / 02</p>
            <h2 id="workflow-title">AI 工作流</h2>
            <p>我把 AI 作为设计协作层：用于快速整理信息、生成研究假设、扩展方案分支、检查界面文案，并把可复用的判断沉淀成团队流程。</p>
          </div>
          <a
            className="workflow-image-link"
            href="/ai-ui-ux-workflow.html"
            target="_blank"
            rel="noreferrer"
            aria-label="在新窗口打开 AI UI UX 工作流页面"
            data-reveal
          >
            <img src="/assets/ai-workflow-sales-service.png" width="2574" height="1204" loading="lazy" decoding="async" alt="销售服务平台 AI 工作流可视化图" />
          </a>
          <div className="workflow-steps">
            {workflowSteps.map(([number, title, text]) => (
              <article key={number} data-reveal><span>{number}</span><h3>{title}</h3><p>{text}</p></article>
            ))}
          </div>
        </section>

        <section className="contact-section" id="contact" aria-labelledby="contact-title">
          <p className="section-display-title">CONTACT <span aria-hidden="true">↘</span></p>
          <div><p className="eyebrow"><span aria-hidden="true" />CONTACT / 03</p><h2 id="contact-title">让我们聊聊产品体验、AI 设计流程，或下一次合作。</h2></div>
          <div className="contact-panel" data-reveal>
            <p>CONTACT</p>
            <dl>
              <div><dt>微信</dt><dd>chaihuaxin</dd></div>
              <div><dt>邮箱</dt><dd><a href="mailto:rainychx@126.com">rainychx@126.com</a></dd></div>
            </dl>
          </div>
        </section>
      </main>
    </Layout>
  );
}
