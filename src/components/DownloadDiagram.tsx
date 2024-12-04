import {
  getNodesBounds,
  getViewportForBounds,
  Panel,
  useReactFlow,
} from "@xyflow/react";
import { toPng } from "html-to-image";

function downloadDiagram(dataUrl: string) {
  const a = document.createElement("a");

  a.setAttribute("download", "Diagram.png");
  a.setAttribute("href", dataUrl);
  a.click();
}
const imageWidth = 1024;
const imageHeight = 768;

function DownloadButton() {
  const { getNodes } = useReactFlow();
  const onClick = () => {
    const nodeBounds = getNodesBounds(getNodes());
    const viewport = getViewportForBounds(
      nodeBounds,
      imageWidth,
      imageHeight,
      0.5,
      2,
      0
    );

    const element = document.querySelector('.react-flow__viewport') as HTMLElement | null;
    if (element) {
      toPng(element, {
        backgroundColor: "#1a365d",
        width: imageWidth,
        height: imageHeight,
        style: {
          width: imageWidth.toString(),
          height: imageHeight.toString(),
          transform: `translate(${viewport.x}px, ${viewport.y}px) scale(${viewport.zoom})`,
        },
      }).then(downloadDiagram);
    } else {
      console.error('Element not found');
    }
  };

  return (
    <Panel position="top-right">
      <button
        className="w-fit h-fit p-2 bg-purple-400 rounded-xl hover:bg-purple-500 hover:text-white transition-colors"
        onClick={onClick}
      >
        Download Diagram
      </button>
    </Panel>
  );
}

export default DownloadButton;
