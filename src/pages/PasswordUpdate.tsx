import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

const PasswordUpdate = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const init = async () => {
      try {
        const url = new URL(window.location.href);
        const type = url.searchParams.get('type');

        if (type !== 'recovery') {
          setMessage('Invalid reset link. Please request a new password reset email.');
          setStatus('error');
          return;
        }

        const { error } = await supabase.auth.getSessionFromUrl({ storeSession: true });
        if (error) {
          console.warn('Unable to establish recovery session from URL:', error.message);
          // Still allow the user to submit a new password if the token is present.
        }

        setStatus('ready');
      } catch (error: any) {
        console.error('Password reset init failed:', error);
        setMessage('Unable to validate password reset link. Please try again.');
        setStatus('error');
      }
    };

    init();
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!password || password !== confirmPassword) {
      toast.error('Passwords must match');
      return;
    }

    setIsSubmitting(true);

    const { error } = await supabase.auth.updateUser({ password });
    setIsSubmitting(false);

    if (error) {
      toast.error(error.message || 'Unable to reset password');
      return;
    }

    toast.success('Password reset successfully. Please sign in with your new password.');
    navigate('/auth');
  };

  return (
    <div className="min-h-screen bg-white text-black light">
      <div className="flex flex-col justify-center items-center min-h-screen px-4 py-8">
        <div className="w-full max-w-sm sm:max-w-md">
          <div className="text-center mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">Reset Password</h1>
            <p className="text-sm sm:text-base text-muted-foreground">
              Enter a new password to complete your account recovery.
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-lg p-8">
            {status === 'loading' ? (
              <div className="text-center">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary mx-auto mb-4" />
                <p className="text-muted-foreground">Validating reset link...</p>
              </div>
            ) : status === 'error' ? (
              <div className="space-y-4 text-center">
                <p className="text-sm text-red-600">{message || 'Unable to use this reset link.'}</p>
                <Button variant="outline" className="w-full" onClick={() => navigate('/auth/reset')}>
                  Request a new reset link
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="new-password" className="text-sm font-medium">New Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="new-password"
                      type="password"
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      placeholder="Enter new password"
                      className="pl-10 h-12 text-base"
                      required
                      minLength={6}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirm-password" className="text-sm font-medium">Confirm Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="confirm-password"
                      type="password"
                      value={confirmPassword}
                      onChange={(event) => setConfirmPassword(event.target.value)}
                      placeholder="Confirm new password"
                      className="pl-10 h-12 text-base"
                      required
                      minLength={6}
                    />
                  </div>
                </div>

                <Button type="submit" className="w-full h-12" disabled={isSubmitting}>
                  {isSubmitting ? 'Resetting password...' : 'Reset Password'}
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordUpdate;
