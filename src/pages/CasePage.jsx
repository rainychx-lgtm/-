import { useEffect } from "react";
import Layout from "../components/Layout";

export default function CasePage({ item }) {
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [item.slug]);

  return (
    <Layout isHome={false}>
      <main className="case-detail" id="main-content">
        <section className="case-hero" aria-labelledby="case-title">
          <p className="eyebrow"><span aria-hidden="true" />{item.kicker}</p>
          <h1 id="case-title">{item.title}</h1>
          <p>{item.category} · {String(item.images.length).padStart(2, "0")} SCREENS</p>
        </section>
        <section className="case-gallery" aria-label={`${item.title}图片展示`}>
          {item.images.map((src, index) => (
            <img
              key={src}
              src={src}
              width="1920"
              height="1080"
              loading={index === 0 ? "eager" : "lazy"}
              fetchPriority={index === 0 ? "high" : "auto"}
              decoding="async"
              alt={`${item.title}案例图 ${index + 1}`}
            />
          ))}
        </section>
      </main>
    </Layout>
  );
}
