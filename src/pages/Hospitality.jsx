import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CheckCircle,
  UtensilsCrossed,
  Zap,
  Coffee,
  Utensils,
  Wine,
  Building,
  ChevronDown,
  ArrowRight,
  Store,
  Truck,
  Monitor,
  Users,
} from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
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
import Breadcrumbs from '../components/Breadcrumbs';
import SEOHead from '../components/SEOHead';

/* ── Data ── */
const KEY_POINTS = [
  'Reduce support costs while freeing internal resources for strategy',
  'Works with brands that have no IT department — or supplements existing teams',
  'Technology agnostic: integrates with Meraki, Toast POS, any existing stack',
  'No required hardware or software upgrades',
];

const TIMELINE = [
  'Assess kitchen workflow, POS layout, and front-of-house connectivity needs',
  'Coordinate with architects and GCs on data, AV, and power placement',
  'Procure and pre-configure POS terminals, KDS units, and networking gear',
  'Manage ISP installation, guest Wi-Fi segmentation, and VPN setup',
  'Install and terminate structured cabling across BOH and FOH',
  'Full system burn-in: POS test orders, KDS routing, and payment processing verification',
];

const VERTICALS = [
  { icon: UtensilsCrossed, label: 'Fast Casual' },
  { icon: Zap, label: 'QSR' },
  { icon: Coffee, label: 'Coffee Shops' },
  { icon: Utensils, label: 'Full-Service Restaurants' },
  { icon: Wine, label: 'Bars & Nightlife' },
  { icon: Building, label: 'Hotels & Resorts' },
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
    q: 'Do you provide 24/7 support for restaurant hours?',
    a: 'Restaurants do not run 9 to 5, and neither do we. Our help desk operates around the clock with restaurant-trained technicians who understand the urgency of a down POS terminal during a dinner rush.',
  },
];

