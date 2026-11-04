export function startProjectHover(main) {
  const grid = main.querySelector('.project-grid');
  const cards = [...grid.querySelectorAll('.project-card')];
  const hover = matchMedia('(hover: hover) and (pointer: fine)');
  let selected = null;

  function reset() {
    selected = null;
    for (const card of cards) {
      card.style.removeProperty('--card-shift');
      card.style.removeProperty('--card-scale');
      card.classList.remove('is-expanded');
    }
  }

  function expand(card) {
    if (card === selected) return;
    reset();
    if (!card || !hover.matches) return;
    const row = cards.filter(item => Math.abs(item.offsetTop - card.offsetTop) < 2);
    if (row.length < 2) return;
    selected = card;
    const extraWidth = card.offsetWidth * 0.1;
    const otherWidth = row.reduce((sum, item) => sum + (item === card ? 0 : item.offsetWidth), 0);
    const shrink = 1 - extraWidth / otherWidth;
    let shift = 0;
    for (const item of row) {
      const scale = item === card ? 1.1 : shrink;
      item.style.setProperty('--card-shift', `${shift}px`);
      item.style.setProperty('--card-scale', scale);
      item.classList.toggle('is-expanded', item === card);
      shift += item.offsetWidth * (scale - 1);
    }
  }

  function onPointerMove(event) {
    if (event.pointerType === 'touch') return;
    // Keep the active card selected throughout its enlarged visual bounds.
    if (selected) {
      const rect = selected.getBoundingClientRect();
      if (event.clientX >= rect.left && event.clientX <= rect.right &&
          event.clientY >= rect.top && event.clientY <= rect.bottom) return;
    }
    const card = event.target.closest('.project-card');
    if (card && grid.contains(card)) expand(card);
  }
  function onFocus(event) { expand(event.target.closest('.project-card')); }
  function onBlur(event) { if (!grid.contains(event.relatedTarget)) reset(); }
  grid.addEventListener('pointermove', onPointerMove);
  grid.addEventListener('pointerleave', reset);
  grid.addEventListener('focusin', onFocus);
  grid.addEventListener('focusout', onBlur);
  const observer = new ResizeObserver(reset);
  observer.observe(grid);
  hover.addEventListener('change', reset);
  return () => {
    reset(); observer.disconnect();
    grid.removeEventListener('pointermove', onPointerMove);
    grid.removeEventListener('pointerleave', reset);
    grid.removeEventListener('focusin', onFocus);
    grid.removeEventListener('focusout', onBlur);
    hover.removeEventListener('change', reset);
  };
}
