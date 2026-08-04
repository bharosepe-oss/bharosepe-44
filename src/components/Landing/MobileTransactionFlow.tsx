import { useEffect, useRef, useState, type CSSProperties } from "react";
import { useInView } from "framer-motion";
import { User, ShieldCheck, IndianRupee, CheckCircle2, Package, FileSignature } from "lucide-react";
import logo from "@/assets/LOGO.png";

type Step = 1 | 2 | 3 | 4 | 5;

const BRAND = "#6700B6";
const TOTAL_STAGES = 5;

const STAGE_TEXT: Record<Step, string> = {
  1: "Buyer and Seller create a secure escrow contract on Bharose Pe",
  2: "Buyer securely deposits funds into Bharose Pe's escrow vault",
  3: "Seller delivers the product or service directly to the buyer",
  4: "Buyer confirms receipt and satisfaction with the delivery",
  5: "Bharose Pe releases payment to seller",
};

function isActive(stage: Step, who: "buyer" | "seller" | "vault") {
  switch (stage) {
    case 1:
      return who === "buyer" || who === "seller" || who === "vault";
    case 2:
      return who === "buyer";
    case 3:
      return who === "seller";
    case 4:
      return who === "buyer";
    case 5:
      return who === "vault";
    default:
      return false;
  }
}

function glowStyle(active: boolean): CSSProperties {
  return {
    boxShadow: active ? "0 0 15px 8px rgba(103, 0, 182, 0.4)" : "0 0 0px 0px rgba(103, 0, 182, 0)",
    transition: "box-shadow 800ms ease, opacity 800ms ease",
    borderColor: BRAND,
    borderStyle: "solid",
    borderWidth: 2,
  };
}

