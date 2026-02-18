import { useEffect, useRef, useState } from 'react';
import './App.css';
import { motion, useInView, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import CountUp from 'react-countup';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;
const LOGO_URL = 'https://customer-assets.emergentagent.com/job_web-creator-768/artifacts/925qpowk_IMG_9976.jpg';

// Detailed content for verticals
const verticalDetails = {
  tech: {
    title: "Technology",
    intro: "Technology at Genesys Info X represents a future-focused innovation ecosystem designed to help enterprises scale faster, integrate smarter, and build resilient digital platforms.",
    description: "Our technology division combines artificial intelligence, cloud engineering, enterprise software development, cybersecurity practices, and automation frameworks to deliver solutions that drive operational excellence and digital transformation.",
    areas: [
      {
        title: "Enterprise Software Engineering",
        content: "We design and develop scalable web platforms, mobile applications, enterprise dashboards, and workflow automation systems tailored for evolving business environments. Our architecture prioritizes modular design, high performance, and seamless integration."
      },
      {
        title: "Artificial Intelligence & Machine Learning",
        content: "Genesys Info X builds intelligent solutions that enable predictive analytics, AI assistants, automation pipelines, and advanced decision-making systems. Our AI-first approach empowers organizations to unlock data-driven innovation."
      },
      {
        title: "Cloud & DevOps Transformation",
        content: "We help organizations migrate, optimize, and modernize their infrastructure through cloud-native practices, CI/CD pipelines, infrastructure automation, and performance monitoring strategies."
      },
      {
        title: "Cybersecurity & Compliance",
        content: "Security is embedded into every stage of development. Our practices include secure system design, DevSecOps frameworks, and compliance-ready architectures."
      },
      {
        title: "Blockchain & Emerging Technologies",
        content: "From tokenization concepts to secure distributed solutions, we explore next-generation digital ecosystems that enable transparency, traceability, and innovation."
      }
    ],
    outcomes: [
      "Faster deployment cycles",
      "Smarter automation",
      "Enterprise-grade scalability",
      "Future-ready technology ecosystems"
    ]
  },
  health: {
    title: "Healthcare",
    intro: "Healthcare innovation at Genesys Info X is driven by a mission to enhance patient outcomes, improve operational efficiency, and enable smarter healthcare ecosystems through technology.",
    description: "We combine digital health platforms, artificial intelligence, and data integration strategies to support modern healthcare providers and organizations.",
    areas: [
      {
        title: "Digital Health Platforms",
        content: "We design intuitive healthcare applications including patient engagement portals, provider dashboards, and digital workflow solutions that enhance accessibility and collaboration."
      },
      {
        title: "AI-Powered Healthcare Operations",
        content: "Our solutions leverage AI to support analytics, workflow automation, clinical decision support concepts, and resource optimization strategies."
      },
      {
        title: "Interoperability & System Integration",
        content: "Genesys Info X focuses on connecting systems securely to ensure seamless data exchange between platforms, improving coordination across healthcare environments."
      },
      {
        title: "Healthcare Analytics & Insights",
        content: "Advanced reporting and visualization tools help healthcare teams understand trends, optimize performance, and make informed decisions."
      },
      {
        title: "Workforce Enablement",
        content: "We support healthcare workforce development through structured learning models, digital transformation training, and future-ready skill programs."
      }
    ],
    vision: "To create a connected healthcare ecosystem where technology empowers both providers and patients through innovation, reliability, and secure digital transformation."
  },
  semi: {
    title: "Semiconductors",
    intro: "The semiconductor vertical at Genesys Info X focuses on building the foundation for innovation by supporting workforce readiness, industry collaboration, and engineering ecosystem awareness.",
    description: "As semiconductors drive the global technology landscape, our mission is to bridge talent development with industry demands through structured programs and innovation initiatives.",
    areas: [
      {
        title: "Industry-Ready Workforce Programs",
        content: "We create structured learning pathways designed to prepare professionals for semiconductor environments through practical exposure, evaluation models, and skill-based progression."
      },
      {
        title: "Engineering Enablement",
        content: "Our initiatives introduce participants to industry workflows, quality standards, engineering principles, and technology fundamentals aligned with modern semiconductor ecosystems."
      },
      {
        title: "Hands-On Learning Tracks",
        content: "From foundational knowledge to advanced specialization, our learning tracks focus on real-world applications and industry-aligned skill development."
      },
      {
        title: "Internship & Placement Models",
        content: "Genesys Info X supports structured internship frameworks that connect talent pipelines with evolving industry requirements."
      },
      {
        title: "Ecosystem Development",
        content: "By fostering innovation-driven learning and collaboration models, we aim to contribute to the growth of future semiconductor talent and engineering excellence."
      }
    ],
    mission: "To strengthen the innovation pipeline by nurturing skilled professionals who will power tomorrow's semiconductor advancements."
  }
};

// Animation variants
const fadeUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
};

