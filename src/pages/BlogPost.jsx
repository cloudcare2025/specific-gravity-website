import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, Calendar } from 'lucide-react';
import blogPosts from '../data/blogPosts';
import SEOHead from '../components/SEOHead';
import { fadeUp, staggerContainer, staggerItem } from '../animation/variants';
import { springGentle } from '../animation/springs';

/* ─── constants ─── */
const FONT_HEADING = "'Sora', sans-serif";
const FONT_BODY = "'Inter', sans-serif";
const DARK_HERO = 'linear-gradient(135deg, #0a0a0a 0%, #111111 50%, #0d0d0d 100%)';

const CATEGORY_COLORS = {
  Cybersecurity: '#e53e3e',
  Operations: '#3182ce',
  Infrastructure: '#38a169',
  Strategy: '#805ad5',
};

function formatDate(isoString) {
  return new Date(isoString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

function getRelatedPosts(currentSlug, category) {
  const sameCat = blogPosts.filter(
    (p) => p.slug !== currentSlug && p.category === category,
  );
  const others = blogPosts.filter(
    (p) => p.slug !== currentSlug && p.category !== category,
  );
  const pool = [...sameCat, ...others];
  return pool.slice(0, 3);
}

/* ─── main component ─── */
export default function BlogPost() {
  const { slug } = useParams();
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) return <Navigate to="/blog" replace />;

  const related = getRelatedPosts(post.slug, post.category);
  const badgeColor = CATEGORY_COLORS[post.category] || '#555';

  return (
    <>
      <SEOHead
        title={`${post.title} — SpecGravity`}
        description={post.excerpt}
        path={`/blog/${post.slug}`}
      />

      {/* ── Hero ── */}
      <section
        style={{
          position: 'relative',
          overflow: 'hidden',
          background: DARK_HERO,
          padding: 'clamp(120px, 12vw, 160px) 0 clamp(48px, 6vw, 72px)',
        }}
      >
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

        <div
          style={{
            position: 'relative',
            zIndex: 1,
            maxWidth: 800,
            margin: '0 auto',
            padding: '0 24px',
          }}
        >
          {/* Breadcrumb */}
          <motion.nav
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={springGentle}
            style={{
              fontFamily: FONT_BODY,
              fontSize: 14,
              color: 'rgba(255,255,255,0.5)',
              marginBottom: 28,
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              flexWrap: 'wrap',
            }}
          >
            <Link to="/" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none' }}>
              Home
            </Link>
            <span style={{ color: 'rgba(255,255,255,0.3)' }}>/</span>
            <Link to="/blog" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none' }}>
              Blog
            </Link>
            <span style={{ color: 'rgba(255,255,255,0.3)' }}>/</span>
            <span style={{ color: 'rgba(255,255,255,0.4)' }}>{post.title}</span>
          </motion.nav>

          {/* Category badge */}
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ ...springGentle, delay: 0.05 }}
            style={{
              display: 'inline-block',
              background: badgeColor,
              color: '#fff',
              fontFamily: FONT_BODY,
              fontWeight: 600,
              fontSize: 12,
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              padding: '5px 14px',
              borderRadius: 20,
              marginBottom: 20,
            }}
          >
            {post.category}
          </motion.span>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...springGentle, delay: 0.1 }}
            style={{
              fontFamily: FONT_HEADING,
              fontWeight: 800,
              fontSize: 'clamp(28px, 4vw, 44px)',
              lineHeight: 1.2,
              color: '#fff',
              marginBottom: 20,
            }}
          >
            {post.title}
          </motion.h1>

          {/* Meta row */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...springGentle, delay: 0.18 }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 24,
              fontFamily: FONT_BODY,
              fontSize: 14,
              color: 'rgba(255,255,255,0.55)',
            }}
          >
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
              <Calendar size={15} /> {formatDate(post.date)}
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
              <Clock size={15} /> {post.readTime}
            </span>
          </motion.div>
        </div>
      </section>

      {/* ── Content ── */}
      <section style={{ background: '#fff', padding: 'clamp(48px, 6vw, 80px) 24px' }}>
        <motion.article
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          style={{ maxWidth: 720, margin: '0 auto' }}
        >
          {post.content.map((paragraph, i) => (
            <motion.p
              key={i}
              variants={staggerItem}
              style={{
                fontFamily: FONT_BODY,
                fontSize: 17,
                lineHeight: 1.8,
                color: '#333',
                marginBottom: i < post.content.length - 1 ? 28 : 0,
              }}
            >
              {paragraph}
            </motion.p>
          ))}
        </motion.article>
      </section>

      {/* ── Related Posts ── */}
      {related.length > 0 && (
        <section
          style={{
            background: '#f7f8fa',
            padding: 'clamp(48px, 6vw, 80px) 24px',
          }}
        >
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <motion.h2
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              style={{
                fontFamily: FONT_HEADING,
                fontWeight: 700,
                fontSize: 'clamp(22px, 3vw, 30px)',
                color: '#0A0A0A',
                marginBottom: 36,
                textAlign: 'center',
              }}
            >
              Related Articles
            </motion.h2>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                gap: 28,
              }}
            >
              {related.map((rp, i) => (
                <motion.div
                  key={rp.slug}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ ...springGentle, delay: i * 0.08 }}
                >
                  <Link
                    to={`/blog/${rp.slug}`}
                    style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
                  >
                    <div
                      style={{
                        background: '#fff',
                        border: '1px solid #DAE0E8',
                        borderRadius: 14,
                        padding: '28px 24px',
                        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                        height: '100%',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-4px)';
                        e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.08)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    >
                      <span
                        style={{
                          display: 'inline-block',
                          background: CATEGORY_COLORS[rp.category] || '#555',
                          color: '#fff',
                          fontFamily: FONT_BODY,
                          fontWeight: 600,
                          fontSize: 11,
                          textTransform: 'uppercase',
                          letterSpacing: '0.04em',
                          padding: '3px 10px',
                          borderRadius: 12,
                          marginBottom: 14,
                        }}
                      >
                        {rp.category}
                      </span>
                      <h4
                        style={{
                          fontFamily: FONT_HEADING,
                          fontWeight: 700,
                          fontSize: 16,
                          lineHeight: 1.35,
                          color: '#0A0A0A',
                          marginBottom: 10,
                        }}
                      >
                        {rp.title}
                      </h4>
                      <p
                        style={{
                          fontFamily: FONT_BODY,
                          fontSize: 13,
                          lineHeight: 1.6,
                          color: '#737373',
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                        }}
                      >
                        {rp.excerpt}
                      </p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Back link ── */}
      <section
        style={{
          background: '#fff',
          padding: '40px 24px 60px',
          textAlign: 'center',
        }}
      >
        <Link
          to="/blog"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            fontFamily: FONT_BODY,
            fontWeight: 600,
            fontSize: 15,
            color: '#0A0A0A',
            textDecoration: 'none',
            padding: '12px 28px',
            border: '1px solid #DAE0E8',
            borderRadius: 10,
            transition: 'background 0.2s ease, transform 0.2s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#f4f5f7';
            e.currentTarget.style.transform = 'translateY(-2px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          <ArrowLeft size={16} /> Back to Blog
        </Link>
      </section>
    </>
  );
}
