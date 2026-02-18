import { useEffect, useRef, useState } from 'react';
import './App.css';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;
const LOGO_URL = 'https://customer-assets.emergentagent.com/job_web-creator-768/artifacts/925qpowk_IMG_9976.jpg';

function App() {
  const [selectedIndustry, setSelectedIndustry] = useState(null);
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <div className="header-container">
          <div className="logo-badge">
            <img src={LOGO_URL} alt="Genesys Info X" className="logo" />
          </div>
          <nav className="nav">
            <a href="#ecosystem">Ecosystem</a>
            <a href="#industries">Industries</a>
            <a href="#careers">Careers</a>
            <a href="#contact" className="nav-cta">Contact</a>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="hero">
        <motion.div className="hero-content" style={{ opacity }}>
          <motion.h1 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="hero-title"
          >
            Genesys Info X — Building Innovation Across <span className="gradient-text">Technology, Healthcare & Semiconductors</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="hero-subtitle"
          >
            A global innovation ecosystem engineered for enterprise transformation
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="hero-actions"
          >
            <button className="btn-primary">Watch Video</button>
            <button className="btn-secondary">Explore Ecosystem</button>
          </motion.div>
        </motion.div>
        <div className="hero-scroll">
          <div className="scroll-line"></div>
        </div>
      </section>

      {/* Ecosystem Intro */}
      <section id="ecosystem" className="ecosystem-intro">
        <RevealSection>
          <div className="ecosystem-content">
            <span className="label">WHO WE ARE</span>
            <h2 className="section-title">A Multi-Domain Innovation Ecosystem</h2>
            <div className="large-text">
              <p>
                Genesys Info X operates at the intersection of <strong>technology, healthcare, and semiconductors</strong> — 
                three pillars that define the future of global innovation. We are not simply a service provider; we are an 
                <strong> ecosystem architect</strong>, engineering solutions that bridge industries, accelerate transformation, 
                and empower the next generation of digital infrastructure.
              </p>
              <p>
                From AI-driven enterprise platforms to digital health transformation and semiconductor workforce enablement, 
                our mission is to create resilient, scalable systems that power tomorrow's innovation landscape.
              </p>
            </div>
          </div>
        </RevealSection>
      </section>

      {/* Genesys Stack */}
      <section className="stack-section">
        <div className="stack-container">
          <RevealSection>
            <div className="stack-text">
              <span className="label">THE GENESYS STACK</span>
              <h2 className="section-title">Built for Enterprise Scale</h2>
              <div className="stack-list">
                <StackItem title="AI Platforms" desc="Intelligent automation and predictive analytics at scale" />
                <StackItem title="Cloud Engineering" desc="Modern infrastructure built for resilience and performance" />
                <StackItem title="Enterprise Development" desc="Mission-critical software for complex business ecosystems" />
                <StackItem title="Digital Health Systems" desc="Healthcare technology that improves outcomes and efficiency" />
                <StackItem title="Semiconductor Workforce" desc="Industry-ready talent pipelines for the chip economy" />
              </div>
            </div>
          </RevealSection>
          <RevealSection delay={0.3}>
            <div className="stack-visual">
              <div className="stack-card">Genesys Stack Platform</div>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* Primary Industries */}
      <section id="industries" className="industries-section">
        <RevealSection>
          <span className="label">PRIMARY INDUSTRIES</span>
          <h2 className="section-title">Three Domains. One Vision.</h2>
        </RevealSection>
        <div className="industries-grid">
          <IndustryCard 
            icon="💻"
            title="Technology"
            tagline="Innovation. Integration."
            description="Enterprise software, AI solutions, cloud transformation, and blockchain architecture"
            onClick={() => setSelectedIndustry('tech')}
          />
          <IndustryCard 
            icon="🏥"
            title="Healthcare"
            tagline="Your Health, Our Priority."
            description="Digital health platforms, AI operations, interoperability, and healthcare analytics"
            onClick={() => setSelectedIndustry('health')}
          />
          <IndustryCard 
            icon="🔬"
            title="Semiconductors"
            tagline="The Foundation of Innovation."
            description="Workforce programs, engineering enablement, and semiconductor ecosystem support"
            onClick={() => setSelectedIndustry('semi')}
          />
        </div>
      </section>

      {/* Sectors Grid */}
      <section className="sectors-section">
        <RevealSection>
          <span className="label">SECTORS WE SERVE</span>
          <h2 className="section-title">Cross-Industry Innovation</h2>
        </RevealSection>
        <div className="sectors-grid">
          {['AI', 'Cloud', 'Enterprise Software', 'Green Energy', 'Workforce Development', 'Digital Innovation'].map((sector, idx) => (
            <RevealSection key={idx} delay={idx * 0.1}>
              <div className="sector-tile">{sector}</div>
            </RevealSection>
          ))}
        </div>
      </section>

      {/* Storytelling */}
      <section className="storytelling-section">
        <RevealSection>
          <h2 className="massive-title">
            We engineer ideas into <span className="highlight">scalable ecosystems</span>
          </h2>
        </RevealSection>
      </section>

      {/* Challenges */}
      <section className="challenges-section">
        <RevealSection>
          <span className="label">INNOVATION PILLARS</span>
          <h2 className="section-title">Solving Tomorrow's Challenges Today</h2>
        </RevealSection>
        <div className="challenges-grid">
          {[
            { title: 'Digital Transformation', desc: 'Modernizing legacy systems with cloud-native, AI-driven architectures' },
            { title: 'AI Automation', desc: 'Intelligent workflows that reduce cost and amplify human capability' },
            { title: 'Healthcare Innovation', desc: 'Technology platforms that improve patient outcomes and operational efficiency' },
            { title: 'Semiconductor Workforce', desc: 'Building talent pipelines for the global chip industry' }
          ].map((challenge, idx) => (
            <RevealSection key={idx} delay={idx * 0.15}>
              <div className="challenge-card">
                <h3>{challenge.title}</h3>
                <p>{challenge.desc}</p>
              </div>
            </RevealSection>
          ))}
        </div>
      </section>

      {/* Careers */}
      <section id="careers" className="careers-section">
        <RevealSection>
          <span className="label">JOIN US</span>
          <h2 className="section-title">Build the Future With Us</h2>
          <p className="careers-intro">We're hiring engineers, innovators, and problem-solvers.</p>
        </RevealSection>
        <div className="roles-grid">
          {['Java Developer', 'Python Engineer', 'DevOps Specialist', 'AI/ML Engineer', 'Blockchain Developer', 'Golang Developer'].map((role, idx) => (
            <RevealSection key={idx} delay={idx * 0.1}>
              <div className="role-card">{role}</div>
            </RevealSection>
          ))}
        </div>
        <RevealSection>
          <div className="careers-cta">
            <p>Send your resume to <a href="mailto:recruitment@genesysinfox.com">recruitment@genesysinfox.com</a></p>
            <button className="btn-primary">Apply Now</button>
          </div>
        </RevealSection>
      </section>

      {/* Contact */}
      <section id="contact" className="contact-section">
        <div className="contact-grid">
          <RevealSection>
            <div className="contact-info">
              <h2>Let's Build Together</h2>
              <div className="contact-item">
                <span>General Inquiries</span>
                <a href="mailto:info@genesysinfox.com">info@genesysinfox.com</a>
              </div>
              <div className="contact-item">
                <span>Careers</span>
                <a href="mailto:recruitment@genesysinfox.com">recruitment@genesysinfox.com</a>
              </div>
              <div className="contact-item">
                <span>Location</span>
                <p>HITEC City, Hyderabad, India</p>
              </div>
            </div>
          </RevealSection>
          <RevealSection delay={0.3}>
            <ContactForm />
          </RevealSection>
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
        <p>© 2026 Genesys Info X. Engineering the Future Through Innovation.</p>
      </footer>

      {/* Industry Detail Modal */}
      {selectedIndustry && (
        <IndustryModal industry={selectedIndustry} onClose={() => setSelectedIndustry(null)} />
      )}
    </div>
  );
}

