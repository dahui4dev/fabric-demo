import { IObjectDrawer } from "./IObjectDrawer";
import { DrawingMode } from "../models/DrawingMode";
import { fabric } from "fabric";
import { Frame } from "../shapes/Frame";

export class FrameDrawer implements IObjectDrawer {
  private origX: number;
  private origY: number;

  drawingMode: DrawingMode = DrawingMode.Frame;

  make(
    x: number,
    y: number,
    options: fabric.IObjectOptions,
    width?: number,
    height?: number
  ): Promise<fabric.Object> {
    this.origX = x;
    this.origY = y;

    console.log("------FrameDrawer--make---22---------", this);

    return new Promise<fabric.Object>((resolve) => {
      resolve(
        new Frame({
          left: x,
          top: y,
          width: width,
          height: height,
          fill: "transparent",
          ...options,
        })
      );
    });
  }

  resize(object: fabric.Object, x: number, y: number): Promise<fabric.Object> {
    //Calculate size and orientation of resized rectangle
    object
      .set({
        originX: this.origX > x ? "right" : "left",
        originY: this.origY > y ? "bottom" : "top",
        width: Math.abs(this.origX - x),
        height: Math.abs(this.origY - y),
      })
      .setCoords();

    return new Promise<fabric.Object>((resolve) => {
      resolve(object);
    });
  }
}
