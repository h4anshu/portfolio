export interface ProjectData {
  id: string;
  title: string;
  subtitle: string;
  type: "dash" | "ml" | "sql" | "py";
  filterLabel: string;
  badge: string;
  badgeColor: "teal" | "purple" | "blue" | "amber";
  specialBadge?: string;
  tags: string[];
  description: string;
  metric: { number: string; label: string };
  secondaryMetrics: string[];
  process: string[];
  image: string;
  github: string;
  live?: string;
}

export const projects: ProjectData[] = [
  {
    id: "ecommerce",
    title: "E-Commerce Sales Analysis",
    subtitle: "End-to-end ETL pipeline · SQL analytics · Power BI dashboard",
    type: "dash",
    filterLabel: "Dashboard",
    badge: "DASHBOARD",
    badgeColor: "teal",
    tags: ["Python", "SQL · MySQL", "Power BI", "DAX", "SQLAlchemy", "Pandas", "ETL"],
    description:
      "Designed and automated an end-to-end ETL pipeline using Python and SQLAlchemy to ingest 7 CSV datasets — 99,441 customers and 103K+ orders — into MySQL with transaction rollback, logging, and data quality validation.",
    metric: { number: "₹16.01M", label: "revenue tracked" },
    secondaryMetrics: ["103K+ records", "12+ SQL queries", "12+ KPIs"],
    process: [
      "Data ingestion",
      "Cleansing & validation",
      "SQL analytics",
      "Business insights",
      "Dashboard delivery",
    ],
    image: "/images/ecommerce-dashboard.webp",
    github: "https://github.com/h4anshu/E-Commerce-Analysis",
  },
  {
    id: "agripredict",
    title: "AgriPredict — Crop Yield Intelligence",
    subtitle: "Multi-source ML framework · 29 states · 22 crops · 24 years of data",
    type: "ml",
    filterLabel: "ML Model",
    badge: "ML MODEL",
    badgeColor: "purple",
    specialBadge: "🏆 Best Paper · ADG 2026",
    tags: ["Extra Trees", "XGBoost", "Scikit-learn", "Python", "Feature Engineering", "Streamlit"],
    description:
      "Authored and presented a multi-source ML framework for crop yield prediction across 29 Indian states and 22 crops over 24 years — achieving R²=0.9506. Awarded Best Paper at ADG 2026 Conference.",
    metric: { number: "R²=0.9506", label: "model accuracy" },
    secondaryMetrics: ["29 Indian states", "22 crop types", "24 years of data"],
    process: [
      "Data collection",
      "Feature engineering",
      "Model training",
      "Evaluation",
      "Streamlit deployment",
    ],
    image: "/images/cropyield-app.webp",
    github: "https://github.com/h4anshu/Predicting-Crop-Yield-Using-Soil-and-Weather-Data",
    live: "https://predicting-crop-yield-using-soil-an.vercel.app/",
  },
  {
    id: "hospital",
    title: "Hospital Management Analytics",
    subtitle: "Star schema modeling · 20+ DAX measures · Multi-page dashboards",
    type: "dash",
    filterLabel: "Dashboard",
    badge: "DASHBOARD",
    badgeColor: "teal",
    tags: ["Power BI", "DAX", "Power Query", "Star Schema", "Excel", "Data Modeling"],
    description:
      "Integrated 16 hospital datasets into a unified star schema data model. Engineered 20+ DAX measures including time intelligence and dynamic KPI tracking across 10+ healthcare performance indicators.",
    metric: { number: "16", label: "datasets integrated" },
    secondaryMetrics: ["20+ DAX measures", "10+ KPIs tracked"],
    process: [
      "Multi-source integration",
      "Star schema design",
      "DAX engineering",
      "Dashboard delivery",
      "Executive reporting",
    ],
    image: "/images/hospital-dashboard.webp",
    github: "https://github.com/h4anshu/Hospital-Management-Analytics-Dashboard",
  },
  {
    id: "superstore",
    title: "Superstore Sales & Profitability",
    subtitle: "RFM segmentation · ABC analysis · Profit leakage identification",
    type: "dash",
    filterLabel: "Dashboard",
    badge: "DASHBOARD",
    badgeColor: "teal",
    tags: ["Excel", "Pivot Tables", "RFM Segmentation", "ABC Analysis", "KPI Dashboard"],
    description:
      "Conducted profitability analysis on 9,994 transactions (₹22.97L revenue) — identifying ₹1.56L profit leakage and quantifying ₹21.6L revenue exposure across 590 at-risk customers.",
    metric: { number: "₹22.97L", label: "revenue analyzed" },
    secondaryMetrics: ["9,994 transactions", "590 at-risk customers"],
    process: [
      "Profitability analysis",
      "RFM segmentation",
      "ABC analysis",
      "Recommendations",
      "Executive dashboard",
    ],
    image: "/images/superstore-dashboard.webp",
    github: "https://github.com/h4anshu/Superstore-Sales-analysis",
  },
  {
    id: "flight",
    title: "Flight Delay Prediction",
    subtitle: "Large-scale binary classification · 481K+ records · Business impact analysis",
    type: "ml",
    filterLabel: "ML Model",
    badge: "ML MODEL",
    badgeColor: "purple",
    tags: ["Python", "XGBoost", "Scikit-learn", "Pandas", "Feature Engineering"],
    description:
      "Engineered 27 features from 481,895 flight records across 259 airports and 12 carriers. XGBoost achieved F1=0.687 and 98.1% precision, estimating ~$4.9M cost savings.",
    metric: { number: "~$4.9M", label: "est. cost savings" },
    secondaryMetrics: ["481K+ records", "27 features engineered"],
    process: [
      "Feature engineering",
      "Imbalance handling",
      "Model benchmarking",
      "Feature importance",
      "Impact analysis",
    ],
    image: "",
    github: "https://github.com/h4anshu/Flight-Delay-Predictor",
  },
  {
    id: "churn",
    title: "Bank Customer Churn Analysis",
    subtitle: "Multi-dimensional segmentation · Root cause analysis · KPI dashboard",
    type: "dash",
    filterLabel: "Dashboard",
    badge: "DASHBOARD",
    badgeColor: "teal",
    tags: ["Excel", "Power Query", "DAX", "Power BI", "Data Cleaning"],
    description:
      "Analyzed 10,000+ banking customer records across 18 attributes to identify key churn drivers and quantify $186.3M revenue at risk, delivering targeted retention strategies.",
    metric: { number: "$186.3M", label: "revenue at risk" },
    secondaryMetrics: ["10K+ records", "15+ KPI metrics"],
    process: [
      "Data profiling",
      "Segmentation",
      "Root cause analysis",
      "KPI dashboard",
      "Executive summary",
    ],
    image: "",
    github: "https://github.com/h4anshu/Bank-Customer-Churn-Analysis",
  },
];

export const badgeColors: Record<string, { text: string; bg: string }> = {
  teal: { text: "#5eead4", bg: "rgba(94, 234, 212, 0.12)" },
  purple: { text: "#AFA9EC", bg: "rgba(38, 33, 92, 0.8)" },
  blue: { text: "#85B7EB", bg: "rgba(4, 44, 83, 0.8)" },
  amber: { text: "#EF9F27", bg: "rgba(65, 36, 2, 0.8)" },
};
