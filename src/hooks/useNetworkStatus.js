import { useState, useEffect, useCallback, useRef } from 'react';

const STORAGE_KEY = 'websd-activity-log';

function loadLog() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveLog(log) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(log.slice(-500)));
  } catch {}
}

let globalLog = loadLog();
const listeners = new Set();

function notifyListeners() {
  listeners.forEach(fn => fn(globalLog));
}

function pushGlobalLog(entry) {
  globalLog = [...globalLog, { ...entry, timestamp: entry.timestamp || new Date().toISOString() }];
  saveLog(globalLog);
  notifyListeners();
}

export function useNetworkStatus() {
  const [online, setOnline] = useState(navigator.onLine);
  const [log, setLog] = useState(globalLog);
  const prevOnline = useRef(online);

  useEffect(() => {
    const goOnline = () => {
      setOnline(true);
      pushGlobalLog({ type: 'network', message: 'Conexión restablecida', status: 'online' });
    };
    const goOffline = () => {
      setOnline(false);
      pushGlobalLog({ type: 'network', message: 'Conexión perdida', status: 'offline' });
    };
    window.addEventListener('online', goOnline);
    window.addEventListener('offline', goOffline);

    if (navigator.onLine && !prevOnline.current) {
      pushGlobalLog({ type: 'network', message: 'Página conectada', status: 'online' });
    } else if (!navigator.onLine) {
      pushGlobalLog({ type: 'network', message: 'Página sin conexión', status: 'offline' });
    }
    prevOnline.current = navigator.onLine;

    const listener = (newLog) => setLog([...newLog]);
    listeners.add(listener);

    return () => {
      window.removeEventListener('online', goOnline);
      window.removeEventListener('offline', goOffline);
      listeners.delete(listener);
    };
  }, []);

  return { online, log };
}

export function useMenuVisibility() {
  const [visibility, setVisibility] = useState({
    navbarVisible: true,
    productosOpen: false,
    mobileMenuOpen: false,
    viewportWidth: window.innerWidth,
  });

  useEffect(() => {
    const observer = new MutationObserver(() => {
      const nav = document.querySelector('nav');
      const productosBtn = document.querySelector('button[class*="productos"]');
      const mobileBtn = document.querySelector('button[aria-label="Menú"]');

      setVisibility({
        navbarVisible: nav !== null && nav.offsetParent !== null,
        productosOpen: productosBtn?.getAttribute('aria-expanded') === 'true' || false,
        mobileMenuOpen: !!mobileBtn && document.querySelector('.fixed.inset-0.top-14.bg-black\\/70') !== null,
        viewportWidth: window.innerWidth,
      });
    });

    observer.observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ['class', 'aria-expanded'] });
    return () => observer.disconnect();
  }, []);

  return visibility;
}

export function useActivityLogger() {
  const logActivity = useCallback((type, message, data = {}) => {
    pushGlobalLog({ type, message, ...data });
  }, []);

  const getLog = useCallback(() => globalLog, []);

  const clearLog = useCallback(() => {
    globalLog = [];
    saveLog([]);
    notifyListeners();
  }, []);

  return { logActivity, getLog, clearLog };
}

export { pushGlobalLog };
