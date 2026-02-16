import { useState, useMemo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { clients } from '../data/clients';
import { logoUrl } from '../utils/logoUrl';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { fadeUp, fadeDown, scaleIn, staggerContainer, staggerItem } from '../animation/variants';
import { springSnappy } from '../animation/springs';
import Breadcrumbs from '../components/Breadcrumbs';
import SEOHead from '../components/SEOHead';

const CATEGORIES = [
  'All',
  'Hospitality',
  'Retail',
  'Support',
  'Tech Dispatch',
  'Rollout',
  'Dedicated Resources',
];

const INITIAL_COUNT = 12;

const MONOGRAM_GRADIENTS = [
  'linear-gradient(135deg, #1A1A1A 0%, #333333 100%)',
  'linear-gradient(135deg, #555555 0%, #1A1A1A 100%)',
  'linear-gradient(135deg, #404040 0%, #1A1A1A 100%)',
  'linear-gradient(135deg, #3a3a3a 0%, #444444 100%)',
  'linear-gradient(135deg, #333333 0%, #3a3a3a 100%)',
  'linear-gradient(135deg, #444444 0%, #1A1A1A 100%)',
  'linear-gradient(135deg, #2a2a2a 0%, #404040 100%)',
  'linear-gradient(135deg, #555555 0%, #3a3a3a 100%)',
];

function hashName(name) {
  let h = 0;
  for (let i = 0; i < name.length; i++) {
    h = ((h << 5) - h + name.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
}

/* ── Motion Variants ── */
const cardVariant = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: springSnappy,
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: { type: 'spring', stiffness: 400, damping: 35, mass: 0.6 },
  },
};

/* ── Styles ── */
const s = {
  hero: {
    background: 'linear-gradient(135deg, #0a0a0a 0%, #111111 50%, #0d0d0d 100%)',
    position: 'relative',
    overflow: 'hidden',
    padding: '140px 0 100px',
    textAlign: 'center',
  },
  heroContainer: {
    maxWidth: 1440,
    margin: '0 auto',
    padding: '0 24px',
    position: 'relative',
    zIndex: 1,
  },
  heroHeadline: {
    fontFamily: "'Sora', sans-serif",
    fontWeight: 700,
    letterSpacing: '-0.02em',
    lineHeight: 1.1,
    color: '#fff',
    marginBottom: 20,
  },
  heroSub: {
    fontFamily: "'Inter', sans-serif",
    fontSize: 20,
    lineHeight: 1.6,
    color: 'rgba(255,255,255,0.6)',
    maxWidth: 560,
    margin: '0 auto',
  },

  portfolio: {
    background: '#fff',
    padding: '96px 0',
  },
  portfolioContainer: {
    maxWidth: 1440,
    margin: '0 auto',
    padding: '0 24px',
  },

  filterWrap: {
    display: 'flex',
    gap: 10,
    marginBottom: 48,
    overflowX: 'auto',
    WebkitOverflowScrolling: 'touch',
    scrollbarWidth: 'none',
    msOverflowStyle: 'none',
    paddingBottom: 4,
  },
  filterBtn: (active) => ({
    fontFamily: "'Inter', sans-serif",
    fontSize: 14,
    fontWeight: 500,
    padding: '10px 22px',
    borderRadius: 9999,
    border: active ? '1px solid #1A1A1A' : '1px solid #DAE0E8',
    background: active ? '#1A1A1A' : 'transparent',
    color: active ? '#fff' : '#0A0A0A',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    whiteSpace: 'nowrap',
    flexShrink: 0,
  }),

  grid: {
    display: 'grid',
    gap: 24,
  },

  card: {
    background: '#fff',
    border: '1px solid #DAE0E8',
    borderRadius: 16,
    padding: 40,
    textAlign: 'center',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    cursor: 'default',
  },
  monogram: (gradient) => ({
    width: 80,
    height: 80,
    borderRadius: '50%',
    background: gradient,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 20px',
    fontFamily: "'Sora', sans-serif",
    fontSize: 26,
    fontWeight: 700,
    color: '#fff',
    letterSpacing: 0,
    lineHeight: 1,
  }),
  cardName: {
    fontFamily: "'Sora', sans-serif",
    fontSize: 18,
    fontWeight: 700,
    color: '#0A0A0A',
    letterSpacing: '-0.01em',
  },

  loadMoreWrap: {
    textAlign: 'center',
    marginTop: 48,
  },
  loadMoreBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    fontFamily: "'Inter', sans-serif",
    fontWeight: 500,
    fontSize: 14,
    borderRadius: 9999,
    border: '2px solid #1A1A1A',
    background: 'transparent',
    color: '#1A1A1A',
    padding: '0 28px',
    height: 48,
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  },

  cta: {
    background: 'linear-gradient(135deg, #0a0a0a 0%, #111111 50%, #0d0d0d 100%)',
    position: 'relative',
    overflow: 'hidden',
    padding: '96px 0',
    textAlign: 'center',
  },
  ctaContainer: {
    maxWidth: 1440,
    margin: '0 auto',
    padding: '0 24px',
    position: 'relative',
    zIndex: 1,
  },
  ctaHeading: {
    fontFamily: "'Sora', sans-serif",
    fontWeight: 700,
    fontSize: 40,
    letterSpacing: '-0.02em',
    lineHeight: 1.1,
    color: '#fff',
    marginBottom: 32,
  },
  ctaBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    height: 56,
    padding: '0 32px',
    background: 'linear-gradient(110deg, #1A1A1A 35%, #333333 50%, #1A1A1A 65%)',
    backgroundSize: '200% 100%',
    color: '#fff',
    fontFamily: "'Inter', sans-serif",
    fontSize: 16,
    fontWeight: 600,
    borderRadius: 9999,
    textDecoration: 'none',
    boxShadow: '0 0 20px rgba(255,255,255,0.12), 0 4px 15px rgba(0,0,0,0.3)',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
  },
};

