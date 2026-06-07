import "./styles/About.css";

const About = () => {
  return (
    <div className="about-section" id="about">
      <div className="about-me">
        <h3 className="title">About Me</h3>

        {/* Hero statement */}
        <div className="about-hero">
          <span className="about-hero-line"></span>
          <p className="about-hero-text">
            Most data work ends at the dashboard.<br />
            <span className="about-highlight">Mine starts there.</span>
          </p>
        </div>

        {/* Bio paragraphs */}
        <div className="about-bio">
          <p>
            I'm <span className="about-name">Anshu</span> — a pre-final year CSE
            undergrad at BBDU Lucknow, working at the overlap of{" "}
            <span className="about-em">analytics</span> and{" "}
            <span className="about-em">machine learning</span>. I care about the
            full arc: from raw, messy inputs to insights that actually shift
            decisions. Not just pipelines that run — systems that mean something.
          </p>
          <p className="about-closing">
            I think carefully about what I build.
            <br />
            I think even more carefully about <span className="about-em">why it matters</span>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