// Components
function RevealSection({ children, delay = 0 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function StackItem({ title, desc }) {
  return (
    <div className="stack-item">
      <div className="stack-number"></div>
      <div>
        <h3>{title}</h3>
        <p>{desc}</p>
      </div>
    </div>
  );
}

function IndustryCard({ icon, title, tagline, description, onClick }) {
  return (
    <RevealSection>
      <motion.div 
        className="industry-card"
        whileHover={{ y: -10, scale: 1.02 }}
        transition={{ duration: 0.3 }}
      >
        <div className="industry-icon">{icon}</div>
        <h3>{title}</h3>
        <p className="industry-tagline">{tagline}</p>
        <p className="industry-desc">{description}</p>
        <button className="industry-btn" onClick={onClick}>Learn More →</button>
      </motion.div>
    </RevealSection>
  );
}

function ContactForm() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    try {
      await axios.post(`${API}/contact`, { 
        email: formData.email, 
        message: `Name: ${formData.name}\nPhone: ${formData.phone}\n\n${formData.message}` 
      });
      setStatus('success');
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="contact-form">
      <input 
        type="text" 
        placeholder="Name" 
        value={formData.name}
        onChange={(e) => setFormData({...formData, name: e.target.value})}
        required
      />
      <input 
        type="email" 
        placeholder="Email" 
        value={formData.email}
        onChange={(e) => setFormData({...formData, email: e.target.value})}
        required
      />
      <input 
        type="tel" 
        placeholder="Phone" 
        value={formData.phone}
        onChange={(e) => setFormData({...formData, phone: e.target.value})}
      />
      <textarea 
        placeholder="Message" 
        value={formData.message}
        onChange={(e) => setFormData({...formData, message: e.target.value})}
        required
        rows={5}
      />
      <button type="submit" className="btn-primary" disabled={status === 'sending'}>
        {status === 'sending' ? 'Sending...' : 'Send Message'}
      </button>
      {status === 'success' && <p className="form-success">Message sent!</p>}
      {status === 'error' && <p className="form-error">Failed to send.</p>}
    </form>
  );
}

function IndustryModal({ industry, onClose }) {
  const content = {
    tech: {
      title: 'Technology',
      intro: 'Technology at Genesys Info X represents a future-focused innovation ecosystem designed to help enterprises scale faster, integrate smarter, and build resilient digital platforms.',
      areas: [
        'Enterprise Software Engineering',
        'Artificial Intelligence & Machine Learning',
        'Cloud & DevOps Transformation',
        'Cybersecurity & Compliance',
        'Blockchain & Emerging Technologies'
      ]
    },
    health: {
      title: 'Healthcare',
      intro: 'Healthcare innovation at Genesys Info X is driven by a mission to enhance patient outcomes, improve operational efficiency, and enable smarter healthcare ecosystems through technology.',
      areas: [
        'Digital Health Platforms',
        'AI-Powered Healthcare Operations',
        'Interoperability & System Integration',
        'Healthcare Analytics & Insights',
        'Workforce Enablement'
      ]
    },
    semi: {
      title: 'Semiconductors',
      intro: 'The semiconductor vertical at Genesys Info X focuses on building the foundation for innovation by supporting workforce readiness, industry collaboration, and engineering ecosystem awareness.',
      areas: [
        'Industry-Ready Workforce Programs',
        'Engineering Enablement',
        'Hands-On Learning Tracks',
        'Internship & Placement Models',
        'Ecosystem Development'
      ]
    }
  };

  const data = content[industry];

  return (
    <>
      <div className="modal-backdrop" onClick={onClose}></div>
      <motion.div 
        className="modal"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
      >
        <button className="modal-close" onClick={onClose}>×</button>
        <div className="modal-content">
          <h2>{data.title}</h2>
          <p className="modal-intro">{data.intro}</p>
          <h3>Core Areas:</h3>
          <ul className="modal-list">
            {data.areas.map((area, idx) => (
              <li key={idx}>{area}</li>
            ))}
          </ul>
        </div>
      </motion.div>
    </>
  );
}

export default App;