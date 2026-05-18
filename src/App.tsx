// TRAVEL RAVERS: Root router — all pages wired
// Pages are lazy-loaded for code splitting; only Layout/Header/Footer are eager.
import { lazy, Suspense, useState, type ReactNode } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Onboarding from "./components/Onboarding";
import { FestivalStoreProvider } from "./context/FestivalStoreContext";
import { FestivalFocusProvider } from "./context/FestivalFocusContext";

// ── Lazy page imports ─────────────────────────────────────────────────────────
const Index             = lazy(() => import("./pages/Index"));
const FestivalsPage     = lazy(() => import("./pages/FestivalsPage"));
const FestivalDetailPage= lazy(() => import("./pages/FestivalDetailPage"));
const GuidesPage        = lazy(() => import("./pages/GuidesPage"));
const GuideDetailPage   = lazy(() => import("./pages/GuideDetailPage"));
const GearPage          = lazy(() => import("./pages/GearPage"));
const FestivalGearPage  = lazy(() => import("./pages/FestivalGearPage"));
const TravelPage        = lazy(() => import("./pages/TravelPage"));
const SafetyPage        = lazy(() => import("./pages/SafetyPage"));
const MusicPage         = lazy(() => import("./pages/MusicPage"));
const MerchPage         = lazy(() => import("./pages/MerchPage"));
const MerchDetailPage   = lazy(() => import("./pages/MerchDetailPage"));
const AboutPage         = lazy(() => import("./pages/AboutPage"));
const ContactPage       = lazy(() => import("./pages/ContactPage"));
const AppPage           = lazy(() => import("./pages/AppPage"));
const DemoPage          = lazy(() => import("./pages/DemoPage"));
const InstallPage       = lazy(() => import("./pages/InstallPage"));
const CalendarPage      = lazy(() => import("./pages/CalendarPage"));
const TimetablePage     = lazy(() => import("./pages/TimetablePage"));
const MyWeekendsPage    = lazy(() => import("./pages/MyWeekendsPage"));
const NotFound          = lazy(() => import("./pages/NotFound"));

// Blog pages
const BlogListPage          = lazy(() => import("./pages/blogs/BlogListPage"));
const AmazonGamesGuide      = lazy(() => import("./pages/blogs/AmazonGamesGuide"));
const RaveMakeupGuide       = lazy(() => import("./pages/blogs/RaveMakeupGuide"));
const BestFestivalOutfits   = lazy(() => import("./pages/blogs/BestFestivalOutfits"));
const BestLuggage           = lazy(() => import("./pages/blogs/BestLuggage"));
const BluetoothAirTagsGuide = lazy(() => import("./pages/blogs/BluetoothAirTagsGuide"));
const CroatiaFestivalGuide  = lazy(() => import("./pages/blogs/CroatiaFestivalGuide"));
const BestFestivalTents     = lazy(() => import("./pages/blogs/BestFestivalTents"));
const BestPowerBanks        = lazy(() => import("./pages/blogs/BestPowerBanks"));
const FirstTimeFestivalGuide = lazy(() => import("./pages/blogs/FirstTimeFestivalGuide"));
const DevFestivalBrainPage  = lazy(() => import("./pages/DevFestivalBrainPage"));

// ── Route-level loading fallback ──────────────────────────────────────────────
function PageLoader() {
  return (
    <div
      className="min-h-[60vh] flex items-center justify-center"
      aria-label="Loading page"
      role="status"
    >
      <span className="font-display text-xs uppercase tracking-widest text-tr-cyan/50 animate-pulse">
        Loading…
      </span>
    </div>
  );
}

function OnboardingGate({ children }: { children: ReactNode }) {
  const [done, setDone] = useState(
    () => localStorage.getItem("tr_onboarding_completed") === "true"
  );
  if (!done) return <Onboarding onComplete={() => setDone(true)} />;
  return <>{children}</>;
}

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <FestivalStoreProvider>
    <FestivalFocusProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <HashRouter>
          <OnboardingGate>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route element={<Layout />}>
                <Route path="/" element={<Index />} />
                <Route path="/my-weekends" element={<MyWeekendsPage />} />
                <Route path="/festivals" element={<FestivalsPage />} />
                <Route path="/festivals/:slug" element={<FestivalDetailPage />} />
                <Route path="/guides" element={<GuidesPage />} />
                <Route path="/guides/:slug" element={<GuideDetailPage />} />
                <Route path="/gear" element={<GearPage />} />
                <Route path="/gear/:festivalSlug" element={<FestivalGearPage />} />
                <Route path="/travel" element={<TravelPage />} />
                <Route path="/safety" element={<SafetyPage />} />
                <Route path="/music" element={<MusicPage />} />
                <Route path="/merch" element={<MerchPage />} />
                <Route path="/merch/:slug" element={<MerchDetailPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/app" element={<AppPage />} />
                <Route path="/install" element={<InstallPage />} />
                <Route path="/demo" element={<DemoPage />} />
                <Route path="/calendar" element={<CalendarPage />} />
                <Route path="/timetable" element={<TimetablePage />} />
                <Route path="/blogs" element={<BlogListPage />} />
                <Route path="/blogs/amazon-games-guide" element={<AmazonGamesGuide />} />
                <Route path="/blogs/rave-makeup-guide" element={<RaveMakeupGuide />} />
                <Route path="/blogs/best-festival-outfits" element={<BestFestivalOutfits />} />
                <Route path="/blogs/best-luggage" element={<BestLuggage />} />
                <Route path="/blogs/bluetooth-airtags-guide" element={<BluetoothAirTagsGuide />} />
                <Route path="/blogs/croatia-festival-guide" element={<CroatiaFestivalGuide />} />
                <Route path="/blogs/best-festival-tents" element={<BestFestivalTents />} />
                <Route path="/blogs/best-power-banks" element={<BestPowerBanks />} />
                <Route path="/blogs/first-time-festival-guide" element={<FirstTimeFestivalGuide />} />
                <Route path="/dev/festival-brain" element={<DevFestivalBrainPage />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
          </OnboardingGate>
        </HashRouter>
      </TooltipProvider>
    </FestivalFocusProvider>
    </FestivalStoreProvider>
  </QueryClientProvider>
);

export default App;
