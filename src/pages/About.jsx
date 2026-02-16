import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FileSearch,
  AlertCircle,
  Search,
  Truck,
  CheckCircle,
  MessageSquare,
  Phone,
} from 'lucide-react';
import { useScrollAnimation, useCounter } from '../hooks/useScrollAnimation';
import { fadeUp, fadeDown, fadeLeft, fadeRight, scaleIn, staggerContainer, staggerItem } from '../animation/variants';
import { springGentle, springSmooth, springSnappy, springBouncy } from '../animation/springs';
import Breadcrumbs from '../components/Breadcrumbs';
import SEOHead from '../components/SEOHead';

/* ─── Counter cell ─── */
function StatCell({ target, suffix, label }) {
  const [ref, isVisible] = useScrollAnimation(0.3);
  const count = useCounter(target, 2000, isVisible);
  return (
    <div ref={ref} style={s.statCell}>
      <span style={s.statNumber}>
        {count}
        {suffix}
      </span>
      <span style={s.statLabel}>{label}</span>
    </div>
  );
}

/* ─── Timeline step ─── */
function TimelineStep({ index, icon: Icon, title, description }) {
  const [ref, isVisible] = useScrollAnimation(0.2);
  const num = String(index + 1).padStart(2, '0');
  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isVisible ? 'visible' : 'hidden'}
      variants={isEven ? fadeLeft : fadeRight}
      style={s.timelineStep}
      className={`sg-timeline-step ${isEven ? 'sg-tl-left' : 'sg-tl-right'}`}
    >
      <div style={s.timelineDot} className="sg-tl-dot" />

      <div style={s.timelineContent} className="sg-tl-content">
        <span style={s.timelineNum}>{num}</span>
        <motion.div
          style={s.timelineIconWrap}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
          transition={springBouncy}
        >
          <Icon size={24} color="#fff" strokeWidth={2} />
        </motion.div>
        <h4 style={s.timelineTitle}>{title}</h4>
        <p style={s.timelineDesc}>{description}</p>
      </div>
    </motion.div>
  );
}

/* ─── Feature item ─── */
function FeatureItem({ text }) {
  return (
    <div style={s.featureItem}>
      <CheckCircle size={20} color="#1A1A1A" strokeWidth={2.5} style={{ flexShrink: 0, marginTop: 2 }} />
      <span style={s.featureText}>{text}</span>
    </div>
  );
}

/* ─── Data ─── */
const STATS = [
  { target: 894, suffix: '+', label: 'Field Staff' },
  { target: 186, suffix: '+', label: 'Support Staff' },
  { target: 200, suffix: '+', label: 'Nationwide Technicians' },
  { target: 500, suffix: '+', label: 'Locations' },
];

const STEPS = [
  {
    icon: FileSearch,
    title: 'Data',
    description:
      'Complete location audits producing shared digital profiles with inventories, glossaries, contacts, and passwords.',
  },
  {
    icon: AlertCircle,
    title: 'Detect',
    description:
      'Multi-channel issue reporting (call, text, email) with immediate ticket creation and resolution focus.',
  },
  {
    icon: Search,
    title: 'Diagnose',
    description:
      'Systematic troubleshooting and pattern analysis to identify permanent solutions for recurring issues.',
  },
  {
    icon: Truck,
    title: 'Dispatch',
    description: 'Full technician management from scheduling through completion.',
  },
  {
    icon: CheckCircle,
    title: 'Done',
    description:
      'Verification process including technician confirmation, store manager contact, and written sign-off documentation.',
  },
  {
    icon: MessageSquare,
    title: 'Discuss',
    description:
      'Dedicated technician engagement with weekly/monthly/quarterly strategic meetings.',
  },
];

const FEATURES = [
  'Flat monthly pricing \u2014 no hidden fees',
  '24/7/365 support',
  'Call, text, chat, email channels',
  'POS, A/V, security, vendor support',
  'Proactive system monitoring',
  'Customer portal with dashboard',
  'Dedicated account managers',
  'Custom SLO/SLE agreements',
  'Weekly strategy meetings',
  'Per-location billing breakouts',
];

/* ======================================================
   ABOUT PAGE
   ====================================================== */
