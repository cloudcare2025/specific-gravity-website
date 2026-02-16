import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { fadeUp, staggerContainer, staggerItem } from '../animation/variants';
import { springGentle } from '../animation/springs';
import SEOHead from '../components/SEOHead';
import blogPosts from '../data/blogPosts';

/* ─── derive categories from data ─── */

const ALL = 'All';
const categories = [ALL, ...Array.from(new Set(blogPosts.map((p) => p.category)))];

/* ─── monochrome gradients for card thumbnails ─── */

const cardGradients = blogPosts.map((_, i) => {
  const lightness = 15 + ((i * 30) / Math.max(blogPosts.length - 1, 1));
  return `linear-gradient(135deg, hsl(0, 0%, ${lightness}%) 0%, hsl(0, 0%, ${lightness + 15}%) 100%)`;
});

/* ─── sub-components ─── */

function BlogCard({ post, gradient }) {
  return (
    <motion.div variants={staggerItem} className="blog-card">
      <Link to={`/blog/${post.slug}`} style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
        {/* Image area — 16:9 */}
        <div style={{ aspectRatio: '16 / 9', overflow: 'hidden' }}>
          <div
            className="blog-card-thumb"
            style={{ background: gradient }}
          />
        </div>

        {/* Content */}
        <div style={{ padding: '24px 24px 28px', flex: 1, display: 'flex', flexDirection: 'column' }}>
          <span
            style={{
              fontSize: 12,
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              color: 'var(--text-muted)',
              marginBottom: 8,
            }}
          >
            {post.category}
          </span>

          <h4
            style={{
              fontWeight: 700,
              fontSize: 18,
              lineHeight: 1.3,
              color: 'var(--text-primary)',
              marginBottom: 10,
            }}
          >
            {post.title}
          </h4>

          <p
            style={{
              fontSize: 14,
              lineHeight: 1.6,
              color: 'var(--text-muted)',
              marginBottom: 16,
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              flex: 1,
            }}
          >
            {post.excerpt}
          </p>

          <span
            style={{
              color: 'var(--primary)',
              fontWeight: 600,
              fontSize: 14,
              display: 'inline-flex',
              alignItems: 'center',
              gap: 4,
            }}
          >
            Read More <ArrowRight size={14} />
          </span>
        </div>
      </Link>
    </motion.div>
  );
}

/* ─── main component ─── */

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState(ALL);

  const filteredPosts = useMemo(
    () =>
      activeCategory === ALL
        ? blogPosts
        : blogPosts.filter((p) => p.category === activeCategory),
    [activeCategory],
  );

  return (
    <>
      <SEOHead
        title="Insights & Resources — SpecGravity"
        description="Tech, IT support, and efficiency tips for multi-unit hospitality and retail brands. Expert insights from SpecGravity."
        path="/blog"
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
            right: '-5%',
            width: 500,
            height: 500,
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
            Insights & Resources
          </motion.h1>
          <motion.p
            className="body-large"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ ...springGentle, delay: 0.1 }}
            style={{ color: 'rgba(255,255,255,0.7)', maxWidth: 640, margin: '0 auto', lineHeight: 1.6 }}
          >
            Tech, IT support, and efficiency tips for hospitality and retail brands.
          </motion.p>
        </div>
      </section>

      {/* ── Category Filters + Blog Grid ── */}
      <section className="section" style={{ background: '#fff' }}>
        <div className="container">
          {/* Filter tabs */}
          <div className="blog-filter-bar">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`blog-filter-tab${activeCategory === cat ? ' active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Card grid with stagger */}
          <motion.div
            className="grid-3"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            key={activeCategory}
          >
            {filteredPosts.map((post, i) => (
              <BlogCard
                key={post.slug}
                post={post}
                gradient={cardGradients[blogPosts.indexOf(post)]}
              />
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
}
