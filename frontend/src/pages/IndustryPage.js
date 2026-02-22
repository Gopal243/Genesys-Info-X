import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const LOGO_URL =
  "https://customer-assets.emergentagent.com/job_cinematic-web-17/artifacts/3v7eszuf_ChatGPT%20Image%20Feb%2019%2C%202026%2C%2001_31_19%20PM.png";

function PageHeader({ title }) {
  return (
    <header className="site-header dark scrolled">
      <div className="site-header-inner">
        <Link to="/" className="brand" aria-label="Genesys Info X">
          <img className="brand-logo" src={LOGO_URL} alt="Genesys Info X" />
          <div className="brand-text">
            <div className="brand-title">Genesys Info X</div>
            <div className="brand-sub">Technology • Healthcare • Semiconductors</div>
          </div>
        </Link>
        <div className="page-title-chip">{title}</div>
        <Link className="header-cta" to="/#contact">
          Talk to an Expert <span aria-hidden>→</span>
        </Link>
      </div>
    </header>
  );
}

export default function IndustryPage({
  title,
  lede,
  bullets,
  videoUrl,
  related,
  pageKey,
}) {
  const sectionBgVideo =
    pageKey === "healthcare"
      ? "/media/healthcare.mp4"
      : pageKey === "semiconductors"
        ? "/media/semiconductors.mp4"
        : "/media/tech.mp4";
  return (
    <div className={`page page-industry ${pageKey ? `page-${pageKey}` : ""}`}>
      <PageHeader title={title} />
      <main className="industry-page" id="top">
        <section className="industry-hero">
          <div className="industry-hero-bg">
            <video autoPlay muted loop playsInline preload="none">
              <source src={videoUrl} type="video/mp4" />
            </video>
            <div className="industry-hero-overlay" />
          </div>
          <div className="container industry-hero-inner">
            <motion.h1
              className="industry-hero-title"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              {title}
            </motion.h1>
            <motion.p
              className="industry-hero-lede"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              {lede}
            </motion.p>
            <div className="hero-actions">
              <Link className="btn btn-primary" to="/#contact">
                Book a Consultation <span aria-hidden>→</span>
              </Link>
              <Link className="btn btn-secondary" to="/">
                Back to Home
              </Link>
            </div>
          </div>
        </section>

        <section className="section has-video-bg">
          <div className="section-video-bg" aria-hidden>
            <video autoPlay muted loop playsInline preload="none">
              <source src={sectionBgVideo} type="video/mp4" />
            </video>
            <div className="section-video-overlay" />
          </div>
          <div className="container">
            <div className="split">
              <div>
                <div className="section-kicker">CAPABILITIES</div>
                <h2 className="section-title">Enterprise-grade delivery, inside the grid</h2>
                <p className="section-lede muted">
                  Clear scope, clear milestones, and clean systems—built to ship reliably.
                </p>
              </div>
              <div className="bullets">
                {bullets.map((b) => (
                  <div key={b} className="bullet">
                    <span className="bullet-dot" aria-hidden />
                    {b}
                  </div>
                ))}
              </div>
            </div>

            <div className="related">
              {related.map((r) => (
                <Link key={r.title} to={r.to} className="industry-card">
                  <div className="industry-card-top">
                    <h3>{r.title}</h3>
                    <span className={`industry-icon ${r.icon}`} aria-hidden />
                  </div>
                  <p>{r.desc}</p>
                  <span className="industry-link">Explore capabilities →</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer minimal">
        <div className="footer-bottom">
          <div className="container footer-bottom-inner">
            <div>© 2026 Genesys Info X. All rights reserved.</div>
            <Link className="footer-link" to="/">
              Home
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