export default function About() {
  return (
    <>
      <SEOHead
        title="About Us — SpecGravity"
        description="Founded in 2014 by three executives who lived the pain of broken restaurant tech. Learn the SpecGravity story, our methodology, and what drives us."
        path="/about"
      />

      {/* --- 1. HERO --- */}
      <section style={s.hero} className="dot-pattern">
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <Breadcrumbs />
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            style={{ textAlign: 'center', marginTop: 24 }}
          >
            <motion.h1
              variants={fadeDown}
              className="display-xl"
              style={s.heroHeadline}
            >
              The SpecGravity Story
            </motion.h1>
            <motion.p variants={fadeUp} style={s.heroSub}>
              Founded in 2014 by three executives who lived the pain of broken
              restaurant tech&nbsp;&mdash; and built the solution.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* --- 2. ORIGIN STORY --- */}
      <section className="section" style={s.originSection}>
        <div className="container">
          <div style={s.originGrid} className="sg-origin-grid">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={staggerContainer}
            >
              <motion.h2
                variants={fadeRight}
                style={{ fontFamily: "'Sora', sans-serif", marginBottom: 24 }}
              >
                Where It All Started
              </motion.h2>
              <motion.p variants={fadeUp} style={s.originBody}>
                When Crumbs Bake Shop (NASDAQ: CRMB) closed in 2014, the
                founders realized excessive overhead during store openings
                contributed to failure. They built SpecGravity to help brands
                open and operate technology at the most efficient capacity with
                competitive cost models.
              </motion.p>
              <motion.blockquote variants={fadeLeft} style={s.pullQuote}>
                &ldquo;8 years and hundreds of projects later, it&rsquo;s safe to
                say the model works.&rdquo;
              </motion.blockquote>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={scaleIn}
              style={s.originGraphic}
              className="sg-origin-graphic"
            >
              <div style={s.originGraphicInner} />
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- 3. STATS BAR --- */}
      <section style={s.statsBar} className="dot-pattern">
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="grid-4" style={s.statsGrid}>
            {STATS.map((stat) => (
              <StatCell key={stat.label} {...stat} />
            ))}
          </div>
        </div>
      </section>

      {/* --- 4. THE SPECGRAVITY WAY --- */}
      <section className="section" style={{ background: '#fff' }}>
        <div className="container">
          <div className="section-header">
            <motion.h2
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeDown}
              style={{ fontFamily: "'Sora', sans-serif" }}
            >
              The SpecGravity Way
            </motion.h2>
            <motion.p
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              style={{ color: '#737373', maxWidth: 600, margin: '12px auto 0' }}
            >
              Our proven 6-step methodology for managing your technology
            </motion.p>
          </div>

          <div style={s.timeline} className="sg-timeline">
            <div style={s.timelineLine} className="sg-tl-line" />
            {STEPS.map((step, i) => (
              <TimelineStep key={step.title} index={i} {...step} />
            ))}
          </div>
        </div>
      </section>

      {/* --- 5. WHAT'S INCLUDED --- */}
      <section className="section section-alt">
        <div className="container">
          <div className="section-header">
            <motion.h2
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={scaleIn}
              style={{ fontFamily: "'Sora', sans-serif" }}
            >
              Everything You Need, Nothing You Don&rsquo;t
            </motion.h2>
          </div>

          <motion.div
            style={s.featuresGrid}
            className="sg-features-grid"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
          >
            {FEATURES.map((f) => (
              <motion.div key={f} variants={staggerItem}>
                <FeatureItem text={f} />
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            variants={fadeUp}
            style={s.includedCallout}
          >
            No additional software. No hardware changes. No mandatory training.
            No app installations. Zero friction to get started.
          </motion.div>
        </div>
      </section>

      {/* --- 6. PHILOSOPHY --- */}
      <section className="section" style={{ background: '#fff' }}>
        <div className="container" style={{ maxWidth: 800, textAlign: 'center' }}>
          <motion.blockquote
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            variants={scaleIn}
            style={s.philoQuote}
          >
            &ldquo;The business comes first, IT follows.&rdquo;
          </motion.blockquote>
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            variants={fadeUp}
            style={s.philoBody}
          >
            Technology should enable business goals, not dictate them. At
            SpecGravity we manage your assets <em>and</em> your expectations
            &mdash; ensuring every system, vendor, and dollar works in service of
            the operation, not the other way around.
          </motion.p>
        </div>
      </section>

      {/* --- 7. CTA BANNER --- */}
      <section style={s.ctaBanner} className="dot-pattern">
        <div
          className="container"
          style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}
        >
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeDown}
            style={s.ctaHeadline}
          >
            Ready to{' '}
            <span className="gradient-text">Simplify</span> Your Tech?
          </motion.h2>
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            style={s.ctaSub}
          >
            Join 500+ locations that trust SpecGravity. No contracts. No hardware
            changes. Just better support.
          </motion.p>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={scaleIn}
            style={s.ctaActions}
          >
            <Link to="/contact" className="btn btn-primary-lg">
              Book Your Free Demo
            </Link>
            <a href="tel:8447004728" style={s.ctaPhone}>
              <Phone size={16} />
              Or call us: 844-700-GRAV
            </a>
          </motion.div>
        </div>
      </section>

      {/* --- Responsive styles --- */}
      <style>{`
        .sg-origin-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 48px;
          align-items: center;
        }
        @media (min-width: 1024px) {
          .sg-origin-grid {
            grid-template-columns: 1fr 1fr;
            gap: 64px;
          }
        }
        .sg-origin-graphic {
          min-height: 280px;
        }
        @media (min-width: 1024px) {
          .sg-origin-graphic {
            min-height: 400px;
          }
        }
        .sg-features-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 20px;
          max-width: 900px;
          margin: 0 auto;
        }
        @media (min-width: 640px) {
          .sg-features-grid {
            grid-template-columns: 1fr 1fr;
          }
        }
        @media (min-width: 1024px) {
          .sg-stat-number {
            font-size: 60px !important;
          }
        }
        .sg-timeline {
          position: relative;
          max-width: 900px;
          margin: 0 auto;
        }
        .sg-tl-line {
          position: absolute;
          top: 0;
          bottom: 0;
          width: 2px;
          background: linear-gradient(180deg, #0A0A0A 0%, rgba(0,0,0,0.1) 100%);
          left: 20px;
        }
        .sg-timeline-step {
          position: relative;
          padding-left: 56px;
          margin-bottom: 48px;
        }
        .sg-timeline-step:last-child {
          margin-bottom: 0;
        }
        .sg-tl-dot {
          position: absolute;
          left: 12px;
          top: 6px;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: #1A1A1A;
          border: 3px solid #fff;
          box-shadow: 0 0 0 2px #0A0A0A, 0 0 8px rgba(0,0,0,0.15);
          z-index: 2;
        }
        @media (min-width: 1024px) {
          .sg-tl-line {
            left: 50%;
            transform: translateX(-50%);
          }
          .sg-timeline-step {
            width: 50%;
            padding-left: 0;
          }
          .sg-timeline-step.sg-tl-left {
            margin-left: 0;
            padding-right: 48px;
            text-align: right;
          }
          .sg-timeline-step.sg-tl-left .sg-tl-content {
            align-items: flex-end;
          }
          .sg-timeline-step.sg-tl-left .sg-tl-dot {
            left: auto;
            right: -9px;
          }
          .sg-timeline-step.sg-tl-right {
            margin-left: 50%;
            padding-left: 48px;
            text-align: left;
          }
          .sg-timeline-step.sg-tl-right .sg-tl-content {
            align-items: flex-start;
          }
          .sg-timeline-step.sg-tl-right .sg-tl-dot {
            left: -9px;
          }
        }
      `}</style>
    </>
  );
}

