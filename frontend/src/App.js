import { useEffect, useRef, useState } from 'react';
import './App.css';
import { motion, useInView, useAnimation } from 'framer-motion';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;
const LOGO_URL = 'https://customer-assets.emergentagent.com/job_web-creator-768/artifacts/925qpowk_IMG_9976.jpg';

// Enhanced animation variants
const fadeUpVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  }
};

const fadeInVariant = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.8, ease: 'easeOut' }
  }
};

const slideLeftVariant = {
  hidden: { opacity: 0, x: 60 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
  }
};

const slideRightVariant = {
  hidden: { opacity: 0, x: -60 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
  }
};

const scaleUpVariant = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
};

const iconFloatVariant = {
  animate: {
    y: [-5, 5, -5],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

function App() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitStatus, setSubmitStatus] = useState('');

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
    <div className="bg-light-bg text-text-dark font-body overflow-x-hidden">
      {/* Navigation */}
      <motion.nav 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="fixed top-0 w-full z-50 nav-blur" 
        data-testid="main-nav"
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-4 flex justify-between items-center">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            data-testid="nav-logo"
          >
            <img src={LOGO_URL} alt="Genesys Info X" className="logo-image" />
          </motion.div>
          <div className="hidden md:flex gap-8 items-center">
            <motion.button 
              whileHover={{ scale: 1.05, color: '#FDB913' }}
              onClick={() => scrollToSection('services')} 
              className="text-text-gray hover:text-brand-yellow transition-colors text-sm uppercase tracking-widest font-semibold" 
              data-testid="nav-services"
            >
              Services
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.05, color: '#FDB913' }}
              onClick={() => scrollToSection('ecosystem')} 
              className="text-text-gray hover:text-brand-yellow transition-colors text-sm uppercase tracking-widest font-semibold" 
              data-testid="nav-ecosystem"
            >
              Ecosystem
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.05, color: '#FDB913' }}
              onClick={() => scrollToSection('careers')} 
              className="text-text-gray hover:text-brand-yellow transition-colors text-sm uppercase tracking-widest font-semibold" 
              data-testid="nav-careers"
            >
              Careers
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollToSection('contact')} 
              className="btn-primary" 
              data-testid="nav-contact-btn"
            >
              Contact Us
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 bg-gradient-to-br from-light-bg via-light-secondary to-light-tertiary" data-testid="hero-section">
        <div className="hero-glow"></div>
        <div className="section-pattern absolute inset-0 opacity-50"></div>
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10 py-24">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="text-center max-w-5xl mx-auto"
          >
            <motion.div variants={fadeInVariant} className="mb-6" data-testid="hero-label">
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-brand-green font-bold">Global Technology Ecosystem</span>
            </motion.div>
            <motion.h1 
              variants={fadeUpVariant}
              className="font-heading text-6xl md:text-8xl font-bold tracking-tighter leading-none mb-8 text-text-dark"
              data-testid="hero-headline"
            >
              Engineering the <span className="gradient-text">Future</span><br />
              Through AI, Cloud & Innovation
            </motion.h1>
            <motion.p 
              variants={fadeUpVariant}
              className="text-lg md:text-xl leading-relaxed text-text-gray mb-12 max-w-3xl mx-auto"
              data-testid="hero-description"
            >
              Genesys Info X is a global technology and consulting powerhouse delivering Enterprise AI, Cloud Architecture, DevOps, Blockchain, Green Energy solutions, and next-generation workforce development programs.
            </motion.p>
            <motion.div 
              variants={fadeUpVariant} 
              className="flex flex-col sm:flex-row gap-6 justify-center items-center" 
              data-testid="hero-cta-group"
            >
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection('services')} 
                className="btn-primary" 
                data-testid="hero-explore-btn"
              >
                Explore Services
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection('contact')} 
                className="btn-secondary" 
                data-testid="hero-partner-btn"
              >
                Partner With Us
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 md:py-32 relative bg-white" data-testid="about-section">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <AnimatedSection variant={fadeUpVariant}>
            <div className="text-center mb-20">
              <motion.span 
                variants={scaleUpVariant}
                className="text-xs font-mono uppercase tracking-[0.2em] text-brand-yellow mb-4 block font-bold" 
                data-testid="about-label"
              >
                Who We Are
              </motion.span>
              <h2 className="font-heading text-4xl md:text-6xl font-semibold tracking-tight mb-6 text-text-dark" data-testid="about-title">Global Innovation Ecosystem</h2>
              <div className="h-1 w-32 mx-auto bg-gradient-to-r from-brand-yellow to-brand-green rounded-full"></div>
            </div>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-16 items-center">
            <AnimatedSection variant={slideRightVariant}>
              <div className="relative pl-12">
                <div className="timeline-line"></div>
                {[
                  { title: 'Strategic IT Consulting', desc: 'Digital transformation and technology strategy for Fortune 500 enterprises.' },
                  { title: 'Advanced AI Solutions', desc: 'Machine learning, NLP, and generative AI at scale.' },
                  { title: 'Enterprise Workforce Development', desc: 'Bridging academia and industry through rigorous training programs.' },
                  { title: 'Sustainable Technology', desc: 'Green energy and eco-friendly tech initiatives through Genesys Green X.' }
                ].map((item, idx) => (
                  <motion.div 
                    key={idx} 
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1, duration: 0.5 }}
                    className="relative mb-12 last:mb-0" 
                    data-testid={`about-timeline-item-${idx}`}
                  >
                    <div className="timeline-dot" style={{ top: '8px' }}></div>
                    <h3 className="font-heading text-xl md:text-2xl font-medium mb-2 text-text-dark">{item.title}</h3>
                    <p className="text-text-gray leading-relaxed">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </AnimatedSection>
            <AnimatedSection variant={slideLeftVariant}>
              <div className="glass-card p-12 rounded-2xl">
                <p className="text-text-gray text-lg leading-relaxed mb-6" data-testid="about-description">
                  Genesys Info X operates as a <span className="text-brand-yellow font-semibold">global technology ecosystem</span>, partnering with education platforms, government bodies, and industry leaders to deliver cutting-edge solutions.
                </p>
                <p className="text-text-gray leading-relaxed">
                  Our collaboration extends to workforce transformation, where we empower the next generation of technologists through intensive internship programs, real-world projects, and industry certifications.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 md:py-32 bg-light-secondary section-pattern" data-testid="services-section">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <AnimatedSection variant={fadeUpVariant}>
            <div className="text-center mb-20">
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-brand-green mb-4 block font-bold" data-testid="services-label">What We Deliver</span>
              <h2 className="font-heading text-4xl md:text-6xl font-semibold tracking-tight text-text-dark" data-testid="services-title">Enterprise Solutions</h2>
            </div>
          </AnimatedSection>

          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
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
              <motion.div
                key={idx}
                variants={fadeUpVariant}
                whileHover={{ scale: 1.03 }}
                className="service-card p-8 h-full rounded-2xl" 
                data-testid={`service-card-${idx}`}
              >
                <motion.div 
                  variants={iconFloatVariant}
                  animate="animate"
                  className="text-6xl mb-6 service-icon"
                >
                  {service.icon}
                </motion.div>
                <h3 className="font-heading text-xl md:text-2xl font-medium mb-4 text-text-dark">{service.title}</h3>
                <p className="text-text-gray leading-relaxed">{service.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Ecosystem Section */}
      <section id="ecosystem" className="py-24 md:py-32 bg-white" data-testid="ecosystem-section">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <AnimatedSection variant={fadeUpVariant}>
            <div className="text-center mb-20">
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-brand-yellow mb-4 block font-bold" data-testid="ecosystem-label">Innovation Network</span>
              <h2 className="font-heading text-4xl md:text-6xl font-semibold tracking-tight mb-6 text-text-dark" data-testid="ecosystem-title">Our Ecosystem</h2>
              <p className="text-text-gray text-lg max-w-2xl mx-auto">Genesys Info X operates as a parent innovation ecosystem, powering multiple specialized brands.</p>
            </div>
          </AnimatedSection>

          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8"
          >
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
              <motion.div
                key={idx}
                variants={scaleUpVariant}
                whileHover={{ scale: 1.05, rotate: idx % 2 === 0 ? 1 : -1 }}
                className="brand-card p-10 h-full rounded-2xl" 
                data-testid={`brand-card-${idx}`}
              >
                <motion.div 
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className="mb-6"
                >
                  <div className={`w-20 h-20 rounded-full bg-${brand.color}-dim border-3 border-${brand.color} flex items-center justify-center text-3xl font-bold shadow-lg`}>
                    {brand.name.charAt(0)}
                  </div>
                </motion.div>
                <h3 className="font-heading text-2xl md:text-3xl font-medium mb-4 text-text-dark">{brand.name}</h3>
                <p className="text-text-gray leading-relaxed">{brand.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="py-24 md:py-32 bg-light-secondary" data-testid="why-choose-section">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <AnimatedSection variant={fadeUpVariant}>
            <div className="text-center mb-20">
              <h2 className="font-heading text-4xl md:text-6xl font-semibold tracking-tight mb-6 text-text-dark" data-testid="why-choose-title">Why Choose Genesys Info X</h2>
            </div>
          </AnimatedSection>

          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-5 gap-8"
          >
            {[
              { title: 'Global Vision', icon: '🌍', desc: 'Presence across continents' },
              { title: 'Industry Partnerships', icon: '🤝', desc: 'Tier-1 technology alliances' },
              { title: 'Innovation Driven', icon: '⚡', desc: 'Cutting-edge R&D focus' },
              { title: 'Future Workforce', icon: '🚀', desc: 'Next-gen talent development' },
              { title: 'Enterprise Reliability', icon: '🛡️', desc: 'Fortune 500 trusted' }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                variants={fadeUpVariant}
                whileHover={{ y: -10, scale: 1.05 }}
                className="text-center glass-card p-8 rounded-2xl hover:shadow-xl transition-all duration-300" 
                data-testid={`why-choose-item-${idx}`}
              >
                <motion.div 
                  animate={{ 
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 1
                  }}
                  className="text-6xl mb-4"
                >
                  {item.icon}
                </motion.div>
                <h3 className="font-heading text-lg font-medium mb-2 text-text-dark">{item.title}</h3>
                <p className="text-text-gray text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Careers Section */}
      <section id="careers" className="py-24 md:py-32 bg-white" data-testid="careers-section">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <AnimatedSection variant={fadeUpVariant}>
            <div className="text-center mb-16">
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-brand-green mb-4 block font-bold" data-testid="careers-label">Join Our Team</span>
              <h2 className="font-heading text-4xl md:text-6xl font-semibold tracking-tight mb-6 text-text-dark" data-testid="careers-title">We're Hiring</h2>
              <p className="text-text-gray text-lg max-w-2xl mx-auto">Looking for top-tier engineering talent to join our global innovation teams.</p>
            </div>
          </AnimatedSection>

          <AnimatedSection variant={scaleUpVariant}>
            <div className="glass-card p-12 max-w-4xl mx-auto rounded-2xl">
              <div className="mb-8">
                <h3 className="font-heading text-2xl font-medium mb-6 text-text-dark" data-testid="careers-roles-title">Open Positions:</h3>
                <div className="flex flex-wrap gap-4">
                  {['Java Developer', 'Python Engineer', 'DevOps Specialist', 'AI/ML Engineer', 'Blockchain Developer', 'Golang Developer'].map((role, idx) => (
                    <motion.span 
                      key={idx}
                      whileHover={{ scale: 1.1, y: -3 }}
                      className="px-6 py-3 bg-brand-yellow-dim border-2 border-brand-yellow text-brand-yellow-dark font-mono text-sm uppercase tracking-wider rounded-full font-bold shadow-md" 
                      data-testid={`career-role-${idx}`}
                    >
                      {role}
                    </motion.span>
                  ))}
                </div>
              </div>
              <div className="border-t-2 border-light-tertiary pt-8">
                <p className="text-text-gray mb-6">Submit your resume and portfolio to join the future of technology.</p>
                <motion.a 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="mailto:recruitment@genesysinfox.com" 
                  className="btn-primary inline-block"
                  data-testid="careers-email-btn"
                >
                  recruitment@genesysinfox.com
                </motion.a>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-24 md:py-32 bg-light-secondary overflow-hidden" data-testid="partners-section">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <AnimatedSection variant={fadeUpVariant}>
            <div className="text-center mb-16">
              <h2 className="font-heading text-3xl md:text-5xl font-semibold tracking-tight text-text-dark" data-testid="partners-title">Trusted by Global Leaders</h2>
            </div>
          </AnimatedSection>
          <div className="relative overflow-hidden">
            <div className="partner-logo-scroll flex gap-16 items-center" data-testid="partners-logos">
              {[...Array(12)].map((_, idx) => (
                <motion.div 
                  key={idx}
                  whileHover={{ scale: 1.1, opacity: 1 }}
                  className="flex-shrink-0 w-32 h-20 glass-card flex items-center justify-center opacity-50 transition-opacity rounded-xl"
                >
                  <span className="text-text-gray font-heading text-sm font-bold">PARTNER</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 md:py-32 bg-white" data-testid="contact-section">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="grid md:grid-cols-2 gap-16">
            <AnimatedSection variant={slideRightVariant}>
              <div>
                <span className="text-xs font-mono uppercase tracking-[0.2em] text-brand-yellow mb-4 block font-bold" data-testid="contact-label">Get In Touch</span>
                <h2 className="font-heading text-4xl md:text-6xl font-semibold tracking-tight mb-8 text-text-dark" data-testid="contact-title">Let's Build the Future</h2>
                <div className="space-y-6">
                  <motion.div whileHover={{ x: 5 }}>
                    <p className="text-text-gray text-sm mb-2">General Inquiries</p>
                    <a href="mailto:info@genesysinfox.com" className="text-brand-yellow text-xl hover:underline font-semibold" data-testid="contact-email-general">info@genesysinfox.com</a>
                  </motion.div>
                  <motion.div whileHover={{ x: 5 }}>
                    <p className="text-text-gray text-sm mb-2">Careers</p>
                    <a href="mailto:recruitment@genesysinfox.com" className="text-brand-green text-xl hover:underline font-semibold" data-testid="contact-email-careers">recruitment@genesysinfox.com</a>
                  </motion.div>
                  <motion.div whileHover={{ x: 5 }}>
                    <p className="text-text-gray text-sm mb-2">Location</p>
                    <p className="text-text-dark text-lg font-semibold" data-testid="contact-location">HITEC City, Hyderabad, India</p>
                  </motion.div>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection variant={slideLeftVariant}>
              <motion.form 
                onSubmit={handleContactSubmit} 
                className="glass-card p-8 rounded-2xl" 
                data-testid="contact-form"
              >
                <div className="mb-6">
                  <label className="block text-text-dark text-sm mb-2 font-semibold" htmlFor="email">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full bg-white border-2 border-light-tertiary px-4 py-3 text-text-dark focus:border-brand-yellow focus:outline-none transition-colors rounded-lg"
                    placeholder="your.email@company.com"
                    data-testid="contact-form-email"
                  />
                </div>
                <div className="mb-6">
                  <label className="block text-text-dark text-sm mb-2 font-semibold" htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    rows={5}
                    className="w-full bg-white border-2 border-light-tertiary px-4 py-3 text-text-dark focus:border-brand-yellow focus:outline-none transition-colors resize-none rounded-lg"
                    placeholder="Tell us about your project..."
                    data-testid="contact-form-message"
                  />
                </div>
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit" 
                  className="btn-primary w-full"
                  disabled={submitStatus === 'sending'}
                  data-testid="contact-form-submit"
                >
                  {submitStatus === 'sending' ? 'Sending...' : 'Send Message'}
                </motion.button>
                {submitStatus === 'success' && (
                  <motion.p 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-brand-green mt-4 text-center font-semibold" 
                    data-testid="contact-form-success"
                  >
                    Message sent successfully!
                  </motion.p>
                )}
                {submitStatus === 'error' && (
                  <motion.p 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 mt-4 text-center font-semibold" 
                    data-testid="contact-form-error"
                  >
                    Failed to send message. Please try again.
                  </motion.p>
                )}
              </motion.form>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-light-secondary border-t-2 border-light-tertiary py-12" data-testid="footer">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <motion.div whileHover={{ scale: 1.05 }}>
              <img src={LOGO_URL} alt="Genesys Info X" className="logo-image" style={{ maxWidth: '160px' }} />
            </motion.div>
            <div className="flex gap-6">
              <motion.a 
                whileHover={{ scale: 1.1, color: '#FDB913' }}
                href="#" 
                className="text-text-gray hover:text-brand-yellow transition-colors font-semibold" 
                data-testid="footer-linkedin"
              >
                LinkedIn
              </motion.a>
              <motion.a 
                whileHover={{ scale: 1.1, color: '#FDB913' }}
                href="#" 
                className="text-text-gray hover:text-brand-yellow transition-colors font-semibold" 
                data-testid="footer-twitter"
              >
                Twitter
              </motion.a>
              <motion.a 
                whileHover={{ scale: 1.1, color: '#FDB913' }}
                href="#" 
                className="text-text-gray hover:text-brand-yellow transition-colors font-semibold" 
                data-testid="footer-github"
              >
                GitHub
              </motion.a>
            </div>
          </div>
          <div className="text-center mt-8 text-text-gray text-sm">
            <p data-testid="footer-copyright">© 2026 Genesys Info X. Engineering the Future Through Innovation.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Enhanced Animated Section Component
function AnimatedSection({ children, variant = fadeUpVariant }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variant}
    >
      {children}
    </motion.div>
  );
}

export default App;