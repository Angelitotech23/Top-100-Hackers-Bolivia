export function HeroRidges() {
  return (
    <div
      className="ridge-art pointer-events-none absolute inset-x-0 bottom-0 h-[42vh] overflow-hidden opacity-80"
      aria-hidden
    >
      <svg
        viewBox="0 0 1440 420"
        className="absolute bottom-0 h-full w-full"
        preserveAspectRatio="none"
      >
        <path
          d="M0 280 L180 200 L320 260 L480 140 L640 230 L820 110 L980 210 L1140 150 L1300 220 L1440 170 L1440 420 L0 420 Z"
          fill="#0f2236"
        />
        <path
          d="M0 320 L220 250 L400 300 L560 210 L760 280 L940 190 L1120 260 L1280 220 L1440 270 L1440 420 L0 420 Z"
          fill="#122a40"
        />
        <path
          d="M0 360 L260 300 L480 340 L700 270 L920 330 L1140 290 L1440 340 L1440 420 L0 420 Z"
          fill="#163247"
        />
        <path
          d="M0 280 L180 200 L320 260 L480 140 L640 230"
          fill="none"
          stroke="#d4a84b"
          strokeWidth="1.2"
          opacity="0.45"
        />
        <path
          d="M820 110 L980 210 L1140 150 L1300 220"
          fill="none"
          stroke="#d4a84b"
          strokeWidth="1"
          opacity="0.3"
        />
      </svg>
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[var(--night-deep)] to-transparent" />
    </div>
  );
}
