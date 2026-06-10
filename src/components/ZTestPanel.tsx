import { TailType } from "../types";
import { useZTest } from "../hooks/useZTest";

const TAIL_OPTIONS: { value: TailType; label: string }[] = [
  { value: "two", label: "Two-tailed" },
  { value: "left", label: "Left-tailed" },
  { value: "right", label: "Right-tailed" },
];

export function ZTestPanel() {
  const { inputs, result, setInput } = useZTest();

  const standardError = inputs.populationStdDev / Math.sqrt(inputs.sampleSize);

  const effectSize =
    Math.abs(inputs.sampleMean - inputs.populationMean) /
    inputs.populationStdDev;

  return (
    <section>
      <h2>One-sample z-test</h2>
      <p className="subtitle">
        Test whether a sample mean differs significantly from a known population
        mean.
      </p>

      <div className="input-grid">
        <div className="input-group">
          <label htmlFor="sample-mean">Sample mean x̄</label>
          <input
            id="sample-mean"
            type="number"
            value={inputs.sampleMean}
            onChange={(event) =>
              setInput("sampleMean", Number(event.target.value))
            }
          />
        </div>

        <div className="input-group">
          <label htmlFor="sample-size">Sample size n</label>
          <input
            id="sample-size"
            type="number"
            min={2}
            value={inputs.sampleSize}
            onChange={(event) =>
              setInput("sampleSize", Math.max(2, Number(event.target.value)))
            }
          />
        </div>

        <div className="input-group">
          <label htmlFor="population-mean">Population mean μ₀</label>
          <input
            id="population-mean"
            type="number"
            value={inputs.populationMean}
            onChange={(event) =>
              setInput("populationMean", Number(event.target.value))
            }
          />
        </div>

        <div className="input-group">
          <label htmlFor="population-std-dev">Population std dev σ</label>
          <input
            id="population-std-dev"
            type="number"
            min={0.01}
            step={0.1}
            value={inputs.populationStdDev}
            onChange={(event) =>
              setInput(
                "populationStdDev",
                Math.max(0.01, Number(event.target.value))
              )
            }
          />
        </div>

        <div className="input-group">
          <label htmlFor="tail-select">Tail type</label>
          <select
            id="tail-select"
            value={inputs.tail}
            onChange={(event) =>
              setInput("tail", event.target.value as TailType)
            }
          >
            {TAIL_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="input-group">
          <label htmlFor="alpha-select">Significance level α</label>
          <select
            id="alpha-select"
            value={inputs.alpha}
            onChange={(event) => setInput("alpha", Number(event.target.value))}
          >
            <option value={0.01}>0.01</option>
            <option value={0.05}>0.05</option>
            <option value={0.1}>0.10</option>
          </select>
        </div>
      </div>

      <div
        className={`result-banner ${
          result.significant ? "significant" : "not-significant"
        }`}
      >
        <span className="result-verdict">
          {result.significant ? "Reject H₀" : "Fail to reject H₀"}
        </span>

        <span className="result-note">
          {result.significant
            ? `p = ${result.pValue.toFixed(4)} < α = ${inputs.alpha}`
            : `p = ${result.pValue.toFixed(4)} ≥ α = ${inputs.alpha}`}
        </span>
      </div>

      <div className="stat-grid">
        <div className="stat-card">
          <span className="stat-label">z-score</span>
          <span className="stat-value">{result.zScore.toFixed(3)}</span>
        </div>

        <div className="stat-card">
          <span className="stat-label">p-value</span>
          <span className="stat-value">{result.pValue.toFixed(4)}</span>
        </div>

        <div className="stat-card">
          <span className="stat-label">Standard error</span>
          <span className="stat-value">{standardError.toFixed(3)}</span>
        </div>

        <div className="stat-card">
          <span className="stat-label">Effect size d</span>
          <span className="stat-value">{effectSize.toFixed(3)}</span>
        </div>
      </div>
    </section>
  );
}
