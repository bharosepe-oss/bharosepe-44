import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ShieldCheck, Eye, LayoutGrid, Map, ArrowRight } from "lucide-react";
import { useState } from "react";
import CinematicHero from "@/components/Landing/CinematicHero";
import JoinEarlyAccessDialog from "@/components/Landing/JoinEarlyAccessDialog";
import AnimatedTransactionFlow from "@/components/Landing/AnimatedTransactionFlow";
import HowItWorksSection from "@/components/Landing/HowItWorksSection";
import { UseCaseCarousel } from "@/components/Landing/UseCaseCarousel";

import ScrollReveal from "@/components/Landing/ScrollReveal";

import { WhyBharosePe } from "@/components/Landing/WhyBharosePe";
import { TestimonialsSection } from "@/components/Landing/TestimonialsSection";
import { CTABanner } from "@/components/Landing/CTABanner";
import FloatingParticles from "@/components/Landing/FloatingParticles";
import SiteFooter from "@/components/Landing/SiteFooter";

const benefits = [
  { icon: ShieldCheck, title: "Secure by Design", text: "Every transaction follows agreed terms, with payments completed only after the defined conditions are met." },
  { icon: Eye, title: "Transparent", text: "Every agreement, milestone, approval, and transaction update is securely recorded." },
  { icon: LayoutGrid, title: "Structured", text: "Digital agreements, identity verification, transaction records, and dispute support work together in one platform." },
  { icon: Map, title: "Built for India", text: "Designed for Indian businesses and individuals with legally structured transaction workflows." },
];

export default function Home() {
  const [isEarlyAccessOpen, setIsEarlyAccessOpen] = useState(false);

  return (
    <div className="min-h-screen w-full overflow-hidden font-inter">
      {/* Early Access Dialog */}
      <JoinEarlyAccessDialog isOpen={isEarlyAccessOpen} onClose={() => setIsEarlyAccessOpen(false)} />

      {/* ---------------- CINEMATIC HERO ---------------- */}
      <CinematicHero onEarlyAccessClick={() => setIsEarlyAccessOpen(true)} />

      {/* ---------------- ANIMATED TRANSACTION FLOW ---------------- */}
      <section className="relative py-16 md:py-20 bg-background overflow-hidden">
        <FloatingParticles count={10} />
        <div className="container mx-auto px-4 relative z-10">
          <ScrollReveal direction="up">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-outfit font-bold text-center mb-4">
              See <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Bharose Pe</span> in Action
            </h2>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.2}>
            <p className="text-center text-muted-foreground text-base md:text-lg mb-8 max-w-2xl mx-auto">
              Watch how every transaction flows through our secure escrow vault
            </p>
          </ScrollReveal>
          <AnimatedTransactionFlow />
        </div>
      </section>



      {/* ---------------- WHY BHAROSE PE ---------------- */}
      <WhyBharosePe />

      {/* ---------------- USE CASE CAROUSEL ---------------- */}
      <UseCaseCarousel onJoinEarlyAccess={() => setIsEarlyAccessOpen(true)} />

      {/* ---------------- BENEFITS ---------------- */}
      <section className="relative py-24 bg-background overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-muted/20 to-background" />
        <div className="container mx-auto px-4 relative z-10">
          <ScrollReveal direction="up">
            <h2 className="text-4xl md:text-5xl font-outfit font-bold text-center mb-16">
              Why People Trust <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Bharose Pe</span>
            </h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto items-stretch">
            {benefits.map((item, i) => (
              <ScrollReveal key={item.title} delay={i * 0.1} direction="scale">
                <motion.div
                  className="glass-card p-8 rounded-2xl hover-glow text-center h-full flex flex-col"
                  whileHover={{ y: -6, scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="relative z-10 flex h-full flex-col items-center">
                    <motion.div
                      className="mb-6 flex justify-center"
                      animate={{
                        y: [0, -5, 0],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: i * 0.2,
                      }}
                    >
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                        <item.icon className="w-8 h-8 text-primary" strokeWidth={2.5} />
                      </div>
                    </motion.div>

                    <div className="min-h-[4.5rem] mb-4 flex items-end justify-center">
                      <h3 className="font-outfit font-bold text-xl">{item.title}</h3>
                    </div>

                    <p className="text-sm text-muted-foreground leading-relaxed text-center">
                      {item.text}
                    </p>

                    <div className="mt-auto" />
                  </div>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- FINAL CTA BANNER ---------------- */}
      <CTABanner />
      <SiteFooter />
    </div>
  );
}

