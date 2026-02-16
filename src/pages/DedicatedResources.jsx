import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronDown,
  ArrowRight,
  Clock,
  DollarSign,
  AlertTriangle,
  BadgeCheck,
  Heart,
  Compass,
  Building,
  Check,
  Zap,
  Shield,
  TrendingUp,
  UtensilsCrossed,
  Truck,
  Headphones,
  Store,
} from 'lucide-react';
import {
  fadeUp,
  fadeDown,
  fadeLeft,
  scaleIn,
  staggerContainer,
  staggerItem,
} from '../animation/variants';
import { springSnappy, springGentle } from '../animation/springs';
import CardTilt from '../components/CardTilt';
import GlowOrb from '../components/GlowOrb';
import MagneticButton from '../components/MagneticButton';
import Breadcrumbs from '../components/Breadcrumbs';
import SEOHead from '../components/SEOHead';

/* ─── data ─── */

const PAIN_POINTS = [
  {
    icon: Clock,
    title: 'Hiring Takes Months',
    desc: 'The average IT hire takes 60+ days to fill. Every week without coverage is a week your team falls behind.',
  },
  {
    icon: DollarSign,
    title: 'Total Cost Is Hidden',
    desc: 'Salary is just the start. Benefits, recruiting fees, onboarding, equipment, and turnover risk add 30-40% to the real cost.',
  },
  {
    icon: AlertTriangle,
    title: 'Turnover Disrupts Everything',
    desc: 'IT professionals change jobs every 2-3 years. Each departure resets institutional knowledge and stalls projects.',
  },
];

const VALUE_PROPS = [
  {
    icon: BadgeCheck,
    title: 'Fully Vetted, Fixed Cost',
    desc: 'One fully loaded monthly rate. No recruitment fees, no surprise costs. Every resource is background-checked and technically validated.',
  },
  {
    icon: Heart,
    title: 'Dedicated to Your Brand',
    desc: 'Your resource identifies as your employee. They wear your badge, learn your culture, and work exclusively for you.',
  },
  {
    icon: Compass,
    title: 'Directed by Your Leadership',
    desc: 'Your technical leads set the priorities. We provide the talent — you provide the direction.',
  },
  {
    icon: Building,
    title: 'HR, Benefits & Payroll by SpecGravity',
    desc: 'We handle onboarding, benefits administration, PTO, payroll, and all employment compliance.',
  },
];

const INCLUDED = [
  '40 hours/week aligned with your office schedule',
  '~1,880 billable hours annually',
  'Complete benefits, PTO, and holidays',
  'Monthly status reports and performance reviews',
  'Onsite or remote placement — your choice',
  'Pre-placement brand interviews',
  'Potential transition to full employee status',
];

const TIERS = [
  {
    icon: Zap,
    name: 'Single Resource',
    desc: 'One dedicated IT professional embedded in your team. Ideal for brands that need a reliable onsite or remote technician without the hiring overhead.',
    cta: 'Get a Quote',
  },
  {
    icon: Shield,
    name: 'Team Placement',
    desc: 'Multiple resources placed across locations or departments. Coordinated by SpecGravity, directed by your leadership. Volume pricing available.',
    cta: 'Build Your Team',
  },
  {
    icon: TrendingUp,
    name: 'Scale-On-Demand',
    desc: 'Start with one and grow as needed. Add or reduce headcount with 30-day notice — no long-term contracts required. True flexibility.',
    cta: 'Talk to Us',
  },
];

