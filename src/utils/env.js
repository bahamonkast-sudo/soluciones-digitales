// src/utils/env.js

const WEBGOBOT_URL_DEV = 'http://localhost:3000';

const ENV_DEV = import.meta.env.MODE === 'development';

// Dominio actual del sitio (hosting real). Fallback seguro si no hay navegador.
export const getSiteUrl = () => {
  if (typeof window !== 'undefined') return window.location.origin;
  return '';
};

// URL del backend webgobot: en dev localhost:3000, en producción VITE_WEBGOBOT_URL
// o (si se configura proxy /api) el mismo dominio del sitio.
export const getWebgobotUrl = () => {
  if (ENV_DEV) return WEBGOBOT_URL_DEV;
  return import.meta.env.VITE_WEBGOBOT_URL || (getSiteUrl() + '/api');
};

export const WEBGOBOT_URL = getWebgobotUrl();

// Resuelve una ruta dentro del dist del plugin (producción) o de la raíz pública (dev).
// En WordPress el plugin inyecta window.websdPluginUrl (termina en '/'),
// apuntando a .../plugins/websd-react/. Los assets copiados viven en dist/.
// Fallback: deriva la base desde el propio módulo (dist/assets/X.js) para que
// funcione en cualquier página del plugin, incluso si no se inyectó la variable.
const getDistBase = () => {
  if (typeof window !== 'undefined' && window.websdPluginUrl) {
    return window.websdPluginUrl + 'dist/';
  }
  if (import.meta && import.meta.url && import.meta.url.includes('/dist/')) {
    return import.meta.url.split('/dist/')[0] + '/dist/';
  }
  return '/';
};

export const getDistUrl = (path) => getDistBase() + path;

// Resuelve la URL de una página: en dev apunta al .html de la raíz pública,
// en producción a la página de WordPress con su shortcode correspondiente.
// La raíz de WordPress se deriva de window.websdPluginUrl (inyectada por el
// plugin, p.ej. ".../wp-content/plugins/websd-react/"), recortando la parte
// de plugins. Así funciona en cualquier hosting sin recompilar.
const getWpBase = () => {
  if (typeof window !== 'undefined' && window.websdPluginUrl) {
    return window.websdPluginUrl.replace(/wp-content\/plugins\/websd-react\/$/, '');
  }
  return '/';
};

export const getFrontPageUrl = () => {
  if (ENV_DEV) return '/index.html';
  return getWpBase();
};

export const getPageUrl = (slug) => {
  if (ENV_DEV) return `/${slug}.html`;
  if (typeof window !== 'undefined' && window.websdPluginUrl) return `${getWpBase()}${slug}/`;
  return `/${slug}.html`;
};
