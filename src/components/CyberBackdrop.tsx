"use client";

/**
 * Ambient cyberpunk backdrop: perspective grid, neon orbs and scanlines drawn
 * over the page with a screen blend so they never reduce text contrast.
 * Purely decorative - it stays hidden outside the cyber theme and never
 * intercepts pointer events.
 */
export default function CyberBackdrop() {
  return (
    <>
      <div className="cyber-vignette" aria-hidden="true" />
      <div className="cyber-backdrop" aria-hidden="true">
        <div className="cyber-grid" />
        <div
          className="cyber-orb"
          style={{
            width: "38vw",
            height: "38vw",
            top: "-10vw",
            left: "-8vw",
            background: "radial-gradient(circle, rgba(0,229,255,0.55), transparent 68%)",
          }}
        />
        <div
          className="cyber-orb"
          style={{
            width: "34vw",
            height: "34vw",
            bottom: "-12vw",
            right: "-8vw",
            background: "radial-gradient(circle, rgba(255,46,154,0.45), transparent 68%)",
            animationDelay: "-6s",
          }}
        />
        <div
          className="cyber-orb"
          style={{
            width: "26vw",
            height: "26vw",
            top: "38%",
            right: "22%",
            background: "radial-gradient(circle, rgba(177,76,255,0.35), transparent 70%)",
            animationDelay: "-3s",
          }}
        />
        <div className="cyber-scanlines" />
      </div>
    </>
  );
}
