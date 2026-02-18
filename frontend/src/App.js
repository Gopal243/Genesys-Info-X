import { useEffect, useRef, useState } from 'react';
import './App.css';
import { motion, useInView, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;
const LOGO_URL = 'https://customer-assets.emergentagent.com/job_web-creator-768/artifacts/925qpowk_IMG_9976.jpg';

function App() {
  const [selectedIndustry, setSelectedIndustry] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="app">
      {/* Header */}
      <motion.header 
        className={`header ${scrolled ? 'scrolled' : ''}`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
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
      </motion.header>

      {/* Hero */}
      <section className="hero">
        <div className="video-background">
          <video autoPlay muted loop playsInline className="hero-video">
            <source src="https://cdn.pixabay.com/video/2023/11/26/190231-889306027_large.mp4" type="video/mp4" />
          </video>
          <div className="video-overlay"></div>
        </div>
        
        <FlowingLines />
        
        <motion.div 
          className="hero-content" 
          style={{ opacity: heroOpacity, scale: heroScale }}
        >
          <motion.h1 
            className="hero-title"
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            {['Genesys', 'Info', 'X', '—', 'Building', 'Innovation', 'Across'].map((word, idx) => (
              <motion.span
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 + idx * 0.1 }}
                className="hero-word"
              >
                {word}{' '}
              </motion.span>
            ))}
            <br/>
            <motion.span 
              className="gradient-text"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.2 }}
            >
              Technology, Healthcare & Semiconductors
            </motion.span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.4 }}
            className="hero-subtitle"
          >
            A global innovation ecosystem engineered for enterprise transformation
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.6 }}
            className="hero-actions"
          >
            <RippleButton className="btn-primary">Watch Video</RippleButton>
            <RippleButton className="btn-secondary">Explore Ecosystem</RippleButton>
          </motion.div>
        </motion.div>
      </section>

      {/* Ecosystem Intro */}
      <section id="ecosystem" className="ecosystem-intro">
        <CinematicReveal>
          <div className="ecosystem-content">
            <AnimatedLabel>WHO WE ARE</AnimatedLabel>
            <AnimatedTitle>A Multi-Domain Innovation Ecosystem</AnimatedTitle>
            <AnimatedUnderline />
            <motion.div 
              className="large-text"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.3 }}
            >
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
            </motion.div>
          </div>
        </CinematicReveal>
      </section>

      {/* Genesys Stack */}
      <section className="stack-section">
        <div className="stack-container">
          <CinematicReveal>
            <div className="stack-text">
              <AnimatedLabel>THE GENESYS STACK</AnimatedLabel>
              <AnimatedTitle>Built for Enterprise Scale</AnimatedTitle>
              <AnimatedUnderline />
              <div className="stack-list">
                {[
                  { title: 'AI Platforms', desc: 'Intelligent automation and predictive analytics at scale' },
                  { title: 'Cloud Engineering', desc: 'Modern infrastructure built for resilience and performance' },
                  { title: 'Enterprise Development', desc: 'Mission-critical software for complex business ecosystems' },
                  { title: 'Digital Health Systems', desc: 'Healthcare technology that improves outcomes and efficiency' },
                  { title: 'Semiconductor Workforce', desc: 'Industry-ready talent pipelines for the chip economy' }
                ].map((item, idx) => (
                  <motion.div
                    key={idx}
                    className="stack-item"
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: idx * 0.1 }}
                    whileHover={{ x: 10 }}
                  >
                    <motion.div 
                      className="stack-dot"
                      whileHover={{ scale: 1.5 }}
                    />
                    <div>
                      <h3>{item.title}</h3>
                      <p>{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </CinematicReveal>
          <CinematicReveal delay={0.3}>
            <div className="stack-visual">
              <motion.div 
                className="stack-card"
                animate={{ 
                  scale: [1, 1.02, 1],
                  opacity: [0.7, 1, 0.7]
                }}
                transition={{ 
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                Genesys Stack Platform
              </motion.div>
            </div>
          </CinematicReveal>
        </div>
      </section>

      {/* Technology Section */}
      <IndustrySection
        id="tech"
        icon="💻"
        title="Technology"
        tagline="Innovation. Integration."
        description="Enterprise software, AI solutions, cloud transformation, and blockchain architecture that powers digital transformation at scale."
        videoUrl="https://cdn.pixabay.com/video/2022/12/14/143513-781206125_large.mp4"
        onLearnMore={() => setSelectedIndustry('tech')}
      />

      {/* Healthcare Section */}
      <IndustrySection
        id="health"
        icon="🏥"
        title="Healthcare"
        tagline="Your Health, Our Priority."
        description="Digital health platforms, AI operations, interoperability, and healthcare analytics that improve patient outcomes and operational efficiency."
        videoUrl="https://cdn.pixabay.com/video/2022/11/24/140547-774820986_large.mp4"
        reverse
        onLearnMore={() => setSelectedIndustry('health')}
      />

      {/* Semiconductors Section */}
      <IndustrySection
        id="semi"
        icon="🔬"
        title="Semiconductors"
        tagline="The Foundation of Innovation."
        description="Workforce programs, engineering enablement, and semiconductor ecosystem support that builds tomorrow's talent pipeline."
        videoUrl="https://cdn.pixabay.com/video/2023/05/13/162625-826547636_large.mp4"
        onLearnMore={() => setSelectedIndustry('semi')}
      />

      {/* Sectors Grid */}
      <section className="sectors-section">
        <CinematicReveal>
          <AnimatedLabel>SECTORS WE SERVE</AnimatedLabel>
          <AnimatedTitle>Cross-Industry Innovation</AnimatedTitle>
          <AnimatedUnderline />
        </CinematicReveal>
        <motion.div 
          className="sectors-grid"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.08
              }
            }
          }}
        >
          {['AI', 'Cloud', 'Enterprise Software', 'Green Energy', 'Workforce Development', 'Digital Innovation'].map((sector, idx) => (
            <GlowCard key={idx} delay={idx * 0.08}>
              <div className="sector-tile">{sector}</div>
            </GlowCard>
          ))}
        </motion.div>
      </section>

      {/* Storytelling */}
      <section className="storytelling-section">
        <CinematicReveal>
          <h2 className="massive-title">
            {['We', 'engineer', 'ideas', 'into'].map((word, idx) => (
              <motion.span
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: idx * 0.1 }}
                style={{ display: 'inline-block', marginRight: '0.3em' }}
              >
                {word}
              </motion.span>
            ))}
            <motion.span 
              className="highlight"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5 }}
              style={{ display: 'inline' }}
            >
              scalable ecosystems
            </motion.span>
          </h2>
        </CinematicReveal>
      </section>

      {/* Challenges */}
      <section className="challenges-section">
        <CinematicReveal>
          <AnimatedLabel>INNOVATION PILLARS</AnimatedLabel>
          <AnimatedTitle>Solving Tomorrow's Challenges Today</AnimatedTitle>
          <AnimatedUnderline />
        </CinematicReveal>
        <motion.div 
          className="challenges-grid"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.15
              }
            }
          }}
        >
          {[
            { title: 'Digital Transformation', desc: 'Modernizing legacy systems with cloud-native, AI-driven architectures' },
            { title: 'AI Automation', desc: 'Intelligent workflows that reduce cost and amplify human capability' },
            { title: 'Healthcare Innovation', desc: 'Technology platforms that improve patient outcomes and operational efficiency' },
            { title: 'Semiconductor Workforce', desc: 'Building talent pipelines for the global chip industry' }
          ].map((challenge, idx) => (
            <GlowCard key={idx} delay={idx * 0.15}>
              <div className="challenge-card">
                <h3>{challenge.title}</h3>
                <p>{challenge.desc}</p>
              </div>
            </GlowCard>
          ))}
        </motion.div>
      </section>

      {/* Careers */}
      <section id="careers" className="careers-section">
        <CinematicReveal>
          <AnimatedLabel>JOIN US</AnimatedLabel>
          <AnimatedTitle>Build the Future With Us</AnimatedTitle>
          <AnimatedUnderline />
          <p className="careers-intro">We're hiring engineers, innovators, and problem-solvers.</p>
        </CinematicReveal>
        <motion.div 
          className="roles-grid"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
        >
          {['Java Developer', 'Python Engineer', 'DevOps Specialist', 'AI/ML Engineer', 'Blockchain Developer', 'Golang Developer'].map((role, idx) => (
            <GlowCard key={idx} delay={idx * 0.1}>
              <div className="role-card">{role}</div>
            </GlowCard>
          ))}
        </motion.div>
        <CinematicReveal delay={0.8}>
          <div className="careers-cta">
            <p>Send your resume to <a href="mailto:recruitment@genesysinfox.com">recruitment@genesysinfox.com</a></p>
            <RippleButton className="btn-primary">Apply Now</RippleButton>
          </div>
        </CinematicReveal>
      </section>

      {/* Contact */}
      <section id="contact" className="contact-section">
        <div className="contact-grid">
          <CinematicReveal>
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
          </CinematicReveal>
          <CinematicReveal delay={0.3}>
            <ContactForm />
          </CinematicReveal>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <motion.img 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          src={LOGO_URL} 
          alt="Genesys Info X" 
          className="footer-logo" 
        />
        <div className="footer-links">
          <a href="#">LinkedIn</a>
          <a href="#">Twitter</a>
          <a href="#">GitHub</a>
        </div>
        <p>© 2026 Genesys Info X. Engineering the Future Through Innovation.</p>
      </footer>

      {selectedIndustry && (
        <IndustryModal industry={selectedIndustry} onClose={() => setSelectedIndustry(null)} />
      )}
    </div>
  );
}

