import { fabric } from "fabric";
import _ from "lodash";

export const Frame = fabric.util.createClass(fabric.Group, {
  type: "frame",
  name: "",

  initialize: function (options) {
    options || (options = {});

    this.name = options.name || "Frame";

    const groupDefault = {
      stroke: "blue",
      strokeWidth: 2,
      backgroundColor: "blue",
      left: 100,
      top: 100,
    };

    this._objects = options.items || this.initGroupItem(options);

    this.callSuper(
      "initialize",
      this._objects,
      Object.assign({}, groupDefault, options),
      true
    );
  },

  initGroupItem: function (options) {
    let canvas = this.canvas;

    console.log("--------initGroupItem---30---------", this);

    let items = [];

    // 背景图
    const shadow = new fabric.Shadow({
      color: "rgba(0,0,0,0.2)",
      affectStroke: true,
      offsetX: 5,
      offsetY: 5,
    });

    items[0] = new fabric.Rect({
      top: options.y,
      left: options.x,
      width: options.width || 300,
      height: options.height || 600,

      fill: "white",
      stroke: "grey",
      strokeWidth: 2,
      shadow: shadow,
    });

    // name，可显示隐藏, name 未设置直接隐藏
    items[1] = new fabric.IText(options.name || "####", {
      originX: "center",
      originY: "center",
      top: options.y,
      left: options.x,
      textAlign: "left",
      fontSize: 18,
      width: options.width || 300,
      height: 30,
      backgroundColor: "red",
      visible: !!options.name,
    });

    // const that = this;

    // that.on("moving", updateMinions);
    // that.on("rotating", updateMinions);
    // // that.on("scaling", updateMinions)
    //
    // that.on("mouseover", calcTransformMatrix);
    // that.on("mouseout", calcTransformMatrix);
    //
    // let multiply = fabric.util.multiplyTransformMatrices;
    // let invert = fabric.util.invertTransform;
    //
    // function updateMinions() {
    //   console.log("--------updateMinions---93---------");
    //
    //   let intersectsObj = canvas
    //     .getObjects()
    //     .filter((o) => that.intersectsWithObject(o));
    //
    //   intersectsObj.forEach((o) => {
    //     if (!o.relationship) {
    //       return;
    //     }
    //
    //     let relationship = o.relationship;
    //     let newTransform = fabric.util.multiplyTransformMatrices(
    //       that.calcTransformMatrix(),
    //       relationship
    //     );
    //     let opt = fabric.util.qrDecompose(newTransform);
    //     o.set({
    //       flipX: false,
    //       flipY: false,
    //     });
    //     o.setPositionByOrigin(
    //       { x: opt.translateX, y: opt.translateY },
    //       "center",
    //       "center"
    //     );
    //     o.set(opt);
    //     o.setCoords();
    //   });
    // }
    //
    // function calcTransformMatrix() {
    //   // let minions = canvas
    //   //     .getObjects()
    //   //     .filter((o) => o === minion1 || o === minion2)
    //   // let bossTransform = boss.calcTransformMatrix()
    //   // let invertedBossTransform = invert(bossTransform)
    //   // minions.forEach((o) => {
    //   //     // save the desired relation here.
    //   //     o.relationship = multiply(
    //   //         invertedBossTransform,
    //   //         o.calcTransformMatrix()
    //   //     )
    //   // })
    //
    //   let minions = canvas
    //     .getObjects()
    //     .filter((o) => that.intersectsWithObject(o));
    //
    //   let bossTransform = that.calcTransformMatrix();
    //   let invertedBossTransform = fabric.util.invertTransform(bossTransform);
    //
    //   minions.forEach((o) => {
    //     // save the desired relation here.
    //     o.relationship = fabric.util.multiplyTransformMatrices(
    //       invertedBossTransform,
    //       o.calcTransformMatrix()
    //     );
    //   });
    // }

    if (canvas) {
      canvas.renderAll();
    }

    return items;
  },

  toObject: function () {
    return fabric.util.object.extend(this.callSuper("toObject"), {});
  },

  _render: function (ctx) {
    console.log("--------_render---20---------", ctx);
    this.callSuper("_render", ctx);
    // let text = ctx.measureText(this.label);
    // ctx.width = this.width = text.width + 40;

    // ctx.font = "20px Helvetica";
    // ctx.fillStyle = "#333";
    // ctx.fillText(this.label, -this.width / 2, -this.height / 2 + 20);

    // fabric.Object.prototype.originX = fabric.Object.prototype.originY = "center";
  },
});
