/**
 * SEOHead — renders <title> and <meta> tags using React 19's native
 * support for hoisting these elements into <head>.
 *
 * Usage:
 *   <SEOHead title="My Page" description="Page description" />
 */

export default function SEOHead({
  title = 'SpecGravity — Managed IT for Multi-Unit Brands',
  description = '24/7 IT support for multi-unit restaurant, retail, and hospitality brands.',
  path,
  image,
}) {
  const canonicalUrl = path
    ? `https://specgravity.com${path}`
    : undefined;

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      {canonicalUrl && <meta property="og:url" content={canonicalUrl} />}
      {image && <meta property="og:image" content={image} />}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {image && <meta name="twitter:image" content={image} />}
    </>
  );
}
