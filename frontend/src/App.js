import { useEffect, useRef, useState } from 'react';
import './App.css';
import { motion, useInView } from 'framer-motion';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;
const LOGO_URL = 'https://customer-assets.emergentagent.com/job_web-creator-768/artifacts/925qpowk_IMG_9976.jpg';

// Animation variants - simplified for better performance
const fadeUpVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12
    }
  }
};

function App() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitStatus, setSubmitStatus] = useState('');

  // Use native smooth scroll instead of Lenis for better performance
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus('sending');
    
    try {
      await axios.post(`${API}/contact`, { email, message });
      setSubmitStatus('success');
      setEmail('');
      setMessage('');
      setTimeout(() => setSubmitStatus(''), 3000);
    } catch (error) {
      console.error('Contact form error:', error);
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus(''), 3000);
    }
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="bg-deep-black text-white font-body overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 glass-panel" data-testid="main-nav">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-4 flex justify-between items-center">
          <div className="" data-testid="nav-logo">
            <img src={LOGO_URL} alt="Genesys Info X" className="logo-image" />
          </div>
          <div className="hidden md:flex gap-8 items-center">
            <button onClick={() => scrollToSection('services')} className="text-gray-300 hover:text-brand-yellow transition-colors text-sm uppercase tracking-widest" data-testid="nav-services">Services</button>
            <button onClick={() => scrollToSection('ecosystem')} className="text-gray-300 hover:text-brand-yellow transition-colors text-sm uppercase tracking-widest" data-testid="nav-ecosystem">Ecosystem</button>
            <button onClick={() => scrollToSection('careers')} className="text-gray-300 hover:text-brand-yellow transition-colors text-sm uppercase tracking-widest" data-testid="nav-careers">Careers</button>
            <button onClick={() => scrollToSection('contact')} className="btn-primary" data-testid="nav-contact-btn">Contact Us</button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20" data-testid="hero-section">
        <div className="hero-glow"></div>
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: 'url(https://images.pexels.com/photos/30869731/pexels-photo-30869731.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.15
          }}
        />
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10 py-24">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="text-center max-w-5xl mx-auto"
          >
            <motion.div variants={fadeUpVariant} className="mb-6" data-testid="hero-label">
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-brand-green">Global Technology Ecosystem</span>
            </motion.div>
            <motion.h1 
              variants={fadeUpVariant}
              className="font-heading text-6xl md:text-8xl font-bold tracking-tighter leading-none mb-8"
              data-testid="hero-headline"
            >
              Engineering the <span className="text-brand-yellow">Future</span><br />
              Through AI, Cloud & Innovation
            </motion.h1>
            <motion.p 
              variants={fadeUpVariant}
              className="text-lg md:text-xl leading-relaxed text-gray-300 mb-12 max-w-3xl mx-auto"
              data-testid="hero-description"
            >
              Genesys Info X is a global technology and consulting powerhouse delivering Enterprise AI, Cloud Architecture, DevOps, Blockchain, Green Energy solutions, and next-generation workforce development programs.
            </motion.p>
            <motion.div variants={fadeUpVariant} className="flex flex-col sm:flex-row gap-6 justify-center items-center" data-testid="hero-cta-group">
              <button onClick={() => scrollToSection('services')} className="btn-primary" data-testid="hero-explore-btn">Explore Services</button>
              <button onClick={() => scrollToSection('contact')} className="btn-secondary" data-testid="hero-partner-btn">Partner With Us</button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 md:py-32 relative" data-testid="about-section">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <AnimatedSection>
            <div className="text-center mb-20">
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-brand-yellow mb-4 block" data-testid="about-label">Who We Are</span>
              <h2 className="font-heading text-4xl md:text-6xl font-semibold tracking-tight mb-6" data-testid="about-title">Global Innovation Ecosystem</h2>
              <div className="gold-divider my-8 max-w-md mx-auto"></div>
            </div>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-16 items-center">
            <AnimatedSection>
              <div className="relative pl-12">
                <div className="timeline-line"></div>
                {[
                  { title: 'Strategic IT Consulting', desc: 'Digital transformation and technology strategy for Fortune 500 enterprises.' },
                  { title: 'Advanced AI Solutions', desc: 'Machine learning, NLP, and generative AI at scale.' },
                  { title: 'Enterprise Workforce Development', desc: 'Bridging academia and industry through rigorous training programs.' },
                  { title: 'Sustainable Technology', desc: 'Green energy and eco-friendly tech initiatives through Genesys Green X.' }
                ].map((item, idx) => (
                  <div key={idx} className="relative mb-12 last:mb-0" data-testid={`about-timeline-item-${idx}`}>
                    <div className="timeline-dot" style={{ top: '8px' }}></div>
                    <h3 className="font-heading text-xl md:text-2xl font-medium mb-2 text-white">{item.title}</h3>
                    <p className="text-gray-400 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </AnimatedSection>
            <AnimatedSection>
              <div className="glass-panel p-12 rounded-none">
                <p className="text-gray-300 text-lg leading-relaxed mb-6" data-testid="about-description">
                  Genesys Info X operates as a <span className="text-brand-yellow font-semibold">global technology ecosystem</span>, partnering with education platforms, government bodies, and industry leaders to deliver cutting-edge solutions.
                </p>
                <p className="text-gray-400 leading-relaxed">
                  Our collaboration extends to workforce transformation, where we empower the next generation of technologists through intensive internship programs, real-world projects, and industry certifications.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 md:py-32 bg-charcoal" data-testid="services-section">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <AnimatedSection>
            <div className="text-center mb-20">
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-brand-green mb-4 block" data-testid="services-label">What We Deliver</span>
              <h2 className="font-heading text-4xl md:text-6xl font-semibold tracking-tight" data-testid="services-title">Enterprise Solutions</h2>
            </div>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Artificial Intelligence & Machine Learning',
                desc: 'Predictive modeling, natural language processing, computer vision, and generative AI solutions designed for enterprise scale and mission-critical deployments.',
                icon: '🧠'
              },
              {
                title: 'Cloud & DevOps Engineering',
                desc: 'Scalable cloud architecture, automated CI/CD pipelines, containerization, Kubernetes orchestration, and infrastructure as code for modern enterprises.',
                icon: '☁️'
              },
              {
                title: 'Blockchain Solutions',
                desc: 'Secure, decentralized ledger technologies for fintech, supply chain transparency, smart contracts, and tokenization platforms.',
                icon: '⛓️'
              },
              {
                title: 'Enterprise Software Development',
                desc: 'Custom ERP, CRM, and mission-critical software development with robust architecture, security-first design, and seamless integration capabilities.',
                icon: '💻'
              },
              {
                title: 'Green Energy (Genesys Green X)',
                desc: 'Sustainability-focused technology solutions, energy management systems, renewable energy integration, and carbon footprint optimization.',
                icon: '🌱'
              },
              {
                title: 'Workforce Development & Internships',
                desc: 'Bridging the gap between academia and industry through intensive training programs, live projects, and industry-recognized certifications.',
                icon: '🎓'
              }
            ].map((service, idx) => (
              <AnimatedSection key={idx}>
                <div className="service-card p-8 h-full" data-testid={`service-card-${idx}`}>
                  <div className="text-5xl mb-6">{service.icon}</div>
                  <h3 className="font-heading text-xl md:text-2xl font-medium mb-4 text-white">{service.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{service.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Ecosystem Section */}
      <section id="ecosystem" className="py-24 md:py-32" data-testid="ecosystem-section">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <AnimatedSection>
            <div className="text-center mb-20">
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-brand-yellow mb-4 block" data-testid="ecosystem-label">Innovation Network</span>
              <h2 className="font-heading text-4xl md:text-6xl font-semibold tracking-tight mb-6" data-testid="ecosystem-title">Our Ecosystem</h2>
              <p className="text-gray-300 text-lg max-w-2xl mx-auto">Genesys Info X operates as a parent innovation ecosystem, powering multiple specialized brands.</p>
            </div>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: 'Blissberg',
                desc: 'Education platform delivering industry-aligned internships, training programs, and career acceleration for tech professionals.',
                color: 'brand-yellow'
              },
              {
                name: 'Genesys Green X',
                desc: 'Dedicated to sustainable energy solutions, green technology integration, and environmental impact optimization.',
                color: 'brand-green'
              },
              {
                name: 'Digital AI Solutions',
                desc: 'Specialized AI consulting arm delivering generative AI, predictive analytics, and intelligent automation for enterprises.',
                color: 'brand-yellow'
              }
            ].map((brand, idx) => (
              <AnimatedSection key={idx}>
                <div className="brand-card p-10 h-full" data-testid={`brand-card-${idx}`}>
                  <div className="mb-6">
                    <div className={`w-16 h-16 rounded-full bg-${brand.color}-dim border-2 border-${brand.color} flex items-center justify-center text-2xl font-bold`}>
                      {brand.name.charAt(0)}
                    </div>
                  </div>
                  <h3 className="font-heading text-2xl md:text-3xl font-medium mb-4 text-white">{brand.name}</h3>
                  <p className="text-gray-400 leading-relaxed">{brand.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="py-24 md:py-32 bg-charcoal" data-testid="why-choose-section">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <AnimatedSection>
            <div className="text-center mb-20">
              <h2 className="font-heading text-4xl md:text-6xl font-semibold tracking-tight mb-6" data-testid="why-choose-title">Why Choose Genesys Info X</h2>
            </div>
          </AnimatedSection>

          <div className="grid md:grid-cols-5 gap-8">
            {[
              { title: 'Global Vision', icon: '🌍', desc: 'Presence across continents' },
              { title: 'Industry Partnerships', icon: '🤝', desc: 'Tier-1 technology alliances' },
              { title: 'Innovation Driven', icon: '⚡', desc: 'Cutting-edge R&D focus' },
              { title: 'Future Workforce', icon: '🚀', desc: 'Next-gen talent development' },
              { title: 'Enterprise Reliability', icon: '🛡️', desc: 'Fortune 500 trusted' }
            ].map((item, idx) => (
              <AnimatedSection key={idx}>
                <div className="text-center glass-panel p-8 hover:border-brand-yellow/30 transition-all duration-300" data-testid={`why-choose-item-${idx}`}>
                  <div className="text-5xl mb-4">{item.icon}</div>
                  <h3 className="font-heading text-lg font-medium mb-2 text-white">{item.title}</h3>
                  <p className="text-gray-400 text-sm">{item.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Careers Section */}
      <section id="careers" className="py-24 md:py-32" data-testid="careers-section">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <AnimatedSection>
            <div className="text-center mb-16">
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-brand-green mb-4 block" data-testid="careers-label">Join Our Team</span>
              <h2 className="font-heading text-4xl md:text-6xl font-semibold tracking-tight mb-6" data-testid="careers-title">We're Hiring</h2>
              <p className="text-gray-300 text-lg max-w-2xl mx-auto">Looking for top-tier engineering talent to join our global innovation teams.</p>
            </div>
          </AnimatedSection>

          <AnimatedSection>
            <div className="glass-panel p-12 max-w-4xl mx-auto">
              <div className="mb-8">
                <h3 className="font-heading text-2xl font-medium mb-6 text-white" data-testid="careers-roles-title">Open Positions:</h3>
                <div className="flex flex-wrap gap-4">
                  {['Java Developer', 'Python Engineer', 'DevOps Specialist', 'AI/ML Engineer', 'Blockchain Developer', 'Golang Developer'].map((role, idx) => (
                    <span key={idx} className="px-6 py-3 bg-brand-yellow-dim border border-brand-yellow/30 text-brand-yellow font-mono text-sm uppercase tracking-wider" data-testid={`career-role-${idx}`}>
                      {role}
                    </span>
                  ))}
                </div>
              </div>
              <div className="border-t border-white/10 pt-8">
                <p className="text-gray-300 mb-6">Submit your resume and portfolio to join the future of technology.</p>
                <a 
                  href="mailto:recruitment@genesysinfox.com" 
                  className="btn-primary inline-block"
                  data-testid="careers-email-btn"
                >
                  recruitment@genesysinfox.com
                </a>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-24 md:py-32 bg-charcoal overflow-hidden" data-testid="partners-section">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="font-heading text-3xl md:text-5xl font-semibold tracking-tight" data-testid="partners-title">Trusted by Global Leaders</h2>
            </div>
          </AnimatedSection>
          <div className="relative overflow-hidden">
            <div className="partner-logo-scroll flex gap-16 items-center" data-testid="partners-logos">
              {[...Array(12)].map((_, idx) => (
                <div key={idx} className="flex-shrink-0 w-32 h-20 glass-panel flex items-center justify-center opacity-50 hover:opacity-100 transition-opacity">
                  <span className="text-gray-500 font-heading text-sm">PARTNER</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 md:py-32" data-testid="contact-section">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="grid md:grid-cols-2 gap-16">
            <AnimatedSection>
              <div>
                <span className="text-xs font-mono uppercase tracking-[0.2em] text-brand-yellow mb-4 block" data-testid="contact-label">Get In Touch</span>
                <h2 className="font-heading text-4xl md:text-6xl font-semibold tracking-tight mb-8" data-testid="contact-title">Let's Build the Future</h2>
                <div className="space-y-6">
                  <div>
                    <p className="text-gray-400 text-sm mb-2">General Inquiries</p>
                    <a href="mailto:info@genesysinfox.com" className="text-brand-yellow text-xl hover:underline" data-testid="contact-email-general">info@genesysinfox.com</a>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm mb-2">Careers</p>
                    <a href="mailto:recruitment@genesysinfox.com" className="text-brand-green text-xl hover:underline" data-testid="contact-email-careers">recruitment@genesysinfox.com</a>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm mb-2">Location</p>
                    <p className="text-white text-lg" data-testid="contact-location">HITEC City, Hyderabad, India</p>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection>
              <form onSubmit={handleContactSubmit} className="glass-panel p-8" data-testid="contact-form">
                <div className="mb-6">
                  <label className="block text-gray-300 text-sm mb-2" htmlFor="email">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white focus:border-brand-yellow focus:outline-none transition-colors"
                    placeholder="your.email@company.com"
                    data-testid="contact-form-email"
                  />
                </div>
                <div className="mb-6">
                  <label className="block text-gray-300 text-sm mb-2" htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    rows={5}
                    className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white focus:border-brand-yellow focus:outline-none transition-colors resize-none"
                    placeholder="Tell us about your project..."
                    data-testid="contact-form-message"
                  />
                </div>
                <button 
                  type="submit" 
                  className="btn-primary w-full"
                  disabled={submitStatus === 'sending'}
                  data-testid="contact-form-submit"
                >
                  {submitStatus === 'sending' ? 'Sending...' : 'Send Message'}
                </button>
                {submitStatus === 'success' && (
                  <p className="text-brand-green mt-4 text-center" data-testid="contact-form-success">Message sent successfully!</p>
                )}
                {submitStatus === 'error' && (
                  <p className="text-red-500 mt-4 text-center" data-testid="contact-form-error">Failed to send message. Please try again.</p>
                )}
              </form>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-charcoal border-t border-white/10 py-12" data-testid="footer">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div>
              <img src={LOGO_URL} alt="Genesys Info X" className="logo-image" style={{ maxWidth: '160px' }} />
            </div>
            <div className="flex gap-6">
              <a href="#" className="text-gray-400 hover:text-brand-yellow transition-colors" data-testid="footer-linkedin">LinkedIn</a>
              <a href="#" className="text-gray-400 hover:text-brand-yellow transition-colors" data-testid="footer-twitter">Twitter</a>
              <a href="#" className="text-gray-400 hover:text-brand-yellow transition-colors" data-testid="footer-github">GitHub</a>
            </div>
          </div>
          <div className="text-center mt-8 text-gray-500 text-sm">
            <p data-testid="footer-copyright">© 2026 Genesys Info X. Engineering the Future Through Innovation.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Animated Section Component with improved performance
function AnimatedSection({ children }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={fadeUpVariant}
    >
      {children}
    </motion.div>
  );
}

export default App;