import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  HiArrowLeft,
  HiArrowRight,
  HiExternalLink,
  HiOutlineSparkles,
} from "react-icons/hi";
import projects from "../data/projects";
import ProjectArtwork from "./ProjectArtwork";

const wrapIndex = (index) => (index + projects.length) % projects.length;

const Projects = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const dragRef = useRef(null);
  const suppressClickRef = useRef(false);
  const clickResetRef = useRef(0);

  useEffect(
    () => () => {
      window.clearTimeout(clickResetRef.current);
    },
    [],
  );

  const showPrevious = () => setActiveIndex((index) => wrapIndex(index - 1));
  const showNext = () => setActiveIndex((index) => wrapIndex(index + 1));

  const handlePointerDown = (event) => {
    if (!event.isPrimary || (event.pointerType === "mouse" && event.button !== 0)) {
      return;
    }

    dragRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      moved: false,
    };
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event) => {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;
    if (Math.abs(event.clientX - drag.startX) > 8) drag.moved = true;
  };

  const handlePointerUp = (event) => {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;

    const distance = event.clientX - drag.startX;
    if (drag.moved && Math.abs(distance) > 44) {
      suppressClickRef.current = true;
      if (distance < 0) showNext();
      else showPrevious();

      window.clearTimeout(clickResetRef.current);
      clickResetRef.current = window.setTimeout(() => {
        suppressClickRef.current = false;
      }, 500);
    }

    dragRef.current = null;
  };

  const handlePointerCancel = () => {
    dragRef.current = null;
  };

  const handleClickCapture = (event) => {
    if (!suppressClickRef.current) return;
    event.preventDefault();
    event.stopPropagation();
    suppressClickRef.current = false;
    window.clearTimeout(clickResetRef.current);
  };

  const handleKeyDown = (event) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      showPrevious();
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      showNext();
    }
  };

  return (
    <section id="projects" className="projects-section py-24 px-6 md:px-12 max-w-7xl mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/60 text-blue-700 text-xs font-semibold uppercase tracking-wider">
          <HiOutlineSparkles className="text-blue-600 text-sm" />
          <span>Selected work</span>
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight">
          Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Projects</span>
        </h2>

        <p className="text-base sm:text-lg text-gray-600">
          Explore each project in depth. Drag, swipe, or use the controls to move through the collection.
        </p>
      </div>

      <div
        className="coverflow"
        role="region"
        aria-roledescription="carousel"
        aria-label="Portfolio projects. Use the arrow keys to change projects."
        tabIndex={0}
        onKeyDown={handleKeyDown}
      >
        <div
          className="coverflow-stage"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerCancel}
          onClickCapture={handleClickCapture}
        >
          {projects.map((project, index) => {
            const rawOffset = (index - activeIndex + projects.length) % projects.length;
            const offset = rawOffset > Math.floor(projects.length / 2)
              ? rawOffset - projects.length
              : rawOffset;
            const position = Math.max(-1, Math.min(1, offset));

            return (
              <article
                key={project.id}
                className={`coverflow-slide coverflow-slide-${position}`}
                role="group"
                aria-roledescription="slide"
                aria-label={`${index + 1} of ${projects.length}: ${project.title}`}
                aria-current={index === activeIndex ? "true" : undefined}
                style={{ "--slide-offset": position }}
              >
                <a
                  className="coverflow-project-link"
                  href={project.live}
                  target="_blank"
                  rel="noreferrer"
                  draggable={false}
                  aria-label={`Open ${project.title} live project`}
                >
                  <div className="coverflow-artwork">
                    <ProjectArtwork title={project.title} image={project.image} />
                    {project.featured && <span className="coverflow-featured">Featured</span>}
                    <span className="coverflow-open">
                      Open project <HiExternalLink aria-hidden="true" />
                    </span>
                  </div>
                  <div className="coverflow-copy">
                    <span className="coverflow-category">{project.category}</span>
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                  </div>
                </a>

                <div className="coverflow-card-footer">
                  <Link to={`/projects/${project.id}`} className="coverflow-details-link">
                    Project details <HiArrowRight aria-hidden="true" />
                  </Link>
                  <span className="coverflow-count">
                    {String(index + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
                  </span>
                </div>
              </article>
            );
          })}
        </div>

        <div className="coverflow-controls">
          <button type="button" onClick={showPrevious} aria-label="Previous project">
            <HiArrowLeft aria-hidden="true" />
          </button>
          <div className="coverflow-pagination" aria-live="polite" aria-atomic="true">
            <span>{String(activeIndex + 1).padStart(2, "0")}</span>
            <span className="coverflow-pagination-rule" />
            <span>{String(projects.length).padStart(2, "0")}</span>
          </div>
          <button type="button" onClick={showNext} aria-label="Next project">
            <HiArrowRight aria-hidden="true" />
          </button>
        </div>
      </div>

      <p className="mt-10 text-center text-sm text-gray-500">
        More code and experiments on{" "}
        <a
          href="https://github.com/nishattasnimtonni5-lang"
          target="_blank"
          rel="noreferrer"
          className="font-semibold text-blue-600 hover:underline"
        >
          GitHub
        </a>
      </p>
    </section>
  );
};

export default Projects;
