import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Shirt,
  Warehouse,
  Store,
  Cpu,
  Package,
  ChevronDown,
  ArrowRight,
  UtensilsCrossed,
  Truck,
  Monitor,
  ShieldCheck,
  CreditCard,
  Wifi,
  BarChart3,
  Wrench,
  Clock,
  AlertTriangle,
} from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import {
  fadeUp,
  fadeDown,
  scaleIn,
  staggerContainer,
  staggerItem,
} from '../animation/variants';
import { springSnappy, springGentle } from '../animation/springs';
import Breadcrumbs from '../components/Breadcrumbs';
import SEOHead from '../components/SEOHead';

/* ── Data ── */
const PAIN_POINTS = [
  {
    icon: AlertTriangle,
    stat: '47%',
    label: 'of retail IT issues happen during peak hours',
    detail:
      'A POS outage during Black Friday or a holiday rush does not wait for a help desk ticket to be assigned.',
  },
  {
    icon: Clock,
    stat: '3.2 hrs',
    label: 'average downtime per incident with fragmented vendors',
    detail:
      'When your network provider, POS vendor, and cabling contractor all point fingers, your registers stay dark.',
  },
  {
    icon: CreditCard,
    stat: '$5,600',
    label: 'average cost of a single PCI compliance failure',
    detail:
      'Payment terminal firmware, network segmentation, encryption key rotation — miss one and the fines start.',
  },
];

const CAPABILITIES = [
  {
    icon: Store,
    title: 'POS Deployment & Support',
    desc: 'Shopify POS, Lightspeed, NCR, Oracle Retail, Revel — every terminal configured, mounted, and maintained.',
  },
  {
    icon: ShieldCheck,
    title: 'PCI Compliance Management',
    desc: 'Encryption key injection, firmware updates, network segmentation, and swap-out logistics for end-of-life hardware.',
  },
  {
    icon: Wifi,
    title: 'Network & Connectivity',
    desc: 'Guest Wi-Fi segmentation, structured cabling, ISP coordination, and firewall management across every location.',
  },
  {
    icon: BarChart3,
    title: 'Inventory & Back-Office Systems',
    desc: 'ERP integrations, barcode scanner deployment, receipt printer setup, and back-office workstation configuration.',
  },
  {
    icon: CreditCard,
    title: 'Payment Terminal Management',
    desc: 'End-to-end payment hardware lifecycle — procurement, configuration, PCI-compliant deployment, and ongoing maintenance.',
  },
  {
    icon: Wrench,
    title: 'Loss Prevention Technology',
    desc: 'IP camera systems, DVR/NVR infrastructure, EAS integrations, and segmented VLANs for security traffic.',
  },
];

const TIMELINE = [
  'Audit existing store technology standards and identify gaps',
  'Design network topology, POS placement, and loss-prevention camera layouts',
  'Procure registers, barcode scanners, receipt printers, and network hardware',
  'Coordinate with GCs on structured cabling, power drops, and security conduit',
  'Configure payment terminals, inventory software, and back-office workstations',
  'Execute full store acceptance testing: transactions, inventory sync, and reporting',
];

const CATEGORIES = [
  { icon: Shirt, label: 'Apparel' },
  { icon: Warehouse, label: 'Big Box' },
  { icon: Store, label: 'Boutique' },
  { icon: Cpu, label: 'Electronics' },
  { icon: Package, label: 'Wholesale' },
];

const CLIENT_NAMES = [
  "Lowe's",
  "Bloomingdale's",
  'NY & Company',
  'Roche Bobois',
  'Revlon',
  'Forman Mills',
  'Altitude',
  "Angela's",
  "Fred's",
];

const FAQ_DATA = [
  {
    q: 'Which POS and inventory systems do you support?',
    a: 'We support every major retail platform — Shopify POS, Lightspeed, Oracle Retail, NCR, Revel, and custom ERP integrations. Our technicians handle terminal deployment, peripheral configuration, and ongoing software support.',
  },
  {
    q: 'How do you handle payment terminal compliance?',
    a: 'We deploy and maintain PCI-compliant payment terminals across all your locations. That includes initial encryption key injection, firmware updates, network segmentation for cardholder data, and swap-out logistics when hardware reaches end of life.',
  },
  {
    q: 'Can you support loss prevention and security camera systems?',
    a: 'Yes. We install and manage IP camera systems, DVR/NVR infrastructure, and EAS (electronic article surveillance) integrations. All security traffic runs on a segmented VLAN to protect bandwidth and footage integrity.',
  },
  {
    q: 'What about seasonal scaling — holiday pop-ups and temporary locations?',
    a: 'We run temporary store buildouts on compressed timelines. Pop-up POS kiosks, temporary network connections, mobile payment solutions — we get you operational fast and decommission cleanly when the season ends.',
  },
  {
    q: 'Do you support multi-location rollouts across different states?',
    a: 'That is our specialty. We have a nationwide dispatch network and a proven playbook for replicating your store technology standard across any geography. One point of contact, consistent results, every location.',
  },
];

