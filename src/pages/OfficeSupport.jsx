import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Clock,
  DollarSign,
  MapPin,
  MessageCircle,
  Plug,
  Eye,
  CheckCircle,
  ChevronDown,
  ArrowRight,
  Monitor,
  Wifi,
  ShieldCheck,
  Headphones,
  Server,
  Phone,
} from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { fadeUp, fadeDown, fadeLeft, fadeRight, scaleIn, staggerContainer, staggerItem } from '../animation/variants';
import { springGentle, springSmooth, springSnappy, springBouncy } from '../animation/springs';
import Breadcrumbs from '../components/Breadcrumbs';
import SEOHead from '../components/SEOHead';
import CardTilt from '../components/CardTilt';

/* ─── Constants ─── */
const FONT_HEADING = "'Sora', sans-serif";
const FONT_BODY = "'Inter', sans-serif";
const PRIMARY = '#1A1A1A';
const DARK_HERO = 'linear-gradient(135deg, #0a0a0a 0%, #111111 50%, #0d0d0d 100%)';

/* ─── Data ─── */
const FEATURES = [
  { icon: Clock, title: '24/7/365 Availability', desc: 'Round-the-clock support that never takes a day off. Nights, weekends, holidays \u2014 we answer.' },
  { icon: DollarSign, title: 'Unlimited Support, Flat Rate', desc: 'One predictable cost per machine per month. No surprise invoices, no per-ticket fees.' },
  { icon: MapPin, title: 'US-Based Technicians', desc: 'Local support teams across New York, New Jersey, and Pennsylvania for onsite needs.' },
  { icon: MessageCircle, title: 'Call, Text, Chat, Email', desc: 'Reach us however your team prefers. Every channel connects to the same expert team.' },
  { icon: Plug, title: 'Standalone or Integrated', desc: 'Works as your complete IT department or plugs seamlessly into your existing infrastructure.' },
  { icon: Eye, title: 'Proactive Monitoring', desc: 'We catch issues before your team does. Automated alerts and real-time system health dashboards.' },
];

const SCOPE_ITEMS = [
  { icon: Monitor, title: 'Workstations & Laptops', desc: 'Setup, imaging, troubleshooting, and lifecycle management for every endpoint.' },
  { icon: Wifi, title: 'Network & Connectivity', desc: 'Router, switch, and access point management. Wi-Fi optimization, VPN configuration, and ISP liaison.' },
  { icon: ShieldCheck, title: 'Security & Compliance', desc: 'Antivirus deployment, patch management, firewall rules, and compliance reporting.' },
  { icon: Server, title: 'Server & Cloud', desc: 'On-premise server monitoring, cloud workspace administration (M365, Google Workspace), and backup verification.' },
  { icon: Headphones, title: 'Help Desk', desc: 'Tier 1\u20133 support with a dedicated queue for your team. Average first-response under 8 minutes.' },
  { icon: DollarSign, title: 'Procurement & Licensing', desc: 'Hardware sourcing, software license management, and vendor negotiation at volume pricing.' },
];

const HOW_IT_WORKS = [
  { num: '01', title: 'Onboarding Audit', desc: 'We document every device, account, vendor, and network node in your office. No guesswork.' },
  { num: '02', title: 'Support Activation', desc: 'Your team gets dedicated phone, email, and chat lines. Monitoring agents are deployed silently.' },
  { num: '03', title: 'Ongoing Management', desc: 'Proactive patching, automated alerts, and weekly health reports keep your systems ahead of problems.' },
  { num: '04', title: 'Strategic Reviews', desc: 'Monthly or quarterly check-ins with your account manager to plan upgrades, budget, and roadmap.' },
];

const FAQ_DATA = [
  {
    q: 'What does the help desk cover?',
    a: 'Our help desk handles everything from password resets and email issues to printer connectivity, software installations, VPN troubleshooting, and multi-monitor setups. Tier 1\u20133 support is included \u2014 no issue is too small or too complex.',
  },
  {
    q: 'Can you support remote and hybrid employees?',
    a: 'Absolutely. We provide the same level of support whether your team is in the office, at home, or on the road. Remote desktop tools, VPN management, and cloud-based ticketing ensure seamless coverage regardless of location.',
  },
  {
    q: 'Do you handle onsite visits for hardware issues?',
    a: 'Yes. Our US-based field technicians cover the tri-state area (NY, NJ, PA) for any issue that cannot be resolved remotely \u2014 hardware swaps, network rack work, cabling, and conference room A/V setups.',
  },
  {
    q: 'Can you procure hardware and manage licenses for us?',
    a: 'We handle end-to-end procurement: laptops, monitors, docking stations, networking gear, and peripherals. We also manage software licensing for Microsoft 365, Google Workspace, Adobe, and any line-of-business applications your team uses.',
  },
  {
    q: 'How do you handle network management and security?',
    a: 'We manage your entire network stack \u2014 firewalls, switches, access points, and ISP relationships. Security includes endpoint protection, patch management, DNS filtering, and compliance reporting aligned to your industry requirements.',
  },
];

