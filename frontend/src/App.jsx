import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import ProjectDetails from './pages/ProjectDetails';
import Resume from './pages/Resume';

// Route change-এ নতুন page সবসময় উপর থেকে শুরু হোক — নাহলে browser আগের
// scroll position (যেমন home-এর projects section) ধরে রেখে detail page-এর
// শেষে নিয়ে যায়।
function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // #section anchor থাকলে ওই section-এ, নাহলে page-এর সবার উপরে
    if (hash) {
      const target = document.querySelector(hash);
      if (target) {
        target.scrollIntoView({ behavior: 'auto', block: 'start' });
        return;
      }
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [pathname, hash]);

  return null;
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="abyss-shell relative isolate min-h-screen bg-transparent text-gray-900 flex flex-col justify-between">
        <div className="portfolio-backdrop" aria-hidden="true" />
        <Navbar />
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects/:id" element={<ProjectDetails />} />
            <Route path="/resume" element={<Resume />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
