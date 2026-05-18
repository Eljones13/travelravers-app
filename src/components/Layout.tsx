// TRAVEL RAVERS: Root layout wrapper with Header and Footer
// Includes global scroll-to-top on every route change.
import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import FestivalContextBanner from "./FestivalContextBanner";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function Layout() {
  return (
    <>
      <ScrollToTop />
      <Header />
      <FestivalContextBanner />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
