import { uid } from "../utils";
import { fabric } from "fabric";

import {
  FrameDrawer,
  IObjectDrawer,
  LineDrawer,
  OvalDrawer,
  RectangleDrawer,
  TextDrawer,
  TriangleDrawer,
} from "../drawers";

import { DrawingMode } from "./DrawingMode";
import { CursorMode } from "./CursorMode";
import { LineDisplayComponent } from "../components/LineDisplayComponent";
import { RectangleDisplayComponent } from "../components/RectangleDisplayComponent";
import { OvalDisplayComponent } from "../components/OvalDisplayComponent";
import { TriangleDisplayComponent } from "../components/TriangleDisplayComponent";
import { TextDisplayComponent } from "../components/TextDisplayComponent";
import { FrameDisplayComponent } from "../components/FrameDisplayComponent";

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

export class DrawingEditor {
  id: string;

  canvas: fabric.Canvas;

  isDown: boolean;

  private cursorMode: CursorMode;
  private _drawer: IObjectDrawer;
  readonly drawerOptions: fabric.IObjectOptions;
  private readonly drawers: IObjectDrawer[];
  private object: fabric.Object;
  private readonly components: Array<{ id: string; type: string }>;

  // props: IEngineProps<Engine>;
  // miniMap: any;

  constructor() {
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
      selection: false, // 选择模式 or 绘画模式
    });
    this.isDown = false;

    this.cursorMode = CursorMode.Draw;
    // 初始化 各种类型 画笔 对象，默认值可通过 options 传递。
    this.drawers = [
      new FrameDrawer(),
      new LineDrawer(),
      new RectangleDrawer(),
      new OvalDrawer(),
      new TriangleDrawer(),
      new TextDrawer(),
    ];
    this._drawer = this.drawers[DrawingMode.Line];
    this.drawerOptions = {
      stroke: "black",
      strokeWidth: 1,
      selectable: true,
      strokeUniform: true,
      fill: "red",
    };

    this.components = [];
    this.addComponents([
      { id: "frame", type: "frame" },
      { id: "line", type: "line" },
      { id: "rect", type: "rect" },
      { id: "oval", type: "oval" },
      { id: "tria", type: "tria" },
      { id: "text", type: "text" },
    ]);

    // this.miniMap = this.getMiniMap();
    this.initializeCanvasEvents();
  }

  get drawingMode() {
    return this._drawer.drawingMode;
  }

  set drawingMode(value: DrawingMode) {
    this._drawer = this.drawers[value];
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
      // 选择模式
      // console.log("--------selection:created---100---------", this.cursorMode);

      this.cursorMode = CursorMode.Select;
      //sets currently selected object
      this.object = o.target;
    });

    this.canvas.on("selection:updated", (o) => {
      console.log("--------selection:updated---100---------", this.cursorMode);
    });

    this.canvas.on("selection:cleared", (o) => {
      // console.log("--------selection:cleared---100---------", this.cursorMode);
      // this.cursorMode = CursorMode.Draw;
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
    // console.log(
    //   "--------mouseMove---144---------",
    //   this.cursorMode.valueOf(),
    //   CursorMode.Draw.valueOf()
    // );

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

  addComponents(componentList: Array<{ id: string; type: string }>) {
    componentList.forEach((item) => {
      this.addComponent(item.id, item.type);
    });
  }

  addComponent(target: string, component: string) {
    switch (component) {
      case "frame":
        this.components[component] = [new FrameDisplayComponent(target, this)];
        break;
      case "line":
        this.components[component] = [new LineDisplayComponent(target, this)];
        break;
      case "rect":
        this.components[component] = [
          new RectangleDisplayComponent(target, this),
        ];
        break;
      case "oval":
        this.components[component] = [new OvalDisplayComponent(target, this)];
        break;
      case "tria":
        this.components[component] = [
          new TriangleDisplayComponent(target, this),
        ];
        break;
      case "text":
        this.components[component] = [new TextDisplayComponent(target, this)];
        break;
    }
  }

  componentSelected(componentName: string) {
    console.log("--------componentSelected---202---------", componentName);

    //Deselect any objects on the canvas that are selected
    this.canvas.discardActiveObject();

    //FOREACH component in the drawing editor...
    for (let key in this.components) {
      // IF this component has a property with the passed-in name
      // THEN do nothing
      if (!this.components.hasOwnProperty(key)) continue;

      //OTHERWISE...
      const obj = this.components[key];

      //IF the component with the passed-in name
      //IS the component we expect
      if (obj[0].target === componentName) {
        //SET the drawing mode to the drawing mode
        //needed by the component
        this.drawingMode = obj[0].drawingMode;
      }

      //IF the method selectedChanged is defined on the component,
      //THEN call that method
      if (obj[0].selectedChanged !== undefined) {
        obj[0].selectedChanged(componentName);
      }
    }
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
