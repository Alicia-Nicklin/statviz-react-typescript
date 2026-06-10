import { useMemo, useState } from "react";
import { DataPoint, NormalParams } from "../types";
import { generateCurvePoints } from "../utils/stats";

interface UseDistributionReturn {
  params: NormalParams;
  setMean: (mean: number) => void;
  setStdDev: (stdDev: number) => void;
  curvePoints: DataPoint[];
}

export function useDistribution(initialParams: NormalParams): UseDistributionReturn {
  const [params, setParams] = useState<NormalParams>(initialParams);

  const curvePoints = useMemo(
    () => generateCurvePoints(params.mean, params.stdDev),
    [params.mean, params.stdDev]
  );

  function setMean(mean: number) {
    setParams((currentParams) => ({
      ...currentParams,
      mean,
    }));
  }

  function setStdDev(stdDev: number) {
    setParams((currentParams) => ({
      ...currentParams,
      stdDev,
    }));
  }

  return {
    params,
    setMean,
    setStdDev,
    curvePoints,
  };
}
