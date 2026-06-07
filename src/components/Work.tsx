import { useState, useCallback } from "react";
import "./styles/Work.css";
import { MdArrowBack, MdArrowForward, MdArrowOutward } from "react-icons/md";
import { FaGithub } from "react-icons/fa";

interface ProjectData {
  title: string;
  subtitle: string;
  type: "dashboard" | "webapp" | "ml";
  tools: string[];
  description: string;
  kpis: { label: string; value: string }[];
  process: string[];
  domain: string[];
  image: string;
  github: string;
  live?: string;
}

const projects: ProjectData[] = [
  {
    title: "E-Commerce Sales Analysis",
    subtitle: "End-to-end ETL pipeline · SQL analytics · Power BI dashboard",
    type: "dashboard",
    tools: ["Python", "SQL · MySQL", "SQLAlchemy", "Power BI", "DAX", "Pandas", "ETL"],
    description:
      "Designed and automated an end-to-end ETL pipeline using Python and SQLAlchemy to ingest 7 CSV datasets — 99,441 customers and 103K+ orders — into MySQL with transaction rollback, logging, and data quality validation. Wrote 12+ complex SQL queries using CTEs, Window Functions, and multi-table JOINs to uncover key business insights.",
    kpis: [
      { label: "Revenue tracked", value: "₹16.01M" },
      { label: "Records analyzed", value: "103K+" },
      { label: "SQL queries", value: "12+" },
      { label: "KPIs dashboarded", value: "12+" },
    ],
    process: [
      "Data ingestion",
      "Cleansing & validation",
      "SQL analytics",
      "Business insights",
      "Dashboard delivery",
    ],
    domain: ["E-commerce", "Retail analytics", "Customer behaviour", "Logistics"],
    image: "/images/ecommerce-dashboard.png",
    github: "https://github.com/h4anshu/E-Commerce-Analysis",
  },
  {
    title: "Hospital Management Analytics Dashboard",
    subtitle: "Star schema modeling · 20+ DAX measures · Multi-page interactive dashboards",
    type: "dashboard",
    tools: ["Power BI", "DAX", "Power Query (M)", "Star Schema", "Excel", "Data Modeling"],
    description:
      "Integrated 16 hospital datasets into a unified star schema data model using Power BI relationships and Power Query (M Query) transformations — consolidating patient flow, billing, prescriptions, and doctor availability data across 6 structured tables for scalable, production-ready reporting. Engineered 20+ DAX measures including time intelligence, calculated columns, and dynamic KPI tracking across 10+ healthcare performance indicators. Developed 2 interactive multi-page dashboards with dynamic slicers, drill-throughs, and executive scorecards.",
    kpis: [
      { label: "Datasets integrated", value: "16" },
      { label: "DAX measures", value: "20+" },
      { label: "KPIs tracked", value: "10+" },
      { label: "Dashboard pages", value: "2" },
    ],
    process: [
      "Multi-source integration",
      "Star schema design",
      "DAX engineering",
      "Visual dashboard delivery",
      "Executive reporting",
    ],
    domain: ["Healthcare analytics", "Hospital operations", "Patient management", "Clinical BI"],
    image: "/images/hospital-dashboard.png",
    github: "https://github.com/h4anshu/Hospital-Management-Analytics-Dashboard",
  },
  {
    title: "Crop Yield Prediction System",
    subtitle: "Multi-source ML pipeline · Ensemble learning · Real-time Streamlit deployment",
    type: "ml",
    tools: ["Python", "Scikit-Learn", "XGBoost", "Extra Trees", "Streamlit", "Pandas", "Feature Engineering", "Temporal Validation"],
    description:
      "Merged 3 multi-source datasets — crop production statistics, soil nutrient parameters (ICAR), and NASA meteorological variables — into a unified ML pipeline covering 19,689 records across 55 crops, 30 states, and 24 years (1997–2020). Applied domain-driven feature engineering expanding inputs from 9 to 38 features. Benchmarked 4 regression models under strict chronological temporal validation — Extra Trees Regressor achieved R²=0.951 and MAE=1.00 t/ha. Deployed an interactive Streamlit app for real-time yield prediction with feature importance analysis. This project forms the basis of a peer-reviewed research manuscript currently in preparation.",
    kpis: [
      { label: "Model R²", value: "0.951" },
      { label: "MAE", value: "1.00 t/ha" },
      { label: "Records", value: "19,689" },
      { label: "Features engineered", value: "38" },
    ],
    process: [
      "Multi-source data integration",
      "Feature engineering",
      "Model benchmarking",
      "Temporal validation",
      "Streamlit deployment",
    ],
    domain: ["Precision agriculture", "Food security", "Climate-resilient farming", "ML research"],
    image: "/images/cropyield-app.png",
    github: "https://github.com/h4anshu/Predicting-Crop-Yield-Using-Soil-and-Weather-Data",
    live: "https://predicting-crop-yield-using-soil-an.vercel.app/",
  },
  {
    title: "Superstore Sales & Profitability Analysis",
    subtitle: "RFM segmentation · ABC analysis · Profit leakage identification · Executive dashboard",
    type: "dashboard",
    tools: ["Excel", "Pivot Tables", "RFM Segmentation", "ABC Analysis", "COUNTIFS", "KPI Dashboard"],
    description:
      "Conducted an in-depth profitability analysis on 9,994 transactions (₹22.97L revenue) for a consumer goods retailer — identifying ₹1.56L profit leakage driven by aggressive discounting (–78% vs 34% full-price margin) and quantifying ₹21.6L revenue exposure across 590 at-risk customers. Applied RFM segmentation and ABC analysis revealing that the top 50% of customers drive 80% of revenue and Q4 contributes 45% of annual sales. Developed strategic recommendations across pricing optimization, customer retention, and category management with ₹1.9L–2.5L improvement potential. Built an executive dashboard with 7 pivot tables consolidating profitability metrics, customer segmentation, and seasonal trends.",
    kpis: [
      { label: "Transactions", value: "9,994" },
      { label: "Revenue analyzed", value: "₹22.97L" },
      { label: "Profit leakage", value: "₹1.56L" },
      { label: "At-risk customers", value: "590" },
    ],
    process: [
      "Profitability analysis",
      "RFM segmentation",
      "ABC analysis",
      "Strategic recommendations",
      "Executive dashboard",
    ],
    domain: ["Retail analytics", "Consumer goods", "Pricing strategy", "Customer segmentation"],
    image: "/images/superstore-dashboard.png",
    github: "https://github.com/h4anshu/Superstore-Sales-analysis",
  },
  {
    title: "Flight Delay Prediction",
    subtitle: "Large-scale binary classification · Class imbalance handling · Business impact analysis",
    type: "ml",
    tools: ["Python", "Scikit-Learn", "XGBoost", "Pandas", "Matplotlib", "Seaborn", "Feature Engineering", "Class Imbalance Handling"],
    description:
      "Engineered 27 features — temporal, carrier, route, and distance-based — from 481,895 flight records across 259 airports, 12 carriers, and 3,340 routes. Applied time-based train/test split and scale_pos_weight to handle a severe 97.3% class imbalance without data leakage or synthetic oversampling. Benchmarked Logistic Regression, Random Forest, and XGBoost — XGBoost achieved the best performance with F1-score of 0.687 and 98.1% precision, identifying IsLongFlight, Dest_DelayRate, and Carrier_DelayRate as the top predictive features via feature importance analysis. Conducted a business impact analysis estimating ~$4.9M cost savings over a naive baseline through optimized binary classification of flight delays.",
    kpis: [
      { label: "Records analyzed", value: "481,895" },
      { label: "F1-Score", value: "0.687" },
      { label: "Precision", value: "98.1%" },
      { label: "Cost savings", value: "~$4.9M" },
      { label: "Features eng.", value: "27" },
      { label: "Class imbalance", value: "97.3%" },
    ],
    process: [
      "Feature engineering",
      "Class imbalance handling",
      "Model benchmarking",
      "Feature importance analysis",
      "Business impact analysis",
    ],
    domain: ["Aviation analytics", "Predictive ML", "Binary classification", "Operations research"],
    image: "",
    github: "https://github.com/h4anshu/Flight-Delay-Predictor",
  },
  {
    title: "Bank Customer Churn Analysis",
    subtitle: "Multi-dimensional segmentation · Root cause analysis · KPI dashboard",
    type: "dashboard",
    tools: ["Excel", "Pivot Tables", "COUNTIFS", "AVERAGEIF", "KPI Dashboard", "Segmentation"],
    description:
      "Analyzed 10,000+ banking customer records across 18 attributes using Excel pivot tables, COUNTIFS/AVERAGEIF formulas, and multi-dimensional segmentation to identify key churn drivers and quantify $186.3M revenue at risk. Conducted geographic and behavioral root cause analysis revealing that Germany's churn rate is 2x higher than France (32.4% vs 16.2%), inactive members face 2.6x higher attrition risk, and complaint history correlates with 99.51% churn — delivering targeted retention strategies and remediation recommendations. Built an interactive KPI dashboard with 15+ metrics tracking customer segmentation by card type, balance category, and geography — documented in an executive summary for stakeholder presentation and data-driven business decision support.",
    kpis: [
      { label: "Records analyzed", value: "10,000+" },
      { label: "Revenue at risk", value: "$186.3M" },
      { label: "KPI metrics", value: "15+" },
      { label: "Churn correlation", value: "99.51%" },
    ],
    process: [
      "Data profiling",
      "Multi-dimensional segmentation",
      "Root cause analysis",
      "KPI dashboard",
      "Executive summary",
    ],
    domain: ["Financial services", "Banking", "Customer retention", "Churn analytics"],
    image: "",
    github: "https://github.com/h4anshu/Bank-Customer-Churn-Analysis",
  },
];

