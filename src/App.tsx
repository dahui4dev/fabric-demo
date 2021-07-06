import React, { useEffect, useMemo } from "react";
import "./style.css";

import { Designer } from "./components/Designer/Designer";
import { MainPanel } from "./components/MainPanel/MainPanel";
import { Workspace } from "./components/Workspace/Workspace";
import { WorkspacePanel } from "./components/WorkspacePanel/WorkspacePanel";
import { ToolbarPanel } from "./components/ToolbarPanel/ToolbarPanel";
import { UsersPanel } from "./components/UsersPanel/UsersPanel";
import { ViewportPanel } from "./components/ViewportPanel/ViewportPanel";
import { ZoomPanel } from "./components/ZoomPanel/ZoomPanel";
import { UsersList } from "./components/UsersList/UsersList";
import { ShareWidget } from "./components/ShareWidget/ShareWidget";
import { MoreActionWidget } from "./components/MoreActionWidget/MoreActionWidget";
import { ZoomWidget } from "./components/ZoomWidget/ZoomWidget";
import { ToolbarWidget } from "./components/ToolbarWidget/ToolbarWidget";
import { Viewport } from "./components/Viewport/Viewport";
import { TitleWidget } from "./components/TitleWidget/TitleWidget";
import { HistoryWidget } from "./components/HistoryWidget/HistoryWidget";
import { BackActionWidget } from "./components/BackActionWidget/BackActionWidget";
import { ProjectPanel } from "./components/ProjectPanel/ProjectPanel";
import { HelpWidget } from "./components/HelpWidget/ZoomWidget";

import { createDesigner } from "./core/Designer/Designer";
import { fabric } from "fabric";

function App() {
  // const engine = useMemo(() => createDesigner(), []);

  return (
    // <Designer engine={engine}>
    <Designer>
      <MainPanel>
        <Workspace>
          <WorkspacePanel>
            <ProjectPanel>
              <BackActionWidget />
              <TitleWidget />
              <HistoryWidget />
            </ProjectPanel>
            <UsersPanel>
              <UsersList />
              <ShareWidget />
              <MoreActionWidget />
            </UsersPanel>
            <ToolbarPanel>
              <ToolbarWidget />
            </ToolbarPanel>
            <ViewportPanel>
              <Viewport />
            </ViewportPanel>
            <ZoomPanel>
              <HelpWidget />
              <ZoomWidget />
            </ZoomPanel>
          </WorkspacePanel>
        </Workspace>
      </MainPanel>
    </Designer>
  );
}

export default App;
