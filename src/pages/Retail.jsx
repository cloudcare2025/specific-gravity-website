import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronDown,
  ArrowRight,
  UtensilsCrossed,
  Truck,
  Monitor,
  Users,
  ShieldCheck,
  CreditCard,
  Wifi,
  BarChart3,
  Wrench,
  Store,
  AlertTriangle,
  Clock,
  CheckCircle,
  Zap,
} from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import {
  fadeUp,
  fadeDown,
  fadeLeft,
  scaleIn,
  staggerContainer,
  staggerItem,
} from '../animation/variants';
import { springSnappy, springGentle } from '../animation/springs';
import Breadcrumbs from '../components/Breadcrumbs';
import SEOHead from '../components/SEOHead';
import CardTilt from '../components/CardTilt';
import MagneticButton from '../components/MagneticButton';
import GlowOrb from '../components/GlowOrb';

/* ── Data ── */

const PAIN_POINTS = [
  {
    icon: AlertTriangle,
    stat: '47%',
    label: 'of retail IT issues strike during peak hours',
    desc: 'A POS outage during Black Friday does not wait for a help desk ticket to be assigned. Your registers go dark. Revenue walks out the door.',
  },
  {
    icon: Clock,
    stat: '3.2 hrs',
    label: 'average downtime with fragmented vendors',
    desc: 'Your network provider, POS vendor, and cabling contractor all point fingers. Meanwhile, every register in the store is offline.',
  },
  {
    icon: CreditCard,
    stat: '$5,600',
    label: 'average cost per PCI compliance failure',
    desc: 'Payment terminal firmware, network segmentation, encryption key rotation — miss one and the fines start. Then the audit gets worse.',
  },
];

const CAPABILITIES = [
  {
    icon: Store,
    title: 'POS Deployment & Support',
    desc: 'Shopify POS, Lightspeed, NCR, Oracle Retail, Revel — every terminal configured, mounted, and maintained across all locations.',
  },
  {
    icon: ShieldCheck,
    title: 'PCI Compliance Management',
    desc: 'Encryption key injection, firmware updates, network segmentation, and swap-out logistics for end-of-life hardware.',
  },
  {
    icon: Wifi,
    title: 'Network & Connectivity',
    desc: 'Guest Wi-Fi segmentation, structured cabling, ISP coordination, and firewall management for every storefront.',
  },
  {
    icon: BarChart3,
    title: 'Inventory & Back-Office Systems',
    desc: 'ERP integrations, barcode scanner deployment, receipt printer setup, and back-office workstation configuration.',
  },
  {
    icon: CreditCard,
    title: 'Payment Terminal Lifecycle',
    desc: 'End-to-end payment hardware — procurement, configuration, PCI-compliant deployment, and ongoing maintenance.',
  },
  {
    icon: Wrench,
    title: 'Loss Prevention Technology',
    desc: 'IP camera systems, DVR/NVR infrastructure, EAS integrations, and segmented VLANs for security traffic.',
  },
];

