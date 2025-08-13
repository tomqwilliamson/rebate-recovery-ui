import React, { useEffect } from 'react';
import { useMsal } from '@azure/msal-react';
import { LoadingSpinner } from '@components/common/UI/LoadingSpinner';

export const AuthCallback: React.FC = () => {
  const { instance } = useMsal();

  useEffect(() => {
    instance.handleRedirectPromise().then((response) => {
      if (response) {
        // Handle successful authentication
        console.log('Authentication successful:', response);
      }
    }).catch((error) => {
      console.error('Authentication error:', error);
    });
  }, [instance]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="text-center">
        <LoadingSpinner size="lg" />
        <p className="mt-4 text-slate-600">Processing authentication...</p>
      </div>
    </div>
  );