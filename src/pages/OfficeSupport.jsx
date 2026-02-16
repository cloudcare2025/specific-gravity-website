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
  AlertTriangle,
  UtensilsCrossed,
  Store,
  Truck,
  Users,
} from 'lucide-react';
import {
  fadeUp,
  fadeDown,
  fadeLeft,
  fadeRight,
  scaleIn,
  staggerContainer,
  staggerItem,
} from '../animation/variants';
import { springGentle, springSnappy } from '../animation/springs';
import Breadcrumbs from '../components/Breadcrumbs';
import SEOHead from '../components/SEOHead';
import CardTilt from '../components/CardTilt';

/* ── Data ── */
const PAIN_POINTS = [
  'Your team submits tickets into a void and waits days for a response',
  'Every invoice is a surprise — per-ticket billing with no ceiling',
  'Onsite issues require calling three vendors before someone shows up',
  'No one owns the full picture: network, endpoints, cloud, and security are siloed',
];

const FEATURES = [
  { icon: Clock, title: '24/7/365 Availability', desc: 'Round-the-clock support that never takes a day off. Nights, weekends, holidays — we answer.' },
  { icon: DollarSign, title: 'Unlimited Support, Flat Rate', desc: 'One predictable cost per machine per month. No surprise invoices, no per-ticket fees.' },
  { icon: MapPin, title: 'US-Based Technicians', desc: 'Local support teams across New York, New Jersey, and Pennsylvania for onsite needs.' },
  { icon: MessageCircle, title: 'Call, Text, Chat, Email', desc: 'Reach us however your team prefers. Every channel connects to the same expert team.' },
  { icon: Plug, title: 'Standalone or Integrated', desc: 'Works as your complete IT department or plugs seamlessly into your existing infrastructure.' },
  { icon: Eye, title: 'Proactive Monitoring', desc: 'We catch issues before your team does. Automated alerts and real-time system health dashboards.' },
  { icon: Monitor, title: 'Workstations & Laptops', desc: 'Setup, imaging, troubleshooting, and lifecycle management for every endpoint.' },
  { icon: Wifi, title: 'Network & Connectivity', desc: 'Router, switch, and access point management. Wi-Fi optimization, VPN configuration, and ISP liaison.' },
  { icon: ShieldCheck, title: 'Security & Compliance', desc: 'Antivirus deployment, patch management, firewall rules, and compliance reporting.' },
  { icon: Server, title: 'Server & Cloud', desc: 'On-premise server monitoring, cloud workspace administration (M365, Google Workspace), and backup verification.' },
  { icon: Headphones, title: 'Help Desk (Tier 1–3)', desc: 'Dedicated queue for your team with average first-response under 8 minutes.' },
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
    a: 'Our help desk handles everything from password resets and email issues to printer connectivity, software installations, VPN troubleshooting, and multi-monitor setups. Tier 1–3 support is included — no issue is too small or too complex.',
  },
  {
    q: 'Can you support remote and hybrid employees?',
    a: 'Absolutely. We provide the same level of support whether your team is in the office, at home, or on the road. Remote desktop tools, VPN management, and cloud-based ticketing ensure seamless coverage regardless of location.',
  },
  {
    q: 'Do you handle onsite visits for hardware issues?',
    a: 'Yes. Our US-based field technicians cover the tri-state area (NY, NJ, PA) for any issue that cannot be resolved remotely — hardware swaps, network rack work, cabling, and conference room A/V setups.',
  },
  {
    q: 'Can you procure hardware and manage licenses for us?',
    a: 'We handle end-to-end procurement: laptops, monitors, docking stations, networking gear, and peripherals. We also manage software licensing for Microsoft 365, Google Workspace, Adobe, and any line-of-business applications your team uses.',
  },
  {
    q: 'How do you handle network management and security?',
    a: 'We manage your entire network stack — firewalls, switches, access points, and ISP relationships. Security includes endpoint protection, patch management, DNS filtering, and compliance reporting aligned to your industry requirements.',
  },
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

const SIBLING_SOLUTIONS = [
  { label: 'Hospitality', path: '/solutions/hospitality', icon: UtensilsCrossed },
  { label: 'Retail', path: '/solutions/retail', icon: Store },
  { label: 'Nationwide Dispatching', path: '/solutions/nationwide-dispatching', icon: Truck },
  { label: 'Dedicated Resources', path: '/solutions/dedicated-resources', icon: Users },
];

