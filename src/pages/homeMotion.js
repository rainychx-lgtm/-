const ease = "cubic-bezier(0.22, 0.72, 0.18, 1)";
const riseEase = "cubic-bezier(0.25, 0.6, 0.3, 1)";
const mask = "inset(-8px -8px 100% -8px)";
const openMask = "inset(-8px)";

export function startHomeMotion(main) {
  const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
  if (preference.matches || !main.animate || !window.IntersectionObserver) return;

  const active = new Map();
  const pending = new Map();
  const opening = main.querySelector(".opening-animation");

  function animate(element, frames, duration, delay = 0, easing = ease) {
    const animation = element.animate(frames, { duration, delay, easing, fill: "backwards" });
    active.set(element, animation);
    animation.onfinish = () => active.delete(element);
    return animation;
  }

  if ((!location.hash || location.hash === "#home") && window.scrollY < 80) {
    animate(opening, [
      { visibility: "visible", clipPath: "inset(0)" },
      { visibility: "visible", clipPath: "inset(0 0 100% 0)" },
    ], 1020, 450);

    animate(opening.querySelector("span"), [
      { transform: "translateY(115%) scaleY(1.25)" },
      { transform: "translateY(0) scaleY(1)" },
    ], 620, 40);

    animate(main.querySelector(".hero-media video"), [
      { transform: "translateY(5%) scale(1.17)" },
      { transform: "translateY(0) scale(1)" },
    ], 1650, 460);

    main.querySelectorAll(".hero-title-text").forEach((line, index) => {
      animate(line, [
        { transform: "translate3d(-5%, 112%, 0) scale(0.84, 1.25) skewY(5deg)" },
        { transform: "translate3d(0, -4%, 0) scale(1, 0.97)", offset: 0.76 },
        { transform: "translate3d(0, 0, 0) scale(1)" },
      ], 1200, 620 + index * 140);
    });

    main.querySelectorAll(".hero-content > :not(.hero-title)").forEach((element, index) => {
      animate(element, [
        { translate: "0 24px", clipPath: mask },
        { translate: "0 0", clipPath: openMask },
      ], 760, 940 + index * 90);
    });
  }

  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      observer.unobserve(entry.target);
      pending.get(entry.target)?.();
      pending.delete(entry.target);
    }
  }, { rootMargin: "0px 0px 8% 0px", threshold: 0.01 });

  const schedules = [
    [".work-experience", ".work-title > p", ".work-title h2, .work-visual"],
    ["#projects", ".section-display-title", ".section-heading, .project-card"],
    ["#workflow", ".section-display-title", ".workflow-copy, .workflow-image-link, .workflow-steps article"],
    ["#contact", ".section-display-title", ".contact-copy, .contact-panel"],
  ];

  function queueRise(element, distance, duration, delay) {
    // Keep content visible until the observer starts its entrance.
    pending.set(element, () => animate(element, [
      { translate: `0 ${distance}px`, opacity: 0 },
      { translate: "0 0", opacity: 1 },
    ], duration, delay, riseEase));
    observer.observe(element);
  }

  for (const [sectionSelector, titleSelector, itemSelector] of schedules) {
    const section = main.querySelector(sectionSelector);
    queueRise(section.querySelector(titleSelector), 28, 700, 0);

    section.querySelectorAll(itemSelector).forEach((element, index) => {
      const media = element.matches(".work-visual, .workflow-image-link, .project-card");
      queueRise(element, media ? 36 : 24, media ? 820 : 720, 100 + index * 65);
    });
  }

  // Reveal the biography in reading order instead of animating it as one block.
  const biography = main.querySelector(".work-copy");
  const biographyRows = biography.querySelectorAll(
    ":scope > .eyebrow, :scope > h2, :scope > p:not(.eyebrow), .work-info > div, .work-stats, .work-tags"
  );
  biographyRows.forEach((element, index) => {
    queueRise(element, 16, 650, index * 120);
  });

  function showFocusedContent(event) {
    for (const element of pending.keys()) {
      if (element.contains(event.target)) {
        observer.unobserve(element);
        pending.delete(element);
      }
    }

    for (const [element, animation] of active) {
      if (element === opening || element.contains(event.target)) {
        animation.cancel();
        active.delete(element);
      }
    }
  }

  function stop() {
    observer.disconnect();
    for (const animation of active.values()) animation.cancel();
    active.clear();
    pending.clear();
  }

  function onPreferenceChange(event) {
    if (event.matches) stop();
  }

  document.addEventListener("focusin", showFocusedContent);
  preference.addEventListener("change", onPreferenceChange);
  return () => {
    document.removeEventListener("focusin", showFocusedContent);
    preference.removeEventListener("change", onPreferenceChange);
    stop();
  };
}
