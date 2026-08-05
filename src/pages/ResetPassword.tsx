import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Mail, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { useAuth } from '@/hooks/use-auth';

const ResetPassword = () => {
  const navigate = useNavigate();
  const { resetPassword } = useAuth();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const trimmedEmail = email.trim();
    if (!trimmedEmail) {
      toast.error('Please enter your email address.');
      return;
    }

    setIsLoading(true);
    const { error } = await resetPassword(trimmedEmail);
    setIsLoading(false);

    if (!error) {
      setSubmitted(true);
    }
  };

  return (
    <div className="min-h-screen bg-white text-black light">
      <div className="flex flex-col justify-center items-center min-h-screen px-4 py-8">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-sm sm:max-w-md"
        >
          <div className="text-center mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">Reset Password</h1>
            <p className="text-sm sm:text-base text-muted-foreground">
              Enter the email address for your account and we’ll send a reset link.
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-lg p-8">
            {submitted ? (
              <div className="space-y-4 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                  <svg className="h-8 w-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="text-xl font-semibold text-foreground">Check your inbox</h2>
                <p className="text-muted-foreground">
                  If the address exists, you’ll receive a password reset link shortly.
                </p>
                <Button onClick={() => navigate('/app/auth')} className="w-full h-12">
                  Back to Sign In
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="reset-email" className="text-sm font-medium">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="reset-email"
                      name="email"
                      type="email"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      placeholder="Enter your email"
                      className="pl-10 h-12 text-base"
                      required
                    />
                  </div>
                </div>

                <Button type="submit" className="w-full h-12 text-base font-medium" disabled={isLoading}>
                  {isLoading ? 'Sending reset link...' : 'Send Reset Link'}
                </Button>

                <Button
                  type="button"
                  variant="ghost"
                  className="w-full h-12 text-base text-foreground"
                  onClick={() => navigate('/app/auth')}
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Sign In
                </Button>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ResetPassword;