/* ── FAQ Accordion Item ── */
function FAQItem({ question, answer, isOpen, onToggle }) {
  return (
    <div style={{ borderBottom: '1px solid var(--border)' }}>
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          padding: '24px 0',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          textAlign: 'left',
          fontFamily: "'Inter', sans-serif",
          fontSize: 17,
          fontWeight: 600,
          color: 'var(--text-primary)',
          lineHeight: 1.4,
          gap: 16,
        }}
      >
        {question}
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={springSnappy}
          style={{ flexShrink: 0 }}
        >
          <ChevronDown size={20} />
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
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 15,
                fontWeight: 500,
                color: 'var(--text-muted)',
                lineHeight: 1.7,
                paddingBottom: 24,
                maxWidth: 680,
              }}
            >
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── Component ── */
export default function OfficeSupport() {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <>
      <SEOHead
        title="Office IT Support — SpecGravity"
        description="Flat-rate, unlimited IT support for your brand's headquarters and corporate team. 24/7 help desk, proactive monitoring, procurement, and onsite technicians."
        path="/solutions/office-support"
      />

      {/* ════════ BREADCRUMBS ════════ */}
      <div
        className="dot-pattern"
        style={{
          background: 'var(--dark-hero)',
          padding: '20px 0 0',
        }}
      >
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ color: 'rgba(255,255,255,0.5)' }}>
            <Breadcrumbs />
          </div>
        </div>
      </div>

      {/* ════════ 1. HERO ════════ */}
      <section
        className="dot-pattern"
        style={{
          background: 'var(--dark-hero)',
          color: '#fff',
          padding: '64px 0 100px',
          overflow: 'hidden',
        }}
      >
        <div
          className="container"
          style={{
            position: 'relative',
            zIndex: 1,
            textAlign: 'center',
            maxWidth: 900,
            margin: '0 auto',
          }}
        >
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.h1
              className="display-xl"
              variants={fadeDown}
              style={{ color: '#fff', marginBottom: 24 }}
            >
              Flat-Rate IT for Your{' '}
              <span className="gradient-text">Headquarters</span>
            </motion.h1>

            <motion.p
              className="body-large"
              variants={fadeUp}
              style={{
                color: 'rgba(255,255,255,0.7)',
                maxWidth: 640,
                margin: '0 auto 32px',
                lineHeight: 1.6,
              }}
            >
              Unlimited support for your corporate team. One partner.
              Every device. Zero surprises.
            </motion.p>

            <motion.div variants={scaleIn}>
              <Link to="/contact" className="btn btn-primary-lg">
                Get a Custom Quote
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ════════ 2. PROBLEM AGITATION ════════ */}
      <section className="section">
        <div className="container">
          <div style={{ maxWidth: 720, margin: '0 auto' }}>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeRight}
            >
              <h2 style={{ marginBottom: 28 }}>
                Office IT Shouldn't Feel Like This
              </h2>
            </motion.div>
            <motion.div
              style={{ display: 'flex', flexDirection: 'column', gap: 20 }}
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              {PAIN_POINTS.map((pt, i) => (
                <motion.div
                  key={i}
                  style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}
                  variants={staggerItem}
                >
                  <AlertTriangle
                    size={22}
                    style={{ flexShrink: 0, color: 'var(--text-muted)', marginTop: 2 }}
                  />
                  <span
                    style={{
                      fontSize: 16,
                      fontWeight: 500,
                      color: 'var(--text-primary)',
                      lineHeight: 1.6,
                    }}
                  >
                    {pt}
                  </span>
                </motion.div>
              ))}
            </motion.div>
            <motion.p
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              style={{
                color: 'var(--text-muted)',
                fontSize: 15,
                lineHeight: 1.6,
                marginTop: 28,
              }}
            >
              We replace that chaos with a single, flat-rate partnership that covers every
              device, every user, every day.
            </motion.p>
          </div>
        </div>
      </section>

      {/* ════════ 3. COMPLETE OFFICE IT — merged features + scope ════════ */}
      <section className="section section-alt">
        <div className="container">
          <div className="section-header">
            <motion.h2
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeDown}
            >
              Everything Your Office Needs
            </motion.h2>
            <motion.p
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
            >
              From endpoints to infrastructure, every layer of your
              office technology is covered
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
            {FEATURES.map((feat) => (
              <CardTilt key={feat.title} maxTilt={5}>
                <motion.div
                  variants={staggerItem}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 14,
                    background: 'var(--card-bg)',
                    border: '1px solid var(--border)',
                    borderRadius: 16,
                    padding: 32,
                  }}
                >
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: '50%',
                      background: 'var(--primary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <feat.icon size={22} color="#fff" strokeWidth={2} />
                  </div>
                  <h4 style={{ fontWeight: 700, fontSize: 17 }}>
                    {feat.title}
                  </h4>
                  <p
                    style={{
                      color: 'var(--text-muted)',
                      fontSize: 14,
                      lineHeight: 1.65,
                    }}
                  >
                    {feat.desc}
                  </p>
                </motion.div>
              </CardTilt>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ════════ 4. HOW IT WORKS ════════ */}
      <section className="section" style={{ background: 'var(--card-bg)' }}>
        <div className="container">
          <div className="section-header">
            <motion.h2
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={scaleIn}
            >
              How It Works
            </motion.h2>
            <motion.p
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
            >
              Four steps from first call to fully managed office
            </motion.p>
          </div>

          <motion.div
            className="os-steps-grid"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={staggerContainer}
          >
            {HOW_IT_WORKS.map((step, i) => (
              <motion.div
                key={step.num}
                variants={i % 2 === 0 ? fadeLeft : fadeRight}
                style={{
                  background: 'var(--card-bg)',
                  border: '1px solid var(--border)',
                  borderRadius: 16,
                  padding: 32,
                }}
              >
                <span
                  style={{
                    fontSize: 48,
                    fontWeight: 700,
                    color: 'rgba(0,0,0,0.06)',
                    lineHeight: 1,
                    letterSpacing: '-0.02em',
                    display: 'block',
                    marginBottom: 12,
                  }}
                >
                  {step.num}
                </span>
                <h4
                  style={{
                    fontWeight: 700,
                    fontSize: 18,
                    color: 'var(--text-primary)',
                    marginBottom: 8,
                  }}
                >
                  {step.title}
                </h4>
                <p
                  style={{
                    fontSize: 15,
                    lineHeight: 1.65,
                    color: 'var(--text-muted)',
                  }}
                >
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ════════ 5. PRICING TIERS ════════ */}
      <section
        className="section dot-pattern"
        style={{
          background: 'var(--dark-hero)',
          color: '#fff',
        }}
      >
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="section-header" style={{ marginBottom: 48 }}>
            <motion.h2
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeDown}
              style={{ color: '#fff' }}
            >
              Flexible Support Tiers
            </motion.h2>
            <motion.p
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              style={{ color: 'rgba(255,255,255,0.6)' }}
            >
              Transparent pricing. No contracts. Scale up or down as
              your team changes.
            </motion.p>
          </div>

          <motion.div
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
                  background: tier.highlighted
                    ? 'var(--primary)'
                    : 'var(--card-bg)',
                  border: tier.highlighted
                    ? '1px solid var(--primary-hover)'
                    : '1px solid var(--border)',
                  borderRadius: 20,
                  padding: '36px 28px',
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column',
                  ...(tier.highlighted
                    ? { boxShadow: '0 0 40px rgba(255,255,255,0.08)' }
                    : {}),
                }}
              >
                {tier.highlighted && (
                  <span
                    style={{
                      position: 'absolute',
                      top: -12,
                      left: '50%',
                      transform: 'translateX(-50%)',
                      background: 'var(--card-bg)',
                      color: 'var(--primary)',
                      fontSize: 12,
                      fontWeight: 700,
                      padding: '4px 16px',
                      borderRadius: 'var(--radius-pill)',
                      whiteSpace: 'nowrap',
                      letterSpacing: '0.02em',
                      textTransform: 'uppercase',
                    }}
                  >
                    Most Popular
                  </span>
                )}
                <h3
                  style={{
                    fontWeight: 700,
                    fontSize: 22,
                    color: tier.highlighted
                      ? '#fff'
                      : 'var(--text-primary)',
                    marginBottom: 8,
                  }}
                >
                  {tier.name}
                </h3>
                <div style={{ marginBottom: 24 }}>
                  <span
                    style={{
                      fontWeight: 700,
                      fontSize: 36,
                      color: tier.highlighted
                        ? '#fff'
                        : 'var(--text-primary)',
                      letterSpacing: '-0.02em',
                    }}
                  >
                    {tier.price}
                  </span>
                  {tier.unit && (
                    <span
                      style={{
                        fontSize: 14,
                        color: tier.highlighted
                          ? 'rgba(255,255,255,0.6)'
                          : 'var(--text-muted)',
                        marginLeft: 4,
                      }}
                    >
                      {tier.unit}
                    </span>
                  )}
                </div>
                <ul
                  style={{
                    listStyle: 'none',
                    padding: 0,
                    margin: '0 0 28px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 12,
                  }}
                >
                  {tier.features.map((f) => (
                    <li
                      key={f}
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: 10,
                        fontSize: 14,
                        lineHeight: 1.5,
                        color: tier.highlighted
                          ? 'rgba(255,255,255,0.85)'
                          : 'var(--secondary)',
                      }}
                    >
                      <CheckCircle
                        size={16}
                        color={tier.highlighted ? '#fff' : 'var(--primary)'}
                        strokeWidth={2.5}
                        style={{ flexShrink: 0, marginTop: 2 }}
                      />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  to="/contact"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 8,
                    width: '100%',
                    height: 48,
                    fontSize: 14,
                    fontWeight: 600,
                    borderRadius: 'var(--radius-pill)',
                    border: tier.highlighted
                      ? '2px solid #fff'
                      : '2px solid var(--primary)',
                    background: 'transparent',
                    color: tier.highlighted ? '#fff' : 'var(--primary)',
                    textDecoration: 'none',
                    transition: 'all 0.2s ease',
                    marginTop: 'auto',
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

      {/* ════════ 6. FAQ ════════ */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <motion.h2
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={scaleIn}
            >
              Frequently Asked Questions
            </motion.h2>
            <motion.p
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
            >
              Common questions from office IT leaders
            </motion.p>
          </div>

          <motion.div
            style={{ maxWidth: 720, margin: '0 auto' }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
          >
            {FAQ_DATA.map((item, i) => (
              <motion.div key={i} variants={staggerItem}>
                <FAQItem
                  question={item.q}
                  answer={item.a}
                  isOpen={openFaq === i}
                  onToggle={() => setOpenFaq(openFaq === i ? null : i)}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ════════ 7. CTA ════════ */}
      <section
        className="section dot-pattern"
        style={{
          background: 'var(--dark-hero)',
          color: '#fff',
        }}
      >
        <div
          className="container"
          style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}
        >
          <motion.h2
            className="display-lg"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeDown}
            style={{ color: '#fff', marginBottom: 20 }}
          >
            Simplify Your{' '}
            <span className="gradient-text">Office IT</span>
          </motion.h2>
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
            style={{
              color: 'rgba(255,255,255,0.7)',
              fontSize: 18,
              maxWidth: 560,
              margin: '0 auto 36px',
              lineHeight: 1.6,
            }}
          >
            One flat rate. Unlimited support. Zero headaches.
          </motion.p>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={scaleIn}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 16,
            }}
          >
            <Link to="/contact" className="btn btn-primary-lg">
              Get a Custom Quote
            </Link>
            <a
              href="tel:8447004728"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                fontSize: 14,
                fontWeight: 500,
                color: 'rgba(255,255,255,0.7)',
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.15)',
                backdropFilter: 'blur(10px)',
                borderRadius: 'var(--radius-pill)',
                padding: '10px 24px',
                textDecoration: 'none',
                transition: 'border-color 0.2s ease, color 0.2s ease',
              }}
            >
              <Phone size={16} />
              Or call us: 844-700-GRAV
            </a>
          </motion.div>
        </div>
      </section>

      {/* ════════ 8. CROSS-NAVIGATION ════════ */}
      <section className="section" style={{ background: 'var(--card-bg)' }}>
        <div className="container">
          <motion.div
            className="section-header"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <h2>Explore Other Solutions</h2>
          </motion.div>

          <motion.div
            className="grid-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={staggerContainer}
          >
            {SIBLING_SOLUTIONS.map(({ label, path, icon: Icon }) => (
              <motion.div key={path} variants={staggerItem}>
                <Link
                  to={path}
                  className="card"
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 12,
                    textAlign: 'center',
                    textDecoration: 'none',
                    padding: 28,
                  }}
                >
                  <Icon size={28} color="var(--primary)" strokeWidth={1.5} />
                  <span
                    style={{
                      fontSize: 15,
                      fontWeight: 600,
                      color: 'var(--text-primary)',
                    }}
                  >
                    {label}
                  </span>
                  <ArrowRight
                    size={16}
                    color="var(--text-muted)"
                    strokeWidth={2}
                  />
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Responsive overrides ── */}
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
      `}</style>
    </>
  );
}
