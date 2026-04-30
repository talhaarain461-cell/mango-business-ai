import { useEffect } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';

export function ScrollToTop() {
  const { pathname } = useLocation();
  const navigationType = useNavigationType();

  useEffect(() => {
    // Only scroll to top on PUSH (new navigation)
    // POP (back/forward) should let browser handle restoration
    if (navigationType !== 'POP') {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [pathname, navigationType]);

  return null;
}
