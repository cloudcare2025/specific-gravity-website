import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MapPin,
  Clock,
  Wrench,
  Wifi,
  UserCheck,
  MessageSquare,
  ClipboardCheck,
  Camera,
  ThumbsUp,
  ChevronDown,
  ArrowRight,
  Headphones,
  Users,
  Monitor,
  Store,
  Zap,
  Shield,
  Target,
  AlertTriangle,
  PhoneCall,
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
import { springSnappy, springGentle, springSmooth } from '../animation/springs';
import CardTilt from '../components/CardTilt';
import MagneticButton from '../components/MagneticButton';
import GlowOrb from '../components/GlowOrb';
import Breadcrumbs from '../components/Breadcrumbs';
import SEOHead from '../components/SEOHead';

/* --- data ------------------------------------------------ */

const PAIN_POINTS = [
  {
    icon: AlertTriangle,
    title: 'Broken hardware across 50 states',
    desc: 'Receipt printers jam, terminals crash, and network switches die. Your centralized IT team cannot be everywhere at once.',
  },
  {
    icon: Clock,
    title: 'Vendors that take days, not hours',
    desc: 'Generic IT companies triage your request behind a queue of other clients. Every hour waiting is revenue walking out the door.',
  },
  {
    icon: PhoneCall,
    title: 'Zero visibility once a tech is dispatched',
    desc: 'You submit a ticket and hope for the best. No ETAs, no photos, no sign-off confirmation. Just radio silence until the next complaint.',
  },
];

const CAPABILITIES = [
  {
    icon: MapPin,
    title: '200+ Nationwide Technicians',
    desc: 'Vetted, background-checked field techs deployed from coast to coast. Local presence in every major metro and most rural markets.',
  },
  {
    icon: Zap,
    title: 'Same-Day Emergency Dispatch',
    desc: 'Critical issue at 2 PM? A tech is onsite by close of business in metro areas. Next-business-day for non-critical and rural.',
  },
  {
    icon: Wrench,
    title: 'Hardware & Infrastructure',
    desc: 'POS terminals, receipt printers, network switches, access points, PCs, digital signage — diagnosed and resolved onsite.',
  },
  {
    icon: Wifi,
    title: 'Rollouts & Refreshes',
    desc: 'National POS rollouts, new store openings, technology refresh programs, and structured cabling projects executed at scale.',
  },
  {
    icon: Shield,
    title: 'SLA-Backed Resolution',
    desc: 'Contractual response windows and resolution targets. 90%+ first-visit resolution rate across our entire network.',
  },
  {
    icon: Target,
    title: 'Your Ticketing System, Our Techs',
    desc: 'We plug into ServiceNow, ConnectWise, Zendesk, or your existing platform. No parallel workflows. One source of truth.',
  },
];

const PROTOCOL = [
  {
    num: '01',
    icon: UserCheck,
    title: 'Check In With Management',
    desc: 'Technician arrives on-time, identifies themselves, and confirms the scope of work with the on-duty manager.',
  },
  {
    num: '02',
    icon: MessageSquare,
    title: 'Contact Help Desk',
    desc: 'Connects with the SpecGravity help desk for detailed instructions, statement of work review, and any last-minute updates.',
  },
  {
    num: '03',
    icon: ClipboardCheck,
    title: 'Execute the SOW',
    desc: 'Completes every task on the statement of work. No shortcuts, no skipped steps, no improvising outside of scope.',
  },
  {
    num: '04',
    icon: Camera,
    title: 'Document Everything',
    desc: 'Every repair, replacement, and configuration is photographed and logged in our ticketing system with timestamps.',
  },
  {
    num: '05',
    icon: ThumbsUp,
    title: 'Confirm & Sign Off',
    desc: 'Walks the store manager through completed work and obtains sign-off before departing. No ambiguity, no callbacks.',
  },
];

const STATS = [
  { value: '200+', label: 'Field technicians nationwide' },
  { value: '90%+', label: 'First-visit resolution rate' },
  { value: '<4 hr', label: 'Metro emergency response' },
  { value: '50', label: 'States covered' },
];

