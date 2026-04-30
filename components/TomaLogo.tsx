interface TomaLogoProps {
  size?: number;
  className?: string;
}

export function TomaLogoMark({ size = 64, className = "" }: TomaLogoProps) {
  const r = size * 0.08;
  const cx = size / 2;
  const topY = size * 0.22;
  const dotY = size * 0.07;
  const botY = size * 0.82;
  const leftX = size * 0.18;
  const rightX = size * 0.82;

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      fill="none"
      className={className}
    >
      {/* Triangle lines */}
      <line x1={cx} y1={topY} x2={leftX} y2={botY} stroke="white" strokeWidth={size * 0.045} strokeLinecap="round" />
      <line x1={cx} y1={topY} x2={rightX} y2={botY} stroke="white" strokeWidth={size * 0.045} strokeLinecap="round" />
      <line x1={leftX} y1={botY} x2={rightX} y2={botY} stroke="white" strokeWidth={size * 0.045} strokeLinecap="round" />
      {/* Small top dot */}
      <circle cx={cx} cy={dotY} r={r * 0.7} fill="white" />
      {/* Top main circle */}
      <circle cx={cx} cy={topY} r={r} fill="white" />
      {/* Bottom left circle */}
      <circle cx={leftX} cy={botY} r={r} fill="white" />
      {/* Bottom right circle */}
      <circle cx={rightX} cy={botY} r={r} fill="white" />
    </svg>
  );
}
