import { useState } from 'react';
import { motion } from 'framer-motion';

export default function FloatingLabel({
  label,
  type = 'text',
  name,
  value,
  onChange,
  required,
  error,
  ...rest
}) {
  const [isFocused, setIsFocused] = useState(false);
  const isActive = isFocused || (value != null && value !== '');

  return (
    <div style={{ position: 'relative', marginBottom: error ? 4 : 16, fontFamily: "'Inter', sans-serif" }}>
      <motion.label
        htmlFor={name}
        animate={{
          y: isActive ? -24 : 0,
          scale: isActive ? 0.85 : 1,
        }}
        transition={{ type: 'tween', duration: 0.2, ease: 'easeOut' }}
        style={{
          position: 'absolute',
          left: 0,
          top: 12,
          originX: 0,
          originY: 0,
          color: error ? '#DC2626' : isFocused ? '#2563EB' : '#6B7280',
          pointerEvents: 'none',
          fontSize: 15,
          lineHeight: 1,
        }}
      >
        {label}{required && ' *'}
      </motion.label>

      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        style={{
          width: '100%',
          padding: '12px 0 8px',
          fontSize: 15,
          fontFamily: "'Inter', sans-serif",
          color: '#1A1A1A',
          background: 'transparent',
          border: 'none',
          borderBottom: `2px solid ${error ? '#DC2626' : isFocused ? '#2563EB' : '#D1D5DB'}`,
          outline: 'none',
          transition: 'border-color 0.2s ease',
        }}
        {...rest}
      />

      {error && (
        <p style={{ margin: '4px 0 0', fontSize: 12, color: '#DC2626', lineHeight: 1.4 }}>
          {error}
        </p>
      )}
    </div>
  );
}
