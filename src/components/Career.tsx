import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Lead Researcher</h4>
                <h5>ADG 2026 Conference</h5>
              </div>
              <h3>NOW</h3>
            </div>
            <p>
              Authored and presented a multi-source ML framework for crop yield prediction across 29 Indian states and 22 crops over 24 years — achieving R²=0.9506. Awarded Best Paper at ADG 2026.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Google Certified Analyst</h4>
                <h5>Coursera</h5>
              </div>
              <h3>2026</h3>
            </div>
            <p>
              Completed the Google Advanced Data Analytics Professional Certificate — a 7-course specialization covering Python, ML, statistical modeling, regression analysis, and predictive analytics.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Data & ML Projects</h4>
                <h5>Self-Initiated</h5>
              </div>
              <h3>2024–25</h3>
            </div>
            <p>
              Built 5 end-to-end projects across ML, BI, and NLP — analyzing 500K+ records, deploying a Streamlit app, and building Power BI dashboards tracking ₹16M+ in revenue.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>B.Tech — CSE</h4>
                <h5>BBDU, Lucknow</h5>
              </div>
              <h3>2023–27</h3>
            </div>
            <p>
              Pre-final year undergraduate in Computer Science Engineering, specializing in machine learning, data analytics, and research.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