// Cinematic Components
function CinematicReveal({ children, delay = 0 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
      transition={{ duration: 1, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function AnimatedLabel({ children }) {
  return (
    <motion.span 
      className="label"
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      {children}
    </motion.span>
  );
}

function AnimatedTitle({ children }) {
  return (
    <motion.h2 
      className="section-title"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: 0.1 }}
    >
      {children}
    </motion.h2>
  );
}

function AnimatedUnderline() {
  return (
    <motion.div 
      className="animated-underline"
      initial={{ width: 0 }}
      whileInView={{ width: '120px' }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: 0.3 }}
    />
  );
}

function RippleButton({ children, className, onClick }) {
  const [ripples, setRipples] = useState([]);

  const handleClick = (e) => {
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const newRipple = { x, y, id: Date.now() };
    setRipples([...ripples, newRipple]);
    
    setTimeout(() => {
      setRipples(ripples => ripples.filter(r => r.id !== newRipple.id));
    }, 600);
    
    if (onClick) onClick(e);
  };

  return (
    <button className={className} onClick={handleClick}>
      {children}
      {ripples.map(ripple => (
        <span
          key={ripple.id}
          className="ripple"
          style={{ left: ripple.x, top: ripple.y }}
        />
      ))}
    </button>
  );
}

function GlowCard({ children, delay = 0 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: '-50px' });
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      animate={isInView ? { boxShadow: '0 0 30px rgba(0, 200, 83, 0.15)' } : {}}
    >
      {children}
    </motion.div>
  );
}

