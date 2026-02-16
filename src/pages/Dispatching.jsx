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
} from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { fadeUp, fadeDown, fadeLeft, fadeRight, scaleIn, staggerContainer, staggerItem } from '../animation/variants';
import { springSnappy, springGentle, springBouncy, springSmooth } from '../animation/springs';
import CardTilt from '../components/CardTilt';
import Breadcrumbs from '../components/Breadcrumbs';
import SEOHead from '../components/SEOHead';

/* ─── constants ─── */
const FONT_HEADING = "'Sora', sans-serif";
const FONT_BODY = "'Inter', sans-serif";
const PRIMARY = '#1A1A1A';
const DARK_HERO = 'linear-gradient(135deg, #0a0a0a 0%, #111111 50%, #0d0d0d 100%)';

const DOT_OVERLAY = {
  position: 'absolute', inset: 0, pointerEvents: 'none',
  backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)',
  backgroundSize: '24px 24px',
};

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

const siblingLinks = [
  { to: '/solutions/office-support', icon: Headphones, label: 'Office Tech Support', desc: 'Flat-rate support for your headquarters' },
  { to: '/solutions/dedicated-resources', icon: Users, label: 'Dedicated Resources', desc: 'Embedded IT talent on our payroll' },
  { to: '/solutions/hospitality', icon: Monitor, label: 'Hospitality IT', desc: 'Purpose-built for multi-unit brands' },
];

