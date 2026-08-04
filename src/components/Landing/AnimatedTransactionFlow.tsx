import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { Shield, User, CheckCircle, Banknote, Package, FileCheck, FileText } from "lucide-react";

type Step = 1 | 2 | 3 | 4 | 5;

const AnimatedTransactionFlow = () => {
  const [currentStep, setCurrentStep] = useState<Step>(1);
  const containerRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const hasStarted = useRef(false);

  useEffect(() => {
    // Start animation cycle on component mount
    if (!hasStarted.current) {
      hasStarted.current = true;
      
      // Start with Step 1 immediately, then cycle every 4 seconds
      intervalRef.current = setInterval(() => {
        setCurrentStep((prev) => ((prev % 5) + 1) as Step);
      }, 4000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const getActiveNode = (): "buyer" | "bharosePe" | "seller" | "both" | null => {
    switch (currentStep) {
      case 1: return "both";       // Contract creation — both parties
      case 2: return "buyer";      // Buyer deposits funds
      case 3: return "seller";     // Seller delivers goods
      case 4: return "buyer";      // Buyer confirms
      case 5: return "seller";     // Payment released to seller
      default: return null;
    }
  };

  const activeNode = getActiveNode();
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia('(max-width: 767px)').matches : false
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 767px)');
    const handleChange = (event: MediaQueryListEvent | MediaQueryList) => {
      setIsMobile(event.matches);
    };

    handleChange(mediaQuery);
    mediaQuery.addEventListener('change', handleChange);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  if (!isMobile) {
    return (
      <div className="relative w-full min-h-[700px] py-20 flex items-center justify-center bg-background">
        <div className="relative w-full max-w-6xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 items-center justify-items-center mb-20 md:mb-32">
            <div className={`flex flex-col items-center text-center rounded-3xl border border-accent/20 bg-white/80 p-8 shadow-lg transition-transform duration-300 ${isBuyerActive ? 'scale-105 border-accent/50' : ''}`}>
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-white border-2 border-accent border-opacity-30 shadow-sm">
                <User className="w-12 h-12 text-accent" strokeWidth={2.5} />
              </div>
              <span className="mt-4 font-semibold text-lg text-accent">Buyer</span>
              <div className="mt-2 text-sm text-muted-foreground text-center max-w-[140px]">
                <div className="flex items-center gap-1 mb-1 justify-center">
                  <Banknote className="w-3 h-3 text-accent" />
                  <span>Pays securely</span>
                </div>
                <div className="flex items-center gap-1 justify-center">
                  <Shield className="w-3 h-3 text-accent" />
                  <span>Protected funds</span>
                </div>
              </div>
            </div>

            <div className={`flex flex-col items-center justify-center rounded-3xl border border-primary/20 bg-white/90 p-8 shadow-xl transition-transform duration-300 ${activeNode === 'bharosePe' ? 'scale-105 border-primary/50' : ''}`}>
              <div className="flex h-32 w-32 items-center justify-center rounded-full bg-white border-2 border-primary border-opacity-40 shadow-lg">
                <Shield className="w-14 h-14 text-primary" strokeWidth={2.5} />
              </div>
              <div className="mt-6 text-center w-full flex flex-col items-center">
                <span className="font-bold text-xl text-primary">Bharose Pe</span>
                <span className="text-sm text-muted-foreground mt-1">Escrow Vault</span>
              </div>
            </div>

            <div className={`flex flex-col items-center text-center rounded-3xl border border-secondary/20 bg-white/80 p-8 shadow-lg transition-transform duration-300 ${isSellerActive ? 'scale-105 border-secondary/50' : ''}`}>
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-white border-2 border-secondary border-opacity-30 shadow-sm">
                <User className="w-12 h-12 text-secondary" strokeWidth={2.5} />
              </div>
              <span className="mt-4 font-semibold text-lg text-secondary">Seller</span>
              <div className="mt-2 text-sm text-muted-foreground text-center max-w-[140px]">
                <div className="flex items-center gap-1 mb-1 justify-center">
                  <CheckCircle className="w-3 h-3 text-secondary" />
                  <span>Guaranteed pay</span>
                </div>
                <div className="flex items-center gap-1 justify-center">
                  <Package className="w-3 h-3 text-secondary" />
                  <span>Trust verified</span>
                </div>
              </div>
            </div>
          </div>

          <div className="relative mt-8 px-4">
            <div className="bg-card border border-border px-5 py-4 rounded-2xl shadow-xl max-w-xl md:max-w-3xl mx-auto text-center">
              <span className="font-semibold text-sm md:text-base leading-snug md:leading-normal text-foreground">
                {stepDescriptions[currentStep]}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const stepDescriptions: Record<Step, string> = {
    1: "Buyer and Seller create a secure escrow contract on Bharose Pe",
    2: "Buyer securely deposits funds into Bharose Pe's escrow vault",
    3: "Seller delivers the product or service directly to the buyer",
    4: "Buyer confirms receipt and satisfaction with the delivery",
    5: "Bharose Pe releases payment to seller instantly",
  };

  const isBuyerActive = activeNode === "buyer" || activeNode === "both";
  const isSellerActive = activeNode === "seller" || activeNode === "both";

  return (
    <div ref={containerRef} className="relative w-full min-h-[700px] py-20 flex items-center justify-center bg-background">
      <div className="relative w-full max-w-6xl mx-auto px-4 md:px-8">
        {/* Three Nodes: Buyer - Bharose Pe - Seller */}
        <div className="flex flex-col items-center gap-10 md:grid md:grid-cols-3 md:gap-4 items-start justify-items-center mb-20 md:mb-32 max-w-5xl mx-auto">
          {/* Buyer Node */}
          <motion.div 
            className="flex flex-col items-center z-10 w-full md:w-auto"
            animate={{ scale: isBuyerActive ? 1.08 : 1 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            <motion.div
              className="relative w-24 h-24 md:w-28 md:h-28 rounded-full bg-white border-2 border-accent border-opacity-30 flex items-center justify-center shadow-lg"
              animate={{
                boxShadow: isBuyerActive 
                  ? "0 0 25px 12px hsl(var(--accent) / 0.2)" 
                  : "0 10px 30px -15px hsl(var(--accent) / 0.15)",
                borderColor: isBuyerActive ? "hsl(var(--accent))" : "hsl(var(--accent) / 0.3)",
              }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            >
              <User className="w-12 h-12 md:w-16 md:h-16 text-accent" strokeWidth={2.5} />
              {isBuyerActive && (
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-accent"
                  initial={{ scale: 1, opacity: 0.5 }}
                  animate={{ scale: 1.3, opacity: 0 }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              )}
            </motion.div>
            <span className="mt-4 font-semibold text-lg text-accent">Buyer</span>
            <div className="mt-2 text-sm text-muted-foreground text-center max-w-[140px]">
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

          {/* Central Bharose Pe Vault */}
          <motion.div 
            className="flex flex-col items-center justify-center z-20"
            animate={{ scale: activeNode === "bharosePe" ? 1.08 : 1 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <motion.div
              className="relative w-32 h-32 md:w-36 md:h-36 rounded-full flex items-center justify-center bg-white border-2 border-primary border-opacity-40 shadow-lg"
              animate={{
                boxShadow: activeNode === "bharosePe"
                  ? "0 0 35px 8px hsl(var(--primary) / 0.18)"
                  : "0 10px 25px -10px hsl(var(--primary) / 0.18)",
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <Shield className="w-14 h-14 md:w-16 md:h-16 text-primary" strokeWidth={2.5} />
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-primary-foreground/30"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              />
              {activeNode === "bharosePe" && (
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-primary-foreground"
                  initial={{ scale: 1, opacity: 0.8 }}
                  animate={{ scale: 1.4, opacity: 0 }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              )}
            </motion.div>
            <div className="mt-6 text-center w-full flex flex-col items-center">
              <span className="font-bold text-xl text-primary">Bharose Pe</span>
              <span className="text-sm text-muted-foreground mt-1">Escrow Vault</span>
            </div>
          </motion.div>

          {/* Seller Node */}
          <motion.div 
            className="flex flex-col items-center z-10"
            animate={{ scale: isSellerActive ? 1.08 : 1 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            <motion.div
              className="relative w-24 h-24 md:w-28 md:h-28 rounded-full bg-white border-2 border-secondary border-opacity-30 flex items-center justify-center shadow-lg"
              animate={{
                boxShadow: isSellerActive 
                  ? "0 0 25px 12px hsl(var(--secondary) / 0.2)" 
                  : "0 10px 30px -15px hsl(var(--secondary) / 0.15)",
                borderColor: isSellerActive ? "hsl(var(--secondary))" : "hsl(var(--secondary) / 0.3)",
              }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            >
              <User className="w-12 h-12 md:w-16 md:h-16 text-secondary" strokeWidth={2.5} />
              {isSellerActive && (
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-secondary"
                  initial={{ scale: 1, opacity: 0.5 }}
                  animate={{ scale: 1.3, opacity: 0 }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              )}
            </motion.div>
            <span className="mt-4 font-semibold text-lg text-secondary">Seller</span>
            <div className="mt-2 text-sm text-muted-foreground text-center max-w-[140px]">
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

        {/* Animated Particles */}
        <AnimatePresence mode="sync">
          {/* Step 1: Contract Creation — documents fly from buyer/seller into center */}
          {currentStep === 1 && (
            <>
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={`contract-buyer-${i}`}
                  className="absolute z-30"
                  initial={isMobile ? { left: '50%', top: '12%', opacity: 0, scale: 0.6 } : { left: '12%', top: '10%', opacity: 0, scale: 0.5 }}
                  animate={isMobile ? {
                    left: ['50%', '50%', '50%', '50%'],
                    top: ['12%', '25%', '38%', '50%'],
                    opacity: [0, 1, 1, 0],
                    scale: [0.6, 1.05, 1, 0.6],
                    x: ['-50%', '-50%', '-50%', '-50%'],
                  } : {
                    left: ['12%', '44%'],
                    top: ['10%', '5%'],
                    opacity: [0, 1, 1, 0],
                    scale: [0.5, 1.2, 1, 0.5],
                  }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 2.4, delay: i * 0.25, ease: [0.43, 0.13, 0.23, 0.96] }}
                >
                  <FileText className="w-8 h-8 md:w-10 md:h-10 text-accent" style={{ filter: 'drop-shadow(0 0 10px hsl(var(--accent) / 0.5))' }} />
                </motion.div>
              ))}
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={`contract-seller-${i}`}
                  className="absolute z-30"
                  initial={isMobile ? { left: '50%', top: '88%', opacity: 0, scale: 0.6 } : { left: '82%', top: '10%', opacity: 0, scale: 0.5 }}
                  animate={isMobile ? {
                    left: ['50%', '50%', '50%', '50%'],
                    top: ['88%', '75%', '62%', '50%'],
                    opacity: [0, 1, 1, 0],
                    scale: [0.6, 1.05, 1, 0.6],
                    x: ['-50%', '-50%', '-50%', '-50%'],
                  } : {
                    left: ['82%', '52%'],
                    top: ['10%', '5%'],
                    opacity: [0, 1, 1, 0],
                    scale: [0.5, 1.2, 1, 0.5],
                  }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 2.4, delay: i * 0.25 + 0.15, ease: [0.43, 0.13, 0.23, 0.96] }}
                >
                  <FileText className="w-8 h-8 md:w-10 md:h-10 text-secondary" style={{ filter: 'drop-shadow(0 0 10px hsl(var(--secondary) / 0.5))' }} />
                </motion.div>
              ))}
            </>
          )}

          {/* Step 2: Buyer deposits funds */}
          {currentStep === 2 && (
            <>
              {[...Array(4)].map((_, i) => (
                <motion.div
                  key={`rupee-1-${i}`}
                  className="absolute text-4xl md:text-5xl font-bold z-30 text-accent"
                  style={{ textShadow: '0 0 20px hsl(var(--accent) / 0.5)' }}
                  initial={isMobile ? { left: '50%', top: '18%', opacity: 0, scale: 0.6 } : { left: '12%', top: '10%', opacity: 0, scale: 0.5 }}
                  animate={isMobile ? {
                    left: ['50%', '50%', '50%', '50%'],
                    top: ['18%', '32%', '42%', '50%'],
                    opacity: [0, 1, 1, 0],
                    scale: [0.6, 1.05, 1.05, 0.6],
                    x: ['-50%', '-50%', '-50%', '-50%'],
                  } : {
                    left: ['12%', '48%'],
                    top: ['10%', '8%'],
                    opacity: [0, 1, 1, 0],
                    scale: [0.5, 1.3, 1.1, 0.5],
                  }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 2.2, delay: i * 0.2, ease: [0.43, 0.13, 0.23, 0.96] }}
                >
                  ₹
                </motion.div>
              ))}
            </>
          )}
          
          {/* Step 3: Seller delivers goods directly to buyer */}
          {currentStep === 3 && (
            <>
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={`package-${i}`}
                  className="absolute z-30"
                  initial={isMobile ? { left: '50%', top: '88%', opacity: 0, scale: 0.6 } : { left: '82%', top: '10%', opacity: 0, scale: 0.6 }}
                  animate={isMobile ? {
                    left: ['50%', '50%', '50%', '50%'],
                    top: ['88%', '74%', '60%', '46%'],
                    opacity: [0, 1, 1, 0],
                    scale: [0.6, 1.05, 1.05, 0.6],
                    x: ['-50%', '-50%', '-50%', '-50%'],
                  } : {
                    left: ['82%', '68%', '50%', '32%', '18%'],
                    top: ['10%', '-15%', '-30%', '-15%', '10%'],
                    opacity: [0, 1, 1, 1, 0],
                    scale: [0.6, 1, 1.2, 1, 0.6],
                    rotate: [-10, -5, 0, 5, 10],
                  }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 2.4, delay: i * 0.25, ease: 'linear' }}
                >
                  <Package className="w-8 h-8 md:w-10 md:h-10 text-secondary" style={{ filter: 'drop-shadow(0 0 10px hsl(var(--secondary) / 0.5))' }} />
                </motion.div>
              ))}
            </>
          )}
          
          {/* Step 4: Buyer confirms */}
          {currentStep === 4 && (
            <>
              {[...Array(4)].map((_, i) => (
                <motion.div
                  key={`check-${i}`}
                  className="absolute z-30"
                  initial={isMobile ? { left: '50%', top: '50%', opacity: 0, scale: 0.6 } : { left: '12%', top: '10%', opacity: 0, scale: 0.5 }}
                  animate={isMobile ? {
                    left: ['50%', '50%', '50%', '50%'],
                    top: ['50%', '46%', '42%', '38%'],
                    opacity: [0, 1, 1, 0],
                    scale: [0.6, 1.1, 1.1, 0.6],
                    x: ['-50%', '-50%', '-50%', '-50%'],
                  } : {
                    left: ['12%', '48%'],
                    top: ['10%', '8%'],
                    opacity: [0, 1, 1, 0],
                    scale: [0.5, 1.4, 1.1, 0.5],
                    rotate: [-20, 0, 10],
                  }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 2.7, delay: i * 0.15, ease: [0.43, 0.13, 0.23, 0.96] }}
                >
                  <FileCheck className="w-8 h-8 md:w-10 md:h-10 text-accent" style={{ filter: 'drop-shadow(0 0 10px hsl(var(--accent) / 0.5))' }} />
                </motion.div>
              ))}
            </>
          )}
          
          {/* Step 5: Payment released to seller */}
          {currentStep === 5 && (
            <>
              {[...Array(4)].map((_, i) => (
                <motion.div
                  key={`rupee-2-${i}`}
                  className="absolute text-4xl md:text-5xl font-bold z-30 text-secondary"
                  style={{ textShadow: '0 0 20px hsl(var(--secondary) / 0.5)' }}
                  initial={isMobile ? { left: '50%', top: '46%', opacity: 0, scale: 0.6 } : { left: '50%', top: '8%', opacity: 0, scale: 0.5 }}
                  animate={isMobile ? {
                    left: ['50%', '50%', '50%', '50%'],
                    top: ['46%', '58%', '70%', '82%'],
                    opacity: [0, 1, 1, 0],
                    scale: [0.6, 1.1, 1.1, 0.6],
                    x: ['-50%', '-50%', '-50%', '-50%'],
                  } : {
                    left: ['50%', '88%'],
                    top: ['8%', '10%'],
                    opacity: [0, 1, 1, 0],
                    scale: [0.5, 1.3, 1.1, 0.5],
                  }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 2.4, delay: i * 0.2, ease: [0.43, 0.13, 0.23, 0.96] }}
                >
                  ₹
                </motion.div>
              ))}
            </>
          )}
        </AnimatePresence>

        {/* Step Description */}
        <motion.div
          className={isMobile ? 'relative mt-8 px-4' : 'absolute -bottom-20 inset-x-0 flex justify-center px-4'}
          key={currentStep}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="bg-card border border-border px-5 py-4 rounded-2xl shadow-xl max-w-xl md:max-w-3xl mx-auto text-center">
            <span className="font-semibold text-sm md:text-base leading-snug md:leading-normal text-foreground">{stepDescriptions[currentStep]}</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AnimatedTransactionFlow;
