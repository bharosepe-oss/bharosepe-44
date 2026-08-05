import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { getGoogleAuth } from '@/services/googleAuth';
import { getUserFormSubmissions } from '@/services/formSubmissionService';
import { toast } from 'sonner';
import LoadingSpinner from '@/components/LoadingSpinner';

const AuthCallback: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [skipped, setSkipped] = useState(false);
  const skippedRef = useRef(false);

  useEffect(() => {
    const handleCallback = async () => {
      if (skippedRef.current) {
        console.log('⏭️ Skip requested — aborting callback handler');
        return;
      }

      try {
        console.log('🔄 Processing OAuth callback...');

        const error = searchParams.get('error');
        const errorDescription = searchParams.get('error_description');

        if (error) {
          console.error('❌ OAuth error from URL:', error, errorDescription);
          setStatus('error');
          setErrorMessage(errorDescription || error);
          toast.error('Authentication failed: ' + (errorDescription || error));
          setTimeout(() => navigate('/app/auth'), 3000);
          return;
        }

        const result = await getGoogleAuth().handleCallback();

        if (!result?.user) {
          console.log('⚠️ No user session found after callback');
          setStatus('error');
          setErrorMessage('No user session found');
          setTimeout(() => navigate('/app/auth'), 3000);
          return;
        }

        console.log('✅ Authentication successful');
        setStatus('success');

        const hasSessionState = !!sessionStorage.getItem('transactionSetupState');

        if (hasSessionState) {
          console.log('📦 Found active transaction state in session storage — resuming setup');
          toast.success('Resuming your in-progress transaction');
          if (!skippedRef.current) navigate('/app/transaction-setup');
          return;
        }

        // Only resume from server-side drafts when the user explicitly returns
        // from a transaction setup flow in the same session.
        if (false) {
          try {
            const userId = result.user.id;
            const submissions = await getUserFormSubmissions(userId);
            const draft = submissions?.find(s => s.form_status === 'draft' || (s.completion_percentage || 0) < 100);
            if (draft) {
              console.log('📥 Found server-side draft:', draft.form_id);
              toast.success('Found a saved draft — resuming your form');
              if (!skippedRef.current) navigate('/app/transaction-setup', { state: { resumeFormId: draft.form_id } });
              return;
            }
          } catch (err) {
            console.warn('Error checking drafts after login:', err);
          }
        }

        if (!result.profile || !result.profile.phone) {
          console.log('📝 Redirecting to profile setup...');
          toast.success('Welcome! Please complete your profile setup.');
          if (!skippedRef.current) navigate('/app/profile-setup');
        } else {
          console.log('🏠 Redirecting to app home...');
          toast.success('Welcome back!');
          if (!skippedRef.current) navigate('/app');
        }
      } catch (error: any) {
        console.error('❌ OAuth callback error:', error);
        setStatus('error');
        setErrorMessage(error.message || 'Authentication failed');
        toast.error('Authentication failed. Redirecting to login...');
        setTimeout(() => navigate('/app/auth'), 3000);
      }
    };

    if (!skipped) handleCallback();
  }, [navigate, searchParams]);

  const renderContent = () => {
    switch (status) {
      case 'loading':
        return (
          <div className="text-center">
            <LoadingSpinner />
            <h2 className="text-xl font-semibold mt-4 mb-2">Completing Sign In</h2>
            <p className="text-muted-foreground">
              Please wait while we complete your Google authentication...
            </p>
          </div>
        );

      case 'success':
        return (
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold mb-2 text-green-600">Success!</h2>
            <p className="text-muted-foreground">
              You've been successfully signed in. Redirecting you now...
            </p>
          </div>
        );

      case 'error':
        return (
          <div className="text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold mb-2 text-red-600">Authentication Failed</h2>
            <p className="text-muted-foreground mb-4">
              {errorMessage || 'Something went wrong during authentication.'}
            </p>
            <p className="text-sm text-muted-foreground">
              Redirecting you back to login page...
            </p>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="absolute top-4 right-4">
        <button
          onClick={() => {
            setSkipped(true);
            // Force a full page navigation to /app so the running callback
            // handler cannot redirect back and override user's choice.
            window.location.href = '/app';
          }}
          className="text-sm text-muted-foreground hover:underline"
          aria-label="Skip and go home"
        >
          Skip
        </button>
      </div>
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-bharose-primary mb-2">Bharose Pe</h1>
          <p className="text-muted-foreground">Authentication</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-lg p-8">
          {renderContent()}
        </div>

        {/* Debug info in development */}
        {import.meta.env.DEV && (
          <div className="mt-4 p-3 bg-gray-100 rounded text-xs text-gray-600">
            <p><strong>Debug Info:</strong></p>
            <p>Status: {status}</p>
            <p>Error: {errorMessage}</p>
            <p>URL Params: {searchParams.toString()}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthCallback;