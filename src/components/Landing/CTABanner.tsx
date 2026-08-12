import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { ArrowRight, Play } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import { useNavigate } from "react-router-dom";
import AnimatedBackground from "./AnimatedBackground";

export const CTABanner = () => {
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden px-4 py-24 md:py-28">
      <AnimatedBackground />
      <div className="container relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal direction="up">
          <div className="text-center">
            <h2 className="mb-6 text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
              Be the First to Experience Safe Transactions
            </h2>
            <p className="mx-auto mb-8 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
              We're building India's escrow infrastructure. Join our early access list.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button
                size="lg"
                className="h-auto w-full bg-primary px-10 py-6 text-lg text-primary-foreground shadow-soft hover:bg-primary/90 sm:w-auto"
                onClick={() => navigate('/app/auth')}
              >
                <Play className="mr-2 h-5 w-5" />
                Join Early Access
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-auto w-full border-primary px-10 py-6 text-lg text-primary hover:bg-primary/10 sm:w-auto"
                onClick={() => navigate('/how-it-works')}
              >
                See How It Works
              </Button>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

