import { useMemo, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CountUp from "react-countup";
import axios from "axios";

import Reveal from "../components/Reveal";
import SiteHeader from "../components/SiteHeader";
import { INDUSTRY_IMAGES, INDUSTRY_VIDEOS, LOGO_URL } from "../siteData";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const BLISSBERG_LOGO_URL =
  "https://customer-assets.emergentagent.com/job_cinematic-web-17/artifacts/gf4jpk1d_BLISSBERG_logo_transparent.png";

const GREENX_LOGO_URL =
  "https://customer-assets.emergentagent.com/job_cinematic-web-17/artifacts/2powj3mv_ChatGPT%20Image%20Feb%2019%2C%202026%2C%2006_03_38%20PM.png";

function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero-bg">
        <video className="hero-video" autoPlay muted loop playsInline preload="none">
          <source
            src={INDUSTRY_VIDEOS.hero}
            type="video/mp4"
          />
        </video>
        <div className="hero-overlay" />
        <div className="hero-atmo" />
      </div>

      <div className="hero-inner">
        <Reveal>
          <div className="hero-logo-premium" aria-label="Genesys Info X">
            <div className="hero-logo-glow" aria-hidden />
            <img className="hero-logo-large" src={LOGO_URL} alt="Genesys Info X logo" />
            <div className="hero-logo-sweep" aria-hidden />
          </div>
        </Reveal>
        <Reveal delay={0.03}>
          <div className="hero-pill">Global IT Development & Consulting</div>
        </Reveal>

        {/* Keep the big hero logo as the primary heading visual */}
        {/* Reference site includes text headings; keeping them commented to avoid duplication */}
        {/*
        <Reveal delay={0.05}>
          <h1 className="hero-title">Genesys Info X</h1>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="hero-subtitle">Engineering Innovation Across</p>
        </Reveal>
        */}

        <Reveal delay={0.15}>
          <div className="hero-tags">
            <span className="tag tech">Technology</span>
            <span className="tag health">Healthcare</span>
            <span className="tag semi">Semiconductors</span>
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="hero-actions hero-actions-rich">
            <a className="btn btn-primary" href="#contact">
              Book a Consultation <span aria-hidden>→</span>
            </a>
            <a className="btn btn-secondary" href="#capabilities">
              Explore Capabilities
            </a>
            <a className="btn btn-ghost" href="#case-studies">
              View Case Studies
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Spotlight() {
  const items = useMemo(
    () => [
      {
        title: "AI-driven Operations",
        desc:
          "Automate the repetitive. Elevate the critical. Ship intelligence with reliability.",
        video: INDUSTRY_VIDEOS.technology,
        accent: "yellow",
      },
      {
        title: "Healthcare Systems",
        desc: "RCM workflows, billing, coding, analytics, and compliance-ready delivery.",
        video: INDUSTRY_VIDEOS.healthcare,
        accent: "green",
      },
      {
        title: "Semiconductor Platforms",
        desc: "Performance, safety, and scale—built for high-stakes engineering.",
        video: INDUSTRY_VIDEOS.semiconductors,
        accent: "yellow",
      },
    ],
    [],
  );

  return (
    <section className="section has-video-bg" id="spotlight">
      <div className="section-video-bg" aria-hidden>
        <video autoPlay muted loop playsInline preload="none">
          <source src={INDUSTRY_VIDEOS.technology} type="video/mp4" />
        </video>
        <div className="section-video-overlay" />
      </div>
      <div className="container">
        <Reveal>
          <div className="section-kicker">SOLUTIONS SPOTLIGHT</div>
          <h2 className="section-title">Technology-packed delivery, across every layer</h2>
          <p className="section-lede">
            Visual systems, real engineering. Each spotlight card is built to feel alive—motion, depth,
            and a clear grid.
          </p>
        </Reveal>

        <div className="spotlight-grid">
          {items.map((item, idx) => (
            <Reveal key={item.title} delay={0.08 + idx * 0.06}>
              <a className={`spotlight-card accent-${item.accent}`} href="#contact">
                <div className="spotlight-media">
                  <video autoPlay muted loop playsInline preload="none">
                    <source src={item.video} type="video/mp4" />
                  </video>
                  <div className="spotlight-scrim" />
                </div>
                <div className="spotlight-body">
                  <div className="spotlight-heading">
                    <h3>{item.title}</h3>
                    <div className="spotlight-icon" aria-hidden />
                  </div>
                  <p>{item.desc}</p>
                  <span className="spotlight-link">Build something with us →</span>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Industries() {
  const cards = [
    {
      key: "technology",
      title: "Technology",
      desc: "AI, blockchain, cloud, and IoT solutions that accelerate digital transformation.",
      to: "/technology",
      icon: "chip",
      image: INDUSTRY_IMAGES.technology,
    },
    {
      key: "healthcare",
      title: "Healthcare",
      desc:
        "End-to-end services from medical billing & coding to AI-driven diagnostics and RCM.",
      to: "/healthcare",
      icon: "heart",
      image: INDUSTRY_IMAGES.healthcare,
    },
    {
      key: "semiconductors",
      title: "Semiconductors",
      desc: "Cutting-edge solutions for automotive performance, safety, and reliability.",
      to: "/semiconductors",
      icon: "stack",
      image: INDUSTRY_IMAGES.semiconductors,
    },
  ];

  return (
    <section className="section has-video-bg" id="industries">
      <div className="section-video-bg" aria-hidden>
        <video autoPlay muted loop playsInline preload="none">
          <source src={INDUSTRY_VIDEOS.semiconductors} type="video/mp4" />
        </video>
        <div className="section-video-overlay" />
      </div>
      <div className="container">
        <Reveal>
          <div className="section-kicker">WHO WE SERVE</div>
          <h2 className="section-title">Specialized solutions across three priority sectors</h2>
          <p className="section-lede">
            A focused portfolio—built for speed, compliance, and performance—so your teams can
            deliver more with less friction.
          </p>
        </Reveal>

        <div className="industry-grid">
          {cards.map((c, idx) => (
            <Reveal key={c.title} delay={0.06 + idx * 0.06}>
              <Link to={c.to} className="industry-card industry-card-rich">
                <div className="industry-media" aria-hidden>
                  <img src={c.image} alt="" loading="lazy" />
                  <div className="industry-media-scrim" />
                </div>
                <div className="industry-card-top">
                  <h3>{c.title}</h3>
                  <span className={`industry-icon ${c.icon}`} aria-hidden />
                </div>
                <p>{c.desc}</p>
                <span className="industry-link">Explore capabilities →</span>
              </Link>
            </Reveal>
          ))}
        </div>

        <div className="mini-metrics">
          <Reveal delay={0.05}>
            <div className="mini-metric">
              <div className="mini-label">Delivery model</div>
              <div className="mini-value">Enterprise-grade, partnership-first</div>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mini-metric">
              <div className="mini-label">Operating rhythm</div>
              <div className="mini-value">Roadmaps • Milestones • KPIs</div>
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mini-metric">
              <div className="mini-label">Outcome</div>
              <div className="mini-value">Speed, compliance, performance</div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function TechStack() {
  const groups = [
    {
      title: "AI",
      items: ["OpenAI", "LangChain", "Python", "Vector DBs", "MLOps"],
    },
    {
      title: "Cloud",
      items: ["AWS", "Azure", "GCP", "Kubernetes", "Serverless"],
    },
    {
      title: "Data",
      items: ["PostgreSQL", "MongoDB", "Spark", "Kafka", "dbt"],
    },
    {
      title: "Security",
      items: ["IAM", "SOC2", "Zero Trust", "SAST/DAST", "Observability"],
    },
  ];

  return (
    <section className="section has-video-bg" id="tech-stack">
      <div className="section-video-bg" aria-hidden>
        <video autoPlay muted loop playsInline preload="none">
          <source src={INDUSTRY_VIDEOS.technology} type="video/mp4" />
        </video>
        <div className="section-video-overlay" />
      </div>
      <div className="container">
        <Reveal>
          <div className="section-kicker">TECHNOLOGY STACK</div>
          <h2 className="section-title">Built with modern systems, not buzzwords</h2>
          <p className="section-lede">
            A fast view of the tools and platforms we work with—organized by category and designed
            for enterprise delivery.
          </p>
        </Reveal>

        <div className="stack-grid">
          {groups.map((g, idx) => (
            <Reveal key={g.title} delay={0.06 + idx * 0.06}>
              <div className="stack-card">
                <div className="stack-head">
                  <h3>{g.title}</h3>
                  <span className="stack-dot" aria-hidden />
                </div>
                <div className="pill-row">
                  {g.items.map((it) => (
                    <span key={it} className="pill">
                      {it}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Exclusives() {
  const cards = [
    {
      title: "Blissberg",
      desc:
        "Premium semiconductor solutions and engineering excellence for next-generation technology.",
      href: "https://blissbergsemi.com/",
      logo: BLISSBERG_LOGO_URL,
    },
    {
      title: "Genesys Green X",
      desc: "Sustainable energy solutions and green technology innovation for a cleaner future.",
      href: "https://www.genesysgreenx.com/",
      logo: GREENX_LOGO_URL,
    },
  ];

  return (
    <section className="section has-video-bg" id="exclusives">
      <div className="section-video-bg" aria-hidden>
        <video autoPlay muted loop playsInline preload="none">
          <source src={INDUSTRY_VIDEOS.semiconductors} type="video/mp4" />
        </video>
        <div className="section-video-overlay" />
      </div>
      <div className="container">
        <Reveal>
          <div className="section-kicker">OUR EXCLUSIVES</div>
          <h2 className="section-title">Our exclusive ventures and partnerships</h2>
          <p className="section-lede">
            Strategic initiatives that extend our reach across semiconductors and sustainable energy
            sectors.
          </p>
        </Reveal>

        <div className="exclusive-grid">
          {cards.map((c, idx) => (
            <Reveal key={c.title} delay={0.06 + idx * 0.06}>
              <div className="exclusive-card">
                <div className="exclusive-top">
                  <div className="exclusive-brand">
                    <div className="exclusive-logo-wrap">
                      <img src={c.logo} alt={`${c.title} logo`} className="exclusive-logo" />
                    </div>
                    <h3>{c.title}</h3>
                  </div>
                  <a className="visit" href={c.href} target="_blank" rel="noreferrer">
                    Visit Website
                  </a>
                </div>
                <p>{c.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhoWeAre() {
  return (
    <section className="section has-video-bg" id="who-we-are">
      <div className="section-video-bg" aria-hidden>
        <video autoPlay muted loop playsInline preload="none">
          <source src={INDUSTRY_VIDEOS.healthcare} type="video/mp4" />
        </video>
        <div className="section-video-overlay" />
      </div>
      <div className="container">
        <div className="split">
          <Reveal>
            <div>
              <div className="section-kicker">WHO WE ARE</div>
              <h2 className="section-title">
                Empowering businesses with technology, healthcare, and semiconductor solutions
              </h2>
              <p className="section-lede">
                GENESYS INFO X is a global IT development and consulting firm committed to driving
                digital transformation across industries.
              </p>
              <p className="section-lede muted">
                With a strong presence in North America, South America, Africa, Europe, and GCC
                countries, we deliver cutting-edge solutions in AI, healthcare, and semiconductor
                technology.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="stats">
              <div className="stat">
                <div className="stat-value">
                  <CountUp end={236} duration={1.2} />+
                </div>
                <div className="stat-label">Projects</div>
              </div>
              <div className="stat">
                <div className="stat-value">
                  <CountUp end={57} duration={1.2} />+
                </div>
                <div className="stat-label">Experts</div>
              </div>
              <div className="stat">
                <div className="stat-value">3</div>
                <div className="stat-label">Core sectors</div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Strength() {
  const items = [
    {
      title: "Driving Innovation",
      desc: "Emerging technologies built into real-world products—fast, clean, and scalable.",
    },
    {
      title: "Results‑Driven Focus",
      desc: "Measurable outcomes through disciplined delivery and transparent execution.",
    },
    {
      title: "Empowering Collaboration",
      desc: "Partnership-first teams with clear communication and strong ownership.",
    },
    {
      title: "Commitment to Excellence",
      desc: "High standards for reliability, quality, and performance—always.",
    },
    {
      title: "Global Footprint",
      desc: "Presence across North America, South America, Africa, Europe, and GCC.",
    },
    {
      title: "Future‑Proof Systems",
      desc: "Architectures designed to evolve—so your stack stays ahead of change.",
    },
    {
      title: "Enterprise Governance",
      desc: "Clear documentation, approvals, and traceable delivery across milestones.",
    },
    {
      title: "Reliable Delivery Cadence",
      desc: "Sprint rituals, quality gates, and production readiness from day one.",
    },
    {
      title: "Client‑Ready Communication",
      desc: "Status updates, risk registers, and stakeholder alignment built-in.",
    },
  ];

  return (
    <section className="section has-video-bg" id="strength">
      <div className="section-video-bg" aria-hidden>
        <video autoPlay muted loop playsInline preload="none">
          <source src={INDUSTRY_VIDEOS.technology} type="video/mp4" />
        </video>
        <div className="section-video-overlay" />
      </div>
      <div className="container">
        <Reveal>
          <div className="section-kicker">OUR STRENGTH</div>
          <h2 className="section-title">Streamlining processes, enhancing work efficiency & productivity</h2>
          <p className="section-lede">
            Premium engineering. Clear accountability. Execution that stays inside the grid—so the
            experience feels structured and enterprise.
          </p>
        </Reveal>

        <div className="card-grid">
          {items.map((it, idx) => (
            <Reveal key={it.title} delay={0.06 + idx * 0.05}>
              <div className="info-card">
                <h3>{it.title}</h3>
                <p>{it.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Mission() {
  return (
    <section className="section" id="mission">
      <div className="container">
        <div className="mission-grid">
          <Reveal>
            <div className="mission-card">
              <div className="section-kicker">OUR MISSION</div>
              <h2 className="section-title">We’re on a mission to change industry trends</h2>
              <p className="section-lede">
                At GENESYS INFO X, we drive digital transformation through innovative IT development,
                consulting, and AI-powered solutions—built for sustainable growth and operational
                excellence.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="mission-card alt">
              <h3 className="mission-small">Built for global execution</h3>
              <p className="section-lede muted">
                Custom solutions that optimize performance and future‑proof your business.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Capabilities() {
  const items = [
    {
      title: "Digital Strategy & Consulting",
      desc: "Aligned roadmaps, architecture choices, and delivery plans for measurable outcomes.",
    },
    {
      title: "IT Infrastructure Management",
      desc: "Secure, reliable environments designed for uptime and performance.",
    },
    {
      title: "AI & Machine Learning Solutions",
      desc: "Automation, intelligent insights, and product intelligence built into workflows.",
    },
    {
      title: "Data Analytics & BI",
      desc: "Dashboards and analytics that turn operational data into decisive action.",
    },
    {
      title: "Software Development & Design",
      desc: "Bespoke products and enterprise platforms built with modern engineering.",
    },
    {
      title: "Cloud Solutions & Integration",
      desc: "Migration, integration, and optimization for scale and cost-efficiency.",
    },
    {
      title: "Security-by-Design",
      desc: "Guardrails, monitoring, and best practices embedded across the SDLC.",
    },
    {
      title: "Product Engineering",
      desc: "From MVP to enterprise rollout—iterative delivery with predictable quality.",
    },
    {
      title: "Integration & APIs",
      desc: "Clean interfaces and dependable integrations between enterprise systems.",
    },
    {
      title: "DevOps & CI/CD",
      desc: "Automated pipelines, environments, and release governance for speed.",
    },
    {
      title: "Observability & Monitoring",
      desc: "Logs, metrics, tracing, alerts—production clarity without noise.",
    },
    {
      title: "QA Automation",
      desc: "Regression suites and quality gates that protect velocity.",
    },
    {
      title: "UX Engineering",
      desc: "Enterprise UX patterns with modern motion and accessible components.",
    },
    {
      title: "Data Engineering",
      desc: "Pipelines, warehousing, and governance for trusted data products.",
    },
    {
      title: "Enterprise Migration",
      desc: "Modernize legacy systems with minimal downtime and clear rollbacks.",
    },
  ];

  return (
    <section className="section has-video-bg" id="capabilities">
      <div className="section-video-bg" aria-hidden>
        <video autoPlay muted loop playsInline preload="none">
          <source src={INDUSTRY_VIDEOS.healthcare} type="video/mp4" />
        </video>
        <div className="section-video-overlay" />
      </div>
      <div className="container">
        <Reveal>
          <div className="section-kicker">SERVICES & CAPABILITIES</div>
          <h2 className="section-title">Enterprise-grade capabilities—designed to move work forward</h2>
          <p className="section-lede">
            From digital strategy to cloud integration, we deliver cohesive solutions that build speed
            into your operating model.
          </p>
        </Reveal>

        <div className="cap-grid">
          {items.map((it, idx) => (
            <Reveal key={it.title} delay={0.06 + idx * 0.03}>
              <div className="cap-card">
                <h3>{it.title}</h3>
                <p>{it.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function CaseStudies() {
  const items = [
    { title: "App for Health", tag: "Development" },
    { title: "UX Design for Tubus", tag: "Development" },
    { title: "Analysis of Security", tag: "Security" },
    { title: "Responsive Design", tag: "Optimization" },
    { title: "Cloud Cost Optimization", tag: "Cloud" },
    { title: "RCM Workflow Automation", tag: "Healthcare" },
    { title: "Semiconductor Test Analytics", tag: "Semiconductors" },
    { title: "Enterprise Data Dashboards", tag: "Data" },
  ];

  return (
    <section className="section has-video-bg" id="case-studies">
      <div className="section-video-bg" aria-hidden>
        <video autoPlay muted loop playsInline preload="none">
          <source src={INDUSTRY_VIDEOS.semiconductors} type="video/mp4" />
        </video>
        <div className="section-video-overlay" />
      </div>
      <div className="container">
        <Reveal>
          <div className="section-kicker">RECENT PROJECTS</div>
          <h2 className="section-title">Our latest case studies</h2>
          <p className="section-lede">
            A snapshot of the work we deliver—built with modern engineering, clean UX, and
            enterprise reliability.
          </p>
        </Reveal>

        <div className="projects-grid">
          {items.map((it, idx) => (
            <Reveal key={it.title} delay={0.06 + idx * 0.04}>
              <div className="project-card">
                <div className="project-tag">{it.tag}</div>
                <div className="project-title">{it.title}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const faqs = [
    {
      q: "What industries do you specialize in?",
      a: "We specialize in Technology, Healthcare, and Semiconductors—delivering focused solutions built for enterprise performance.",
    },
    {
      q: "Do you support global delivery?",
      a: "Yes. We operate across North America, South America, Africa, Europe, and GCC regions with distributed delivery teams.",
    },
    {
      q: "How do we start a project?",
      a: "Send a note through the contact form. We’ll schedule a discovery call, align on goals, and propose a clear delivery plan.",
    },
    {
      q: "What is your typical engagement model?",
      a: "We align on scope and outcomes first, then operate with a milestone-based delivery rhythm and clear KPIs.",
    },
    {
      q: "Do you handle security and compliance?",
      a: "Yes. We embed security-by-design practices, governance, and documentation into delivery and release cycles.",
    },
    {
      q: "Can you work with our internal teams?",
      a: "Absolutely. We collaborate with product, engineering, and operations stakeholders through clear communication and ownership.",
    },
    {
      q: "Do you offer ongoing support after launch?",
      a: "Yes. We can provide platform operations, monitoring, and iterative enhancements post-release.",
    },
  ];

  return (
    <section className="section has-video-bg" id="faq">
      <div className="section-video-bg" aria-hidden>
        <video autoPlay muted loop playsInline preload="none">
          <source src={INDUSTRY_VIDEOS.technology} type="video/mp4" />
        </video>
        <div className="section-video-overlay" />
      </div>
      <div className="container">
        <Reveal>
          <div className="section-kicker">FAQ</div>
          <h2 className="section-title">Clarity, upfront</h2>
          <p className="section-lede">A few quick answers to help you get started.</p>
        </Reveal>

        <div className="faq">
          {faqs.map((f, idx) => (
            <Reveal key={f.q} delay={0.04 + idx * 0.04}>
              <details className="faq-item">
                <summary>{f.q}</summary>
                <div className="faq-body">{f.a}</div>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");

  const onSubscribe = async (e) => {
    e.preventDefault();
    setStatus("sending");
    try {
      await axios.post(`${API}/contact`, {
        email,
        message: `Newsletter subscribe: ${email}`,
      });
      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section className="section has-video-bg" id="newsletter">
      <div className="section-video-bg" aria-hidden>
        <video autoPlay muted loop playsInline preload="none">
          <source src={INDUSTRY_VIDEOS.hero} type="video/mp4" />
        </video>
        <div className="section-video-overlay" />
      </div>
      <div className="container">
        <div className="newsletter">
          <Reveal>
            <div>
              <div className="section-kicker">NEWSLETTER</div>
              <h2 className="section-title">Subscribe for updates</h2>
              <p className="section-lede muted">Get recent updates & news from GENESYS INFO X.</p>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <form className="newsletter-form" onSubmit={onSubscribe}>
              <input
                type="email"
                required
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button className="btn btn-primary" type="submit" disabled={status === "sending"}>
                {status === "sending" ? "Subscribing…" : "Subscribe"}
              </button>
              {status === "success" && <div className="form-note ok">Subscribed.</div>}
              {status === "error" && <div className="form-note bad">Failed to subscribe.</div>}
            </form>
          </Reveal>
        </div>

        <Reveal delay={0.12}>
          <div className="newsletter-foot">
            <div className="newsletter-foot-title">Transforming businesses through technology</div>
            <div className="newsletter-foot-sub">
              Driving growth and efficiency for businesses worldwide.
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });
  const [status, setStatus] = useState("idle");

  const onSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    try {
      await axios.post(`${API}/contact`, {
        email: formData.email,
        message: `Name: ${formData.name}\nCompany: ${formData.company || "(not provided)"}\n\n${formData.message}`,
      });
      setStatus("success");
      setFormData({ name: "", email: "", company: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  return (
    <section className="section has-video-bg" id="contact">
      <div className="section-video-bg" aria-hidden>
        <video autoPlay muted loop playsInline preload="none">
          <source src={INDUSTRY_VIDEOS.hero} type="video/mp4" />
        </video>
        <div className="section-video-overlay" />
      </div>
      <div className="container">
        <div className="contact">
          <Reveal>
            <div>
              <div className="section-kicker">CONTACT</div>
              <h2 className="section-title">Tell us what you’re building</h2>
              <p className="section-lede muted">
                By submitting, you agree to be contacted by Genesys Info X regarding your request.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <form className="contact-form" onSubmit={onSubmit}>
              <div className="field-row">
                <input
                  placeholder="Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
                <input
                  placeholder="Email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
              <input
                placeholder="Company (optional)"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              />
              <textarea
                placeholder="Message"
                rows={6}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
              />
              <button className="btn btn-primary" type="submit" disabled={status === "sending"}>
                {status === "sending" ? "Sending…" : "Send Message"}
              </button>
              {status === "success" && <div className="form-note ok">Message sent.</div>}
              {status === "error" && <div className="form-note bad">Failed to send.</div>}
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <div className="footer-logo-badge">
            <img src={LOGO_URL} className="footer-logo" alt="Genesys Info X" />
          </div>
          <div className="footer-tag">Driving innovation through collaboration.</div>
        </div>

        <div className="footer-col">
          <div className="footer-label">Address</div>
          <div className="footer-text">
            2nd Floor, Block B, CYBER GATEWAY, Wing 1, Phase 2, HITEC City, Hyderabad, Telangana
            500081
          </div>
        </div>

        <div className="footer-col">
          <div className="footer-label">Email</div>
          <a className="footer-link" href="mailto:info@genesysinfox.com">
            info@genesysinfox.com
          </a>
          <div style={{ height: 10 }} />
          <div className="footer-label">Phone</div>
          <a className="footer-link" href="tel:+916309357756">
            +91 6309357756
          </a>
        </div>

        <div className="footer-col">
          <div className="footer-label">HR Contact</div>
          <a className="footer-link" href="mailto:hr@genesysinfox.com">
            hr@genesysinfox.com
          </a>
          <br />
          <a className="footer-link" href="mailto:hr@genesysinfox.in">
            hr@genesysinfox.in
          </a>
          <div style={{ height: 10 }} />
          <div className="footer-label">Careers</div>
          <a className="footer-link" href="mailto:careers@genesysinfox.com">
            careers@genesysinfox.com
          </a>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <div>© 2026 Genesys Info X. All rights reserved.</div>
        </div>
      </div>
    </footer>
  );
}

function TopButton() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 700);
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!show) return null;

  return (
    <button
      className="top-btn"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    >
      <span aria-hidden>^</span>
      Top
    </button>
  );
}

export default function HomePage() {
  return (
    <div className="page page-home">
      <SiteHeader variant="dark" logoUrl={LOGO_URL} industryImages={INDUSTRY_IMAGES} />
      <main>
        <Hero />
        <Spotlight />
        <Industries />
        <TechStack />
        <Exclusives />
        <WhoWeAre />
        <Strength />
        <Mission />
        <Capabilities />
        <CaseStudies />
        <FAQ />
        <Newsletter />
        <Contact />
      </main>
      <SiteFooter />
      <TopButton />
    </div>
  );
}