const SIBLING_SOLUTIONS = [
  { label: 'Hospitality IT', to: '/solutions/hospitality', desc: 'Restaurant and hotel technology support' },
  { label: 'Retail IT', to: '/solutions/retail', desc: 'Multi-unit retail tech management' },
  { label: 'Nationwide Dispatching', to: '/solutions/nationwide-dispatching', desc: 'Field technician dispatch coast to coast' },
  { label: 'Dedicated Resources', to: '/solutions/dedicated-resources', desc: 'Embedded engineers for your team' },
];

const TIERS = [
  {
    name: 'Essential',
    price: 'From $75',
    unit: '/ machine / mo',
    features: ['Business-hours help desk', 'Remote support', 'Patch management', 'Monthly reporting'],
  },
  {
    name: 'Professional',
    price: 'From $125',
    unit: '/ machine / mo',
    features: ['24/7 help desk', 'Remote + onsite support', 'Proactive monitoring', 'Procurement assistance', 'Weekly reporting'],
    highlighted: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    unit: '',
    features: ['Everything in Professional', 'Dedicated account engineer', 'Strategic planning sessions', 'SLA-backed response times', 'Custom integrations'],
  },
];

/* ─── FAQ Accordion Item ─── */
function FaqItem({ question, answer, isOpen, onToggle }) {
  return (
    <div style={s.faqItem}>
      <button
        onClick={onToggle}
        style={s.faqButton}
        aria-expanded={isOpen}
        onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(0,0,0,0.02)'; }}
        onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
      >
        <span style={s.faqQuestion}>{question}</span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={springSnappy}
          style={{ flexShrink: 0, display: 'flex' }}
        >
          <ChevronDown size={20} color="#737373" />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={springGentle}
            style={{ overflow: 'hidden' }}
          >
            <p style={s.faqAnswer}>{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── Component ─── */
export default function OfficeSupport() {
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <>
      <SEOHead
        title="Office IT Support — SpecGravity"
        description="Flat-rate, unlimited IT support for your brand's headquarters and corporate team. 24/7 help desk, proactive monitoring, procurement, and onsite technicians."
        path="/solutions/office-support"
      />

      {/* ================================================================
          1. HERO
          ================================================================ */}
      <section style={s.hero} className="dot-pattern">
        <div className="container" style={{ position: 'relative', zIndex: 1, textAlign: 'center', maxWidth: 900, margin: '0 auto' }}>
          <Breadcrumbs />
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            style={{ marginTop: 24 }}
          >
            <motion.h1
              className="display-xl"
              variants={fadeDown}
              style={{ color: '#fff', marginBottom: 24, fontFamily: FONT_HEADING }}
            >
              Keep Your Home Office{' '}
              <span className="gradient-text">Running</span>
            </motion.h1>

            <motion.p
              className="body-large"
              variants={fadeUp}
              style={{ color: 'rgba(255,255,255,0.7)', maxWidth: 640, margin: '0 auto 32px', fontFamily: FONT_BODY, lineHeight: 1.6 }}
            >
              Flat-rate, unlimited IT support for your brand's headquarters and corporate team.
              One partner. Every device. Zero surprises.
            </motion.p>

            <motion.div variants={scaleIn}>
              <Link to="/contact" className="btn btn-primary-lg">
                Get a Custom Quote
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ================================================================
          2. KEY FEATURES GRID
          ================================================================ */}
      <section className="section" style={{ background: '#fff' }}>
        <div className="container">
          <div className="section-header">
            <motion.h2
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeDown}
              style={{ fontFamily: FONT_HEADING }}
            >
              Office Support That Just Works
            </motion.h2>
            <motion.p
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              style={{ fontFamily: FONT_BODY, color: '#737373', maxWidth: 560, margin: '12px auto 0' }}
            >
              Everything your corporate team needs, nothing it doesn't
            </motion.p>
          </div>

          <motion.div
            className="grid-3"
            style={{ maxWidth: 1080, margin: '0 auto' }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={staggerContainer}
          >
            {FEATURES.map((feat) => (
              <motion.div
                key={feat.title}
                variants={staggerItem}
                className="card"
                style={{ display: 'flex', flexDirection: 'column', gap: 14 }}
              >
                <feat.icon size={28} color={PRIMARY} strokeWidth={2} />
                <h4 style={{ fontFamily: FONT_HEADING, fontWeight: 700, fontSize: 17 }}>{feat.title}</h4>
                <p style={{ color: '#737373', fontSize: 14, lineHeight: 1.6, fontFamily: FONT_BODY }}>{feat.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ================================================================
          3. SCOPE OF SUPPORT (deep content)
          ================================================================ */}
      <section className="section section-alt">
        <div className="container">
          <div className="section-header">
            <motion.h2
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeDown}
              style={{ fontFamily: FONT_HEADING }}
            >
              What We Manage
            </motion.h2>
            <motion.p
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              style={{ fontFamily: FONT_BODY, color: '#737373', maxWidth: 580, margin: '12px auto 0' }}
            >
              From endpoints to infrastructure, every layer of your office technology is covered
            </motion.p>
          </div>

          <motion.div
            className="grid-3"
            style={{ maxWidth: 1080, margin: '0 auto' }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={staggerContainer}
          >
            {SCOPE_ITEMS.map((item) => (
              <CardTilt key={item.title} maxTilt={5} glare>
                <motion.div
                  variants={staggerItem}
                  style={s.scopeCard}
                >
                  <div style={s.scopeIconWrap}>
                    <item.icon size={24} color="#fff" strokeWidth={2} />
                  </div>
                  <h4 style={{ fontFamily: FONT_HEADING, fontWeight: 700, fontSize: 17, color: '#0A0A0A' }}>{item.title}</h4>
                  <p style={{ color: '#737373', fontSize: 14, lineHeight: 1.65, fontFamily: FONT_BODY }}>{item.desc}</p>
                </motion.div>
              </CardTilt>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ================================================================
          4. HOW IT WORKS
          ================================================================ */}
      <section className="section" style={{ background: '#fff' }}>
        <div className="container">
          <div className="section-header">
            <motion.h2
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={scaleIn}
              style={{ fontFamily: FONT_HEADING }}
            >
              How It Works
            </motion.h2>
            <motion.p
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              style={{ fontFamily: FONT_BODY, color: '#737373', maxWidth: 520, margin: '12px auto 0' }}
            >
              Four steps from first call to fully managed office
            </motion.p>
          </div>

          <motion.div
            style={s.stepsGrid}
            className="os-steps-grid"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={staggerContainer}
          >
            {HOW_IT_WORKS.map((step, i) => (
              <motion.div key={step.num} variants={i % 2 === 0 ? fadeLeft : fadeRight} style={s.stepCard}>
                <span style={s.stepNum}>{step.num}</span>
                <h4 style={{ fontFamily: FONT_HEADING, fontWeight: 700, fontSize: 18, color: '#0A0A0A', marginBottom: 8 }}>{step.title}</h4>
                <p style={{ fontFamily: FONT_BODY, fontSize: 15, lineHeight: 1.65, color: '#737373' }}>{step.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ================================================================
          5. PRICING SIGNAL
          ================================================================ */}
      <section style={s.pricingSection} className="dot-pattern">
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="section-header" style={{ marginBottom: 48 }}>
            <motion.h2
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeDown}
              style={{ fontFamily: FONT_HEADING, color: '#fff' }}
            >
              Flexible Support Tiers
            </motion.h2>
            <motion.p
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              style={{ fontFamily: FONT_BODY, color: 'rgba(255,255,255,0.6)', maxWidth: 520, margin: '12px auto 0' }}
            >
              Transparent pricing. No contracts. Scale up or down as your team changes.
            </motion.p>
          </div>

          <motion.div
            style={s.tiersGrid}
            className="os-tiers-grid"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={staggerContainer}
          >
            {TIERS.map((tier) => (
              <motion.div
                key={tier.name}
                variants={staggerItem}
                style={{
                  ...s.tierCard,
                  ...(tier.highlighted ? s.tierCardHighlighted : {}),
                }}
              >
                {tier.highlighted && <span style={s.tierBadge}>Most Popular</span>}
                <h3 style={{ fontFamily: FONT_HEADING, fontWeight: 700, fontSize: 22, color: tier.highlighted ? '#fff' : '#0A0A0A', marginBottom: 8 }}>
                  {tier.name}
                </h3>
                <div style={{ marginBottom: 24 }}>
                  <span style={{ fontFamily: FONT_HEADING, fontWeight: 700, fontSize: 36, color: tier.highlighted ? '#fff' : '#0A0A0A', letterSpacing: '-0.02em' }}>
                    {tier.price}
                  </span>
                  {tier.unit && (
                    <span style={{ fontFamily: FONT_BODY, fontSize: 14, color: tier.highlighted ? 'rgba(255,255,255,0.6)' : '#737373', marginLeft: 4 }}>
                      {tier.unit}
                    </span>
                  )}
                </div>
                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 28px', display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {tier.features.map((f) => (
                    <li key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontFamily: FONT_BODY, fontSize: 14, lineHeight: 1.5, color: tier.highlighted ? 'rgba(255,255,255,0.85)' : '#404040' }}>
                      <CheckCircle size={16} color={tier.highlighted ? '#fff' : PRIMARY} strokeWidth={2.5} style={{ flexShrink: 0, marginTop: 2 }} />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  to="/contact"
                  style={{
                    ...s.tierCta,
                    ...(tier.highlighted ? s.tierCtaHighlighted : {}),
                  }}
                >
                  Get Started
                  <ArrowRight size={16} />
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ================================================================
          6. FAQ ACCORDION
          ================================================================ */}
      <section className="section" style={{ background: '#fff' }}>
        <div className="container" style={{ maxWidth: 780, margin: '0 auto' }}>
          <div className="section-header">
            <motion.h2
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={scaleIn}
              style={{ fontFamily: FONT_HEADING }}
            >
              Frequently Asked Questions
            </motion.h2>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
          >
            {FAQ_DATA.map((item, i) => (
              <motion.div key={i} variants={staggerItem}>
                <FaqItem
                  question={item.q}
                  answer={item.a}
                  isOpen={openFaq === i}
                  onToggle={() => setOpenFaq(openFaq === i ? -1 : i)}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ================================================================
          7. CTA
          ================================================================ */}
      <section style={s.ctaSection} className="dot-pattern">
        <div className="container" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <motion.h2
            className="display-lg"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeDown}
            style={{ color: '#fff', fontFamily: FONT_HEADING, marginBottom: 20 }}
          >
            Simplify Your{' '}
            <span className="gradient-text">Office IT</span>
          </motion.h2>
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
            style={{ color: 'rgba(255,255,255,0.7)', fontSize: 18, maxWidth: 560, margin: '0 auto 36px', fontFamily: FONT_BODY, lineHeight: 1.6 }}
          >
            One flat rate. Unlimited support. Zero headaches.
          </motion.p>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={scaleIn}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}
          >
            <Link to="/contact" className="btn btn-primary-lg">Get a Custom Quote</Link>
            <a href="tel:8447004728" style={s.ctaPhone}>
              <Phone size={16} />
              Or call us: 844-700-GRAV
            </a>
          </motion.div>
        </div>
      </section>

      {/* ================================================================
          8. CROSS-NAVIGATION
          ================================================================ */}
      <section className="section section-alt">
        <div className="container">
          <div className="section-header">
            <motion.h2
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeDown}
              style={{ fontFamily: FONT_HEADING }}
            >
              Explore Our Other Solutions
            </motion.h2>
          </div>

          <motion.div
            style={s.crossNavGrid}
            className="os-cross-grid"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={staggerContainer}
          >
            {SIBLING_SOLUTIONS.map((sol) => (
              <motion.div key={sol.label} variants={staggerItem}>
                <Link to={sol.to} style={s.crossNavCard}>
                  <h4 style={{ fontFamily: FONT_HEADING, fontWeight: 700, fontSize: 17, color: '#0A0A0A', marginBottom: 6 }}>{sol.label}</h4>
                  <p style={{ fontFamily: FONT_BODY, fontSize: 14, color: '#737373', lineHeight: 1.5, marginBottom: 12 }}>{sol.desc}</p>
                  <span style={s.crossNavArrow}>
                    Learn More <ArrowRight size={14} />
                  </span>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Responsive overrides */}
      <style>{`
        .os-steps-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 24px;
          max-width: 900px;
          margin: 0 auto;
        }
        @media (min-width: 768px) {
          .os-steps-grid {
            grid-template-columns: 1fr 1fr;
          }
        }
        .os-tiers-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 24px;
          max-width: 1080px;
          margin: 0 auto;
        }
        @media (min-width: 768px) {
          .os-tiers-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }
        .os-cross-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 20px;
          max-width: 1080px;
          margin: 0 auto;
        }
        @media (min-width: 640px) {
          .os-cross-grid {
            grid-template-columns: 1fr 1fr;
          }
        }
        @media (min-width: 1024px) {
          .os-cross-grid {
            grid-template-columns: repeat(4, 1fr);
          }
        }
      `}</style>
    </>
  );
}

/* ======================================================
   STYLES
   ====================================================== */
const s = {
  hero: {
    position: 'relative',
    overflow: 'hidden',
    background: DARK_HERO,
    padding: 'clamp(120px, 12vw, 160px) 0 clamp(64px, 8vw, 96px)',
  },

  scopeCard: {
    display: 'flex',
    flexDirection: 'column',
    gap: 14,
    background: '#fff',
    border: '1px solid #DAE0E8',
    borderRadius: 16,
    padding: 32,
  },
  scopeIconWrap: {
    width: 44,
    height: 44,
    borderRadius: '50%',
    background: PRIMARY,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },

  stepsGrid: {},
  stepCard: {
    background: '#fff',
    border: '1px solid #DAE0E8',
    borderRadius: 16,
    padding: 32,
  },
  stepNum: {
    fontFamily: FONT_HEADING,
    fontSize: 48,
    fontWeight: 700,
    color: 'rgba(0,0,0,0.06)',
    lineHeight: 1,
    letterSpacing: '-0.02em',
    display: 'block',
    marginBottom: 12,
  },

  /* Pricing */
  pricingSection: {
    background: DARK_HERO,
    padding: '96px 0',
    position: 'relative',
    overflow: 'hidden',
  },
  tiersGrid: {},
  tierCard: {
    background: '#fff',
    border: '1px solid #DAE0E8',
    borderRadius: 20,
    padding: '36px 28px',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
  },
  tierCardHighlighted: {
    background: PRIMARY,
    border: '1px solid #333',
    boxShadow: '0 0 40px rgba(255,255,255,0.08)',
  },
  tierBadge: {
    position: 'absolute',
    top: -12,
    left: '50%',
    transform: 'translateX(-50%)',
    background: '#fff',
    color: PRIMARY,
    fontFamily: FONT_BODY,
    fontSize: 12,
    fontWeight: 700,
    padding: '4px 16px',
    borderRadius: 9999,
    whiteSpace: 'nowrap',
    letterSpacing: '0.02em',
    textTransform: 'uppercase',
  },
  tierCta: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    width: '100%',
    height: 48,
    fontFamily: FONT_BODY,
    fontSize: 14,
    fontWeight: 600,
    borderRadius: 9999,
    border: '2px solid ' + PRIMARY,
    background: 'transparent',
    color: PRIMARY,
    textDecoration: 'none',
    transition: 'all 0.2s ease',
    marginTop: 'auto',
  },
  tierCtaHighlighted: {
    border: '2px solid #fff',
    color: '#fff',
  },

  /* FAQ */
  faqItem: {
    borderBottom: '1px solid #E5E7EB',
  },
  faqButton: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 16,
    padding: '20px 0',
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    textAlign: 'left',
    transition: 'background 0.15s ease',
    borderRadius: 8,
  },
  faqQuestion: {
    fontFamily: FONT_HEADING,
    fontSize: 16,
    fontWeight: 600,
    color: '#0A0A0A',
    lineHeight: 1.4,
  },
  faqAnswer: {
    fontFamily: FONT_BODY,
    fontSize: 15,
    lineHeight: 1.7,
    color: '#737373',
    paddingBottom: 20,
    margin: 0,
  },

  /* CTA */
  ctaSection: {
    position: 'relative',
    overflow: 'hidden',
    background: DARK_HERO,
    padding: 'clamp(64px, 8vw, 96px) 0',
  },
  ctaPhone: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 8,
    fontFamily: FONT_BODY,
    fontSize: 14,
    fontWeight: 500,
    color: 'rgba(255,255,255,0.7)',
    background: 'rgba(255,255,255,0.06)',
    border: '1px solid rgba(255,255,255,0.15)',
    backdropFilter: 'blur(10px)',
    borderRadius: 9999,
    padding: '10px 24px',
    textDecoration: 'none',
    transition: 'border-color 0.2s ease, color 0.2s ease',
  },

  /* Cross-nav */
  crossNavGrid: {},
  crossNavCard: {
    display: 'flex',
    flexDirection: 'column',
    padding: 28,
    background: '#fff',
    border: '1px solid #DAE0E8',
    borderRadius: 16,
    textDecoration: 'none',
    transition: 'transform 0.25s ease, box-shadow 0.25s ease',
    height: '100%',
  },
  crossNavArrow: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 6,
    fontFamily: FONT_BODY,
    fontSize: 13,
    fontWeight: 600,
    color: PRIMARY,
    marginTop: 'auto',
  },
};
