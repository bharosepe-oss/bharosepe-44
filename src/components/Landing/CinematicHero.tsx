import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ChevronDown, Play } from "lucide-react";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import AnimatedButton from "./ui/animated-button";
import { Button } from "@/components/ui/button";

interface CinematicHeroProps {
  onEarlyAccessClick?: () => void;
}

const CinematicHero = ({ onEarlyAccessClick }: CinematicHeroProps) => {
  const navigate = useNavigate();
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const titleY = useTransform(scrollYProgress, [0, 1], [0, -30]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.7]);

  const scrollToAction = () => {
    document.getElementById("see-action")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center overflow-hidden bg-background"
    >
      {/* Subtle background effects */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-primary rounded-full blur-[140px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-secondary rounded-full blur-[140px]" />
      </div>

      {/* Particle Field */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-foreground/10 rounded-full blur-[0.5px]"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, Math.random() * 80 - 40],
              y: [0, Math.random() * 150],
              opacity: [0.1, 0.4, 0.1],
            }}
            transition={{
              duration: 12 + Math.random() * 8,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 6,
            }}
          />
        ))}
      </div>

      {/* Main Content - Centered */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          style={{ y: titleY, opacity }}
          className="max-w-5xl mx-auto text-center space-y-8"
        >
          {/* Headline */}
          <div className="space-y-6">
            <motion.h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight"
              style={{ fontFamily: "'Outfit', sans-serif" }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <span>India's Trust & Escrow</span>
              <br />
              <span>Infrastructure for</span>
              <br />
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Secure Transactions
              </span>
            </motion.h1>

            <motion.p
              className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
              style={{ fontFamily: "'Inter', sans-serif" }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            >
              Bharose Pe is India's trust and escrow infrastructure that enables buyers and sellers to transact with confidence. Every transaction is backed by a structured agreement, transparent transaction flow, and conditional payment release based on agreed terms.
            </motion.p>
          </div>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {/* Primary: See how it works */}
            <motion.div
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <AnimatedButton
                variant="primary"
                size="lg"
                onClick={scrollToAction}
                className="relative group overflow-hidden bg-primary text-primary-foreground shadow-soft px-8 py-4 text-lg min-w-[260px] sm:min-w-[320px]"
                style={{ boxShadow: "0 8px 32px hsl(var(--primary) / 0.3)" }}
              >
                <motion.span
                  className="absolute inset-0 border-2 border-primary-foreground/20 rounded-full"
                  animate={{ scale: [1, 1.05, 1], opacity: [0.3, 0.1, 0.3] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: [0.25, 0.1, 0.25, 1] }}
                />
                <span className="relative z-10 flex items-center justify-center gap-2 font-semibold">
                  See how it works
                  <motion.span
                    animate={{ y: [0, -3, 0] }}
                    transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <ChevronDown className="w-5 h-5" />
                  </motion.span>
                </span>
              </AnimatedButton>
            </motion.div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              {/* Secondary: Try the App */}
              <AnimatedButton
                variant="outline"
                size="lg"
                onClick={() => navigate('/app/auth')}
                className="border-primary/30 bg-background/70 text-primary hover:bg-primary/10 shadow-sm"
              >
                <Play className="w-4 h-4" />
                Try the App
                <ArrowRight className="w-5 h-5" />
              </AnimatedButton>

              {/* Secondary: Join Waitlist */}
              <Button
                variant="outline"
                size="lg"
                onClick={onEarlyAccessClick}
                className="font-semibold border-border hover:bg-muted"
              >
                Join Waitlist
              </Button>
            </div>
          </motion.div>

          {/* Coming Soon Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.6, ease: [0.25, 0.1, 0.25, 1] }}
            className="flex flex-col items-center"
          >
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-border bg-card backdrop-blur-sm">
              <motion.div
                className="w-2 h-2 rounded-full bg-green-400"
                animate={{ scale: [1, 1.2, 1], opacity: [1, 0.5, 1] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: [0.25, 0.1, 0.25, 1] }}
              />
              <span className="text-foreground text-sm font-medium">
                Launching Soon — Join the Waitlist
              </span>
            </div>

            <motion.div
              className="mt-4"
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            >
              <ChevronDown className="w-6 h-6 text-muted-foreground" />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CinematicHero;

