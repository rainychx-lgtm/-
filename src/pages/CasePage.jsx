import { Fragment, useEffect } from "react";
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
        <section className="case-gallery" aria-label={`${item.title}作品展示`}>
          {item.images.map((src, index) => (
            <Fragment key={src}>
              <img
                src={src}
                width="1920"
                height="1080"
                loading={index === 0 ? "eager" : "lazy"}
                fetchPriority={index === 0 ? "high" : "auto"}
                decoding="async"
                alt={`${item.title}案例图 ${index + 1}`}
              />
              {item.video?.afterImage === src && (
                <video
                  className="case-video"
                  controls
                  playsInline
                  preload="none"
                  poster={item.video.poster}
                  aria-label={item.video.title}
                >
                  <source src={item.video.src} type="video/mp4" />
                  您的浏览器不支持视频播放，<a href={item.video.src}>下载视频</a>。
                </video>
              )}
            </Fragment>
          ))}
        </section>
      </main>
    </Layout>
  );
}
