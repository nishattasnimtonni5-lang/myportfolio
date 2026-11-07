import { useState } from "react";
import { createPortal } from "react-dom";
import {
  HiOutlineMail,
  HiOutlinePhone,
  HiOutlineLocationMarker,
  HiOutlineChatAlt2,
  HiOutlineCheckCircle,
  HiX,
} from "react-icons/hi";
import { FaGithub, FaLinkedin, FaFacebook, FaPaperPlane } from "react-icons/fa";

// Messages posted here are forwarded to this inbox (FormSubmit, free & keyless).
const CONTACT_EMAIL = "nishattasnimtonni5@gmail.com";

const emptyForm = { name: "", email: "", subject: "", message: "" };

const Contact = () => {
  const [formData, setFormData] = useState(emptyForm);

  const [status, setStatus] = useState({
    submitting: false,
    submitted: false,
    error: null,
    channel: null, // "inbox" (delivered) | "email-app" (visitor presses Send)
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      setStatus({
        submitting: false,
        submitted: false,
        error: "Please fill in all required fields.",
        channel: null,
      });
      return;
    }

    setStatus({ submitting: true, submitted: false, error: null, channel: null });

    // Never hang on "Sending Message..." — bail out to the mail-app fallback.
    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => controller.abort(), 9000);

    try {
      const response = await fetch(`https://formsubmit.co/ajax/${CONTACT_EMAIL}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        signal: controller.signal,
        body: JSON.stringify({
          _subject: `New portfolio message from ${formData.name}`,
          _template: "table",
          Name: formData.name,
          Email: formData.email,
          Subject: formData.subject || "Portfolio contact form",
          Message: formData.message,
        }),
      });

      if (!response.ok) throw new Error("FormSubmit request failed");

      setStatus({ submitting: false, submitted: true, error: null, channel: "inbox" });
      setFormData(emptyForm);
    } catch {
      // Fallback so the message is never lost: hand it to the visitor's mail app.
      const subject = encodeURIComponent(
        formData.subject || `Portfolio message from ${formData.name}`,
      );
      const body = encodeURIComponent(
        `${formData.message}\n\n— ${formData.name}\n${formData.email}`,
      );
      window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
      setStatus({ submitting: false, submitted: true, error: null, channel: "email-app" });
      setFormData(emptyForm);
    } finally {
      window.clearTimeout(timeoutId);
    }

    // Auto-hide the toast after 7 seconds
    window.setTimeout(() => {
      setStatus((prev) => ({ ...prev, submitted: false }));
    }, 7000);
  };

  return (
    <section id="contact" className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
      {/* Golden success toast — portalled to <body>: the contact section carries a
          transform (reveal animation) which would otherwise trap position: fixed. */}
      {createPortal(
        status.submitted ? (
        <div
          role="status"
          aria-live="polite"
          className="contact-toast fixed top-24 right-4 sm:right-6 z-[70] w-[calc(100%-2rem)] sm:w-auto sm:max-w-md p-4 rounded-2xl border border-amber-200/80 bg-gradient-to-br from-amber-200 via-amber-300 to-amber-400 text-amber-950 shadow-[0_20px_45px_rgba(245,158,11,0.35)] flex items-start gap-3"
        >
          <HiOutlineCheckCircle className="text-2xl text-amber-900 shrink-0 mt-0.5" />
          <div className="min-w-0">
            <p className="text-sm font-extrabold tracking-tight">
              {status.channel === "email-app"
                ? "Your email app is opening…"
                : "Message sent to my inbox!"}
            </p>
            <p className="text-xs font-medium text-amber-900/85 mt-0.5 leading-relaxed">
              {status.channel === "email-app"
                ? `The message is ready in your mail app — press Send and it lands at ${CONTACT_EMAIL}.`
                : `It just reached ${CONTACT_EMAIL}. Thanks for reaching out — I'll reply as soon as I can.`}
            </p>
          </div>
          <button
            type="button"
            onClick={() => setStatus((prev) => ({ ...prev, submitted: false }))}
            aria-label="Dismiss notification"
            className="ml-auto shrink-0 w-7 h-7 rounded-lg flex items-center justify-center text-amber-900/60 hover:text-amber-950 hover:bg-amber-950/10 transition cursor-pointer"
          >
            <HiX className="text-base" />
          </button>
        </div>
        ) : null,
        document.body,
      )}
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/60 text-blue-700 text-xs font-semibold uppercase tracking-wider">
          <HiOutlineChatAlt2 className="text-blue-600 text-sm" />
          <span>Get In Touch</span>
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight">
          Let's <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Connect</span>
        </h2>

        <p className="text-base sm:text-lg text-gray-600">
          Have an internship or junior full-stack opportunity, project idea, or simply want to chat about tech? My inbox is open.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Column: Direct Info Cards & Social Links (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-2xl border border-gray-200/90 p-6 sm:p-8 shadow-xs space-y-6">
            <h3 className="text-xl font-bold text-gray-900">
              Contact Information
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              I am open to internship and junior full-stack developer opportunities and ready to grow with a collaborative team.
            </p>

            <div className="space-y-4 pt-2">
              {/* Email */}
              <a
                href="mailto:nishattasnimtonni5@gmail.com"
                className="flex items-start gap-4 p-3.5 rounded-xl bg-gray-50 hover:bg-blue-50/70 border border-gray-100 hover:border-blue-200 transition group"
              >
                <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <HiOutlineMail className="text-xl" />
                </div>
                <div>
                  <span className="text-xs text-gray-500 font-medium block">
                    Email Address
                  </span>
                  <span className="text-sm font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                    nishattasnimtonni5@gmail.com
                  </span>
                </div>
              </a>

              {/* Phone */}
              <a
                href=""
                className="flex items-start gap-4 p-3.5 rounded-xl bg-gray-50 hover:bg-blue-50/70 border border-gray-100 hover:border-blue-200 transition group"
              >
                <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <HiOutlinePhone className="text-xl" />
                </div>
                <div>
                  <span className="text-xs text-gray-500 font-medium block">
                    Phone / WhatsApp
                  </span>
                  <span className="text-sm font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                   
                  </span>
                </div>
              </a>

              {/* Location */}
              <div className="flex items-start gap-4 p-3.5 rounded-xl bg-gray-50 border border-gray-100">
                <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                  <HiOutlineLocationMarker className="text-xl" />
                </div>
                <div>
                  <span className="text-xs text-gray-500 font-medium block">
                    Location
                  </span>
                  <span className="text-sm font-semibold text-gray-900">
                    Dhaka, Bangladesh · Remote only
                  </span>
                </div>
              </div>
            </div>

            {/* Social Links Bar */}
            <div className="pt-4 border-t border-gray-100">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-3">
                Social Profiles
              </span>
              <div className="flex items-center gap-3">
                <a
                  href="https://github.com/nishattasnimtonni5-lang"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub Profile"
                  className="w-10 h-10 rounded-xl bg-gray-100 hover:bg-gray-900 hover:text-white flex items-center justify-center text-gray-700 transition"
                >
                  <FaGithub className="text-lg" />
                </a>
                <a
                  href="https://www.linkedin.com/in/nishat-tasnim-tonni-webdev043/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn Profile"
                  className="w-10 h-10 rounded-xl bg-gray-100 hover:bg-blue-600 hover:text-white flex items-center justify-center text-gray-700 transition"
                >
                  <FaLinkedin className="text-lg" />
                </a>
                <a
                  href="https://www.facebook.com/profile.php?id=61578195001063"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Facebook Profile"
                  className="w-10 h-10 rounded-xl bg-gray-100 hover:bg-blue-600 hover:text-white flex items-center justify-center text-gray-700 transition"
                >
                  <FaFacebook className="text-lg" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Contact Form (7 cols) */}
        <div className="lg:col-span-7">
          <div className="bg-white rounded-2xl border border-gray-200/90 p-6 sm:p-10 shadow-xs">
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Send a Direct Message
            </h3>
            <p className="text-sm text-gray-500 mb-6">
              Fill out the form below and I'll respond as soon as possible.
            </p>

            {/* Success feedback is shown as a golden toast (fixed, top-right) */}

            {/* Error Message */}
            {status.error && (
              <div className="mb-6 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-sm">
                {status.error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Name */}
                <div>
                  <label htmlFor="name" className="block text-xs font-semibold text-gray-700 uppercase mb-1.5">
                    Your Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-gray-50/50 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition"
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-xs font-semibold text-gray-700 uppercase mb-1.5">
                    Email Address <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-gray-50/50 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition"
                  />
                </div>
              </div>

              {/* Subject */}
              <div>
                <label htmlFor="subject" className="block text-xs font-semibold text-gray-700 uppercase mb-1.5">
                  Subject / Role
                </label>
                <input
                  id="subject"
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Job Opportunity / Project Inquiry"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-gray-50/50 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition"
                />
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-xs font-semibold text-gray-700 uppercase mb-1.5">
                  Your Message <span className="text-rose-500">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Hello! We are looking for a Junior Full-Stack Developer to join our team..."
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-gray-50/50 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition resize-none"
                ></textarea>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={status.submitting}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold px-8 py-3.5 rounded-xl shadow-md shadow-blue-500/25 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {status.submitting ? (
                  <span>Sending Message...</span>
                ) : (
                  <>
                    <span>Send Message</span>
                    <FaPaperPlane className="text-sm" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
