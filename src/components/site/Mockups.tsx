import type { ReactNode } from "react";
import { FileSignature, Lock, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

export function Bubble({
  side = "left",
  variant = "default",
  children,
}: {
  side?: "left" | "right";
  variant?: "default" | "accent";
  children: ReactNode;
}) {
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

export function SystemNote({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto flex max-w-[92%] items-start gap-2 rounded-lg bg-accent/10 px-3 py-2 text-xs text-accent">
      <ShieldCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" />
      <span className="min-w-0">{children}</span>
    </div>
  );
}

export function MockFrame({ children, className, muted = false, accent = false }: { children: ReactNode; className?: string; muted?: boolean; accent?: boolean }) {
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

export function ResultStrip({ tone = "bad", children }: { tone?: "bad" | "good"; children: ReactNode }) {
  return (
    <div className={cn("mt-auto rounded-lg px-3 py-2 text-center text-[11px] font-semibold sm:text-xs", tone === "bad" ? "bg-destructive/10 text-destructive" : "bg-success/10 text-success")}>{children}</div>
  );
}

export function AgreementCard({ items, compact = false }: { items: Array<[string, string]>; compact?: boolean }) {
  return (
    <div className="rounded-lg border border-border bg-card p-3">
      <div className="mb-2 flex items-center gap-2">
        <FileSignature className="h-3.5 w-3.5 shrink-0 text-primary" />
        <p className="truncate text-xs font-semibold">Agreement summary</p>
      </div>
      <dl className={cn("space-y-1.5", compact ? "text-[11px]" : "text-[11px] sm:text-xs")}>
        {items.map(([label, value]) => (
          <div key={label} className="flex items-start justify-between gap-3">
            <dt className="text-muted-foreground">{label}</dt>
            <dd className="text-right font-medium">{value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

export function EscrowStatusCard({ amount, label, note }: { amount: string; label: string; note: string }) {
  return (
    <div className="rounded-lg border border-accent/20 bg-accent/10 p-3 text-accent shadow-soft">
      <div className="flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-start gap-2">
          <Lock className="h-3.5 w-3.5 shrink-0 text-accent" />
          <p className="text-xs font-semibold leading-snug text-accent">{label}</p>
        </div>
        <span className="shrink-0 rounded-full bg-accent px-2 py-0.5 text-[10px] font-semibold text-accent-foreground">{amount}</span>
      </div>
      <p className="mt-2 text-[11px] leading-relaxed text-accent/70">{note}</p>
    </div>
  );
}
