import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { useAuthStore } from '../context/useAuthStore';
import { deleteCookie, formatTimeLeft, getCookie, setCookie } from '../utils/cookies';

type JWTPayload = { exp?: number }; 

export default function useAuthCheck(cookieName: string = 'token') {
  const navigate = useNavigate();
  const { logout } = useAuthStore();
  const timeoutRef = useRef<number | null>(null);

  const clearTimer = () => {
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  const doLogout = () => {
    clearTimer();
    localStorage.removeItem('token');
    deleteCookie(cookieName);
    logout(); 
    navigate('/login', { replace: true });
  };

  const scheduleLogoutAtExpiry = () => {
   
    let token = getCookie(cookieName);

    if (!token) {
      const lsToken = localStorage.getItem('token');
      if (lsToken) {
        try {
          const { exp } = jwtDecode<JWTPayload>(lsToken);
          const nowSec = Math.floor(Date.now() / 1000);
          if (exp && exp > nowSec) {
            setCookie(cookieName, lsToken, exp - nowSec); 
            token = lsToken;
          }
        } catch {
          // token corrupto en LS: ignorar para forzar logout más abajo
        }
      }
    }

    if (!token) {
      console.warn('⚠️ Sin token (cookie y LS) → logout');
      doLogout();
      return;
    }

    try {
      const { exp } = jwtDecode<JWTPayload>(token);
      const nowMs = Date.now();
      const expMs = (exp ?? 0) * 1000;

      if (!exp) {
        console.warn('⚠️ Token sin claim exp → logout');
        doLogout();
        return;
      }
      if (expMs <= nowMs) {
        console.warn('❌ Token ya expirado → logout');
        doLogout();
        return;
      }

      const SKEW_MS = 5000;
      const delay = Math.max(0, expMs - nowMs - SKEW_MS);

      clearTimer();
      timeoutRef.current = window.setTimeout(() => {
        console.warn('⏳ Expiración alcanzada → logout');
        doLogout();
      }, delay);

      const timeLeftSec = Math.round((expMs - nowMs) / 1000);
      console.log(`✅ Token válido. Vence en ~ ${formatTimeLeft(timeLeftSec)}.`);
    } catch (err: unknown) {
      console.error(
        '⚠️ Token inválido/corrupto → logout',
        err instanceof Error ? err.message : String(err)
      );
      doLogout();
    }
  };

  useEffect(() => {
    scheduleLogoutAtExpiry();
    const onFocus = () => scheduleLogoutAtExpiry();
    document.addEventListener('visibilitychange', onFocus);
    window.addEventListener('focus', onFocus);
    
    const onStorage = (ev: StorageEvent) => {
      if (ev.key === 'token') scheduleLogoutAtExpiry();
    };
    window.addEventListener('storage', onStorage);

    return () => {
      clearTimer();
      document.removeEventListener('visibilitychange', onFocus);
      window.removeEventListener('focus', onFocus);
      window.removeEventListener('storage', onStorage);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
