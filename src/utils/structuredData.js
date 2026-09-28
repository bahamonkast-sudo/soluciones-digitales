// src/utils/structuredData.js
import { getSiteUrl } from './env';

export const getBaseUrl = () => (getSiteUrl() || '').replace(/\/$/, '');
export const getLogoUrl = () => `${getBaseUrl()}/favicon.svg`;

export const generateOrganizationSchema = () => {
  const baseUrl = getBaseUrl();
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Soluciones Digitales IA",
    "url": baseUrl,
    "logo": getLogoUrl(),
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+57-311-589-3220",
      "contactType": "customer service",
      "availableLanguage": "Spanish"
    },
    "sameAs": [
      // Añadir redes sociales reales aquí si las hay
    ]
  };
};

export const generateLocalBusinessSchema = () => {
  const baseUrl = getBaseUrl();
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Soluciones Digitales IA",
    "image": getLogoUrl(),
    "@id": baseUrl,
    "url": baseUrl,
    "telephone": "+573115893220",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Bogotá",
      "addressCountry": "CO"
    }
  };
};

export const generateServiceSchema = (serviceName, description, url) => {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": serviceName,
    "description": description,
    "provider": {
      "@type": "Organization",
      "name": "Soluciones Digitales IA",
      "url": getBaseUrl()
    },
    "url": `${getBaseUrl()}${url}`
  };
};

export const generateWebSiteSchema = () => {
  return {
    "@context": "https://schema.org/",
    "@type": "WebSite",
    "name": "Soluciones Digitales IA",
    "url": getBaseUrl(),
    "potentialAction": {
      "@type": "SearchAction",
      "target": "{search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };
};

export const generateFAQSchema = (faqs) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map((f) => ({
    "@type": "Question",
    "name": f.q,
    "acceptedAnswer": { "@type": "Answer", "text": f.a }
  }))
});

export const generateProductSchema = ({ name, description, url, image, price, priceCurrency = 'COP' }) => ({
  "@context": "https://schema.org",
  "@type": "Product",
  "name": name,
  "description": description,
  "url": `${getBaseUrl()}${url}`,
  ...(image ? { "image": [`${getBaseUrl()}${image}`] } : {}),
  "brand": { "@type": "Brand", "name": "Soluciones Digitales IA" },
  ...(price ? {
    "offers": {
      "@type": "Offer",
      "price": price,
      "priceCurrency": priceCurrency,
      "availability": "https://schema.org/InStock",
      "url": `${getBaseUrl()}${url}`
    }
  } : {})
});

export const generateBreadcrumbSchema = (items) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": items.map((it, i) => ({
    "@type": "ListItem",
    "position": i + 1,
    "name": it.name,
    "item": `${getBaseUrl()}${it.path}`
  }))
});

export const combineSchemas = (...schemas) => schemas.filter(Boolean);
