import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  MapPin,
  Phone,
  Loader2,
  Check,
} from 'lucide-react';
import { fadeUp, fadeLeft, fadeRight } from '../animation/variants';
import { springSnappy, springGentle } from '../animation/springs';
import FloatingLabel from '../components/FloatingLabel';
import SEOHead from '../components/SEOHead';

/* ─── constants ─── */

/* ─── sub-components ─── */

function SubmitButton({ status }) {
  const config = {
    idle: {
      label: 'Send Message',
      icon: null,
      className: 'btn btn-primary',
    },
    submitting: {
      label: 'Sending...',
      icon: <Loader2 size={18} className="contact-spinner" />,
      className: 'btn btn-primary',
    },
    success: {
      label: 'Message Sent!',
      icon: <Check size={18} />,
      className: 'btn contact-btn-success',
    },
    error: {
      label: 'Failed \u2014 Try Again',
      icon: null,
      className: 'btn contact-btn-error',
    },
  };

  const { label, icon, className } = config[status];

  return (
    <motion.button
      type="submit"
      className={className}
      disabled={status === 'submitting' || status === 'success'}
      whileTap={status === 'idle' || status === 'error' ? { scale: 0.97 } : {}}
      style={{ width: '100%', height: 48, fontSize: 16, fontWeight: 600 }}
    >
      {icon}
      {label}
    </motion.button>
  );
}

/* ─── main component ─── */

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error
  const [errors, setErrors] = useState({});
  const [messageFocused, setMessageFocused] = useState(false);

  const validate = () => {
    const next = {};
    if (!name.trim()) next.name = 'Name is required';
    if (!email.trim()) next.email = 'Email is required';
    else if (!email.includes('@') || !email.includes('.')) next.email = 'Enter a valid email address';
    if (!message.trim()) next.message = 'Message is required';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus('submitting');
    try {
      const res = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone, message }),
      });
      if (res.ok) setStatus('success');
      else setStatus('error');
    } catch {
      setStatus('error');
    }
  };

  const messageActive = messageFocused || message !== '';

  return (
    <>
      <SEOHead
        title="Contact Us — SpecGravity"
        description="Get in touch with SpecGravity. We respond within one hour to every inquiry about managed IT support for multi-unit restaurant, retail, and hospitality brands."
        path="/contact"
      />

      {/* ── Hero ── */}
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
            left: '-10%',
            width: 600,
            height: 600,
            background: 'radial-gradient(circle, rgba(255,255,255,0.06) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />

        <div className="container" style={{ position: 'relative', zIndex: 1, textAlign: 'center', maxWidth: 900, margin: '0 auto' }}>
          <motion.h1
            className="display-xl"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            style={{ color: '#fff', marginBottom: 20 }}
          >
            Let's Talk About Your Tech
          </motion.h1>
          <motion.p
            className="body-large"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ ...springGentle, delay: 0.1 }}
            style={{ color: 'rgba(255,255,255,0.7)', maxWidth: 640, margin: '0 auto', lineHeight: 1.6 }}
          >
            Your request will be reviewed immediately and we'll contact you within one hour.
          </motion.p>
        </div>
      </section>

      {/* ── Contact Content ── */}
      <section className="section" style={{ background: '#fff' }}>
        <div className="container" style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div className="contact-layout">
            {/* Left — Form */}
            <motion.div
              variants={fadeLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <FloatingLabel
                  label="Name"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  error={errors.name}
                />

                <FloatingLabel
                  label="Email"
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  error={errors.email}
                />

                <FloatingLabel
                  label="Phone (optional)"
                  type="tel"
                  name="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />

                {/* Textarea with floating-label effect */}
                <div style={{ position: 'relative', marginBottom: errors.message ? 4 : 16 }}>
                  <motion.label
                    htmlFor="message"
                    animate={{
                      y: messageActive ? -24 : 0,
                      scale: messageActive ? 0.85 : 1,
                    }}
                    transition={{ type: 'tween', duration: 0.2, ease: 'easeOut' }}
                    style={{
                      position: 'absolute',
                      left: 0,
                      top: 12,
                      originX: 0,
                      originY: 0,
                      color: errors.message ? '#DC2626' : messageFocused ? '#2563EB' : '#6B7280',
                      pointerEvents: 'none',
                      fontSize: 15,
                      lineHeight: 1,
                      fontFamily: "'Inter', sans-serif",
                    }}
                  >
                    Message *
                  </motion.label>
                  <textarea
                    id="message"
                    name="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onFocus={() => setMessageFocused(true)}
                    onBlur={() => setMessageFocused(false)}
                    rows={4}
                    required
                    style={{
                      width: '100%',
                      padding: '12px 0 8px',
                      fontSize: 15,
                      fontFamily: "'Inter', sans-serif",
                      color: '#1A1A1A',
                      background: 'transparent',
                      border: 'none',
                      borderBottom: `2px solid ${errors.message ? '#DC2626' : messageFocused ? '#2563EB' : '#D1D5DB'}`,
                      outline: 'none',
                      resize: 'vertical',
                      transition: 'border-color 0.2s ease',
                    }}
                  />
                  {errors.message && (
                    <p style={{ margin: '4px 0 0', fontSize: 12, color: '#DC2626', lineHeight: 1.4 }}>
                      {errors.message}
                    </p>
                  )}
                </div>

                <SubmitButton status={status} />
              </form>
            </motion.div>

            {/* Right — Contact Info */}
            <motion.div
              variants={fadeRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              style={{ display: 'flex', flexDirection: 'column', gap: 32 }}
            >
              <h3>Get In Touch</h3>

              {/* MA HQ */}
              <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                <MapPin size={20} style={{ flexShrink: 0, marginTop: 2, color: 'var(--primary)' }} />
                <div>
                  <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 4 }}>Massachusetts HQ</div>
                  <div className="text-muted" style={{ fontSize: 14, lineHeight: 1.6 }}>
                    45 Marion St., Quincy, MA 02170
                  </div>
                </div>
              </div>

              {/* NJ Operations */}
              <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                <MapPin size={20} style={{ flexShrink: 0, marginTop: 2, color: 'var(--primary)' }} />
                <div>
                  <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 4 }}>New Jersey Operations</div>
                  <div className="text-muted" style={{ fontSize: 14, lineHeight: 1.6 }}>
                    116 Village Blvd. Suite 200, Princeton, NJ 08540
                  </div>
                </div>
              </div>

              {/* Phone */}
              <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                <Phone size={20} style={{ flexShrink: 0, marginTop: 2, color: 'var(--primary)' }} />
                <div>
                  <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 4 }}>Phone</div>
                  <a href="tel:8447004728" style={{ color: 'var(--primary)', fontSize: 14, fontWeight: 500 }}>
                    844-700-GRAV (4728)
                  </a>
                </div>
              </div>

              {/* Investor Relations */}
              <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                <Phone size={20} style={{ flexShrink: 0, marginTop: 2, color: 'var(--primary)' }} />
                <div>
                  <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 4 }}>Investor Relations</div>
                  <a href="tel:6466579649" style={{ color: 'var(--primary)', fontSize: 14, fontWeight: 500 }}>
                    (646) 657-9649
                  </a>
                </div>
              </div>

            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
