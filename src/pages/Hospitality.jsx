import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CheckCircle,
  ChevronDown,
  ArrowRight,
  Store,
  Truck,
  Monitor,
  AlertTriangle,
  Clock,
  DollarSign,
  Shield,
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

/* ── Data ── */

const PAIN_POINTS = [
  {
    icon: AlertTriangle,
    title: 'POS goes down during Friday dinner rush',
    desc: 'Your staff scrambles. Orders back up. Guests walk out. You call a generic IT vendor who has never seen a kitchen.',
  },
  {
    icon: Clock,
    title: 'New location opens in 6 weeks',
    desc: 'The GC is asking about data drops. The ISP won\'t commit to a date. Nobody owns the technology timeline.',
  },
  {
    icon: DollarSign,
    title: 'Three vendors, three invoices, zero accountability',
    desc: 'One company for cabling, another for POS, a third for the network. When something breaks, they all point at each other.',
  },
];

const KEY_POINTS = [
  'Single point of contact for POS, network, cabling, and ongoing support',
  'Restaurant-trained technicians available 24/7 — including holidays',
  'Technology agnostic: Toast, Square, Aloha, Meraki, any existing stack',
  'No required hardware or software purchases — we work with what you have',
];

const TIMELINE = [
  { step: 'Assess', desc: 'Kitchen workflow, POS layout, and front-of-house connectivity audit' },
  { step: 'Plan', desc: 'Coordinate with architects and GCs on data, AV, and power placement' },
  { step: 'Procure', desc: 'Source and pre-configure POS terminals, KDS units, and networking gear' },
  { step: 'Connect', desc: 'ISP installation, guest Wi-Fi segmentation, and VPN setup' },
  { step: 'Build', desc: 'Structured cabling across BOH and FOH, installed and terminated' },
  { step: 'Verify', desc: 'Full burn-in: test orders, KDS routing, and payment processing validation' },
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

const STATS = [
  { value: '500+', label: 'Restaurant locations supported' },
  { value: '24/7', label: 'Help desk coverage' },
  { value: '<15 min', label: 'Average response time' },
  { value: '99.9%', label: 'POS uptime across clients' },
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
    label: 'Retail',
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
export default function Hospitality() {
  const [painRef, painVis] = useScrollAnimation(0.15);
  const [supportRef, supportVis] = useScrollAnimation(0.2);
  const [buildRef, buildVis] = useScrollAnimation(0.15);
  const [proofRef, proofVis] = useScrollAnimation(0.2);
  const [faqRef, faqVis] = useScrollAnimation(0.15);
  const [pricingRef, pricingVis] = useScrollAnimation(0.2);
  const [navRef, navVis] = useScrollAnimation(0.2);

  const [openFaq, setOpenFaq] = useState(null);

  return (
    <>
      <SEOHead
        title="Hospitality IT Support — SpecGravity"
        description="24/7 managed IT for restaurants, hotels, coffee shops, and QSR chains. POS support, guest Wi-Fi, kitchen display systems, and multi-unit rollouts."
        path="/solutions/hospitality"
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

      {/* ════════ 1. HERO — Clean text, single CTA ════════ */}
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
            style={{ maxWidth: 680 }}
          >
            <p
              style={{
                fontSize: 14,
                fontWeight: 600,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.4)',
                marginBottom: 16,
              }}
            >
              Hospitality IT
            </p>
            <h1
              className="display-xl"
              style={{
                fontWeight: 700,
                letterSpacing: '-0.02em',
                lineHeight: 1.08,
                marginBottom: 24,
              }}
            >
              Your POS Went Down
              <br />
              <span style={{ color: 'rgba(255,255,255,0.4)' }}>During the Dinner Rush.</span>
            </h1>
            <p
              style={{
                fontSize: 18,
                fontWeight: 500,
                color: 'rgba(255,255,255,0.6)',
                lineHeight: 1.65,
                marginBottom: 40,
                maxWidth: 540,
              }}
            >
              We make sure it never happens again. 24/7 restaurant-trained IT
              support for POS, networking, kitchen displays, and multi-unit
              rollouts.
            </p>
            <Link to="/contact" className="btn btn-primary-lg">
              Get Your Free Assessment
              <ArrowRight size={18} strokeWidth={2} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ════════ 2. PAIN AGITATION — Name the problem ════════ */}
      <section className="section" ref={painRef}>
        <div className="container">
          <motion.div
            className="section-header"
            initial="hidden"
            animate={painVis ? 'visible' : 'hidden'}
            variants={fadeUp}
          >
            <h2>Sound Familiar?</h2>
            <p>These are the problems restaurant operators tell us about every week.</p>
          </motion.div>

          <motion.div
            className="grid-3"
            initial="hidden"
            animate={painVis ? 'visible' : 'hidden'}
            variants={staggerContainer}
          >
            {PAIN_POINTS.map(({ icon: Icon, title, desc }) => (
              <motion.div
                key={title}
                variants={staggerItem}
                className="card"
                style={{ cursor: 'default' }}
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
                  <Icon size={24} color="var(--text-primary)" strokeWidth={1.5} />
                </div>
                <h3
                  style={{
                    fontSize: 17,
                    fontWeight: 700,
                    color: 'var(--text-primary)',
                    lineHeight: 1.3,
                    marginBottom: 10,
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
            ))}
          </motion.div>
        </div>
      </section>

      {/* ════════ 3. THE SOLUTION — Key Points ════════ */}
      <section className="section section-alt" ref={supportRef}>
        <div className="container">
          <motion.div
            initial="hidden"
            animate={supportVis ? 'visible' : 'hidden'}
            variants={fadeLeft}
            style={{ maxWidth: 640 }}
          >
            <h2 style={{ marginBottom: 12 }}>
              One Partner. Every Location. All Your Technology.
            </h2>
            <p
              style={{
                fontSize: 16,
                fontWeight: 500,
                color: 'var(--text-muted)',
                lineHeight: 1.65,
                marginBottom: 36,
                maxWidth: 560,
              }}
            >
              Stop juggling vendors. We replace the chaos with a single point of
              accountability for every piece of technology in your restaurants.
            </p>
            <motion.div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 20,
              }}
              variants={staggerContainer}
              initial="hidden"
              animate={supportVis ? 'visible' : 'hidden'}
            >
              {KEY_POINTS.map((pt, i) => (
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
                    size={22}
                    style={{ flexShrink: 0, color: 'var(--primary)', marginTop: 2 }}
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
            <h2>New Restaurant Openings, Handled</h2>
            <p>From lease signing to first ticket — every technology milestone managed.</p>
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
                background: 'linear-gradient(180deg, var(--primary) 0%, var(--border) 100%)',
              }}
            />
            {TIMELINE.map(({ step, desc }, i) => (
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
            <h2>Trusted by Leading Hospitality Brands</h2>
          </motion.div>

          {/* Stats row */}
          <motion.div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: 24,
              maxWidth: 720,
              margin: '0 auto 56px',
            }}
            className="hosp-stats-grid"
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

          {/* Client names — static grid, not marquee */}
          <motion.div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: 12,
              maxWidth: 680,
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
            <p>Everything restaurant operators ask before getting started.</p>
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

      {/* ════════ 7. PRICING SIGNAL — Specific value anchors ════════ */}
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
            <h2 style={{ marginBottom: 16 }}>Pricing That Scales With You</h2>
            <p
              style={{
                fontSize: 16,
                fontWeight: 500,
                color: 'var(--text-muted)',
                lineHeight: 1.65,
                marginBottom: 28,
              }}
            >
              Plans are built around your unit count, support hours, and
              technology stack. Most restaurant groups start between $500 and
              $2,500 per location per month depending on scope.
            </p>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 8,
                alignItems: 'center',
                marginBottom: 36,
              }}
            >
              {[
                'No long-term contracts required',
                'Month-to-month flexibility for seasonal concepts',
                'Volume discounts for 10+ locations',
              ].map((line) => (
                <div
                  key={line}
                  style={{
                    display: 'flex',
                    gap: 10,
                    alignItems: 'center',
                  }}
                >
                  <Shield size={16} color="var(--text-muted)" strokeWidth={2} />
                  <span
                    style={{
                      fontSize: 14,
                      fontWeight: 500,
                      color: 'var(--text-muted)',
                    }}
                  >
                    {line}
                  </span>
                </div>
              ))}
            </div>
            <Link to="/contact" className="btn btn-primary-lg">
              Get Your Free Assessment
              <ArrowRight size={18} strokeWidth={2} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ════════ 8. FINAL CTA ════════ */}
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
            Stop Losing Revenue to Downtime
          </motion.h2>
          <motion.p
            style={{
              fontSize: 17,
              fontWeight: 500,
              color: 'rgba(255,255,255,0.5)',
              lineHeight: 1.6,
              marginBottom: 36,
              maxWidth: 480,
              margin: '0 auto 36px',
            }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={fadeUp}
          >
            Talk to a hospitality IT specialist. No sales pitch — just an
            honest assessment of your technology gaps.
          </motion.p>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={scaleIn}
          >
            <Link to="/contact" className="btn btn-primary-lg">
              Get Your Free Assessment
              <ArrowRight size={18} strokeWidth={2} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ════════ 9. CROSS-NAVIGATION — 3 links max ════════ */}
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
                  }}
                >
                  <Icon size={24} color="var(--primary)" strokeWidth={1.5} />
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
          .hosp-stats-grid {
            grid-template-columns: repeat(4, 1fr) !important;
          }
        }
      `}</style>
    </>
  );
}
