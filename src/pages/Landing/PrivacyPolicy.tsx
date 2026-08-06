import { Card } from "@/components/ui/card";
import ScrollReveal from "@/components/Landing/ScrollReveal";
import SiteFooter from "@/components/Landing/SiteFooter";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      <section className="bg-muted/20 py-20 md:py-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Privacy Policy</h1>
            <p className="text-lg text-muted-foreground">
              This Privacy Policy explains how Bharose Pe collects, uses, and protects your information when you use our website and services.
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
                  <h2 className="text-2xl font-semibold mb-3">Information We Collect</h2>
                  <p className="text-muted-foreground">
                    We collect only the information necessary to create and manage digital agreements, process transactions, and provide support. This may include your name, email address, phone number, transaction details, and any information you submit through our contact forms.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-semibold mb-3">How We Use Information</h2>
                  <p className="text-muted-foreground">
                    Bharose Pe uses your information to operate the platform, verify identities, manage escrow-style payments, support dispute resolution, and communicate with you about your account and transactions.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-semibold mb-3">Cookies and Analytics</h2>
                  <p className="text-muted-foreground">
                    We may use cookies and similar technologies to improve site performance, analyze usage patterns, and personalize your experience. We do not use cookies to track you across unrelated third-party sites.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-semibold mb-3">Security</h2>
                  <p className="text-muted-foreground">
                    We implement reasonable technical and organizational measures to help protect your data. While no system is completely secure, we take care to safeguard the information you share with Bharose Pe.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-semibold mb-3">Contact</h2>
                  <p className="text-muted-foreground">
                    If you have questions about this Privacy Policy, please contact us at <span className="font-medium">connectwithus@bharosepe.co.in</span>.
                  </p>
                </div>
              </div>
            </Card>
          </ScrollReveal>
        </div>
      </section>
      <SiteFooter />
    </div>
  );
};

export default PrivacyPolicy;
