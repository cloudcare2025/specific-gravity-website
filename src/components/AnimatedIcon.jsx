import { motion } from 'framer-motion';

export default function AnimatedIcon({
  icon: Icon,
  size = 28,
  color = '#1A1A1A',
  delay = 0,
}) {
  const circleSize = size * 1.8;

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ type: 'spring', stiffness: 300, damping: 15, delay }}
      style={{
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: circleSize,
        height: circleSize,
      }}
    >
      {/* Background circle */}
      <motion.div
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 18,
          delay: Math.max(0, delay - 0.05),
        }}
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '50%',
          backgroundColor: 'rgba(37, 99, 235, 0.08)',
        }}
      />

      <Icon size={size} color={color} style={{ position: 'relative', zIndex: 1 }} />
    </motion.div>
  );
}