const FAQ_DATA = [
  {
    q: 'What is your average response time for emergency dispatches?',
    a: 'For critical issues, we target same-day dispatch within 4 hours in metro areas and next-business-day in rural markets. Non-emergency scheduled visits are confirmed within 24 hours of your request.',
  },
  {
    q: 'What geographic areas does your technician network cover?',
    a: 'We have 200+ vetted field technicians covering all 50 states, with the densest coverage in major metro areas. For remote locations, we leverage regional partners who meet our vetting standards.',
  },
  {
    q: 'How do you handle escalations when a technician cannot resolve an issue onsite?',
    a: 'Every dispatch includes real-time communication with our help desk. If the onsite tech encounters an issue beyond the original scope, they escalate immediately to our Tier 2 engineers who can remote in or authorize additional parts and labor on the spot.',
  },
  {
    q: 'Do you offer SLA guarantees on dispatch resolution?',
    a: 'Yes. We provide contractual SLAs with defined response windows and resolution targets. Our standard SLA is 4-hour response for critical issues and 90%+ first-visit resolution rate. Custom SLAs are available for enterprise clients.',
  },
  {
    q: 'Can we use your dispatching alongside our existing internal IT team?',
    a: 'Absolutely. Many clients use SpecGravity dispatching as an extension of their internal team — handling overflow, after-hours calls, or geographic regions where they lack onsite staff. We integrate with your ticketing system and follow your existing workflows.',
  },
];

const SIBLING_SOLUTIONS = [
  {
    label: 'Hospitality',
    path: '/solutions/hospitality',
    icon: Monitor,
    desc: '24/7 restaurant IT — POS, networking, and multi-unit rollouts.',
  },
  {
    label: 'Retail',
    path: '/solutions/retail',
    icon: Store,
    desc: 'POS, inventory systems, and PCI compliance for retail brands.',
  },
  {
    label: 'Office Tech Support',
    path: '/solutions/office-support',
    icon: Headphones,
    desc: 'Help desk, endpoint management, and network support for offices.',
  },
  {
    label: 'Dedicated Resources',
    path: '/solutions/dedicated-resources',
    icon: Users,
    desc: 'Embedded technicians and engineers assigned full-time to your team.',
  },
];

/* --- FAQ accordion --------------------------------------- */

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

/* --- component ------------------------------------------- */