/* ─── component ─── */
export default function Dispatching() {
  const [statRef, statVisible] = useScrollAnimation(0.3);
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <>
      <SEOHead
        title="Nationwide Dispatching — SpecGravity"
        description="200+ vetted field technicians deployed coast to coast. Same-day emergency dispatches, hardware troubleshooting, POS rollouts, and onsite IT support for multi-unit brands."
        path="/solutions/nationwide-dispatching"
      />

      {/* ── Section 1: Hero ── */}
      <section style={{
        position: 'relative',
        overflow: 'hidden',
        background: DARK_HERO,
        padding: 'clamp(120px, 12vw, 160px) 0 clamp(64px, 8vw, 96px)',
      }}>
        <div style={DOT_OVERLAY} />
        <div style={{
          position: 'absolute', top: '-20%', left: '-10%', width: 600, height: 600,
          background: 'radial-gradient(circle, rgba(255,255,255,0.06) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', bottom: '-30%', right: '-5%', width: 500, height: 500,
          background: 'radial-gradient(circle, rgba(255,255,255,0.04) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        <div className="container" style={{ position: 'relative', zIndex: 1, maxWidth: 900, margin: '0 auto' }}>
          <div style={{ marginBottom: 32 }}>
            <Breadcrumbs />
          </div>

          <div style={{ textAlign: 'center' }}>
            <motion.h1
              className="display-xl"
              variants={fadeDown}
              initial="hidden"
              animate="visible"
              style={{ color: '#fff', marginBottom: 24, fontFamily: FONT_HEADING }}
            >
              200+ Technicians.{' '}
              <span style={{
                background: 'linear-gradient(135deg, #ffffff 0%, #a0a0a0 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                Coast to Coast.
              </span>
            </motion.h1>

            <motion.p
              className="body-large"
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              style={{ color: 'rgba(255,255,255,0.7)', maxWidth: 640, margin: '0 auto', fontFamily: FONT_BODY, lineHeight: 1.6 }}
            >
              When your stores need hands-on support, we deploy fast.
            </motion.p>
          </div>
        </div>
      </section>

      {/* ── Section 2: The Problem ── */}
      <section className="section" style={{ background: '#fff' }}>
        <div className="container" style={{ maxWidth: 800, margin: '0 auto' }}>
          <motion.div
            variants={scaleIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            style={{ textAlign: 'center' }}
          >
            <AlertTriangle size={40} color={PRIMARY} strokeWidth={1.5} style={{ marginBottom: 20 }} />
            <h2 style={{ fontFamily: FONT_HEADING, marginBottom: 20 }}>The Challenge</h2>
            <p style={{
              fontFamily: FONT_BODY, fontSize: 16, lineHeight: 1.8, color: '#737373', maxWidth: 680, margin: '0 auto',
            }}>
              Centralized IT teams can't cost-effectively resolve onsite issues across dozens — or hundreds — of locations. Broken receipt printers, damaged payment terminals, downed WiFi, and failing computers pile up while your store teams wait. Every hour of downtime is lost revenue and frustrated customers. You need boots on the ground, and you need them fast.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Section 3: The Solution ── */}
      <section className="section section-alt">
        <div className="container">
          <motion.div
            className="section-header"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <h2 style={{ fontFamily: FONT_HEADING }}>Our Nationwide Network</h2>
            <p style={{ fontFamily: FONT_BODY }}>Scalable field support built for multi-unit brands</p>
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
                  <feat.icon size={28} color={PRIMARY} strokeWidth={2} />
                  <h4 style={{ fontFamily: FONT_HEADING, fontWeight: 700, fontSize: 17 }}>{feat.title}</h4>
                  <p style={{ color: '#737373', fontSize: 14, lineHeight: 1.6, fontFamily: FONT_BODY }}>{feat.desc}</p>
                </motion.div>
              </CardTilt>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Section 4: 5-Point Technician Protocol ── */}
      <section className="section" style={{ background: '#fff' }}>
        <div className="container">
          <motion.div
            className="section-header"
            variants={fadeRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <h2 style={{ fontFamily: FONT_HEADING }}>Our 5-Point Technician Protocol</h2>
            <p style={{ fontFamily: FONT_BODY }}>Every dispatch follows the same rigorous standard</p>
          </motion.div>

          <div style={{ maxWidth: 640, margin: '0 auto', position: 'relative' }}>
            {/* Vertical dotted line */}
            <div style={{
              position: 'absolute',
              left: 28,
              top: 40,
              bottom: 40,
              width: 0,
              borderLeft: '2px dashed rgba(0,0,0,0.15)',
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
                  background: 'rgba(0,0,0,0.04)',
                  border: '2px solid rgba(0,0,0,0.12)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: FONT_HEADING,
                  fontWeight: 700,
                  fontSize: 18,
                  color: PRIMARY,
                }}>
                  {step.num}
                </div>

                {/* Content */}
                <div style={{ flex: 1, paddingTop: 4 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                    <step.icon size={20} color={PRIMARY} strokeWidth={2} />
                    <h4 style={{ fontFamily: FONT_HEADING, fontWeight: 700, fontSize: 17 }}>{step.title}</h4>
                  </div>
                  <p style={{ color: '#737373', fontSize: 14, lineHeight: 1.6, fontFamily: FONT_BODY }}>{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 5: Key Stat Callout ── */}
      <section style={{
        position: 'relative',
        overflow: 'hidden',
        background: DARK_HERO,
        padding: 'clamp(64px, 8vw, 96px) 0',
      }}>
        <div style={DOT_OVERLAY} />
        <div style={{
          position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
          width: 500, height: 500,
          background: 'radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <motion.div
            ref={statRef}
            variants={scaleIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            style={{
              maxWidth: 600,
              margin: '0 auto',
              textAlign: 'center',
              background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 16,
              padding: 'clamp(40px, 5vw, 64px)',
              boxShadow: '0 0 60px rgba(255,255,255,0.08)',
            }}
          >
            <div style={{
              fontFamily: FONT_HEADING,
              fontWeight: 700,
              fontSize: 'clamp(48px, 6vw, 72px)',
              color: '#fff',
              lineHeight: 1.1,
              marginBottom: 16,
            }}>
              90%+
            </div>
            <p style={{
              color: 'rgba(255,255,255,0.7)',
              fontSize: 18,
              lineHeight: 1.6,
              fontFamily: FONT_BODY,
              maxWidth: 460,
              margin: '0 auto',
            }}>
              of onsite trips result in the discovery of issues IT departments weren't aware of
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Section 6: FAQ ── */}
      <section className="section" style={{ background: '#fff' }}>
        <div className="container">
          <motion.div
            className="section-header"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <h2 style={{ fontFamily: FONT_HEADING }}>Frequently Asked Questions</h2>
            <p style={{ fontFamily: FONT_BODY }}>What clients ask before getting started</p>
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
                  borderBottom: '1px solid #E5E7EB',
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
                    fontFamily: FONT_HEADING,
                    fontWeight: 600,
                    fontSize: 16,
                    color: PRIMARY,
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
                        fontFamily: FONT_BODY,
                        fontSize: 15,
                        lineHeight: 1.7,
                        color: '#737373',
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
      <section style={{
        position: 'relative',
        overflow: 'hidden',
        background: DARK_HERO,
        padding: 'clamp(48px, 6vw, 80px) 0 clamp(64px, 8vw, 96px)',
        borderTop: '1px solid rgba(255,255,255,0.05)',
      }}>
        <div style={DOT_OVERLAY} />
        <div className="container" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <motion.h2
            className="display-lg"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            style={{ color: '#fff', fontFamily: FONT_HEADING, marginBottom: 20 }}
          >
            Get Boots on the Ground
          </motion.h2>
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            style={{ color: 'rgba(255,255,255,0.7)', fontSize: 18, maxWidth: 560, margin: '0 auto 36px', fontFamily: FONT_BODY, lineHeight: 1.6 }}
          >
            Talk to our team about dispatching technicians to your locations.
          </motion.p>
          <motion.div
            variants={scaleIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <Link to="/contact" className="btn btn-primary-lg">Book a Demo</Link>
          </motion.div>
        </div>
      </section>

      {/* ── Section 8: Cross-Navigation ── */}
      <section className="section" style={{ background: '#fff' }}>
        <div className="container">
          <motion.div
            className="section-header"
            variants={fadeDown}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <h2 style={{ fontFamily: FONT_HEADING }}>Explore More Solutions</h2>
            <p style={{ fontFamily: FONT_BODY }}>See how SpecGravity supports every layer of your IT operation</p>
          </motion.div>

          <motion.div
            className="grid-3"
            style={{ maxWidth: 960, margin: '0 auto' }}
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {siblingLinks.map((link) => (
              <motion.div key={link.to} variants={staggerItem}>
                <Link
                  to={link.to}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 12,
                    padding: 28,
                    background: '#FAFAFA',
                    border: '1px solid #E5E7EB',
                    borderRadius: 14,
                    textDecoration: 'none',
                    color: 'inherit',
                    transition: 'border-color 0.2s, box-shadow 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#C4C4C4';
                    e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.06)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#E5E7EB';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <link.icon size={24} color={PRIMARY} strokeWidth={2} />
                  <h4 style={{ fontFamily: FONT_HEADING, fontWeight: 700, fontSize: 17 }}>{link.label}</h4>
                  <p style={{ color: '#737373', fontSize: 14, lineHeight: 1.5, fontFamily: FONT_BODY, margin: 0 }}>{link.desc}</p>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 14, fontWeight: 600, fontFamily: FONT_BODY, color: PRIMARY, marginTop: 4 }}>
                    Learn more <ArrowRight size={14} strokeWidth={2} />
                  </span>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
}
