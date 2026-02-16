import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  UtensilsCrossed,
  ShoppingBag,
  MapPin,
  Monitor,
  Users,
  Phone,
  Wrench,
  CheckCircle,
  Quote,
  ArrowRight,
  AlertTriangle,
  DollarSign,
  Eye,
  Zap,
} from 'lucide-react';
import { useScrollAnimation, useCounter } from '../hooks/useScrollAnimation';
import { logoRow1, logoRow2, testimonials } from '../data/clients';
import {
  fadeUp,
  fadeDown,
  fadeLeft,
  fadeRight,
  scaleIn,
  staggerContainer,
  staggerItem,
} from '../animation/variants';
import { springSnappy, springGentle, springBouncy, springSmooth } from '../animation/springs';
import CardTilt from '../components/CardTilt';
import GlowOrb from '../components/GlowOrb';
import ScrollIndicator from '../components/ScrollIndicator';
import MagneticButton from '../components/MagneticButton';
import SEOHead from '../components/SEOHead';

/* ─── keyframes injected once ─── */
const styleTag = document.createElement('style');
styleTag.textContent = `
@keyframes marqueeLeft {
  0%   { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
@keyframes marqueeRight {
  0%   { transform: translateX(-50%); }
  100% { transform: translateX(0); }
}
`;
if (!document.querySelector('[data-sg-marquee]')) {
  styleTag.setAttribute('data-sg-marquee', '');
  document.head.appendChild(styleTag);
}

/* ─── data ─── */

const solutions = [
  { title: 'Hospitality IT', icon: UtensilsCrossed, desc: '24/7 support for fast casual, QSR, coffee shops, and full-service restaurants. From POS to security cameras.', to: '/solutions/hospitality' },
  { title: 'Retail IT', icon: ShoppingBag, desc: 'Boutique to big box. Infrastructure, support, and buildouts for apparel, electronics, and wholesale.', to: '/solutions/retail' },
  { title: 'Nationwide Dispatching', icon: MapPin, desc: '200+ field technicians deployed coast to coast. Emergency and scheduled onsite support.', to: '/solutions/nationwide-dispatching' },
  { title: 'Office Tech Support', icon: Monitor, desc: 'Flat-rate, unlimited support for your home office. Remote and onsite. 24/7/365.', to: '/solutions/office-support' },
  { title: 'Dedicated Resources', icon: Users, desc: 'Full-time IT staff embedded in your brand. We handle HR, benefits, and payroll.', to: '/solutions/dedicated-resources' },
];

const painPoints = [
  { icon: AlertTriangle, title: 'Store-Level Outages Costing You Revenue', desc: 'Every minute of POS downtime is lost sales. Your current provider takes hours to respond.' },
  { icon: Zap, title: 'Scattered Vendor Relationships', desc: 'Juggling 5 different vendors for network, POS, cameras, and cabling. Nobody owns the full picture.' },
  { icon: DollarSign, title: 'No Visibility Into IT Spend Across Locations', desc: 'You can\'t optimize what you can\'t measure. IT costs are buried across invoices, contracts, and surprise bills.' },
  { icon: Eye, title: 'Reactive Support Instead of Proactive Management', desc: 'Your IT team only shows up after something breaks. By then, the damage is done.' },
];

const steps = [
  { num: '01', title: 'Text or Call Us', icon: Phone, desc: 'Report any issue via text, call, chat, or email. We create a ticket instantly and get to work.' },
  { num: '02', title: 'We Fix It Fast', icon: Wrench, desc: 'Our team diagnoses remotely or dispatches a local technician. 90% of onsite trips uncover additional issues we fix proactively.' },
  { num: '03', title: 'You Stay Open', icon: CheckCircle, desc: 'Verified resolution with store manager sign-off. Weekly strategic meetings to prevent future issues.' },
];

const caseStudyClients = [
  'Saxbys Coffee', "Lowe's", 'Philz Coffee', 'Juiceland', 'Pat LaFrieda',
  "Kellogg's NYC", 'Fields Good Chicken', 'Revlon', 'The Little Beet Table',
];

const caseStudyGradients = [
  'linear-gradient(135deg, #0a0a0a 0%, #2a2a2a 100%)',
  'linear-gradient(135deg, #1a1a1a 0%, #3d3d3d 100%)',
  'linear-gradient(135deg, #0d0d0d 0%, #333333 100%)',
  'linear-gradient(135deg, #222222 0%, #4a4a4a 100%)',
  'linear-gradient(135deg, #111111 0%, #383838 100%)',
  'linear-gradient(135deg, #2a2a2a 0%, #0a0a0a 100%)',
  'linear-gradient(135deg, #181818 0%, #404040 100%)',
  'linear-gradient(135deg, #333333 0%, #1a1a1a 100%)',
  'linear-gradient(135deg, #0a0a0a 0%, #444444 100%)',
];

