import { useEffect, useState } from "react";

const styles = `
  @keyframes stt-pop-in {
    from { opacity: 0; transform: translateY(16px) scale(0.8); }
    to   { opacity: 1; transform: translateY(0)   scale(1);   }
  }
  @keyframes stt-pop-out {
    from { opacity: 1; transform: translateY(0)   scale(1);   }
    to   { opacity: 0; transform: translateY(16px) scale(0.8); }
  }
  @keyframes stt-leaf-sway {
    0%, 100% { transform: rotate(-8deg); }
    50%       { transform: rotate(8deg);  }
  }

  .stt-btn {
    position: fixed;
    bottom: 130px;
    right: 27px;
    width: 55px;
    height: 55px;
    border-radius: 50%;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 999;
    background: #2d6a4f;
    box-shadow: 0 4px 20px rgba(45, 106, 79, 0.45);
    transition: background 0.2s ease, box-shadow 0.2s ease, transform 0.18s ease;
    pointer-events: none;
    opacity: 0;
  }
  .stt-btn.stt-visible {
    animation: stt-pop-in 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
    pointer-events: auto;
  }
  .stt-btn.stt-hidden {
    animation: stt-pop-out 0.22s ease forwards;
    pointer-events: none;
  }
  .stt-btn:hover {
    background: #1b4332;
    box-shadow: 0 6px 28px rgba(27, 67, 50, 0.55);
    transform: translateY(-3px);
  }
  .stt-btn:active {
    transform: translateY(0) scale(0.93);
    box-shadow: 0 2px 10px rgba(45, 106, 79, 0.35);
  }
  .stt-btn:focus-visible {
    outline: 3px solid #95d5b2;
    outline-offset: 3px;
  }
  .stt-btn svg {
    width: 22px;
    height: 22px;
    color: #d8f3dc;
    transition: transform 0.2s ease;
  }
  .stt-btn:hover svg {
    transform: translateY(-2px);
  }
  .stt-btn .stt-leaf {
    position: absolute;
    top: -6px;
    right: -4px;
    width: 16px;
    height: 16px;
    pointer-events: none;
    animation: stt-leaf-sway 3s ease-in-out infinite;
    transform-origin: bottom center;
  }
  .stt-tooltip {
    position: absolute;
    right: calc(100% + 10px);
    top: 50%;
    transform: translateY(-50%);
    background: #1b4332;
    color: #d8f3dc;
    font-size: 12px;
    font-weight: 500;
    letter-spacing: 0.04em;
    white-space: nowrap;
    padding: 5px 10px;
    border-radius: 6px;
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.15s ease;
    font-family: inherit;
  }
  .stt-tooltip::after {
    content: '';
    position: absolute;
    left: 100%;
    top: 50%;
    transform: translateY(-50%);
    border: 5px solid transparent;
    border-left-color: #1b4332;
  }
  .stt-btn:hover .stt-tooltip {
    opacity: 1;
  }
`;

function LeafIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="#52b788" xmlns="http://www.w3.org/2000/svg" className="stt-leaf">
      <path d="M21 3C21 3 13 3 8 8C3 13 4 20 4 20C4 20 11 21 16 16C21 11 21 3 21 3Z" />
      <path d="M4 20L10 14" stroke="#2d6a4f" strokeWidth="1.5" strokeLinecap="round" fill="none" />
    </svg>
  );
}

function ArrowUpIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="19" x2="12" y2="5" />
      <polyline points="5 12 12 5 19 12" />
    </svg>
  );
}

export default function ScrollToTop({ threshold = 300, tooltip = "Back to top" }) {
  const [state, setState] = useState("hidden"); // "hidden" | "visible" | "hiding"

  useEffect(() => {
    let prev = false;
    const onScroll = () => {
      const now = window.scrollY > threshold;
      if (now === prev) return;
      prev = now;
      setState(now ? "visible" : "hiding");
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  const handleAnimationEnd = () => {
    if (state === "hiding") setState("hidden");
  };

  const scrollUp = () => window.scrollTo({ top: 0, behavior: "smooth" });

  if (state === "hidden") return null;

  return (
    <>
      <style>{styles}</style>
      <button
        className={`stt-btn ${state === "visible" ? "stt-visible" : "stt-hidden"}`}
        onClick={scrollUp}
        onAnimationEnd={handleAnimationEnd}
        aria-label={tooltip}
      >
        <LeafIcon />
        <ArrowUpIcon />
        <span className="stt-tooltip">{tooltip}</span>
      </button>
    </>
  );
}
