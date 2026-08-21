import React from 'react';
import { Helmet } from 'react-helmet-async';
import { getSiteUrl } from '../utils/env';

export default function SEO({ 
  title, 
  description, 
  keywords, 
  canonicalUrl, 
  ogImage,
  structuredData = null 
}) {
  const siteName = "Soluciones Digitales IA";
  const fullTitle = `${title} | ${siteName}`;
  const siteUrl = getSiteUrl();
  const defaultOgImage = `${siteUrl}/wp-content/plugins/websd-react/dist/favicon.svg`;
  const usedOgImage = ogImage || defaultOgImage;
  const usedCanonical = canonicalUrl || siteUrl;

  return (
    <Helmet>
      {/* Standard metadata tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      
      {/* OpenGraph tags */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={usedCanonical} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={usedOgImage} />
      <meta property="og:site_name" content={siteName} />
      
      {/* Twitter Card tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={usedCanonical} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={usedOgImage} />

      {/* Canonical URL */}
      {usedCanonical && <link rel="canonical" href={usedCanonical} />}

      {/* Structured Data (JSON-LD) */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
}
