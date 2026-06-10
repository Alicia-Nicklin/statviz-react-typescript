export interface NormalParams {
  mean: number;
  stdDev: number;
}

export interface DataPoint {
  x: number;
  y: number;
}

export interface HypothesisTest {
  sampleMean: number;
  sampleSize: number;
  populationMean: number;
  populationStdDev: number;
  zScore: number;
  pValue: number;
  significant: boolean;
}

export type TailType = "two" | "left" | "right";
