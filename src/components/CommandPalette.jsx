import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Command } from 'lucide-react';

const ROUTES = [
  { label: 'Home', path: '/' },
  { label: 'About Us', path: '/about' },
  { label: 'Clients', path: '/clients' },
  { label: 'Hospitality', path: '/solutions/hospitality' },
  { label: 'Retail', path: '/solutions/retail' },
  { label: 'Nationwide Dispatching', path: '/solutions/nationwide-dispatching' },
  { label: 'Office Tech Support', path: '/solutions/office-support' },
  { label: 'Dedicated Resources', path: '/solutions/dedicated-resources' },
  { label: 'Contact', path: '/contact' },
  { label: 'Blog', path: '/blog' },
];

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  const filtered = ROUTES.filter((r) =>
    r.label.toLowerCase().includes(query.toLowerCase())
  );

  const close = useCallback(() => {
    setIsOpen(false);
    setQuery('');
    setSelectedIndex(0);
  }, []);

  const open = useCallback(() => {
    setIsOpen(true);
    setSelectedIndex(0);
  }, []);

  useEffect(() => {
    function onKeyDown(e) {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen((prev) => {
          if (prev) {
            setQuery('');
            setSelectedIndex(0);
            return false;
          }
          return true;
        });
      }
      if (e.key === 'Escape' && isOpen) {
        e.preventDefault();
        close();
      }
    }

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, close]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  function handleKeyDown(e) {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((i) => (i + 1) % filtered.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((i) => (i - 1 + filtered.length) % filtered.length);
    } else if (e.key === 'Enter' && filtered.length > 0) {
      e.preventDefault();
      navigate(filtered[selectedIndex].path);
      close();
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={close}
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              backdropFilter: 'blur(4px)',
              zIndex: 9998,
            }}
          />

          {/* Panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            style={{
              position: 'fixed',
              top: '20%',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '100%',
              maxWidth: '560px',
              backgroundColor: '#fff',
              borderRadius: '16px',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
              zIndex: 9999,
              overflow: 'hidden',
            }}
          >
            {/* Search input */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '16px 20px',
                borderBottom: '1px solid #e5e5e5',
              }}
            >
              <Search size={20} style={{ color: '#a3a3a3', flexShrink: 0 }} />
              <input
                ref={inputRef}
                type="text"
                placeholder="Search pages..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                style={{
                  flex: 1,
                  border: 'none',
                  outline: 'none',
                  fontSize: '16px',
                  color: '#0a0a0a',
                  backgroundColor: 'transparent',
                  fontFamily: 'inherit',
                }}
              />
              <kbd
                style={{
                  fontSize: '12px',
                  color: '#a3a3a3',
                  border: '1px solid #e5e5e5',
                  borderRadius: '6px',
                  padding: '2px 8px',
                  fontFamily: 'inherit',
                }}
              >
                esc
              </kbd>
            </div>

            {/* Results */}
            <ul
              role="listbox"
              style={{
                listStyle: 'none',
                margin: 0,
                padding: '8px',
                maxHeight: '320px',
                overflowY: 'auto',
              }}
            >
              {filtered.length === 0 && (
                <li
                  style={{
                    padding: '24px 12px',
                    textAlign: 'center',
                    color: '#a3a3a3',
                    fontSize: '14px',
                  }}
                >
                  No results found.
                </li>
              )}
              {filtered.map((route, i) => {
                const isSelected = i === selectedIndex;
                return (
                  <li
                    key={route.path}
                    role="option"
                    aria-selected={isSelected}
                    onClick={() => {
                      navigate(route.path);
                      close();
                    }}
                    onMouseEnter={() => setSelectedIndex(i)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '12px 16px',
                      borderRadius: '10px',
                      cursor: 'pointer',
                      backgroundColor: isSelected ? '#f5f5f5' : 'transparent',
                      transition: 'background-color 0.1s ease',
                    }}
                  >
                    <span
                      style={{
                        fontSize: '15px',
                        fontWeight: 500,
                        color: '#0a0a0a',
                      }}
                    >
                      {route.label}
                    </span>
                    <span
                      style={{
                        fontSize: '13px',
                        color: '#a3a3a3',
                      }}
                    >
                      {route.path}
                    </span>
                  </li>
                );
              })}
            </ul>

            {/* Hint bar */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '16px',
                padding: '12px 20px',
                borderTop: '1px solid #e5e5e5',
                fontSize: '12px',
                color: '#a3a3a3',
              }}
            >
              <span>
                <kbd style={{ fontFamily: 'inherit' }}>&#8593;&#8595;</kbd>{' '}
                Navigate
              </span>
              <span>
                <kbd style={{ fontFamily: 'inherit' }}>&#8629;</kbd> Open
              </span>
              <span>
                <kbd style={{ fontFamily: 'inherit' }}>esc</kbd> Close
              </span>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
