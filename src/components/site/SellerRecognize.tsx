import { useState } from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal, scrollToId } from "@/components/site/Reveal";
import { cn } from "@/lib/utils";

const scenarios = [
  {
    id: "new-client",
    label: "New client, no history",
    text: "You ask a new buyer for an advance before starting — reasonable, but they don't know you.",
    fear: "What if asking for advance loses me the deal entirely?",
  },
  {
    id: "no-advance",
    label: "No advance, full exposure",
    text: "You skip the advance to keep the buyer comfortable and start the work on trust.",
    fear: "What if they delay, lowball, or vanish once it's done?",
  },
  {
    id: "social",
    label: "Instagram / WhatsApp orders",
    text: "A buyer DMs to order, agrees on price, but is reluctant to pay anything upfront to someone they just found online.",
    fear: "How do I ask for money upfront without sounding like a scam?",
  },
  {
    id: "freelance",
    label: "Freelance / Agency work",
    text: "A client wants work started before committing any payment — “revisions first, then we'll talk payment.”",
    fear: "What if 'let's see the work first' becomes indefinite free labor?",
  },
  {
    id: "indiamart",
    label: "IndiaMART / Justdial",
    text: "A bulk buyer wants a large first order but resists paying advance to an unverified supplier.",
    fear: "What if they walk the moment I mention advance payment?",
  },
  {
    id: "b2b",
    label: "Bulk / B2B orders",
    text: "A business buyer's procurement team is willing to pay upfront, but only if there's a formal, verifiable process — not a bank transfer to an unknown account.",
    fear: "What if my invoice alone isn't enough for them to trust sending advance?",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    text: "A company reaches out for a paid pilot project but wants to “start small” with no advance.",
    fear: "What if 'small pilot' becomes the whole project, unpaid?",
  },
  {
    id: "referral",
    label: "Referral",
    text: "A friend-of-a-friend wants to buy — “no need for anything formal between us.”",
    fear: "What if skipping the advance because it's a referral costs me the same way a stranger would?",
  },
];

const checklist = [
  "First order with a new buyer who's hesitant to pay advance",
  "Selling through social media where asking for upfront payment feels awkward",
  "Freelance or agency work where a client wants to see output before paying anything",
  "Any deal where you'd normally either lose the sale by asking for advance, or take on full risk by not asking",
  "Bulk or B2B orders where the buyer needs a verifiable, formal process to justify paying upfront",
  "High-value work where an advance is standard, but this buyer doesn't know you yet",
];

export function SellerRecognize() {
  const [active, setActive] = useState<string>("new-client");
  const current = scenarios.find((s) => s.id === active) ?? scenarios[0]!;

  return (
    <section className="bg-background py-20 md:py-28">
      <div className="container-page">
        <Reveal className="mx-auto max-w-3xl text-center">
          <h2 className="font-outfit text-3xl font-bold md:text-4xl lg:text-5xl text-foreground">
            Recognize the moment
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">
            However the buyer found you, the risk shows up at the same point — the moment you start
            working before the money is real.
          </p>
        </Reveal>

        <Reveal className="mt-12">
          <ul className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            {scenarios.map((s) => (
              <li key={s.id} className="min-w-0">
                <button
                  type="button"
                  onClick={() => setActive(s.id)}
                  aria-pressed={active === s.id}
                  className={cn(
                    "flex h-20 w-full items-center justify-center rounded-xl border px-4 text-center text-base font-medium leading-tight tracking-[-0.02em] transition-colors md:text-lg",
                    active === s.id
                      ? "border-primary bg-primary text-primary-foreground shadow-soft"
                      : "bg-card text-muted-foreground hover:bg-surface-2",
                  )}
                >
                  <span className="min-w-0">{s.label}</span>
                </button>
              </li>
            ))}
          </ul>

          <div className="mx-auto mt-4 h-8 w-px bg-gradient-to-b from-border to-primary/60" aria-hidden />

          <div className="mx-auto flex min-h-[220px] max-w-4xl flex-col justify-center rounded-[2rem] border border-primary/10 bg-[#edf3fb] p-8 text-center shadow-[0_10px_30px_rgba(109,84,170,0.06)] md:min-h-[210px] md:p-12">
            <p className="font-outfit text-[clamp(1.8rem,2.8vw,3.4rem)] font-semibold leading-[1.15] tracking-[-0.05em] text-[#2f2c36]">
              {current.text}
            </p>
            <p className="mt-4 font-outfit text-[clamp(1.2rem,1.8vw,2.1rem)] italic leading-snug text-[#4d6bbd]">
              “{current.fear}”
            </p>
          </div>
        </Reveal>

        <Reveal className="mt-16">
          <h3 className="text-center text-xl font-semibold md:text-2xl">When should you use it?</h3>
          <ul className="mx-auto mt-6 grid max-w-3xl grid-cols-1 gap-3 sm:grid-cols-2">
            {checklist.map((item) => (
              <li
                key={item}
                className="flex h-full min-h-14 items-center gap-3 rounded-xl border bg-card px-4 py-3"
              >
                <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-accent">
                  <Check className="h-3.5 w-3.5 text-accent-foreground" />
                </span>
                <span className="min-w-0 text-sm leading-tight">{item}</span>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal className="mt-12 text-center">
          <Button size="lg" variant="outline" onClick={() => scrollToId("mechanism")}>
            See exactly how you get paid →
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
