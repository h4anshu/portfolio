import { useEffect, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HoverLinks from "./HoverLinks";
import { gsap } from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { useLoading } from "../context/LoadingProvider";
import "./styles/Navbar.css";

gsap.registerPlugin(ScrollSmoother, ScrollTrigger);
export let smoother: ScrollSmoother;

const Navbar = () => {
  const { isLoading } = useLoading();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const isMobile = window.innerWidth < 768;

    smoother = ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: isMobile ? 1 : 1.7,
      speed: isMobile ? 1 : 1.7,
      effects: !isMobile,
      autoResize: true,
      ignoreMobileResize: true,
    });

    const savedScroll = sessionStorage.getItem("smoother-scroll");
    if (savedScroll) {
      // Use scrollTo with smooth=false to instantly jump without interpolating the transform
      smoother.scrollTo(parseInt(savedScroll, 10), false);
    } else {
      smoother.scrollTo(0, false);
    }

    // Web fonts swapping in after ScrollSmoother's initial measurement shift
    // page height without firing a resize event, leaving the smoother's
    // scroll range a few pixels short of the real content (bottom sentinel
    // stays permanently unreachable). Re-measure once fonts + full page load
    // have actually settled.
    Promise.all([
      document.fonts ? document.fonts.ready : Promise.resolve(),
      document.readyState === "complete"
        ? Promise.resolve()
        : new Promise<void>((resolve) =>
            window.addEventListener("load", () => resolve(), { once: true })
          ),
    ]).then(() => ScrollSmoother.refresh());

    if (isMobile) {
      // On mobile, no loading screen — immediately enable scrolling and show content
      document.body.style.overflowY = "auto";
      smoother.paused(false);
      document.getElementsByTagName("main")[0]?.classList.add("main-active");
      // Run initial text animations after a short delay
      import("./utils/initialFX").then((module) => {
        if (module.initialFX) {
          setTimeout(() => module.initialFX(), 300);
        }
      });
    } else {
      if (isLoading) {
        smoother.paused(true);
      } else {
        smoother.paused(false);
        document.body.style.overflowY = "auto";
        document.getElementsByTagName("main")[0]?.classList.add("main-active");
      }
    }

    let links = document.querySelectorAll(".header ul a");
    const handleClick = (e: Event) => {
      if (window.innerWidth > 1024) {
        const elem = e.currentTarget as HTMLAnchorElement;
        if (!elem.classList.contains("nav-resume-btn")) {
          e.preventDefault();
          const section = elem.getAttribute("data-href");
          smoother.scrollTo(section, true, "top top");
        }
      }
      setIsMenuOpen(false);
    };

    links.forEach((elem) => {
      elem.addEventListener("click", handleClick);
    });

    // Debounced: a full ScrollSmoother refresh re-measures every trigger.
    let resizeTimer: number | undefined;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => ScrollSmoother.refresh(true), 200);
      if (window.innerWidth > 768) setIsMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      links.forEach((elem) => elem.removeEventListener("click", handleClick));
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", handleResize);
      if (smoother) {
        // Save current scroll position before killing
        sessionStorage.setItem("smoother-scroll", smoother.scrollTop().toString());
        smoother.kill();
      }
    };
  }, []);
  return (
    <>
      <div className="header">
        <a href="/#" className="navbar-title" data-cursor="disable">
          <span className="logo-brace">{"{"}  </span>A<span className="logo-dot">.</span>M<span className="logo-brace">  {"}"}  </span>
        </a>
        <button
          type="button"
          className={`nav-toggle ${isMenuOpen ? "open" : ""}`}
          onClick={() => setIsMenuOpen((open) => !open)}
          aria-label="Toggle navigation menu"
          aria-expanded={isMenuOpen}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
        <div className={`nav-panel ${isMenuOpen ? "open" : ""}`}>
          <ul>
            <li>
              <a data-href="#about" href="#about">
                <HoverLinks text="ABOUT" />
              </a>
            </li>
            <li>
              <a data-href="#work" href="#work">
                <HoverLinks text="WORK" />
              </a>
            </li>
            <li>
              <a data-href="#contact" href="#contact">
                <HoverLinks text="CONTACT" />
              </a>
            </li>
            <li>
              <a href="/Data Analyst Intern.pdf" target="_blank" rel="noreferrer" className="nav-resume-btn">
                RESUME
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="landing-circle1"></div>
      <div className="landing-circle2"></div>
      <div className="nav-fade"></div>
    </>
  );
};

export default Navbar;
