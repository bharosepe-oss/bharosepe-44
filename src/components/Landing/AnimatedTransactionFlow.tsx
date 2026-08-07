import { motion, AnimatePresence, useInView } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { Shield, User, CheckCircle, Banknote, Package, FileCheck, FileText } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import MobileTransactionFlow from "@/components/Landing/MobileTransactionFlow";
import logo from "@/assets/LOGO.png";

type Step = 1 | 2 | 3 | 4 | 5;

const STAGE_TEXT: Record<Step, string> = {
  1: "Buyer and Seller create a secure escrow contract on Bharose Pe",
  2: "Buyer securely deposits funds into Bharose Pe's escrow vault",
  3: "Seller delivers the product or service directly to the buyer",
  4: "Buyer confirms receipt and satisfaction with the delivery",
  5: "Bharose Pe releases payment to seller instantly",
};

function getActiveNode(step: Step): "buyer" | "seller" | "bharosePe" | "both" {
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
}

function glowStyle(active: boolean, color: string) {
  return {
    boxShadow: active
      ? `0 0 30px 8px ${color}`
      : "0 0 0px 0px transparent",
  };
}

const AnimatedTransactionFlow = () => {
  const [currentStep, setCurrentStep] = useState<Step>(1);
  const containerRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<number | null>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    intervalRef.current = window.setInterval(() => {
      setCurrentStep((prev) => ((prev % 5) + 1) as Step);
    }, 4200);

    return () => {
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, []);

  const activeNode = getActiveNode(currentStep);
  const isBuyerActive = activeNode === "buyer" || activeNode === "both";
  const isSellerActive = activeNode === "seller" || activeNode === "both";
  const isVaultActive = activeNode === "bharosePe";

  if (isMobile) {
    return <MobileTransactionFlow />;
  }

  return (
    <div ref={containerRef} className="relative w-full min-h-[500px] py-8 md:py-12 flex items-center justify-center bg-background">
      <div className="relative w-full max-w-6xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-3 gap-3 md:gap-4 items-start justify-items-center relative mb-14 md:mb-16 max-w-5xl mx-auto">
          <motion.div
            className="flex flex-col items-center z-10"
            animate={{ scale: isBuyerActive ? 1.08 : 1 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            <motion.div
              className="relative w-24 h-24 md:w-28 md:h-28 rounded-full bg-card border-2 border-accent flex items-center justify-center shadow-lg"
              animate={{
                boxShadow: isBuyerActive
                  ? "0 0 50px 12px hsl(var(--accent) / 0.5), 0 0 100px 20px hsl(var(--accent) / 0.2)"
                  : "0 4px 24px -2px hsl(var(--accent) / 0.15)",
                borderColor: isBuyerActive ? "hsl(var(--accent))" : "hsl(var(--accent) / 0.5)",
              }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            >
              <User className="w-10 h-10 md:w-12 md:h-12 text-accent" strokeWidth={2.5} />
              {isBuyerActive && (
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-accent"
                  initial={{ scale: 1, opacity: 0.5 }}
                  animate={{ scale: 1.3, opacity: 0 }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              )}
            </motion.div>
            <span className="mt-3 font-semibold text-base md:text-lg text-accent">Buyer</span>
            <div className="mt-1.5 text-sm text-muted-foreground text-center max-w-[140px]">
              <div className="flex items-center gap-1 mb-1">
                <Banknote className="w-3 h-3 text-accent" />
                <span>Pays securely</span>
              </div>
              <div className="flex items-center gap-1">
                <Shield className="w-3 h-3 text-accent" />
                <span>Protected funds</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="flex flex-col items-center justify-center z-20"
            animate={{ scale: isVaultActive ? 1.12 : 1 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <motion.div
              className="relative w-36 h-36 md:w-40 md:h-40 rounded-full overflow-hidden bg-white shadow-2xl border-2 border-primary/15"
              animate={{
                boxShadow: isVaultActive
                  ? "0 0 60px 15px hsl(var(--primary) / 0.6), 0 0 120px 30px hsl(var(--primary) / 0.3)"
                  : "0 0 30px 8px hsl(var(--primary) / 0.3), 0 0 60px 15px hsl(var(--primary) / 0.15)",
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <img src={logo} alt="Bharose Pe" className="h-full w-full object-cover rounded-full" />
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-primary-foreground/30"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              />
              {isVaultActive && (
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-primary-foreground"
                  initial={{ scale: 1, opacity: 0.8 }}
                  animate={{ scale: 1.4, opacity: 0 }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              )}
            </motion.div>
            <div className="mt-4 text-center w-full flex flex-col items-center">
              <span className="font-bold text-lg md:text-xl text-primary">Bharose Pe</span>
              <span className="text-sm text-muted-foreground mt-1">Escrow Vault</span>
            </div>
          </motion.div>

          <motion.div
            className="flex flex-col items-center z-10"
            animate={{ scale: isSellerActive ? 1.08 : 1 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            <motion.div
              className="relative w-24 h-24 md:w-28 md:h-28 rounded-full bg-card border-2 border-secondary flex items-center justify-center shadow-lg"
              animate={{
                boxShadow: isSellerActive
                  ? "0 0 50px 12px hsl(var(--secondary) / 0.5), 0 0 100px 20px hsl(var(--secondary) / 0.2)"
                  : "0 4px 24px -2px hsl(var(--secondary) / 0.15)",
                borderColor: isSellerActive ? "hsl(var(--secondary))" : "hsl(var(--secondary) / 0.5)",
              }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            >
              <User className="w-10 h-10 md:w-12 md:h-12 text-secondary" strokeWidth={2.5} />
              {isSellerActive && (
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-secondary"
                  initial={{ scale: 1, opacity: 0.5 }}
                  animate={{ scale: 1.3, opacity: 0 }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              )}
            </motion.div>
            <span className="mt-3 font-semibold text-base md:text-lg text-secondary">Seller</span>
            <div className="mt-1.5 text-sm text-muted-foreground text-center max-w-[140px]">
              <div className="flex items-center gap-1 mb-1">
                <CheckCircle className="w-3 h-3 text-secondary" />
                <span>Guaranteed pay</span>
              </div>
              <div className="flex items-center gap-1">
                <Package className="w-3 h-3 text-secondary" />
                <span>Trust verified</span>
              </div>
            </div>
          </motion.div>
        </div>

        <AnimatePresence mode="sync">
          {currentStep === 1 && (
            <>
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={`contract-buyer-${i}`}
                  className="absolute z-30"
                  initial={{ left: "12%", top: "10%", opacity: 0, scale: 0.6 }}
                  animate={{
                    left: ["12%", "28%", "42%", "48%"],
                    top: ["10%", "8%", "5%", "4%"],
                    opacity: [0, 0.85, 1, 0],
                    scale: [0.6, 1.05, 1.18, 0.8],
                    rotate: [-8, 0, 4, 0],
                  }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 2.4, delay: i * 0.35, ease: [0.43, 0.13, 0.23, 0.96] }}
                >
                  <FileText className="w-10 h-10 text-accent" style={{ filter: "drop-shadow(0 0 10px hsl(var(--accent) / 0.5))" }} />
                </motion.div>
              ))}
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={`contract-seller-${i}`}
                  className="absolute z-30"
                  initial={{ left: "82%", top: "10%", opacity: 0, scale: 0.6 }}
                  animate={{
                    left: ["82%", "67%", "56%", "50%"],
                    top: ["10%", "7%", "5%", "4%"],
                    opacity: [0, 0.85, 1, 0],
                    scale: [0.6, 1.05, 1.18, 0.8],
                    rotate: [8, 0, -4, 0],
                  }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 2.4, delay: i * 0.35 + 0.18, ease: [0.43, 0.13, 0.23, 0.96] }}
                >
                  <FileText className="w-10 h-10 text-secondary" style={{ filter: "drop-shadow(0 0 10px hsl(var(--secondary) / 0.5))" }} />
                </motion.div>
              ))}
            </>
          )}

          {currentStep === 2 && (
            <>
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={`rupee-1-${i}`}
                  className="absolute text-5xl font-bold z-30 text-accent"
                  style={{ textShadow: "0 0 20px hsl(var(--accent) / 0.5)" }}
                  initial={{ left: "12%", top: "10%", opacity: 0, scale: 0.5 }}
                  animate={{
                    left: ["12%", "48%"],
                    top: ["10%", "8%"],
                    opacity: [0, 1, 1, 0],
                    scale: [0.5, 1.3, 1.1, 0.5],
                  }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 2.8, delay: i * 0.35, ease: [0.43, 0.13, 0.23, 0.96] }}
                >
                  ₹
                </motion.div>
              ))}
            </>
          )}

          {currentStep === 3 && (
            <>
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={`package-${i}`}
                  className="absolute z-30"
                  style={{ left: "82%", top: "10%" }}
                  animate={{
                    left: ["82%", "68%", "50%", "32%", "18%"],
                    top: ["10%", "-15%", "-30%", "-15%", "10%"],
                    opacity: [0, 1, 1, 1, 0],
                    scale: [0.6, 1, 1.2, 1, 0.6],
                    rotate: [-10, -5, 0, 5, 10],
                  }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 2.2, delay: i * 0.6, ease: "linear" }}
                >
                  <Package className="w-10 h-10 text-secondary" style={{ filter: "drop-shadow(0 0 10px hsl(var(--secondary) / 0.5))" }} />
                </motion.div>
              ))}
            </>
          )}

          {currentStep === 4 && (
            <>
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={`check-${i}`}
                  className="absolute z-30"
                  initial={{ left: "12%", top: "10%", opacity: 0, scale: 0.5, rotate: -20 }}
                  animate={{
                    left: ["12%", "48%"],
                    top: ["10%", "8%"],
                    opacity: [0, 1, 1, 0],
                    scale: [0.5, 1.4, 1.1, 0.5],
                    rotate: [-20, 0, 10],
                  }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 2.7, delay: i * 0.38, ease: [0.43, 0.13, 0.23, 0.96] }}
                >
                  <FileCheck className="w-10 h-10 text-accent" style={{ filter: "drop-shadow(0 0 10px hsl(var(--accent) / 0.5))" }} />
                </motion.div>
              ))}
            </>
          )}

          {currentStep === 5 && (
            <>
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={`rupee-2-${i}`}
                  className="absolute text-5xl font-bold z-30 text-secondary"
                  style={{ textShadow: "0 0 20px hsl(var(--secondary) / 0.5)" }}
                  initial={{ left: "50%", top: "8%", opacity: 0, scale: 0.5 }}
                  animate={{
                    left: ["50%", "88%"],
                    top: ["8%", "10%"],
                    opacity: [0, 1, 1, 0],
                    scale: [0.5, 1.3, 1.1, 0.5],
                  }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 2.8, delay: i * 0.35, ease: [0.43, 0.13, 0.23, 0.96] }}
                >
                  ₹
                </motion.div>
              ))}
            </>
          )}
        </AnimatePresence>

        <motion.div
          className="absolute -bottom-4 inset-x-0 flex justify-center px-4"
          key={currentStep}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="bg-card border border-border px-6 py-4 rounded-2xl shadow-xl max-w-2xl w-full text-center">
            <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground mb-2">
              Step {currentStep} of 5
            </div>
            <span className="font-semibold text-base text-foreground">{STAGE_TEXT[currentStep]}</span>
            <div className="mt-3 flex justify-center gap-2">
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
        </motion.div>
      </div>
    </div>
  );
};

export default AnimatedTransactionFlow;
