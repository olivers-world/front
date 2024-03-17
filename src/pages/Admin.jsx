/* eslint-disable react/no-unescaped-entities */
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

const Admin = () => {
  return (
    <div className="absolute h-screen w-screen after:bg-black after:w-screen after:h-screen">
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel>One</ResizablePanel>
        <ResizableHandle />
        <ResizablePanel>Two</ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default Admin;
