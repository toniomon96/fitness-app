interface DataPoint {
  date: string;
  value: number;
}

interface MeasurementChartProps {
  data: DataPoint[];
  unit: string;
}

const W = 320;
const H = 140;
const PAD = { top: 10, right: 16, bottom: 28, left: 44 };

export default function MeasurementChart({ data, unit }: MeasurementChartProps) {
  if (data.length < 2) {
    return (
      <div className="flex items-center justify-center h-36 text-sm text-slate-400">
        Log {data.length === 0 ? '2' : 'one more'} entr{data.length === 0 ? 'ies' : 'y'} to see your trend
      </div>
    );
  }

  const values = data.map((d) => d.value);
  const minV = Math.min(...values);
  const maxV = Math.max(...values);
  const range = maxV - minV || 1;

  const chartW = W - PAD.left - PAD.right;
  const chartH = H - PAD.top - PAD.bottom;

  const toX = (i: number) => PAD.left + (i / (data.length - 1)) * chartW;
  const toY = (v: number) => PAD.top + chartH - ((v - minV) / range) * chartH;

  const points = data.map((d, i) => `${toX(i)},${toY(d.value)}`).join(' ');

  // Axis labels: first, middle, last date
  const labelIndices = [0, Math.floor((data.length - 1) / 2), data.length - 1];
  const dateLabel = (iso: string) => {
    const d = new Date(iso);
    return `${d.getMonth() + 1}/${d.getDate()}`;
  };

  // Y-axis labels: min & max
  const yLabels = [
    { v: maxV, y: toY(maxV) },
    { v: minV, y: toY(minV) },
  ];

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="w-full"
      style={{ maxHeight: H }}
      aria-label="Measurement trend chart"
    >
      {/* Y-axis labels */}
      {yLabels.map(({ v, y }) => (
        <text
          key={v}
          x={PAD.left - 6}
          y={y + 4}
          textAnchor="end"
          className="fill-slate-400 text-[10px]"
          fontSize={10}
        >
          {v % 1 === 0 ? v : v.toFixed(1)}{unit}
        </text>
      ))}

      {/* Horizontal grid */}
      {yLabels.map(({ v, y }) => (
        <line
          key={`grid-${v}`}
          x1={PAD.left}
          y1={y}
          x2={W - PAD.right}
          y2={y}
          stroke="currentColor"
          strokeOpacity={0.08}
          strokeWidth={1}
        />
      ))}

      {/* Polyline */}
      <polyline
        points={points}
        fill="none"
        stroke="var(--color-brand-500, #8b5cf6)"
        strokeWidth={2}
        strokeLinejoin="round"
        strokeLinecap="round"
      />

      {/* Data points */}
      {data.map((d, i) => (
        <circle
          key={i}
          cx={toX(i)}
          cy={toY(d.value)}
          r={3}
          fill="var(--color-brand-500, #8b5cf6)"
        />
      ))}

      {/* X-axis labels */}
      {labelIndices.map((i) => (
        <text
          key={i}
          x={toX(i)}
          y={H - 6}
          textAnchor="middle"
          className="fill-slate-400"
          fontSize={10}
        >
          {dateLabel(data[i].date)}
        </text>
      ))}
    </svg>
  );
}
