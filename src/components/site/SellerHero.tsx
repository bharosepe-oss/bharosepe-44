import { Button } from "@/components/ui/button";
import { scrollToId } from "@/components/site/Reveal";
import {
  AgreementCard,
  Bubble,
  EscrowStatusCard,
  SystemNote,
} from "@/components/site/Mockups";

const channels = ["IndiaMART", "Justdial", "Instagram", "WhatsApp", "LinkedIn", "Referral", "Email"];

type SellerHeroProps = {
  onJoinEarlyAccess?: () => void;
};

export function SellerHero({ onJoinEarlyAccess }: SellerHeroProps) {
  const handleJoin = () => {
    if (onJoinEarlyAccess) {
      onJoinEarlyAccess();
      return;
    }
    scrollToId("early-access");
  };

  return (
    <section id="top" className="bg-surface pb-20 pt-32 md:pb-28 md:pt-40">
      <div className="container-page">
        <div className="mx-auto max-w-4xl animate-fade-in text-center">
          <h1 className="font-outfit text-4xl font-bold md:text-5xl lg:text-6xl">
            Get paid. Every time.
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-lg text-muted-foreground md:text-xl">
            Asking a new buyer for an advance can cost you the deal. With Bharose Pe the buyer pays into a
            neutral escrow they can verify instead of your account — so you get the certainty of an advance
            without the deal dying at the advance-request step.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button size="lg" className="h-auto px-8 py-5 text-base font-semibold md:text-lg" onClick={handleJoin}>
              Join Early Access →
            </Button>
            <Button size="lg" variant="outline" className="h-auto px-8 py-5 text-base font-semibold md:text-lg" onClick={() => scrollToId("mechanism")}>
              See how it works ↓
            </Button>
          </div>

          <ul className="mt-10 flex flex-wrap items-center justify-center gap-2">
            {channels.map((c, i) => (
              <li
                key={c}
                className="animate-slide-up flex h-9 items-center rounded-full border bg-card px-4 text-xs font-medium text-muted-foreground"
                style={{ animationDelay: `${150 + i * 70}ms` }}
              >
                {c}
              </li>
            ))}
          </ul>
        </div>

        <div className="mx-auto mt-14 max-w-5xl overflow-hidden rounded-2xl border bg-card shadow-panel">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="flex flex-col gap-3 border-b p-5 grayscale md:border-b-0 md:border-r md:p-7">
              <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
                Without a trust layer
              </p>
              <Bubble>Logo looks great, send the final files — I'll pay next week.</Bubble>
              <Bubble side="right">Shared the files. Payment update?</Bubble>
              <Bubble>…</Bubble>
              <p className="mt-auto text-[11px] text-muted-foreground">Buyer offline · last seen 9 days ago</p>
            </div>
            <div className="flex flex-col gap-3 bg-surface p-5 md:p-7">
              <p className="text-[11px] font-semibold uppercase tracking-widest text-accent-foreground">
                With Bharose Pe
              </p>
              <SystemNote>
                Buyer deposited payment into escrow before work started. It releases on confirmation.
              </SystemNote>
              <AgreementCard
                items={[
                  ["Deliverable", "Logo + brand kit"],
                  ["Amount", "₹8,000"],
                  ["Milestones", "Draft, 2 revisions, final"],
                ]}
              />
              <EscrowStatusCard
                amount="₹8,000"
                label="Buyer's payment held in Escrow"
                note="Releases to you the moment delivery is confirmed."
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
