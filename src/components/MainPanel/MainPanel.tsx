import React, { ReactNode } from "react";

export function MainPanel(props: { children: ReactNode }) {
  return <div className="main-panel">{props.children}</div>;
}
