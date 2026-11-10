import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { HiMenuAlt3, HiX, HiDocumentDownload } from "react-icons/hi";

const navLinks = [
  { name: "Home", id: "home" },
  { name: "About", id: "about" },
  { name: "Skills", id: "skills" },
  { name: "Projects", id: "projects" },
  { name: "Education", id: "education" },
  { name: "Resume", id: "resume" },
  { name: "Contact", id: "contact" },
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const isHomePage = location.pathname === "/";

  // Shadow and active section detection when scrolling on home page
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      if (!isHomePage) {
        setActive(location.pathname === "/resume" ? "resume" : "");
        return;
      }

      const activeSection = navLinks
        .filter((link) => link.id !== "resume")
        .map((link) => document.getElementById(link.id))
        .filter(Boolean)
        .find((section) => {
          const bounds = section.getBoundingClientRect();
          return bounds.top <= 140 && bounds.bottom > 140;
        });

      setActive(activeSection?.id ?? "home");
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("hashchange", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("hashchange", handleScroll);
    };
  }, [isHomePage, location.pathname]);

  const closeMenu = () => setMenuOpen(false);
  const handleHomeClick = () => {
    if (!isHomePage) return;
    window.scrollTo({ top: 0, behavior: "smooth" });
    window.dispatchEvent(new Event("portfolio-intro:replay"));
  };

  return (
    <header
      className={`fixed w-full top-0 left-0 z-50 transition-all duration-300 print:hidden ${
        scrolled || !isHomePage
          ? "bg-slate-950/90 backdrop-blur-md shadow-md border-b border-slate-700/60"
          : "bg-slate-950/45 backdrop-blur-sm border-b border-white/10"
      }`}
    >
      <nav className="max-w-7xl mx-auto flex items-center justify-between h-20 px-6">
        {/* Logo */}
        <Link
          to="/"
          onClick={handleHomeClick}
          className="text-xl font-extrabold tracking-tight text-white group flex items-center gap-3"
        >
          <span className="nav-royal-mark relative flex h-16 w-14 shrink-0 items-center justify-center overflow-hidden rounded-t-[50%] rounded-b-md">
            <svg
              viewBox="0 0 40 44"
              fill="none"
              aria-hidden="true"
              className="absolute inset-0 h-full w-full"
            >
              <defs>
                <linearGradient id="royal-gold" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#ffeec2" />
                  <stop offset="0.35" stopColor="#f1cb74" />
                  <stop offset="0.65" stopColor="#c9992f" />
                  <stop offset="1" stopColor="#8f651c" />
                </linearGradient>
                <linearGradient id="royal-letter" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#fffaf0" />
                  <stop offset="0.42" stopColor="#ffe6a3" />
                  <stop offset="0.68" stopColor="#e9b94f" />
                  <stop offset="1" stopColor="#c78f2a" />
                </linearGradient>
                <radialGradient id="royal-halo" cx="0.5" cy="0.52" r="0.56">
                  <stop offset="0" stopColor="#080d17" stopOpacity="0.6" />
                  <stop offset="0.6" stopColor="#080d17" stopOpacity="0.35" />
                  <stop offset="1" stopColor="#080d17" stopOpacity="0" />
                </radialGradient>
                <path id="royal-petal" d="M0 -4.2C1.8 -2.8 1.8 -1 0 0C-1.8 -1 -1.8 -2.8 0 -4.2Z" />
                <path id="royal-leaf" d="M0 0C2.9 -1.9 5.9 -1.4 7.2 1.4C4.7 3.4 1.6 2.8 0 0Z" />
              </defs>

              {/* arched inner frame, like the carved pillar panel */}
              <path
                d="M7 40.6V17C7 10.4 12.8 5 20 5S33 10.4 33 17V40.6"
                stroke="url(#royal-gold)"
                strokeWidth="0.9"
                opacity="0.7"
              />
              <path
                d="M9.5 40.6V17.4C9.5 12 14.2 7.6 20 7.6S30.5 12 30.5 17.4V40.6"
                stroke="url(#royal-gold)"
                strokeWidth="0.55"
                opacity="0.38"
              />

              {/* embossed scrollwork carved into the arch border */}
              <path
                d="M7.1 18.2c-2.5-.8-2.8-3-.9-4.1 1.4-.8 2.8.4 2.1 1.5-.5.8-1.5.5-1.4-.2m26.1 2.8c2.5-.8 2.8-3 .9-4.1-1.4-.8-2.8.4-2.1 1.5.5.8 1.5.5 1.4-.2M7.2 28.7c-2.2.9-2.3 3.1-.6 4 1.3.7 2.7-.4 2-1.5-.5-.8-1.5-.5-1.4.2m25.6-2.7c2.2.9 2.3 3.1.6 4-1.3.7-2.7-.4-2-1.5.5-.8 1.5-.5 1.4.2"
                stroke="#4b3210"
                strokeWidth="1.8"
                strokeLinecap="round"
                opacity="0.9"
              />
              <path
                d="M7.1 18.2c-2.5-.8-2.8-3-.9-4.1 1.4-.8 2.8.4 2.1 1.5-.5.8-1.5.5-1.4-.2m26.1 2.8c2.5-.8 2.8-3 .9-4.1-1.4-.8-2.8.4-2.1 1.5.5.8 1.5.5 1.4-.2M7.2 28.7c-2.2.9-2.3 3.1-.6 4 1.3.7 2.7-.4 2-1.5-.5-.8-1.5-.5-1.4.2m25.6-2.7c2.2.9 2.3 3.1.6 4-1.3.7-2.7-.4-2-1.5.5-.8 1.5-.5 1.4.2"
                stroke="url(#royal-gold)"
                strokeWidth="0.8"
                strokeLinecap="round"
              />
              <path
                d="M6.2 21.3h1.6m24.4 0h1.6M6.2 25.1h1.6m24.4 0h1.6"
                stroke="url(#royal-gold)"
                strokeWidth="0.55"
                strokeLinecap="round"
                opacity="0.85"
              />
              <path d="m7.1 22.8.8.8-.8.8-.8-.8.8-.8Zm25.8 0 .8.8-.8.8-.8-.8.8-.8Z" fill="url(#royal-gold)" />

              {/* crown scrolls under the arch */}
              <path
                d="M8.5 15.5C8.5 10.8 12.4 7.6 16.2 8.8c2.4.7 2.9 3.6 1.1 4.9-1.5 1.1-3.5.2-3.2-1.4"
                stroke="url(#royal-gold)"
                strokeWidth="1.1"
                strokeLinecap="round"
              />
              <path
                d="M31.5 15.5C31.5 10.8 27.6 7.6 23.8 8.8c-2.4.7-2.9 3.6-1.1 4.9 1.5 1.1 3.5.2 3.2-1.4"
                stroke="url(#royal-gold)"
                strokeWidth="1.1"
                strokeLinecap="round"
              />
              <circle cx="20" cy="10.6" r="0.95" fill="url(#royal-gold)" />
              <path
                d="M17.6 13.4c1-1.2 3.8-1.2 4.8 0"
                stroke="url(#royal-gold)"
                strokeWidth="0.8"
                strokeLinecap="round"
              />

              {/* side flourishes */}
              <path
                d="M9.8 24.4c2.7 0 4.4-1.7 4.6-4.1.1-1.7-1.3-2.8-2.6-2.3-1.2.5-1.5 2-.6 2.9"
                stroke="url(#royal-gold)"
                strokeWidth="1"
                strokeLinecap="round"
              />
              <path
                d="M30.2 24.4c-2.7 0-4.4-1.7-4.6-4.1-.1-1.7 1.3-2.8 2.6-2.3 1.2.5 1.5 2 .6 2.9"
                stroke="url(#royal-gold)"
                strokeWidth="1"
                strokeLinecap="round"
              />
              <circle cx="12.6" cy="27.4" r="0.65" fill="url(#royal-gold)" opacity="0.8" />
              <circle cx="27.4" cy="27.4" r="0.65" fill="url(#royal-gold)" opacity="0.8" />

              {/* paired leaves */}
              <use
                href="#royal-leaf"
                transform="translate(10.4 30.8) rotate(-40)"
                fill="url(#royal-gold)"
                opacity="0.92"
              />
              <use
                href="#royal-leaf"
                transform="translate(29.6 30.8) scale(-1 1) rotate(-40)"
                fill="url(#royal-gold)"
                opacity="0.92"
              />

              {/* base scrollwork */}
              <path
                d="M9.8 39.6C9.8 34.6 12.4 32.2 15.5 32.8c2.8.5 3.9 3.2 2.2 4.7-1.4 1.3-3.7.4-3.5-1.5"
                stroke="url(#royal-gold)"
                strokeWidth="1.1"
                strokeLinecap="round"
              />
              <path
                d="M30.2 39.6C30.2 34.6 27.6 32.2 24.5 32.8c-2.8.5-3.9 3.2-2.2 4.7 1.4 1.3 3.7.4 3.5-1.5"
                stroke="url(#royal-gold)"
                strokeWidth="1.1"
                strokeLinecap="round"
              />

              {/* rosette ghosted behind the letter */}
              <g transform="translate(20 23.4)" opacity="0.6">
                <use href="#royal-petal" fill="url(#royal-gold)" />
                <use href="#royal-petal" fill="url(#royal-gold)" transform="rotate(45)" />
                <use href="#royal-petal" fill="url(#royal-gold)" transform="rotate(90)" />
                <use href="#royal-petal" fill="url(#royal-gold)" transform="rotate(135)" />
                <use href="#royal-petal" fill="url(#royal-gold)" transform="rotate(180)" />
                <use href="#royal-petal" fill="url(#royal-gold)" transform="rotate(225)" />
                <use href="#royal-petal" fill="url(#royal-gold)" transform="rotate(270)" />
                <use href="#royal-petal" fill="url(#royal-gold)" transform="rotate(315)" />
                <circle r="1.5" fill="url(#royal-gold)" />
                <circle r="3.1" fill="none" stroke="url(#royal-gold)" strokeWidth="0.5" opacity="0.85" />
              </g>

              {/* soft halo so the letter stays readable */}
              <rect width="40" height="44" fill="url(#royal-halo)" />

              {/* beveled base band with 3D studs */}
              <rect x="6" y="40.8" width="28" height="2" rx="1" fill="url(#royal-gold)" />
              <rect x="6.7" y="41.2" width="26.6" height="0.5" rx="0.25" fill="#fff5d8" opacity="0.55" />
              <circle cx="7.8" cy="41.8" r="1.15" fill="#1a140a" stroke="url(#royal-gold)" strokeWidth="0.8" />
              <circle cx="7.5" cy="41.45" r="0.35" fill="#fff4d2" />
              <circle cx="32.2" cy="41.8" r="1.15" fill="#1a140a" stroke="url(#royal-gold)" strokeWidth="0.8" />
              <circle cx="31.9" cy="41.45" r="0.35" fill="#fff4d2" />

              {/* the letter */}
              <text
                x="20"
                y="28.4"
                textAnchor="middle"
                fontFamily="Georgia, 'Times New Roman', serif"
                fontSize="17"
                fontWeight="700"
                fill="url(#royal-letter)"
                stroke="#070b13"
                strokeWidth="2"
                paintOrder="stroke"
                style={{ filter: "drop-shadow(0 1.4px 1.6px rgba(0,0,0,.85))" }}
              >
                N
              </text>
            </svg>
          </span>
          <span className="bg-gradient-to-r from-white via-slate-100 to-cyan-300 bg-clip-text text-transparent">
            Nishat Tasnim<span className="text-amber-400">.</span>
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <ul className="hidden md:flex items-center gap-7">
          {navLinks.map((link) => {
            const href = link.id === "resume" ? "/resume-preview" : isHomePage ? `#${link.id}` : `/#${link.id}`;
            const isLinkActive = active === link.id;

            return (
              <li key={link.id}>
                {link.id === "resume" ? (
                  <Link
                    to="/resume-preview"
                    className={`group relative py-1 font-medium text-sm transition-colors duration-200 ${
                      isLinkActive ? "text-cyan-300 font-semibold" : "text-slate-200 hover:text-cyan-300"
                    }`}
                  >
                    {link.name}
                    <span className={`nav-underline absolute left-0 -bottom-1 h-0.5 bg-cyan-300 transition-all duration-300 ${
                      isLinkActive ? "nav-underline-active w-full" : "w-0 group-hover:w-full"
                    }`}></span>
                  </Link>
                ) : (
                  <a
                    href={href}
                    className={`group relative py-1 font-medium text-sm transition-colors duration-200 ${
                      isLinkActive
                        ? "text-cyan-300 font-semibold"
                        : "text-slate-200 hover:text-cyan-300"
                    }`}
                  >
                    {link.name}
                    <span
                      className={`nav-underline absolute left-0 -bottom-1 h-0.5 bg-cyan-300 transition-all duration-300 ${
                        isLinkActive ? "nav-underline-active w-full" : "w-0 group-hover:w-full"
                      }`}
                    ></span>
                  </a>
                )}
              </li>
            );
          })}
        </ul>

        {/* Desktop Right CTA (Download Resume) */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="/resume.pdf"
            download="Nishat-Tasnim-Tonni-Resume.pdf"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-500 hover:from-blue-500 hover:to-indigo-400 text-white px-5 py-2.5 rounded-full text-sm font-semibold shadow-md shadow-cyan-500/20 hover:shadow-lg hover:shadow-amber-400/30 transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer"
          >
            <HiDocumentDownload className="text-lg" />
            Download Resume
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation menu"
          className="md:hidden text-2xl text-white p-2 rounded-lg hover:bg-slate-800 transition focus:outline-none"
        >
          {menuOpen ? <HiX /> : <HiMenuAlt3 />}
        </button>
      </nav>

      {/* Mobile Menu Drawer */}
      <div
        className={`md:hidden bg-slate-950/95 backdrop-blur-lg border-b border-slate-700 shadow-xl transition-all duration-300 ${
          menuOpen
            ? "max-h-[calc(100dvh_-_5rem)] overflow-y-auto overscroll-contain py-6 px-6"
            : "max-h-0 overflow-hidden py-0 px-6"
        }`}
      >
        <ul className="flex flex-col gap-4">
          {navLinks.map((link) => {
            const href = link.id === "resume" ? "/resume-preview" : isHomePage ? `#${link.id}` : `/#${link.id}`;
            const isLinkActive = active === link.id;

            return (
              <li key={link.id}>
                {link.id === "resume" ? (
                  <Link
                    to="/resume-preview"
                    onClick={closeMenu}
                    className={`relative block py-1.5 text-base font-medium transition text-slate-100 hover:text-cyan-300 ${isLinkActive ? "text-cyan-300 font-semibold" : ""}`}
                  >
                    {link.name}
                    <span className={`nav-underline absolute left-0 -bottom-1 h-0.5 bg-cyan-300 transition-all duration-300 ${isLinkActive ? "nav-underline-active w-full" : "w-0"}`} />
                  </Link>
                ) : (
                  <a
                    href={href}
                    onClick={closeMenu}
                    className={`relative block py-1.5 text-base font-medium transition ${
                      isLinkActive ? "text-cyan-300 font-semibold" : "text-slate-100 hover:text-cyan-300"
                    }`}
                  >
                    {link.name}
                    <span className={`nav-underline absolute left-0 -bottom-1 h-0.5 bg-cyan-300 transition-all duration-300 ${isLinkActive ? "nav-underline-active w-full" : "w-0"}`} />
                  </a>
                )}
              </li>
            );
          })}

          {/* Mobile Download Resume Button */}
          <li className="pt-2 border-t border-gray-100">
            <a
              href="/resume.pdf"
              download="Nishat-Tasnim-Tonni-Resume.pdf"
              onClick={closeMenu}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-500 text-white py-3 rounded-xl font-semibold shadow hover:from-blue-500 hover:to-indigo-400 transition"
            >
              <HiDocumentDownload className="text-xl" />
              Download Resume
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Navbar;