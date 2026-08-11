import { Check, X } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

const columns = ["Direct Payment (UPI/Bank)", "Traditional Escrow", "Bharose Pe"] as const;

type Val = "yes" | "no" | string;
type Row = { criterion: string; values: [Val, Val, Val] };

const defaultRows: Row[] = [
  { criterion: "Works with any seller, any channel", values: ["yes", "Limited", "yes"] },
  { criterion: "Payment held until you confirm", values: ["no", "yes", "yes"] },
  { criterion: "Set up in minutes, not days", values: ["yes", "no", "yes"] },
  { criterion: "Structured, written agreement", values: ["no", "yes", "yes"] },
  { criterion: "Works for freelance/B2B services, not just goods", values: ["no", "Rare", "yes"] },
  { criterion: "No lawyers or notarization required", values: ["yes", "no", "yes"] },
];

function Value({ value }: { value: Val }) {
  if (value === "yes")
    return (
      <span
        className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground"
        aria-label="Yes"
      >
        <Check className="h-3.5 w-3.5" />
      </span>
    );
  if (value === "no")
    return (
      <span
        className="flex h-6 w-6 items-center justify-center rounded-full border border-border bg-transparent text-muted-foreground"
        aria-label="No"
      >
        <X className="h-3.5 w-3.5" />
      </span>
    );
  return <span>{value}</span>;
}

export function Comparison({
  heading = "Escrow used to mean lawyers and lock-ups. Now it means this.",
  rows = defaultRows,
  closing = "Bharose Pe keeps everything that made escrow trustworthy — and removes everything that made it slow.",
}: {
  heading?: string;
  rows?: Row[];
  closing?: string;
}) {
  return (
    <section className="bg-surface py-20 md:py-28">
      <div className="container-page">
        <Reveal className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-outfit font-semibold md:text-4xl">{heading}</h2>
        </Reveal>

        <Reveal className="mt-12 hidden md:block">
          <div className="mx-auto max-w-5xl overflow-hidden rounded-2xl border bg-card">
            <div className="grid grid-cols-[minmax(0,1.4fr)_repeat(3,minmax(0,1fr))] items-stretch">
              <div className="border-b bg-surface-2 px-5 py-4 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Criterion
              </div>
              {columns.map((c, i) => (
                <div
                  key={c}
                  className={cn(
                    "flex items-center justify-center border-b px-4 py-4 text-center text-sm font-semibold",
                    i === 2
                      ? "border-t-2 border-t-primary bg-accent text-accent-foreground"
                      : "bg-surface-2 text-muted-foreground",
                  )}
                >
                  {c}
                </div>
              ))}

              {rows.map((r) => (
                <div key={r.criterion} className="col-span-4 grid grid-cols-subgrid">
                  <div className="flex items-center border-b px-5 py-4 text-sm">{r.criterion}</div>
                  {r.values.map((v, i) => (
                    <div
                      key={i}
                      className={cn(
                        "flex items-center justify-center border-b px-4 py-4 text-center text-sm",
                        i === 2
                          ? "bg-accent font-semibold text-accent-foreground"
                          : "text-muted-foreground",
                      )}
                    >
                      <Value value={v} />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal className="mt-10 md:hidden">
          <Accordion type="single" collapsible className="rounded-2xl border bg-card px-4">
            {rows.map((r) => (
              <AccordionItem key={r.criterion} value={r.criterion}>
                <AccordionTrigger className="text-left text-sm">{r.criterion}</AccordionTrigger>
                <AccordionContent>
                  <dl className="space-y-2 text-sm">
                    {columns.map((c, i) => (
                      <div key={c} className="flex items-start justify-between gap-4">
                        <dt className="min-w-0 text-muted-foreground">{c}</dt>
                        <dd
                          className={cn(
                            "flex shrink-0 items-center justify-end",
                            i === 2 && "font-semibold text-accent-foreground",
                          )}
                        >
                          <Value value={r.values[i]!} />
                        </dd>
                      </div>
                    ))}
                  </dl>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>

        <Reveal className="mx-auto mt-10 max-w-2xl text-center text-sm text-muted-foreground">
          <p>{closing}</p>
        </Reveal>
      </div>
    </section>
  );
}
