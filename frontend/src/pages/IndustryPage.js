import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const LOGO_URL =
  "https://customer-assets.emergentagent.com/job_web-creator-768/artifacts/925qpowk_IMG_9976.jpg";

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
        <a className="header-cta" href="/#contact">
          Talk to an Expert <span aria-hidden>→</span>
        </a>
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
}) {
  return (
    <div className="page">
      <PageHeader title={title} />
      <main className="industry-page">
        <section className="industry-hero">
          <div className="industry-hero-bg">
            <video autoPlay muted loop playsInline preload="metadata">
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
              <a className="btn btn-primary" href="/#contact">
                Book a Consultation <span aria-hidden>→</span>
              </a>
              <Link className="btn btn-secondary" to="/">
                Back to Home
              </Link>
            </div>
          </div>
        </section>

        <section className="section">
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
