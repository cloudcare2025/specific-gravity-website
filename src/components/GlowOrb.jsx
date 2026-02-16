import { useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function GlowOrb({
  size = 400,
  color = 'rgba(37, 99, 235, 0.08)',
  style,
}) {
  const mouseX = useMotionValue(-size);
  const mouseY = useMotionValue(-size);

  const springConfig = { stiffness: 50, damping: 30 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  useEffect(() => {
    function handleMouseMove(e) {
      mouseX.set(e.clientX - size / 2);
      mouseY.set(e.clientY - size / 2);
    }

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY, size]);

  return (
    <motion.div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: size,
        height: size,
        borderRadius: '50%',
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        pointerEvents: 'none',
        zIndex: 0,
        x,
        y,
        ...style,
      }}
    />
  );
}
