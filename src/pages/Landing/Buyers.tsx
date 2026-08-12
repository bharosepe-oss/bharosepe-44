import { useState } from "react";
import { Link } from "react-router-dom";
import { Check, X, FileSignature, Lock, CheckCircle2, Split, ShieldCheck, AlertTriangle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import JoinEarlyAccessDialog from "@/components/Landing/JoinEarlyAccessDialog";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import ScrollReveal from "@/components/Landing/ScrollReveal";
import SiteFooter from "@/components/Landing/SiteFooter";
import AnimatedBackground from "@/components/Landing/AnimatedBackground";
import { cn } from "@/lib/utils";

const channels = ["IndiaMART", "Justdial", "Instagram", "WhatsApp", "LinkedIn", "Referral", "Email"];
const columns = ["Direct Payment (UPI/Bank)", "Traditional Escrow", "Bharose Pe"] as const;

type Val = "yes" | "no" | string;

const rows: { criterion: string; values: [Val, Val, Val] }[] = [
  { criterion: "Works with any seller, any channel", values: ["yes", "Limited", "yes"] },
  { criterion: "Payment held until you confirm", values: ["no", "yes", "yes"] },
  { criterion: "Set up in minutes, not days", values: ["yes", "no", "yes"] },
  { criterion: "Structured, written agreement", values: ["no", "yes", "yes"] },
  { criterion: "Works for freelance/B2B services, not just goods", values: ["no", "Rare", "yes"] },
  { criterion: "No lawyers or notarization required", values: ["yes", "no", "yes"] },
];

const faqs = [
  {
    q: "Is this actual escrow, or something else?",
    a: "Yes — Bharose Pe is built on the same trust principle as traditional escrow, delivered through a structured digital agreement and licensed payment aggregators, without the paperwork and delay of a traditional escrow arrangement.",
  },
  {
    q: "Does Bharose Pe hold my money?",
    a: "Payments move through licensed payment aggregators under conditional-release terms — Bharose Pe enforces the condition, it isn't a black-box wallet.",
  },
  {
    q: "What if the seller refuses to use Bharose Pe?",
    a: "That's useful information on its own — sellers confident in the deal have no reason to avoid a neutral verification layer.",
  },
  {
    q: "Does this work for services, not just products?",
    a: "Yes — freelance work, agency contracts, and B2B services use the same milestone-based mechanism.",
  },
  {
    q: "What if we disagree on whether it was delivered correctly?",
    a: "The agreement and evidence trail (photos, confirmations, timestamps) form the basis for structured dispute resolution.",
  },
];

const scenarios = [
  {
    id: "indiamart",
    label: "IndiaMART / Justdial",
    text: "New supplier for bulk inventory or a service enquiry — good terms, no track record yet.",
    fear: "What if I pay the advance and the order never ships?",
  },
  {
    id: "social",
    label: "Instagram & WhatsApp",
    text: "A seller's page looks legit — decent following, nice photos. You DM to order.",
    fear: "What if they go quiet the moment payment lands?",
  },
  {
    id: "freelance",
    label: "Freelance & Agency",
    text: "Hiring a freelancer — or being hired — for a milestone-based project.",
    fear: "What if the work stalls halfway with no accountability?",
  },
  {
    id: "b2b",
    label: "B2B / SME Vendor",
    text: "Your business needs a new vendor — even one referred by a partner you trust.",
    fear: "What if a delay or quality issue costs us the client deadline?",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    text: "A polished profile and a confident pitch — but no shared history and no contract.",
    fear: "What if the retainer is paid and the deliverables never arrive?",
  },
  {
    id: "referral",
    label: "Referral",
    text: "A friend vouched for them, so terms stayed casual and mostly verbal.",
    fear: "What if it goes wrong and I lose the money and the friendship?",
  },
  {
    id: "email",
    label: "Email",
    text: "A quotation and an invoice over email, with a 50% advance requested upfront.",
    fear: "What if the invoice is honoured on paper but never in practice?",
  },
  {
    id: "existing",
    label: "Existing Business Relationship",
    text: "A long-time vendor, bigger order than usual, still no written terms.",
    fear: "What if this one slips and there's nothing to point back to?",
  },
];

const checklist = [
  "First order with a new supplier",
  "Buying through social media",
  "Hiring a freelancer or agency",
  "Large advance payment",
  "Bulk inventory order",
  "High-value service agreement",
];

const steps = [
  {
    icon: FileSignature,
    title: "Agree",
    body: "Confirm terms — price, deliverable, timeline — in a structured digital agreement. Under 2 minutes, no paperwork.",
    thumb: <AgreementCard compact />,
  },
  {
    icon: Lock,
    title: "Pay into escrow, conditionally",
    body: "Payment moves through a licensed payment aggregator and is held against the agreed condition.",
    thumb: <EscrowStatusCard />,
  },
  {
    icon: CheckCircle2,
    title: "Verify",
    body: "Delivery, milestone, or quality is confirmed by the buyer — or flagged, with evidence, if it isn't.",
    thumb: <VerifyCard />,
  },
  {
    icon: Split,
    title: "Release or Resolve",
    body: "Confirmed → payment releases instantly. Disputed → structured resolution, backed by the agreement and evidence trail.",
    thumb: <ReleaseThumb />,
  },
];

function scrollToId(id: string) {
  if (typeof window === "undefined") return;
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return <ScrollReveal delay={delay} direction="up" className={className}>{children}</ScrollReveal>;
}

function Value({ value }: { value: Val }) {
  if (value === "yes") {
    return (
      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground" aria-label="Yes">
        <Check className="h-3.5 w-3.5" />
      </span>
    );
  }
  if (value === "no") {
    return (
      <span className="flex h-6 w-6 items-center justify-center rounded-full border border-border bg-transparent text-muted-foreground" aria-label="No">
        <X className="h-3.5 w-3.5" />
      </span>
    );
  }
  return <span>{value}</span>;
}

function MockFrame({ children, className, muted = false, accent = false }: { children: React.ReactNode; className?: string; muted?: boolean; accent?: boolean }) {
  return (
    <div
      className={cn(
        "flex h-full w-full flex-col overflow-hidden rounded-xl border p-0",
        accent ? "border-accent/20 bg-accent/5 shadow-soft" : "border-border bg-card",
        muted && "grayscale",
        className,
      )}
    >
      <div className={cn("flex items-center gap-1.5 px-3 py-2", accent ? "border-b border-accent/20 bg-accent/10" : "border-b bg-muted")}>
        <span className="h-2 w-2 rounded-full bg-border" />
        <span className="h-2 w-2 rounded-full bg-border" />
        <span className="h-2 w-2 rounded-full bg-border" />
      </div>
      <div className="flex min-h-0 flex-1 flex-col gap-3 p-3 sm:p-4">{children}</div>
    </div>
  );
}

function Bubble({ side = "left", variant = "default", children }: { side?: "left" | "right"; variant?: "default" | "accent"; children: React.ReactNode }) {
  return (
    <div className={cn("flex", side === "right" ? "justify-end" : "justify-start")}>
      <p
        className={cn(
          "max-w-[85%] rounded-2xl px-3 py-2 text-xs leading-relaxed sm:text-sm",
          side === "right"
            ? "rounded-br-sm bg-primary text-primary-foreground"
            : variant === "accent"
            ? "rounded-bl-sm bg-accent/10 text-accent"
            : "rounded-bl-sm bg-card text-foreground",
        )}
      >
        {children}
      </p>
    </div>
  );
}

function SystemNote({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto flex max-w-[92%] items-start gap-2 rounded-lg bg-accent/10 px-3 py-2 text-xs text-accent">
      <ShieldCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" />
      <span className="min-w-0">{children}</span>
    </div>
  );
}

function AgreementCard({ compact = false, accent = false }: { compact?: boolean; accent?: boolean }) {
  return (
    <div className={cn(
      "rounded-lg p-3",
      accent ? "border border-accent/20 bg-accent/10" : "border border-border bg-card",
    )}>
      <div className="mb-2 flex items-center gap-2">
        <FileSignature className={cn("h-3.5 w-3.5 shrink-0", accent ? "text-accent" : "text-primary")} />
        <p className={cn("truncate text-xs font-semibold", accent && "text-accent")}>Agreement summary</p>
      </div>
      <dl className="space-y-1.5 text-[11px] sm:text-xs">
        {[["Deliverable", "Leather jacket (M)"], ["Amount", "₹3,500"], ["Timeline", "Ships in 3 days"]]
          .slice(0, compact ? 2 : 3)
          .map(([k, v]) => (
            <div key={k} className="flex items-start justify-between gap-3">
              <dt className="text-muted-foreground">{k}</dt>
              <dd className="text-right font-medium">{v}</dd>
            </div>
          ))}
      </dl>
    </div>
  );
}

function EscrowStatusCard() {
  return (
    <div className="rounded-lg border border-accent/20 bg-accent/10 p-3 text-accent shadow-soft">
      <div className="flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-start gap-2">
          <Lock className="h-3.5 w-3.5 shrink-0 text-accent" />
          <p className="text-xs font-semibold leading-snug text-accent">Held in Escrow</p>
        </div>
        <span className="shrink-0 rounded-full bg-accent px-2 py-0.5 text-[10px] font-semibold text-accent-foreground">₹3,500</span>
      </div>
      <p className="mt-2 text-[11px] leading-relaxed text-accent/70">Releases automatically once delivery is confirmed.</p>
    </div>
  );
}

function VerifyCard() {
  return (
    <div className="rounded-lg border bg-card p-3">
      <p className="mb-2 text-xs font-semibold">Delivery received?</p>
      <div className="grid grid-cols-2 gap-2">
        <span className="flex h-8 items-center justify-center gap-1.5 rounded-md bg-primary text-[11px] font-semibold text-primary-foreground">
          <Check className="h-3.5 w-3.5" /> Approve
        </span>
        <span className="flex h-8 items-center justify-center gap-1.5 rounded-md border text-[11px] font-semibold text-muted-foreground">
          <AlertTriangle className="h-3.5 w-3.5" /> Raise issue
        </span>
      </div>
    </div>
  );
}

function ResultStrip({ tone = "bad", children }: { tone?: "bad" | "good"; children: React.ReactNode }) {
  return (
    <div className={cn("mt-auto rounded-lg px-3 py-2 text-center text-[11px] font-semibold sm:text-xs", tone === "bad" ? "bg-destructive/10 text-destructive" : "bg-success/10 text-success")}>{children}</div>
  );
}

function ReleaseThumb() {
  const [state, setState] = useState<"release" | "dispute">("release");
  return (
    <div className="flex h-[104px] flex-col justify-between rounded-lg border border-border bg-card p-3">
      <div className="grid grid-cols-2 gap-1 rounded-md bg-card/80 p-1">
        {(["release", "dispute"] as const).map((s) => (
          <button key={s} type="button" onClick={() => setState(s)} className={cn("h-6 rounded text-[10px] font-semibold capitalize transition-colors", state === s ? "bg-primary text-primary-foreground shadow-soft" : "border border-border bg-card text-foreground")}>{s}</button>
        ))}
      </div>
      {state === "release" ? (
        <p className="rounded-md bg-success/15 px-2 py-2 text-[11px] font-semibold text-success">₹3,500 released to seller</p>
      ) : (
        <p className="rounded-md bg-destructive/15 px-2 py-2 text-[11px] font-semibold text-destructive">Resolution opened · evidence attached</p>
      )}
    </div>
  );
}

function Hero({ onJoinEarlyAccess }: { onJoinEarlyAccess: () => void }) {
  return (
    <section id="top" className="relative overflow-hidden bg-[#f5f2f8] pb-20 pt-32 md:pb-28 md:pt-40">
      <AnimatedBackground />
      <div className="container-page relative z-10">
        <div className="mx-auto max-w-4xl animate-fade-in text-center">
          <h1 className="font-outfit text-4xl font-bold md:text-5xl lg:text-6xl">Trust, made structural.</h1>
          <p className="mx-auto mt-6 max-w-3xl text-lg text-muted-foreground md:text-xl">
            India's Trust &amp; Escrow Infrastructure — for a new IndiaMART supplier, a freelancer from LinkedIn, or a vendor your business hasn't worked with before. Wherever you found each other, Bharose Pe turns the agreement into something structured, the payment into something conditional, and the outcome into something provable.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button size="lg" className="h-auto px-8 py-5 text-base font-semibold md:text-lg" onClick={onJoinEarlyAccess}>Join Early Access →</Button>
            <Button size="lg" variant="outline" className="h-auto px-8 py-5 text-base font-semibold md:text-lg" onClick={() => scrollToId("mechanism")}>See how it works</Button>
          </div>
          <ul className="mt-10 flex flex-wrap items-center justify-center gap-2">
            {channels.map((c, i) => (
              <li key={c} className="animate-slide-up flex h-9 items-center rounded-full border bg-card px-4 text-xs font-medium text-muted-foreground" style={{ animationDelay: `${150 + i * 70}ms` }}>
                {c}
              </li>
            ))}
          </ul>
        </div>

        <div className="mx-auto mt-14 max-w-5xl overflow-hidden rounded-2xl border bg-card shadow-panel">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="flex flex-col gap-3 border-b p-5 grayscale md:border-b-0 md:border-r md:p-7">
              <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">Without a trust layer</p>
              <Bubble>Nice jacket, ₹3,500. Pay UPI and I'll ship today.</Bubble>
              <Bubble side="right">Sent ₹3,500</Bubble>
              <Bubble side="right">Hi? Any tracking ID?</Bubble>
              <p className="mt-auto text-[11px] text-muted-foreground">Seller offline · last seen 4 days ago</p>
            </div>
            <div className="flex flex-col gap-3 bg-surface p-5 md:p-7">
              <p className="inline-flex rounded-full bg-accent/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-accent">With Bharose Pe</p>
              <SystemNote>Escrow set up with Bharose Pe. Payment will release after delivery confirmation.</SystemNote>
              <AgreementCard accent />
              <EscrowStatusCard />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Recognize() {
  const [active, setActive] = useState<string>("indiamart");
  const current = scenarios.find((s) => s.id === active) ?? scenarios[0]!;

  return (
        <section className="relative overflow-hidden bg-background py-16 md:py-20">
          <div
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{
              backgroundImage: `linear-gradient(hsl(230 60% 25%) 1px, transparent 1px), linear-gradient(90deg, hsl(230 60% 25%) 1px, transparent 1px)`,
              backgroundSize: '50px 50px',
            }}
            aria-hidden="true"
          />
      <div className="container relative mx-auto px-4">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-outfit text-3xl font-bold md:text-4xl lg:text-5xl">Recognize the moment</h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">Wherever the deal started, the risk shows up at the same point — the moment money moves before trust exists.</p>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <ul className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {scenarios.map((s) => (
              <li key={s.id} className="min-w-0">
                <button type="button" onClick={() => setActive(s.id)} aria-pressed={active === s.id} className={cn("flex h-16 w-full items-center justify-center rounded-xl border px-3 text-center text-xs font-medium leading-tight transition-colors sm:text-sm", active === s.id ? "border-primary bg-primary text-primary-foreground" : "bg-card text-muted-foreground hover:bg-muted")}>
                  <span className="min-w-0">{s.label}</span>
                </button>
              </li>
            ))}
          </ul>
          <div className="mx-auto mt-4 h-8 w-px bg-gradient-to-b from-border to-primary/60" aria-hidden />
          <div className="mx-auto flex min-h-[168px] max-w-2xl flex-col justify-center rounded-2xl border border-accent/20 bg-accent/10 p-6 text-center md:min-h-[152px]">
            <p className="text-base font-medium md:text-lg text-foreground">{current.text}</p>
            <p className="mt-3 text-sm italic text-accent">“{current.fear}”</p>
          </div>
        </Reveal>

        <Reveal delay={200}>
          <h3 className="mt-16 text-center text-xl font-semibold md:text-2xl">When should you use it?</h3>
          <ul className="mx-auto mt-6 grid max-w-3xl grid-cols-1 gap-3 sm:grid-cols-2">
            {checklist.map((item) => (
              <li key={item} className="flex h-full min-h-14 items-center gap-3 rounded-xl border bg-card px-4 py-3">
                <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-accent">
                  <Check className="h-3.5 w-3.5 text-accent-foreground" />
                </span>
                <span className="min-w-0 text-sm leading-tight">{item}</span>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={300}>
          <div className="mt-12 text-center">
            <Button size="lg" variant="outline" onClick={() => scrollToId("mechanism")}>See exactly what happens next →</Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Mechanism() {
  return (
        <section id="mechanism" className="scroll-mt-24 bg-background py-16 md:py-20">
      <div className="container mx-auto px-4">
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-outfit text-3xl font-bold md:text-4xl lg:text-5xl">Escrow, rebuilt for how India actually transacts</h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">Traditional escrow means paperwork, lawyers, and days of delay. Bharose Pe keeps the same core principle — a neutral party holding the transaction to its terms — and rebuilds it as a structured digital agreement, a conditional payment, and a verifiable record.</p>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <ol className="mt-14 grid grid-cols-1 items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
              <li key={s.title} className="flex h-full">
                <div className="flex h-full w-full flex-col rounded-2xl border bg-card p-6 shadow-soft animate-slide-up" style={{ animationDelay: `${i * 120}ms` }}>
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

function Story() {
  return (
        <section className="bg-background py-16 md:py-20">
      <div className="container mx-auto px-4">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-outfit text-3xl font-bold md:text-4xl lg:text-5xl">Same purchase. Two outcomes.</h2>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div className="mx-auto mt-12 grid max-w-4xl grid-cols-1 items-stretch gap-8 md:grid-cols-2">
            <div className="flex h-full flex-col">
              <p className="mb-3 text-center text-xs font-semibold uppercase tracking-widest text-muted-foreground">Raj's story · no protection</p>
              <MockFrame muted className="min-h-[420px] animate-slide-up">
                <Bubble>Nice jacket, ₹3,500, pay UPI and I'll ship today.</Bubble>
                <Bubble side="right">Done, sent ₹3,500</Bubble>
                <Bubble side="right">Hi? Any tracking ID?</Bubble>
                <p className="text-center text-[11px] text-muted-foreground">Seller offline · last seen 6 days ago</p>
                <ResultStrip tone="bad">₹3,500 lost · No jacket · No recourse</ResultStrip>
              </MockFrame>
            </div>

            <div className="flex h-full flex-col">
              <p className="mb-3 text-center text-xs font-semibold uppercase tracking-widest text-accent">Meera's story · with Bharose Pe</p>
              <MockFrame accent className="min-h-[420px] border-accent/20 shadow-soft animate-slide-up">
                <Bubble variant="accent">Nice jacket, ₹3,500, pay UPI and I'll ship today.</Bubble>
                <SystemNote>Escrow set up with Bharose Pe. Payment will release after delivery confirmation.</SystemNote>
                <AgreementCard compact accent />
                <EscrowStatusCard />
                <VerifyCard />
                <ResultStrip tone="good">Payment released · Jacket delivered · Both sides protected</ResultStrip>
              </MockFrame>
            </div>
          </div>
          <p className="mx-auto mt-8 max-w-xl text-center text-sm text-muted-foreground">Same seller behavior either way. The difference is what happens if it goes wrong.</p>
        </Reveal>
      </div>
    </section>
  );
}

function Comparison() {
  const [expandedComparisonRow, setExpandedComparisonRow] = useState<number | null>(0);

  return (
        <section className="bg-background py-16 md:py-20">
      <div className="container mx-auto px-4">
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-outfit text-3xl font-bold md:text-4xl lg:text-5xl">Escrow used to mean lawyers and lock-ups. Now it means this.</h2>
          </div>
        </Reveal>

        <Reveal delay={100} className="mt-12 hidden md:block">
          <div className="mx-auto max-w-5xl overflow-hidden rounded-2xl border bg-card">
            <div className="grid grid-cols-[minmax(0,1.4fr)_repeat(3,minmax(0,1fr))] items-stretch">
              <div className="border-b bg-muted px-5 py-4 text-xs font-semibold uppercase tracking-widest text-muted-foreground">Criterion</div>
              {columns.map((c, i) => (
                <div key={c} className={cn("flex items-center justify-center border-b px-4 py-4 text-center text-sm font-semibold", i === 2 ? "border-t-2 border-t-primary bg-accent text-accent-foreground" : "bg-muted text-muted-foreground")}>{c}</div>
              ))}
              {rows.map((r) => (
                <div key={r.criterion} className="col-span-4 grid grid-cols-[minmax(0,1.4fr)_repeat(3,minmax(0,1fr))]">
                  <div className="flex items-center border-b px-5 py-4 text-sm">{r.criterion}</div>
                  {r.values.map((v, i) => (
                    <div key={i} className={cn("flex items-center justify-center border-b px-4 py-4 text-center text-sm", i === 2 ? "bg-accent font-semibold text-accent-foreground" : "text-muted-foreground")}> <Value value={v} /> </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={100} className="mt-10 md:hidden">
          <div className="space-y-4">
            {rows.map((row, rowIndex) => (
              <div key={row.criterion} className="rounded-2xl border border-border bg-card">
                <button type="button" className="flex w-full items-center justify-between px-5 py-4 text-left text-sm font-semibold text-foreground" onClick={() => setExpandedComparisonRow(expandedComparisonRow === rowIndex ? null : rowIndex)}>
                  <span>{row.criterion}</span>
                  <span className="text-primary">{expandedComparisonRow === rowIndex ? "–" : "+"}</span>
                </button>
                {expandedComparisonRow === rowIndex ? (
                  <div className="px-5 pb-5 text-sm text-muted-foreground">
                    <div className="space-y-3">
                      <div><p className="font-semibold">Direct Payment:</p><p>{row.values[0]}</p></div>
                      <div><p className="font-semibold">Traditional Escrow:</p><p>{row.values[1]}</p></div>
                      <div><p className="font-semibold">Bharose Pe:</p><p>{row.values[2]}</p></div>
                    </div>
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={200}>
          <div className="mx-auto mt-10 max-w-2xl text-center text-sm text-muted-foreground">
            <p>Bharose Pe keeps everything that made escrow trustworthy — and removes everything that made it slow.</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function EarlyAccess({ onJoinEarlyAccess }: { onJoinEarlyAccess: () => void }) {
  return (
    <section id="early-access" className="scroll-mt-24 bg-background py-20 md:py-28">
      <div className="container mx-auto px-4">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-outfit text-3xl font-bold md:text-4xl lg:text-5xl">Early, and honest about it</h2>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">We're early — and we're building this with our first buyers, not for them. Bharose Pe is in its pilot phase, working with the GIFT IFIH and Plug and Play ecosystem and operating through licensed payment aggregators. Every early user shapes what this becomes. If you're tired of paying based on hope, join now — you'll be talking directly to the people building it.</p>
            <div className="mt-8">
              <Button size="lg" onClick={onJoinEarlyAccess}>Join Early Access →</Button>
              <p className="mt-3 text-xs text-muted-foreground">No cost to join. We'll reach out before your first transaction.</p>
            </div>
          </div>
        </Reveal>
        <div className="mx-auto mt-16 h-px max-w-2xl bg-border" aria-hidden />
        <Reveal delay={100}>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((f) => (
              <AccordionItem key={f.q} value={f.q}>
                <AccordionTrigger className="min-h-14 text-left text-sm font-medium md:text-base">{f.q}</AccordionTrigger>
                <AccordionContent className="text-sm leading-relaxed text-muted-foreground">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  );
}

function FinalCta({ onJoinEarlyAccess }: { onJoinEarlyAccess: () => void }) {
  return (
    <section className="relative overflow-hidden px-4 py-24 md:py-28">
      <AnimatedBackground />
      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal direction="up">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-6 text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
              Be the First to Experience Safe Transactions
            </h2>
            <p className="mx-auto mb-8 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
              We're building India's escrow infrastructure. Join our early access list.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button size="lg" className="h-auto w-full bg-primary px-10 py-6 text-lg text-primary-foreground shadow-soft hover:bg-primary/90 sm:w-auto" onClick={onJoinEarlyAccess}>
                Join Early Access
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="h-auto w-full border-primary px-10 py-6 text-lg text-primary hover:bg-primary/10 sm:w-auto" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                See How It Works
              </Button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

const Buyers = () => {
  const [isEarlyAccessOpen, setIsEarlyAccessOpen] = useState(false);

  return (
    <main className="min-h-screen bg-background font-inter">
      <JoinEarlyAccessDialog
        isOpen={isEarlyAccessOpen}
        onClose={() => setIsEarlyAccessOpen(false)}
        defaultInterestedAs="buyer"
      />
      <Hero onJoinEarlyAccess={() => setIsEarlyAccessOpen(true)} />
      <Recognize />
      <Mechanism />
      <Story />
      <Comparison />
      <EarlyAccess onJoinEarlyAccess={() => setIsEarlyAccessOpen(true)} />
      <FinalCta onJoinEarlyAccess={() => setIsEarlyAccessOpen(true)} />
      <SiteFooter />
    </main>
  );
};

export default Buyers;