const PROCESS_STEPS = [
  { step: 'Audit', desc: 'Assess existing store technology standards and identify gaps across all locations' },
  { step: 'Design', desc: 'Architect network topology, POS placement, and loss-prevention camera layouts' },
  { step: 'Procure', desc: 'Source and pre-configure registers, scanners, receipt printers, and network hardware' },
  { step: 'Coordinate', desc: 'Work with GCs on structured cabling, power drops, and security conduit' },
  { step: 'Deploy', desc: 'Configure payment terminals, inventory software, and back-office workstations' },
  { step: 'Validate', desc: 'Full store acceptance testing — transactions, inventory sync, and reporting verified' },
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

const STATS = [
  { value: '1,200+', label: 'Retail locations supported' },
  { value: '24/7', label: 'Help desk coverage' },
  { value: '<20 min', label: 'Average response time' },
  { value: '99.8%', label: 'POS uptime across clients' },
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
    a: 'Yes. We install and manage IP camera systems, DVR/NVR infrastructure, and EAS integrations. All security traffic runs on a segmented VLAN to protect bandwidth and footage integrity.',
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
    desc: 'On-site technicians dispatched anywhere in the country.',
  },
  {
    label: 'Office Tech Support',
    path: '/solutions/office-support',
    icon: Monitor,
    desc: 'Help desk, network, and endpoint management for offices.',
  },
  {
    label: 'Dedicated Resources',
    path: '/solutions/dedicated-resources',
    icon: Users,
    desc: 'Embedded technicians placed full-time at your facilities.',
  },
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
  const [processRef, processVis] = useScrollAnimation(0.15);
  const [proofRef, proofVis] = useScrollAnimation(0.2);
  const [faqRef, faqVis] = useScrollAnimation(0.15);
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
          style={{ position: 'relative', zIndex: 1 }}
        >
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeLeft}
            style={{ maxWidth: 700 }}
          >
            <p
              style={{
                fontSize: 14,
                fontWeight: 600,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'var(--accent)',
                marginBottom: 16,
              }}
            >
              Retail IT Solutions
            </p>
            <h1
              className="display-xl"
              style={{
                color: '#fff',
                fontWeight: 700,
                letterSpacing: '-0.02em',
                lineHeight: 1.08,
                marginBottom: 24,
              }}
            >
              Your Stores Stay Open.
              <br />
              <span className="gradient-text">Your Technology Should Too.</span>
            </h1>
            <p
              style={{
                fontSize: 18,
                fontWeight: 500,
                color: 'rgba(255,255,255,0.6)',
                lineHeight: 1.65,
                marginBottom: 40,
                maxWidth: 560,
              }}
            >
              POS systems, payment terminals, network infrastructure, and loss
              prevention technology — managed across every location by one team
              that knows retail.
            </p>
            <MagneticButton>
              <Link to="/contact" className="btn btn-primary-lg">
                Get a Free IT Assessment
                <ArrowRight size={18} strokeWidth={2} />
              </Link>
            </MagneticButton>
          </motion.div>
        </div>
      </section>

      {/* ════════ 2. PAIN AGITATION ════════ */}
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
            {PAIN_POINTS.map(({ icon: Icon, stat, label, desc }) => (
              <motion.div key={label} variants={staggerItem}>
                <CardTilt>
                  <div
                    style={{
                      padding: 32,
                      borderRadius: 'var(--radius-lg)',
                      border: '1px solid var(--border)',
                      background: 'var(--card-bg)',
                      height: '100%',
                    }}
                  >
                    <div
                      style={{
                        width: 48,
                        height: 48,
                        borderRadius: 'var(--radius-md)',
                        background: 'var(--alt-bg)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: 20,
                      }}
                    >
                      <Icon size={24} color="var(--accent)" strokeWidth={1.5} />
                    </div>
                    <div
                      style={{
                        fontSize: 36,
                        fontWeight: 800,
                        color: 'var(--text-primary)',
                        letterSpacing: '-0.03em',
                        lineHeight: 1,
                        marginBottom: 8,
                      }}
                    >
                      {stat}
                    </div>
                    <div
                      style={{
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
                        fontSize: 14,
                        fontWeight: 500,
                        color: 'var(--text-muted)',
                        lineHeight: 1.65,
                      }}
                    >
                      {desc}
                    </p>
                  </div>
                </CardTilt>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ════════ 3. SOLUTION — Capabilities + Differentiators ════════ */}
      <section className="section section-alt" ref={capRef}>
        <div className="container">
          <motion.div
            className="section-header"
            initial="hidden"
            animate={capVis ? 'visible' : 'hidden'}
            variants={fadeUp}
          >
            <h2>One Partner. Every Store. All Your Technology.</h2>
            <p>
              Stop juggling five vendors per location. Remote and onsite support
              for every system in every store.
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
              gap: 16,
              maxWidth: 900,
              margin: '0 auto 56px',
            }}
          >
            {CAPABILITIES.map(({ icon: Icon, title, desc }) => (
              <motion.div key={title} variants={staggerItem}>
                <div
                  style={{
                    display: 'flex',
                    gap: 20,
                    alignItems: 'flex-start',
                    padding: 24,
                    borderRadius: 'var(--radius-lg)',
                    border: '1px solid var(--border)',
                    background: 'var(--card-bg)',
                  }}
                >
                  <div
                    style={{
                      flexShrink: 0,
                      width: 44,
                      height: 44,
                      borderRadius: 'var(--radius-md)',
                      background: 'var(--accent-light)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Icon size={20} color="var(--accent)" strokeWidth={1.5} />
                  </div>
                  <div>
                    <div
                      style={{
                        fontSize: 16,
                        fontWeight: 700,
                        color: 'var(--text-primary)',
                        letterSpacing: '-0.01em',
                        marginBottom: 4,
                      }}
                    >
                      {title}
                    </div>
                    <p
                      style={{
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

          {/* Differentiators — inline with capabilities section */}
          <motion.div
            initial="hidden"
            animate={capVis ? 'visible' : 'hidden'}
            variants={staggerContainer}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 16,
              maxWidth: 640,
              margin: '0 auto',
            }}
          >
            {[
              'Retail-hours support — nights, weekends, and holidays included',
              'Standardized technology playbooks replicated across 5 or 500 stores',
              'No required hardware purchases — we work with your existing stack',
              'Seasonal scaling for holiday pop-ups and temporary locations',
            ].map((pt, i) => (
              <motion.div
                key={i}
                style={{
                  display: 'flex',
                  gap: 14,
                  alignItems: 'flex-start',
                }}
                variants={staggerItem}
              >
                <CheckCircle
                  size={20}
                  style={{ flexShrink: 0, color: 'var(--accent)', marginTop: 2 }}
                />
                <span
                  style={{
                    fontSize: 15,
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
        </div>
      </section>

      {/* ════════ 4. PROCESS — New Store Buildout Timeline ════════ */}
      <section className="section" ref={processRef}>
        <div className="container">
          <motion.div
            className="section-header"
            initial="hidden"
            animate={processVis ? 'visible' : 'hidden'}
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
            animate={processVis ? 'visible' : 'hidden'}
            variants={staggerContainer}
          >
            <div
              style={{
                position: 'absolute',
                left: 20,
                top: 0,
                bottom: 0,
                width: 2,
                background: 'linear-gradient(180deg, var(--accent) 0%, var(--border) 100%)',
              }}
            />
            {PROCESS_STEPS.map(({ step, desc }, i) => (
              <motion.div
                key={i}
                style={{
                  position: 'relative',
                  display: 'flex',
                  gap: 24,
                  paddingBottom: i === PROCESS_STEPS.length - 1 ? 0 : 40,
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
                    fontSize: 14,
                    fontWeight: 700,
                    position: 'relative',
                    zIndex: 1,
                  }}
                >
                  {i + 1}
                </div>
                <div style={{ paddingTop: 4 }}>
                  <span
                    style={{
                      display: 'block',
                      fontSize: 14,
                      fontWeight: 700,
                      letterSpacing: '0.04em',
                      textTransform: 'uppercase',
                      color: 'var(--text-primary)',
                      marginBottom: 4,
                    }}
                  >
                    {step}
                  </span>
                  <p
                    style={{
                      fontSize: 15,
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

      {/* ════════ 5. SOCIAL PROOF — Stats + Client Names ════════ */}
      <section className="section section-alt" ref={proofRef}>
        <div className="container">
          <motion.div
            className="section-header"
            initial="hidden"
            animate={proofVis ? 'visible' : 'hidden'}
            variants={fadeUp}
          >
            <h2>Trusted by Leading Retail Brands</h2>
          </motion.div>

          {/* Stats row */}
          <motion.div
            className="retail-stats-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: 24,
              maxWidth: 720,
              margin: '0 auto 56px',
            }}
            initial="hidden"
            animate={proofVis ? 'visible' : 'hidden'}
            variants={staggerContainer}
          >
            {STATS.map(({ value, label }) => (
              <motion.div
                key={label}
                variants={staggerItem}
                style={{ textAlign: 'center' }}
              >
                <div
                  style={{
                    fontSize: 36,
                    fontWeight: 800,
                    letterSpacing: '-0.03em',
                    color: 'var(--text-primary)',
                    lineHeight: 1,
                    marginBottom: 6,
                  }}
                >
                  {value}
                </div>
                <div
                  style={{
                    fontSize: 14,
                    fontWeight: 500,
                    color: 'var(--text-muted)',
                  }}
                >
                  {label}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Client names */}
          <motion.div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: 12,
              maxWidth: 720,
              margin: '0 auto',
            }}
            initial="hidden"
            animate={proofVis ? 'visible' : 'hidden'}
            variants={staggerContainer}
          >
            {CLIENT_NAMES.map((name) => (
              <motion.span
                key={name}
                variants={staggerItem}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '10px 24px',
                  borderRadius: 'var(--radius-pill)',
                  background: 'var(--card-bg)',
                  border: '1px solid var(--border)',
                  fontSize: 14,
                  fontWeight: 600,
                  color: 'var(--text-primary)',
                  whiteSpace: 'nowrap',
                }}
              >
                {name}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ════════ 6. FAQ ════════ */}
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

      {/* ════════ 7. CTA ════════ */}
      <section
        className="section dot-pattern"
        style={{
          background: 'var(--dark-hero)',
          color: '#fff',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <GlowOrb size={500} color="rgba(37, 99, 235, 0.06)" />
        <div
          className="container"
          style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}
        >
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            variants={fadeUp}
          >
            <Zap
              size={32}
              color="var(--accent)"
              strokeWidth={1.5}
              style={{ margin: '0 auto 20px' }}
            />
          </motion.div>
          <motion.h2
            className="display-lg"
            style={{
              fontWeight: 700,
              letterSpacing: '-0.02em',
              lineHeight: 1.1,
              color: '#fff',
              marginBottom: 16,
            }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            variants={fadeUp}
          >
            Ready to Modernize Your Retail IT?
          </motion.h2>
          <motion.p
            style={{
              fontSize: 17,
              fontWeight: 500,
              color: 'rgba(255,255,255,0.5)',
              lineHeight: 1.6,
              maxWidth: 480,
              margin: '0 auto 36px',
            }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            variants={fadeUp}
          >
            One conversation. No obligation. We will map your current
            technology and show you exactly where we can help.
          </motion.p>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            variants={scaleIn}
          >
            <MagneticButton>
              <Link to="/contact" className="btn btn-primary-lg">
                Get a Free IT Assessment
                <ArrowRight size={18} strokeWidth={2} />
              </Link>
            </MagneticButton>
          </motion.div>
        </div>
      </section>

      {/* ════════ 8. CROSS-NAVIGATION ════════ */}
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
            className="retail-nav-grid"
            initial="hidden"
            animate={navVis ? 'visible' : 'hidden'}
            variants={staggerContainer}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: 20,
              maxWidth: 900,
              margin: '0 auto',
            }}
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
                  <Icon size={24} color="var(--accent)" strokeWidth={1.5} />
                  <span
                    style={{
                      fontSize: 16,
                      fontWeight: 600,
                      color: 'var(--text-primary)',
                    }}
                  >
                    {label}
                  </span>
                  <span
                    style={{
                      fontSize: 14,
                      fontWeight: 500,
                      color: 'var(--text-muted)',
                      lineHeight: 1.5,
                    }}
                  >
                    {desc}
                  </span>
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
          .retail-stats-grid {
            grid-template-columns: repeat(4, 1fr) !important;
          }
          .retail-nav-grid {
            grid-template-columns: repeat(4, 1fr) !important;
          }
        }
      `}</style>
    </>
  );
}
