import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { FaGithub } from "react-icons/fa";
import { MdArrowOutward } from "react-icons/md";
import { projects, badgeColors, ProjectData } from "../data/projectData";
import "./WorkPage.css";

const MAX_TAGS = 4;

const filterOptions = [
  { label: "All", value: "all" },
  { label: "Dashboard", value: "dash" },
  { label: "ML Model", value: "ml" },
  { label: "SQL", value: "sql" },
  { label: "Python", value: "py" },
];

const WorkPage = () => {
  const [activeFilter, setActiveFilter] = useState("all");

  const filteredProjects = useMemo(() => {
    if (activeFilter === "all") return projects;
    return projects.filter((p) => p.type === activeFilter);
  }, [activeFilter]);

  const activeLabel =
    filterOptions.find((f) => f.value === activeFilter)?.label || "All";

  return (
    <div className="workpage">
      {/* Back Link */}
      <Link to="/" className="workpage-back" data-cursor="disable">
        ← Back
      </Link>

      {/* Header */}
      <div className="workpage-header">
        <span className="workpage-label">{"{ MY WORK }"}</span>
        <h1 className="workpage-title">
          {activeLabel} Projects{" "}
          <span className="workpage-count">({filteredProjects.length})</span>
        </h1>
        <p className="workpage-desc">
          From raw data to deployed systems — every project ships something
          real.
        </p>
      </div>

      {/* Filter Bar */}
      <div className="filter-bar">
        {filterOptions.map((filter) => (
          <button
            key={filter.value}
            className={`filter-pill ${
              activeFilter === filter.value ? "filter-pill-active" : ""
            }`}
            onClick={() => setActiveFilter(filter.value)}
            data-cursor="disable"
          >
            {filter.label}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="projects-grid">
        {filteredProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      {/* Footer */}
      <div className="workpage-footer">
        <p className="workpage-footer-text">Want to see more?</p>
        <a
          href="https://github.com/h4anshu"
          target="_blank"
          rel="noreferrer"
          className="workpage-github-link"
          data-cursor="disable"
        >
          View all repositories on GitHub ↗
        </a>
      </div>
    </div>
  );
};

function ProjectCard({ project }: { project: ProjectData }) {
  const badge = badgeColors[project.badgeColor];
  const visibleTags = project.tags.slice(0, MAX_TAGS);
  const overflowCount = project.tags.length - MAX_TAGS;

  return (
    <div className="project-card">
      {/* Thumbnail */}
      <div className="card-thumbnail">
        {project.image ? (
          <img
            src={project.image}
            alt={project.title}
            className="card-thumb-img"
            loading="lazy"
          />
        ) : (
          <div className="card-thumb-placeholder">{project.title}</div>
        )}

        <div className="card-badges">
          {project.specialBadge && (
            <span className="card-award-badge">{project.specialBadge}</span>
          )}
          <span
            className="card-badge"
            style={{ color: badge.text, background: badge.bg }}
          >
            {project.badge}
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="card-body">
        <h3 className="card-title">{project.title}</h3>
        <p className="card-desc">{project.description}</p>

        {/* Tags */}
        <div className="card-tags">
          {visibleTags.map((tag, i) => (
            <span className="card-tag" key={i}>
              {tag}
            </span>
          ))}
          {overflowCount > 0 && (
            <span className="card-tag card-tag-overflow">+{overflowCount}</span>
          )}
        </div>

        {/* Metric */}
        <div className="card-metric-row">
          <span className="card-metric-number">{project.metric.number}</span>
          <span className="card-metric-label">{project.metric.label}</span>
        </div>
        <p className="card-secondary">
          {project.secondaryMetrics.join(" · ")}
        </p>

        {/* Process Flow */}
        <div className="process-flow">
          {project.process.map((step, i) => (
            <span key={i} className="process-step-wrap">
              <span className="process-step">{step}</span>
              {i < project.process.length - 1 && (
                <span className="process-arrow">→</span>
              )}
            </span>
          ))}
        </div>

        {/* Footer */}
        <div className="card-footer">
          {project.live ? (
            <a
              href={project.live}
              target="_blank"
              rel="noreferrer"
              className="card-view-link"
              data-cursor="disable"
            >
              Live Demo <MdArrowOutward />
            </a>
          ) : (
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className="card-view-link"
              data-cursor="disable"
            >
              View Project →
            </a>
          )}
          <a
            href={project.github}
            target="_blank"
            rel="noreferrer"
            className="card-github-link"
            data-cursor="disable"
            aria-label="GitHub"
          >
            <FaGithub />
          </a>
        </div>
      </div>
    </div>
  );
}

export default WorkPage;
