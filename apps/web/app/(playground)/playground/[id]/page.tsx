import CodeEditorWindow from '@/app/_components/playground/CodeEditor';
import CustomFileTree from '@/app/_components/playground/FileTree/CustomFileTree';
import PlaygroundHeader from '@/app/_components/playground/PlaygroundHeader';
import CustomTerminal from '@/app/_components/playground/terminal/CustomTerminal';
import WebView from '@/app/_components/playground/webview/WebView';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable';

export default function PlaygroundPage() {
  return (
    <ResizablePanelGroup direction="vertical" className="">
      <ResizablePanel defaultSize={7}>
        <div>
          <PlaygroundHeader />
        </div>
      </ResizablePanel>
      <ResizablePanel defaultSize={93}>
        <ResizablePanelGroup direction="horizontal" className="">
          <ResizablePanel defaultSize={20}>
            <div className="h-full dark:bg-zinc-800 bg-secondary">
              <CustomFileTree />
            </div>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={60}>
            <ResizablePanelGroup direction="vertical">
              <ResizablePanel defaultSize={75}>
                <div className="h-full">
                  <CodeEditorWindow />
                </div>
              </ResizablePanel>
              <ResizableHandle withHandle />
              <ResizablePanel defaultSize={25}>
                <CustomTerminal />
              </ResizablePanel>
            </ResizablePanelGroup>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={20}>
            <div className="h-full">
              <WebView />
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