const FAQ_DATA = [
  {
    q: 'How is a dedicated resource different from a contractor or temp?',
    a: 'A dedicated resource works exclusively for your brand full-time. They learn your systems, attend your meetings, and identify as part of your team. Unlike contractors who juggle multiple clients, your resource is 100% focused on your priorities — we just handle employment logistics.',
  },
  {
    q: 'What does the onboarding process look like?',
    a: 'We present pre-vetted candidates for your team to interview. Once selected, we handle all employment paperwork, benefits enrollment, and compliance. Your resource begins orientation with your team within 2-3 weeks of selection. We also provide a 90-day performance guarantee.',
  },
  {
    q: 'Can we scale up or down as our needs change?',
    a: 'Yes. Our engagement model is built for flexibility. You can add additional resources with 2-3 weeks lead time or reduce headcount with 30-day notice. No long-term contracts or early termination penalties.',
  },
  {
    q: 'How do we communicate day-to-day with the resource?',
    a: 'Your dedicated resource operates exactly like an in-house employee. They join your Slack, Teams, or email. They attend your standups. Your managers assign work directly. SpecGravity stays available for HR, performance, and administrative needs behind the scenes.',
  },
  {
    q: 'What happens if the resource isn\'t the right fit?',
    a: 'We offer a 90-day performance guarantee. If the resource doesn\'t meet expectations within the first 90 days, we replace them at no additional cost. After that, we work with you on performance improvement or replacement with 30-day notice.',
  },
];

const SIBLING_SOLUTIONS = [
  { to: '/solutions/hospitality', icon: UtensilsCrossed, label: 'Hospitality IT', desc: 'POS, networking, and 24/7 support for restaurants' },
  { to: '/solutions/retail', icon: Store, label: 'Retail IT', desc: 'Technology support for retail brands' },
  { to: '/solutions/nationwide-dispatching', icon: Truck, label: 'Nationwide Dispatching', desc: 'On-site technicians coast to coast' },
  { to: '/solutions/office-support', icon: Headphones, label: 'Office Tech Support', desc: 'Flat-rate support for your headquarters' },
];

/* ─── FAQ Accordion Item ─── */
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

