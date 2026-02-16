import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BadgeCheck,
  Heart,
  Compass,
  Building,
  Check,
  ChevronDown,
  ArrowRight,
  Headphones,
  Truck,
  Monitor,
  Zap,
  Shield,
  TrendingUp,
  AlertTriangle,
  Clock,
  DollarSign,
  Users,
  UtensilsCrossed,
} from 'lucide-react';
import { fadeUp, fadeDown, fadeLeft, fadeRight, scaleIn, staggerContainer, staggerItem } from '../animation/variants';
import { springSnappy, springGentle } from '../animation/springs';
import CardTilt from '../components/CardTilt';
import Breadcrumbs from '../components/Breadcrumbs';
import SEOHead from '../components/SEOHead';

/* ─── data ─── */
const painPoints = [
  { icon: Clock, title: 'Hiring Takes Months', desc: 'The average IT hire takes 60+ days to fill. Every week without coverage is a week your team falls behind.' },
  { icon: DollarSign, title: 'Total Cost Is Hidden', desc: 'Salary is just the start. Benefits, recruiting fees, onboarding, equipment, and turnover risk add 30-40% to the real cost.' },
  { icon: AlertTriangle, title: 'Turnover Disrupts Everything', desc: 'IT professionals change jobs every 2-3 years. Each departure resets institutional knowledge and stalls projects.' },
];

const valueProps = [
  { icon: BadgeCheck, title: 'Fully Vetted, Fixed Cost', desc: 'One fully loaded monthly rate. No recruitment fees, no surprise costs. Every resource is background-checked and technically validated.' },
  { icon: Heart, title: 'Dedicated to Your Brand', desc: 'Your resource identifies as your employee. They wear your badge, learn your culture, and work exclusively for you.' },
  { icon: Compass, title: 'Directed by Your Leadership', desc: 'Your technical leads set the priorities. We provide the talent — you provide the direction.' },
  { icon: Building, title: 'HR, Benefits & Payroll by SpecGravity', desc: 'We handle onboarding, benefits administration, PTO, payroll, and all employment compliance.' },
];

const included = [
  '40 hours/week aligned with your office schedule',
  '~1,880 billable hours annually',
  'Complete benefits, PTO, and holidays',
  'Monthly status reports and performance reviews',
  'Onsite or remote placement — your choice',
  'Pre-placement brand interviews',
  'Potential transition to full employee status',
];

