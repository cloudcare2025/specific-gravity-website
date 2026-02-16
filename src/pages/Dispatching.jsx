import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  AlertTriangle,
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
import { springSnappy, springGentle, springSmooth } from '../animation/springs';
import CardTilt from '../components/CardTilt';
import Breadcrumbs from '../components/Breadcrumbs';
import SEOHead from '../components/SEOHead';

/* ─── data ─── */
const features = [
  { icon: MapPin, title: '200+ Nationwide Field Technicians', desc: 'Vetted, experienced techs deployed from coast to coast. Local presence, national scale.' },
  { icon: Clock, title: 'Emergency & Scheduled Support', desc: 'Same-day emergency dispatches and planned maintenance visits on your timeline.' },
  { icon: Wrench, title: 'Hardware Troubleshooting & Replacement', desc: 'Printers, terminals, PCs, networking gear — diagnosed and resolved onsite.' },
  { icon: Wifi, title: 'POS & WiFi Rollouts', desc: 'National buildouts, new store openings, and technology refresh programs executed at scale.' },
];

const protocol = [
  { num: '01', icon: UserCheck, title: 'Introduce to Store Management', desc: 'Technician arrives on-time, identifies themselves, and checks in with the on-duty manager.' },
  { num: '02', icon: MessageSquare, title: 'Notify Help Desk', desc: 'Contacts SpecGravity help desk, receives detailed instructions and the statement of work.' },
  { num: '03', icon: ClipboardCheck, title: 'Complete Work Per SOW', desc: 'Executes every task on the statement of work. No shortcuts, no skipped steps.' },
  { num: '04', icon: Camera, title: 'Document With Photos & Notes', desc: 'Every repair, replacement, and configuration is photographed and logged in our ticketing system.' },
  { num: '05', icon: ThumbsUp, title: 'Confirm Satisfaction', desc: 'Walks the store manager through the completed work and obtains sign-off before departing.' },
];

const faqs = [
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
  { label: 'Hospitality', path: '/solutions/hospitality', icon: Monitor },
  { label: 'Retail', path: '/solutions/retail', icon: Store },
  { label: 'Office Tech Support', path: '/solutions/office-support', icon: Headphones },
  { label: 'Dedicated Resources', path: '/solutions/dedicated-resources', icon: Users },
];