/* ======================================================
   STYLES
   ====================================================== */
const s = {
  hero: {
    background: 'linear-gradient(135deg, #0a0a0a 0%, #111111 50%, #0d0d0d 100%)',
    paddingTop: 160,
    paddingBottom: 96,
    position: 'relative',
    overflow: 'hidden',
  },
  heroHeadline: {
    fontFamily: "'Sora', sans-serif",
    color: '#fff',
    marginBottom: 20,
  },
  heroSub: {
    fontFamily: "'Inter', sans-serif",
    fontSize: 18,
    lineHeight: 1.7,
    color: 'rgba(255,255,255,0.65)',
    maxWidth: 640,
    margin: '0 auto',
  },

  originSection: {
    background: '#fff',
  },
  originGrid: {},
  originBody: {
    fontFamily: "'Inter', sans-serif",
    fontSize: 16,
    lineHeight: 1.75,
    color: '#404040',
    marginBottom: 32,
  },
  pullQuote: {
    fontFamily: "'Inter', sans-serif",
    fontSize: 20,
    fontStyle: 'italic',
    lineHeight: 1.6,
    color: '#1a1a1a',
    borderLeft: '4px solid #1A1A1A',
    paddingLeft: 24,
    margin: 0,
  },
  originGraphic: {
    borderRadius: 20,
    background: 'linear-gradient(135deg, rgba(0,0,0,0.06) 0%, rgba(0,0,0,0.04) 100%)',
    position: 'relative',
    overflow: 'hidden',
  },
  originGraphicInner: {
    position: 'absolute',
    inset: 0,
    background:
      'radial-gradient(circle at 30% 40%, rgba(0,0,0,0.12) 0%, transparent 60%), ' +
      'radial-gradient(circle at 70% 70%, rgba(0,0,0,0.08) 0%, transparent 50%)',
    borderRadius: 20,
  },

  statsBar: {
    background: 'linear-gradient(135deg, #0a0a0a 0%, #111111 50%, #0d0d0d 100%)',
    padding: '64px 0',
    position: 'relative',
    overflow: 'hidden',
  },
  statsGrid: {
    textAlign: 'center',
  },
  statCell: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 8,
    padding: '16px 0',
  },
  statNumber: {
    fontFamily: "'Sora', sans-serif",
    fontSize: 48,
    fontWeight: 700,
    color: '#fff',
    lineHeight: 1.1,
    letterSpacing: '-0.02em',
  },
  statLabel: {
    fontFamily: "'Inter', sans-serif",
    fontSize: 14,
    fontWeight: 500,
    color: 'rgba(255,255,255,0.55)',
    textTransform: 'uppercase',
    letterSpacing: '0.06em',
  },

  timeline: {
    position: 'relative',
  },
  timelineLine: {},
  timelineStep: {
    position: 'relative',
  },
  timelineDot: {},
  timelineContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
  },
  timelineNum: {
    fontFamily: "'Sora', sans-serif",
    fontSize: 40,
    fontWeight: 700,
    color: 'rgba(0,0,0,0.08)',
    lineHeight: 1,
    letterSpacing: '-0.02em',
  },
  timelineIconWrap: {
    width: 48,
    height: 48,
    borderRadius: '50%',
    background: '#1A1A1A',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  timelineTitle: {
    fontFamily: "'Sora', sans-serif",
    fontSize: 20,
    fontWeight: 700,
    color: '#0A0A0A',
    lineHeight: 1.3,
  },
  timelineDesc: {
    fontFamily: "'Inter', sans-serif",
    fontSize: 15,
    lineHeight: 1.65,
    color: '#737373',
    maxWidth: 360,
  },

  featuresGrid: {},
  featureItem: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: 12,
  },
  featureText: {
    fontFamily: "'Inter', sans-serif",
    fontSize: 15,
    lineHeight: 1.55,
    color: '#404040',
  },
  includedCallout: {
    maxWidth: 700,
    margin: '48px auto 0',
    padding: 32,
    background: 'linear-gradient(135deg, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0.6) 100%)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(0,0,0,0.1)',
    borderLeft: '4px solid #1A1A1A',
    borderRadius: 16,
    fontFamily: "'Inter', sans-serif",
    fontSize: 16,
    fontWeight: 600,
    lineHeight: 1.7,
    color: '#1a1a1a',
    textAlign: 'center',
  },

  philoQuote: {
    fontFamily: "'Sora', sans-serif",
    fontSize: 36,
    fontWeight: 700,
    lineHeight: 1.25,
    color: '#0A0A0A',
    marginBottom: 24,
    letterSpacing: '-0.02em',
    border: 'none',
    padding: 0,
  },
  philoBody: {
    fontFamily: "'Inter', sans-serif",
    fontSize: 17,
    lineHeight: 1.75,
    color: '#737373',
  },

  ctaBanner: {
    background: 'linear-gradient(135deg, #0a0a0a 0%, #111111 50%, #0d0d0d 100%)',
    padding: '96px 0',
    position: 'relative',
    overflow: 'hidden',
  },
  ctaHeadline: {
    fontFamily: "'Sora', sans-serif",
    fontSize: 40,
    fontWeight: 700,
    color: '#fff',
    lineHeight: 1.15,
    marginBottom: 16,
    letterSpacing: '-0.02em',
  },
  ctaSub: {
    fontFamily: "'Inter', sans-serif",
    fontSize: 17,
    lineHeight: 1.7,
    color: 'rgba(255,255,255,0.6)',
    maxWidth: 560,
    margin: '0 auto 36px',
  },
  ctaActions: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 16,
  },
  ctaPhone: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 8,
    fontFamily: "'Inter', sans-serif",
    fontSize: 14,
    fontWeight: 500,
    color: 'rgba(255,255,255,0.7)',
    background: 'rgba(255,255,255,0.06)',
    border: '1px solid rgba(255,255,255,0.15)',
    backdropFilter: 'blur(10px)',
    borderRadius: 9999,
    padding: '10px 24px',
    textDecoration: 'none',
    transition: 'border-color 0.2s ease, color 0.2s ease',
  },
};
