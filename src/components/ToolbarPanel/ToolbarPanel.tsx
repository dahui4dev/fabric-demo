import React, { ReactNode } from "react";
export function ToolbarPanel(props: { children: ReactNode }) {
  return <div className="toolbar-panel">{props.children}</div>;
}