const SIBLING_SOLUTIONS = [
  { label: 'Retail', path: '/solutions/retail', icon: Store },
  { label: 'Nationwide Dispatching', path: '/solutions/nationwide-dispatching', icon: Truck },
  { label: 'Office Tech Support', path: '/solutions/office-support', icon: Monitor },
  { label: 'Dedicated Resources', path: '/solutions/dedicated-resources', icon: Users },
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
export default function Hospitality() {
  const [supportRef, supportVis] = useScrollAnimation(0.2);
  const [buildRef, buildVis] = useScrollAnimation(0.15);
  const [vertRef, vertVis] = useScrollAnimation(0.2);
  const [logoRef, logoVis] = useScrollAnimation(0.2);
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

      {/* ════════ 1. HERO — Asymmetric Layout ════════ */}
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
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: 48,
            alignItems: 'center',
          }}
        >
          {/* Left — text */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeLeft}
            style={{ maxWidth: 640 }}
          >
            <h1
              className="display-xl"
              style={{
                fontFamily: "'Sora', sans-serif",
                fontWeight: 700,
                letterSpacing: '-0.02em',
                lineHeight: 1.1,
                marginBottom: 20,
              }}
            >
              IT Support Built for Restaurants
            </h1>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 18,
                fontWeight: 500,
                color: 'rgba(255,255,255,0.65)',
                lineHeight: 1.6,
                marginBottom: 32,
              }}
            >
              Fast casual to full service. Coffee shops to QSR chains. We keep
              your technology running 24/7.
            </p>
            <Link to="/contact" className="btn btn-primary-lg">
              Book a Free Assessment
            </Link>
          </motion.div>

          {/* Right — decorative gradient element */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeRight}
            aria-hidden="true"
            style={{
              position: 'relative',
              height: 280,
              borderRadius: 24,
              background:
                'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)',
              border: '1px solid rgba(255,255,255,0.08)',
              overflow: 'hidden',
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 16,
              padding: 24,
              alignItems: 'center',
              justifyItems: 'center',
            }}
          >
            {[UtensilsCrossed, Coffee, Zap, Utensils, Wine, Building].map(
              (Icon, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ ...springGentle, delay: 0.3 + i * 0.08 }}
                  style={{
                    width: 64,
                    height: 64,
                    borderRadius: 16,
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Icon size={28} color="rgba(255,255,255,0.35)" strokeWidth={1.5} />
                </motion.div>
              )
            )}
            {/* Glow accent */}
            <div
              style={{
                position: 'absolute',
                top: '30%',
                right: '-20%',
                width: 300,
                height: 300,
                borderRadius: '50%',
                background:
                  'radial-gradient(circle, rgba(255,255,255,0.04) 0%, transparent 70%)',
                pointerEvents: 'none',
              }}
            />
          </motion.div>
        </div>

        {/* Responsive hero grid override */}
        <style>{`
          @media (min-width: 768px) {
            .hosp-hero-grid {
              grid-template-columns: 1.2fr 0.8fr !important;
            }
          }
        `}</style>
      </section>

      {/* ════════ 2. CENTRALIZED IT SUPPORT ════════ */}
      <section className="section" ref={supportRef}>
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr',
              gap: 48,
              alignItems: 'center',
            }}
            className="hosp-two-col"
          >
            {/* Left — text */}
            <motion.div
              initial="hidden"
              animate={supportVis ? 'visible' : 'hidden'}
              variants={fadeLeft}
            >
              <h2
                style={{
                  marginBottom: 28,
                  fontFamily: "'Sora', sans-serif",
                  fontWeight: 700,
                  letterSpacing: '-0.02em',
                  lineHeight: 1.1,
                }}
              >
                One Partner for All Your Technology
              </h2>
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
                        fontFamily: "'Inter', sans-serif",
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

            {/* Right — icon grid */}
            <motion.div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: 16,
              }}
              initial="hidden"
              animate={supportVis ? 'visible' : 'hidden'}
              variants={staggerContainer}
            >
              {[UtensilsCrossed, Coffee, Zap, Utensils].map((Icon, i) => (
                <motion.div
                  key={i}
                  variants={scaleIn}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%',
                    aspectRatio: '1',
                    borderRadius: 16,
                    background:
                      'linear-gradient(135deg, rgba(0,0,0,0.04) 0%, rgba(0,0,0,0.03) 100%)',
                    border: '1px solid var(--border)',
                  }}
                >
                  <Icon size={36} color="var(--primary)" strokeWidth={1.5} />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ════════ 3. NEW STORE BUILDOUT ════════ */}
      <section className="section section-alt" ref={buildRef}>
        <div className="container">
          <motion.div
            className="section-header"
            initial="hidden"
            animate={buildVis ? 'visible' : 'hidden'}
            variants={fadeDown}
          >
            <h2>New Restaurant Openings, Handled</h2>
            <p>From lease signing to first ticket — we manage every technology milestone.</p>
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

      {/* ════════ 4. HOSPITALITY VERTICALS ════════ */}
      <section className="section" ref={vertRef}>
        <div className="container">
          <motion.div
            className="section-header"
            initial="hidden"
            animate={vertVis ? 'visible' : 'hidden'}
            variants={fadeUp}
          >
            <h2>Industries We Serve</h2>
            <p>Deep expertise across every hospitality concept.</p>
          </motion.div>

          <motion.div
            className="grid-3"
            initial="hidden"
            animate={vertVis ? 'visible' : 'hidden'}
            variants={staggerContainer}
          >
            {VERTICALS.map(({ icon: Icon, label }) => (
              <motion.div key={label} variants={staggerItem}>
                <CardTilt maxTilt={6}>
                  <div
                    className="card"
                    style={{
                      textAlign: 'center',
                      padding: 32,
                      cursor: 'default',
                    }}
                  >
                    <Icon size={36} color="var(--primary)" strokeWidth={1.5} />
                    <div
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: 15,
                        fontWeight: 600,
                        color: 'var(--text-primary)',
                        marginTop: 14,
                      }}
                    >
                      {label}
                    </div>
                  </div>
                </CardTilt>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ════════ 5. CLIENT LOGOS ════════ */}
      <section className="section section-alt" ref={logoRef}>
        <div className="container">
          <motion.div
            className="section-header"
            initial="hidden"
            animate={logoVis ? 'visible' : 'hidden'}
            variants={fadeUp}
          >
            <h2>Trusted by Leading Hospitality Brands</h2>
          </motion.div>

          <div style={{ overflow: 'hidden', width: '100%' }}>
            <div
              className="hosp-marquee"
              style={{
                display: 'flex',
                gap: 16,
                width: 'max-content',
              }}
            >
              {[...CLIENT_NAMES, ...CLIENT_NAMES].map((name, i) => (
                <span
                  key={i}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '10px 28px',
                    borderRadius: 9999,
                    background: 'var(--card-bg)',
                    border: '1px solid var(--border)',
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 14,
                    fontWeight: 600,
                    color: 'var(--text-primary)',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {name}
                </span>
              ))}
            </div>
          </div>
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

      {/* ════════ 7. PRICING SIGNAL ════════ */}
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
              Custom Plans for Your Brand's Needs
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
              Every hospitality brand operates differently. We build support
              packages around your unit count, tech stack, and growth roadmap —
              not the other way around.
            </p>
            <Link to="/contact" className="btn btn-primary-lg">
              Get a Custom Quote
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ════════ 8. CTA ════════ */}
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
              marginBottom: 32,
            }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={fadeUp}
          >
            Ready to Simplify Your Restaurant Tech?
          </motion.h2>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={scaleIn}
          >
            <Link to="/contact" className="btn btn-primary-lg">
              Book a Demo
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ════════ 9. CROSS-NAVIGATION ════════ */}
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
            className="grid-4"
            initial="hidden"
            animate={navVis ? 'visible' : 'hidden'}
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
                      fontFamily: "'Inter', sans-serif",
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

      {/* ── Responsive overrides (no inline <style> in markup sections) ── */}
      <style>{`
        .hosp-two-col {
          grid-template-columns: 1fr !important;
        }
        @media (min-width: 768px) {
          .hosp-two-col {
            grid-template-columns: 1.1fr 0.9fr !important;
          }
        }
        @keyframes hospMarquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .hosp-marquee {
          animation: hospMarquee 30s linear infinite;
        }
        .hosp-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </>
  );
}
