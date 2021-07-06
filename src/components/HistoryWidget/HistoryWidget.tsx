import React, { ReactNode } from "react";

export function HistoryWidget(props: { children?: ReactNode }) {
  return (
    <div className="history-widget wb-btn">
      <div>undo</div>
      <div>|</div>
      <div>redo</div>
      <div
        onClick={() => {
          window["__WB_ENGINE__"].canvas.clear();
        }}
      >
        clear
      </div>
    </div>
  );
}
