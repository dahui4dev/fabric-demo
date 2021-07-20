import { DrawingEditor } from "./models/DrawingEditor";

export interface IDesignerProps {
  engine: DrawingEditor;
}

export interface IDesignerContext {
  engine: DrawingEditor;
}

export type IEngineProps<T = Event> = {};