export default function Dispatching() {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <>
      <SEOHead
        title="Nationwide Dispatching — SpecGravity"
        description="200+ vetted field technicians deployed coast to coast. Same-day emergency dispatches, hardware troubleshooting, POS rollouts, and onsite IT support for multi-unit brands."
        path="/solutions/nationwide-dispatching"
      />

      <GlowOrb size={500} color="rgba(37, 99, 235, 0.06)" />

      {/* ======== 1. HERO ======== */}
      <section
        className="dot-pattern"
        style={{
          background: 'var(--dark-hero)',
          color: '#fff',
          padding: '20px 0 100px',
          overflow: 'hidden',
        }}
      >
        <div
          className="container"
          style={{ position: 'relative', zIndex: 1 }}
        >
          {/* Breadcrumbs inside hero */}
          <div style={{ color: 'rgba(255,255,255,0.5)', marginBottom: 48 }}>
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
                fontSize: 14,
                fontWeight: 600,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.4)',
                marginBottom: 16,
              }}
            >
              Nationwide Dispatching
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
              200+ Technicians.{' '}
              <span className="gradient-text">Coast to Coast.</span>
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
              When your stores need hands-on support, we deploy fast. Vetted
              field techs dispatched same-day for emergencies, with
              documentation and sign-off on every visit.
            </p>
            <MagneticButton>
              <Link to="/contact" className="btn btn-primary-lg">
                Get Your Dispatch Plan
                <ArrowRight size={18} strokeWidth={2} />
              </Link>
            </MagneticButton>
          </motion.div>
        </div>
      </section>

      {/* ======== 2. THE CHALLENGE ======== */}
      <section className="section">
        <div className="container">
          <motion.div
            className="section-header"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <h2>The Problem With Field Support</h2>
            <p>
              Centralized IT teams cannot cost-effectively resolve onsite issues
              at scale.
            </p>
          </motion.div>

          <motion.div
            className="grid-3"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
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
                    background: 'var(--accent-light)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: 20,
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

      {/* ======== 3. CAPABILITIES NETWORK ======== */}
      <section className="section section-alt">
        <div className="container">
          <motion.div
            className="section-header"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <h2>Built for Multi-Unit Scale</h2>
            <p>
              A nationwide field network backed by process, documentation, and
              SLA guarantees.
            </p>
          </motion.div>

          <motion.div
            className="grid-3"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
          >
            {CAPABILITIES.map(({ icon: Icon, title, desc }) => (
              <CardTilt key={title}>
                <motion.div
                  variants={staggerItem}
                  className="card"
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 14,
                    height: '100%',
                  }}
                >
                  <Icon size={28} color="var(--accent)" strokeWidth={1.5} />
                  <h4 style={{ fontWeight: 700, fontSize: 17 }}>{title}</h4>
                  <p
                    style={{
                      color: 'var(--text-muted)',
                      fontSize: 14,
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

      {/* ======== 4. 5-POINT PROTOCOL ======== */}
      <section className="section" style={{ background: 'var(--card-bg)' }}>
        <div className="container">
          <motion.div
            className="section-header"
            variants={fadeDown}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <h2>Our 5-Point Technician Protocol</h2>
            <p>Every dispatch follows the same rigorous standard.</p>
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
            viewport={{ once: true, amount: 0.1 }}
          >
            {/* Vertical connector */}
            <div
              style={{
                position: 'absolute',
                left: 23,
                top: 0,
                bottom: 0,
                width: 2,
                background:
                  'linear-gradient(180deg, var(--accent) 0%, var(--border) 100%)',
                pointerEvents: 'none',
                zIndex: 0,
              }}
            />

            {PROTOCOL.map((step, i) => (
              <motion.div
                key={step.num}
                variants={staggerItem}
                style={{
                  display: 'flex',
                  gap: 24,
                  alignItems: 'flex-start',
                  position: 'relative',
                  zIndex: 1,
                  paddingBottom: i < PROTOCOL.length - 1 ? 40 : 0,
                }}
              >
                {/* Number circle */}
                <div
                  style={{
                    flexShrink: 0,
                    width: 48,
                    height: 48,
                    borderRadius: '50%',
                    background: 'var(--accent)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                    fontSize: 16,
                    color: '#fff',
                    boxShadow: 'var(--accent-glow)',
                  }}
                >
                  {step.num}
                </div>

                {/* Content */}
                <div style={{ flex: 1, paddingTop: 2 }}>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 10,
                      marginBottom: 8,
                    }}
                  >
                    <step.icon
                      size={20}
                      color="var(--accent)"
                      strokeWidth={2}
                    />
                    <h4 style={{ fontWeight: 700, fontSize: 17 }}>
                      {step.title}
                    </h4>
                  </div>
                  <p
                    style={{
                      color: 'var(--text-muted)',
                      fontSize: 15,
                      lineHeight: 1.65,
                    }}
                  >
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ======== 5. PROOF — Stats Row ======== */}
      <section className="section section-alt">
        <div className="container">
          <motion.div
            className="section-header"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <h2>The Numbers Speak</h2>
          </motion.div>

          <motion.div
            className="dispatch-stats-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: 24,
              maxWidth: 800,
              margin: '0 auto',
            }}
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {STATS.map(({ value, label }) => (
              <CardTilt key={label} maxTilt={5}>
                <motion.div
                  variants={staggerItem}
                  style={{
                    textAlign: 'center',
                    background: 'var(--card-bg)',
                    border: '1px solid var(--border)',
                    borderRadius: 'var(--radius-lg)',
                    padding: 'clamp(28px, 4vw, 44px) 20px',
                  }}
                >
                  <div
                    style={{
                      fontSize: 'clamp(36px, 5vw, 52px)',
                      fontWeight: 800,
                      letterSpacing: '-0.03em',
                      color: 'var(--accent)',
                      lineHeight: 1,
                      marginBottom: 8,
                    }}
                  >
                    {value}
                  </div>
                  <div
                    style={{
                      fontSize: 14,
                      fontWeight: 500,
                      color: 'var(--text-muted)',
                      lineHeight: 1.4,
                    }}
                  >
                    {label}
                  </div>
                </motion.div>
              </CardTilt>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ======== 6. FAQ ======== */}
      <section className="section" style={{ background: 'var(--card-bg)' }}>
        <div className="container">
          <motion.div
            className="section-header"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <h2>Frequently Asked Questions</h2>
            <p>What multi-unit operators ask before getting started.</p>
          </motion.div>

          <motion.div
            style={{ maxWidth: 720, margin: '0 auto' }}
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
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

      {/* ======== 7. CTA ======== */}
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
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
          >
            Reduce Downtime. Deploy Fast.
          </motion.h2>
          <motion.p
            style={{
              fontSize: 17,
              fontWeight: 500,
              color: 'rgba(255,255,255,0.5)',
              lineHeight: 1.6,
              marginBottom: 36,
              maxWidth: 520,
              margin: '0 auto 36px',
            }}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
          >
            Tell us how many locations you need covered. We will build a custom
            dispatch plan in 48 hours.
          </motion.p>
          <motion.div
            variants={scaleIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
          >
            <MagneticButton>
              <Link to="/contact" className="btn btn-primary-lg">
                Get Your Dispatch Plan
                <ArrowRight size={18} strokeWidth={2} />
              </Link>
            </MagneticButton>
          </motion.div>
        </div>
      </section>

      {/* ======== 8. CROSS-NAVIGATION ======== */}
      <section className="section" style={{ background: 'var(--card-bg)' }}>
        <div className="container">
          <motion.div
            className="section-header"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <h2>Explore Other Solutions</h2>
          </motion.div>

          <motion.div
            className="grid-4"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
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

      {/* Responsive overrides */}
      <style>{`
        @media (min-width: 768px) {
          .dispatch-stats-grid {
            grid-template-columns: repeat(4, 1fr) !important;
          }
        }
      `}</style>
    </>
  );
}
