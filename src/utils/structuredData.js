// src/utils/structuredData.js
import { getSiteUrl } from './env';

export const getBaseUrl = () => getSiteUrl() || '';
export const getLogoUrl = () => `${getBaseUrl()}/wp-content/plugins/websd-react/dist/favicon.svg`;

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