/* ─── animation variant for solution cards ─── */

const solutionVariants = [fadeLeft, fadeRight, fadeUp, fadeRight, fadeLeft, scaleIn];

/* ─── sub-components ─── */

function StatItem({ target, suffix, label, isStatic }) {
  const [ref, isVisible] = useScrollAnimation(0.3);
  const count = useCounter(isStatic ? 0 : target, 2000, isVisible);

  return (
    <motion.div
      ref={ref}
      variants={scaleIn}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      style={{ textAlign: 'center' }}
    >
      <div style={{
        fontFamily: "'Sora', sans-serif",
        fontSize: 'clamp(56px, 6vw, 72px)',
        fontWeight: 800,
        color: '#fff',
        lineHeight: 1,
        letterSpacing: '-0.03em',
      }}>
        {isStatic ? '24/7' : `${count}${suffix}`}
      </div>
      <div style={{
        fontSize: 15,
        color: 'rgba(255,255,255,0.55)',
        marginTop: 12,
        fontFamily: "'Inter', sans-serif",
        fontWeight: 500,
        letterSpacing: '0.02em',
      }}>
        {label}
      </div>
    </motion.div>
  );
}

function SolutionCard({ item, index }) {
  const Icon = item.icon;
  const variant = solutionVariants[index % solutionVariants.length];

  return (
    <motion.div
      variants={variant}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <CardTilt>
        <Link to={item.to} style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
          <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: 16, height: '100%' }}>
            <Icon size={24} color="var(--primary)" strokeWidth={2} />
            <h4 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: 18 }}>{item.title}</h4>
            <p style={{ color: 'var(--text-muted)', fontSize: 14, lineHeight: 1.6, flex: 1 }}>{item.desc}</p>
            <span
              style={{
                color: 'var(--primary)',
                fontWeight: 600,
                fontSize: 14,
                display: 'inline-flex',
                alignItems: 'center',
                gap: 4,
                transition: 'gap 0.2s ease',
              }}
              className="learn-more-link"
            >
              Learn More <ArrowRight size={14} />
            </span>
          </div>
        </Link>
      </CardTilt>
    </motion.div>
  );
}

function LogoItem({ name }) {
  return (
    <div
      style={{
        flexShrink: 0,
        padding: '12px 24px',
        background: '#fff',
        border: '1px solid var(--border)',
        borderRadius: 8,
        fontWeight: 600,
        color: 'var(--text-muted)',
        fontSize: 14,
        fontFamily: "'Inter', sans-serif",
        opacity: 0.4,
        transition: 'opacity 0.3s ease',
        whiteSpace: 'nowrap',
        userSelect: 'none',
      }}
      onMouseEnter={e => { e.currentTarget.style.opacity = '1'; }}
      onMouseLeave={e => { e.currentTarget.style.opacity = '0.4'; }}
    >
      {name}
    </div>
  );
}

/* ─── main component ─── */

