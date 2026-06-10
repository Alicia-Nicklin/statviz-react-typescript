import { useMemo, useState } from "react";
import { HypothesisTest, TailType } from "../types";
import { runZTest } from "../utils/stats";

interface ZTestInputs {
  sampleMean: number;
  sampleSize: number;
  populationMean: number;
  populationStdDev: number;
  tail: TailType;
  alpha: number;
}

interface UseZTestReturn {
  inputs: ZTestInputs;
  result: HypothesisTest;
  setInput: <K extends keyof ZTestInputs>(
    key: K,
    value: ZTestInputs[K]
  ) => void;
}

const DEFAULT_INPUTS: ZTestInputs = {
  sampleMean: 102,
  sampleSize: 30,
  populationMean: 100,
  populationStdDev: 15,
  tail: "two",
  alpha: 0.05,
};

export function useZTest(): UseZTestReturn {
  const [inputs, setInputs] = useState<ZTestInputs>(DEFAULT_INPUTS);

  const result = useMemo(
    () =>
      runZTest(
        inputs.sampleMean,
        inputs.sampleSize,
        inputs.populationMean,
        inputs.populationStdDev,
        inputs.tail,
        inputs.alpha
      ),
    [inputs]
  );

  function setInput<K extends keyof ZTestInputs>(
    key: K,
    value: ZTestInputs[K]
  ) {
    setInputs((currentInputs) => ({
      ...currentInputs,
      [key]: value,
    }));
  }

  return {
    inputs,
    result,
    setInput,
  };
}