/* ─── Component ─── */
export default function DedicatedResources() {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <>
      <SEOHead
        title="Dedicated IT Resources — SpecGravity"
        description="Expand your IT department without the HR headache. Dedicated, full-time IT professionals on our payroll, embedded in your brand. Fixed monthly cost, no recruitment fees."
        path="/solutions/dedicated-resources"
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
              Dedicated IT Resources
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
              Your IT Team,{' '}
              <span className="gradient-text">Our Payroll.</span>
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
              Expand your IT department without the HR headache. Full-time,
              dedicated professionals embedded in your brand — managed,
              supported, and employed by SpecGravity.
            </p>
            <MagneticButton>
              <Link to="/contact" className="btn btn-primary-lg">
                Get a Custom Quote
                <ArrowRight size={18} strokeWidth={2} />
              </Link>
            </MagneticButton>
          </motion.div>
        </div>
      </section>

      {/* ════════ 2. PAIN AGITATION ════════ */}
      <section className="section">
        <div className="container">
          <motion.div
            className="section-header"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <h2>Hiring IT Talent Is Slow, Expensive, and Risky</h2>
            <p>The traditional staffing model is broken for growing brands</p>
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

      {/* ════════ 3. VALUE PROPOSITION ════════ */}
      <section className="section section-alt">
        <div className="container">
          <motion.div
            className="section-header"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <h2>A Dedicated Resource, Not a Contractor</h2>
            <p>The talent you need without the overhead you don't</p>
          </motion.div>

          <motion.div
            className="grid-2"
            style={{ maxWidth: 960, margin: '0 auto' }}
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {VALUE_PROPS.map(({ icon: Icon, title, desc }) => (
              <CardTilt key={title}>
                <motion.div
                  variants={staggerItem}
                  style={{
                    display: 'flex',
                    gap: 20,
                    alignItems: 'flex-start',
                    height: '100%',
                    padding: 24,
                    background: 'var(--card-bg)',
                    border: '1px solid var(--border)',
                    borderRadius: 14,
                  }}
                >
                  <div
                    style={{
                      flexShrink: 0,
                      width: 52,
                      height: 52,
                      borderRadius: 12,
                      background: 'var(--accent-light)',
                      border: '1px solid var(--border)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Icon size={24} color="var(--accent)" strokeWidth={2} />
                  </div>
                  <div>
                    <h4 style={{ fontWeight: 700, fontSize: 17, marginBottom: 8 }}>{title}</h4>
                    <p style={{ color: 'var(--text-muted)', fontSize: 14, lineHeight: 1.6 }}>{desc}</p>
                  </div>
                </motion.div>
              </CardTilt>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ════════ 4. WHAT'S INCLUDED ════════ */}
      <section className="section" style={{ background: 'var(--card-bg)' }}>
        <div className="container">
          <motion.div
            className="section-header"
            variants={fadeDown}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <h2>What's Included</h2>
            <p>Everything you need from day one</p>
          </motion.div>

          <motion.div
            style={{
              maxWidth: 640,
              margin: '0 auto',
              background: 'var(--alt-bg)',
              border: '1px solid var(--border)',
              borderRadius: 14,
              padding: '8px 0',
            }}
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {INCLUDED.map((item) => (
              <motion.div
                key={item}
                variants={staggerItem}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 16,
                  padding: '14px 24px',
                }}
              >
                <div
                  style={{
                    flexShrink: 0,
                    width: 24,
                    height: 24,
                    borderRadius: '50%',
                    background: 'var(--accent-light)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Check size={14} color="var(--accent)" strokeWidth={2.5} />
                </div>
                <span style={{ fontSize: 15, fontWeight: 500, color: 'var(--text-primary)' }}>{item}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ════════ 5. ENGAGEMENT MODELS ════════ */}
      <section className="section section-alt">
        <div className="container">
          <motion.div
            className="section-header"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <h2>Flexible Engagement Models</h2>
            <p>Right-sized IT staffing for every stage of growth</p>
          </motion.div>

          <motion.div
            className="grid-3"
            style={{ maxWidth: 1040, margin: '0 auto' }}
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {TIERS.map(({ icon: Icon, name, desc, cta }) => (
              <CardTilt key={name}>
                <motion.div
                  variants={staggerItem}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 16,
                    padding: 32,
                    background: 'var(--card-bg)',
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
                    <Icon size={24} color="var(--accent)" strokeWidth={2} />
                  </div>
                  <h4 style={{ fontWeight: 700, fontSize: 18 }}>{name}</h4>
                  <p style={{ color: 'var(--text-muted)', fontSize: 14, lineHeight: 1.7, flex: 1 }}>{desc}</p>
                  <Link
                    to="/contact"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 6,
                      fontSize: 14,
                      fontWeight: 600,
                      color: 'var(--accent)',
                      textDecoration: 'none',
                      marginTop: 4,
                    }}
                  >
                    {cta} <ArrowRight size={14} strokeWidth={2} />
                  </Link>
                </motion.div>
              </CardTilt>
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
            <p>Common questions about dedicated resource placement</p>
          </motion.div>

          <motion.div
            style={{ maxWidth: 720, margin: '0 auto' }}
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {FAQ_DATA.map((faq, i) => (
              <motion.div key={i} variants={staggerItem}>
                <FAQItem
                  question={faq.q}
                  answer={faq.a}
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
          position: 'relative',
          overflow: 'hidden',
          background: 'var(--dark-hero)',
          color: '#fff',
        }}
      >
        <GlowOrb size={500} color="rgba(37, 99, 235, 0.06)" />

        <div className="container" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <motion.h2
            className="display-lg"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            style={{
              fontWeight: 700,
              letterSpacing: '-0.02em',
              lineHeight: 1.1,
              color: '#fff',
              marginBottom: 16,
            }}
          >
            Scale Your Team{' '}
            <span className="gradient-text">Today</span>
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
              marginBottom: 36,
              maxWidth: 520,
              margin: '0 auto 36px',
            }}
          >
            Dedicated IT talent on our payroll, embedded in your brand.
            No recruiting. No overhead. No risk.
          </motion.p>
          <motion.div
            variants={scaleIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <MagneticButton>
              <Link to="/contact" className="btn btn-primary-lg">
                Book a Consultation
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
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <h2>Explore Other Solutions</h2>
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
            {SIBLING_SOLUTIONS.map(({ to, icon: Icon, label, desc }) => (
              <motion.div key={to} variants={staggerItem}>
                <Link
                  to={to}
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
    </>
  );
}
