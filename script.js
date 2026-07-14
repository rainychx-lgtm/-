const header = document.querySelector("[data-header]");
const nav = document.querySelector("[data-nav]");
const navToggle = document.querySelector("[data-nav-toggle]");
const navLinks = [...document.querySelectorAll(".site-nav a")];
const sections = navLinks
  .map((link) => {
    const href = link.getAttribute("href");
    return href?.startsWith("#") ? document.querySelector(href) : null;
  })
  .filter(Boolean);

function updateHeader() {
  if (!header) {
    return;
  }

  header.classList.toggle("is-scrolled", window.scrollY > 24);
}

function updateActiveLink() {
  if (!sections.length) {
    return;
  }

  const current = sections.reduce((active, section) => {
    const top = section.getBoundingClientRect().top;
    return top <= 140 ? section : active;
  }, sections[0]);

  navLinks.forEach((link) => {
    link.classList.toggle("is-active", link.getAttribute("href") === `#${current.id}`);
  });
}

if (navToggle && nav) {
  navToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
    navToggle.setAttribute("aria-label", isOpen ? "关闭导航" : "打开导航");
  });
}

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    nav?.classList.remove("is-open");
    navToggle?.setAttribute("aria-expanded", "false");
    navToggle?.setAttribute("aria-label", "打开导航");
  });
});

window.addEventListener("scroll", () => {
  updateHeader();
  updateActiveLink();
});

updateHeader();
updateActiveLink();

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const hasGsap = Boolean(window.gsap && window.ScrollTrigger);

if (!prefersReducedMotion && hasGsap) {
  initMotionSystem();
}

function createOpeningLayer() {
  const opening = document.createElement("div");
  opening.className = "opening-animation";
  opening.setAttribute("aria-hidden", "true");
  opening.innerHTML = `
    <div class="opening-panel"></div>
    <div class="opening-panel"></div>
    <div class="opening-panel"></div>
    <div class="opening-panel"></div>
    <p class="opening-label">PORTFOLIO / EXPERIENCE DESIGN</p>
    <p class="opening-word"><span>OPENING</span></p>
  `;
  document.body.append(opening);
  return opening;
}

function collect(...selectors) {
  return selectors.flatMap((selector) => gsap.utils.toArray(selector));
}

function initMotionSystem() {
  gsap.registerPlugin(ScrollTrigger);
  gsap.config({ nullTargetWarn: false });
  document.documentElement.classList.add("motion-ready");

  const opening = createOpeningLayer();
  const openingPanels = opening.querySelectorAll(".opening-panel");
  const openingWord = opening.querySelector(".opening-word span");
  const openingLabel = opening.querySelector(".opening-label");

  gsap.set(".site-header", { autoAlpha: 0, y: -88 });
  gsap.set(".hero-title-text", {
    yPercent: 118,
    rotateX: -42,
    skewY: 7,
    transformOrigin: "left bottom",
  });
  gsap.set(".hero .eyebrow, .hero-subtitle, .hero-copy, .hero-actions, .hero-trust", {
    autoAlpha: 0,
    y: 52,
    clipPath: "inset(0% 0% 100% 0%)",
  });
  gsap.set(".hero-media video", {
    scale: 1.18,
    filter: "grayscale(1) contrast(1.45) brightness(0.42)",
  });
  gsap.set(openingPanels, { yPercent: 0 });

  document.body.classList.add("is-opening");

  gsap
    .timeline({
      defaults: { ease: "expo.out" },
      onComplete: () => {
        document.body.classList.remove("is-opening");
        opening.remove();
        ScrollTrigger.refresh();
      },
    })
    .from(openingWord, {
      yPercent: 120,
      skewY: 8,
      duration: 1.05,
    })
    .from(
      openingLabel,
      {
        autoAlpha: 0,
        y: 36,
        clipPath: "inset(0% 100% 0% 0%)",
        duration: 0.85,
      },
      "-=0.72",
    )
    .to(openingPanels, {
      yPercent: -105,
      duration: 1.45,
      ease: "power4.inOut",
      stagger: 0.08,
    }, "+=0.08")
    .to(opening, { autoAlpha: 0, duration: 0.3 }, "-=0.28")
    .to(".site-header", { autoAlpha: 1, y: 0, duration: 1.05 }, "-=1.05")
    .to(
      ".hero-media video",
      {
        scale: 1,
        filter: "grayscale(1) contrast(1.25) brightness(0.7)",
        duration: 1.65,
      },
      "-=1.05",
    )
    .to(
      ".hero-title-text",
      {
        yPercent: 0,
        rotateX: 0,
        skewY: 0,
        duration: 1.28,
        stagger: 0.13,
      },
      "-=1.12",
    )
    .to(
      ".hero .eyebrow, .hero-subtitle, .hero-copy, .hero-actions, .hero-trust",
      {
        autoAlpha: 1,
        y: 0,
        clipPath: "inset(0% 0% 0% 0%)",
        duration: 0.92,
        stagger: 0.08,
      },
      "-=0.72",
    );

  initScrollTitles();
  initStaggerReveals();
  initImageParallax();
}

