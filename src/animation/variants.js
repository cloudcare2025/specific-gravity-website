/**
 * Reusable Framer Motion animation variants.
 *
 * Pair with <motion.div variants={fadeUp} initial="hidden" whileInView="visible" />
 * or use staggerContainer / staggerItem for orchestrated list reveals.
 */

import {
  springGentle,
  springBouncy,
  springSmooth,
  springSnappy,
} from './springs';

/* ─── Directional fades ──────────────────────────────────── */

export const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: springSnappy,
  },
};

export const fadeDown = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: springSnappy,
  },
};

export const fadeLeft = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: springSnappy,
  },
};

export const fadeRight = {
  hidden: { opacity: 0, x: 20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: springSnappy,
  },
};

/* ─── Scale ──────────────────────────────────────────────── */

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: springBouncy,
  },
};

/* ─── Clip-path reveal ───────────────────────────────────── */

export const clipReveal = {
  hidden: { clipPath: 'inset(0 0 100% 0)' },
  visible: {
    clipPath: 'inset(0 0 0% 0)',
    transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

/* ─── Stagger orchestration ──────────────────────────────── */

export const staggerContainer = {
  visible: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.05,
    },
  },
};

export const staggerItem = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: springSnappy,
  },
};
