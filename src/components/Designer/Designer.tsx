import React, { useEffect } from "react";
import { DesignerContext } from "../../core/context";
import { IDesignerProps } from "../../core/types";
import { useDesigner } from "../../core/hooks/useDesigner";

// export const Designer: React.FC<IDesignerProps> = (props) => {
//   // export const Designer: React.FC = (props) => {
//
//   const engine = useDesigner();
//
//   useEffect(() => {
//     if (props.engine) {
//       props.engine.mount();
//     }
//     return () => {
//       if (props.engine) {
//         props.engine.unmount();
//       }
//     };
//   }, []);
//
//   console.log("--------Viewport---20---------", engine);
//
//   console.log("--------Viewport---28---------", props.engine);
//
//   if (engine) {
//     throw new Error(
//       "There can only be one Designable Engine Context in the React Tree"
//     );
//   }
//
//   return (
//     <div className="designer">
//       <DesignerContext.Provider
//         value={{
//           engine: props.engine,
//         }}
//       >
//         {props.children}
//       </DesignerContext.Provider>
//     </div>
//   );
// };

export const Designer: React.FC = (props) => {
  return <div className="designer">{props.children}</div>;
};
