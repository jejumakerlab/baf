"use client";

import { useState, useCallback } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ProcessSection from "@/components/ProcessSection";
import ViewerSection from "@/components/ViewerSection";
import Footer from "@/components/Footer";

export default function Home() {
  const [highContrast, setHighContrast] = useState(false);

  const toggleContrast = useCallback(() => {
    setHighContrast((prev) => !prev);
  }, []);

  return (
    <div className={highContrast ? "high-contrast" : ""}>
      <a href="#main-content" className="skip-link">
        본문으로 바로가기
      </a>

      <Header highContrast={highContrast} onToggleContrast={toggleContrast} />

      <main id="main-content" role="main">
        <HeroSection />
        <ProcessSection />
        <ViewerSection />
      </main>

      <Footer />
    </div>
  );
}
