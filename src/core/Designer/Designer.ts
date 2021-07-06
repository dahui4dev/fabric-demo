import { Engine } from "../models/Engine";

export const createDesigner = (props: any = {}) => {
  return new Engine({
    ...props,
  });
};
