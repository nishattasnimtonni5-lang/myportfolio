import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { HiDocumentText, HiArrowRight } from "react-icons/hi";
import profilePhoto from "../assets/Pro.jpeg";

const LightBulb = ({ className, svgRef }) => (
  <svg
    className={className}
    ref={svgRef}
    viewBox="0 0 48 64"
    fill="none"
    aria-hidden="true"
  >
    <path
      d="M24 4.5a16 16 0 0 0-10.1 28.4c3.2 2.7 5.1 5.5 5.7 8.6h12.8c.6-3.1 2.5-5.9 5.7-8.6A16 16 0 0 0 24 4.5Z"
      fill="#fff4bf"
      stroke="#fbbf24"
      strokeWidth="2"
    />
    <path
      d="M19.5 42h9m-9 4h9m-8 4h7m-5.5 4h4"
      stroke="#d97706"
      strokeLinecap="round"
      strokeWidth="2.5"
    />
    <path
      d="m20 25 4-5 4 5m-4-5v12"
      stroke="#f59e0b"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    />
  </svg>
);

const Hero = () => {
  const [introPhase, setIntroPhase] = useState("ready");
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const stageRef = useRef(null);
  const nameRef = useRef(null);
  const dotRef = useRef(null);
  const bulbRef = useRef(null);
  const animationsRef = useRef([]);

  useEffect(() => {
    const animations = animationsRef.current;
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotionPreference = (event) => {
      setPrefersReducedMotion(event.matches);
    };

    motionQuery.addEventListener("change", updateMotionPreference);

    return () => {
      motionQuery.removeEventListener("change", updateMotionPreference);
      animations.forEach((animation) => animation.cancel());
    };
  }, []);

  const enterPortfolio = useCallback(async () => {
    if (introPhase !== "ready") return;
    if (prefersReducedMotion) {
      setIntroPhase("entered");
      return;
    }

    animationsRef.current = [];
    setIntroPhase("running");

    const stage = stageRef.current;
    const name = nameRef.current;
    const dot = dotRef.current;
    const bulb = bulbRef.current;
    if (!stage || !name || !dot || !bulb) return;

    const stageRect = stage.getBoundingClientRect();
    const dotRect = dot.getBoundingClientRect();
    const bulbRect = bulb.getBoundingClientRect();
    const bulbWidth = bulbRect.width;
    const bulbHeight = bulbRect.height;
    const targetX = dotRect.left + dotRect.width / 2 - stageRect.left;
    const targetY = dotRect.top + dotRect.height / 2 - stageRect.top;
    const bulbOriginX = bulbRect.left - stageRect.left;
    const bulbOriginY = bulbRect.top - stageRect.top;
    const landingX = targetX - bulbWidth / 2 - bulbOriginX;
    const landingY = Math.max(targetY - 148, 48) - bulbOriginY;
    const nameWidth = name.getBoundingClientRect().width;
    const travelDistance = window.innerWidth / 2 + nameWidth / 2 + 48;
    const finalBulbWidth = dotRect.width * 1.5;
    const finalBulbHeight = finalBulbWidth * 1.34;
    const finalBulbX = targetX - finalBulbWidth / 2 - bulbOriginX;
    const finalBulbY =
      targetY - finalBulbHeight * (22 / 64) - bulbOriginY;
    const play = (element, keyframes, options) => {
      const animation = element.animate(keyframes, options);
      animationsRef.current.push(animation);
      return animation.finished.then(
        () => true,
        () => false,
      );
    };

    const bulbFall = play(
      bulb,
      [
        {
          transform: "translate(0, 0) rotate(-6deg)",
          offset: 0,
          easing: "cubic-bezier(0.4, 0, 0.8, 0.3)",
        },
        {
          transform: `translate(${landingX}px, ${landingY + 15}px) rotate(5deg)`,
          offset: 0.74,
          easing: "cubic-bezier(0.2, 0.75, 0.25, 1)",
        },
        {
          transform: `translate(${landingX}px, ${landingY - 7}px) rotate(-3deg)`,
          offset: 0.86,
          easing: "cubic-bezier(0.2, 0.75, 0.3, 1)",
        },
        {
          transform: `translate(${landingX}px, ${landingY + 3}px) rotate(1.5deg)`,
          offset: 0.94,
        },
        {
          transform: `translate(${landingX}px, ${landingY}px) rotate(0deg)`,
          offset: 1,
        },
      ],
      { duration: 930, fill: "forwards" },
    );

    const nameEntry = play(
      name,
      [
        {
          transform: `translateX(-${travelDistance}px) skewX(-7deg) scaleX(1.04)`,
          filter: "blur(4px)",
          offset: 0,
          easing: "cubic-bezier(0.45, 0, 0.85, 0.4)",
        },
        {
          transform: "translateX(22px) skewX(0) rotate(1.8deg) scaleX(0.99)",
          filter: "blur(1px)",
          offset: 0.78,
          easing: "cubic-bezier(0.2, 0.8, 0.25, 1)",
        },
        {
          transform: "translateX(-6px) rotate(-0.5deg) scaleX(1.005)",
          filter: "blur(0)",
          offset: 0.91,
          easing: "cubic-bezier(0.2, 0.75, 0.25, 1)",
        },
        {
          transform: "translateX(0) rotate(0) scaleX(1)",
          filter: "blur(0)",
          offset: 1,
        },
      ],
      { duration: 1000, delay: 100, fill: "both" },
    );

    const introAnimations = await Promise.all([bulbFall, nameEntry]);
    if (!introAnimations.every(Boolean)) return;

    const bulbTravel = await play(
      bulb,
      [
        {
          transform: `translate(${landingX}px, ${landingY}px) rotate(0deg)`,
          width: `${bulbWidth}px`,
          height: `${bulbHeight}px`,
          filter: "drop-shadow(0 0 16px rgb(251 191 36 / 85%))",
          offset: 0,
        },
        {
          transform: `translate(${finalBulbX}px, ${finalBulbY}px) rotate(0deg)`,
          width: `${finalBulbWidth}px`,
          height: `${finalBulbHeight}px`,
          filter: "drop-shadow(0 0 7px rgb(251 191 36 / 90%))",
          offset: 1,
        },
      ],
      { duration: 560, easing: "cubic-bezier(0.2, 0.75, 0.25, 1)", fill: "forwards" },
    );
    if (!bulbTravel) return;

    const exit = await play(
      stage,
      [{ opacity: 1 }, { opacity: 0 }],
      { duration: 300, easing: "ease-in", fill: "forwards" },
    );
    if (exit) setIntroPhase("entered");
  }, [introPhase, prefersReducedMotion]);

  useEffect(() => {
    if (introPhase !== "ready") return undefined;
    const frame = window.requestAnimationFrame(() => void enterPortfolio());
    return () => window.cancelAnimationFrame(frame);
  }, [enterPortfolio, introPhase, prefersReducedMotion]);

  useEffect(() => {
    const replayIntro = () => {
      animationsRef.current.forEach((animation) => animation.cancel());
      animationsRef.current = [];
      setIntroPhase("ready");
    };
    window.addEventListener("portfolio-intro:replay", replayIntro);
    return () => window.removeEventListener("portfolio-intro:replay", replayIntro);
  }, []);

  return (
    <>
      {introPhase !== "entered" && (
        <div
          className={`portfolio-intro ${introPhase === "running" ? "portfolio-intro-running" : ""}`}
          aria-hidden="true"
          ref={stageRef}
        >
          <div className="intro-light-particle intro-light-particle-one" />
          <div className="intro-light-particle intro-light-particle-two" />
          <div className="intro-light-particle intro-light-particle-three" />
          <h1
            className="portfolio-intro-name"
            ref={nameRef}
            aria-label="Nishat Tasnim Tonni"
          >
            Nishat Tasnim Tonn
            <span className="final-i-letter" aria-hidden="true">
              ı<span className="final-i-dot intro-dot-target" ref={dotRef} />
            </span>
          </h1>
          <LightBulb className="intro-bulb" svgRef={bulbRef} />
        </div>
      )}

      <section
        id="home"
        className="relative min-h-[88vh] flex items-center justify-center pt-24 pb-12 px-6 md:px-12 max-w-7xl mx-auto overflow-hidden"
      >
      {/* Background Decorative Glows */}
      <div className="absolute top-20 left-1/4 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl pointer-events-none -z-10"></div>
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-indigo-400/10 rounded-full blur-3xl pointer-events-none -z-10"></div>

      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Introductions & CTAs */}
        <div className="hero-enter hero-copy lg:col-span-7 text-left">
          <p className="abyss-kicker">Into the digital abyss <span>— 01 / Creative developer</span></p>
          <h1 className="hero-title text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 tracking-tight leading-tight">
            Nishat Tasnim Tonn<span className="final-i-letter hero-final-i" aria-hidden="true">ı<span className="final-i-dot" /></span><span className="sr-only">i</span>
          </h1>
          <h2 className="hero-role text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 tracking-tight leading-tight">
            Full-Stack Developer
          </h2>

          <div className="hero-availability">
            <span className="hero-availability-indicator" />
            <span>Open to remote junior full-stack opportunities</span>
          </div>

          <p className="hero-description text-base sm:text-lg text-gray-600 max-w-2xl leading-relaxed">
            I build responsive web applications with Next.js, React, Node.js, and MongoDB.
          </p>

          <div className="hero-actions">
            <a
              href="#projects"
              className="hero-primary-action"
            >
              Explore selected work <HiArrowRight aria-hidden="true" />
            </a>
            <Link to="/resume" className="hero-secondary-action">
              <HiDocumentText aria-hidden="true" /> Resume
            </Link>
            <a
              href="#contact"
              className="hero-contact-action"
            >
              Get in touch
            </a>
          </div>

          <div className="hero-techline" aria-label="Core technologies">
            <span>Next.js</span>
            <span>React</span>
            <span>Node.js</span>
            <span>MongoDB</span>
          </div>
        </div>

        <div className="hero-enter hero-enter-later lg:col-span-5">
          <div className="hero-portrait-frame relative mx-auto aspect-square w-full max-w-[390px]">
            <div className="hero-portrait-halo absolute inset-[5%] rounded-full" />
            <div className="hero-portrait-ring absolute inset-[10%] rounded-full" />
            <div className="hero-portrait-image absolute inset-[14%] overflow-hidden rounded-full">
              <img
                src={profilePhoto}
                alt="Nishat Tasnim Tonni"
                className="h-full w-full object-cover object-[center_20%]"
              />
            </div>
          </div>
        </div>
      </div>
      </section>
    </>
  );
};

export default Hero;