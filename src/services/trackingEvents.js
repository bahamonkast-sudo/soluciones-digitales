export const trackLead = (method) => {
  window.dispatchEvent(new CustomEvent('websd:conversion', { detail: { type: 'lead', method } }));
};

export const trackContact = (method = 'whatsapp') => {
  window.dispatchEvent(new CustomEvent('websd:conversion', { detail: { type: 'contact', method } }));
};
