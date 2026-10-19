import { Link } from "react-router-dom";
import { FaGithub, FaLinkedin, FaFacebook } from "react-icons/fa";
import { HiMail, HiArrowUp } from "react-icons/hi";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="abyss-footer bg-white border-t border-slate-200 text-slate-600 print:hidden mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
          <div className="flex items-center gap-3">
            <Link to="/" className="text-lg font-bold text-slate-900 tracking-tight">
              Nishat Tasnim<span className="text-blue-600">.</span>
            </Link>
            <span className="hidden sm:inline-block h-5 w-px bg-slate-300"></span>
            <p className="text-sm text-slate-500">Full-Stack Developer</p>
          </div>

          <div className="flex items-center gap-3 text-slate-500">
            <a href="/#projects" className="text-sm hover:text-blue-600 transition">Projects</a>
            <Link to="/resume" className="text-sm hover:text-blue-600 transition">Resume</Link>
            <a href="/#contact" className="text-sm hover:text-blue-600 transition">Contact</a>
          </div>

          <div className="flex items-center gap-2">
            <a href="https://github.com/nishattasnimtonni5-lang" target="_blank" rel="noreferrer" aria-label="GitHub" className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-900 hover:text-white flex items-center justify-center text-slate-700 transition">
              <FaGithub className="text-sm" />
            </a>
            <a href="https://www.linkedin.com/in/nishat-tasnim-tonni-webdev043/" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-blue-600 hover:text-white flex items-center justify-center text-slate-700 transition">
              <FaLinkedin className="text-sm" />
            </a>
            <a href="https://www.facebook.com/profile.php?id=61578195001063" target="_blank" rel="noreferrer" aria-label="Facebook" className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-blue-600 hover:text-white flex items-center justify-center text-slate-700 transition">
              <FaFacebook className="text-sm" />
            </a>
            <a href="mailto:nishattasnimtonni5@gmail.com" aria-label="Email" className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-rose-500 hover:text-white flex items-center justify-center text-slate-700 transition">
              <HiMail className="text-sm" />
            </a>
          </div>
        </div>

        <div className="mt-6 pt-5 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <p>&copy; {new Date().getFullYear()} Nishat Tasnim Tonni. All rights reserved.</p>
          <button
            onClick={scrollToTop}
            aria-label="Scroll back to top"
            className="inline-flex items-center gap-1.5 text-slate-600 hover:text-blue-600 font-medium transition cursor-pointer"
          >
            <span>Back to top</span>
            <HiArrowUp className="text-sm" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
