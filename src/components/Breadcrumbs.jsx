import { Link, useLocation } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

const LABEL_MAP = {
  '': 'Home',
  about: 'About Us',
  clients: 'Clients',
  solutions: 'Solutions',
  hospitality: 'Hospitality',
  retail: 'Retail',
  'nationwide-dispatching': 'Nationwide Dispatching',
  'office-support': 'Office Tech Support',
  'dedicated-resources': 'Dedicated Resources',
  contact: 'Contact',
  blog: 'Blog',
};

function getLabel(segment) {
  if (segment in LABEL_MAP) return LABEL_MAP[segment];
  return segment
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

export default function Breadcrumbs() {
  const { pathname } = useLocation();

  const segments = pathname.split('/').filter(Boolean);
  if (segments.length === 0) return null;

  const crumbs = [
    { label: 'Home', path: '/' },
    ...segments.map((seg, i) => ({
      label: getLabel(seg),
      path: '/' + segments.slice(0, i + 1).join('/'),
    })),
  ];

  return (
    <nav aria-label="Breadcrumb">
      <ol
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          listStyle: 'none',
          margin: 0,
          padding: 0,
          fontSize: '14px',
          color: '#737373',
        }}
      >
        {crumbs.map((crumb, i) => {
          const isLast = i === crumbs.length - 1;
          return (
            <li
              key={crumb.path}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              {i > 0 && (
                <ChevronRight
                  size={14}
                  strokeWidth={2}
                  style={{ color: '#a3a3a3', flexShrink: 0 }}
                  aria-hidden="true"
                />
              )}
              {isLast ? (
                <span
                  aria-current="page"
                  style={{ color: '#0A0A0A', fontWeight: 600 }}
                >
                  {crumb.label}
                </span>
              ) : (
                <Link
                  to={crumb.path}
                  style={{
                    color: '#737373',
                    textDecoration: 'none',
                  }}
                >
                  {crumb.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
