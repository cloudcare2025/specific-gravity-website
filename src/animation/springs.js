/**
 * Spring transition presets for Framer Motion.
 *
 * Usage:
 *   import { springSnappy } from '@/animation/springs';
 *   <motion.div transition={springSnappy} />
 */

export const springSnappy = {
  type: 'spring',
  stiffness: 400,
  damping: 30,
  mass: 0.8,
};

export const springGentle = {
  type: 'spring',
  stiffness: 120,
  damping: 20,
  mass: 1,
};

export const springBouncy = {
  type: 'spring',
  stiffness: 300,
  damping: 15,
  mass: 0.6,
};

export const springSmooth = {
  type: 'spring',
  stiffness: 80,
  damping: 26,
  mass: 1.2,
};
