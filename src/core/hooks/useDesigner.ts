import { useContext, useMemo } from "react";
import { Engine } from "../models/Engine";

import { DesignerContext } from "../context";
import { isFn } from "../utils";

export interface IEffects {
  (engine: Engine): void;
}

export const useDesigner = (effect?: IEffects): Engine => {
  const designer: Engine =
    window["__WB_ENGINE__"] || useContext(DesignerContext)?.engine;

  useMemo(() => {
    if (isFn(effect)) {
      effect(designer);
    }
  }, []);

  return designer;
};
