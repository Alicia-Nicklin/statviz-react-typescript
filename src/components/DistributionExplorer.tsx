import { BellCurve } from "./BellCurve";
import { useDistribution } from "../hooks/useDistribution";
import { standardNormalCDF } from "../utils/stats";

export function DistributionExplorer() {
  const { params, setMean, setStdDev, curvePoints } = useDistribution({
    mean: 0,
    stdDev: 1,
  });

  const withinOneSigma =
    (standardNormalCDF(1) - standardNormalCDF(-1)) * 100;

  const withinTwoSigma =
    (standardNormalCDF(2) - standardNormalCDF(-2)) * 100;

  return (
    <section>
      <h2>Distribution explorer</h2>
      <p className="subtitle">
        Adjust μ and σ to see how the normal distribution changes shape.
      </p>

      <BellCurve
        points={curvePoints}
        mean={params.mean}
        stdDev={params.stdDev}
      />

      <div className="controls">
        <div className="control-row">
          <label htmlFor="mean-slider">
            Mean μ <span className="value-badge">{params.mean}</span>
          </label>
          <input
            id="mean-slider"
            type="range"
            min={-5}
            max={5}
            step={0.5}
            value={params.mean}
            onChange={(event) => setMean(Number(event.target.value))}
          />
        </div>

        <div className="control-row">
          <label htmlFor="std-dev-slider">
            Standard deviation σ{" "}
            <span className="value-badge">{params.stdDev}</span>
          </label>
          <input
            id="std-dev-slider"
            type="range"
            min={0.5}
            max={3}
            step={0.5}
            value={params.stdDev}
            onChange={(event) => setStdDev(Number(event.target.value))}
          />
        </div>
      </div>

      <div className="stat-grid">
        <div className="stat-card">
          <span className="stat-label">Within ±1σ</span>
          <span className="stat-value">{withinOneSigma.toFixed(1)}%</span>
        </div>

        <div className="stat-card">
          <span className="stat-label">Within ±2σ</span>
          <span className="stat-value">{withinTwoSigma.toFixed(1)}%</span>
        </div>

        <div className="stat-card">
          <span className="stat-label">Mean</span>
          <span className="stat-value">{params.mean}</span>
        </div>

        <div className="stat-card">
          <span className="stat-label">Variance σ²</span>
          <span className="stat-value">{(params.stdDev ** 2).toFixed(2)}</span>
        </div>
      </div>
    </section>
  );
}
