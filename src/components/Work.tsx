import { Link } from "react-router-dom";
import { FaGithub } from "react-icons/fa";
import { MdArrowOutward } from "react-icons/md";
import { projects, badgeColors } from "../data/projectData";
import "./styles/Work.css";

const MAX_TAGS = 4;
const featuredProjects = projects.slice(0, 2);

const Work = () => {
  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2 className="work-heading">
          MY <span>WORK</span>
        </h2>
        <p className="work-subtitle">
          A few things I've built — from raw data to real decisions.
        </p>

        <div className="work-grid">
          {featuredProjects.map((project) => {
            const badge = badgeColors[project.badgeColor];
            const visibleTags = project.tags.slice(0, MAX_TAGS);
            const overflowCount = project.tags.length - MAX_TAGS;

            return (
              <div className="featured-card" key={project.id}>
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
                    <div className="card-thumb-placeholder">
                      {project.title}
                    </div>
                  )}

                  {/* Badges */}
                  <div className="card-badges">
                    {project.specialBadge && (
                      <span className="card-award-badge">
                        {project.specialBadge}
                      </span>
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
                  <p className="card-desc">{project.subtitle}</p>

                  {/* Tags */}
                  <div className="card-tags">
                    {visibleTags.map((tag, i) => (
                      <span className="card-tag" key={i}>
                        {tag}
                      </span>
                    ))}
                    {overflowCount > 0 && (
                      <span className="card-tag card-tag-overflow">
                        +{overflowCount}
                      </span>
                    )}
                  </div>

                  {/* Metric */}
                  <div className="card-metric-row">
                    <span className="card-metric-number">
                      {project.metric.number}
                    </span>
                    <span className="card-metric-label">
                      {project.metric.label}
                    </span>
                  </div>
                  <p className="card-secondary">
                    {project.secondaryMetrics.join(" · ")}
                  </p>

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
          })}
        </div>

        {/* See All Button */}
        <div className="see-all-wrapper">
          <Link to="/work" className="see-all-btn" data-cursor="disable">
            See All Projects <span className="see-all-arrow">→</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Work;
