import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Shield, User, CheckCircle, Banknote, Package, FileText } from "lucide-react";

type Step = 1 | 2 | 3 | 4 | 5;

const STAGE_TEXT: Record<Step, string> = {
  1: "Buyer and Seller create a secure escrow contract on Bharose Pe",
  2: "Buyer securely deposits funds into Bharose Pe's escrow vault",
  3: "Seller delivers the product or service directly to the buyer",
  4: "Buyer confirms receipt and satisfaction with the delivery",
  5: "Bharose Pe releases payment to seller instantly",
};

const getActiveNode = (step: Step) => {
  switch (step) {
    case 1:
      return "both";
    case 2:
      return "buyer";
    case 3:
      return "seller";
    case 4:
      return "buyer";
    case 5:
      return "bharosePe";
    default:
      return "both";
  }
};

const glowStyle = (active: boolean, color: string) => ({
  boxShadow: active ? `0 0 24px 8px ${color}` : "0 0 0px 0px transparent",
});

const MobileTransactionFlow = () => {
  const [currentStep, setCurrentStep] = useState<Step>(1);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    intervalRef.current = window.setInterval(() => {
      setCurrentStep((prev) => ((prev % 5) + 1) as Step);
    }, 4200);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const activeNode = getActiveNode(currentStep);
  const isBuyerActive = activeNode === "buyer" || activeNode === "both";
  const isSellerActive = activeNode === "seller" || activeNode === "both";
  const isVaultActive = activeNode === "bharosePe";

  return (
    <div className="relative w-full bg-background py-10 px-4">
      <div className="mx-auto max-w-md space-y-6">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          <div className="rounded-3xl border border-border bg-card p-4 text-center shadow-lg">
            <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-slate-950/5">
              <User className="h-8 w-8 text-accent" strokeWidth={2.5} />
            </div>
            <div className="text-sm font-semibold text-accent">Buyer</div>
            <div className="mt-3 text-xs text-muted-foreground space-y-2">
              <p>Pay securely</p>
              <p>Protected funds</p>
            </div>
          </div>

          <div className="rounded-3xl border border-border bg-primary/5 p-4 text-center shadow-lg">
            <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-xl">
              <Shield className="h-8 w-8" strokeWidth={2.5} />
            </div>
            <div className="text-sm font-semibold text-primary">Bharose Pe</div>
            <div className="mt-3 text-xs text-muted-foreground">Neutral escrow vault</div>
          </div>

          <div className="rounded-3xl border border-border bg-card p-4 text-center shadow-lg">
            <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-slate-950/5">
              <User className="h-8 w-8 text-secondary" strokeWidth={2.5} />
            </div>
            <div className="text-sm font-semibold text-secondary">Seller</div>
            <div className="mt-3 text-xs text-muted-foreground space-y-2">
              <p>Assured payment</p>
              <p>No more ghosting</p>
            </div>
          </div>
        </div>

        <div className="relative h-[240px] overflow-hidden rounded-[2rem] border border-border bg-card/80 p-4 shadow-xl">
          <AnimatePresence mode="sync">
            {currentStep === 1 && (
              <>
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={`step1-buy-${i}`}
                    className="absolute left-2 top-10 z-20"
                    initial={{ x: -24, y: 0, opacity: 0, scale: 0.6 }}
                    animate={{ x: [0, 100, 100], y: [0, 12, 12], opacity: [0, 1, 1, 0], scale: [0.6, 1.05, 1, 0.6] }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 3, delay: i * 0.15, ease: "easeInOut" }}
                  >
                    <FileText className="h-10 w-10 text-accent" />
                  </motion.div>
                ))}
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={`step1-sell-${i}`}
                    className="absolute right-2 top-10 z-20"
                    initial={{ x: 24, y: 0, opacity: 0, scale: 0.6 }}
                    animate={{ x: [0, -100, -100], y: [0, 12, 12], opacity: [0, 1, 1, 0], scale: [0.6, 1.05, 1, 0.6] }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 3, delay: i * 0.15 + 0.1, ease: "easeInOut" }}
                  >
                    <FileText className="h-10 w-10 text-secondary" />
                  </motion.div>
                ))}
              </>
            )}

            {currentStep === 2 && (
              <>
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={`step2-${i}`}
                    className="absolute left-1/2 top-4 z-20"
                    initial={{ y: -24, opacity: 0, scale: 0.5 }}
                    animate={{ y: [0, 90, 90], opacity: [0, 1, 1, 0], scale: [0.5, 1.2, 1.05, 0.5] }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 3, delay: i * 0.18, ease: "easeInOut" }}
                    style={{ transform: "translateX(-50%)" }}
                  >
                    <span className="text-4xl font-bold text-accent">₹</span>
                  </motion.div>
                ))}
              </>
            )}

            {currentStep === 3 && (
              <>
                {[...Array(4)].map((_, i) => (
                  <motion.div
                    key={`step3-${i}`}
                    className="absolute right-4 bottom-4 z-20"
                    initial={{ y: 24, opacity: 0, scale: 0.6 }}
                    animate={{ y: [0, -60, -60], opacity: [0, 1, 1, 0], scale: [0.6, 1.05, 1.05, 0.6] }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 3, delay: i * 0.2, ease: "easeOut" }}
                  >
                    <Package className="h-10 w-10 text-secondary" />
                  </motion.div>
                ))}
              </>
            )}

            {currentStep === 4 && (
              <>
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={`step4-${i}`}
                    className="absolute left-4 top-12 z-20"
                    initial={{ x: 0, opacity: 0, scale: 0.5 }}
                    animate={{ x: [0, 120, 120], opacity: [0, 1, 1, 0], scale: [0.5, 1.4, 1.1, 0.5] }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 3, delay: i * 0.18, ease: "easeInOut" }}
                  >
                    <CheckCircle className="h-9 w-9 text-accent" />
                  </motion.div>
                ))}
              </>
            )}

            {currentStep === 5 && (
              <>
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={`step5-${i}`}
                    className="absolute left-1/2 top-12 z-20"
                    initial={{ y: -24, opacity: 0, scale: 0.5 }}
                    animate={{ y: [0, 100, 100], opacity: [0, 1, 1, 0], scale: [0.5, 1.2, 1.1, 0.5] }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 3, delay: i * 0.18, ease: "easeInOut" }}
                    style={{ transform: "translateX(-50%)" }}
                  >
                    <span className="text-4xl font-bold text-secondary">₹</span>
                  </motion.div>
                ))}
              </>
            )}
          </AnimatePresence>

          <div className="absolute inset-0 grid place-items-center">
            <div className="h-24 w-24 rounded-full bg-primary/10" />
          </div>
        </div>

        <div className="rounded-3xl border border-border bg-card p-5 shadow-xl">
          <div className="text-center text-sm uppercase tracking-[0.18em] text-muted-foreground mb-3">
            Step {currentStep} of 5
          </div>
          <p className="text-center text-base font-semibold text-foreground">
            {STAGE_TEXT[currentStep]}
          </p>
          <div className="mt-5 flex justify-center gap-2">
            {[1, 2, 3, 4, 5].map((step) => (
              <span
                key={step}
                className={`rounded-full transition-all duration-300 ${
                  step === currentStep ? "bg-primary h-2.5 w-8" : "bg-muted-foreground/40 h-2.5 w-2.5"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileTransactionFlow;