function ClientLogo({ domain, name, initial, gradient }) {
  const [imgFailed, setImgFailed] = useState(false);

  if (!domain || imgFailed) {
    return <div style={s.monogram(gradient)}>{initial}</div>;
  }

  return (
    <div style={{
      width: 80,
      height: 80,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '0 auto 20px',
    }}>
      <img
        src={logoUrl(domain, { theme: 'light', size: 128 })}
        alt={name}
        loading="lazy"
        onError={() => setImgFailed(true)}
        style={{
          maxWidth: 80,
          maxHeight: 80,
          objectFit: 'contain',
          display: 'block',
          filter: 'grayscale(1)',
          opacity: 0.7,
          transition: 'filter 0.3s ease, opacity 0.3s ease',
        }}
      />
    </div>
  );
}

export default function Clients() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);
  const [gridRef, gridVisible] = useScrollAnimation(0.1);
  const [ctaRef, ctaVisible] = useScrollAnimation(0.3);

  const categoryCounts = useMemo(() => {
    const counts = { All: clients.length };
    CATEGORIES.forEach((cat) => {
      if (cat !== 'All') counts[cat] = 0;
    });
    clients.forEach((c) => {
      c.categories.forEach((cat) => {
        if (counts[cat] !== undefined) counts[cat]++;
      });
    });
    return counts;
  }, []);

  const filtered = useMemo(() => {
    if (activeFilter === 'All') return clients;
    return clients.filter((c) => c.categories.includes(activeFilter));
  }, [activeFilter]);

  const visible = useMemo(
    () => filtered.slice(0, visibleCount),
    [filtered, visibleCount]
  );

  const handleFilter = useCallback((cat) => {
    setActiveFilter(cat);
    setVisibleCount(INITIAL_COUNT);
  }, []);

  const handleLoadMore = useCallback(() => {
    setVisibleCount((prev) => prev + INITIAL_COUNT);
  }, []);

  return (
    <>
      <SEOHead
        title="Our Clients — SpecGravity"
        description="From Fortune 500 retail to fast-casual restaurants, see the 500+ locations and leading brands that trust SpecGravity for managed IT."
        path="/clients"
      />

      {/* ================================================================
          HERO
          ================================================================ */}
      <section style={s.hero} className="dot-pattern">
        <div style={s.heroContainer}>
          <Breadcrumbs />
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            style={{ marginTop: 24 }}
          >
            <motion.h1
              className="display-xl"
              style={s.heroHeadline}
              variants={fadeDown}
            >
              Our Clients Are Our Partners
            </motion.h1>
            <motion.p
              style={s.heroSub}
              variants={fadeUp}
            >
              Their success is our success.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ================================================================
          FILTERABLE PORTFOLIO GRID
          ================================================================ */}
      <section style={s.portfolio} ref={gridRef}>
        <div style={s.portfolioContainer}>
          {/* Filter Tabs */}
          <motion.div
            style={s.filterWrap}
            className="sg-filter-scroll"
            initial="hidden"
            animate={gridVisible ? 'visible' : 'hidden'}
            variants={staggerContainer}
          >
            {CATEGORIES.map((cat) => (
              <motion.button
                key={cat}
                variants={staggerItem}
                style={s.filterBtn(activeFilter === cat)}
                onClick={() => handleFilter(cat)}
                onMouseEnter={(e) => {
                  if (activeFilter !== cat) {
                    e.currentTarget.style.borderColor = '#1A1A1A';
                    e.currentTarget.style.color = '#1A1A1A';
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeFilter !== cat) {
                    e.currentTarget.style.borderColor = '#DAE0E8';
                    e.currentTarget.style.color = '#0A0A0A';
                  }
                }}
              >
                {cat} ({categoryCounts[cat] || 0})
              </motion.button>
            ))}
          </motion.div>

          {/* Grid */}
          <motion.div
            style={{
              ...s.grid,
              gridTemplateColumns: 'repeat(1, 1fr)',
            }}
            className="sg-clients-grid"
            layout
          >
            <AnimatePresence mode="popLayout">
              {visible.map((client) => {
                const idx = hashName(client.name);
                const gradient = MONOGRAM_GRADIENTS[idx % MONOGRAM_GRADIENTS.length];
                const initial = client.name.charAt(0).toUpperCase();

                return (
                  <motion.div
                    key={client.name}
                    variants={cardVariant}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    layout
                    style={s.card}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-5px)';
                      e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.08)';
                      const img = e.currentTarget.querySelector('img');
                      if (img) { img.style.filter = 'grayscale(0)'; img.style.opacity = '1'; }
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = 'none';
                      const img = e.currentTarget.querySelector('img');
                      if (img) { img.style.filter = 'grayscale(1)'; img.style.opacity = '0.7'; }
                    }}
                  >
                    <ClientLogo
                      domain={client.domain}
                      name={client.name}
                      initial={initial}
                      gradient={gradient}
                    />
                    <div style={s.cardName}>{client.name}</div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>

          {/* Load More */}
          {visibleCount < filtered.length && (
            <motion.div
              style={s.loadMoreWrap}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={scaleIn}
            >
              <button
                style={s.loadMoreBtn}
                onClick={handleLoadMore}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(0,0,0,0.04)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                }}
              >
                Load More
                <ArrowRight size={16} />
              </button>
            </motion.div>
          )}
        </div>
      </section>

      {/* ================================================================
          CTA
          ================================================================ */}
      <section style={s.cta} className="dot-pattern" ref={ctaRef}>
        <div style={s.ctaContainer}>
          <motion.h2
            style={s.ctaHeading}
            initial="hidden"
            animate={ctaVisible ? 'visible' : 'hidden'}
            variants={fadeDown}
          >
            Want to join them?
          </motion.h2>
          <motion.div
            initial="hidden"
            animate={ctaVisible ? 'visible' : 'hidden'}
            variants={scaleIn}
          >
            <Link
              to="/contact"
              style={s.ctaBtn}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.03)';
                e.currentTarget.style.boxShadow = '0 0 30px rgba(255,255,255,0.2), 0 6px 20px rgba(0,0,0,0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 0 20px rgba(255,255,255,0.12), 0 4px 15px rgba(0,0,0,0.3)';
              }}
            >
              Book a Demo
              <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Responsive overrides */}
      <style>{`
        .sg-filter-scroll::-webkit-scrollbar { display: none; }
        .sg-clients-grid { grid-template-columns: 1fr !important; }
        @media (min-width: 640px) {
          .sg-clients-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (min-width: 1024px) {
          .sg-clients-grid { grid-template-columns: repeat(3, 1fr) !important; }
        }
      `}</style>
    </>
  );
}
