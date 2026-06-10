import { DataPoint, HypothesisTest, TailType } from "../types";

/**
 * Calculates the probability density for a normal distribution.
 */
export function normalPDF(x: number, mean: number, stdDev: number): number {
  if (stdDev <= 0) {
    throw new Error("Standard deviation must be greater than 0.");
  }

  const coefficient = 1 / (stdDev * Math.sqrt(2 * Math.PI));
  const exponent = -0.5 * Math.pow((x - mean) / stdDev, 2);

  return coefficient * Math.exp(exponent);
}

/**
 * Approximates the standard normal cumulative distribution function.
 *
 * This uses the Abramowitz and Stegun rational approximation, which is accurate
 * enough for this small educational visualisation.
 */
export function standardNormalCDF(z: number): number {
  if (z < -8) return 0;
  if (z > 8) return 1;

  const t = 1 / (1 + 0.2316419 * Math.abs(z));

  const polynomial =
    t *
    (0.31938153 +
      t *
        (-0.356563782 +
          t * (1.781477937 + t * (-1.821255978 + t * 1.330274429))));

  const pdf = Math.exp(-0.5 * z * z) / Math.sqrt(2 * Math.PI);
  const cdf = 1 - pdf * polynomial;

  return z >= 0 ? cdf : 1 - cdf;
}

export function pValueFromZ(zScore: number, tail: TailType): number {
  switch (tail) {
    case "two":
      return 2 * (1 - standardNormalCDF(Math.abs(zScore)));
    case "left":
      return standardNormalCDF(zScore);
    case "right":
      return 1 - standardNormalCDF(zScore);
  }
}

export function runZTest(
  sampleMean: number,
  sampleSize: number,
  populationMean: number,
  populationStdDev: number,
  tail: TailType,
  alpha = 0.05
): HypothesisTest {
  if (sampleSize <= 1) {
    throw new Error("Sample size must be greater than 1.");
  }

  if (populationStdDev <= 0) {
    throw new Error("Population standard deviation must be greater than 0.");
  }

  const standardError = populationStdDev / Math.sqrt(sampleSize);
  const zScore = (sampleMean - populationMean) / standardError;
  const pValue = pValueFromZ(zScore, tail);

  return {
    sampleMean,
    sampleSize,
    populationMean,
    populationStdDev,
    zScore,
    pValue,
    significant: pValue < alpha,
  };
}

/**
 * Generates points for plotting a normal distribution over ±4 standard deviations.
 */
export function generateCurvePoints(
  mean: number,
  stdDev: number,
  numPoints = 200
): DataPoint[] {
  const min = mean - 4 * stdDev;
  const max = mean + 4 * stdDev;
  const step = (max - min) / (numPoints - 1);

  return Array.from({ length: numPoints }, (_, index) => {
    const x = min + index * step;

    return {
      x,
      y: normalPDF(x, mean, stdDev),
    };
  });
}
