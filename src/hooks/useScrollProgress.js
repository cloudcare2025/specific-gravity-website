/**
 * Scroll-linked motion values for viewport-aware animations.
 *
 * Usage:
 *   const { ref, opacity, y, scale } = useScrollProgress();
 *   <motion.section ref={ref} style={{ opacity, y, scale }}>…</motion.section>
 *
 * The element fades/slides in as it enters the viewport and
 * fades/slides out as it leaves — fully driven by scroll position.
 */

import { useRef } from 'react';
import { useScroll, useTransform } from 'framer-motion';

export default function useScrollProgress(options = {}) {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: options.offset || ['start end', 'end start'],
  });

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0, 1, 1, 0],
  );

  const y = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [60, 0, 0, -60],
  );

  const scale = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0.95, 1, 1, 0.95],
  );

  return { ref, scrollYProgress, opacity, y, scale };
}
