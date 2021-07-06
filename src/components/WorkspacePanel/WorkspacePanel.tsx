import React, { ReactNode } from "react";

export function WorkspacePanel(props: { children: ReactNode }) {
  return <div className="workspace-panel">{props.children}</div>;
}