/* ─── component ─── */
export default function Dispatching() {
  const [statRef, statVisible] = useScrollAnimation(0.3);
  const [navRef, navVis] = useScrollAnimation(0.2);
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <>
      <SEOHead
        title="Nationwide Dispatching — SpecGravity"
        description="200+ vetted field technicians deployed coast to coast. Same-day emergency dispatches, hardware troubleshooting, POS rollouts, and onsite IT support for multi-unit brands."
        path="/solutions/nationwide-dispatching"
      />

      {/* ── Breadcrumbs ── */}
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

      {/* ── Section 1: Hero ── */}
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
            maxWidth: 900,
            margin: '0 auto',
            textAlign: 'center',
          }}
        >
          <motion.h1
            className="display-xl"
            variants={fadeDown}
            initial="hidden"
            animate="visible"
            style={{
              fontWeight: 700,
              letterSpacing: '-0.02em',
              lineHeight: 1.1,
              marginBottom: 20,
            }}
          >
            200+ Technicians.{' '}
            <span
              style={{
                background: 'var(--text-gradient)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Coast to Coast.
            </span>
          </motion.h1>

          <motion.p
            className="body-large"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            style={{
              color: 'rgba(255,255,255,0.65)',
              maxWidth: 600,
              margin: '0 auto 36px',
              fontSize: 18,
              fontWeight: 500,
              lineHeight: 1.6,
            }}
          >
            When your stores need hands-on support, we deploy fast.
          </motion.p>

          <motion.div
            variants={scaleIn}
            initial="hidden"
            animate="visible"
          >
            <Link to="/contact" className="btn btn-primary-lg">
              Get a Free Assessment
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── Section 2: The Challenge ── */}
      <section className="section" style={{ background: 'var(--card-bg)' }}>
        <div className="container" style={{ maxWidth: 800, margin: '0 auto' }}>
          <motion.div
            variants={scaleIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            style={{ textAlign: 'center' }}
          >
            <AlertTriangle size={40} color="var(--primary)" strokeWidth={1.5} style={{ marginBottom: 20 }} />
            <h2 style={{ marginBottom: 20 }}>The Challenge</h2>
            <p style={{
              fontSize: 16, lineHeight: 1.8, color: 'var(--text-muted)', maxWidth: 680, margin: '0 auto',
            }}>
              Centralized IT teams cannot cost-effectively resolve onsite issues across dozens — or hundreds — of locations. Broken receipt printers, damaged payment terminals, downed WiFi, and failing computers pile up while your store teams wait. Every hour of downtime is lost revenue and frustrated customers. You need boots on the ground, and you need them fast.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Section 3: Our Nationwide Network ── */}
      <section className="section section-alt">
        <div className="container">
          <motion.div
            className="section-header"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <h2>Our Nationwide Network</h2>
            <p>Scalable field support built for multi-unit brands</p>
          </motion.div>
          <motion.div
            className="grid-4"
            style={{ maxWidth: 960, margin: '0 auto' }}
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {features.map((feat) => (
              <CardTilt key={feat.title}>
                <motion.div
                  variants={staggerItem}
                  className="card"
                  style={{ display: 'flex', flexDirection: 'column', gap: 14, height: '100%' }}
                >
                  <feat.icon size={28} color="var(--primary)" strokeWidth={2} />
                  <h4 style={{ fontWeight: 700, fontSize: 17 }}>{feat.title}</h4>
                  <p style={{ color: 'var(--text-muted)', fontSize: 14, lineHeight: 1.6 }}>{feat.desc}</p>
                </motion.div>
              </CardTilt>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Section 4: 5-Point Technician Protocol ── */}
      <section className="section" style={{ background: 'var(--card-bg)' }}>
        <div className="container">
          <motion.div
            className="section-header"
            variants={fadeRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <h2>Our 5-Point Technician Protocol</h2>
            <p>Every dispatch follows the same rigorous standard</p>
          </motion.div>

          <div style={{ maxWidth: 640, margin: '0 auto', position: 'relative' }}>
            {/* Vertical connector line */}
            <div style={{
              position: 'absolute',
              left: 28,
              top: 40,
              bottom: 40,
              width: 0,
              borderLeft: '2px dashed var(--border)',
              pointerEvents: 'none',
              zIndex: 0,
            }} />

            {protocol.map((step, i) => (
              <motion.div
                key={step.num}
                variants={fadeLeft}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                style={{
                  display: 'flex',
                  gap: 24,
                  alignItems: 'flex-start',
                  position: 'relative',
                  zIndex: 1,
                  marginBottom: i < protocol.length - 1 ? 40 : 0,
                }}
              >
                {/* Number circle */}
                <div style={{
                  flexShrink: 0,
                  width: 56,
                  height: 56,
                  borderRadius: '50%',
                  background: 'var(--alt-bg)',
                  border: '2px solid var(--border)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  fontSize: 18,
                  color: 'var(--primary)',
                }}>
                  {step.num}
                </div>

                {/* Content */}
                <div style={{ flex: 1, paddingTop: 4 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                    <step.icon size={20} color="var(--primary)" strokeWidth={2} />
                    <h4 style={{ fontWeight: 700, fontSize: 17 }}>{step.title}</h4>
                  </div>
                  <p style={{ color: 'var(--text-muted)', fontSize: 14, lineHeight: 1.6 }}>{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 5: Key Stat Callout (light) ── */}
      <section className="section section-alt">
        <div className="container">
          <motion.div
            ref={statRef}
            variants={scaleIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            style={{
              maxWidth: 640,
              margin: '0 auto',
              textAlign: 'center',
              background: 'var(--card-bg)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-lg)',
              padding: 'clamp(40px, 5vw, 64px)',
              boxShadow: 'var(--shadow-lg)',
            }}
          >
            <div style={{
              fontWeight: 700,
              fontSize: 'clamp(48px, 6vw, 72px)',
              color: 'var(--primary)',
              lineHeight: 1.1,
              marginBottom: 16,
            }}>
              90%+
            </div>
            <p style={{
              color: 'var(--text-muted)',
              fontSize: 18,
              lineHeight: 1.6,
              maxWidth: 460,
              margin: '0 auto 8px',
            }}>
              First-visit resolution rate across all dispatches
            </p>
            <p style={{
              color: 'var(--text-muted)',
              fontSize: 14,
              lineHeight: 1.5,
              maxWidth: 400,
              margin: '0 auto',
              fontStyle: 'italic',
            }}>
              Based on SLA performance data across our nationwide technician network
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Section 6: FAQ ── */}
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
            <p>What clients ask before getting started</p>
          </motion.div>

          <div style={{ maxWidth: 720, margin: '0 auto' }}>
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                style={{
                  borderBottom: '1px solid var(--border)',
                }}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 16,
                    padding: '20px 0',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    textAlign: 'left',
                    fontFamily: 'var(--font-heading)',
                    fontWeight: 600,
                    fontSize: 16,
                    color: 'var(--primary)',
                  }}
                >
                  {faq.q}
                  <motion.span
                    animate={{ rotate: openFaq === i ? 180 : 0 }}
                    transition={springSnappy}
                    style={{ flexShrink: 0 }}
                  >
                    <ChevronDown size={20} strokeWidth={2} />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={springGentle}
                      style={{ overflow: 'hidden' }}
                    >
                      <p style={{
                        fontSize: 15,
                        lineHeight: 1.7,
                        color: 'var(--text-muted)',
                        paddingBottom: 20,
                      }}>
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 7: CTA ── */}
      <section
        className="dot-pattern"
        style={{
          background: 'var(--dark-hero)',
          padding: 'clamp(48px, 6vw, 80px) 0 clamp(64px, 8vw, 96px)',
          borderTop: '1px solid rgba(255,255,255,0.05)',
          overflow: 'hidden',
        }}
      >
        <div className="container" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <motion.h2
            className="display-lg"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            style={{ color: '#fff', marginBottom: 20 }}
          >
            Reduce Downtime. Deploy Fast.
          </motion.h2>
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            style={{ color: 'rgba(255,255,255,0.7)', fontSize: 18, maxWidth: 560, margin: '0 auto 36px', lineHeight: 1.6 }}
          >
            Tell us how many locations you need covered. We will build a dispatch plan in 48 hours.
          </motion.p>
          <motion.div
            variants={scaleIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <Link to="/contact" className="btn btn-primary-lg">Get Your Dispatch Plan</Link>
          </motion.div>
        </div>
      </section>

      {/* ── Section 8: Cross-Navigation ── */}
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
    </>
  );
}
