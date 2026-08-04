import { lazy, PropsWithChildren, Suspense, useEffect, useState, useRef } from "react";
import About from "./About";
import Career from "./Career";
import Certifications from "./Certifications";
import Contact from "./Contact";
import Cursor from "./Cursor";
import Landing from "./Landing";
import Navbar from "./Navbar";
import SocialIcons from "./SocialIcons";
import WhatIDo from "./WhatIDo";
import Work from "./Work";
import setSplitText from "./utils/splitText";

const TechStack = lazy(() => import("./TechStack"));

const TechStackWrapper = () => {
  const [shouldLoad, setShouldLoad] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: "600px" } // Start loading when 600px away
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} style={{ minHeight: "800px", width: "100%", position: "relative" }}>
      {shouldLoad ? (
        <Suspense fallback={<div style={{height: "100%", display: "flex", alignItems: "center", justifyContent: "center"}}>Loading Environment...</div>}>
          <TechStack />
        </Suspense>
      ) : null}
    </div>
  );
};

const MainContainer = ({ children }: PropsWithChildren) => {
  const [isDesktopView, setIsDesktopView] = useState<boolean>(
    window.innerWidth > 1024
  );
  const [isAtBottom, setIsAtBottom] = useState(false);

  const bottomSentinel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSplitText();
    setIsDesktopView(window.innerWidth > 1024);

    // Debounced: setSplitText re-splits every .para/.title into per-word nodes.
    let resizeTimer: number | undefined;
    const resizeHandler = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        setSplitText();
        setIsDesktopView(window.innerWidth > 1024);
      }, 200);
    };
    window.addEventListener("resize", resizeHandler);

    // Sentinel instead of a scroll listener that read scrollHeight every
    // event — that forced a synchronous layout on each of ScrollSmoother's
    // continuous scroll events.
    const observer = new IntersectionObserver(
      ([entry]) => setIsAtBottom(entry.isIntersecting),
      { rootMargin: "100px" }
    );
    if (bottomSentinel.current) observer.observe(bottomSentinel.current);

    return () => {
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", resizeHandler);
      observer.disconnect();
    };
  }, []);

  return (
    <div className="container-main">
      <Cursor />
      <Navbar />
      <SocialIcons />
      <div className={`scroll-indicator ${isAtBottom ? 'hidden' : ''}`} aria-hidden="true">
        <div className="scroll-mouse">
          <div className="scroll-dot"></div>
        </div>
        <span className="scroll-text">SCROLL</span>
      </div>
      {isDesktopView && children}
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <div className="container-main">
            <Landing>{!isDesktopView && children}</Landing>
            <About />
            <WhatIDo />
            <Career />
            <Certifications />
            <Work />
            <TechStackWrapper />
            <Contact />
            <div
              ref={bottomSentinel}
              aria-hidden="true"
              style={{ height: "1px" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainContainer;
