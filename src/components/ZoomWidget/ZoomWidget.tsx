import React, { ReactNode } from "react";

export function ZoomWidget(props: { children?: ReactNode }) {
  return (
    <div className="zoom-widget">
      <div
        onClick={() => {
          const minimap = document.getElementsByClassName("minimap")[0];
          if (minimap.style.visibility === "hidden") {
            minimap.style.visibility = "visible";
          } else {
            minimap.style.visibility = "hidden";
          }
        }}
      >
        map
      </div>
      <div>
        <span>-</span>
        <span>100%</span>
        <span>+</span>
      </div>
      <div>full</div>
    </div>
  );
}
