import React, { useEffect, useMemo, useRef, useState } from "react";
import { useDesigner } from "../../core/hooks/useDesigner";
import { fabric } from "fabric";
import { IDesignerProps } from "../../core/types";
import { Engine } from "../../core/models/Engine";
import _ from "lodash";

const baseNum = 100;
const setLeft = (multiple: number) => {
  return baseNum + multiple * 200;
};
const setTop = (multiple: number) => {
  return multiple * 200;
};

export const Viewport: React.FC<IDesignerProps> = (props) => {
  // const engine = useDesigner();

  useEffect(() => {
    const engine = new Engine({});

    console.log("-----------26---------", engine);

    window["__WB_ENGINE__"] = engine;

    const { canvas, miniMap } = engine;

    console.log("-----------32---------", canvas);

    // 矩形
    let rect = new fabric.Rect({
      left: setLeft(1),
      top: setTop(1),
      fill: "red",
      width: 120,
      height: 120,
    });

    // 矩形
    let rect1 = new fabric.Rect({
      left: setLeft(2),
      top: setTop(1),
      fill: "red",
      width: 100,
      height: 100,
      angle: 45,
    });
    // 矩形
    let rect2 = new fabric.Rect({
      left: setLeft(3),
      top: setTop(1),
      fill: "red",
      width: 120,
      height: 120,
      skewX: -15,
    });
    // 矩形
    let rect3 = new fabric.Rect({
      left: setLeft(4),
      top: setTop(1),
      fill: "red",
      width: 120,
      height: 120,
      rx: 20,
      ry: 20,
    });
    // 矩形
    let rect4 = new fabric.Rect({
      left: setLeft(5),
      top: setTop(1),
      fill: "red",
      width: 120,
      height: 120,
      stroke: "blue",
      strokeWidth: 5,
      // strokeDashOffset: 20,
      rx: 20,
      ry: 20,
    });

    let shadow = new fabric.Shadow({
      color: "rgba(0,0,0,0.2)",
      affectStroke: true,
      offsetX: 10,
      offsetY: 10,
    });
    // 矩形
    let rect5 = new fabric.Rect({
      left: setLeft(6),
      top: setTop(1),
      fill: "red",
      width: 120,
      height: 120,
      // angle: 45,
      // stroke: "blue",
      // strokeWidth: 10,
      // strokeDashOffset: 20,
      // skewX: -30,
      shadow: shadow,
      rx: 20,
      ry: 20,
    });

    // 圆
    let circle = new fabric.Circle({
      left: setLeft(1),
      top: setTop(2),
      radius: 60,
      width: 120,
      height: 120,
      fill: "#B4EB41",
    });

    // 椭圆
    let ellipse = new fabric.Ellipse({
      left: setLeft(2),
      top: setTop(2),
      width: 120,
      height: 120,
      fill: "#B4EB41",
      rx: 80,
      ry: 50,
    });

    // 椭圆
    let ellipse1 = new fabric.Ellipse({
      left: setLeft(3),
      top: setTop(2),
      width: 120,
      height: 120,
      fill: "#B4EB41",
      stroke: "blue",
      strokeWidth: 2,
      strokeLineCap: "butt", // "round", "square",
      strokeDashArray: [10, 5],
      rx: 80,
      ry: 50,
    });

    // 椭圆
    let ellipse2 = new fabric.Ellipse({
      left: setLeft(4),
      top: setTop(2),
      width: 120,
      height: 120,
      fill: "#B4EB41",
      shadow: shadow,
      rx: 80,
      ry: 50,
    });

    let circle_ = new fabric.Circle({
      radius: 100,
      fill: "#eef",
      scaleY: 0.5,
      originX: "center",
      originY: "center",
    });

    let text_ = new fabric.Textbox("来个文字组合，哎呀超了，那就再来几个看看", {
      // left: setLeft(5),
      // top: setTop(3),
      fontSize: 20,
      padding: 20,
      // width: 50,
      width: 120,
      minWidth: 100,
      dynamicMinWidth: 100,
      // selectionBackgroundColor: "yellow",
      // textBackgroundColor: "green",
      // backgroundColor: "red",
      // fill: "white",
      splitByGrapheme: true,
    });

    let group_ = new fabric.Group([circle_, text_], {
      left: setLeft(5),
      top: setTop(2),
      // angle: -10
    });

    // 三角形
    let triangle = new fabric.Triangle({
      left: setLeft(1),
      top: setTop(3),
      width: 120,
      height: 120,
      fill: "#41A3EB",
      perPixelTargetFind: false,
    });

    // 三角形
    let triangle1 = new fabric.Triangle({
      left: setLeft(2),
      top: setTop(3),
      width: 120,
      height: 120,
      fill: "#41A3EB",
      shadow: shadow,
      perPixelTargetFind: false,
    });

    // 三角形
    let triangle2 = new fabric.Triangle({
      left: setLeft(3),
      top: setTop(3),
      width: 120,
      height: 120,
      fill: "#41A3EB",
      stroke: "blue",
      strokeWidth: 2,
      strokeLineCap: "butt", // "round", "square",
      strokeDashArray: [10, 5],
      perPixelTargetFind: false,
    });

    let line1 = new fabric.Polyline(
      [
        { x: 10, y: 150 },
        { x: 140, y: 150 },
      ],
      {
        stroke: "#98d727",
        strokeWidth: 2,
        left: setLeft(1),
        top: setTop(4),
      }
    );

    let line2 = new fabric.Polyline(
      [
        { x: 150, y: 10 },
        { x: 150, y: 140 },
      ],
      {
        stroke: "blue",
        strokeWidth: 2,
        left: setLeft(2),
        top: setTop(4),
      }
    );
    let line3 = new fabric.Polyline(
      [
        { x: 10, y: 10 },
        { x: 130, y: 150 },
      ],
      {
        stroke: "blue",
        strokeDashArray: [10, 5, 2, 5],
        strokeWidth: 2,
        left: setLeft(3),
        top: setTop(4),
      }
    );

    // 多边形
    let poly = new fabric.Polyline(
      [
        { x: 30, y: 0 },
        { x: 100, y: 0 },
        { x: 100, y: 20 },
        { x: 77, y: 20 },
        { x: 77, y: 105 },
        { x: 60, y: 120 },
        { x: 40, y: 120 },
        { x: 30, y: 90 },
        { x: 55, y: 100 },
        { x: 55, y: 20 },
        { x: 20, y: 20 },
      ],
      {
        left: setLeft(1),
        top: setTop(5),
        stroke: "red",
        fill: "red",
      }
    );
    // 多边形
    let poly1 = new fabric.Polyline(
      [
        { x: 40, y: 0 },
        { x: 60, y: 0 },
        { x: 100, y: 0 },
        { x: 110, y: 5 },
        { x: 120, y: 15 },
        { x: 130, y: 30 },

        { x: 130, y: 90 },
        { x: 120, y: 105 },
        { x: 110, y: 115 },
        { x: 100, y: 120 },
        { x: 100, y: 120 },

        { x: 60, y: 120 },
        { x: 60, y: 100 },
        { x: 96, y: 100 },

        { x: 105, y: 90 },
        { x: 110, y: 80 },
        { x: 110, y: 40 },

        { x: 96, y: 20 },

        { x: 60, y: 20 },
        { x: 60, y: 120 },

        { x: 40, y: 120 },
      ],
      {
        left: setLeft(2),
        top: setTop(5),
        fill: "red",
        stroke: "red",
      }
    );

    // 文本框
    let italicText = new fabric.Textbox("斜体", {
      left: setLeft(1),
      top: setTop(6),
      fontStyle: "italic",
    });

    // 其他字体
    let anotherItalicText = new fabric.Textbox("描边宽度", {
      left: setLeft(1),
      top: setTop(6.5),
      stroke: "#ff1318",
      fontSize: 50,
      strokeWidth: 2,
      textBackgroundColor: "blue",
    });

    let underlineText = new fabric.Textbox("下划线", {
      left: setLeft(1),
      top: setTop(7),
      underline: true,
      isWrapping: true,
      minWidth: 50,
    });
    let strokeThroughText = new fabric.Textbox("删除线", {
      left: setLeft(1),
      top: setTop(7.5),
      linethrough: true,
    });
    let overlineText = new fabric.Textbox("上划线", {
      left: setLeft(1),
      top: setTop(8),
      overline: true,
    });

    let shadowText1 = new fabric.Textbox("阴影", {
      left: setLeft(1),
      top: setTop(8.5),
      shadow: "rgba(0,0,0,0.3) 5px 5px 5px",
    });
    let shadowText2 = new fabric.Textbox("另一种阴影", {
      left: setLeft(1),
      top: setTop(9),
      shadow: "rgba(0,0,0,0.2) 0 0 5px",
    });
    let shadowText3 = new fabric.Textbox("还是阴影", {
      left: setLeft(1),
      top: setTop(9.5),
      shadow: "green -5px -5px 3px",
    });
    let shadowText4 = new fabric.Textbox(
      "这是个超长文本。文字白色，背景红色，文字背景绿色，选中背景黄色，",
      {
        left: setLeft(1),
        top: setTop(10.5),
        // isWrapping: true,
        // editable: true,
        width: 300,
        minWidth: 100,
        dynamicMinWidth: 100,
        selectionBackgroundColor: "yellow",
        textBackgroundColor: "green",
        backgroundColor: "red",
        padding: 20,
        fill: "white",
        splitByGrapheme: true,
      }
    );
    // let temp = shadowText4._wrapText(["5", "5", "9"], 40);
    // let temp = shadowText4._splitTextIntoLines(
    //   "这是 一个超长的看看能不嗯自己换行，要不然这也太扯了。"
    // );
    // shadowText4.set("text", temp);

    // add all to canvas
    canvas.add(
      rect,
      rect1,
      rect2,
      rect3,
      rect4,
      rect5,
      circle,
      ellipse,
      ellipse1,
      ellipse2,
      group_,
      triangle,
      triangle1,
      triangle2,
      line1,
      line2,
      line3,
      poly,
      poly1,
      italicText,
      anotherItalicText,
      underlineText,
      strokeThroughText,
      overlineText,
      shadowText1,
      shadowText2,
      shadowText3,
      shadowText4
    );

    initMinimap();
    updateMiniMapVP();

    function createCanvasEl() {
      let designSize = { width: window.innerWidth, height: window.innerHeight };
      let originalVPT = canvas.viewportTransform;
      // zoom to fit the canvas in the display canvas
      let designRatio = fabric.util.findScaleToFit(designSize, canvas);

      // zoom to fit the display the canvas in the miniMap.
      let minimapRatio = fabric.util.findScaleToFit(canvas, miniMap);

      let scaling = miniMap.getRetinaScaling();

      let finalWidth = designSize.width * designRatio;
      let finalHeight = designSize.height * designRatio;

      canvas.viewportTransform = [
        designRatio,
        0,
        0,
        designRatio,
        (canvas.getWidth() - finalWidth) / 2,
        (canvas.getHeight() - finalHeight) / 2,
      ];
      let canvasEle = canvas.toCanvasElement(minimapRatio * scaling);
      canvas.viewportTransform = originalVPT;
      return canvasEle;
    }

    function updateMiniMap() {
      let canvasEle = createCanvasEl();
      miniMap.backgroundImage._element = canvasEle;
      miniMap.requestRenderAll();
    }

    function updateMiniMapVP() {
      let designSize = { width: window.innerWidth, height: window.innerHeight };
      let rect = miniMap.getObjects()[0];
      let designRatio = fabric.util.findScaleToFit(designSize, canvas);
      let totalRatio = fabric.util.findScaleToFit(designSize, miniMap);
      let finalRatio = designRatio / canvas.getZoom();
      rect.scaleX = finalRatio;
      rect.scaleY = finalRatio;
      rect.top =
        miniMap.backgroundImage.top -
        (canvas.viewportTransform[5] * totalRatio) / canvas.getZoom();
      rect.left =
        miniMap.backgroundImage.left -
        (canvas.viewportTransform[4] * totalRatio) / canvas.getZoom();
      miniMap.requestRenderAll();
    }

    function initMinimap() {
      let canvasEle = createCanvasEl();
      let backgroundImage = new fabric.Image(canvasEle);
      backgroundImage.scaleX = 1 / canvas.getRetinaScaling();
      backgroundImage.scaleY = 1 / canvas.getRetinaScaling();
      miniMap.centerObject(backgroundImage);
      miniMap.backgroundColor = "white";
      miniMap.backgroundImage = backgroundImage;
      miniMap.requestRenderAll();
      let minimapView = new fabric.Rect({
        top: backgroundImage.top,
        left: backgroundImage.left,
        width: backgroundImage.width / canvas.getRetinaScaling(),
        height: backgroundImage.height / canvas.getRetinaScaling(),
        fill: "rgba(0, 0, 255, 0.3)",
        cornerSize: 6,
        transparentCorners: false,
        strokeWidth: 0,
      });
      minimapView.controls = {
        br: fabric.Object.prototype.controls.br,
      };
      miniMap.add(minimapView);
    }

    let debouncedMiniMap = _.debounce(updateMiniMap, 250);

    canvas.on("object:modified", function (opt) {
      console.log("-------object:modified----504---------", opt);

      updateMiniMap();
    });

    /* --------缩放-------------------------------------------------------------------- */

    // hook up the pan and zoom
    canvas.on("mouse:wheel", function (opt) {
      let delta = opt.e.deltaY;
      let zoom = canvas.getZoom();
      zoom *= 0.999 ** delta;
      if (zoom > 20) zoom = 20;
      if (zoom < 0.01) zoom = 0.01;
      this.setZoom(zoom);
      updateMiniMapVP();
      opt.e.preventDefault();
      opt.e.stopPropagation();
    });
    canvas.on("mouse:down", function (opt) {
      let evt = opt.e;
      if (evt.altKey === true) {
        this.isDragging = true;
        this.selection = false;
        this.lastPosX = evt.clientX;
        this.lastPosY = evt.clientY;
      }
    });
    canvas.on("mouse:move", function (opt) {
      if (this.isDragging) {
        let e = opt.e;
        let vpt = this.viewportTransform;
        vpt[4] += e.clientX - this.lastPosX;
        vpt[5] += e.clientY - this.lastPosY;
        this.requestRenderAll();
        updateMiniMapVP();
        this.lastPosX = e.clientX;
        this.lastPosY = e.clientY;
      }
    });
    canvas.on("mouse:up", function (opt) {
      this.isDragging = false;
      this.selection = true;
    });

    canvas.renderAll();
  }, []);

  return (
    <>
      <canvas id="c" key="c" />
      <canvas id="minimap" key="minimap" />
    </>
  );
};