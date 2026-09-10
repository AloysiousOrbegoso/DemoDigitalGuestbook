import type { ReactNode } from "react";

/** Device outline. The child is a live, fully interactive MobileShell, not a screenshot. */
export function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <div className="phone-frame">
      <div className="phone-frame__notch" aria-hidden="true" />
      <div className="phone-frame__screen">{children}</div>
    </div>
  );
}
