import { PropsWithChildren } from "react";
import { TbNotes } from "react-icons/tb";
import { smoother } from "./Navbar";
import "./styles/Landing.css";

const Landing = ({ children }: PropsWithChildren) => {
  const handleViewWork = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const workSection = document.getElementById("work");
    if (!workSection) return;
    try {
      if (smoother && !smoother.paused()) {
        smoother.scrollTo("#work", true, "top top");
      } else {
        workSection.scrollIntoView({ behavior: "smooth" });
      }
    } catch {
      workSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <div className="landing-section" id="landingDiv">
        <div className="landing-container">
          <div className="landing-intro">
            <h2>Hello! I'm</h2>
            <h1>
              ANSHU
              <br />
              <span>MISHRA</span>
            </h1>
          </div>
          <div className="landing-info">
            <h3>Data Analyst &amp;</h3>
            <h2 className="landing-info-h2">
              <div className="landing-h2-1">ML</div>
              <div className="landing-h2-2">Researcher</div>
            </h2>
            <h2>
              <div className="landing-h2-info">Researcher</div>
              <div className="landing-h2-info-1">ML</div>
            </h2>

            <div className="landing-buttons">
              <a href="#work" className="cta-button" onClick={handleViewWork} data-cursor="icons">
                View My Work &rarr;
              </a>
              <a
                href="/Data Analyst Intern.pdf"
                target="_blank"
                rel="noreferrer"
                className="hero-resume-button"
                data-cursor="icons"
              >
                <span className="resume-btn-text">RESUME</span>
                <span className="resume-btn-icon">
                  <TbNotes />
                </span>
              </a>
            </div>
          </div>
        </div>
        {children}
      </div>
    </>
  );
};

export default Landing;