const MobileTransactionFlow = () => {
  const [stage, setStage] = useState<Step>(1);
  const containerRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<number | null>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-20%" });

  useEffect(() => {
    if (!isInView) return;

    intervalRef.current = window.setInterval(() => setStage((current) => ((current % TOTAL_STAGES) + 1) as Step), 4000);
    return () => {
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isInView]);

  return (
    <div ref={containerRef} className="relative w-full bg-background py-10 px-4">
      <div className="mx-auto max-w-md space-y-6">
        <div className="relative mx-auto mb-8 flex h-[720px] max-w-md flex-col items-center px-4 pt-4">
          <div className="flex flex-col items-center">
            <div
              className="flex h-24 w-24 items-center justify-center rounded-full bg-white/80 shadow-lg"
              style={{
                ...glowStyle(isActive(stage, "buyer")),
                opacity: isActive(stage, "buyer") ? 1 : 0.6,
              }}
            >
              <User size={48} color={BRAND} strokeWidth={2} />
            </div>
            <span className="mt-4 text-lg font-medium" style={{ color: BRAND }}>
              Buyer
            </span>
            <div className="mt-2 flex flex-col items-center text-sm text-[#727272]">
              <div className="flex items-center">
                <IndianRupee size={18} className="mr-2" style={{ color: BRAND }} />
                <span>Pay securely</span>
              </div>
              <div className="mt-2 flex items-center">
                <ShieldCheck size={18} className="mr-2" style={{ color: BRAND }} />
                <span>Risk-free purchase</span>
              </div>
            </div>
          </div>

          <div className="relative z-10 mt-10">
            <div
              className="flex h-32 w-32 items-center justify-center rounded-full bg-white shadow-lg"
              style={{
                ...glowStyle(isActive(stage, "vault")),
                opacity: isActive(stage, "vault") ? 1 : 0.8,
              }}
            >
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white">
                <img src={logo} alt="Bharose Pe" className="h-16 w-16 object-contain" />
              </div>
            </div>
          </div>

          <div
            key={stage}
            className="pointer-events-none mt-6 min-h-[48px] px-4 text-center text-base font-medium"
            style={{ color: BRAND, animation: "tp-fade-in 500ms ease-out" }}
          >
            {STAGE_TEXT[stage]}
          </div>

          <div className="mt-2 flex items-center gap-2">
            {[1, 2, 3, 4, 5].map((s) => (
              <span
                key={s}
                className="rounded-full transition-all duration-500"
                style={{
                  backgroundColor: BRAND,
                  opacity: s === stage ? 1 : 0.25,
                  width: s === stage ? 22 : 8,
                  height: 8,
                }}
              />
            ))}
          </div>

          <div className="mt-8 flex flex-col items-center">
            <div
              className="flex h-24 w-24 items-center justify-center rounded-full bg-white/80 shadow-lg"
              style={{
                ...glowStyle(isActive(stage, "seller")),
                opacity: isActive(stage, "seller") ? 1 : 0.6,
              }}
            >
              <User size={48} color={BRAND} strokeWidth={2} />
            </div>
            <span className="mt-4 text-lg font-medium" style={{ color: BRAND }}>
              Seller
            </span>
            <div className="mt-2 flex flex-col items-center text-sm text-[#727272]">
              <div className="flex items-center">
                <CheckCircle2 size={18} className="mr-2" style={{ color: BRAND }} />
                <span>Assured payment</span>
              </div>
              <div className="mt-2 flex items-center">
                <Package size={18} className="mr-2" style={{ color: BRAND }} />
                <span>No more ghosting</span>
              </div>
            </div>
          </div>

          {stage === 1 && (
            <>
              <span className="tp-symbol tp-contract-buyer" style={{ color: BRAND }}>
                <FileSignature size={24} />
              </span>
              <span className="tp-symbol tp-contract-seller" style={{ color: BRAND }}>
                <FileSignature size={24} />
              </span>
            </>
          )}

          {stage === 2 &&
            [0, 1, 2].map((i) => (
              <span
                key={`r2-${i}`}
                className="tp-symbol tp-deposit"
                style={{ color: BRAND, animationDelay: `${i * 0.5}s` }}
              >
                <IndianRupee size={24} strokeWidth={2.5} />
              </span>
            ))}

          {stage === 3 &&
            [0, 1, 2].map((i) => (
              <span
                key={`p3-${i}`}
                className="tp-symbol tp-delivery"
                style={{ color: BRAND, animationDelay: `${i * 0.5}s` }}
              >
                <Package size={24} />
              </span>
            ))}

          {stage === 4 &&
            [0, 1].map((i) => (
              <span
                key={`c4-${i}`}
                className="tp-symbol tp-confirmation"
                style={{ color: BRAND, animationDelay: `${i * 0.5}s` }}
              >
                <CheckCircle2 size={28} />
              </span>
            ))}

          {stage === 5 &&
            [0, 1, 2].map((i) => (
              <span
                key={`r5-${i}`}
                className="tp-symbol tp-release"
                style={{ color: BRAND, animationDelay: `${i * 0.5}s` }}
              >
                <IndianRupee size={24} strokeWidth={2.5} />
              </span>
            ))}
        </div>
      </div>

      <style>{`
        .tp-symbol {
          pointer-events: none;
          position: absolute;
          z-index: 20;
          opacity: 0;
          animation-duration: 2s;
          animation-timing-function: ease-in-out;
          animation-fill-mode: both;
        }
        .tp-contract-buyer { animation-name: tp-contract-buyer; }
        .tp-contract-seller { animation-name: tp-contract-seller; }
        .tp-deposit { animation-name: tp-deposit; }
        .tp-delivery { animation-name: tp-delivery; }
        .tp-confirmation { animation-name: tp-confirmation; }
        .tp-release { animation-name: tp-release; }

        @keyframes tp-contract-buyer {
          0%   { left: 60%; top: 0%; opacity: 0; transform: scale(.8); }
          50%  { left: 78%; top: 26%; opacity: 1; transform: scale(1.2); }
          100% { left: 60%; top: 40%; opacity: 0; transform: scale(.8); }
        }
        @keyframes tp-contract-seller {
          0%   { left: 40%; top: 90%; opacity: 0; transform: scale(.8); }
          50%  { left: 10%; top: 62%; opacity: 1; transform: scale(1.2); }
          100% { left: 40%; top: 40%; opacity: 0; transform: scale(.8); }
        }
        @keyframes tp-deposit {
          0%   { left: 60%; top: 0%; opacity: 0; transform: scale(.8); }
          50%  { left: 78%; top: 26%; opacity: 1; transform: scale(1.2); }
          100% { left: 60%; top: 40%; opacity: 0; transform: scale(.8); }
        }
        @keyframes tp-delivery {
          0%   { left: 40%; top: 90%; opacity: 0; transform: scale(.8); }
          50%  { left: 10%; top: 35%; opacity: 1; transform: scale(1.2); }
          100% { left: 40%; top: 10%; opacity: 0; transform: scale(.8); }
        }
        @keyframes tp-confirmation {
          0%   { left: 60%; top: 0%;  opacity: 0; transform: scale(.8); }
          50%  { left: 78%; top: 26%; opacity: 1; transform: scale(1.2); }
          100% { left: 60%; top: 40%; opacity: 0; transform: scale(.8); }
        }
        @keyframes tp-release {
          0%   { left: 60%; top: 40%; opacity: 0; transform: scale(.8); }
          50%  { left: 78%; top: 62%; opacity: 1; transform: scale(1.2); }
          100% { left: 60%; top: 78%; opacity: 0; transform: scale(.8); }
        }
        @keyframes tp-fade-in {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default MobileTransactionFlow;
