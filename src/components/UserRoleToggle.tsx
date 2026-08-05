
import React from 'react';
import { ShoppingBag, Store } from 'lucide-react';
import { motion } from 'framer-motion';

interface UserRoleToggleProps {
  currentMode: 'Buyer' | 'Seller';
  onChange: (mode: 'Buyer' | 'Seller') => void;
  className?: string;
}

/**
 * Compact pill-style Buyer ↔ Seller toggle.
 * Works on mobile headers — no hidden/sm classes needed.
 */
const UserRoleToggle: React.FC<UserRoleToggleProps> = ({
  currentMode,
  onChange,
  className = '',
}) => {
  const isBuyer = currentMode === 'Buyer';

  return (
    <div
      className={`relative flex items-center rounded-full border bg-transparent p-0.5 gap-0.5 ${className} border-gray-200 dark:border-border`}
      style={{ minWidth: 130 }}
    >
      {/* Sliding highlight */}
      <motion.div
        className="absolute top-0.5 bottom-0.5 rounded-full bg-bharose-primary/10 ring-1 ring-bharose-primary/20"
        style={{ width: 'calc(50% - 2px)' }}
        animate={{ left: isBuyer ? 2 : 'calc(50% + 2px)' }}
        transition={{ type: 'spring', stiffness: 500, damping: 35 }}
      />

      {/* Buyer */}
      <button
        onClick={() => onChange('Buyer')}
        className={`relative z-10 flex-1 flex items-center justify-center gap-1 py-1.5 px-2 rounded-full text-xs font-semibold transition-colors ${
          isBuyer ? 'text-bharose-primary font-semibold' : 'text-muted-foreground hover:text-foreground'
        }`}
      >
        <ShoppingBag size={13} />
        <span>Buyer</span>
      </button>

      {/* Seller */}
      <button
        onClick={() => onChange('Seller')}
        className={`relative z-10 flex-1 flex items-center justify-center gap-1 py-1.5 px-2 rounded-full text-xs font-semibold transition-colors ${
          !isBuyer ? 'text-bharose-primary font-semibold' : 'text-muted-foreground hover:text-foreground'
        }`}
      >
        <Store size={13} />
        <span>Seller</span>
      </button>
    </div>
  );
};

export default UserRoleToggle;
