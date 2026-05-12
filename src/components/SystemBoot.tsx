import { useEffect, useRef, useState } from "react";
import { useLanguage } from "../i18n/useLanguage";

type Props = {
  onComplete?: () => void;
};

export function SystemBoot({ onComplete }: Props) {
  const [phase, setPhase] = useState<"visible" | "fading" | "done">("visible");
  const { t } = useLanguage();
  const completedRef = useRef(false);

  useEffect(() => {
    const fadeTimer = window.setTimeout(() => setPhase("fading"), 1200);
    const doneTimer = window.setTimeout(() => {
      setPhase("done");
      if (!completedRef.current) {
        completedRef.current = true;
        onComplete?.();
      }
    }, 1540);

    return () => {
      window.clearTimeout(fadeTimer);
      window.clearTimeout(doneTimer);
    };
  }, [onComplete]);

  if (phase === "done") return null;

  return (
    <div
      aria-hidden="true"
      className={[
        "pointer-events-none fixed inset-0 z-[120] flex items-center justify-center",
        "bg-[#05060b]",
      ].join(" ")}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(168,85,247,0.22)_0,transparent_34%),radial-gradient(circle_at_82%_28%,rgba(0,255,224,0.12)_0,transparent_28%),radial-gradient(circle_at_50%_18%,rgba(18,10,32,0.9)_0,rgba(6,9,15,0.95)_42%,rgba(5,6,11,1)_74%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(168,85,247,.18)_1px,transparent_1px)] [background-size:100%_4px]" />

      <div
        className={[
          "relative w-[min(92vw,700px)] overflow-hidden rounded-[24px] border p-6 backdrop-blur-md",
          "transition-all duration-500",
          phase === "fading"
            ? "translate-y-2 scale-[0.985] opacity-0"
            : "opacity-100",
        ].join(" ")}
        style={{
          borderColor: "rgba(168,85,247,.22)",
          background:
            "linear-gradient(180deg, rgba(16,10,28,.82), rgba(8,10,18,.88))",
          boxShadow:
            "0 24px 80px rgba(0,0,0,.55), inset 0 1px 0 rgba(168,85,247,.18)",
        }}
      >
        <div
          className="pointer-events-none absolute left-0 top-0 h-px w-full"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(168,85,247,.58) 58%, transparent)",
          }}
        />

        <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.35em]">
          <span className="font-mono text-white/42">{t.boot.mission}</span>
          <span className="boot-blink">{t.boot.loading}</span>
        </div>

        <div
          className="mt-5 h-2 overflow-hidden border bg-black/25"
          style={{ borderColor: "rgba(168,85,247,.16)" }}
        >
          <div className="boot-progress h-full w-full bg-[linear-gradient(90deg,rgba(127,92,255,0.7)_0%,rgba(168,85,247,0.9)_45%,rgba(0,255,224,0.95)_100%)]" />
        </div>

        <div className="mt-5 grid gap-1 text-[11px] md:grid-cols-3">
          <span className="text-white/52">{t.boot.line1}</span>
          <span className="text-white/52">{t.boot.line2}</span>
          <span className="text-white/52">{t.boot.line3}</span>
        </div>

        <div className="mt-5 flex items-center gap-2 opacity-55">
          <span className="h-px flex-1 bg-white/10" />
          <span
            className="h-1 w-1 rounded-full"
            style={{ background: "var(--color-cyan-bright)" }}
          />
          <span
            className="h-px w-10"
            style={{ background: "rgba(168,85,247,.44)" }}
          />
        </div>
      </div>
    </div>
  );
}
