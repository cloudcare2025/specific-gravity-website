import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export default function ScrollIndicator() {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 200], [1, 0]);

  return (
    <motion.div
      style={{
        position: 'absolute',
        bottom: 32,
        left: '50%',
        translateX: '-50%',
        opacity,
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      animate={{ y: [0, 8, 0] }}
      transition={{
        repeat: Infinity,
        duration: 1.5,
        ease: 'easeInOut',
      }}
    >
      <ChevronDown size={24} color="#FFFFFF" />
    </motion.div>
  );
}
