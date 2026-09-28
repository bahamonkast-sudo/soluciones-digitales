import React from 'react';
import { Helmet } from 'react-helmet-async';
import { getSiteUrl } from '../utils/env';
import TrackingConsent from './TrackingConsent';

export default function SEO({
  title,
  description,
  keywords,
  canonicalUrl,
  path,
  ogImage,
  ogTitle,
  ogDescription,
  robots,
  structuredData = null
}) {
  const siteName = "Soluciones Digitales IA";
  const fullTitle = `${title} | ${siteName}`;
  const siteUrl = getSiteUrl().replace(/\/$/, '');
  // Compat: páginas legacy pasan `path` en vez de `canonicalUrl`
  const resolvedPath = path || null;
  const absCanonical = canonicalUrl
    ? (canonicalUrl.startsWith('http') ? canonicalUrl : `${siteUrl}${canonicalUrl.startsWith('/') ? '' : '/'}${canonicalUrl}`)
    : resolvedPath
      ? (resolvedPath.startsWith('http') ? resolvedPath : `${siteUrl}${resolvedPath.startsWith('/') ? '' : '/'}${resolvedPath}`)
      : siteUrl + '/';
  const defaultOgImage = `${siteUrl}/og/og-default.jpg`;
  const usedOgImage = ogImage
    ? (ogImage.startsWith('http') ? ogImage : `${siteUrl}${ogImage.startsWith('/') ? '' : '/'}${ogImage}`)
    : defaultOgImage;
  const usedOgTitle = ogTitle || fullTitle;
  const usedOgDescription = ogDescription || description;

  return (
    <>
    <Helmet>
      {/* Standard metadata tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      
      {/* OpenGraph tags */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={absCanonical} />
      <meta property="og:title" content={usedOgTitle} />
      <meta property="og:description" content={usedOgDescription} />
      <meta property="og:image" content={usedOgImage} />
      <meta property="og:image:alt" content={usedOgTitle} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content="es_CO" />

      {/* Twitter Card tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={absCanonical} />
      <meta name="twitter:title" content={usedOgTitle} />
      <meta name="twitter:description" content={usedOgDescription} />
      <meta name="twitter:image" content={usedOgImage} />
      <meta name="twitter:image:alt" content={usedOgTitle} />

      {/* Canonical URL */}
      {absCanonical && <link rel="canonical" href={absCanonical} />}

      {/* Robots (solo cuando se pide noindex) */}
      {robots && <meta name="robots" content={robots} />}

      {/* Structured Data (JSON-LD) */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
    {!robots?.includes('noindex') && <TrackingConsent pagePath={absCanonical} />}
    </>
  );
}
