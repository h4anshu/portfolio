import { useEffect, useRef, useState } from "react";
import { MdCopyright } from "react-icons/md";
import {
  FaGithub,
  FaLinkedinIn,
  FaEnvelope,
  FaGraduationCap,
  FaFileAlt,
} from "react-icons/fa";
import "./styles/Contact.css";

interface NodeData {
  id: string;
  label: string;
  icon: React.ReactNode;
  link?: string;
  detail: string;
  x: number;
  y: number;
  download?: boolean;
}

const contactNodes: NodeData[] = [
  {
    id: "email",
    label: "Email",
    icon: <FaEnvelope />,
    link: "mailto:anshumish0606@gmail.com",
    detail: "anshumish0606@gmail.com",
    x: 18,
    y: 22,
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    icon: <FaLinkedinIn />,
    link: "https://www.linkedin.com/in/anshu-mishra-797165374/",
    detail: "anshu-mishra",
    x: 78,
    y: 18,
  },
  {
    id: "github",
    label: "GitHub",
    icon: <FaGithub />,
    link: "https://github.com/h4anshu",
    detail: "h4anshu",
    x: 85,
    y: 68,
  },
  {
    id: "education",
    label: "Education",
    icon: <FaGraduationCap />,
    detail: "B.Tech CSE — BBDU Lucknow (2023–27)",
    x: 12,
    y: 72,
  },
  {
    id: "resume",
    label: "Resume",
    icon: <FaFileAlt />,
    link: "/Data Analyst Intern.pdf",
    detail: "Download CV",
    x: 50,
    y: 85,
    download: true,
  },
];

const Contact = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeNode, setActiveNode] = useState<string | null>(null);
  // hasAppeared is sticky (entrance plays once); inView is live and gates both
  // the canvas loop and the infinite CSS float/pulse animations.
  const [hasAppeared, setHasAppeared] = useState(false);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
        if (entry.isIntersecting) setHasAppeared(true);
      },
      { threshold: 0.05 }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // Use a ref for activeNode so the animation loop doesn't restart on hover
  const activeNodeRef = useRef<string | null>(null);
  activeNodeRef.current = activeNode;

  // Canvas for animated connection lines — only runs while actually on screen
  useEffect(() => {
    if (!inView) return;

    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Size via ResizeObserver instead of getBoundingClientRect() per frame,
    // which forced a synchronous layout on every single frame.
    const resize = () => {
      const rect = container.getBoundingClientRect();
      canvas.width = Math.floor(rect.width);
      canvas.height = Math.floor(rect.height);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(container);

    let animFrame: number;
    let time = 0;

    const centerX = 50;
    const centerY = 48;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const cx = (centerX / 100) * canvas.width;
      const cy = (centerY / 100) * canvas.height;

      time += 0.015;

      contactNodes.forEach((node) => {
        const nx = (node.x / 100) * canvas.width;
        const ny = (node.y / 100) * canvas.height;

        const isActive = activeNodeRef.current === node.id;

        // Draw connection line
        ctx.beginPath();
        ctx.moveTo(cx, cy);

        const cpx = (cx + nx) / 2 + Math.sin(time + node.x) * 15;
        const cpy = (cy + ny) / 2 + Math.cos(time + node.y) * 15;
        ctx.quadraticCurveTo(cpx, cpy, nx, ny);

        ctx.strokeStyle = isActive
          ? "rgba(94, 234, 212, 0.8)"
          : "rgba(94, 234, 212, 0.15)";
        ctx.lineWidth = isActive ? 2.5 : 1;
        ctx.stroke();

        // Animated particle along the line
        if (isActive) {
          const particleT = (Math.sin(time * 3) + 1) / 2;
          const px =
            (1 - particleT) * (1 - particleT) * cx +
            2 * (1 - particleT) * particleT * cpx +
            particleT * particleT * nx;
          const py =
            (1 - particleT) * (1 - particleT) * cy +
            2 * (1 - particleT) * particleT * cpy +
            particleT * particleT * ny;

          ctx.beginPath();
          ctx.arc(px, py, 4, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(94, 234, 212, 1)";
          ctx.fill();

          ctx.beginPath();
          ctx.arc(px, py, 10, 0, Math.PI * 2);
          const grad = ctx.createRadialGradient(px, py, 2, px, py, 10);
          grad.addColorStop(0, "rgba(94, 234, 212, 0.5)");
          grad.addColorStop(1, "rgba(94, 234, 212, 0)");
          ctx.fillStyle = grad;
          ctx.fill();
        }

        // Subtle floating dots along idle lines
        for (let i = 0; i < 2; i++) {
          const t = ((time * 0.5 + i * 0.5 + node.x * 0.01) % 1);
          const dx =
            (1 - t) * (1 - t) * cx +
            2 * (1 - t) * t * cpx +
            t * t * nx;
          const dy =
            (1 - t) * (1 - t) * cy +
            2 * (1 - t) * t * cpy +
            t * t * ny;

          ctx.beginPath();
          ctx.arc(dx, dy, isActive ? 2 : 1.5, 0, Math.PI * 2);
          ctx.fillStyle = isActive
            ? "rgba(94, 234, 212, 0.7)"
            : "rgba(94, 234, 212, 0.2)";
          ctx.fill();
        }
      });

      animFrame = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(animFrame);
      ro.disconnect();
    };
  }, [inView]);

  return (
    <div
      className={`contact-section section-container ${
        hasAppeared ? "contact-visible" : ""
      } ${inView ? "contact-inview" : ""}`}
      id="contact"
      ref={containerRef}
    >
      {/* Canvas for SVG-like animated lines */}
      <canvas className="contact-canvas" ref={canvasRef} />

      {/* Section header */}
      <div className="contact-header">
        <h3>
          <span className="contact-brace">{"{"}</span> Get In Touch{" "}
          <span className="contact-brace">{"}"}</span>
        </h3>
      </div>

      {/* Center node — You */}
      <div className="node-center">
        <div className="node-center-ring" />
        <div className="node-center-inner">
          <span className="node-center-label">{"{A.M}"}</span>
        </div>
        <div className="node-center-pulse" />
      </div>

      {/* Orbiting contact nodes */}
      {contactNodes.map((node, i) => (
        <div
          key={node.id}
          className={`node-item ${activeNode === node.id ? "node-active" : ""}`}
          style={
            {
              "--node-x": `${node.x}%`,
              "--node-y": `${node.y}%`,
              "--delay": `${i * 0.15}s`,
            } as React.CSSProperties
          }
          onMouseEnter={() => setActiveNode(node.id)}
          onMouseLeave={() => setActiveNode(null)}
        >
          {node.link ? (
            <a
              href={node.link}
              target={node.download ? "_self" : "_blank"}
              rel="noreferrer"
              data-cursor="disable"
              className="node-link"
              download={node.download || undefined}
            >
              <div className="node-icon">{node.icon}</div>
              <div className="node-info">
                <span className="node-label">{node.label}</span>
                <span className="node-detail">{node.detail}</span>
              </div>
            </a>
          ) : (
            <div className="node-link">
              <div className="node-icon">{node.icon}</div>
              <div className="node-info">
                <span className="node-label">{node.label}</span>
                <span className="node-detail">{node.detail}</span>
              </div>
            </div>
          )}
        </div>
      ))}

      {/* Footer */}
      <div className="contact-footer">
        <p>
          Designed & Developed by <span>Anshu Mishra</span>
        </p>
        <p className="contact-copyright">
          <MdCopyright /> 2026
        </p>
      </div>
    </div>
  );
};

export default Contact;
