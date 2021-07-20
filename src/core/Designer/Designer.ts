import { DrawingEditor } from "../models/DrawingEditor";

export const createDesigner = (props: any = {}) => {
  return new DrawingEditor({
    ...props,
  });
};
