import { fabric } from "fabric";
import { DrawingMode } from "../models/DrawingMode";
import { IObjectDrawer } from "./IObjectDrawer";

export class TextDrawer implements IObjectDrawer {
  drawingMode: DrawingMode = DrawingMode.Text;

  make(
    x: number,
    y: number,
    options: fabric.IObjectOptions
  ): Promise<fabric.Object> {
    return new Promise<fabric.Object>((resolve) => {
      resolve(
        new fabric.Textbox("请输入文本...", {
          left: x,
          top: y,
          ...options,
        })
      );
    });
  }

  resize(object: fabric.Text, x: number, y: number): Promise<fabric.Object> {
    object
      .set({
        left: x,
        top: y,
      })
      .setCoords();

    return new Promise<fabric.Object>((resolve) => {
      resolve(object);
    });
  }
}
