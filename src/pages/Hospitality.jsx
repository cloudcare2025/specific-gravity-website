import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronDown,
  ArrowRight,
  Store,
  Truck,
  Monitor,
  Users,
  AlertTriangle,
  Clock,
  DollarSign,
  Wifi,
  Wrench,
  Server,
  Zap,
  ShieldCheck,
  BarChart3,
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
import { springSnappy, springGentle } from '../animation/springs';
import CardTilt from '../components/CardTilt';
import MagneticButton from '../components/MagneticButton';
import GlowOrb from '../components/GlowOrb';
import Breadcrumbs from '../components/Breadcrumbs';
import SEOHead from '../components/SEOHead';

/* ══════════════════════════════════════════════════
   DATA
   ══════════════════════════════════════════════════ */

const PAIN_POINTS = [
  {
    icon: AlertTriangle,
    title: 'POS crashes during the dinner rush',
    desc: 'Your staff scrambles. Orders pile up. Guests walk out. You call a generic IT vendor who has never stepped inside a kitchen.',
  },
  {
    icon: Clock,
    title: 'New location opens in 6 weeks — and nobody owns the tech',
    desc: "The GC is asking about data drops. The ISP won't commit to a date. Three vendors, zero accountability.",
  },
  {
    icon: DollarSign,
    title: 'Every outage costs you revenue and reputation',
    desc: 'One bad night on Google Reviews can undo months of marketing. Downtime is not an IT problem — it is a business problem.',
  },
];

const CAPABILITIES = [
  {
    icon: Wrench,
    title: 'POS Installation & Support',
    desc: 'Toast, Square, Aloha, Revel, Lightspeed, Clover — installed, configured, menu-programmed, and supported 24/7.',
  },
  {
    icon: Wifi,
    title: 'Networking & Guest Wi-Fi',
    desc: 'Segmented networks isolating guest traffic from POS and BOH systems. Captive portals, bandwidth throttling, enterprise firewall rules.',
  },
  {
    icon: Server,
    title: 'Kitchen Display & AV Systems',
    desc: 'KDS routing logic, expo screens, bump-bar setups, and digital menu boards — integrated directly with your POS.',
  },
  {
    icon: Zap,
    title: 'New Store Buildouts',
    desc: 'From lease signing to first ticket. ISP procurement, structured cabling, POS setup, and final verification — one vendor, on schedule.',
  },
  {
    icon: ShieldCheck,
    title: 'Structured Cabling',
    desc: 'Low-voltage cabling across BOH and FOH, installed and terminated to spec. Coordinated with architects and general contractors.',
  },
  {
    icon: BarChart3,
    title: 'Multi-Unit Rollouts',
    desc: 'Standardized technology playbook for your brand, replicated across every new location. Consistent experience at scale.',
  },
];

const PROCESS_STEPS = [
  { step: 'Assess', desc: 'Kitchen workflow, POS layout, and front-of-house connectivity audit' },
  { step: 'Plan', desc: 'Coordinate with architects and GCs on data, AV, and power placement' },
  { step: 'Build', desc: 'Source, pre-configure, cable, and install all technology systems' },
  { step: 'Verify', desc: 'Full burn-in: test orders, KDS routing, payment processing, guest Wi-Fi' },
  { step: 'Support', desc: '24/7 help desk with restaurant-trained technicians — including holidays' },
];

const STATS = [
  { value: '500+', label: 'Restaurant locations supported' },
  { value: '24/7', label: 'Help desk coverage' },
  { value: '<15 min', label: 'Average response time' },
  { value: '99.9%', label: 'POS uptime across clients' },
];

const CLIENT_NAMES = [
  'Saxbys',
  'Philz',
  'Juiceland',
  'Altitude',
  'Pat LaFrieda',
  "Kellogg's NYC",
  'Aurify',
  'OnRye',
  'Boston Baking',
  'Fields Good Chicken',
];

const FAQ_DATA = [
  {
    q: 'Which POS systems do you support?',
    a: 'We are technology agnostic. Toast, Square, Aloha, Revel, Lightspeed, Clover — if it runs in a restaurant, we support it. Our team handles installation, configuration, menu programming, and ongoing troubleshooting.',
  },
  {
    q: 'How do you handle guest Wi-Fi and network security?',
    a: 'We design segmented networks that isolate guest traffic from POS and back-of-house systems. Every deployment includes a dedicated guest SSID with captive portal support, bandwidth throttling, and enterprise-grade firewall rules.',
  },
  {
    q: 'Can you support kitchen display system (KDS) deployments?',
    a: 'Yes. We configure KDS routing logic, mount hardware, and integrate displays with your POS so orders flow to the correct stations automatically. We also handle expo screens and bump-bar setups.',
  },
  {
    q: 'What does a multi-unit rollout look like?',
    a: 'We create a standardized technology playbook for your brand, then replicate it across every new location. One vendor managing ISP procurement, cabling, POS setup, and final turnup — so your openings stay on schedule.',
  },
  {
    q: 'Do you provide support during restaurant hours?',
    a: 'Restaurants do not run 9 to 5, and neither do we. Our help desk operates around the clock with restaurant-trained technicians who understand the urgency of a down POS terminal during a dinner rush.',
  },
];

