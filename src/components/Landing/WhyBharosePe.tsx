import { motion } from "framer-motion";
import { FileText, UserCheck, CalendarCheck, Scale } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const features = [
  {
    icon: FileText,
    title: "Create the Agreement",
    description: "Every transaction begins with a structured digital agreement that clearly defines deliverables, timelines, payment terms, milestones, and responsibilities before work starts.",
  },
  {
    icon: UserCheck,
    title: "Verify & Agree",
    description: "Both parties review the agreement, verify their identity, and accept the transaction terms before the transaction proceeds.",
  },
  {
    icon: CalendarCheck,
    title: "Track the Transaction",
    description: "Monitor milestones, approvals, deliverables, and transaction progress with complete transparency from start to finish.",
  },
  {
    icon: Scale,
    title: "Resolve with Evidence",
    description: "If a disagreement occurs, Bharose Pe evaluates the agreed terms and transaction records to support a fair and structured resolution process.",
  },
];

export const WhyBharosePe = () => {
  return (
    <section className="relative py-24 px-4 overflow-hidden bg-muted/20">
      <div className="relative z-10 container mx-auto max-w-7xl">
        <ScrollReveal>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-outfit font-bold text-center mb-4">
            Why Bharose Pe
          </h2>
          <p className="text-muted-foreground text-center mb-16 text-lg max-w-3xl mx-auto">
            Trust shouldn’t depend on assumptions. Bharose Pe brings structure to every transaction by helping both parties define clear terms, verify participants, track progress, manage payments according to agreed conditions, and maintain complete transaction records from start to finish.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <ScrollReveal key={index} delay={index * 0.1}>
              <motion.div
                className="glass-card p-8 rounded-2xl relative overflow-hidden group hover-glow h-full flex flex-col justify-between"
                whileHover={{ y: -10, scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <div className="relative z-10">
                  <motion.div
                    className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6"
                    whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <feature.icon className="w-8 h-8 text-primary" />
                  </motion.div>
                  <h3 className="text-2xl font-outfit font-bold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

