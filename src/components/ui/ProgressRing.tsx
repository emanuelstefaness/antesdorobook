type Props = { percent: number; size?: number; label?: string };

export function ProgressRing({ percent, size = 40, label }: Props) {
  const seguro = Math.min(Math.max(percent, 0), 100);
  const raio = (size - 6) / 2;
  const circunferencia = 2 * Math.PI * raio;
  const preenchido = circunferencia * (seguro / 100);

  return (
    <span className="relative inline-flex items-center justify-center">
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        role="img"
        aria-label={label ?? `${seguro}% da jornada concluída`}
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={raio}
          fill="none"
          stroke="rgba(11,31,58,0.12)"
          strokeWidth="3"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={raio}
          fill="none"
          stroke="#1FC4E6"
          strokeWidth="3"
          strokeLinecap="butt"
          strokeDasharray={`${preenchido} ${circunferencia}`}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </svg>
      <span aria-hidden className="absolute font-mono text-[9px] font-bold text-navy">
        {seguro}
      </span>
    </span>
  );
}
