import { DataPoint } from "../types";

interface BellCurveProps {
  points: DataPoint[];
  width?: number;
  height?: number;
  mean?: number;
  stdDev?: number;
}

interface SVGPoint {
  x: number;
  y: number;
}

function toSVGCoords(
  points: DataPoint[],
  width: number,
  height: number,
  padding: number
): SVGPoint[] {
  const xValues = points.map((point) => point.x);
  const yValues = points.map((point) => point.y);

  const xMin = Math.min(...xValues);
  const xMax = Math.max(...xValues);
  const yMax = Math.max(...yValues);

  const plotWidth = width - padding * 2;
  const plotHeight = height - padding * 2;

  return points.map((point) => ({
    x: padding + ((point.x - xMin) / (xMax - xMin)) * plotWidth,
    y: padding + plotHeight - (point.y / yMax) * plotHeight,
  }));
}

export function BellCurve({
  points,
  width = 560,
  height = 220,
  mean,
  stdDev,
}: BellCurveProps) {
  const padding = 32;
  const svgPoints = toSVGCoords(points, width, height, padding);

  const curveLine = svgPoints
    .map((point, index) => {
      const command = index === 0 ? "M" : "L";
      return `${command}${point.x.toFixed(1)},${point.y.toFixed(1)}`;
    })
    .join(" ");

  const filledArea =
    `${curveLine} ` +
    `L${svgPoints[svgPoints.length - 1].x},${height - padding} ` +
    `L${svgPoints[0].x},${height - padding} Z`;

  const xValues = points.map((point) => point.x);
  const xMin = Math.min(...xValues);
  const xMax = Math.max(...xValues);
  const plotWidth = width - padding * 2;
  const baselineY = height - padding;

  function xToSVG(x: number): number {
    return padding + ((x - xMin) / (xMax - xMin)) * plotWidth;
  }

  const meanX = mean !== undefined ? xToSVG(mean) : null;

  const sigmaLow =
    mean !== undefined && stdDev !== undefined ? xToSVG(mean - stdDev) : null;

  const sigmaHigh =
    mean !== undefined && stdDev !== undefined ? xToSVG(mean + stdDev) : null;

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      aria-label="Normal distribution bell curve"
      className="bell-curve"
    >
      <defs>
        <linearGradient id="curve-gradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7f77dd" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#7f77dd" stopOpacity="0.03" />
        </linearGradient>
      </defs>

      <path d={filledArea} fill="url(#curve-gradient)" />

      <path
        d={curveLine}
        fill="none"
        stroke="#7f77dd"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />

      <line
        x1={padding}
        y1={baselineY}
        x2={width - padding}
        y2={baselineY}
        stroke="#c7c4bc"
        strokeWidth="1"
      />

      {meanX !== null && (
        <line
          x1={meanX}
          y1={padding / 2}
          x2={meanX}
          y2={baselineY}
          stroke="#534ab7"
          strokeWidth="1.5"
          strokeDasharray="4 3"
        />
      )}

      {sigmaLow !== null && sigmaHigh !== null && (
        <>
          <line
            x1={sigmaLow}
            y1={baselineY - 6}
            x2={sigmaLow}
            y2={baselineY + 6}
            stroke="#9ca3af"
            strokeWidth="1"
          />
          <line
            x1={sigmaHigh}
            y1={baselineY - 6}
            x2={sigmaHigh}
            y2={baselineY + 6}
            stroke="#9ca3af"
            strokeWidth="1"
          />
          <text
            x={sigmaLow}
            y={baselineY + 20}
            textAnchor="middle"
            fontSize="11"
            fill="#6b7280"
          >
            −σ
          </text>
          <text
            x={sigmaHigh}
            y={baselineY + 20}
            textAnchor="middle"
            fontSize="11"
            fill="#6b7280"
          >
            +σ
          </text>
        </>
      )}

      {meanX !== null && mean !== undefined && (
        <text
          x={meanX}
          y={baselineY + 20}
          textAnchor="middle"
          fontSize="11"
          fill="#534ab7"
          fontWeight="600"
        >
          μ={mean}
        </text>
      )}
    </svg>
  );
}
