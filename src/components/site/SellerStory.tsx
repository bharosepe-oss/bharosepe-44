import { Check } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import {
  AgreementCard,
  Bubble,
  EscrowStatusCard,
  MockFrame,
  ResultStrip,
  SystemNote,
} from "@/components/site/Mockups";

function StatusLine({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto flex max-w-[92%] items-start gap-2 rounded-lg bg-accent px-3 py-2 text-xs text-accent-foreground">
      <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
      <span className="min-w-0">{children}</span>
    </div>
  );
}

export function SellerStory() {
  return (
    <section className="bg-background py-20 md:py-28">
      <div className="container-page">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="font-outfit text-3xl font-bold md:text-4xl lg:text-5xl">Same job. Two outcomes.</h2>
        </Reveal>

        <Reveal className="mt-12">
          <div className="mx-auto grid max-w-4xl grid-cols-1 items-stretch gap-8 md:grid-cols-2">
            <div className="flex h-full flex-col">
              <p className="mb-3 text-center text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Without Bharose Pe
              </p>
              <MockFrame muted className="min-h-[420px]">
                <Bubble>Need a logo for ₹8,000.</Bubble>
                <Bubble side="right">Sure. I usually take 50% advance.</Bubble>
                <Bubble>I'll pay after delivery.</Bubble>
                <Bubble side="right">Final files sent.</Bubble>
                <p className="text-center text-[11px] text-muted-foreground">Buyer stopped responding</p>
                <ResultStrip tone="bad">Delivered. Payment uncertain.</ResultStrip>
              </MockFrame>
            </div>

            <div className="flex h-full flex-col">
              <p className="mb-3 text-center text-xs font-semibold uppercase tracking-widest text-accent">
                With Bharose Pe
              </p>
              <MockFrame accent className="min-h-[420px] shadow-soft">
                <Bubble>Need a logo for ₹8,000.</Bubble>
                <Bubble side="right">Sure.</Bubble>
                <StatusLine>Agreement Created — ₹8,000 deposited into Escrow</StatusLine>
                <Bubble side="right">Final files attached.</Bubble>
                <div className="flex flex-col gap-3">
                  <Bubble>Looks great.</Bubble>
                  <StatusLine>Payment released instantly.</StatusLine>
                </div>
                <ResultStrip tone="good">Delivered. Payment already secured.</ResultStrip>
              </MockFrame>
            </div>
          </div>

          <p className="mx-auto mt-8 max-w-xl text-center text-sm text-muted-foreground">
            Same job, same buyer type — the only difference is when the money became real.
          </p>
        </Reveal>

        <Reveal className="mt-20">
          <div className="mx-auto grid max-w-4xl grid-cols-1 items-stretch gap-8 md:grid-cols-2">
            <div className="flex h-full flex-col">
              <p className="mb-3 text-center text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Rajesh's story · advance asked, deal lost
              </p>
              <MockFrame muted className="min-h-[420px]">
                <Bubble>Need ₹85,000 of fittings for a new site. Can you supply?</Bubble>
                <Bubble side="right">
                  Yes — standard for a first order is 50% advance before we ship.
                </Bubble>
                <Bubble>Hmm. We don't know your firm yet. Let me check internally.</Bubble>
                <p className="text-center text-[11px] text-muted-foreground">
                  Buyer went quiet · order placed with another supplier
                </p>
                <ResultStrip tone="bad">
                  Order lost · Advance request killed the deal · No revenue
                </ResultStrip>
              </MockFrame>
            </div>

            <div className="flex h-full flex-col">
              <p className="mb-3 text-center text-xs font-semibold uppercase tracking-widest text-accent">
                Meera's story · with Bharose Pe
              </p>
              <MockFrame accent className="min-h-[420px] shadow-soft">
                <Bubble>Need ₹85,000 of fittings for a new site. Can you supply?</Bubble>
                <Bubble side="right">
                  Yes — 50% advance, but you deposit it into Bharose Pe's escrow, not my account.
                </Bubble>
                <SystemNote>
                  Buyer deposited ₹42,500 advance into Bharose Pe escrow — verifiable, and released
                  only on confirmed delivery.
                </SystemNote>
                <AgreementCard
                  compact
                  items={[
                    ["Order", "Hardware fittings"],
                    ["Advance", "₹42,500 of ₹85,000"],
                  ]}
                />
                <EscrowStatusCard
                  amount="₹42,500"
                  label="Advance held in Escrow"
                  note="Confirmed before dispatch."
                />
                <ResultStrip tone="good">
                  Order won · Same advance secured · Shipped with confidence
                </ResultStrip>
              </MockFrame>
            </div>
          </div>

          <p className="mx-auto mt-8 max-w-xl text-center text-sm text-muted-foreground">
            Same ask, same amount. The difference is who the buyer had to trust with it.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
