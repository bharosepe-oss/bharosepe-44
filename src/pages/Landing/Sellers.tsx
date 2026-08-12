import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import AnimatedBackground from "@/components/Landing/AnimatedBackground";
import JoinEarlyAccessDialog from "@/components/Landing/JoinEarlyAccessDialog";
import ScrollReveal from "@/components/Landing/ScrollReveal";
import SiteFooter from "@/components/Landing/SiteFooter";
import { SellerHero } from "@/components/site/SellerHero";
import { SellerRecognize } from "@/components/site/SellerRecognize";
import { SellerMechanism } from "@/components/site/SellerMechanism";
import { SellerStory } from "@/components/site/SellerStory";
import { Comparison } from "@/components/site/Comparison";
import { Ban, IndianRupee, Frown, CheckCircle2, ArrowRight, TrendingUp } from "lucide-react";

const Sellers = () => {
  const [isEarlyAccessOpen, setIsEarlyAccessOpen] = useState(false);
  const painPoints = [
    {
      icon: Ban,
      title: "Order Cancellations",
      description: "Buyers cancel orders after you've already started work or shipped products",
    },
    {
      icon: IndianRupee,
      title: "Payment Delays",
      description: "Buyers delay payment or claim they never received the product",
    },
    {
      icon: Frown,
      title: "No Commitment",
      description: "Buyers ghost you after agreeing to purchase, wasting your time",
    },
  ];

  const solutions = [
    {
      title: "Guaranteed Payment",
      description: "Money is in escrow before you start work - payment is guaranteed",
    },
    {
      title: "Buyer Commitment",
      description: "Buyers can't back out easily - funds are already deposited",
    },
    {
      title: "Faster Transactions",
      description: "Automatic release after delivery confirmation - no chasing payments",
    },
    {
      title: "Build Trust",
      description: "Show buyers you're serious and protected - increase conversions",
    },
  ];

  return (
    <main className="min-h-screen bg-background font-inter">
      <JoinEarlyAccessDialog
        isOpen={isEarlyAccessOpen}
        onClose={() => setIsEarlyAccessOpen(false)}
        defaultInterestedAs="seller"
      />
      <SellerHero onJoinEarlyAccess={() => setIsEarlyAccessOpen(true)} />
      <SellerRecognize />
      <SellerMechanism />
      <SellerStory />
      <Comparison />

      {/* CTA Section */}
      <section id="early-access" className="relative overflow-hidden px-4 py-24 md:py-28">
        <AnimatedBackground />
        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal direction="up">
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
                onClick={() => setIsEarlyAccessOpen(true)}
              >
                Join Early Access
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-auto w-full border-primary px-10 py-6 text-lg text-primary hover:bg-primary/10 sm:w-auto"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              >
                See How It Works
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
};

export default Sellers;


