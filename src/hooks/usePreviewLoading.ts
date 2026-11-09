import { useEffect, useState } from 'react';

let hasShownInitialLoader = false;

/** Simulates a short request while screens use local demo data. Replace with API query state in production. */
export function usePreviewLoading(delay = 700) {
  const [isLoading, setIsLoading] = useState(() => !hasShownInitialLoader);

  useEffect(() => {
    if (!isLoading) return;
    const timer = setTimeout(() => {
      hasShownInitialLoader = true;
      setIsLoading(false);
    }, delay);
    return () => clearTimeout(timer);
  }, [delay, isLoading]);

  return isLoading;
}
