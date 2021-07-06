import React, { ReactNode } from "react";
export function ZoomPanel(props: { children: ReactNode }) {
  return <div className="zoom-panel">{props.children}</div>;
}
