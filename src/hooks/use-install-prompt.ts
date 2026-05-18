// TRAVEL RAVERS: PWA install prompt hook
// Captures the browser's beforeinstallprompt event and provides a
// triggerInstall() function to show the native install dialog.
// canInstall is only true on mobile-ish devices so the banner
// never appears on desktop where install prompts are uncommon.
import { useEffect, useRef, useState } from "react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

interface UseInstallPromptResult {
  canInstall: boolean;
  triggerInstall: () => void;
}

function isMobileDevice(): boolean {
  if (typeof window === "undefined") return false;
  return (
    window.innerWidth < 768 ||
    /Mobile|Android|iPhone|iPad|iPod/i.test(navigator.userAgent)
  );
}

export function useInstallPrompt(): UseInstallPromptResult {
  const promptRef = useRef<BeforeInstallPromptEvent | null>(null);
  const [canInstall, setCanInstall] = useState(false);

  useEffect(() => {
    if (!isMobileDevice()) return;

    function handleBeforeInstallPrompt(e: Event) {
      e.preventDefault();
      promptRef.current = e as BeforeInstallPromptEvent;
      setCanInstall(true);
    }

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  function triggerInstall() {
    if (!promptRef.current) return;
    void promptRef.current.prompt();
    void promptRef.current.userChoice.then(() => {
      promptRef.current = null;
      setCanInstall(false);
    });
  }

  return { canInstall, triggerInstall };
}