export default function Home() {
  return (
    <>
      <SEOHead
        title="Specific Gravity | Managed IT for Multi-Unit Brands"
        description="24/7 IT support for multi-unit restaurant, retail, and hospitality brands. 894+ field technicians, 500+ locations managed nationwide. Get your free assessment today."
        path="/"
      />

      {/* ── Section 1: Hero ── */}
      <section
        className="dot-pattern"
        style={{
          position: 'relative',
          overflow: 'hidden',
          background: 'var(--dark-hero)',
          padding: 'clamp(120px, 12vw, 160px) 0 clamp(64px, 8vw, 96px)',
        }}
      >
        {/* Glow orbs */}
        <div style={{
          position: 'absolute', top: '-20%', left: '-10%', width: 600, height: 600,
          background: 'radial-gradient(circle, rgba(255,255,255,0.06) 0%, transparent 70%)',
          pointerEvents: 'none',
          animation: 'glow-drift 8s ease-in-out infinite',
        }} />
        <div style={{
          position: 'absolute', bottom: '-30%', right: '-5%', width: 500, height: 500,
          background: 'radial-gradient(circle, rgba(255,255,255,0.04) 0%, transparent 70%)',
          pointerEvents: 'none',
          animation: 'glow-drift 12s ease-in-out infinite reverse',
        }} />
        <div style={{
          position: 'absolute', top: '30%', right: '20%', width: 300, height: 300,
          background: 'radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 70%)',
          pointerEvents: 'none',
          animation: 'glow-drift 10s ease-in-out infinite 2s',
        }} />

        <div className="container" style={{ position: 'relative', zIndex: 1, textAlign: 'center', maxWidth: 900, margin: '0 auto' }}>
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={springGentle}
          >
            <span style={{
              display: 'inline-block',
              padding: '8px 20px',
              borderRadius: 9999,
              background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255,255,255,0.2)',
              boxShadow: '0 0 20px rgba(255,255,255,0.05)',
              color: 'rgba(255,255,255,0.85)',
              fontSize: 14,
              fontWeight: 500,
              fontFamily: "'Inter', sans-serif",
              marginBottom: 32,
            }}>
              Trusted by 500+ Locations Nationwide
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            className="display-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...springGentle, delay: 0.1 }}
            style={{ color: '#fff', marginBottom: 24, fontFamily: "'Sora', sans-serif" }}
          >
            Your Restaurant Technology,<br />
            <span style={{
              background: 'linear-gradient(135deg, #2563EB 0%, #60A5FA 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              Managed Better.
            </span>
          </motion.h1>

          {/* Subhead */}
          <motion.p
            className="body-large"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...springGentle, delay: 0.2 }}
            style={{ color: 'rgba(255,255,255,0.7)', maxWidth: 720, margin: '0 auto 40px', fontFamily: "'Inter', sans-serif", lineHeight: 1.6 }}
          >
            24/7 IT support for multi-unit restaurant, retail, and hospitality brands. From new store openings to daily operations — we keep your technology running so you can focus on your business.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...springGentle, delay: 0.3 }}
            style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}
          >
            <MagneticButton>
              <Link to="/contact" className="btn btn-primary-lg">Get Your Free Assessment</Link>
            </MagneticButton>
            <a href="#how-it-works" className="btn btn-secondary" style={{ height: 56, fontSize: 16, padding: '0 32px' }}>See How It Works</a>
          </motion.div>
        </div>

        <ScrollIndicator />
      </section>

      {/* ── Section 2: Trusted By Logo Bar ── */}
      <section style={{ background: '#fff', padding: '48px 0', overflow: 'hidden' }}>
        <p style={{
          textAlign: 'center', textTransform: 'uppercase', fontSize: 12, fontWeight: 600,
          letterSpacing: '0.12em', color: 'var(--text-muted)', marginBottom: 32, fontFamily: "'Inter', sans-serif",
        }}>
          Trusted by America&rsquo;s Leading Brands
        </p>

        {/* Row 1 -- scrolls left */}
        <div
          style={{ overflow: 'hidden', marginBottom: 16 }}
          onMouseEnter={e => { e.currentTarget.querySelector('[data-track]').style.animationPlayState = 'paused'; }}
          onMouseLeave={e => { e.currentTarget.querySelector('[data-track]').style.animationPlayState = 'running'; }}
        >
          <div data-track="" style={{
            display: 'flex', gap: 16, width: 'max-content',
            animation: 'marqueeLeft 40s linear infinite',
          }}>
            {[...logoRow1, ...logoRow1, ...logoRow1, ...logoRow1].map((name, i) => (
              <LogoItem key={`r1-${i}`} name={name} />
            ))}
          </div>
        </div>

        {/* Row 2 -- scrolls right */}
        <div
          style={{ overflow: 'hidden' }}
          onMouseEnter={e => { e.currentTarget.querySelector('[data-track]').style.animationPlayState = 'paused'; }}
          onMouseLeave={e => { e.currentTarget.querySelector('[data-track]').style.animationPlayState = 'running'; }}
        >
          <div data-track="" style={{
            display: 'flex', gap: 16, width: 'max-content',
            animation: 'marqueeRight 40s linear infinite',
          }}>
            {[...logoRow2, ...logoRow2, ...logoRow2, ...logoRow2].map((name, i) => (
              <LogoItem key={`r2-${i}`} name={name} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 3: Problem Agitation ── */}
      <section className="section" style={{ background: '#fff' }}>
        <div className="container">
          <motion.div
            className="section-header"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <h2 style={{ fontFamily: "'Sora', sans-serif" }}>Still Managing IT with Duct Tape?</h2>
            <p style={{ fontFamily: "'Inter', sans-serif" }}>
              If any of these sound familiar, you&rsquo;re leaving money on the table.
            </p>
          </motion.div>

          <motion.div
            className="grid-2"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            style={{ maxWidth: 960, margin: '0 auto' }}
          >
            {painPoints.map((point) => {
              const Icon = point.icon;
              return (
                <motion.div
                  key={point.title}
                  variants={staggerItem}
                  className="card"
                  style={{
                    display: 'flex',
                    gap: 16,
                    alignItems: 'flex-start',
                    borderLeft: '3px solid var(--accent)',
                  }}
                >
                  <div style={{
                    flexShrink: 0,
                    width: 44,
                    height: 44,
                    borderRadius: 10,
                    background: 'var(--accent-light)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    <Icon size={20} color="var(--accent)" strokeWidth={2} />
                  </div>
                  <div>
                    <h4 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: 16, marginBottom: 6 }}>
                      {point.title}
                    </h4>
                    <p style={{ color: 'var(--text-muted)', fontSize: 14, lineHeight: 1.6 }}>
                      {point.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ── Section 4: Solutions Grid ── */}
      <section className="section section-alt">
        <div className="container">
          <motion.div
            className="section-header"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <h2 style={{ fontFamily: "'Sora', sans-serif" }}>What We Do</h2>
            <p style={{ fontFamily: "'Inter', sans-serif" }}>End-to-end technology management for multi-unit brands</p>
          </motion.div>
          <div className="grid-3">
            {solutions.map((item, i) => (
              <SolutionCard key={item.title} item={item} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 5: Stats Counter Bar ── */}
      <section className="section section-dark" style={{ background: 'var(--dark-hero)' }}>
        <div className="container">
          <div className="grid-4" style={{ maxWidth: 960, margin: '0 auto' }}>
            <StatItem target={894} suffix="+" label="Field Technicians" />
            <StatItem target={500} suffix="+" label="Locations Managed" />
            <StatItem target={0} suffix="" label="Support Availability" isStatic />
            <StatItem target={10} suffix="+" label="Years of Experience" />
          </div>
        </div>
      </section>

      {/* ── Section 6: How It Works ── */}
      <section id="how-it-works" className="section" style={{ background: '#fff' }}>
        <div className="container">
          <motion.div
            className="section-header"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <h2 style={{ fontFamily: "'Sora', sans-serif" }}>Real Hospitality People, Not Call Centers</h2>
            <p style={{ fontFamily: "'Inter', sans-serif" }}>What if managing your tech was as simple as sending a text?</p>
          </motion.div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: 48,
            maxWidth: 1000,
            margin: '0 auto',
            position: 'relative',
          }}>
            {/* Connecting line -- desktop only */}
            <div
              style={{
                position: 'absolute', top: 36, left: '20%', right: '20%', height: 2,
                borderTop: '2px dashed rgba(0,0,0,0.15)',
                pointerEvents: 'none',
                zIndex: 0,
              }}
              className="how-it-works-line"
            />

            {steps.map((step, i) => {
              const variants = [fadeLeft, fadeUp, fadeRight];
              return (
                <motion.div
                  key={step.num}
                  variants={variants[i]}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                  style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}
                >
                  <div style={{
                    width: 72, height: 72, borderRadius: '50%', background: 'var(--primary)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    margin: '0 auto 20px', color: '#fff', fontFamily: "'Sora', sans-serif",
                    fontWeight: 700, fontSize: 20,
                    boxShadow: '0 0 20px rgba(255,255,255,0.1), 0 4px 15px rgba(0,0,0,0.2)',
                  }}>
                    {step.num}
                  </div>
                  <step.icon size={28} color="var(--primary)" style={{ marginBottom: 12 }} />
                  <h4 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: 18, marginBottom: 8 }}>{step.title}</h4>
                  <p style={{ color: 'var(--text-muted)', fontSize: 14, lineHeight: 1.6, fontFamily: "'Inter', sans-serif", maxWidth: 280, margin: '0 auto' }}>
                    {step.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            style={{ textAlign: 'center', marginTop: 48 }}
          >
            <Link to="/about" style={{ color: 'var(--primary)', fontWeight: 600, fontSize: 16, fontFamily: "'Inter', sans-serif", display: 'inline-flex', alignItems: 'center', gap: 6 }}>
              See Our Full Methodology <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── Section 7: Client Case Studies Grid ── */}
      <section className="section section-alt">
        <div className="container">
          <motion.div
            className="section-header"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <h2 style={{ fontFamily: "'Sora', sans-serif" }}>Brands That Trust Us</h2>
            <p style={{ fontFamily: "'Inter', sans-serif" }}>Our clients are our partners. Their success is our success.</p>
          </motion.div>
          <motion.div
            className="grid-3"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {caseStudyClients.map((name, i) => (
              <motion.div
                key={name}
                variants={staggerItem}
                style={{
                  position: 'relative',
                  borderRadius: 16,
                  overflow: 'hidden',
                  background: caseStudyGradients[i],
                  aspectRatio: '4 / 3',
                  cursor: 'pointer',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                }}
                whileHover={{ scale: 1.02, boxShadow: '0 12px 40px rgba(0,0,0,0.15)' }}
              >
                <div style={{
                  position: 'absolute', bottom: 0, left: 0, right: 0,
                  padding: '24px 20px 20px',
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.08) 100%)',
                  backdropFilter: 'blur(16px)',
                  borderTop: '1px solid rgba(255,255,255,0.15)',
                }}>
                  <span style={{ color: '#fff', fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: 16 }}>{name}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            style={{ textAlign: 'center', marginTop: 48 }}
          >
            <Link to="/clients" style={{ color: 'var(--primary)', fontWeight: 600, fontSize: 16, fontFamily: "'Inter', sans-serif", display: 'inline-flex', alignItems: 'center', gap: 6 }}>
              View All Clients <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── Section 8: Testimonials ── */}
      <section className="section" style={{ background: '#fff' }}>
        <div className="container">
          <motion.div
            className="section-header"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <h2 style={{ fontFamily: "'Sora', sans-serif" }}>What Our Clients Say</h2>
          </motion.div>
          <motion.div
            className="grid-3"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {testimonials.map((t, i) => {
              /* Center card (index 1) enters from below; flanking cards from sides */
              const cardVariants = [fadeLeft, fadeUp, fadeRight];
              const variant = cardVariants[i % cardVariants.length];
              return (
                <motion.div
                  key={t.name}
                  variants={variant}
                  style={{
                    background: 'linear-gradient(135deg, rgba(26,26,26,0.04) 0%, rgba(64,64,64,0.02) 100%)',
                    border: '1px solid var(--border)',
                    borderLeft: '3px solid #0A0A0A',
                    borderRadius: 16,
                    padding: 32,
                  }}
                >
                  <Quote size={48} color="var(--primary)" strokeWidth={1.5} style={{ marginBottom: 16, opacity: 0.6 }} />
                  <p style={{ fontSize: 18, fontStyle: 'italic', lineHeight: 1.7, color: '#0A0A0A', fontFamily: "'Inter', sans-serif", marginBottom: 20 }}>
                    {t.quote}
                  </p>
                  <div>
                    <span style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: 14, color: '#0A0A0A', display: 'block' }}>
                      {t.name}
                    </span>
                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: 'var(--text-muted)' }}>
                      {t.role}, {t.company}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ── Section 9: CTA Banner ── */}
      <section
        className="dot-pattern"
        style={{
          position: 'relative',
          overflow: 'hidden',
          background: 'var(--dark-hero)',
          padding: 'clamp(64px, 8vw, 96px) 0',
        }}
      >
        <GlowOrb size={500} color="rgba(37, 99, 235, 0.06)" />

        <div className="container" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <motion.h2
            className="display-lg"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            style={{ color: '#fff', fontFamily: "'Sora', sans-serif", marginBottom: 20 }}
          >
            Ready to{' '}
            <span style={{
              background: 'linear-gradient(135deg, #2563EB 0%, #60A5FA 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              Simplify
            </span>
            {' '}Your Tech?
          </motion.h2>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            style={{ color: 'rgba(255,255,255,0.7)', fontSize: 18, maxWidth: 640, margin: '0 auto 36px', fontFamily: "'Inter', sans-serif", lineHeight: 1.6 }}
          >
            Join 500+ locations that trust SpecGravity for their IT. No contracts. No hardware changes. Just better support.
          </motion.p>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}
          >
            <MagneticButton>
              <Link to="/contact" className="btn btn-primary-lg">Get Your Free Assessment</Link>
            </MagneticButton>
            <a href="tel:8447004728" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '10px 24px', borderRadius: 9999,
              background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255,255,255,0.2)',
              color: 'rgba(255,255,255,0.85)', fontSize: 15, fontWeight: 500, fontFamily: "'Inter', sans-serif",
              transition: 'border-color 0.2s ease',
            }}>
              <Phone size={16} /> Or call us: 844-700-GRAV
            </a>
          </motion.div>
        </div>
      </section>
    </>
  );
}
