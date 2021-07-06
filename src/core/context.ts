import { createContext } from "react";
import { IDesignerContext } from "./types";

export const DesignerContext = createContext<IDesignerContext>(null);
