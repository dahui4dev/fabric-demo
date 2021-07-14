import { IEngineProps } from "../types";
import { Event, uid } from "../utils";
import { fabric } from "fabric";

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

export class Engine extends Event {
  id: string;

  props: IEngineProps<Engine>;

  canvas: any;
  miniMap: any;

  constructor(props: IEngineProps<Engine>) {
    super(props);

    this.props = {
      ...Engine.defaultProps,
      ...props,
    };
    this.init();
    this.id = uid();
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

    this.canvas = this.getCanvas();
    this.miniMap = this.getMiniMap();

    console.log("--------init---31---------", this.canvas);
  }

  getCanvas() {
    if (this.canvas) {
      return this.canvas;
    } else {
      return new fabric.Canvas("c", {
        containerClass: "design",
        width: window.innerWidth,
        height: window.innerHeight,
        stopContextMenu: true,
      });
    }
  }

  getMiniMap() {
    if (this.miniMap) {
      return this.miniMap;
    } else {
      return new fabric.Canvas("minimap", {
        containerClass: "minimap",
        selection: false,
      });
    }
  }

  mount() {
    this.attachEvents(window);
  }

  unmount() {
    this.destroy();
  }

  static defaultProps: IEngineProps<Engine> = {
    width: window.innerWidth,
    height: window.innerHeight,
  };
}
