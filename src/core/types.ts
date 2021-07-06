import { Engine } from "./models/Engine";

export interface IDesignerProps {
  engine: Engine;
}

export interface IDesignerContext {
  engine: Engine;
}

export type IEngineProps<T = Event> = {};
