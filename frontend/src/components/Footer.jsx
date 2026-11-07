import { Link } from "react-router-dom";
import { FaGithub, FaLinkedin, FaFacebook } from "react-icons/fa";
import {
  HiMail,
  HiArrowUp,
  HiOutlineLocationMarker,
  HiOutlineDocumentText,
} from "react-icons/hi";

const exploreLinks = [
  { label: "Home", href: "/#home" },
  { label: "About", href: "/#about" },
  { label: "Projects", href: "/#projects" },
  { label: "Education", href: "/#education" },
  { label: "Contact", href: "/#contact" },
];

const socials = [
  {
    label: "GitHub",
    href: "https://github.com/nishattasnimtonni5-lang",
    icon: FaGithub,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/nishat-tasnim-tonni-webdev043/",
    icon: FaLinkedin,
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/profile.php?id=61578195001063",
    icon: FaFacebook,
  },
];

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="abyss-footer relative print:hidden mt-auto border-t">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-300/55 to-transparent"
      />

      <div className="max-w-7xl mx-auto px-6 pt-12 pb-8">
        <div className="grid gap-10 md:grid-cols-12">
          {/* Brand */}
          <div className="md:col-span-5">
            <Link
              to="/"
              className="inline-flex items-baseline gap-2 text-xl font-black tracking-tight text-white"
            >
              Nishat Tasnim<span className="text-amber-400">.</span>
            </Link>
            <p className="mt-3 text-sm leading-relaxed text-slate-400 max-w-sm">
              Full-stack developer crafting clean, responsive interfaces with React,
              Next.js, Node.js and MongoDB — always learning, always shipping.
            </p>

            <span className="mt-4 inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-emerald-300">
              <span className="green-signal-dot" />
              Open to internship &amp; junior roles · Remote
            </span>

            <div className="mt-5 flex items-center gap-2.5">
              {socials.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:text-amber-300 hover:border-amber-300/40 hover:bg-amber-400/10 transition"
                >
                  <Icon className="text-sm" />
                </a>
              ))}
            </div>
          </div>

          {/* Explore */}
          <nav aria-label="Footer navigation" className="md:col-span-3">
            <h3 className="text-xs font-bold uppercase tracking-[0.18em] text-amber-400">
              Explore
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {exploreLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-slate-400 hover:text-amber-300 transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div className="md:col-span-4">
            <h3 className="text-xs font-bold uppercase tracking-[0.18em] text-amber-400">
              Get in touch
            </h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <a
                  href="mailto:nishattasnimtonni5@gmail.com"
                  className="flex items-center gap-2.5 text-slate-300 hover:text-amber-300 transition-colors break-all"
                >
                  <HiMail className="text-amber-400 shrink-0" />
                  nishattasnimtonni5@gmail.com
                </a>
              </li>
              <li>
                <span className="flex items-center gap-2.5 text-slate-400">
                  <HiOutlineLocationMarker className="text-amber-400 shrink-0" />
                  Dhaka, Bangladesh · Remote only
                </span>
              </li>
            </ul>

            <Link
              to="/resume"
              className="footer-gold-btn mt-5 inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold"
            >
              <HiOutlineDocumentText />
              Download resume
            </Link>
          </div>
        </div>

        <div className="mt-10 pt-5 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 text-center sm:text-left">
          <p>
            &copy; {new Date().getFullYear()} Nishat Tasnim Tonni. All rights reserved.
          </p>
          <p className="flex items-center gap-1.5">
            Built with <span className="text-amber-300 font-semibold">React</span> +{" "}
            <span className="text-amber-300 font-semibold">Vite</span>
          </p>
          <button
            onClick={scrollToTop}
            aria-label="Scroll back to top"
            className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-slate-400 hover:text-amber-300 hover:border-amber-300/40 font-medium transition cursor-pointer"
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
