import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SEOHead from '../components/SEOHead';
import { springGentle } from '../animation/springs';

/* ─── constants ─── */
const FONT_HEADING = "'Sora', sans-serif";
const FONT_BODY = "'Inter', sans-serif";
const DARK_HERO = 'linear-gradient(135deg, #0a0a0a 0%, #111111 50%, #0d0d0d 100%)';

export default function NotFound() {
  return (
    <>
      <SEOHead title="Page Not Found — SpecGravity" />

      <section
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: DARK_HERO,
          position: 'relative',
          overflow: 'hidden',
          padding: '40px 24px',
        }}
      >
        {/* Subtle dot pattern */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            backgroundImage:
              'radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />

        <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', maxWidth: 540 }}>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={springGentle}
            style={{
              fontFamily: FONT_HEADING,
              fontWeight: 800,
              fontSize: 'clamp(100px, 18vw, 180px)',
              lineHeight: 1,
              color: 'rgba(255,255,255,0.08)',
              marginBottom: -10,
              userSelect: 'none',
            }}
          >
            404
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...springGentle, delay: 0.08 }}
            style={{
              fontFamily: FONT_HEADING,
              fontWeight: 700,
              fontSize: 'clamp(24px, 4vw, 36px)',
              color: '#fff',
              marginBottom: 16,
            }}
          >
            Page not found
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...springGentle, delay: 0.15 }}
            style={{
              fontFamily: FONT_BODY,
              fontSize: 16,
              lineHeight: 1.6,
              color: 'rgba(255,255,255,0.55)',
              marginBottom: 36,
            }}
          >
            The page you are looking for does not exist or has been moved.
            Let us get you back on track.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...springGentle, delay: 0.22 }}
          >
            <Link
              to="/"
              style={{
                display: 'inline-block',
                fontFamily: FONT_BODY,
                fontWeight: 600,
                fontSize: 15,
                color: '#0A0A0A',
                background: '#fff',
                padding: '14px 36px',
                borderRadius: 10,
                textDecoration: 'none',
                transition: 'transform 0.25s ease, box-shadow 0.25s ease',
                boxShadow: '0 0 20px rgba(255,255,255,0.12), 0 4px 15px rgba(0,0,0,0.3)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.boxShadow =
                  '0 0 30px rgba(255,255,255,0.2), 0 6px 20px rgba(0,0,0,0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow =
                  '0 0 20px rgba(255,255,255,0.12), 0 4px 15px rgba(0,0,0,0.3)';
              }}
            >
              Back to Home
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