function FlowingLines() {
  return (
    <svg className="flowing-lines" viewBox="0 0 1200 800">
      <motion.path
        d="M 600 200 L 300 500"
        stroke="#FDB913"
        strokeWidth="2"
        fill="none"
        opacity="0.3"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2, delay: 0.5, ease: "easeInOut" }}
      />
      <motion.path
        d="M 600 200 L 600 500"
        stroke="#00C853"
        strokeWidth="2"
        fill="none"
        opacity="0.3"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2, delay: 0.8, ease: "easeInOut" }}
      />
      <motion.path
        d="M 600 200 L 900 500"
        stroke="#4CAF50"
        strokeWidth="2"
        fill="none"
        opacity="0.3"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2, delay: 1.1, ease: "easeInOut" }}
      />
      <motion.circle
        cx="600"
        cy="200"
        r="8"
        fill="#FDB913"
        initial={{ scale: 0 }}
        animate={{ scale: [0, 1.5, 1] }}
        transition={{ duration: 1, delay: 0.5 }}
      />
    </svg>
  );
}

function IndustrySection({ id, icon, title, tagline, description, videoUrl, reverse, onLearnMore }) {
  return (
    <section className={`industry-section ${reverse ? 'reverse' : ''}`}>
      <div className="industry-container">
        <CinematicReveal>
          <div className="industry-content">
            <motion.div 
              className="industry-icon"
              whileHover={{ scale: 1.2, rotate: 5 }}
              transition={{ duration: 0.3 }}
            >
              {icon}
            </motion.div>
            <h2>{title}</h2>
            <p className="industry-tagline">{tagline}</p>
            <p className="industry-desc">{description}</p>
            <RippleButton className="industry-btn" onClick={onLearnMore}>
              Learn More →
            </RippleButton>
          </div>
        </CinematicReveal>
        <CinematicReveal delay={0.3}>
          <div className="industry-video">
            <video autoPlay muted loop playsInline>
              <source src={videoUrl} type="video/mp4" />
            </video>
            <div className="video-overlay-light"></div>
          </div>
        </CinematicReveal>
      </div>
    </section>
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
      <RippleButton type="submit" className="btn-primary" disabled={status === 'sending'}>
        {status === 'sending' ? 'Sending...' : 'Send Message'}
      </RippleButton>
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
      <motion.div 
        className="modal-backdrop" 
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />
      <motion.div 
        className="modal"
        initial={{ opacity: 0, scale: 0.9, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 50 }}
        transition={{ duration: 0.3 }}
      >
        <button className="modal-close" onClick={onClose}>×</button>
        <div className="modal-content">
          <h2>{data.title}</h2>
          <p className="modal-intro">{data.intro}</p>
          <h3>Core Areas:</h3>
          <ul className="modal-list">
            {data.areas.map((area, idx) => (
              <motion.li 
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                {area}
              </motion.li>
            ))}
          </ul>
        </div>
      </motion.div>
    </>
  );
}

export default App;