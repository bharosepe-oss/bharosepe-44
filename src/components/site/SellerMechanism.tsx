import { FileSignature, Lock, Truck, BadgeIndianRupee, Check } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { AgreementCard, EscrowStatusCard } from "@/components/site/Mockups";

function DeliverThumb() {
  return (
    <div className="flex h-[104px] flex-col justify-between rounded-lg border bg-card p-3">
      <p className="text-xs font-semibold">Delivery submitted</p>
      <ul className="space-y-1 text-[11px] text-muted-foreground">
        <li className="flex items-start gap-1.5">
          <Check className="mt-0.5 h-3 w-3 shrink-0 text-primary" />
          <span className="min-w-0">Final files uploaded</span>
        </li>
        <li className="flex items-start gap-1.5">
          <Check className="mt-0.5 h-3 w-3 shrink-0 text-primary" />
          <span className="min-w-0">Awaiting buyer confirmation</span>
        </li>
      </ul>
    </div>
  );
}

function PaidThumb() {
  return (
    <div className="flex h-[104px] flex-col justify-between rounded-lg border border-primary/25 bg-accent p-3">
      <p className="text-xs font-semibold text-accent-foreground">Payout complete</p>
      <p className="rounded-md bg-primary px-2 py-2 text-[11px] font-semibold text-primary-foreground">
        ₹8,000 released to your account
      </p>
    </div>
  );
}

const steps = [
  {
    icon: FileSignature,
    title: "Agree",
    body: "Terms are locked in a structured digital agreement before work starts — no more informal 'trust me' arrangements.",
    thumb: (
      <AgreementCard
        items={[
          ["Deliverable", "Logo + brand kit"],
          ["Amount", "₹8,000"],
        ]}
      />
    ),
  },
  {
    icon: Lock,
    title: "Buyer pays into escrow",
    body: "The buyer isn't sending an advance to you — a stranger they just met — they're depositing into Bharose Pe's escrow, which is a far smaller trust step for them than a direct transfer. You get the same certainty an advance gives you, without the buyer having to trust you personally with it first.",
    thumb: (
      <EscrowStatusCard
        amount="₹8,000"
        label="Buyer's payment held in Escrow"
        note="Committed before work begins."
      />
    ),
  },
  {
    icon: Truck,
    title: "Deliver",
    body: "You do the work or ship the product, knowing payment is already secured and waiting on confirmation.",
    thumb: <DeliverThumb />,
  },
  {
    icon: BadgeIndianRupee,
    title: "Get paid",
    body: "Buyer confirms → funds release to you instantly. Any dispute goes through structured resolution, backed by the agreement — not a one-sided argument.",
    thumb: <PaidThumb />,
  },
];

export function SellerMechanism() {
  return (
    <section id="mechanism" className="scroll-mt-24 bg-surface py-20 md:py-28">
      <div className="container-page">
        <Reveal className="mx-auto max-w-3xl text-center">
          <h2 className="font-outfit text-3xl font-bold md:text-4xl lg:text-5xl">Get paid without the chase.</h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            The buyer's payment is confirmed and held before you lift a finger. You deliver knowing the
            money is already there — not hoping it shows up after.
          </p>
        </Reveal>

        <Reveal className="mt-14">
          <ol className="grid grid-cols-1 items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
              <li key={s.title} className="flex h-full">
                <div className="flex h-full w-full flex-col rounded-2xl border bg-card p-6 shadow-soft">
                  <div className="flex items-center gap-3">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-accent">
                      <s.icon className="h-5 w-5 text-accent-foreground" />
                    </span>
                    <span className="text-xs font-semibold text-muted-foreground">Step {i + 1}</span>
                  </div>
                  <h3 className="mt-4 min-h-12 text-base font-semibold leading-snug">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
                  <div className="mt-6 flex flex-1 items-end">
                    <div className="w-full">{s.thumb}</div>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  );
}
