const ACCESS_PASS_SERVICES = {
  auditor: 'Auditor Estratégico',
  probador: 'Probador Virtual IA',
};

const REDEEMED_KEY = 'websd-access-passes-redeemed-v1';
let passListPromise;

export const getPassServiceName = (service) => ACCESS_PASS_SERVICES[service] || 'este servicio';
export const isAccessPassConfigured = () => true;
export const getPassSessionKey = (service) => `websd-access-pass-${service}`;

const loadPasses = () => {
  passListPromise ||= fetch('/access-passes.json', { cache: 'no-store' }).then((response) => {
    if (!response.ok) throw new Error('No se pudo cargar la lista de códigos.');
    return response.json();
  });
  return passListPromise;
};

const readRedeemed = () => {
  try { return JSON.parse(localStorage.getItem(REDEEMED_KEY) || '{}'); }
  catch { return {}; }
};

// Sitio estático: el canje se registra en este navegador y no se sincroniza entre dispositivos.
export const redeemAccessPass = async (service, rawCode) => {
  const code = rawCode.trim().toUpperCase();
  const passes = await loadPasses();
  if (!passes.codes?.includes(code)) throw new Error('El código no es válido. Revisa que esté escrito correctamente.');

  const redeemed = readRedeemed();
  if (redeemed[code]) throw new Error('Este código ya fue utilizado en este navegador.');
  redeemed[code] = { service, redeemedAt: new Date().toISOString() };
  localStorage.setItem(REDEEMED_KEY, JSON.stringify(redeemed));
  return { ok: true };
};

export const getAccessPassStats = async () => {
  const passes = await loadPasses();
  const redeemed = readRedeemed();
  const used = Object.keys(redeemed).length;
  return { total: passes.codes.length, used, available: passes.codes.length - used, redeemed };
};

export const getAllAccessPasses = loadPasses;
export const issueAccessPass = async () => {
  const passes = await loadPasses();
  const redeemed = readRedeemed();
  const code = passes.codes.find((candidate) => !redeemed[candidate]);
  if (!code) throw new Error('No hay códigos disponibles en este navegador.');
  return { code };
};
