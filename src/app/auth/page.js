'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@progress/kendo-react-inputs';
import { Button } from '@progress/kendo-react-buttons';
import { Card, CardBody } from '@progress/kendo-react-layout';
import { Loader } from '@progress/kendo-react-indicators';
import ModernLoader from '../../components/ModernLoader';

export default function AuthPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isChecking, setIsChecking] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      try {
        const tokenData = JSON.parse(token);
        const now = new Date().getTime();
        
        if (now < tokenData.expires) {
          router.push('/');
          return;
        } else {
          localStorage.removeItem('authToken');
        }
      } catch (error) {
        localStorage.removeItem('authToken');
      }
    }
    setIsChecking(false);
  }, [router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    await new Promise(resolve => setTimeout(resolve, 800));

    if (password === 'gumby') {
      const now = new Date().getTime();
      const expires = now + (12 * 60 * 60 * 1000);
      const tokenData = {
        token: 'auth_' + now,
        expires: expires
      };
      localStorage.setItem('authToken', JSON.stringify(tokenData));
      router.push('/');
    } else {
      setError('Incorrect password. Please try again.');
      setPassword('');
    }
    
    setIsLoading(false);
  };

  if (isChecking) {
    return <ModernLoader fullScreen={true} text="Checking authentication..." />;
  }

  return (
    <div className="auth-container">
      <Card className="auth-card">
        <CardBody>
          <div className="auth-content">
            <div className="auth-header">
              <h1>Welcome</h1>
              <p>Please enter your password to access the system</p>
            </div>

            <form onSubmit={handleSubmit} className="auth-form">
              <div className="form-group">
              
                <Input
                  id="password"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={isLoading}
                  className="password-input"
                />
              </div>

              <div className="error-container">
                {error && (
                  <div className="error-message">
                    <span className="error-icon">⚠️</span>
                    {error}
                  </div>
                )}
              </div>

              <Button
                type="submit"
                themeColor="primary"
                size="large"
                disabled={isLoading || !password.trim()}
                className="submit-button"
              >
                {isLoading ? (
                  <Loader size="small" />
                ) : (
                  'Sign In'
                )}
              </Button>
            </form>
          </div>
        </CardBody>
      </Card>

      <style jsx>{`
        .auth-container {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #ffffff;
          padding: 20px;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
        }

        :global(.auth-card) {
          width: 100%;
          max-width: 420px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          border-radius: 12px;
          border: 1px solid #e9ecef;
          background: #ffffff;
        }

        .auth-content {
          padding: 40px 30px;
        }

        .auth-header {
          text-align: center;
          margin-bottom: 40px;
        }

        .auth-header h1 {
          font-size: 32px;
          font-weight: 600;
          color: var(--kendo-color-secondary);
          margin-bottom: 8px;
        }

        .auth-header p {
          font-size: 16px;
          color: #333333;
          line-height: 1.5;
        }

        .auth-form {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .form-group label {
          font-size: 14px;
          font-weight: 500;
          color: var(--kendo-color-secondary);
        }

        :global(.password-input) {
          height: 48px;
          border-radius: 8px;
          border: 1px solid var(--kendo-color-base-emphasis);
          transition: all 0.2s ease;
          background: #ffffff;
        }

        :global(.password-input:focus) {
          border-color: var(--kendo-color-primary);
          box-shadow: 0 0 0 3px rgba(255, 94, 0, 0.1);
        }

        .error-container {
          min-height: 48px;
          display: flex;
          align-items: flex-start;
        }

        .error-message {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 12px 16px;
          background: #fff5f5;
          border: 1px solid #fed7d7;
          border-radius: 8px;
          color: #c53030;
          font-size: 14px;
          font-weight: 500;
          width: 100%;
        }

        .error-icon {
          font-size: 16px;
        }

        :global(.submit-button) {
          height: 42px;
          width: 140px;
          border-radius: 12px;
          font-size: 15px;
          font-weight: 600;
          background: var(--kendo-color-primary);
          border: 2px solid var(--kendo-color-primary);
          color: white;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          margin: 0 auto;
          box-shadow: 0 4px 15px rgba(255, 94, 0, 0.2);
          cursor: pointer;
        }

        :global(.submit-button:hover:not(:disabled)) {
          background: var(--kendo-color-primary-darker);
          border-color: var(--kendo-color-primary-darker);
          transform: translateY(-2px) scale(1.05);
          box-shadow: 0 8px 25px rgba(255, 94, 0, 0.4);
        }

        :global(.submit-button:active:not(:disabled)) {
          transform: translateY(0) scale(0.95);
          box-shadow: 0 2px 10px rgba(255, 94, 0, 0.3);
        }

        :global(.submit-button:disabled) {
          opacity: 0.6;
          cursor: not-allowed;
        }

        @media (max-width: 480px) {
          .auth-container {
            padding: 16px;
          }
          
          .auth-content {
            padding: 30px 20px;
          }
          
          .auth-header h1 {
            font-size: 28px;
          }
        }
      `}</style>
    </div>
  );
}