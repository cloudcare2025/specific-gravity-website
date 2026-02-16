import { useState } from 'react';
import { Link } from 'react-router-dom';

const SOLUTIONS_LINKS = [
  { label: 'Hospitality', to: '/solutions/hospitality' },
  { label: 'Retail', to: '/solutions/retail' },
  { label: 'Nationwide Dispatching', to: '/solutions/nationwide-dispatching' },
  { label: 'Office Tech Support', to: '/solutions/office-support' },
  { label: 'Dedicated Resources', to: '/solutions/dedicated-resources' },
];

const RESOURCES_LINKS = [
  { label: 'Blog', to: '/blog' },
];

const ACCENT = '#2563EB';

export default function Footer() {
  const year = new Date().getFullYear();
  const [email, setEmail] = useState('');
  const [focusedEl, setFocusedEl] = useState(null);

  const s = {
    footer: {
      position: 'relative',
      background: '#0a0a0a',
      color: '#fff',
      overflow: 'hidden',
    },
    topBorder: {
      height: 2,
      background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 25%, rgba(255,255,255,0.6) 50%, rgba(255,255,255,0.4) 75%, transparent 100%)',
    },
    dotOverlay: {
      position: 'absolute',
      inset: 0,
      backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)',
      backgroundSize: '24px 24px',
      pointerEvents: 'none',
    },
    inner: {
      position: 'relative',
      zIndex: 1,
      maxWidth: 1440,
      margin: '0 auto',
      padding: '64px 32px 0',
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: '1fr',
      gap: 48,
    },
    brandCol: {},
    logo: {
      height: 40,
      width: 'auto',
      display: 'block',
      marginBottom: 16,
      filter: 'brightness(0) invert(1)',
    },
    tagline: {
      fontFamily: "'Inter', sans-serif",
      fontSize: 14,
      fontWeight: 500,
      color: 'rgba(255,255,255,0.6)',
      lineHeight: 1.5,
      marginBottom: 20,
    },
    phone: {
      fontFamily: "'Inter', sans-serif",
      fontSize: 14,
      fontWeight: 600,
      color: 'rgba(255,255,255,0.7)',
      textDecoration: 'none',
      transition: 'color 0.15s ease',
      display: 'inline-block',
      marginBottom: 24,
    },
    officeBlock: {
      marginBottom: 20,
    },
    officeLabel: {
      fontFamily: "'Inter', sans-serif",
      fontSize: 12,
      fontWeight: 600,
      color: 'rgba(255,255,255,0.85)',
      textTransform: 'uppercase',
      letterSpacing: '0.05em',
      marginBottom: 4,
    },
    officeAddress: {
      fontFamily: "'Inter', sans-serif",
      fontSize: 14,
      fontWeight: 500,
      color: 'rgba(255,255,255,0.5)',
      lineHeight: 1.5,
    },
    colHeading: {
      fontFamily: "'Sora', sans-serif",
      fontSize: 14,
      fontWeight: 700,
      letterSpacing: '0.06em',
      textTransform: 'uppercase',
      color: '#fff',
      marginBottom: 20,
    },
    colLink: {
      display: 'block',
      fontFamily: "'Inter', sans-serif",
      fontSize: 14,
      fontWeight: 500,
      color: 'rgba(255,255,255,0.5)',
      textDecoration: 'none',
      padding: '6px 0',
      transition: 'color 0.15s ease',
    },
    newsletterLabel: {
      fontFamily: "'Inter', sans-serif",
      fontSize: 13,
      fontWeight: 500,
      color: 'rgba(255,255,255,0.5)',
      marginBottom: 10,
      marginTop: 16,
    },
    newsletterForm: {
      display: 'flex',
      gap: 0,
    },
    newsletterInput: {
      flex: 1,
      fontFamily: "'Inter', sans-serif",
      fontSize: 14,
      fontWeight: 500,
      padding: '10px 14px',
      border: '1px solid rgba(255,255,255,0.15)',
      borderRight: 'none',
      borderRadius: '8px 0 0 8px',
      background: 'rgba(255,255,255,0.06)',
      color: '#fff',
      outline: 'none',
      transition: 'border-color 0.15s ease',
    },
    newsletterBtn: {
      fontFamily: "'Inter', sans-serif",
      fontSize: 14,
      fontWeight: 600,
      padding: '10px 20px',
      border: 'none',
      borderRadius: '0 8px 8px 0',
      background: ACCENT,
      color: '#fff',
      cursor: 'pointer',
      transition: 'background 0.15s ease',
      whiteSpace: 'nowrap',
    },
    bottomBar: {
      position: 'relative',
      zIndex: 1,
      marginTop: 48,
      borderTop: '1px solid rgba(255,255,255,0.08)',
      padding: '24px 32px',
      maxWidth: 1440,
      margin: '48px auto 0',
      display: 'flex',
      flexWrap: 'wrap',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px 24px',
    },
    bottomText: {
      fontFamily: "'Inter', sans-serif",
      fontSize: 13,
      fontWeight: 500,
      color: 'rgba(255,255,255,0.35)',
    },
  };

  const focusRing = {
    outline: `2px solid ${ACCENT}`,
    outlineOffset: '2px',
  };

  const handleFocusVisible = (id) => (e) => {
    if (e.target.matches(':focus-visible')) {
      setFocusedEl(id);
    }
  };

  const handleBlur = () => {
    setFocusedEl(null);
  };

  const getFocusStyle = (id) => (focusedEl === id ? focusRing : {});

  const handleLinkHover = (e, entering) => {
    e.currentTarget.style.color = entering ? ACCENT : 'rgba(255,255,255,0.5)';
  };

  const handlePhoneHover = (e, entering) => {
    e.currentTarget.style.color = entering ? ACCENT : 'rgba(255,255,255,0.7)';
  };

  const handleBtnHover = (e, entering) => {
    e.currentTarget.style.background = entering ? '#1d4ed8' : ACCENT;
  };

  const handleInputFocus = (e, entering) => {
    e.currentTarget.style.borderColor = entering ? ACCENT : 'rgba(255,255,255,0.15)';
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setEmail('');
    }
  };

  return (
    <footer style={s.footer} aria-label="Footer navigation">
      <div style={s.topBorder} />
      <div style={s.dotOverlay} />

      <div style={s.inner}>
        <div style={s.grid} className="sg-footer-grid">
          {/* Column 1 — Brand */}
          <div style={s.brandCol}>
            <img src="/images/sg-logo.jpg" alt="Specific Gravity" style={s.logo} />
            <p style={s.tagline}>Managed IT for Multi-Unit Brands</p>
            <a
              href="tel:8447004728"
              style={{ ...s.phone, ...getFocusStyle('phone') }}
              onMouseEnter={(e) => handlePhoneHover(e, true)}
              onMouseLeave={(e) => handlePhoneHover(e, false)}
              onFocus={handleFocusVisible('phone')}
              onBlur={handleBlur}
            >
              844-700-GRAV (4728)
            </a>
            <div style={s.officeBlock}>
              <div style={s.officeLabel}>MA HQ</div>
              <p style={s.officeAddress}>45 Marion St<br />Quincy, MA 02170</p>
            </div>
            <div style={s.officeBlock}>
              <div style={s.officeLabel}>NJ Ops</div>
              <p style={s.officeAddress}>116 Village Blvd Suite 200<br />Princeton, NJ 08540</p>
            </div>
          </div>

          {/* Column 2 — Solutions */}
          <nav aria-label="Solutions">
            <h4 style={s.colHeading}>Solutions</h4>
            {SOLUTIONS_LINKS.map((item) => (
              <Link
                key={item.label}
                to={item.to}
                style={{ ...s.colLink, ...getFocusStyle(`sol-${item.label}`) }}
                onMouseEnter={(e) => handleLinkHover(e, true)}
                onMouseLeave={(e) => handleLinkHover(e, false)}
                onFocus={handleFocusVisible(`sol-${item.label}`)}
                onBlur={handleBlur}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Column 3 — Resources */}
          <nav aria-label="Resources">
            <h4 style={s.colHeading}>Resources</h4>
            {RESOURCES_LINKS.map((item) => (
              <Link
                key={item.label}
                to={item.to}
                style={{ ...s.colLink, ...getFocusStyle(`res-${item.label}`) }}
                onMouseEnter={(e) => handleLinkHover(e, true)}
                onMouseLeave={(e) => handleLinkHover(e, false)}
                onFocus={handleFocusVisible(`res-${item.label}`)}
                onBlur={handleBlur}
              >
                {item.label}
              </Link>
            ))}
            <p style={s.newsletterLabel}>Subscribe to our newsletter</p>
            <form style={s.newsletterForm} onSubmit={handleSubscribe}>
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                aria-label="Email address for newsletter"
                style={{ ...s.newsletterInput, ...getFocusStyle('newsletter-input') }}
                onFocus={(e) => { handleInputFocus(e, true); handleFocusVisible('newsletter-input')(e); }}
                onBlur={(e) => { handleInputFocus(e, false); handleBlur(); }}
              />
              <button
                type="submit"
                style={{ ...s.newsletterBtn, ...getFocusStyle('newsletter-btn') }}
                onMouseEnter={(e) => handleBtnHover(e, true)}
                onMouseLeave={(e) => handleBtnHover(e, false)}
                onFocus={handleFocusVisible('newsletter-btn')}
                onBlur={handleBlur}
                aria-label="Subscribe to newsletter"
              >
                Subscribe
              </button>
            </form>
          </nav>
        </div>
      </div>

      {/* Bottom Bar */}
      <div style={s.bottomBar}>
        <span style={s.bottomText}>&copy; {year} Specific Gravity Group, Inc.</span>
      </div>

      {/* Responsive: 3-col on desktop, stacked on mobile */}
      <style>{`
        .sg-footer-grid {
          grid-template-columns: 1fr !important;
        }
        @media (min-width: 768px) {
          .sg-footer-grid {
            grid-template-columns: 1.4fr 1fr 1fr !important;
          }
        }
      `}</style>
    </footer>
  );
}
