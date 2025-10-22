'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import ModernLoader from './ModernLoader';

export default function AuthGuard({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('authToken');

       
        if (!token) {
          router.push('/auth');
          return;
        }

        const tokenData = JSON.parse(token);
        const now = Date.now();

        if (!tokenData?.expires || now >= tokenData.expires) {
          localStorage.removeItem('authToken');
          router.push('/auth');
          return;
        }

      
        setIsAuthenticated(true);
      } catch (err) {
        localStorage.removeItem('authToken');
        router.push('/auth');
      } finally {
       
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  if (isLoading) {
    return <ModernLoader fullScreen visible text="Checking authentication..." />;
  }

  if (!isAuthenticated) {
    return null;
  }

  return children;
}
