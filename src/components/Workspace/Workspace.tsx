import React, { ReactNode } from "react";

export function Workspace(props: { children: ReactNode }) {
  return <div className="workspace">{props.children}</div>;
}