const tiers = [
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

const faqs = [
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

const siblingLinks = [
  { to: '/solutions/hospitality', icon: UtensilsCrossed, label: 'Hospitality IT', desc: 'POS, networking, and 24/7 support for restaurants' },
  { to: '/solutions/nationwide-dispatching', icon: Truck, label: 'Nationwide Dispatching', desc: '200+ technicians coast to coast' },
  { to: '/solutions/office-support', icon: Headphones, label: 'Office Tech Support', desc: 'Flat-rate support for your headquarters' },
  { to: '/solutions/retail', icon: Monitor, label: 'Retail IT', desc: 'Technology support for retail brands' },
];

/* ─── component ─── */
export default function DedicatedResources() {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <>
      <SEOHead
        title="Dedicated IT Resources — SpecGravity"
        description="Expand your IT department without the HR headache. Dedicated, full-time IT professionals on our payroll, embedded in your brand. Fixed monthly cost, no recruitment fees."
        path="/solutions/dedicated-resources"
      />

      {/* ── Section 1: Hero ── */}
      <section
        className="dot-pattern"
        style={{
          position: 'relative',
          overflow: 'hidden',
          background: 'var(--dark-hero)',
          padding: 'clamp(120px, 12vw, 160px) 0 clamp(64px, 8vw, 96px)',
        }}
      >
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
              style={{ color: '#fff', marginBottom: 24 }}
            >
              Your IT Team,{' '}
              <span className="gradient-text">Our Payroll.</span>
            </motion.h1>

            <motion.p
              className="body-large"
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              style={{ color: 'rgba(255,255,255,0.7)', maxWidth: 640, margin: '0 auto 36px', lineHeight: 1.6 }}
            >
              Expand your IT department without the HR headache.
            </motion.p>

            <motion.div
              variants={scaleIn}
              initial="hidden"
              animate="visible"
            >
              <Link to="/contact" className="btn btn-primary-lg">
                Get a Custom Quote
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Section 2: Problem Agitation ── */}
      <section className="section" style={{ background: 'var(--card-bg)' }}>
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
            {painPoints.map((item) => (
              <motion.div
                key={item.title}
                variants={staggerItem}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 12,
                  padding: 28,
                  background: 'var(--alt-bg)',
                  border: '1px solid var(--border)',
                  borderRadius: 14,
                }}
              >
                <item.icon size={24} color="var(--primary)" strokeWidth={2} />
                <h4 style={{ fontWeight: 700, fontSize: 17 }}>{item.title}</h4>
                <p style={{ color: 'var(--text-muted)', fontSize: 14, lineHeight: 1.7 }}>{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Section 3: Value Proposition ── */}
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
            {valueProps.map((item) => (
              <CardTilt key={item.title}>
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
                  <div style={{
                    flexShrink: 0,
                    width: 52,
                    height: 52,
                    borderRadius: 12,
                    background: 'rgba(0,0,0,0.04)',
                    border: '1px solid rgba(0,0,0,0.08)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    <item.icon size={24} color="var(--primary)" strokeWidth={2} />
                  </div>
                  <div>
                    <h4 style={{ fontWeight: 700, fontSize: 17, marginBottom: 8 }}>{item.title}</h4>
                    <p style={{ color: 'var(--text-muted)', fontSize: 14, lineHeight: 1.6 }}>{item.desc}</p>
                  </div>
                </motion.div>
              </CardTilt>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Section 4: What's Included ── */}
      <section className="section" style={{ background: 'var(--card-bg)' }}>
        <div className="container">
          <motion.div
            className="section-header"
            variants={fadeRight}
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
            {included.map((item) => (
              <motion.div
                key={item}
                variants={fadeLeft}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 16,
                  padding: '14px 24px',
                }}
              >
                <div style={{
                  flexShrink: 0,
                  width: 24,
                  height: 24,
                  borderRadius: '50%',
                  background: 'rgba(0,0,0,0.06)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <Check size={14} color="var(--primary)" strokeWidth={2.5} />
                </div>
                <span style={{ fontSize: 15, fontWeight: 500, color: 'var(--text-primary)' }}>{item}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Section 5: Flexible Engagement Models ── */}
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
            {tiers.map((tier) => (
              <CardTilt key={tier.name}>
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
                  <tier.icon size={28} color="var(--primary)" strokeWidth={2} />
                  <h4 style={{ fontWeight: 700, fontSize: 18 }}>{tier.name}</h4>
                  <p style={{ color: 'var(--text-muted)', fontSize: 14, lineHeight: 1.7, flex: 1 }}>{tier.desc}</p>
                  <Link
                    to="/contact"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 6,
                      fontSize: 14,
                      fontWeight: 600,
                      color: 'var(--primary)',
                      textDecoration: 'none',
                      marginTop: 4,
                    }}
                  >
                    {tier.cta} <ArrowRight size={14} strokeWidth={2} />
                  </Link>
                </motion.div>
              </CardTilt>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Section 6: FAQ ── */}
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
                  aria-expanded={openFaq === i}
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
          position: 'relative',
          overflow: 'hidden',
          background: 'var(--dark-hero)',
          padding: 'clamp(64px, 8vw, 96px) 0',
        }}
      >
        <div style={{
          position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
          width: 500, height: 500,
          background: 'radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        <div className="container" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <motion.h2
            className="display-lg"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            style={{ color: '#fff', marginBottom: 20 }}
          >
            Scale Your Team{' '}
            <span className="gradient-text">Today</span>
          </motion.h2>
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            style={{ color: 'rgba(255,255,255,0.7)', fontSize: 18, maxWidth: 560, margin: '0 auto 36px', lineHeight: 1.6 }}
          >
            Dedicated IT talent on our payroll, embedded in your brand. No recruiting. No overhead.
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
            {siblingLinks.map((link) => (
              <motion.div key={link.to} variants={staggerItem}>
                <Link
                  to={link.to}
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
                  <link.icon size={28} color="var(--primary)" strokeWidth={1.5} />
                  <span style={{ fontSize: 15, fontWeight: 600, color: 'var(--text-primary)' }}>
                    {link.label}
                  </span>
                  <ArrowRight size={16} color="var(--text-muted)" strokeWidth={2} />
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
}