const DIFFERENTIATORS = [
  {
    title: 'One Vendor, Every Location',
    desc: 'Stop juggling five vendors per store. One point of contact for cabling, POS, network, security, and ongoing support — nationwide.',
  },
  {
    title: 'Retail-Hours Support',
    desc: 'Your stores are open nights, weekends, and holidays. So is our help desk. Escalation paths built for floor managers, not IT directors.',
  },
  {
    title: 'Standardization at Scale',
    desc: 'We create a technology playbook for your brand, then replicate it exactly across 5 locations or 500. Consistent experience, every store.',
  },
];

const SIBLING_SOLUTIONS = [
  {
    label: 'Hospitality',
    path: '/solutions/hospitality',
    icon: UtensilsCrossed,
    desc: 'POS, kitchen displays, and guest Wi-Fi for restaurants and hotels.',
  },
  {
    label: 'Nationwide Dispatching',
    path: '/solutions/nationwide-dispatching',
    icon: Truck,
    desc: 'On-demand technicians in any market, any timeline.',
  },
  {
    label: 'Office Tech Support',
    path: '/solutions/office-support',
    icon: Monitor,
    desc: 'Managed IT for corporate offices, conference rooms, and remote teams.',
  },
];

/* ── FAQ Accordion Item ── */
function FAQItem({ question, answer, isOpen, onToggle }) {
  return (
    <div
      style={{
        borderBottom: '1px solid var(--border)',
      }}
    >
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
export default function Retail() {
  const [painRef, painVis] = useScrollAnimation(0.15);
  const [capRef, capVis] = useScrollAnimation(0.15);
  const [buildRef, buildVis] = useScrollAnimation(0.15);
  const [catRef, catVis] = useScrollAnimation(0.2);
  const [trustRef, trustVis] = useScrollAnimation(0.2);
  const [diffRef, diffVis] = useScrollAnimation(0.2);
  const [faqRef, faqVis] = useScrollAnimation(0.15);
  const [pricingRef, pricingVis] = useScrollAnimation(0.2);
  const [navRef, navVis] = useScrollAnimation(0.2);

  const [openFaq, setOpenFaq] = useState(null);

  return (
    <>
      <SEOHead
        title="Retail IT Support — SpecGravity"
        description="Managed IT for retail brands. POS deployment, payment terminal compliance, loss prevention tech, inventory systems, and multi-location rollouts nationwide."
        path="/solutions/retail"
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
            maxWidth: 720,
            margin: '0 auto',
          }}
        >
          <motion.p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 13,
              fontWeight: 600,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'var(--accent)',
              marginBottom: 16,
            }}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
          >
            Retail IT Solutions
          </motion.p>
          <motion.h1
            className="display-xl"
            style={{
              fontFamily: "'Sora', sans-serif",
              fontWeight: 700,
              letterSpacing: '-0.02em',
              lineHeight: 1.1,
              marginBottom: 20,
            }}
            initial="hidden"
            animate="visible"
            variants={fadeDown}
          >
            Your Stores Stay Open.
            <br />
            Your Technology Should Too.
          </motion.h1>
          <motion.p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 18,
              fontWeight: 500,
              color: 'rgba(255,255,255,0.65)',
              lineHeight: 1.6,
              marginBottom: 36,
              maxWidth: 560,
            }}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
          >
            POS systems, payment terminals, network infrastructure, and loss
            prevention technology — managed across every location by one team.
          </motion.p>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={scaleIn}
          >
            <Link to="/contact" className="btn btn-primary-lg">
              Get a Free IT Assessment
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ════════ 2. PROBLEM AGITATION ════════ */}
      <section className="section" ref={painRef}>
        <div className="container">
          <motion.div
            className="section-header"
            initial="hidden"
            animate={painVis ? 'visible' : 'hidden'}
            variants={fadeUp}
          >
            <h2>The Real Cost of Fragmented Retail IT</h2>
            <p>
              Every vendor finger-pointing session is a register not ringing.
            </p>
          </motion.div>

          <motion.div
            className="grid-3"
            initial="hidden"
            animate={painVis ? 'visible' : 'hidden'}
            variants={staggerContainer}
          >
            {PAIN_POINTS.map(({ icon: Icon, stat, label, detail }) => (
              <motion.div key={label} variants={staggerItem}>
                <div
                  style={{
                    padding: 32,
                    borderRadius: 'var(--radius-lg)',
                    border: '1px solid var(--border)',
                    background: 'var(--card-bg)',
                    height: '100%',
                  }}
                >
                  <Icon
                    size={24}
                    color="var(--text-muted)"
                    strokeWidth={1.5}
                    style={{ marginBottom: 16 }}
                  />
                  <div
                    style={{
                      fontFamily: "'Sora', sans-serif",
                      fontSize: 32,
                      fontWeight: 700,
                      color: 'var(--text-primary)',
                      letterSpacing: '-0.02em',
                      lineHeight: 1,
                      marginBottom: 8,
                    }}
                  >
                    {stat}
                  </div>
                  <div
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: 15,
                      fontWeight: 600,
                      color: 'var(--text-primary)',
                      lineHeight: 1.4,
                      marginBottom: 12,
                    }}
                  >
                    {label}
                  </div>
                  <p
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: 14,
                      fontWeight: 500,
                      color: 'var(--text-muted)',
                      lineHeight: 1.6,
                    }}
                  >
                    {detail}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ════════ 3. CAPABILITIES — 2-Column Grid ════════ */}
      <section className="section section-alt" ref={capRef}>
        <div className="container">
          <motion.div
            className="section-header"
            initial="hidden"
            animate={capVis ? 'visible' : 'hidden'}
            variants={fadeUp}
          >
            <h2>Everything Your Stores Need. One Partner.</h2>
            <p>
              Remote and onsite support for every system in every location.
            </p>
          </motion.div>

          <motion.div
            className="retail-cap-grid"
            initial="hidden"
            animate={capVis ? 'visible' : 'hidden'}
            variants={staggerContainer}
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr',
              gap: 20,
              maxWidth: 900,
              margin: '0 auto',
            }}
          >
            {CAPABILITIES.map(({ icon: Icon, title, desc }) => (
              <motion.div key={title} variants={staggerItem}>
                <div
                  style={{
                    display: 'flex',
                    gap: 20,
                    alignItems: 'flex-start',
                    padding: 28,
                    borderRadius: 'var(--radius-lg)',
                    border: '1px solid var(--border)',
                    background: 'var(--card-bg)',
                  }}
                >
                  <div
                    style={{
                      flexShrink: 0,
                      width: 48,
                      height: 48,
                      borderRadius: 12,
                      background: 'var(--alt-bg)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Icon size={22} color="var(--primary)" strokeWidth={1.5} />
                  </div>
                  <div>
                    <div
                      style={{
                        fontFamily: "'Sora', sans-serif",
                        fontSize: 16,
                        fontWeight: 700,
                        color: 'var(--text-primary)',
                        letterSpacing: '-0.01em',
                        marginBottom: 6,
                      }}
                    >
                      {title}
                    </div>
                    <p
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: 14,
                        fontWeight: 500,
                        color: 'var(--text-muted)',
                        lineHeight: 1.6,
                      }}
                    >
                      {desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ════════ 4. NEW STORE BUILDOUT TIMELINE ════════ */}
      <section className="section" ref={buildRef}>
        <div className="container">
          <motion.div
            className="section-header"
            initial="hidden"
            animate={buildVis ? 'visible' : 'hidden'}
            variants={fadeDown}
          >
            <h2>New Store Openings, Handled</h2>
            <p>From blueprint to ribbon cutting — every technology detail managed.</p>
          </motion.div>

          <motion.div
            style={{
              position: 'relative',
              maxWidth: 640,
              margin: '0 auto',
            }}
            initial="hidden"
            animate={buildVis ? 'visible' : 'hidden'}
            variants={staggerContainer}
          >
            <div
              style={{
                position: 'absolute',
                left: 20,
                top: 0,
                bottom: 0,
                width: 2,
                background:
                  'linear-gradient(180deg, var(--primary) 0%, rgba(0,0,0,0.1) 100%)',
              }}
            />
            {TIMELINE.map((step, i) => (
              <motion.div
                key={i}
                style={{
                  position: 'relative',
                  display: 'flex',
                  gap: 24,
                  paddingBottom: i === TIMELINE.length - 1 ? 0 : 40,
                }}
                variants={staggerItem}
              >
                <div
                  style={{
                    flexShrink: 0,
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    background: 'var(--primary)',
                    color: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: "'Sora', sans-serif",
                    fontSize: 16,
                    fontWeight: 700,
                    position: 'relative',
                    zIndex: 1,
                  }}
                >
                  {i + 1}
                </div>
                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 16,
                    fontWeight: 500,
                    color: 'var(--text-primary)',
                    lineHeight: 1.6,
                    paddingTop: 8,
                  }}
                >
                  {step}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ════════ 5. RETAIL VERTICALS ════════ */}
      <section className="section section-alt" ref={catRef}>
        <div className="container">
          <motion.div
            className="section-header"
            initial="hidden"
            animate={catVis ? 'visible' : 'hidden'}
            variants={fadeUp}
          >
            <h2>Retail Verticals We Serve</h2>
            <p>Proven playbooks for every retail format.</p>
          </motion.div>

          <motion.div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: 16,
              maxWidth: 680,
              margin: '0 auto',
            }}
            initial="hidden"
            animate={catVis ? 'visible' : 'hidden'}
            variants={staggerContainer}
          >
            {CATEGORIES.map(({ icon: Icon, label }) => (
              <motion.div key={label} variants={staggerItem}>
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 10,
                    padding: '12px 24px',
                    borderRadius: 'var(--radius-pill)',
                    border: '1px solid var(--border)',
                    background: 'var(--card-bg)',
                  }}
                >
                  <Icon size={18} color="var(--primary)" strokeWidth={1.5} />
                  <span
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: 14,
                      fontWeight: 600,
                      color: 'var(--text-primary)',
                    }}
                  >
                    {label}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ════════ 6. TRUST BAR — Client Names ════════ */}
      <section className="section" ref={trustRef}>
        <div className="container">
          <motion.div
            initial="hidden"
            animate={trustVis ? 'visible' : 'hidden'}
            variants={fadeUp}
            style={{ textAlign: 'center' }}
          >
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 13,
                fontWeight: 600,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'var(--text-muted)',
                marginBottom: 32,
              }}
            >
              Trusted by Leading Retail Brands
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            animate={trustVis ? 'visible' : 'hidden'}
            variants={staggerContainer}
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: 12,
              maxWidth: 800,
              margin: '0 auto',
            }}
          >
            {CLIENT_NAMES.map((name) => (
              <motion.div
                key={name}
                variants={staggerItem}
                style={{
                  padding: '14px 32px',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border)',
                  background: 'var(--card-bg)',
                  fontFamily: "'Sora', sans-serif",
                  fontSize: 15,
                  fontWeight: 600,
                  color: 'var(--text-primary)',
                  whiteSpace: 'nowrap',
                  letterSpacing: '-0.01em',
                }}
              >
                {name}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ════════ 7. DIFFERENTIATORS ════════ */}
      <section className="section section-alt" ref={diffRef}>
        <div className="container">
          <motion.div
            className="section-header"
            initial="hidden"
            animate={diffVis ? 'visible' : 'hidden'}
            variants={fadeUp}
          >
            <h2>Why Retail Brands Choose Us</h2>
          </motion.div>

          <motion.div
            className="grid-3"
            initial="hidden"
            animate={diffVis ? 'visible' : 'hidden'}
            variants={staggerContainer}
          >
            {DIFFERENTIATORS.map(({ title, desc }) => (
              <motion.div key={title} variants={staggerItem}>
                <div
                  style={{
                    padding: 32,
                    borderRadius: 'var(--radius-lg)',
                    border: '1px solid var(--border)',
                    background: 'var(--card-bg)',
                    height: '100%',
                  }}
                >
                  <h3
                    style={{
                      fontFamily: "'Sora', sans-serif",
                      fontSize: 18,
                      fontWeight: 700,
                      color: 'var(--text-primary)',
                      letterSpacing: '-0.02em',
                      marginBottom: 12,
                      lineHeight: 1.2,
                    }}
                  >
                    {title}
                  </h3>
                  <p
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: 14,
                      fontWeight: 500,
                      color: 'var(--text-muted)',
                      lineHeight: 1.6,
                    }}
                  >
                    {desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ════════ 8. FAQ ════════ */}
      <section className="section" ref={faqRef}>
        <div className="container">
          <motion.div
            className="section-header"
            initial="hidden"
            animate={faqVis ? 'visible' : 'hidden'}
            variants={fadeUp}
          >
            <h2>Frequently Asked Questions</h2>
            <p>What retail operators ask before partnering with us.</p>
          </motion.div>

          <motion.div
            style={{ maxWidth: 720, margin: '0 auto' }}
            initial="hidden"
            animate={faqVis ? 'visible' : 'hidden'}
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

      {/* ════════ 9. PRICING SIGNAL ════════ */}
      <section className="section section-alt" ref={pricingRef}>
        <div className="container" style={{ textAlign: 'center' }}>
          <motion.div
            initial="hidden"
            animate={pricingVis ? 'visible' : 'hidden'}
            variants={scaleIn}
            style={{
              maxWidth: 600,
              margin: '0 auto',
            }}
          >
            <h2 style={{ marginBottom: 16 }}>
              Priced for Your Store Count, Not a Template
            </h2>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 16,
                fontWeight: 500,
                color: 'var(--text-muted)',
                lineHeight: 1.6,
                marginBottom: 32,
              }}
            >
              Whether you operate 5 boutiques or 500 big-box locations, we
              structure support around your store count, technology stack, and
              seasonal peaks.
            </p>
            <Link to="/contact" className="btn btn-primary-lg">
              Get a Free IT Assessment
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ════════ 10. CTA ════════ */}
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
            style={{
              fontFamily: "'Sora', sans-serif",
              fontWeight: 700,
              letterSpacing: '-0.02em',
              lineHeight: 1.1,
              color: '#fff',
              marginBottom: 16,
            }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={fadeUp}
          >
            Ready to Modernize Your Retail IT?
          </motion.h2>
          <motion.p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 16,
              fontWeight: 500,
              color: 'rgba(255,255,255,0.55)',
              lineHeight: 1.6,
              maxWidth: 480,
              margin: '0 auto 32px',
            }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={fadeUp}
          >
            One conversation. No obligation. We will map your current technology
            and show you exactly where we can help.
          </motion.p>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={scaleIn}
          >
            <Link to="/contact" className="btn btn-primary-lg">
              Get a Free IT Assessment
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ════════ 11. CROSS-NAVIGATION ════════ */}
      <section className="section" ref={navRef} style={{ background: 'var(--card-bg)' }}>
        <div className="container">
          <motion.div
            className="section-header"
            initial="hidden"
            animate={navVis ? 'visible' : 'hidden'}
            variants={fadeUp}
          >
            <h2>Explore Other Solutions</h2>
          </motion.div>

          <motion.div
            className="grid-3"
            initial="hidden"
            animate={navVis ? 'visible' : 'hidden'}
            variants={staggerContainer}
          >
            {SIBLING_SOLUTIONS.map(({ label, path, icon: Icon, desc }) => (
              <motion.div key={path} variants={staggerItem}>
                <Link
                  to={path}
                  className="card"
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 12,
                    textDecoration: 'none',
                    padding: 28,
                    height: '100%',
                  }}
                >
                  <Icon size={24} color="var(--primary)" strokeWidth={1.5} />
                  <span
                    style={{
                      fontFamily: "'Sora', sans-serif",
                      fontSize: 16,
                      fontWeight: 700,
                      color: 'var(--text-primary)',
                      letterSpacing: '-0.01em',
                    }}
                  >
                    {label}
                  </span>
                  <p
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: 14,
                      fontWeight: 500,
                      color: 'var(--text-muted)',
                      lineHeight: 1.5,
                    }}
                  >
                    {desc}
                  </p>
                  <ArrowRight
                    size={16}
                    color="var(--text-muted)"
                    strokeWidth={2}
                    style={{ marginTop: 'auto' }}
                  />
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Responsive overrides ── */}
      <style>{`
        @media (min-width: 768px) {
          .retail-cap-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
      `}</style>
    </>
  );
}