const SIBLING_SOLUTIONS = [
  {
    label: 'Retail IT',
    path: '/solutions/retail',
    icon: Store,
    desc: 'POS, inventory, and payment infrastructure for retail stores.',
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
    desc: 'Full-time IT professionals on our payroll, embedded in your brand.',
  },
];

/* ══════════════════════════════════════════════════
   FAQ ACCORDION
   ══════════════════════════════════════════════════ */

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
          padding: '20px 0',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          textAlign: 'left',
          fontSize: 16,
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
                paddingBottom: 20,
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

/* ══════════════════════════════════════════════════
   COMPONENT
   ══════════════════════════════════════════════════ */

export default function Hospitality() {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <>
      <SEOHead
        title="Hospitality IT Support — SpecGravity"
        description="24/7 managed IT for restaurants, coffee shops, and QSR chains. POS support, guest Wi-Fi, kitchen display systems, structured cabling, and multi-unit rollouts."
        path="/solutions/hospitality"
      />

      {/* ════════ 1. HERO ════════ */}
      <section
        className="dot-pattern"
        style={{
          position: 'relative',
          overflow: 'hidden',
          background: 'var(--dark-hero)',
          padding: 'clamp(120px, 12vw, 160px) 0 clamp(64px, 8vw, 96px)',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '-20%',
            right: '-10%',
            width: 600,
            height: 600,
            background: 'radial-gradient(circle, rgba(37, 99, 235, 0.06) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ marginBottom: 32 }}>
            <Breadcrumbs />
          </div>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeLeft}
            style={{ maxWidth: 720 }}
          >
            <p
              style={{
                fontSize: 13,
                fontWeight: 600,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.35)',
                marginBottom: 20,
              }}
            >
              Hospitality IT
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
              Your POS Went Down{' '}
              <br />
              <span
                style={{
                  background: 'linear-gradient(135deg, #2563EB 0%, #60A5FA 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                During the Dinner Rush.
              </span>
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
              We make sure it never happens again. 24/7 restaurant-trained IT
              support for POS, networking, kitchen displays, and multi-unit
              rollouts.
            </p>
            <MagneticButton>
              <Link to="/contact" className="btn btn-primary-lg">
                Get Your Free Assessment
                <ArrowRight size={18} strokeWidth={2} />
              </Link>
            </MagneticButton>
          </motion.div>
        </div>
      </section>

      {/* ════════ 2. PAIN AGITATION ════════ */}
      <section className="section" style={{ background: 'var(--card-bg)' }}>
        <div className="container">
          <motion.div
            className="section-header"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <h2>Sound Familiar?</h2>
            <p>These are the problems restaurant operators tell us about every week.</p>
          </motion.div>

          <motion.div
            className="grid-3"
            style={{ maxWidth: 1040, margin: '0 auto' }}
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {PAIN_POINTS.map(({ icon: Icon, title, desc }) => (
              <CardTilt key={title}>
                <motion.div
                  variants={staggerItem}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 16,
                    padding: 28,
                    background: 'var(--alt-bg)',
                    border: '1px solid var(--border)',
                    borderRadius: 14,
                    height: '100%',
                  }}
                >
                  <div
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: 'var(--radius-md)',
                      background: 'var(--accent-light)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Icon size={24} color="var(--accent)" strokeWidth={1.5} />
                  </div>
                  <h3
                    style={{
                      fontSize: 17,
                      fontWeight: 700,
                      color: 'var(--text-primary)',
                      lineHeight: 1.3,
                    }}
                  >
                    {title}
                  </h3>
                  <p
                    style={{
                      fontSize: 15,
                      fontWeight: 500,
                      color: 'var(--text-muted)',
                      lineHeight: 1.65,
                    }}
                  >
                    {desc}
                  </p>
                </motion.div>
              </CardTilt>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ════════ 3. SOLUTION — What We Do ════════ */}
      <section className="section section-alt">
        <div className="container">
          <motion.div
            className="section-header"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <h2>One Partner. Every Location. All Your Technology.</h2>
            <p>
              Stop juggling vendors. We replace the chaos with a single point of
              accountability for every piece of technology in your restaurants.
            </p>
          </motion.div>

          <motion.div
            className="grid-3"
            style={{ maxWidth: 1040, margin: '0 auto' }}
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
          >
            {CAPABILITIES.map(({ icon: Icon, title, desc }) => (
              <CardTilt key={title}>
                <motion.div
                  variants={staggerItem}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 14,
                    padding: 28,
                    background: 'var(--card-bg)',
                    border: '1px solid var(--border)',
                    borderRadius: 14,
                    height: '100%',
                  }}
                >
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: 10,
                      background: 'var(--accent-light)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Icon size={22} color="var(--accent)" strokeWidth={1.5} />
                  </div>
                  <h4 style={{ fontWeight: 700, fontSize: 17 }}>{title}</h4>
                  <p
                    style={{
                      color: 'var(--text-muted)',
                      fontSize: 14,
                      lineHeight: 1.7,
                    }}
                  >
                    {desc}
                  </p>
                </motion.div>
              </CardTilt>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ════════ 4. PROCESS — New Store Buildout ════════ */}
      <section className="section" style={{ background: 'var(--card-bg)' }}>
        <div className="container">
          <motion.div
            className="section-header"
            variants={fadeDown}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <h2>New Restaurant Openings, Handled</h2>
            <p>From lease signing to first ticket — every technology milestone managed.</p>
          </motion.div>

          <motion.div
            style={{
              position: 'relative',
              maxWidth: 640,
              margin: '0 auto',
            }}
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
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
                key={step}
                variants={staggerItem}
                style={{
                  position: 'relative',
                  display: 'flex',
                  gap: 24,
                  paddingBottom: i === PROCESS_STEPS.length - 1 ? 0 : 40,
                }}
              >
                <div
                  style={{
                    flexShrink: 0,
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    background: 'var(--accent)',
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

      {/* ════════ 5. PROOF — Stats + Client Names ════════ */}
      <section className="section section-alt">
        <div className="container">
          <motion.div
            className="section-header"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <h2>Trusted by Leading Hospitality Brands</h2>
          </motion.div>

          <motion.div
            className="hosp-stats-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: 24,
              maxWidth: 720,
              margin: '0 auto 56px',
            }}
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
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

          <motion.div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: 12,
              maxWidth: 680,
              margin: '0 auto',
            }}
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
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
      <section className="section" style={{ background: 'var(--card-bg)' }}>
        <div className="container">
          <motion.div
            className="section-header"
            variants={fadeDown}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <h2>Frequently Asked Questions</h2>
            <p>Everything restaurant operators ask before getting started.</p>
          </motion.div>

          <div style={{ maxWidth: 720, margin: '0 auto' }}>
            {FAQ_DATA.map((item, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
              >
                <FAQItem
                  question={item.q}
                  answer={item.a}
                  isOpen={openFaq === i}
                  onToggle={() => setOpenFaq(openFaq === i ? null : i)}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════ 7. FINAL CTA ════════ */}
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

        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 500,
            height: 500,
            background: 'radial-gradient(circle, rgba(255,255,255,0.04) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />

        <div
          className="container"
          style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}
        >
          <motion.h2
            className="display-lg"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            style={{
              color: '#fff',
              fontWeight: 700,
              letterSpacing: '-0.02em',
              lineHeight: 1.1,
              marginBottom: 20,
            }}
          >
            Stop Losing Revenue to{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #2563EB 0%, #60A5FA 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Downtime
            </span>
          </motion.h2>
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            style={{
              fontSize: 17,
              fontWeight: 500,
              color: 'rgba(255,255,255,0.5)',
              lineHeight: 1.6,
              maxWidth: 480,
              margin: '0 auto 36px',
            }}
          >
            Talk to a hospitality IT specialist. No sales pitch — just an
            honest assessment of your technology gaps.
          </motion.p>
          <motion.div
            variants={scaleIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <MagneticButton>
              <Link to="/contact" className="btn btn-primary-lg">
                Get Your Free Assessment
                <ArrowRight size={18} strokeWidth={2} />
              </Link>
            </MagneticButton>
          </motion.div>
        </div>
      </section>

      {/* ════════ 8. CROSS-NAVIGATION ════════ */}
      <section className="section" style={{ background: 'var(--card-bg)' }}>
        <div className="container">
          <motion.div
            className="section-header"
            variants={fadeRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <h2>Explore More Solutions</h2>
            <p>See how SpecGravity supports every layer of your IT operation</p>
          </motion.div>

          <motion.div
            className="grid-4"
            style={{ maxWidth: 1040, margin: '0 auto' }}
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
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
                  }}
                >
                  <Icon size={24} color="var(--accent)" strokeWidth={1.5} />
                  <span
                    style={{
                      fontSize: 15,
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

      <style>{`
        @media (min-width: 768px) {
          .hosp-stats-grid {
            grid-template-columns: repeat(4, 1fr) !important;
          }
        }
      `}</style>
    </>
  );
}
