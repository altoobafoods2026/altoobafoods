import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      setTimeout(() => {
        const element = document.getElementById(hash.replace('#', ''));
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      window.scrollTo(0, 0);
    }

    // Dynamic Canonical Tag Management for Googlebot & SEO
    try {
      const baseUrl = 'https://www.altoobafoods.com';
      const cleanPath = pathname === '/' ? '/' : pathname.replace(/\/+$/, '');
      const canonicalUrl = `${baseUrl}${cleanPath}`;

      let canonicalTag = document.querySelector("link[rel='canonical']");
      if (!canonicalTag) {
        canonicalTag = document.createElement('link');
        canonicalTag.setAttribute('rel', 'canonical');
        document.head.appendChild(canonicalTag);
      }
      canonicalTag.setAttribute('href', canonicalUrl);
    } catch (e) {
      console.warn('Could not update canonical URL', e);
    }
  }, [pathname, hash]);

  return null;
}
