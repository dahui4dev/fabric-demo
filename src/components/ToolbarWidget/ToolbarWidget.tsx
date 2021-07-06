// @ts-nocheck
import React, { ReactNode, useEffect, useState } from "react";
import { fabric } from "fabric";

export function ToolbarWidget(props: { children?: ReactNode }) {
  const [activeKey, setActiveKey] = useState(0);
  const [pinning, setPinning] = useState(false);
  const [visible, setVisible] = useState(true);

  const renderContent = () => {
    const clickTool = (type: string, e) => {
      const engine = window["__WB_ENGINE__"];
      const vpt = engine.canvas.viewportTransform.concat();
      const fd = fabric.util.qrDecompose(vpt);

      console.log("---clickTool--------13------", type, e);
      setActiveKey(type);

      switch (type) {
        case "指针":
          // engine.canvas.selection = true;
          engine.canvas.isDrawingMode = false;
          break;
        case "文本":
          // 设置新建元件对象：Textbox
          let rect = new fabric.Textbox("请输入文字", {
            left: e.clientX + 200,
            top: e.clientY,
            width: 100 * fd.scaleX,
            height: 100 * fd.scaleY,
            fill: "red",
          });

          fabric.util.removeTransformFromObject(rect, vpt);
          engine.canvas.add(rect);

          break;
        case "便签":
          // 设置新建元件对象：Textbox

          let 便签 = new fabric.Textbox("请输入文字", {
            left: e.clientX + 300,
            top: e.clientY,
            width: 100 * fd.scaleX,
            height: 100 * fd.scaleY,
            minWidth: 100 * fd.scaleY,
            dynamicMinWidth: 100 * fd.scaleY,
            selectionBackgroundColor: "yellow",
            textBackgroundColor: "green",
            backgroundColor: "red",
            padding: 20 * fd.scaleY,
            fill: "white",
            splitByGrapheme: true,
          });

          fabric.util.removeTransformFromObject(便签, vpt);
          engine.canvas.add(便签);

          break;
        case "图形":
          const rectTu = new fabric.Rect({
            left: e.clientX + 400,
            top: e.clientY,
            fill: "blue",
            width: 120 * fd.scaleY,
            height: 120 * fd.scaleY,
            rx: 20 * fd.scaleY,
            ry: 20 * fd.scaleY,
          });

          fabric.util.removeTransformFromObject(rectTu, vpt);
          engine.canvas.add(rectTu);

          break;
        case "连线":
          let line1 = new fabric.Polyline(
            [
              { x: 10, y: 250 },
              { x: 240, y: 250 },
            ],
            {
              stroke: "#98d727",
              strokeWidth: 3,
              left: e.clientX + 400,
              top: e.clientY,
            }
          );
          engine.canvas.add(line1);
          break;
        case "画笔":
          engine.canvas.isDrawingMode = true;
          break;
        case "上传":
          break;
        case "模板":
          break;
        case "表格":
          break;
        case "脑图":
          break;
        case "画板":
          break;
        default:
      }
    };

    return (
      <>
        <div
          key="指针"
          className={`toolbar-widget-btn wb-btn ${
            activeKey === "指针" && "tool-active-btn"
          }`}
          onClick={clickTool.bind(this, "指针")}
        >
          指针
        </div>
        <div
          key="文本"
          className={`toolbar-widget-btn wb-btn ${
            activeKey === "文本" && "tool-active-btn"
          }`}
          onClick={clickTool.bind(this, "文本")}
        >
          文本
        </div>
        <div
          key="便签"
          className={`toolbar-widget-btn wb-btn ${
            activeKey === "便签" && "tool-active-btn"
          }`}
          onClick={clickTool.bind(this, "便签")}
        >
          便签
        </div>
        <div
          key="图形"
          className={`toolbar-widget-btn wb-btn ${
            activeKey === "图形" && "tool-active-btn"
          }`}
          onClick={clickTool.bind(this, "图形")}
        >
          图形
        </div>
        <div
          key="连线"
          className={`toolbar-widget-btn wb-btn ${
            activeKey === "连线" && "tool-active-btn"
          }`}
          onClick={clickTool.bind(this, "连线")}
        >
          连线
        </div>
        <div
          key="画笔"
          className={`toolbar-widget-btn wb-btn ${
            activeKey === "画笔" && "tool-active-btn"
          }`}
          onClick={clickTool.bind(this, "画笔")}
        >
          画笔
        </div>
        <div
          key="上传"
          className={`toolbar-widget-btn wb-btn ${
            activeKey === "上传" && "tool-active-btn"
          }`}
          onClick={clickTool.bind(this, "上传")}
        >
          上传
        </div>
        <div
          key="模板"
          className={`toolbar-widget-btn wb-btn ${
            activeKey === "模板" && "tool-active-btn"
          }`}
          onClick={clickTool.bind(this, "模板")}
        >
          模板
        </div>
        <div
          key="表格"
          className={`toolbar-widget-btn wb-btn ${
            activeKey === "表格" && "tool-active-btn"
          }`}
          onClick={clickTool.bind(this, "表格")}
        >
          表格
        </div>
        <div
          key="脑图"
          className={`toolbar-widget-btn wb-btn ${
            activeKey === "脑图" && "tool-active-btn"
          }`}
          onClick={clickTool.bind(this, "脑图")}
        >
          脑图
        </div>
        <div
          key="画板"
          className={`toolbar-widget-btn wb-btn ${
            activeKey === "画板" && "tool-active-btn"
          }`}
          onClick={clickTool.bind(this, "画板")}
        >
          画板
        </div>
      </>
    );
  };

  return <div className="toolbar-widget">{renderContent()}</div>;
}
