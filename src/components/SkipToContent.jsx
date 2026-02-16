export default function SkipToContent() {
  return (
    <a
      href="#main-content"
      style={{
        position: 'fixed',
        top: '-100px',
        left: '16px',
        background: '#2563EB',
        color: '#fff',
        padding: '12px 24px',
        borderRadius: '8px',
        zIndex: 10000,
        fontWeight: 600,
        fontSize: '14px',
        textDecoration: 'none',
        transition: 'top 0.2s ease',
      }}
      onFocus={(e) => {
        e.currentTarget.style.top = '16px';
      }}
      onBlur={(e) => {
        e.currentTarget.style.top = '-100px';
      }}
    >
      Skip to content
    </a>
  );
}
