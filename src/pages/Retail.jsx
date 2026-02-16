import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CheckCircle,
  Shirt,
  Warehouse,
  Store,
  Cpu,
  FileText,
  Package,
  ChevronDown,
  ArrowRight,
  UtensilsCrossed,
  Truck,
  Monitor,
  Users,
} from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import {
  fadeUp,
  fadeDown,
  fadeRight,
  scaleIn,
  staggerContainer,
  staggerItem,
} from '../animation/variants';
import { springSnappy, springGentle, springSmooth } from '../animation/springs';
import CardTilt from '../components/CardTilt';
import Breadcrumbs from '../components/Breadcrumbs';
import SEOHead from '../components/SEOHead';

/* ── Data ── */
const KEY_POINTS = [
  'Remote and onsite technical assistance for every store',
  'Infrastructure standardization and SOPs across all locations',
  'Enterprise-level implementation with boutique-level attention',
  'Compatible with any technology stack — POS, ERP, WMS',
  'Integrates with existing help desk and ticketing systems',
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
  { icon: FileText, label: 'Licensing' },
  { icon: Package, label: 'Wholesale' },
];

const CLIENT_NAMES = [
  "Lowe's",
  "Bloomingdale's",
  'NY & Company',
  'Altitude',
  "Angela's",
  'Roche Bobois',
  'Revlon',
  "Fred's",
  'Forman Mills',
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

const SIBLING_SOLUTIONS = [
  { label: 'Hospitality', path: '/solutions/hospitality', icon: UtensilsCrossed },
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
export default function Retail() {
  const [supportRef, supportVis] = useScrollAnimation(0.2);
  const [buildRef, buildVis] = useScrollAnimation(0.15);
  const [catRef, catVis] = useScrollAnimation(0.2);
  const [logoRef, logoVis] = useScrollAnimation(0.2);
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

      {/* ════════ 1. HERO — Centered with Full-Width Accent Bar ════════ */}
      <section
        className="dot-pattern"
        style={{
          background: 'var(--dark-hero)',
          color: '#fff',
          padding: '64px 0 0',
          overflow: 'hidden',
        }}
      >
        <div
          className="container"
          style={{
            position: 'relative',
            zIndex: 1,
            textAlign: 'center',
            paddingBottom: 80,
          }}
        >
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
            IT Support Built for Retail
          </motion.h1>
          <motion.p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 18,
              fontWeight: 500,
              color: 'rgba(255,255,255,0.65)',
              lineHeight: 1.6,
              maxWidth: 600,
              margin: '0 auto 36px',
            }}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
          >
            Boutique to big box. Apparel to electronics. We handle your
            technology so you can handle your customers.
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

        {/* Full-width accent gradient bar */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={springSmooth}
          style={{
            height: 4,
            background:
              'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.15) 20%, rgba(255,255,255,0.3) 50%, rgba(255,255,255,0.15) 80%, transparent 100%)',
            transformOrigin: 'center',
          }}
        />
      </section>

      {/* ════════ 2. GENERAL RETAIL SUPPORT ════════ */}
      <section className="section" ref={supportRef}>
        <div className="container">
          <div style={{ maxWidth: 720, margin: '0 auto' }}>
            <motion.div
              initial="hidden"
              animate={supportVis ? 'visible' : 'hidden'}
              variants={fadeRight}
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
                Comprehensive Retail Technology Support
              </h2>
            </motion.div>
            <motion.div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 20,
              }}
              initial="hidden"
              animate={supportVis ? 'visible' : 'hidden'}
              variants={staggerContainer}
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
          </div>
        </div>
      </section>

      {/* ════════ 3. RETAIL BUILDOUT ════════ */}
      <section className="section section-alt" ref={buildRef}>
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

      {/* ════════ 4. RETAIL CATEGORIES ════════ */}
      <section className="section" ref={catRef}>
        <div className="container">
          <motion.div
            className="section-header"
            initial="hidden"
            animate={catVis ? 'visible' : 'hidden'}
            variants={fadeUp}
          >
            <h2>Industries We Serve</h2>
            <p>Proven playbooks for every retail vertical.</p>
          </motion.div>

          <motion.div
            className="grid-3"
            initial="hidden"
            animate={catVis ? 'visible' : 'hidden'}
            variants={staggerContainer}
          >
            {CATEGORIES.map(({ icon: Icon, label }) => (
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
            <h2>Trusted by Leading Retail Brands</h2>
          </motion.div>

          <div style={{ overflow: 'hidden', width: '100%' }}>
            <div
              className="retail-marquee"
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
              Whether you run 5 locations or 500, we structure support around
              your store count, tech stack, and seasonal peaks — not a
              one-size-fits-all contract.
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
            Ready to Modernize Your Retail IT?
          </motion.h2>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={scaleIn}
          >
            <Link to="/contact" className="btn btn-primary-lg">
              Get Started
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

      {/* ── Responsive overrides ── */}
      <style>{`
        @keyframes retailMarquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .retail-marquee {
          animation: retailMarquee 28s linear infinite;
        }
        .retail-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </>
  );
}
