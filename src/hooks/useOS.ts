import { useState, useEffect } from 'react';

type OSType = 'windows' | 'pixel';

export function useOS(): OSType {
  const [os, setOS] = useState<OSType>(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth >= 1024 ? 'windows' : 'pixel';
    }
    return 'windows';
  });

  useEffect(() => {
    const handleResize = () => {
      const newOS = window.innerWidth >= 1024 ? 'windows' : 'pixel';
      setOS(newOS);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return os;
}
