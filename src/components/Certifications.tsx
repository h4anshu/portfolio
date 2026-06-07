import { useEffect, useRef, useState } from "react";
import "./styles/Certifications.css";
import { MdArrowOutward } from "react-icons/md";

interface CertData {
  id: number;
  title: string;
  issuer: string;
  platform: string;
  date: string;
  xp: string;
  category: string;
  link: string;
}

const certs: CertData[] = [
  {
    id: 1,
    title: "Google Advanced Data Analytics",
    issuer: "Google",
    platform: "Coursera",
    date: "Jan 2026",
    xp: "+800 XP",
    category: "Analytics & ML",
    link: "https://coursera.org/share/d5f9d9e712c0934500c4284e7436245d",
  },
  {
    id: 2,
    title: "Data Visualisation: Empowering Business",
    issuer: "Tata",
    platform: "Forage",
    date: "Sep 2025",
    xp: "+400 XP",
    category: "Data Viz",
    link: "https://forage-uploads-prod.s3.amazonaws.com/completion-certificates/ifobHAoMjQs9s6bKS/MyXvBcppsW2FkNYCX_ifobHAoMjQs9s6bKS_68b9a39c675caa305d252d40_1757057955819_completion_certificate.pdf",
  },
  {
    id: 3,
    title: "Data Analytics Job Simulation",
    issuer: "Deloitte",
    platform: "Forage",
    date: "Dec 2025",
    xp: "+500 XP",
    category: "Analytics",
    link: "https://www.theforage.com/completion-certificates/9PBTqmSxAf6zZTseP/io9DzWKe3PTsiS6GG_9PBTqmSxAf6zZTseP_68b9a39c675caa305d252d40_1765263073097_completion_certificate.pdf",
  },
];

const Certifications = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={`cert-section section-container ${visible ? "cert-visible" : ""}`}
      ref={sectionRef}
    >
      <div className="cert-header">
        <h2>
          Achievements <span>Unlocked</span>
        </h2>
        <p className="cert-subtitle">
          Verified credentials from industry leaders
        </p>
      </div>

      <div className="cert-grid">
        {certs.map((cert, i) => (
          <div
            key={cert.id}
            className="cert-card"
            style={{ "--cert-delay": `${i * 0.2}s` } as React.CSSProperties}
          >
            {/* Glow ring behind icon */}
            <div className="cert-icon-wrap">
              <div className="cert-ring" />
              <div className="cert-icon">
                <span className="cert-icon-text">
                  {cert.issuer.charAt(0)}
                </span>
              </div>
            </div>

            {/* Achievement unlocked banner */}
            <div className="cert-unlocked-tag">ACHIEVEMENT UNLOCKED</div>

            {/* Title & issuer */}
            <h3 className="cert-title">{cert.title}</h3>
            <p className="cert-issuer">
              {cert.issuer} · {cert.platform}
            </p>

            {/* XP + Category */}
            <div className="cert-meta">
              <span className="cert-xp">{cert.xp}</span>
              <span className="cert-category">{cert.category}</span>
            </div>

            {/* Date */}
            <p className="cert-date">{cert.date}</p>

            {/* Credential link */}
            {cert.link !== "#" ? (
              <a
                href={cert.link}
                target="_blank"
                rel="noreferrer"
                className="cert-link"
                data-cursor="disable"
              >
                View Credential <MdArrowOutward />
              </a>
            ) : (
              <span className="cert-link cert-link-pending">
                Credential on file
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Certifications;