function initScrollTitles() {
  collect(".work-title p", ".section-display-title").forEach((title) => {
    gsap.fromTo(
      title,
      {
        autoAlpha: 0,
        x: "-24vw",
        y: 86,
        scaleX: 0.72,
        skewX: -9,
        clipPath: "inset(0% 100% 0% 0%)",
      },
      {
        autoAlpha: 1,
        x: 0,
        y: 0,
        scaleX: 1,
        skewX: 0,
        clipPath: "inset(0% 0% 0% 0%)",
        duration: 1.45,
        ease: "expo.out",
        scrollTrigger: {
          trigger: title.closest("section") || title,
          start: "top 78%",
          once: true,
        },
      },
    );
  });
}

function revealItems(trigger, items, options = {}) {
  const targets = items.filter(Boolean);
  if (!targets.length) {
    return;
  }

  gsap.fromTo(
    targets,
    {
      autoAlpha: 0,
      y: options.y ?? 132,
      scaleY: options.scaleY ?? 0.84,
      scaleX: options.scaleX ?? 0.96,
      clipPath: "inset(0% 0% 100% 0%)",
      transformOrigin: "center bottom",
    },
    {
      autoAlpha: 1,
      y: 0,
      scaleY: 1,
      scaleX: 1,
      clipPath: "inset(0% 0% 0% 0%)",
      duration: options.duration ?? 1.18,
      ease: "expo.out",
      stagger: {
        each: options.stagger ?? 0.1,
        from: "start",
      },
      scrollTrigger: {
        trigger,
        start: options.start ?? "top 72%",
        once: true,
      },
    },
  );
}

function initStaggerReveals() {
  revealItems(
    ".work-experience",
    collect(
      ".work-visual",
      ".work-copy .eyebrow",
      ".work-copy h2",
      ".work-copy > p:not(.eyebrow)",
      ".work-info div",
      ".work-stats div",
      ".work-tags span",
    ),
    { start: "top 66%", stagger: 0.075, duration: 1.22 },
  );

  revealItems("#projects", collect(".project-card"), {
    start: "top 68%",
    stagger: 0.12,
    y: 150,
    scaleY: 0.78,
    scaleX: 0.9,
    duration: 1.28,
  });

  revealItems(
    "#workflow",
    collect(
      ".workflow-copy .eyebrow",
      ".workflow-copy h2",
      ".workflow-copy > p:last-child",
      ".workflow-image-link",
      ".workflow-steps article",
    ),
    { start: "top 68%", stagger: 0.095, y: 140, scaleY: 0.82, duration: 1.22 },
  );

  revealItems("#contact", collect(".contact-section > div:not(.contact-panel)", ".contact-panel"), {
    start: "top 72%",
    stagger: 0.14,
    y: 130,
    scaleY: 0.84,
    duration: 1.18,
  });
}

function initImageParallax() {
  collect(".workflow-image-link").forEach((frame) => {
    const image = frame.querySelector("img");
    if (!image) {
      return;
    }

    gsap.fromTo(
      image,
      { yPercent: 7, scale: 1.12 },
      {
        yPercent: -6,
        scale: 1.04,
        ease: "none",
        scrollTrigger: {
          trigger: frame,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.8,
        },
      },
    );
  });
}
