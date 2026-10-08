import { useState, useEffect } from 'react';

/**
 * Custom hook to safely extract and sanitize guest name from URL query parameters.
 * Supports: ?name=..., ?to=..., ?guest=...
 * Fallback: "Tamu Undangan"
 */
export function useGuestName(defaultName = 'Tamu Undangan') {
  const [guestName, setGuestName] = useState(defaultName);

  useEffect(() => {
    try {
      const searchParams = new URLSearchParams(window.location.search);
      const rawName = searchParams.get('name') || searchParams.get('to') || searchParams.get('guest');

      if (rawName && rawName.trim().length > 0) {
        // Decode URI component and replace plus signs with spaces
        let decoded = decodeURIComponent(rawName.replace(/\+/g, ' ')).trim();

        // Basic XSS sanitization (remove HTML tags)
        decoded = decoded.replace(/<[^>]*>?/gm, '');

        if (decoded.length > 0) {
          // Capitalize each word nicely
          const formatted = decoded
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
          setGuestName(formatted);
        }
      }
    } catch (error) {
      console.warn('Failed to parse guest name from URL:', error);
      setGuestName(defaultName);
    }
  }, [defaultName]);

  return guestName;
}

