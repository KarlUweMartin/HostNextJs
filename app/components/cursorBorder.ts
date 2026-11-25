import type { PointerEvent } from "react";

export const cursorBorderHandlers = {
  onPointerMove(event: PointerEvent<HTMLElement>) {
    if (event.pointerType === "touch") return;

    const card = event.currentTarget;
    const { left, top } = card.getBoundingClientRect();
    card.style.setProperty("--border-x", `${event.clientX - left}px`);
    card.style.setProperty("--border-y", `${event.clientY - top}px`);
    card.style.setProperty("--border-highlight-opacity", "1");
  },
  onPointerLeave(event: PointerEvent<HTMLElement>) {
    event.currentTarget.style.removeProperty("--border-highlight-opacity");
  },
};

export const cursorBorderSx = {
  position: "relative",
  "&::after": {
    content: '""',
    position: "absolute",
    inset: 0,
    zIndex: 1,
    pointerEvents: "none",
    borderRadius: "inherit",
    border: "1px solid rgba(84, 153, 221, 0.22)",
  },
  "@supports (mask-composite: exclude)": {
    "&::before": {
      content: '""',
      position: "absolute",
      inset: 0,
      zIndex: 1,
      pointerEvents: "none",
      borderRadius: "inherit",
      padding: "1px",
      background: "radial-gradient(250px circle at var(--border-x, 50%) var(--border-y, 50%), rgba(128, 198, 255, 0.85), transparent)",
      mask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
      maskComposite: "exclude",
      opacity: "var(--border-highlight-opacity, 0)",
      "@media (prefers-reduced-motion: no-preference)": {
        transition: "opacity 160ms ease-out",
      },
    },
  },
};
