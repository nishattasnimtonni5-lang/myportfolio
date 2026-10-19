import { Link } from "react-router-dom";
import {
  HiArrowLeft,
  HiPrinter,
  HiMail,
  HiPhone,
  HiLocationMarker,
  HiExternalLink,
  HiCode,
  HiSparkles,
} from "react-icons/hi";
import { FaGithub, FaReact, FaJsSquare, FaNodeJs } from "react-icons/fa";
import { SiNextdotjs, SiMongodb } from "react-icons/si";
import projects from "../data/projects";

const Resume = () => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-100 py-10 px-4 sm:px-6 lg:px-8 text-slate-800 font-sans print:bg-white print:py-0 print:px-0">
      <div className="max-w-5xl mx-auto mb-6 flex flex-wrap items-center justify-between gap-4 print:hidden">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700 bg-white border border-slate-200 px-4 py-2.5 rounded-xl shadow-sm hover:bg-slate-50 hover:text-blue-600 transition"
        >
          <HiArrowLeft className="text-base" /> Back to Portfolio
        </Link>

        <button
          onClick={handlePrint}
          className="inline-flex items-center gap-2 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 px-5 py-2.5 rounded-xl shadow-md shadow-blue-500/20 hover:shadow-lg transition cursor-pointer"
        >
          <HiPrinter className="text-base" /> Print / Save PDF
        </button>
      </div>

      <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-[0_25px_80px_rgba(15,23,42,0.12)] border border-slate-200 overflow-hidden print:shadow-none print:border-none print:rounded-none">
        <header className="bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-700 text-white">
          <div className="p-8 sm:p-10 lg:p-12">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-blue-200">Full-Stack Developer</p>
                <h1 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight">
                  Nishat Tasnim Tonni
                </h1>
                <p className="mt-3 text-base sm:text-lg text-blue-100">
                  Next.js • Node.js • MongoDB • React
                </p>
              </div>

              <div className="rounded-2xl border border-white/15 bg-white/5 backdrop-blur-sm px-4 py-3 min-w-[220px]">
                <span className="inline-flex items-center gap-2 rounded-full bg-emerald-400/15 text-emerald-200 border border-emerald-300/30 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  Open to Junior Full-Stack Roles
                </span>
                <p className="mt-3 text-sm text-blue-100">Available for remote opportunities only</p>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 text-sm text-blue-100">
              <a href="mailto:nishattasnimtonni5@gmail.com" className="flex items-center gap-2 rounded-xl bg-white/5 border border-white/10 px-3 py-2 hover:bg-white/10 transition">
                <HiMail className="text-base text-blue-200" />
                <span className="truncate">nishattasnimtonni5@gmail.com</span>
              </a>
              <a href="tel:+8801916001156" className="flex items-center gap-2 rounded-xl bg-white/5 border border-white/10 px-3 py-2 hover:bg-white/10 transition">
                <HiPhone className="text-base text-blue-200" />
                <span>01916001156</span>
              </a>
              <div className="flex items-center gap-2 rounded-xl bg-white/5 border border-white/10 px-3 py-2">
                <HiLocationMarker className="text-base text-blue-200" />
                <span>Dhaka, Bangladesh</span>
              </div>
              <a href="https://github.com/nishattasnimtonni5-lang" target="_blank" rel="noreferrer" className="flex items-center gap-2 rounded-xl bg-white/5 border border-white/10 px-3 py-2 hover:bg-white/10 transition">
                <FaGithub className="text-base text-blue-200" />
                <span>GitHub Profile</span>
              </a>
            </div>
          </div>
        </header>

        <main className="p-8 sm:p-10 lg:p-12">
          <section className="mb-8">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span>
              <h2 className="text-lg font-black uppercase tracking-[0.18em] text-slate-800">Professional Summary</h2>
            </div>
            <p className="text-sm sm:text-[15px] leading-7 text-slate-700">
              Motivated <strong className="text-slate-900">full-stack developer</strong> building responsive web applications with <strong className="text-slate-900">Next.js</strong>, <strong className="text-slate-900">React</strong>, <strong className="text-slate-900">Node.js</strong>, and <strong className="text-slate-900">MongoDB</strong>. I value clear user flows, maintainable code, and learning how frontend and backend systems work together. I am eager to grow through collaborative, real-world projects.
            </p>
          </section>

          <section className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2.5 h-2.5 rounded-full bg-indigo-600"></span>
              <h2 className="text-lg font-black uppercase tracking-[0.18em] text-slate-800">Core Skills</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-center gap-2 font-semibold text-slate-900 mb-2">
                  <FaReact className="text-cyan-500" /> React.js
                </div>
                <p className="text-sm text-slate-600">Component-based architecture, reusable UI, state management, router integration.</p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-center gap-2 font-semibold text-slate-900 mb-2">
                  <FaJsSquare className="text-yellow-500" /> JavaScript
                </div>
                <p className="text-sm text-slate-600">ES6+, DOM manipulation, async patterns, array/object logic, frontend logic.</p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-center gap-2 font-semibold text-slate-900 mb-2">
                  <SiNextdotjs className="text-slate-900" /> Next.js
                </div>
                <p className="text-sm text-slate-600">React framework, App Router, layouts, and server-rendered pages.</p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-center gap-2 font-semibold text-slate-900 mb-2">
                  <FaNodeJs className="text-emerald-600" /> Node.js
                </div>
                <p className="text-sm text-slate-600">Server-side JavaScript, APIs, and backend fundamentals.</p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-center gap-2 font-semibold text-slate-900 mb-2">
                  <SiMongodb className="text-emerald-600" /> MongoDB
                </div>
                <p className="text-sm text-slate-600">Document databases, collections, and CRUD fundamentals.</p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-center gap-2 font-semibold text-slate-900 mb-2">
                  <HiCode className="text-blue-600" /> HTML / CSS
                </div>
                <p className="text-sm text-slate-600">Semantic markup, layouts, responsive design, animations, accessible interfaces.</p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-center gap-2 font-semibold text-slate-900 mb-2">
                  <HiSparkles className="text-indigo-600" /> Tailwind CSS
                </div>
                <p className="text-sm text-slate-600">Utility-first styling, responsive UIs, modern design systems, faster prototyping.</p>
              </div>
            </div>
          </section>

          <section className="mb-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-600"></span>
                <h2 className="text-lg font-black uppercase tracking-[0.18em] text-slate-800">Education</h2>
              </div>

              <div className="space-y-3">
                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                  <p className="text-sm font-bold text-slate-900">B.Sc. in Mathematics</p>
                  <p className="text-sm text-blue-600 font-semibold mt-1">Dhaka Central University</p>
                  <p className="mt-2 text-xs text-slate-500">2024 - 2028</p>
                  <p className="mt-2 text-xs text-slate-500">CGPA: 3.50 / 4.00</p>
                  <p className="mt-3 text-sm leading-6 text-slate-600">Key studies: Linear Programming, Numerical Analysis, Real Analysis, Complex Analysis, Topology, Abstract Algebra, and Advanced Calculus.</p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                  <p className="text-sm font-bold text-slate-900">Higher Secondary Certificate (HSC)</p>
                  <p className="text-sm text-blue-600 font-semibold mt-1">Paruara Abdul Matin Khasru College</p>
                  <p className="mt-2 text-xs text-slate-500">2019 - 2021 • Cumilla, Bangladesh • GPA: 5.00 / 5.00 (A+)</p>
                  <p className="mt-3 text-sm leading-6 text-slate-600">Key studies: Physics, Chemistry, Biology, Higher Mathematics, and ICT.</p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                  <p className="text-sm font-bold text-slate-900">Secondary School Certificate (SSC)</p>
                  <p className="text-sm text-blue-600 font-semibold mt-1">Cantonment Board Girls High School</p>
                  <p className="mt-2 text-xs text-slate-500">2017 - 2019 • Cumilla, Bangladesh • GPA: 5.00 / 5.00 (A+)</p>
                  <p className="mt-3 text-sm leading-6 text-slate-600">Key studies: General Science, Advanced Mathematics, and ICT.</p>
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                <h2 className="text-lg font-black uppercase tracking-[0.18em] text-slate-800">Certifications</h2>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-emerald-50 p-4">
                <p className="font-semibold text-slate-900">AI-Driven Full Stack Web Engineering with Programming Hero</p>
                <p className="text-xs text-slate-600 mt-1">Batch 14</p>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2.5 h-2.5 rounded-full bg-violet-600"></span>
              <h2 className="text-lg font-black uppercase tracking-[0.18em] text-slate-800">Featured Projects</h2>
            </div>

            <div className="space-y-4">
              {projects.map((project) => (
                <div key={project.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <h3 className="text-base font-bold text-slate-900">{project.title}</h3>
                    <a href={project.live} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-[11px] font-semibold text-blue-600 hover:underline">
                      Live project <HiExternalLink />
                    </a>
                  </div>
                  <p className="mt-2 text-sm text-slate-600">{project.description}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="w-2.5 h-2.5 rounded-full bg-pink-500"></span>
                <h2 className="text-lg font-black uppercase tracking-[0.18em] text-slate-800">Strengths</h2>
              </div>
              <div className="space-y-3 text-sm text-slate-700">
                <div className="rounded-2xl border border-slate-200 bg-pink-50 p-4">Fast learner and adaptable to new tools</div>
                <div className="rounded-2xl border border-slate-200 bg-violet-50 p-4">Strong problem-solving and debugging mindset</div>
                <div className="rounded-2xl border border-slate-200 bg-emerald-50 p-4">Good communication and team collaboration</div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Resume;
