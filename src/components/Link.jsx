export function navigate(href) {
  const url = new URL(href, window.location.origin);
  window.history.pushState({}, "", `${url.pathname}${url.search}${url.hash}`);
  window.dispatchEvent(new PopStateEvent("popstate"));

  requestAnimationFrame(() => {
    if (url.hash) {
      document.querySelector(url.hash)?.scrollIntoView();
    } else {
      window.scrollTo({ top: 0 });
    }
  });
}

export default function Link({ href, onClick, children, ...props }) {
  const handleClick = (event) => {
    onClick?.(event);
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }

    event.preventDefault();
    navigate(href);
  };

  return (
    <a href={href} onClick={handleClick} {...props}>
      {children}
    </a>
  );
}
