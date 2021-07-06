import React, { ReactNode } from "react";
export function UsersPanel(props: { children: ReactNode }) {
  return <div className="users-panel">{props.children}</div>;
}
