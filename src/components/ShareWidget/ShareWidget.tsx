import React, { ReactNode } from "react";

export function ShareWidget(props: { children?: ReactNode }) {
  return (
    <div className="share-widget">
      <div className="share-widget-btn">分享</div>
    </div>
  );
}
