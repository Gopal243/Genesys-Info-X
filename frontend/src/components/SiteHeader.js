import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function SiteHeader({ variant = "dark", logoUrl, industryImages }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setOpen(null);
  }, [location.pathname, location.hash]);

  const menus = {
    solutions: {
      title: "Solutions",
      href: "/#capabilities",
      sections: [
        {
          title: "By capability",
          items: [
            {
              label: "AI & Automation",
              desc: "Operational intelligence, workflow automation, and reliable delivery.",
              to: "/#capabilities",
            },
            {
              label: "Cloud Modernization",
              desc: "Platform upgrades, integrations, and production-ready scale.",
              to: "/#capabilities",
            },
            {
              label: "Security-by-Design",
              desc: "Guardrails and monitoring embedded into release cycles.",
              to: "/#capabilities",
            },
            {
              label: "Data & BI",
              desc: "Dashboards and analytics to drive execution.",
              to: "/#capabilities",
            },
          ],
        },
        {
          title: "Delivery",
          items: [
            {
              label: "Discovery & Roadmaps",
              desc: "Define scope, milestones, and measurable outcomes.",
              to: "/#who-we-are",
            },
            {
              label: "Product Engineering",
              desc: "From MVP to enterprise rollout with predictable quality.",
              to: "/#capabilities",
            },
            {
              label: "Platform Operations",
              desc: "Uptime, observability, and performance at enterprise pace.",
              to: "/#strength",
            },
          ],
        },
      ],
      featured: {
        to: "/#spotlight",
        kicker: "Spotlight",
        title: "Technology-packed delivery",
        desc: "A premium grid with real engineering outcomes and clean UX.",
        cta: "Explore spotlight",
        image: industryImages.technology,
      },
    },
    industries: {
      title: "Industries",
      href: "/#industries",
      sections: [
        {
          title: "Core sectors",
          items: [
            {
              label: "Technology",
              desc: "AI, cloud, blockchain, and IoT—built for transformation.",
              to: "/technology",
            },
            {
              label: "Healthcare",
              desc: "RCM, billing, coding, analytics, and compliance-ready systems.",
              to: "/healthcare",
            },
            {
              label: "Semiconductors",
              desc: "High-stakes engineering for performance and reliability.",
              to: "/semiconductors",
            },
          ],
        },
        {
          title: "Outcomes",
          items: [
            {
              label: "Speed to production",
              desc: "Tight roadmaps with crisp execution.",
              to: "/#strength",
            },
            {
              label: "Compliance-ready delivery",
              desc: "Security and process built into delivery.",
              to: "/#strength",
            },
            {
              label: "Performance & reliability",
              desc: "Systems designed to scale and evolve.",
              to: "/#tech-stack",
            },
          ],
        },
      ],
      featured: {
        to: "/#industries",
        kicker: "Who we serve",
        title: "Three priority sectors",
        desc: "Focused solutions that stay inside the grid—enterprise by design.",
        cta: "View industries",
        image: industryImages.semiconductors,
      },
    },
    company: {
      title: "Company",
      href: "/#who-we-are",
      sections: [
        {
          title: "About",
          items: [
            {
              label: "Who we are",
              desc: "Global delivery teams with partnership-first execution.",
              to: "/#who-we-are",
            },
            {
              label: "Our mission",
              desc: "Change trends through disciplined innovation.",
              to: "/#mission",
            },
            {
              label: "Our strength",
              desc: "Streamlined processes and measurable productivity.",
              to: "/#strength",
            },
          ],
        },
        {
          title: "Engage",
          items: [
            {
              label: "Talk to an expert",
              desc: "Get a discovery call with a delivery plan.",
              to: "/#contact",
            },
            {
              label: "Newsletter",
              desc: "Updates from Genesys Info X.",
              to: "/#newsletter",
            },
          ],
        },
      ],
      featured: {
        to: "/#contact",
        kicker: "Contact",
        title: "Tell us what you’re building",
        desc: "We’ll align on scope, milestones, and outcomes.",
        cta: "Start a conversation",
        image: industryImages.healthcare,
      },
    },
    resources: {
      title: "Resources",
      href: "/#case-studies",
      sections: [
        {
          title: "Learn",
          items: [
            {
              label: "Case Studies",
              desc: "Recent delivery snapshots and system outcomes.",
              to: "/#case-studies",
            },
            {
              label: "FAQ",
              desc: "Quick answers to get started.",
              to: "/#faq",
            },
          ],
        },
        {
          title: "Exclusive ventures",
          items: [
            {
              label: "Blissberg",
              desc: "Semiconductor innovation and premium engineering.",
              to: "/#exclusives",
            },
            {
              label: "Genesys Green X",
              desc: "Sustainable energy and green technology.",
              to: "/#exclusives",
            },
          ],
        },
      ],
      featured: {
        to: "/#exclusives",
        kicker: "Partnerships",
        title: "Exclusives & ventures",
        desc: "Strategic initiatives extending reach across sectors.",
        cta: "View exclusives",
        image: industryImages.technology,
      },
    },
  };

  const baseClass = variant === "light" ? "site-header light" : "site-header dark";

  const MegaMenu = ({ id }) => {
    const m = menus[id];
    if (!m || open !== id) return null;

    return (
      <motion.div
        className="mega"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 8 }}
        transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
        role="menu"
        aria-label={`${m.title} menu`}
      >
        <div className="mega-head">
          <div className="mega-title">{m.title}</div>
          <Link className="mega-link" to={m.href}>
            View section →
          </Link>
        </div>

        <div className="mega-grid">
          <div className="mega-cols">
            {m.sections.map((s) => (
              <div key={s.title} className="mega-col">
                <div className="mega-col-title">{s.title}</div>
                <div className="mega-items">
                  {s.items.map((it) => (
                    <Link key={it.label} className="mega-item" to={it.to}>
                      <div className="mega-item-label">{it.label}</div>
                      <div className="mega-item-desc">{it.desc}</div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <Link className="mega-feature" to={m.featured.to}>
            <img className="mega-feature-img" src={m.featured.image} alt="" loading="lazy" />
            <div className="mega-feature-overlay" />
            <div className="mega-feature-body">
              <div className="mega-feature-kicker">{m.featured.kicker}</div>
              <div className="mega-feature-title">{m.featured.title}</div>
              <div className="mega-feature-desc">{m.featured.desc}</div>
              <div className="mega-feature-cta">{m.featured.cta} →</div>
            </div>
          </Link>
        </div>
      </motion.div>
    );
  };

  const NavItem = ({ id, label, to }) => (
    <div
      className={`nav-item ${open === id ? "open" : ""}`}
      onMouseEnter={() => setOpen(id)}
      onMouseLeave={() => setOpen(null)}
    >
      <Link
        to={to}
        className="nav-link"
        onClick={() => setOpen((v) => (v === id ? null : id))}
        aria-haspopup="true"
        aria-expanded={open === id}
      >
        {label} <span className="nav-caret" aria-hidden>
          ▾
        </span>
      </Link>
      <MegaMenu id={id} />
    </div>
  );

  return (
    <header className={`${baseClass} ${scrolled ? "scrolled" : ""}`}>
      <div className="site-header-inner">
        <button className="brand" onClick={() => navigate("/")} aria-label="Genesys Info X">
          <img className="brand-logo" src={logoUrl} alt="Genesys Info X" />
          <div className="brand-text">
            <div className="brand-title">Genesys Info X</div>
            <div className="brand-sub">Technology • Healthcare • Semiconductors</div>
          </div>
        </button>

        <nav className="site-nav" aria-label="Primary">
          <Link className="nav-link" to="/#spotlight">
            Spotlight
          </Link>
          <Link className="nav-link" to="/#tech-stack">
            Tech Stack
          </Link>
          <NavItem id="industries" label="Industries" to="/#industries" />
          <NavItem id="solutions" label="Solutions" to="/#capabilities" />
          <NavItem id="company" label="Company" to="/#who-we-are" />
          <NavItem id="resources" label="Resources" to="/#case-studies" />
          <Link className="nav-link" to="/#faq">
            FAQ
          </Link>
        </nav>

        <Link className="header-cta" to="/#contact">
          Talk to an Expert <span aria-hidden>→</span>
        </Link>
      </div>
    </header>
  );
}
