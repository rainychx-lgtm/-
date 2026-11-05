import { useEffect, useRef } from 'react';
import './SpecularPanel.css';

export default function SpecularPanel({ children, className = '', radius = 21, lineColor = '#ffffff', baseColor = '#525252', intensity = 1, idleIntensity = 0.35, shineSize = 10, shineFade = 34, thickness = 1.2, glow = 1, followMouse = true, proximity = 250 }) {
  const ref = useRef(null);
  useEffect(() => {
    const panel = ref.current;
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    let angle = -45, level = idleIntensity, targetAngle = angle, targetLevel = level, raf = 0;
    function paint() {
      raf = 0;
      const delta = ((targetAngle - angle + 540) % 360) - 180;
      angle += reduced.matches ? delta : delta * 0.16;
      level += reduced.matches ? targetLevel - level : (targetLevel - level) * 0.16;
      panel.style.setProperty('--sp-angle', `${angle}deg`);
      panel.style.setProperty('--sp-level', Math.min(1, level * intensity));
      if (Math.abs(delta) > 0.1 || Math.abs(targetLevel - level) > 0.001) raf = requestAnimationFrame(paint);
    }
    function wake() { if (!raf) raf = requestAnimationFrame(paint); }
    function move(event) {
      if (!followMouse || event.pointerType === 'touch') return;
      const r = panel.getBoundingClientRect();
      const x = event.clientX - (r.left + r.width / 2);
      const y = event.clientY - (r.top + r.height / 2);
      const distance = Math.hypot(Math.max(Math.abs(x) - r.width / 2, 0), Math.max(Math.abs(y) - r.height / 2, 0));
      const near = Math.max(0, 1 - distance / Math.max(1, proximity));
      targetAngle = near ? Math.atan2(y, x) * 180 / Math.PI + 90 : -45;
      targetLevel = idleIntensity + (1 - idleIntensity) * near;
      wake();
    }
    function leave() { targetAngle = -45; targetLevel = idleIntensity; wake(); }
    window.addEventListener('pointermove', move, { passive: true });
    document.documentElement.addEventListener('pointerleave', leave);
    paint();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', move);
      document.documentElement.removeEventListener('pointerleave', leave);
    };
  }, [followMouse, proximity, intensity, idleIntensity]);
  return <div ref={ref} className={`specular-panel ${className}`} style={{
    '--sp-radius': `${radius}px`, '--sp-color': lineColor, '--sp-base': baseColor,
    '--sp-width': `${thickness}px`, '--sp-size': `${shineSize / 2}deg`,
    '--sp-fade': `${shineSize / 2 + shineFade}deg`, '--sp-glow': glow,
  }}>
    <span className="specular-panel__rim" aria-hidden="true" />
    <span className="specular-panel__halo" aria-hidden="true" />
    {children}
  </div>;
}
