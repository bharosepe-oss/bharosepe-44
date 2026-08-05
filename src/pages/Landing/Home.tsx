import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Shield, Zap, Scale, Clock, ArrowRight } from "lucide-react";
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

const benefits = [
  { icon: Shield, title: "Safe", text: "Payments are managed according to the agreed transaction terms and completed only after the agreed conditions have been fulfilled." },
  { icon: Zap, title: "Simple", text: "Digital escrow in 4 easy steps. No jargon, no confusion." },
  { icon: Scale, title: "Legal", text: "Compliant with Indian law and built for transparent transactions." },
  { icon: Clock, title: "Fast", text: "AI-assisted mediation and instant release on confirmation." },
];

export default function Home() {
  const [isEarlyAccessOpen, setIsEarlyAccessOpen] = useState(false);

  return (
    <div className="min-h-screen w-full overflow-hidden font-inter">
      {/* Early Access Dialog */}
      <JoinEarlyAccessDialog isOpen={isEarlyAccessOpen} onClose={() => setIsEarlyAccessOpen(false)} />

      {/* ---------------- CINEMATIC HERO ---------------- */}
      <CinematicHero onEarlyAccessClick={() => setIsEarlyAccessOpen(true)} />

      <section className="relative py-8 bg-background overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-muted-foreground text-lg md:text-xl">
              Designed for individuals, freelancers, businesses, agencies, brands, and marketplaces that want to complete secure transactions with greater confidence.
            </p>
          </div>
        </div>
      </section>

      {/* ---------------- WHAT IS BHAROSE PE ---------------- */}
      <section className="relative py-24 bg-background overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <ScrollReveal direction="up">
            <h2 className="text-4xl md:text-5xl font-outfit font-bold text-center mb-6">
              What is Bharose Pe?
            </h2>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.1}>
            <div className="max-w-3xl mx-auto text-center space-y-6 text-muted-foreground text-lg">
              <p>
                Bharose Pe is a digital trust platform that helps buyers and sellers complete transactions safely by using digital agreements, escrow-style payment controls, milestone tracking, and dispute support.
              </p>
              <p>
                Whether you're hiring a freelancer, purchasing goods, or working with a service provider, Bharose Pe helps both parties agree on terms, lock payment until conditions are met, and finish the transaction transparently.
              </p>
              <div className="grid gap-4 sm:grid-cols-2 text-left mx-auto max-w-xl">
                <div className="rounded-3xl border border-border bg-card p-6">
                  <h3 className="font-semibold text-foreground mb-2">Build Trust</h3>
                  <p className="text-sm text-muted-foreground">
                    Create a shared digital agreement and clearly define payment milestones before work begins.
                  </p>
                </div>
                <div className="rounded-3xl border border-border bg-card p-6">
                  <h3 className="font-semibold text-foreground mb-2">Secure Payments</h3>
                  <p className="text-sm text-muted-foreground">
                    Hold funds until agreed conditions are fulfilled, then release payment automatically.
                  </p>
                </div>
              </div>
              <p>
                By combining clear transaction terms, payment control, milestone tracking, and complete transaction records, Bharose Pe helps reduce uncertainty before, during, and after every transaction.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ---------------- ANIMATED TRANSACTION FLOW ---------------- */}
      <section className="relative py-24 bg-background overflow-hidden">
        <FloatingParticles count={10} />
        <div className="container mx-auto px-4 relative z-10">
          <ScrollReveal direction="up">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-outfit font-bold text-center mb-6">
              See <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Bharose Pe</span> in Action
            </h2>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.2}>
            <p className="text-center text-muted-foreground text-lg mb-12 max-w-2xl mx-auto">
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {benefits.map((item, i) => (
              <ScrollReveal key={item.title} delay={i * 0.1} direction="scale">
                <motion.div
                  className="glass-card p-8 rounded-2xl hover-glow text-center h-full flex flex-col justify-between"
                  whileHover={{ y: -6, scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
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
                  <h3 className="font-outfit font-bold text-xl mb-3">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.text}</p>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- FINAL CTA BANNER ---------------- */}
      <CTABanner />
    </div>
  );
}

