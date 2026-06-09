import { useEffect } from "react";
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
        e.preventDefault();
        let elem = e.currentTarget as HTMLAnchorElement;
        let section = elem.getAttribute("data-href");
        smoother.scrollTo(section, true, "top top");
      }
    };

    links.forEach((elem) => {
      elem.addEventListener("click", handleClick);
    });

    const handleResize = () => {
      ScrollSmoother.refresh(true);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      links.forEach((elem) => elem.removeEventListener("click", handleClick));
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
        <div className="nav-panel">
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
