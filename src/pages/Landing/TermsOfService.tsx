import { Card } from "@/components/ui/card";
import ScrollReveal from "@/components/Landing/ScrollReveal";

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-background">
      <section className="bg-muted/20 py-20 md:py-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Terms of Service</h1>
            <p className="text-lg text-muted-foreground">
              These Terms of Service govern your access to and use of Bharose Pe, India’s digital trust platform for secure buyer-seller agreements and milestone-based payments.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal direction="scale" delay={0.1}>
            <Card className="p-8 md:p-12 glass-card shadow-depth">
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-semibold mb-3">Acceptance of Terms</h2>
                  <p className="text-muted-foreground">
                    By using Bharose Pe, you agree to these terms and any additional terms that may apply to specific features, products, or services offered on the platform.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-semibold mb-3">Using Bharose Pe</h2>
                  <p className="text-muted-foreground">
                    You may use Bharose Pe to create digital agreements, manage transactions, and resolve disputes. You must provide accurate information and comply with applicable laws when using the service.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-semibold mb-3">Payments and Agreements</h2>
                  <p className="text-muted-foreground">
                    Transactions on Bharose Pe are governed by the terms of each digital agreement you create. Payments are held until both parties confirm the agreed milestones have been met.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-semibold mb-3">Dispute Resolution</h2>
                  <p className="text-muted-foreground">
                    If a transaction issue arises, Bharose Pe offers support and dispute resolution guidance. We encourage both parties to communicate clearly and resolve issues through the platform.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-semibold mb-3">Contact</h2>
                  <p className="text-muted-foreground">
                    For questions about these Terms of Service, contact us at <span className="font-medium">connectwithus@bharosepe.co.in</span>.
                  </p>
                </div>
              </div>
            </Card>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
};

export default TermsOfService;