const Work = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [imageZoomed, setImageZoomed] = useState(false);

  const goToSlide = useCallback(
    (index: number) => {
      if (isAnimating) return;
      setIsAnimating(true);
      setCurrentIndex(index);
      setImageZoomed(false);
      setTimeout(() => setIsAnimating(false), 500);
    },
    [isAnimating]
  );

  const goToPrev = useCallback(() => {
    const newIndex =
      currentIndex === 0 ? projects.length - 1 : currentIndex - 1;
    goToSlide(newIndex);
  }, [currentIndex, goToSlide]);

  const goToNext = useCallback(() => {
    const newIndex =
      currentIndex === projects.length - 1 ? 0 : currentIndex + 1;
    goToSlide(newIndex);
  }, [currentIndex, goToSlide]);

  const project = projects[currentIndex];

  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        {/* Header */}
        <div className="work-header">
          <h2>
            My <span>Work</span>
          </h2>
          {projects.length > 1 && (
            <div className="work-nav">
              <button
                className="work-arrow"
                onClick={goToPrev}
                data-cursor="disable"
              >
                <MdArrowBack />
              </button>
              <span className="work-counter">
                {String(currentIndex + 1).padStart(2, "0")} /{" "}
                {String(projects.length).padStart(2, "0")}
              </span>
              <button
                className="work-arrow"
                onClick={goToNext}
                data-cursor="disable"
              >
                <MdArrowForward />
              </button>
            </div>
          )}
        </div>

        {/* Project Card */}
        <div className="work-card">
          {/* Left: Info */}
          <div className="work-info">
            {/* Type badge */}
            <div className="work-type-badge">
              {project.type === "dashboard" && "📊 Dashboard"}
              {project.type === "webapp" && "🌐 Web App"}
              {project.type === "ml" && "🤖 ML Model"}
            </div>

            <h3 className="work-title">{project.title}</h3>
            <p className="work-subtitle">{project.subtitle}</p>

            {/* Tools */}
            <div className="work-tools">
              {project.tools.map((tool, i) => (
                <span key={i} className="work-tool-tag">
                  {tool}
                </span>
              ))}
            </div>

            {/* Description */}
            <p className="work-desc">{project.description}</p>

            {/* KPIs */}
            <div className="work-kpis">
              {project.kpis.map((kpi, i) => (
                <div key={i} className="work-kpi">
                  <span className="work-kpi-label">{kpi.label}</span>
                  <span className="work-kpi-value">{kpi.value}</span>
                </div>
              ))}
            </div>

            {/* Process */}
            <div className="work-process">
              <span className="work-process-label">Process:</span>
              {project.process.map((step, i) => (
                <span key={i} className="work-process-step">
                  {step}
                  {i < project.process.length - 1 && " → "}
                </span>
              ))}
            </div>

            {/* Domain */}
            <div className="work-domain">
              <span className="work-process-label">Domain:</span>
              {project.domain.map((d, i) => (
                <span key={i} className="work-domain-tag">
                  {d}
                </span>
              ))}
            </div>

            {/* Links */}
            <div className="work-links">
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                className="work-link-btn work-link-github"
                data-cursor="disable"
              >
                <FaGithub /> View Source
              </a>
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noreferrer"
                  className="work-link-btn work-link-live"
                  data-cursor="disable"
                >
                  Live Demo <MdArrowOutward />
                </a>
              )}
            </div>
          </div>

          {/* Right: Dashboard Image */}
          {project.image && (
            <div
              className={`work-image-box ${imageZoomed ? "work-image-zoomed" : ""}`}
              onClick={() => setImageZoomed(!imageZoomed)}
            >
              <img
                src={project.image}
                alt={project.title}
                className={`work-image ${project.image.includes("superstore") ? "superstore-crop" : ""}`}
                loading="lazy"
              />
              <div className="work-image-hint">
                {imageZoomed ? "Click to shrink" : "Click to expand"}
              </div>
            </div>
          )}
        </div>

        {/* Dots */}
        {projects.length > 1 && (
          <div className="work-dots">
            {projects.map((_, i) => (
              <button
                key={i}
                className={`work-dot ${i === currentIndex ? "work-dot-active" : ""}`}
                onClick={() => goToSlide(i)}
                data-cursor="disable"
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Work;
