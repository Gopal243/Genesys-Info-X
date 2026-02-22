import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import SiteHeader from "../components/SiteHeader";
import Reveal from "../components/Reveal";
import { INDUSTRY_IMAGES, LOGO_URL, PAGE_IMAGES } from "../siteData";

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

  const deliverCards =
    pageKey === "healthcare"
      ? [
          {
            title: "RCM & Billing Systems",
            desc: "Workflow design, coding support, and revenue integrity.",
          },
          {
            title: "Automation & QA",
            desc: "Reduce manual effort with reliable, testable automation.",
          },
          {
            title: "Analytics & Reporting",
            desc: "Dashboards and insights for operational visibility.",
          },
          {
            title: "Compliance-ready Delivery",
            desc: "Security-by-design with disciplined governance.",
          },
          {
            title: "Integrations",
            desc: "Connect systems with clean APIs and dependable data flows.",
          },
          {
            title: "Care Team UX",
            desc: "Interfaces that support speed, clarity, and usability.",
          },
        ]
      : pageKey === "semiconductors"
        ? [
            {
              title: "Test Analytics",
              desc: "Data systems that improve yield, quality, and insights.",
            },
            {
              title: "Platform Engineering",
              desc: "High-performance systems for complex engineering programs.",
            },
            {
              title: "Reliability Tooling",
              desc: "Validation workflows designed for critical systems.",
            },
            {
              title: "Data Pipelines",
              desc: "Clean pipelines and governance for engineering data.",
            },
            {
              title: "Performance Optimization",
              desc: "Design for latency, throughput, and stability.",
            },
            {
              title: "Program Delivery",
              desc: "Milestones, traceability, and predictable execution.",
            },
          ]
        : [
            {
              title: "AI Operations",
              desc: "Production-ready automation for high-impact workflows.",
            },
            {
              title: "Cloud Modernization",
              desc: "Platform upgrades that enable faster delivery.",
            },
            {
              title: "Security-by-Design",
              desc: "Guardrails integrated into the SDLC.",
            },
            {
              title: "Data & BI",
              desc: "Decision dashboards and analytics foundations.",
            },
            {
              title: "Integrations",
              desc: "APIs that keep systems clean and scalable.",
            },
            {
              title: "Product Engineering",
              desc: "From roadmap to release with enterprise-quality UX.",
            },
          ];

  const useCases =
    pageKey === "healthcare"
      ? [
          {
            title: "Billing Workflow Automation",
            desc: "Reduce cycle time with structured automation.",
            image: INDUSTRY_IMAGES.healthcare,
          },
          {
            title: "Claims & Coding Analytics",
            desc: "Improve visibility and accuracy with dashboards.",
            image: INDUSTRY_IMAGES.technology,
          },
          {
            title: "Care Team Interfaces",
            desc: "Modern UX for daily operational efficiency.",
            image: INDUSTRY_IMAGES.healthcare,
          },
        ]
      : pageKey === "semiconductors"
        ? [
            {
              title: "Yield & Test Dashboards",
              desc: "Operational dashboards for engineering outcomes.",
              image: INDUSTRY_IMAGES.semiconductors,
            },
            {
              title: "Reliability Programs",
              desc: "Process tooling for critical validation cycles.",
              image: INDUSTRY_IMAGES.technology,
            },
            {
              title: "Performance Workflows",
              desc: "Systems designed for speed and stability.",
              image: INDUSTRY_IMAGES.semiconductors,
            },
          ]
        : [
            {
              title: "Data Platform Modernization",
              desc: "Scale pipelines and improve system clarity.",
              image: INDUSTRY_IMAGES.technology,
            },
            {
              title: "AI-enabled Operations",
              desc: "Automation that is measurable and reliable.",
              image: INDUSTRY_IMAGES.technology,
            },
            {
              title: "Security Governance",
              desc: "Guardrails that improve delivery speed.",
              image: INDUSTRY_IMAGES.semiconductors,
            },
          ];

  const steps = [
    { title: "Discovery", desc: "Align on goals, constraints, and outcomes." },
    { title: "Architecture", desc: "Design the system inside a clean grid." },
    { title: "Build", desc: "Implement with quality gates and ownership." },
    { title: "Launch", desc: "Production readiness, monitoring, and stability." },
    { title: "Optimize", desc: "Iterate with KPIs and continuous improvement." },
  ];

  return (
    <div className={`page page-industry ${pageKey ? `page-${pageKey}` : ""}`}>
      <SiteHeader variant="dark" logoUrl={LOGO_URL} industryImages={INDUSTRY_IMAGES} />

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

        {/* Rich content blocks (entry animations only) */}
        <section className="section" id="outcomes">
          <div className="container">
            <Reveal>
              <div className="section-kicker">KEY OUTCOMES</div>
              <h2 className="section-title">Operational improvements you can measure</h2>
              <p className="section-lede">
                Built for enterprise execution: clear metrics, reliable releases, and systems that scale.
              </p>
            </Reveal>

            <div className="metrics-grid">
              <Reveal delay={0.06}>
                <div className="metric-card">
                  <div className="metric-value">+35%</div>
                  <div className="metric-label">Faster cycle time</div>
                </div>
              </Reveal>
              <Reveal delay={0.12}>
                <div className="metric-card">
                  <div className="metric-value">-28%</div>
                  <div className="metric-label">Reduced manual workload</div>
                </div>
              </Reveal>
              <Reveal delay={0.18}>
                <div className="metric-card">
                  <div className="metric-value">+22%</div>
                  <div className="metric-label">Improved delivery velocity</div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        <section className="section has-video-bg" id="deliver">
          <div className="section-video-bg" aria-hidden>
            <video autoPlay muted loop playsInline preload="none">
              <source src={sectionBgVideo} type="video/mp4" />
            </video>
            <div className="section-video-overlay" />
          </div>
          <div className="container">
            <Reveal>
              <div className="section-kicker">WHAT WE DELIVER</div>
              <h2 className="section-title">A structured portfolio, designed for execution</h2>
              <p className="section-lede muted">
                Consistent delivery patterns across teams—inside a premium grid.
              </p>
            </Reveal>

            <div className="deliver-grid">
              {deliverCards.map((c, idx) => (
                <Reveal key={c.title} delay={0.06 + idx * 0.03}>
                  <div className="deliver-card">
                    <h3>{c.title}</h3>
                    <p>{c.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="use-cases">
          <div className="container">
            <Reveal>
              <div className="section-kicker">USE CASES</div>
              <h2 className="section-title">High-impact programs, shipped with clarity</h2>
              <p className="section-lede">A few representative use cases—built to be production-ready.</p>
            </Reveal>

            <div className="usecase-grid">
              {useCases.map((u, idx) => (
                <Reveal key={u.title} delay={0.08 + idx * 0.06}>
                  <div className="usecase-card">
                    <div className="usecase-media" aria-hidden>
                      <img src={u.image} alt="" loading="lazy" />
                      <div className="usecase-scrim" />
                    </div>
                    <div className="usecase-body">
                      <div className="usecase-title">{u.title}</div>
                      <div className="usecase-desc">{u.desc}</div>
                      <Link className="usecase-cta" to="/#contact">
                        Discuss this →
                      </Link>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="delivery-model">
          <div className="container">
            <Reveal>
              <div className="section-kicker">DELIVERY MODEL</div>
              <h2 className="section-title">A disciplined process that stays predictable</h2>
              <p className="section-lede muted">From discovery to launch—clear steps, clear ownership.</p>
            </Reveal>

            <div className="steps">
              {steps.map((s, idx) => (
                <Reveal key={s.title} delay={0.06 + idx * 0.04}>
                  <div className="step">
                    <div className="step-index">{idx + 1}</div>
                    <div>
                      <div className="step-title">{s.title}</div>
                      <div className="step-desc">{s.desc}</div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="section cta-band" id="industry-cta">
          <div className="container">
            <div className="cta-band-inner">
              <Reveal>
                <div>
                  <div className="section-kicker">NEXT STEP</div>
                  <h2 className="section-title">Ready to scope a delivery plan?</h2>
                  <p className="section-lede muted">
                    Share your goals—we’ll respond with a structured approach, timelines, and milestones.
                  </p>
                </div>
              </Reveal>
              <Reveal delay={0.08}>
                <div className="cta-band-actions">
                  <Link className="btn btn-primary" to="/#contact">
                    Book a Consultation <span aria-hidden>→</span>
                  </Link>
                  <Link className="btn btn-secondary" to="/">
                    Back to Home
                  </Link>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Original page content (kept) */}
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
