import { ToolBar } from "../toolbars/ToolBar";
import { fabric } from "fabric";

/**
 * 复合图形 基类
 * @type {klass}
 */
const AbstractShape = fabric.util.createClass(fabric.Group, {
  type: "AbstractShape",

  id: "",
  // 复合图形 name
  name: "",
  // 复合图形类型: rect circle triangle text line
  shapeType: "rect",
  // 复合图形内部元素
  groupItems: [],
  // 是否编辑态
  isEdit: false,

  // 端点连线
  lines: [],
  // 配置工具栏， 选中时展示 对应类型的 配置工具栏
  toolbar: null,

  initialize: function (whiteboard, options) {
    options || (options = {});

    this.wb = whiteboard;
    this.name = options.name || "";
    this.shapeType = options.shapeType || "rect";
    this.toolbar = new ToolBar({ type: this.shapeType });

    this.groupItems = options.items || this.initGroupItem(options);
    delete options.items;

    const groupDefault = {
      stroke: "blue",
      strokeWidth: 2,
      backgroundColor: "blue",
    };

    this.callSuper(
      "initialize",
      this.groupItems,
      Object.assign({}, groupDefault, options)
    );
  },

  /**
   * 默认复合图形组的子元素：包括 复合图形的：name、shapeType、shapeOpt
   * @return {*[]}
   */
  initGroupItem: function (options) {
    let items = [];

    // 背景图
    items[0] = new fabric.Rect({
      originX: "center",
      originY: "center",
      top: 0,
      left: 0,
      width: options.width || 300,
      height: options.height || 300,
      fill: "#f6f0c1",
    });

    // name，可显示隐藏, name 未设置直接隐藏
    items[1] = new fabric.IText(options.name || "####", {
      originX: "center",
      originY: "center",
      top: -(options.height / 2),
      // left: -(options.width / 2),
      left: 0,
      textAlign: "left",
      fontSize: 18,
      width: options.width || 300,
      height: 30,
      backgroundColor: "red",
      visible: !!options.name,
    });

    // 中心文字
    items[2] = new fabric.Textbox(
      "来个文字组合，哎呀超了，那就再来几个看看，来个文字组合，哎呀超了，那就再来几个看看来个文字组合，哎呀超了，那就再来几个看看",
      {
        originX: "center",
        originY: "center",
        top: 0,
        left: 0,
        width: options.width - 40 || 120 * 2 - 40,
        minWidth: options.width - 40 || 120,
        fontSize: 18,
        padding: 20,
        dynamicMinWidth: 120,
        // selectionBackgroundColor: "yellow",
        // textBackgroundColor: "green",
        // backgroundColor: "red",
        // fill: "white",
        splitByGrapheme: true,
      }
    );

    return items;
  },

  toObject: function () {
    return fabric.util.object.extend(this.callSuper("toObject"), {
      name: this.name,
    });
  },

  getName: function () {
    return this._objects[1].text;
  },

  setName: function (value) {
    this._objects[1].text = value;
  },

  getValue: function () {
    return this._objects[2].text;
  },

  setValue: function (value) {
    this._objects[2].set({ text: value });
    // this.wb.canvas.renderAll();
  },

  _render: function (ctx) {
    this.callSuper("_render", ctx);
    // console.log("--------_render---20---------", this);
    // let text = ctx.measureText(this.label);
    // ctx.width = this.width = text.width + 40;

    // ctx.font = "20px Helvetica";
    // ctx.fillStyle = "#333";
    // ctx.fillText(this.label, -this.width / 2, -this.height / 2 + 20);

    // fabric.Object.prototype.originX = fabric.Object.prototype.originY = "center";
  },
});
