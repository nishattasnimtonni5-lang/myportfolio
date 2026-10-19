import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { HiMenuAlt3, HiX, HiDocumentText } from "react-icons/hi";

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
          className="text-2xl font-extrabold tracking-tight text-white group flex items-center gap-2"
        >
          <span className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-500 to-indigo-500 flex items-center justify-center text-white font-mono text-lg shadow-md shadow-cyan-500/25 group-hover:scale-105 transition-transform">
            N
          </span>
          <span className="bg-gradient-to-r from-white via-slate-100 to-cyan-300 bg-clip-text text-transparent">
            Nishat Tasnim<span className="text-amber-400">.</span>
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <ul className="hidden md:flex items-center gap-7">
          {navLinks.map((link) => {
            const href = link.id === "resume" ? "/resume" : isHomePage ? `#${link.id}` : `/#${link.id}`;
            const isLinkActive = active === link.id;

            return (
              <li key={link.id}>
                {link.id === "resume" ? (
                  <Link
                    to="/resume"
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

        {/* Desktop Right CTA (Resume Button) */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            to="/resume"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-500 hover:from-blue-500 hover:to-indigo-400 text-white px-5 py-2.5 rounded-full text-sm font-semibold shadow-md shadow-cyan-500/20 hover:shadow-lg hover:shadow-amber-400/30 transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer"
          >
            <HiDocumentText className="text-lg" />
            Resume
          </Link>
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
            const href = link.id === "resume" ? "/resume" : isHomePage ? `#${link.id}` : `/#${link.id}`;
            const isLinkActive = active === link.id;

            return (
              <li key={link.id}>
                {link.id === "resume" ? (
                  <Link
                    to="/resume"
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

          {/* Mobile Resume Button */}
          <li className="pt-2 border-t border-gray-100">
            <Link
              to="/resume"
              onClick={closeMenu}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-500 text-white py-3 rounded-xl font-semibold shadow hover:from-blue-500 hover:to-indigo-400 transition"
            >
              <HiDocumentText className="text-xl" />
              View Full Resume
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Navbar;