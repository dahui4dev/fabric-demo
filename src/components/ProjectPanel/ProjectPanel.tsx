import React, { ReactNode } from "react";

export function ProjectPanel(props: { children: ReactNode }) {
  return <div className="project-panel">{props.children}</div>;
}
