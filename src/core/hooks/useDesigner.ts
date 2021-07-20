import { useContext, useMemo } from "react";
import { DrawingEditor } from "../models/DrawingEditor";

import { DesignerContext } from "../context";
import { isFn } from "../utils";

export interface IEffects {
  (engine: DrawingEditor): void;
}

export const useDesigner = (effect?: IEffects): DrawingEditor => {
  const designer: DrawingEditor =
    window["__WB_ENGINE__"] || useContext(DesignerContext)?.engine;

  useMemo(() => {
    if (isFn(effect)) {
      effect(designer);
    }
  }, []);

  return designer;
};
