import { useEffect, useRef } from 'react';
import Hero from '../components/Hero';
import AboutMe from '../components/AboutMe';
import Skills from '../components/Skills';
import Projects from '../components/Projects';
import Education from '../components/Education';
import Contact from '../components/Contact';
import CursorTrail from '../components/CursorTrail';

const Home = () => {
  const environmentRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const environment = environmentRef.current;
    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frameId = 0;

    const updateDepth = () => {
      cancelAnimationFrame(frameId);
      frameId = requestAnimationFrame(() => {
        if (!environment) return;
        const scrollableDistance =
          document.documentElement.scrollHeight - window.innerHeight;
        const progress =
          motionPreference.matches || scrollableDistance <= 0
            ? 0
            : Math.min(window.scrollY / scrollableDistance, 1);

        environment.style.setProperty('--abyss-progress', progress.toFixed(4));
        environment.style.setProperty('--abyss-near-shift', `${progress * -72}px`);
        environment.style.setProperty('--abyss-far-shift', `${progress * -34}px`);
        environment.style.setProperty('--abyss-floor-shift', `${progress * -90}px`);
        environment.style.setProperty('--abyss-light-shift', `${progress * 14}%`);
        environment.style.setProperty('--abyss-nebula-opacity', `${0.52 + progress * 0.3}`);
        environment.style.setProperty('--abyss-star-opacity', `${0.24 + progress * 0.12}`);
        environment.style.setProperty('--abyss-light-opacity', `${0.36 + progress * 0.42}`);
        environment.style.setProperty('--abyss-distant-opacity', `${0.22 + progress * 0.2}`);
      });
    };

    updateDepth();
    window.addEventListener('scroll', updateDepth, { passive: true });
    window.addEventListener('resize', updateDepth);
    motionPreference.addEventListener('change', updateDepth);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('scroll', updateDepth);
      window.removeEventListener('resize', updateDepth);
      motionPreference.removeEventListener('change', updateDepth);
    };
  }, []);

  useEffect(() => {
    const content = contentRef.current;
    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!content || motionPreference.matches || !('IntersectionObserver' in window)) return;

    const sections = [...content.querySelectorAll(':scope > section[id]')].filter(
      (section) => section.id !== 'home',
    );
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.remove('abyss-reveal-pending');
          entry.target.classList.add('abyss-revealed');
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.04, rootMargin: '0px 0px 12% 0px' },
    );

    sections.forEach((section) => {
      section.classList.add('abyss-reveal-pending');
      observer.observe(section);
    });

    return () => {
      observer.disconnect();
      sections.forEach((section) => {
        section.classList.remove('abyss-reveal-pending', 'abyss-revealed');
      });
    };
  }, []);

  return (
    <main className="abyss-world">
      <div className="abyss-environment" aria-hidden="true" ref={environmentRef}>
        <div className="abyss-nebula" />
        <div className="abyss-starfield" />
        <div className="abyss-light-well" />
        <span className="abyss-firefly abyss-firefly-one" />
        <span className="abyss-firefly abyss-firefly-two" />
        <span className="abyss-firefly abyss-firefly-three" />
        <div className="abyss-structure abyss-structure-near" />
        <div className="abyss-structure abyss-structure-far" />
        <div className="abyss-horizon" />
        <div className="abyss-floor" />
        <div className="abyss-vignette" />
      </div>
      <CursorTrail />
      <div className="abyss-content" ref={contentRef}>
        <Hero />
        <AboutMe />
        <Skills />
        <Projects />
        <Education />
        <Contact />
      </div>
    </main>
  );
};

export default Home;
