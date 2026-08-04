import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, User, Phone, Building2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface JoinEarlyAccessDialogProps {
  isOpen: boolean;
  onClose: () => void;
  defaultInterestedAs?: 'buyer' | 'seller' | 'both';
}

const JoinEarlyAccessDialog: React.FC<JoinEarlyAccessDialogProps> = ({ isOpen, onClose, defaultInterestedAs = 'both' }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    full_name: '',
    phone: '',
    interested_as: defaultInterestedAs,
    industry_category: 'goods',
    business_type: ''
  });

  useEffect(() => {
    if (isOpen) {
      setFormData({
        email: '',
        full_name: '',
        phone: '',
        interested_as: defaultInterestedAs,
        industry_category: 'goods',
        business_type: ''
      });
    }
  }, [isOpen, defaultInterestedAs]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Validate email
      if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        toast.error('Please enter a valid email address');
        setIsLoading(false);
        return;
      }

      // Insert into Supabase
      const { data, error } = await supabase
        .from('early_access')
        .insert([
          {
            email: formData.email || null,
            full_name: formData.full_name || null,
            phone: formData.phone || null,
            business_type: formData.business_type || null,
            interested_as: formData.interested_as,
            industry_category: formData.industry_category
          }
        ]);

      if (error) {
        if (error.message.includes('duplicate')) {
          toast.info('You\'ve already joined the early access list!');
        } else {
          toast.error(error.message || 'Failed to join early access');
        }
      } else if (data) {
        toast.success('🎉 Welcome to early access! Check your email for updates.');
        setFormData({
          email: '',
          full_name: '',
          phone: '',
          interested_as: defaultInterestedAs,
          industry_category: 'goods',
          business_type: ''
        });
        setTimeout(() => onClose(), 1500);
      }
    } catch (err) {
      console.error('Error:', err);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          />

          {/* Dialog */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            className="relative w-full max-w-md bg-white rounded-xl shadow-2xl overflow-hidden"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>

            {/* Content */}
            <div className="p-6 sm:p-8">
              {/* Header */}
              <div className="mb-6">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                  Join Early Access
                </h2>
                <p className="text-gray-600 text-sm">
                  Be among the first to access Bharose Pe and secure your transactions
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium">
                    Email Address
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder=""
                      value={formData.email}
                      onChange={handleChange}
                      className="pl-10"
                    />
                  </div>
                </div>

                {/* Full Name */}
                <div className="space-y-2">
                  <Label htmlFor="full_name" className="text-sm font-medium">
                    Full Name
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      id="full_name"
                      name="full_name"
                      placeholder=""
                      value={formData.full_name}
                      onChange={handleChange}
                      className="pl-10"
                    />
                  </div>
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-sm font-medium">
                    Phone Number
                  </Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      id="phone"
                      name="phone"
                      placeholder=""
                      value={formData.phone}
                      onChange={handleChange}
                      className="pl-10"
                    />
                  </div>
                </div>

                {/* Interested As */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium">
                    I'm interested as
                  </Label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { value: 'buyer', label: 'Buyer' },
                      { value: 'seller', label: 'Seller' },
                      { value: 'both', label: 'Both' }
                    ].map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => handleSelectChange('interested_as', option.value)}
                        className={`px-4 py-3 rounded-xl border text-sm font-medium transition ${
                          formData.interested_as === option.value
                            ? 'bg-primary text-white border-primary'
                            : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
                        }`}
                        aria-pressed={formData.interested_as === option.value}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Industry Category */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium">
                    Industry
                  </Label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { value: 'goods', label: 'Goods' },
                      { value: 'services', label: 'Services' },
                      { value: 'both', label: 'Both' }
                    ].map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => handleSelectChange('industry_category', option.value)}
                        className={`px-4 py-3 rounded-xl border text-sm font-medium transition ${
                          formData.industry_category === option.value
                            ? 'bg-primary text-white border-primary'
                            : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
                        }`}
                        aria-pressed={formData.industry_category === option.value}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Business Type */}
                <div className="space-y-2">
                  <Label htmlFor="business_type" className="text-sm font-medium">
                    Business Type
                  </Label>
                  <div className="relative">
                    <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none z-10" />
                    <Select value={formData.business_type} onValueChange={(value) => handleSelectChange('business_type', value)}>
                      <SelectTrigger className="pl-10">
                        <SelectValue placeholder="Select business type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="individual">Individual</SelectItem>
                        <SelectItem value="retail">Retail Business</SelectItem>
                        <SelectItem value="wholesale">Wholesale</SelectItem>
                        <SelectItem value="manufacturing">Manufacturing</SelectItem>
                        <SelectItem value="services">Services</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-2 rounded-lg transition-colors mt-6"
                >
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <span className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
                      Joining...
                    </span>
                  ) : (
                    'Join Early Access'
                  )}
                </Button>

                <p className="text-xs text-gray-500 text-center mt-4">
                  We'll send you exclusive updates and early access to Bharose Pe
                </p>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default JoinEarlyAccessDialog;
