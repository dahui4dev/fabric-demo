import { DisplayComponent, DisplayComponentOptions } from "./DisplayComponent";
import { DrawingEditor } from "../models/DrawingEditor";
import { DrawingMode } from "../models/DrawingMode";

export class OvalDisplayComponent extends DisplayComponent {
  constructor(target: string, parent: DrawingEditor) {
    const options = new DisplayComponentOptions();
    Object.assign(options, {
      altText: "Oval",
      classNames: "fa fa-circle-o",
      childName: null,
    });

    super(DrawingMode.Oval, target, parent, options);
  }
}
