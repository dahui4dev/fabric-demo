import { IEngineProps } from "../types";
import { Event, uid } from "../utils";
import { fabric } from "fabric";
import { IObjectDrawer } from "./IObjectDrawer";
import { LineDrawer } from "./LineDrawer";
import { DrawingMode } from "./DrawingMode";
import { CursorMode } from "./CursorMode";

const controlRender = (ctx, left, top, styleOverride, fabricObject) => {
  const l = fabric.util.toFixed(fabricObject.left, 1);
  const t = fabric.util.toFixed(fabricObject.top, 1);
  const width = fabric.util.toFixed(
    fabricObject.width * fabricObject.scaleX,
    1
  );
  const height = fabric.util.toFixed(
    fabricObject.height * fabricObject.scaleY,
    1
  );
  const fontSize = 18;

  ctx.save();
  ctx.translate(left, top);
  ctx.rotate(fabric.util.degreesToRadians(fabricObject.angle));

  ctx.font = `${fontSize}px serif`;
  ctx.fillText(`w=${width} h=${height}`, 10, 50);
  ctx.fillText(`l=${l} t=${t}`, 10, 50 + fontSize);

  ctx.restore();
};

export class Engine {
  id: string;

  canvas: fabric.Canvas;

  isDown: boolean;

  private cursorMode: CursorMode;
  private _drawer: IObjectDrawer;
  readonly drawerOptions: fabric.IObjectOptions;
  private readonly drawers: IObjectDrawer[];
  private object: fabric.Object;

  // props: IEngineProps<Engine>;
  // miniMap: any;

  constructor(props: IEngineProps<Engine>) {
    // super(props);

    // this.props = {
    //   ...Engine.defaultProps,
    //   ...props,
    // };
    this.id = uid();

    this.init();
    this.canvas = new fabric.Canvas("c", {
      containerClass: "design",
      width: window.innerWidth,
      height: window.innerHeight,
      stopContextMenu: true,
      selection: false,
    });

    // this.miniMap = this.getMiniMap();

    this.cursorMode = CursorMode.Draw;
    this.drawers = [new LineDrawer()];
    this._drawer = this.drawers[DrawingMode.Line];
    this.drawerOptions = {
      stroke: "black",
      strokeWidth: 1,
      selectable: true,
      strokeUniform: true,
    };
    this.isDown = false;

    this.initializeCanvasEvents();
  }

  init() {
    fabric.Object.prototype.originX = fabric.Object.prototype.originY =
      "center";
    fabric.Object.prototype.objectCaching = false;
    fabric.Object.prototype.cornerColor = "red";
    fabric.Group.prototype.subTargetCheck = true;

    fabric.Object.prototype.controls.customControl = new fabric.Control({
      x: -0.5,
      y: 0.5,
      cursorStyle: "pointer",
      render: controlRender,
    });
  }

  private initializeCanvasEvents() {
    this.canvas.on("selection:created", (o) => {
      console.log("--------selection:created---100---------", this.cursorMode);

      this.cursorMode = CursorMode.Select;
      //sets currently selected object
      this.object = o.target;
    });

    this.canvas.on("selection:updated", (o) => {
      console.log("--------selection:updated---100---------", this.cursorMode);
    });

    this.canvas.on("selection:cleared", (o) => {
      console.log("--------selection:cleared---100---------", this.cursorMode);
      this.cursorMode = CursorMode.Draw;
    });

    this.canvas.on("mouse:down", (o) => {
      const e = <MouseEvent>o.e;

      const pointer = this.canvas.getPointer(o.e);
      this.mouseDown(pointer.x, pointer.y);
    });

    this.canvas.on("mouse:move", (o) => {
      const pointer = this.canvas.getPointer(o.e);
      this.mouseMove(pointer.x, pointer.y);
    });

    this.canvas.on("mouse:up", (o) => {
      this.isDown = false;
    });
  }

  private async mouseDown(x: number, y: number): Promise<any> {
    this.isDown = true; //The mouse is being clicked

    if (this.cursorMode !== CursorMode.Draw) {
      return;
    }

    //Create an object at the point (x,y)
    this.object = await this.make(x, y);

    //Add the object to the canvas
    this.canvas.add(this.object);

    //Renders all objects to the canvas
    this.canvas.renderAll();
  }

  private mouseMove(x: number, y: number): any {
    console.log(
      "--------mouseMove---144---------",
      this.cursorMode.valueOf(),
      CursorMode.Draw.valueOf()
    );

    if (
      !(this.cursorMode.valueOf() === CursorMode.Draw.valueOf() && this.isDown)
    ) {
      return;
    }

    //Use the Resize method from the IObjectDrawer interface
    this._drawer.resize(this.object, x, y);
    this.canvas.renderAll();
  }

  private async make(x: number, y: number): Promise<fabric.Object> {
    return await this._drawer.make(x, y, this.drawerOptions);
  }

  // getMiniMap() {
  //   if (this.miniMap) {
  //     return this.miniMap;
  //   } else {
  //     return new fabric.Canvas("minimap", {
  //       containerClass: "minimap",
  //       selection: false,
  //     });
  //   }
  // }

  mount() {
    // this.attachEvents(window);
  }

  unmount() {
    // this.destroy();
  }
}
