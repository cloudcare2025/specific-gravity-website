import { useState, useEffect, useRef, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown } from 'lucide-react';
import MagneticButton from './MagneticButton';

const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'About Us', to: '/about' },
  { label: 'Clients', to: '/clients' },
  { label: 'Solutions', to: null, dropdown: true },
  { label: 'Contact', to: '/contact' },
];

const SOLUTIONS = [
  { label: 'Hospitality', to: '/solutions/hospitality' },
  { label: 'Retail', to: '/solutions/retail' },
  { label: 'Nationwide Dispatching', to: '/solutions/nationwide-dispatching' },
  { label: 'Office Tech Support', to: '/solutions/office-support' },
  { label: 'Dedicated Resources', to: '/solutions/dedicated-resources' },
];

const focusVisibleRing = {
  outline: '2px solid #2563EB',
  outlineOffset: '2px',
};

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileAccordion, setMobileAccordion] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef(null);
  const triggerRef = useRef(null);
  const itemRefs = useRef([]);
  const hoverTimeoutRef = useRef(null);
  const location = useLocation();

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
    setMobileAccordion(false);
    setDropdownOpen(false);
  }, [location.pathname]);

  // Scroll detection
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // Cleanup hover timeout on unmount
  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    };
  }, []);

  const isActive = (to) => location.pathname === to;
  const isSolutionsActive = location.pathname.startsWith('/solutions');

  // ── Hover intent handlers ──
  const handleMouseEnterDropdown = useCallback(() => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    setDropdownOpen(true);
  }, []);

  const handleMouseLeaveDropdown = useCallback(() => {
    hoverTimeoutRef.current = setTimeout(() => {
      setDropdownOpen(false);
    }, 150);
  }, []);

  // ── Keyboard navigation ──
  const focusItem = (index) => {
    const clamped = Math.max(0, Math.min(index, SOLUTIONS.length - 1));
    if (itemRefs.current[clamped]) {
      itemRefs.current[clamped].focus();
    }
  };

  const handleTriggerKeyDown = (e) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setDropdownOpen(true);
        // Focus first item after render
        requestAnimationFrame(() => focusItem(0));
        break;
      case 'Escape':
        e.preventDefault();
        setDropdownOpen(false);
        break;
      default:
        break;
    }
  };

  const handleItemKeyDown = (e, index) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        if (index < SOLUTIONS.length - 1) focusItem(index + 1);
        break;
      case 'ArrowUp':
        e.preventDefault();
        if (index > 0) {
          focusItem(index - 1);
        } else {
          // Move back to trigger
          triggerRef.current?.focus();
        }
        break;
      case 'Escape':
        e.preventDefault();
        setDropdownOpen(false);
        triggerRef.current?.focus();
        break;
      case 'Enter':
      case ' ':
        // Let the link navigate naturally for Enter; for Space, trigger click
        if (e.key === ' ') {
          e.preventDefault();
          e.currentTarget.click();
        }
        break;
      default:
        break;
    }
  };

  // ── Styles ──
  const s = {
    header: {
      position: 'sticky',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
      background: '#fff',
      borderBottom: '1px solid #DAE0E8',
      boxShadow: scrolled ? '0 4px 20px rgba(0,0,0,0.08), 0 1px 0 rgba(0,0,0,0.05)' : 'none',
      transition: 'box-shadow 0.2s ease',
    },
    inner: {
      maxWidth: 1440,
      margin: '0 auto',
      padding: '0 32px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      height: 72,
    },
    logo: {
      height: 40,
      width: 'auto',
      display: 'block',
    },
    nav: {
      display: 'flex',
      alignItems: 'center',
      gap: 32,
    },
    navLink: (active) => ({
      fontFamily: "'Inter', sans-serif",
      fontSize: 14,
      fontWeight: active ? 700 : 500,
      color: active ? '#1A1A1A' : '#0A0A0A',
      textDecoration: 'none',
      transition: 'color 0.15s ease',
      cursor: 'pointer',
      background: 'none',
      border: 'none',
      padding: 0,
      display: 'flex',
      alignItems: 'center',
      gap: 4,
    }),
    dropdownWrap: {
      position: 'relative',
    },
    dropdownMenu: {
      position: 'absolute',
      top: 'calc(100% + 12px)',
      left: '50%',
      transform: 'translateX(-50%)',
      background: '#fff',
      border: '1px solid #DAE0E8',
      borderRadius: 12,
      boxShadow: '0 12px 40px rgba(0,0,0,0.1)',
      padding: '8px 0',
      minWidth: 240,
      zIndex: 1001,
    },
    dropdownItem: {
      display: 'block',
      width: '100%',
      padding: '10px 20px',
      fontSize: 14,
      fontFamily: "'Inter', sans-serif",
      fontWeight: 500,
      color: '#0A0A0A',
      textDecoration: 'none',
      transition: 'background 0.12s ease, color 0.12s ease, padding-left 0.15s ease, transform 0.15s ease',
      textAlign: 'left',
      border: 'none',
      background: 'none',
      cursor: 'pointer',
    },
    cta: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: 48,
      padding: '0 28px',
      background: 'linear-gradient(135deg, #2563EB, #1d4ed8)',
      color: '#fff',
      fontFamily: "'Inter', sans-serif",
      fontSize: 14,
      fontWeight: 600,
      borderRadius: 9999,
      textDecoration: 'none',
      boxShadow: '0 0 20px rgba(37,99,235,0.2), 0 4px 15px rgba(37,99,235,0.3)',
      transition: 'transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease',
      whiteSpace: 'nowrap',
    },
    hamburger: {
      display: 'none',
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      padding: 4,
      color: '#0A0A0A',
    },
    // Mobile overlay
    overlay: {
      position: 'fixed',
      inset: 0,
      zIndex: 999,
      background: 'rgba(0,0,0,0.4)',
    },
    mobilePanel: {
      position: 'fixed',
      top: 0,
      right: 0,
      bottom: 0,
      width: '100%',
      maxWidth: 380,
      zIndex: 1001,
      background: '#fff',
      display: 'flex',
      flexDirection: 'column',
      transform: mobileOpen ? 'translateX(0)' : 'translateX(100%)',
      transition: 'transform 0.3s cubic-bezier(0.4,0,0.2,1)',
    },
    mobilePanelHead: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '16px 24px',
      borderBottom: '1px solid #DAE0E8',
    },
    mobileCtaWrap: {
      padding: '16px 24px',
    },
    mobileCta: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      height: 48,
      background: 'linear-gradient(135deg, #2563EB, #1d4ed8)',
      color: '#fff',
      fontFamily: "'Inter', sans-serif",
      fontSize: 15,
      fontWeight: 600,
      borderRadius: 9999,
      textDecoration: 'none',
      boxShadow: '0 0 20px rgba(37,99,235,0.2), 0 4px 15px rgba(37,99,235,0.3)',
    },
    mobileNav: {
      flex: 1,
      overflowY: 'auto',
      padding: '8px 0',
    },
    mobileNavLink: (active) => ({
      display: 'block',
      padding: '14px 24px',
      fontFamily: "'Inter', sans-serif",
      fontSize: 16,
      fontWeight: 500,
      color: active ? '#1A1A1A' : '#0A0A0A',
      textDecoration: 'none',
    }),
    mobileAccordionBtn: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%',
      padding: '14px 24px',
      fontFamily: "'Inter', sans-serif",
      fontSize: 16,
      fontWeight: 500,
      color: isSolutionsActive ? '#1A1A1A' : '#0A0A0A',
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      textAlign: 'left',
    },
    mobileSubLink: {
      display: 'block',
      padding: '10px 24px 10px 40px',
      fontFamily: "'Inter', sans-serif",
      fontSize: 14,
      fontWeight: 500,
      color: '#737373',
      textDecoration: 'none',
      transition: 'color 0.12s ease',
    },
  };

  // Dropdown animation variants
  const dropdownVariants = {
    initial: { opacity: 0, y: -8 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.18, ease: 'easeOut' } },
    exit: { opacity: 0, y: -8, transition: { duration: 0.12, ease: 'easeIn' } },
  };

  const renderDropdownLink = (item, index) => {
    return (
      <Link
        key={item.label}
        to={item.to}
        ref={(el) => { itemRefs.current[index] = el; }}
        role="menuitem"
        tabIndex={0}
        style={s.dropdownItem}
        onKeyDown={(e) => handleItemKeyDown(e, index)}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'rgba(0,0,0,0.04)';
          e.currentTarget.style.color = '#1A1A1A';
          e.currentTarget.style.paddingLeft = '24px';
          e.currentTarget.style.transform = 'translateX(4px)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'transparent';
          e.currentTarget.style.color = '#0A0A0A';
          e.currentTarget.style.paddingLeft = '20px';
          e.currentTarget.style.transform = 'translateX(0)';
        }}
      >
        {item.label}
      </Link>
    );
  };

  return (
    <>
      <header style={s.header}>
        <div style={s.inner}>
          {/* Logo */}
          <Link to="/" aria-label="Specific Gravity Home" className="sg-focus-ring">
            <img src="/images/sg-logo.jpg" alt="Specific Gravity" style={s.logo} />
          </Link>

          {/* Desktop Nav */}
          <nav style={s.nav} className="sg-desktop-nav" role="menubar">
            {NAV_LINKS.map((link) => {
              if (link.dropdown) {
                return (
                  <div
                    key={link.label}
                    ref={dropdownRef}
                    style={s.dropdownWrap}
                    role="none"
                    onMouseEnter={handleMouseEnterDropdown}
                    onMouseLeave={handleMouseLeaveDropdown}
                  >
                    <button
                      ref={triggerRef}
                      style={s.navLink(isSolutionsActive)}
                      className="sg-focus-ring"
                      onClick={() => setDropdownOpen((p) => !p)}
                      onKeyDown={handleTriggerKeyDown}
                      aria-expanded={dropdownOpen}
                      aria-haspopup="menu"
                    >
                      {link.label}
                      <ChevronDown
                        size={16}
                        style={{
                          transition: 'transform 0.2s ease',
                          transform: dropdownOpen ? 'rotate(180deg)' : 'rotate(0)',
                        }}
                      />
                    </button>
                    <AnimatePresence>
                      {dropdownOpen && (
                        <motion.div
                          style={s.dropdownMenu}
                          role="menu"
                          variants={dropdownVariants}
                          initial="initial"
                          animate="animate"
                          exit="exit"
                        >
                          {SOLUTIONS.map((item, index) => renderDropdownLink(item, index))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }
              return (
                <Link
                  key={link.label}
                  to={link.to}
                  role="none"
                  style={s.navLink(isActive(link.to))}
                  className="sg-focus-ring"
                  onMouseEnter={(e) => { e.currentTarget.style.color = '#555555'; }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = isActive(link.to) ? '#1A1A1A' : '#0A0A0A';
                  }}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* CTA */}
          <MagneticButton>
            <Link
              to="/contact"
              style={s.cta}
              className="sg-desktop-cta sg-focus-ring"
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.03)';
                e.currentTarget.style.background = 'linear-gradient(135deg, #3b82f6, #2563EB)';
                e.currentTarget.style.boxShadow = '0 0 30px rgba(37,99,235,0.3), 0 6px 20px rgba(37,99,235,0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.background = 'linear-gradient(135deg, #2563EB, #1d4ed8)';
                e.currentTarget.style.boxShadow = '0 0 20px rgba(37,99,235,0.2), 0 4px 15px rgba(37,99,235,0.3)';
              }}
            >
              Book a Demo
            </Link>
          </MagneticButton>

          {/* Hamburger */}
          <button
            style={s.hamburger}
            className="sg-hamburger sg-focus-ring"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={28} />
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div style={s.overlay} onClick={() => setMobileOpen(false)} />
      )}
      <div style={s.mobilePanel} aria-hidden={!mobileOpen}>
        <div style={s.mobilePanelHead}>
          <Link to="/" onClick={() => setMobileOpen(false)} className="sg-focus-ring">
            <img src="/images/sg-logo.jpg" alt="Specific Gravity" style={{ height: 36, width: 'auto' }} />
          </Link>
          <button
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu"
            className="sg-focus-ring"
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#0A0A0A', padding: 4 }}
          >
            <X size={28} />
          </button>
        </div>

        <div style={s.mobileCtaWrap}>
          <Link to="/contact" style={s.mobileCta} onClick={() => setMobileOpen(false)} className="sg-focus-ring">
            Book a Demo
          </Link>
        </div>

        <nav style={s.mobileNav}>
          {NAV_LINKS.map((link) => {
            if (link.dropdown) {
              return (
                <div key={link.label}>
                  <button
                    style={s.mobileAccordionBtn}
                    className="sg-focus-ring"
                    onClick={() => setMobileAccordion((p) => !p)}
                    aria-expanded={mobileAccordion}
                  >
                    Solutions
                    <ChevronDown
                      size={18}
                      style={{
                        transition: 'transform 0.2s ease',
                        transform: mobileAccordion ? 'rotate(180deg)' : 'rotate(0)',
                      }}
                    />
                  </button>
                  {mobileAccordion && (
                    <div>
                      {SOLUTIONS.map((item) => (
                        <Link
                          key={item.label}
                          to={item.to}
                          style={s.mobileSubLink}
                          className="sg-focus-ring"
                          onClick={() => setMobileOpen(false)}
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            }
            return (
              <Link
                key={link.label}
                to={link.to}
                style={s.mobileNavLink(isActive(link.to))}
                className="sg-focus-ring"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Responsive CSS + focus-visible rings — scoped via inline style tag */}
      <style>{`
        .sg-desktop-nav { display: flex !important; }
        .sg-desktop-cta { display: inline-flex !important; }
        .sg-hamburger { display: none !important; }
        @media (max-width: 1023px) {
          .sg-desktop-nav { display: none !important; }
          .sg-desktop-cta { display: none !important; }
          .sg-hamburger { display: flex !important; }
        }
        .sg-focus-ring:focus-visible {
          outline: 2px solid #2563EB;
          outline-offset: 2px;
        }
        [role="menuitem"]:focus-visible {
          outline: 2px solid #2563EB;
          outline-offset: 2px;
          background: rgba(0,0,0,0.04);
        }
      `}</style>
    </>
  );
}
