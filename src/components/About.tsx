import "./styles/About.css";

const About = () => {
  return (
    <div className="about-section" id="about">
      <div className="about-me">
        <h3 className="title">About Me</h3>

        {/* Hero statement */}
        <div className="about-hero">
          <p className="about-hero-text">
            Most data work ends at the dashboard.<br />
            <span className="about-highlight">Mine starts there.</span>
          </p>
        </div>

        {/* Single Panel Profile Card */}
        <div className="profile-card">
          <div className="profile-header">
            <div className="profile-avatar">AM</div>
            <div className="profile-info">
              <h4>Anshu Mishra</h4>
              <p>Data Analyst · ML Researcher · B.Tech CSE</p>
            </div>
            <div className="profile-badge">
              <span className="badge-dot"></span> OPEN TO WORK
            </div>
          </div>
          
          <div className="profile-body">
            <p>
              I'm <span className="about-name">Anshu</span> — a pre-final year CSE undergrad at BBDU Lucknow, working at the overlap of <span className="about-em">analytics</span> and <span className="about-em">machine learning</span>. I care about the full arc: from raw, messy inputs to insights that actually shift decisions. Not just pipelines that run — systems that mean something.
            </p>
          </div>

          <div className="profile-metrics-divider"></div>

          <div className="metrics-grid">
            <div className="metric-card">
              <span className="metric-label">PROJECTS</span>
              <span className="metric-value">7+</span>
            </div>
            <div className="metric-card">
              <span className="metric-label">RECORDS</span>
              <span className="metric-value">484K+</span>
            </div>
            <div className="metric-card">
              <span className="metric-label">RESEARCH</span>
              <span className="metric-value">1</span>
            </div>
            <div className="metric-card">
              <span className="metric-label">CERTS</span>
              <span className="metric-value">3</span>
            </div>
          </div>

          <div className="profile-metrics-divider"></div>

          <div className="profile-footer">
            <div className="about-closing">
              <p>I think carefully about what I build.</p>
              <p>I think even more carefully about <span className="about-em">why it matters.</span></p>
            </div>
            
            <div className="about-tech-pills">
              <span className="about-tech-pill">
                <img src="/images/python.webp" alt="Python" className="pill-icon" /> Python
              </span>
              <span className="about-tech-pill">
                <img src="/images/sql.webp" alt="SQL" className="pill-icon" /> SQL
              </span>
              <span className="about-tech-pill">
                <img src="/images/sklearn.webp" alt="ML" className="pill-icon" /> Machine Learning
              </span>
              <span className="about-tech-pill">
                <img src="/images/powerbi.webp" alt="Data" className="pill-icon" /> Data Analysis
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
