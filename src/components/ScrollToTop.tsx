import { useEffect, useLayoutEffect } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';

export function ScrollToTop() {
  const location = useLocation();
  const navigationType = useNavigationType();

  useEffect(() => {
    // Disable default browser scroll restoration globally
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
  }, []);

  useLayoutEffect(() => {
    // Force instant scroll to top on every route change (path or search params)
    // useLayoutEffect runs before the browser has a chance to paint
    const scrollToTop = () => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTo(0, 0);
      document.body.scrollTo(0, 0);
    };

    scrollToTop();
    
    // Backup for slow-loading images, layout shifts, or framer-motion animations
    const timeoutId = setTimeout(scrollToTop, 1);
    const timeoutIdNext = setTimeout(scrollToTop, 50);
    const timeoutIdLong = setTimeout(scrollToTop, 200);
    const timeoutIdExtraLong = setTimeout(scrollToTop, 1000);

    return () => {
      clearTimeout(timeoutId);
      clearTimeout(timeoutIdNext);
      clearTimeout(timeoutIdLong);
      clearTimeout(timeoutIdExtraLong);
    };
  }, [location.pathname, location.search]);

  return null;
}
