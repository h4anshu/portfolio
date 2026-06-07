import { useState } from "react";
import "./styles/WhatIDo.css";

const pipelineData = [
  {
    id: 0,
    step: "01",
    title: "Extract & Transform",
    desc: "Building robust ETL pipelines to ingest, clean, and structure messy data into analysis-ready datasets.",
    tags: ["SQL & CTEs", "Python & Pandas", "ETL Pipelines", "Data Cleaning"],
  },
  {
    id: 1,
    step: "02",
    title: "Analyze & Visualize",
    desc: "Translating complex datasets into interactive dashboards and KPI frameworks that drive real business decisions.",
    tags: ["Power BI & DAX", "Tableau", "RFM Segmentation", "KPI Frameworks"],
  },
  {
    id: 2,
    step: "03",
    title: "Predict & Scale",
    desc: "Developing predictive models that hold up under real conditions. Best Paper Award, ADG 2026.",
    tags: ["Scikit-Learn", "XGBoost", "Feature Engineering", "NLP & TF-IDF"],
  },
];

const WhatIDo = () => {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <div className="whatIDO" id="what-i-do">
      {/* Left: Title */}
      <div className="what-left">
        <h2>
          DATA
          <br />
          <span className="what-accent">PIPELINE</span>
        </h2>
      </div>

      {/* Right: Pipeline Steps */}
      <div className="what-right">
        {pipelineData.map((step) => {
          const isActive = activeStep === step.id;
          return (
            <div
              key={step.id}
              className={`what-step ${isActive ? "what-step-active" : ""}`}
              onMouseEnter={() => setActiveStep(step.id)}
              onClick={() => setActiveStep(step.id)}
            >
              <div className="what-step-header">
                <span className="what-step-num">{step.step}</span>
                <h3>{step.title}</h3>
              </div>
              <div className="what-step-body">
                <p>{step.desc}</p>
                <div className="what-step-tags">
                  {step.tags.map((tag, idx) => (
                    <span key={idx} className="what-tag">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WhatIDo;
