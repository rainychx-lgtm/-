import { lazy, Suspense, useEffect, useMemo, useState } from "react";
import { caseBySlug } from "./data/cases";

const HomePage = lazy(() => import("./pages/HomePage"));
const CasePage = lazy(() => import("./pages/CasePage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));

function getRoute() {
  const path = window.location.pathname.replace(/\/+$/, "") || "/";
  if (path === "/") return { type: "home" };
  const match = path.match(/^\/case\/([^/]+)$/);
  if (match && caseBySlug[match[1]]) return { type: "case", item: caseBySlug[match[1]] };
  return { type: "not-found" };
}

export default function App() {
  const [locationKey, setLocationKey] = useState(() => window.location.href);
  const route = useMemo(getRoute, [locationKey]);

  useEffect(() => {
    const handleNavigation = () => setLocationKey(window.location.href);
    window.addEventListener("popstate", handleNavigation);
    return () => window.removeEventListener("popstate", handleNavigation);
  }, []);

  useEffect(() => {
    const title = route.type === "case" ? `${route.item.title}｜柴华鑫作品集` : route.type === "home" ? "柴华鑫｜体验设计师作品集" : "页面未找到｜柴华鑫作品集";
    document.title = title;
  }, [route]);

  return (
    <Suspense fallback={<div className="route-loading" role="status">正在加载页面…</div>}>
      {route.type === "home" && <HomePage />}
      {route.type === "case" && <CasePage item={route.item} />}
      {route.type === "not-found" && <NotFoundPage />}
    </Suspense>
  );
}
