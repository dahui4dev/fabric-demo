import React, { ReactNode } from "react";

export function UsersList(props: { children?: ReactNode }) {
  return (
    <div className="users-list">
      <div>小红</div>
      <div>小明</div>
      <div>小王</div>
    </div>
  );
}
