import { Link } from "react-router-dom";
import { HiArrowLeft, HiDocumentDownload, HiDocumentSearch } from "react-icons/hi";
import resumeImage from "../assets/resume-preview.jpg";

// আসল resume PDF (Google Drive থেকে নেওয়া) public/ ফোল্ডারে আছে, তাই
// ডাউনলোড বোতামে সরাসরি ফাইলটা ডাউনলোড হয় — কোনো Drive preview নয়।
const RESUME_PDF = "/resume.pdf";
const RESUME_FILE_NAME = "Nishat-Tasnim-Tonni-Resume.pdf";

const ResumePreview = () => {
  return (
    <main className="min-h-screen bg-slate-950 pt-28 pb-20 px-4 sm:px-6 text-slate-100">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6 print:hidden">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-200 bg-white/5 border border-white/10 px-4 py-2.5 rounded-xl backdrop-blur-sm hover:bg-white/10 hover:text-cyan-300 transition"
          >
            <HiArrowLeft className="text-base" /> Back to Portfolio
          </Link>

          <a
            href={RESUME_PDF}
            download={RESUME_FILE_NAME}
            className="inline-flex items-center gap-2 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-500 hover:from-blue-500 hover:to-indigo-400 px-5 py-2.5 rounded-xl shadow-md shadow-cyan-500/20 hover:shadow-lg hover:shadow-amber-400/30 transition transform hover:-translate-y-0.5"
          >
            <HiDocumentDownload className="text-base" /> Download PDF
          </a>
        </div>

        <div className="text-center mb-8 space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-cyan-300 text-xs font-semibold uppercase tracking-wider">
            <HiDocumentSearch className="text-sm" />
            <span>Resume</span>
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Nishat Tasnim <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-yellow-500">Tonni</span>
          </h1>
          <p className="text-sm sm:text-base text-slate-400">
            Junior Full-Stack Developer — clickable preview of my resume.
          </p>
        </div>

        <div className="rounded-2xl overflow-hidden border border-white/10 bg-white shadow-[0_25px_80px_rgba(0,0,0,0.55)]">
          <img
            src={resumeImage}
            alt="Nishat Tasnim Tonni — resume preview"
            className="block w-full h-auto"
            loading="lazy"
            decoding="async"
          />
        </div>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 text-center print:hidden">
          <a
            href={RESUME_PDF}
            download={RESUME_FILE_NAME}
            className="inline-flex items-center gap-2 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-500 hover:from-blue-500 hover:to-indigo-400 px-6 py-3 rounded-xl shadow-md transition"
          >
            <HiDocumentDownload className="text-lg" /> Download Resume (PDF)
          </a>

          <Link
            to="/resume"
            className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-300 border border-cyan-400/30 bg-cyan-400/10 px-6 py-3 rounded-xl hover:bg-cyan-400/20 transition"
          >
            View detailed version <HiArrowLeft className="text-base rotate-180" />
          </Link>
        </div>
      </div>
    </main>
  );
};

export default ResumePreview;