const stagger = {
  visible: { transition: { staggerChildren: 0.15 } }
};

function App() {
  const [activeVertical, setActiveVertical] = useState(null);
  const [selectedVertical, setSelectedVertical] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [submitStatus, setSubmitStatus] = useState('');
  
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, 100]);

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus('sending');
    try {
      await axios.post(`${API}/contact`, { 
        email: formData.email, 
        message: `Name: ${formData.name}\nPhone: ${formData.phone}\n\n${formData.message}` 
      });
      setSubmitStatus('success');
      setFormData({ name: '', email: '', phone: '', message: '' });
      setTimeout(() => setSubmitStatus(''), 4000);
    } catch (error) {
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus(''), 4000);
    }
  };

  const openVerticalDetail = (vertical) => {
    setSelectedVertical(vertical);
    document.body.style.overflow = 'hidden';
  };

  const closeVerticalDetail = () => {
    setSelectedVertical(null);
    document.body.style.overflow = 'auto';
  };

  return (
    <div className="app-container">
      {/* Navigation */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
        className="navbar"
      >
        <div className="nav-container">
          <div className="nav-logo-wrapper">
            <img src={LOGO_URL} alt="Genesys Info X" className="nav-logo" />
          </div>
          <div className="nav-menu">
            <button onClick={() => scrollToSection('verticals')} className="nav-link">Verticals</button>
            <button onClick={() => scrollToSection('capabilities')} className="nav-link">Capabilities</button>
            <button onClick={() => scrollToSection('careers')} className="nav-link">Careers</button>
            <button onClick={() => scrollToSection('contact')} className="nav-btn">Contact Us</button>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="hero-section">
        <NetworkBackground />
        <motion.div style={{ y: heroY }} className="hero-content">
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            <motion.div variants={fadeUp} className="hero-label">
              GLOBAL INNOVATION ECOSYSTEM
            </motion.div>
            <motion.h1 variants={fadeUp} className="hero-title">
              Genesys Info X — Building Innovation Across <br/>
              <span className="gradient-text">Technology, Healthcare & Semiconductors</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="hero-subtitle">
              A multi-domain innovation ecosystem delivering enterprise technology services, digital healthcare transformation, 
              and semiconductor workforce enablement — powered by AI, cloud, and scalable engineering.
            </motion.p>
            <motion.div variants={fadeUp} className="hero-ctas">
              <button onClick={() => scrollToSection('verticals')} className="btn-primary">Explore Our Verticals</button>
              <button onClick={() => scrollToSection('contact')} className="btn-secondary">Partner With Us</button>
            </motion.div>
          </motion.div>
        </motion.div>
        <div className="scroll-indicator">
          <div className="scroll-line"></div>
        </div>
      </section>

      {/* Verticals Section */}
      <section id="verticals" className="verticals-section">
        <AnimatedSection>
          <div className="section-header">
            <span className="section-label">OUR VERTICALS</span>
            <h2 className="section-title">Three Domains. One Ecosystem.</h2>
          </div>
        </AnimatedSection>

        <div className="verticals-grid">
          <VerticalCard 
            icon="💻"
            title="Technology"
            tagline="Innovation. Integration. Acceleration."
            highlights={[
              "Enterprise Software Engineering (web platforms, portals, automation systems)",
              "AI & Machine Learning Solutions (intelligent assistants, analytics, automation)",
              "Cloud & DevOps Transformation (CI/CD, cloud migration, infrastructure automation)",
              "Cybersecurity & Compliance Enablement (secure-by-design, DevSecOps)",
              "Blockchain & Next-Gen Architecture (tokenization, traceability, secure systems)"
            ]}
            animation={<TechAnimation />}
            isActive={activeVertical === 'tech'}
            onHover={() => setActiveVertical('tech')}
            onLearnMore={() => openVerticalDetail('tech')}
          />

          <VerticalCard 
            icon="🏥"
            title="Healthcare"
            tagline="Your Health, Our Priority."
            highlights={[
              "Digital Health Platforms (patient engagement systems, provider dashboards)",
              "AI for Healthcare Operations (workflow automation, triage support, insights)",
              "Interoperability & Integration (secure data exchange, system connectivity)",
              "Healthcare Analytics (population insights, performance metrics, reporting)",
              "Training & Workforce Enablement for Health Systems (upskilling for modern care delivery)"
            ]}
            animation={<HealthAnimation />}
            isActive={activeVertical === 'health'}
            onHover={() => setActiveVertical('health')}
            onLearnMore={() => openVerticalDetail('health')}
          />

          <VerticalCard 
            icon="🔬"
            title="Semiconductors"
            tagline="The Foundation of Innovation."
            highlights={[
              "Industry-ready Workforce Programs (job-ready training, evaluation, onboarding)",
              "Engineering Enablement (tooling awareness, process orientation, quality mindset)",
              "Semiconductor Ecosystem Support (industry collaboration, learning pipelines)",
              "Hands-on Learning Tracks (fundamentals to advanced pathways)",
              "Internships & Placement Programs (structured internship-to-hiring model)"
            ]}
            animation={<SemiconductorAnimation />}
            isActive={activeVertical === 'semi'}
            onHover={() => setActiveVertical('semi')}
            onLearnMore={() => openVerticalDetail('semi')}
          />
        </div>
      </section>

      {/* Capabilities Grid */}
      <section id="capabilities" className="capabilities-section">
        <AnimatedSection>
          <div className="section-header">
            <span className="section-label">WHAT WE DO</span>
            <h2 className="section-title">Core Capabilities</h2>
          </div>
        </AnimatedSection>

        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="capabilities-grid"
        >
          {[
            { icon: '🤖', title: 'AI & Automation', desc: 'Intelligent systems that learn, adapt, and optimize business operations.' },
            { icon: '☁️', title: 'Cloud & DevOps', desc: 'Scalable infrastructure and continuous delivery pipelines.' },
            { icon: '🏢', title: 'Enterprise Applications', desc: 'Custom software solutions for complex business challenges.' },
            { icon: '💊', title: 'Digital Health Systems', desc: 'Modern healthcare technology for better patient outcomes.' },
            { icon: '⚡', title: 'Semiconductor Enablement', desc: 'Workforce training programs for the chip industry.' },
            { icon: '🎓', title: 'Training & Development', desc: 'Professional upskilling and career acceleration programs.' }
          ].map((cap, idx) => (
            <motion.div key={idx} variants={fadeUp} className="capability-card" whileHover={{ y: -8, scale: 1.02 }}>
              <div className="capability-icon">{cap.icon}</div>
              <h3 className="capability-title">{cap.title}</h3>
              <p className="capability-desc">{cap.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Impact Metrics */}
      <section className="metrics-section">
        <div className="metrics-container">
          <MetricCard end={500} suffix="+" label="Programs Delivered" />
          <MetricCard end={10000} suffix="+" label="Professionals Upskilled" />
          <MetricCard end={250} suffix="+" label="Enterprise Solutions Built" />
          <MetricCard end={3} suffix="" label="Domains Covered" />
        </div>
      </section>

      {/* Ecosystem */}
      <section className="ecosystem-section">
        <AnimatedSection>
          <div className="section-header">
            <span className="section-label">OUR ECOSYSTEM</span>
            <h2 className="section-title">Powered by Innovation</h2>
          </div>
        </AnimatedSection>

        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="ecosystem-grid"
        >
          {[
            { name: 'Blissberg', desc: 'Education, internships & professional training for tech careers' },
            { name: 'Genesys Green X', desc: 'Sustainability & green energy technology initiatives' },
            { name: 'Corporate Training', desc: 'Workforce development & enterprise upskilling programs' }
          ].map((brand, idx) => (
            <motion.div key={idx} variants={fadeUp} className="ecosystem-card" whileHover={{ scale: 1.05 }}>
              <div className="ecosystem-icon">{brand.name.charAt(0)}</div>
              <h3 className="ecosystem-name">{brand.name}</h3>
              <p className="ecosystem-desc">{brand.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Careers */}
      <section id="careers" className="careers-section">
        <AnimatedSection>
          <div className="section-header">
            <span className="section-label">JOIN OUR TEAM</span>
            <h2 className="section-title">Careers at Genesys Info X</h2>
            <p className="section-subtitle">Building the future requires the brightest minds. Join us.</p>
          </div>
        </AnimatedSection>

        <div className="jobs-container">
          {[
            'Java Developer', 'Python Engineer', 'AWS/DevOps Specialist', 
            'AI/ML Engineer', 'Blockchain Developer', 'Golang Developer'
          ].map((role, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="job-card"
              whileHover={{ scale: 1.03, boxShadow: '0 20px 40px rgba(0,200,83,0.15)' }}
            >
              <div className="job-role">{role}</div>
              <div className="job-location">Hyderabad, India</div>
            </motion.div>
          ))}
        </div>

        <AnimatedSection>
          <div className="careers-cta">
            <p className="careers-text">Send your resume to: <a href="mailto:recruitment@genesysinfox.com" className="email-link">recruitment@genesysinfox.com</a></p>
            <button className="btn-primary">Apply Now</button>
          </div>
        </AnimatedSection>
      </section>

      {/* Contact */}
      <section id="contact" className="contact-section">
        <div className="contact-container">
          <AnimatedSection>
            <div className="contact-info">
              <h2 className="contact-title">Let's Build the Future Together</h2>
              <div className="contact-details">
                <div className="contact-item">
                  <span className="contact-label">General Inquiries</span>
                  <a href="mailto:info@genesysinfox.com" className="contact-value">info@genesysinfox.com</a>
                </div>
                <div className="contact-item">
                  <span className="contact-label">Careers</span>
                  <a href="mailto:recruitment@genesysinfox.com" className="contact-value">recruitment@genesysinfox.com</a>
                </div>
                <div className="contact-item">
                  <span className="contact-label">Location</span>
                  <span className="contact-value">HITEC City, Hyderabad, India</span>
                </div>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection>
            <form onSubmit={handleSubmit} className="contact-form">
              <input 
                type="text" 
                placeholder="Your Name" 
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                required
                className="form-input"
              />
              <input 
                type="email" 
                placeholder="Email Address" 
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required
                className="form-input"
              />
              <input 
                type="tel" 
                placeholder="Phone Number" 
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                className="form-input"
              />
              <textarea 
                placeholder="Your Message" 
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                required
                rows={5}
                className="form-textarea"
              />
              <button type="submit" className="btn-primary" disabled={submitStatus === 'sending'}>
                {submitStatus === 'sending' ? 'Sending...' : 'Send Message'}
              </button>
              {submitStatus === 'success' && <p className="form-success">Message sent successfully!</p>}
              {submitStatus === 'error' && <p className="form-error">Failed to send. Please try again.</p>}
            </form>
          </AnimatedSection>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <img src={LOGO_URL} alt="Genesys Info X" className="footer-logo" />
        <div className="footer-links">
          <a href="#">LinkedIn</a>
          <a href="#">Twitter</a>
          <a href="#">GitHub</a>
        </div>
        <p className="footer-copyright">© 2026 Genesys Info X. Engineering the Future Through Innovation.</p>
      </footer>

      {/* Vertical Detail Modal */}
      <VerticalDetailModal 
        vertical={selectedVertical}
        data={selectedVertical ? verticalDetails[selectedVertical] : null}
        onClose={closeVerticalDetail}
      />
    </div>
  );
}

// Components
function AnimatedSection({ children }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function VerticalCard({ icon, title, tagline, highlights, animation, isActive, onHover, onLearnMore }) {
  return (
    <motion.div 
      className={`vertical-card ${isActive ? 'active' : ''}`}
      onMouseEnter={onHover}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      whileHover={{ y: -10, scale: 1.02 }}
    >
      <div className="vertical-animation">{animation}</div>
      <div className="vertical-icon">{icon}</div>
      <h3 className="vertical-title">{title}</h3>
      <p className="vertical-tagline">{tagline}</p>
      <ul className="vertical-highlights">
        {highlights.map((item, idx) => (
          <motion.li 
            key={idx}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
          >
            {item}
          </motion.li>
        ))}
      </ul>
      <button className="vertical-btn" onClick={onLearnMore}>Learn More</button>
    </motion.div>
  );
}

function MetricCard({ end, suffix, label }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  return (
    <motion.div 
      ref={ref}
      className="metric-card"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.6 }}
    >
      <div className="metric-value">
        {isInView && <CountUp end={end} duration={2.5} suffix={suffix} />}
      </div>
      <div className="metric-label">{label}</div>
    </motion.div>
  );
}

function VerticalDetailModal({ vertical, data, onClose }) {
  if (!data) return null;

  return (
    <AnimatePresence>
      {vertical && (
        <>
          <motion.div 
            className="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div 
            className="modal-container"
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 50 }}
            transition={{ duration: 0.3 }}
          >
            <button className="modal-close" onClick={onClose}>×</button>
            <div className="modal-content">
              <h2 className="modal-title">{data.title}</h2>
              <p className="modal-intro">{data.intro}</p>
              <p className="modal-description">{data.description}</p>
              
              <h3 className="modal-section-title">Core Areas:</h3>
              <div className="modal-areas">
                {data.areas.map((area, idx) => (
                  <div key={idx} className="modal-area-item">
                    <h4 className="modal-area-title">{area.title}</h4>
                    <p className="modal-area-content">{area.content}</p>
                  </div>
                ))}
              </div>

              {data.outcomes && (
                <div className="modal-outcomes">
                  <h3 className="modal-section-title">Outcome Focus:</h3>
                  <ul className="modal-outcomes-list">
                    {data.outcomes.map((outcome, idx) => (
                      <li key={idx}>{outcome}</li>
                    ))}
                  </ul>
                </div>
              )}

              {data.vision && (
                <div className="modal-vision">
                  <h3 className="modal-section-title">Vision:</h3>
                  <p>{data.vision}</p>
                </div>
              )}

              {data.mission && (
                <div className="modal-mission">
                  <h3 className="modal-section-title">Mission:</h3>
                  <p>{data.mission}</p>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// Animations
function NetworkBackground() {
  return (
    <div className="network-bg">
      <svg className="network-svg" viewBox="0 0 1000 600">
        <motion.line 
          x1="500" y1="100" x2="200" y2="300"
          stroke="#00C853" strokeWidth="2" opacity="0.3"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.line 
          x1="500" y1="100" x2="500" y2="300"
          stroke="#FDB913" strokeWidth="2" opacity="0.3"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, delay: 0.3, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.line 
          x1="500" y1="100" x2="800" y2="300"
          stroke="#4CAF50" strokeWidth="2" opacity="0.3"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, delay: 0.6, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.circle cx="500" cy="100" r="8" fill="#FDB913" animate={{ scale: [1, 1.5, 1] }} transition={{ duration: 2, repeat: Infinity }} />
        <motion.circle cx="200" cy="300" r="6" fill="#00C853" animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 2, delay: 0.5, repeat: Infinity }} />
        <motion.circle cx="500" cy="300" r="6" fill="#FDB913" animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 2, delay: 0.8, repeat: Infinity }} />
        <motion.circle cx="800" cy="300" r="6" fill="#4CAF50" animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 2, delay: 1.1, repeat: Infinity }} />
      </svg>
    </div>
  );
}

function TechAnimation() {
  return (
    <svg className="vertical-svg" viewBox="0 0 200 200">
      <motion.circle 
        cx="100" cy="100" r="40" 
        stroke="#00C853" strokeWidth="2" fill="none"
        animate={{ scale: [1, 1.1, 1], rotate: 360 }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      />
      <motion.rect 
        x="90" y="90" width="20" height="20" 
        fill="#FDB913" 
        animate={{ rotate: [0, 90, 180, 270, 360] }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
      />
    </svg>
  );
}

function HealthAnimation() {
  return (
    <svg className="vertical-svg" viewBox="0 0 200 200">
      <motion.path 
        d="M 50 100 L 70 80 L 90 100 L 110 60 L 130 100 L 150 90" 
        stroke="#00C853" strokeWidth="3" fill="none"
        animate={{ pathLength: [0, 1, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.circle 
        cx="100" cy="100" r="50" 
        stroke="#4CAF50" strokeWidth="2" fill="none" opacity="0.3"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
    </svg>
  );
}

function SemiconductorAnimation() {
  return (
    <svg className="vertical-svg" viewBox="0 0 200 200">
      <motion.rect 
        x="70" y="70" width="60" height="60" 
        stroke="#FDB913" strokeWidth="2" fill="none"
        animate={{ rotate: [0, 90, 180, 270, 360] }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, idx) => (
        <motion.line
          key={idx}
          x1="100" y1="100"
          x2={100 + 40 * Math.cos(angle * Math.PI / 180)}
          y2={100 + 40 * Math.sin(angle * Math.PI / 180)}
          stroke="#00C853" strokeWidth="2"
          animate={{ opacity: [0.2, 1, 0.2] }}
          transition={{ duration: 2, delay: idx * 0.2, repeat: Infinity }}
        />
      ))}
    </svg>
  );
}

export default App;