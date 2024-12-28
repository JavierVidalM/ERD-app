/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  Background,
  BackgroundVariant,
  ConnectionLineType,
  Controls,
  MiniMap,
  ReactFlow,
  // ReactFlowInstance,
  ReactFlowProvider,
  reconnectEdge,
  useReactFlow,
} from "@xyflow/react";
import { useCallback, useState } from "react";
import About from "./AboutModal";
import { useDnD } from "./components/DragAndDropTable";
import Table from "./Table";
import { Sidebar } from "./components/Sidebar";
import { DownloadModal } from "./components/DownloadModal";
import { AlertDialog } from "./components/AlertDialog";

function App() {
  const [tables, setTables] = useState([]);
  const [relations, setRelations] = useState([]);
  const [isAboutClicked, setIsAboutClicked] = useState(false);
  const [isDownloadDiagramClicked, setIsDownloadDiagramClicked] = useState(false);
  const [diagramDimensions, setDiagramDimensions] = useState({width: 0, height: 0});
  const [error, setError] = useState<{ error: boolean; title: string, message: string }>({
    error: false,
    title: "",
    message: "",
  });
  // const [rfInstance, setRfInstance] = useState(null);

  const { screenToFlowPosition, getNodes, getNodesBounds, getViewport } =
    useReactFlow();

  const [type, setType] = useDnD();

  const onTablesChange = useCallback(
    (changes: any) => setTables((tbl) => applyNodeChanges(changes, tbl)),
    []
  );

  const onRelationChange = useCallback(
    (changes: any) => setRelations((rlt) => applyEdgeChanges(changes, rlt)),
    []
  );

  const onConnect = useCallback(
    (params: any) => setRelations((rlt) => addEdge(params, rlt) as never[]),
    []
  );

  const onReconnect = useCallback(
    (oldRelation: any, newRelation: any) =>
      setRelations(
        (rls) => reconnectEdge(oldRelation, newRelation, rls) as never[]
      ),
    []
  );

  const onDragStart = (event: React.DragEvent, nodeType: string) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
    setType(nodeType);
  };

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      const nodeType = event.dataTransfer.getData("application/reactflow");

      // posibility to add table types (premade tables or smt?)
      if (!nodeType || !type) {
        return;
      }

      const position = screenToFlowPosition({
        x: event.clientX - 115,
        y: event.clientY - 42,
      });

      const newTable = {
        id: `table-${tables.length}`,
        type: nodeType,
        data: {
          label: `table_${tables.length}`,
          columns: [
            {
              id: `column-0`,
              columnName: "id",
              isPrimaryKey: true,
              columnType: "varchar",
            },
          ],
        },
        position,
        style: {
          minWidth: 230,
          minHeight: 84,
          padding: 0,
          borderRadius: 8,
          borderWidth: 0,
        },
      };

      setTables((prevTables) => [...prevTables, newTable] as never);
      setType(null);
    },
    [type, tables, setType, screenToFlowPosition]
  );

  // onSave = useCallback(() => {
  //   if (rfInstance) {
  //     const flow = rfInstance.toObject();
  //     localStorage.setItem(flowKey, JSON.stringify(flow));
  //   }
  // }, [rfInstance]);

  // const removeTable = (index: number) => {
  //   const newTables = [...tables.slice(0, index), ...tables.slice(index+1)];
  //   setTables(newTables);
  // }

  const openAboutModal = () => {
    setIsAboutClicked(true);
  };

  const cleanTables = () => {
    setTables([]);
    setRelations([]);
  };

  const downloadDiagram = () => {
    const size = getNodesBounds(getNodes())
    console.log(size)
    if (tables.length === 0) {
      setError({
        error: true,
        title: "No tables",
        message:
          "No tables have been added to the diagram. Please add tables before downloading.",
      });
      return;
    }
    setDiagramDimensions({width: size.width, height: size.height});
    setIsDownloadDiagramClicked(true);
  };

  return (
    <div className="flex flex-col min-h-screen ">
      <main className="flex flex-grow justify-start bg-slate-300">
        {/* sidebar */}
        <Sidebar
          onDragStart={onDragStart}
          onClean={cleanTables}
          onDownload={downloadDiagram}
        />
        {/* <canvas className="w-full bg-pink-400 border-4 border-red-600"></canvas> */}
        <div className="w-full">
          <ReactFlow
            nodes={tables}
            onNodesChange={onTablesChange}
            edges={relations}
            onEdgesChange={onRelationChange}
            onConnect={onConnect}
            onReconnect={onReconnect}
            defaultEdgeOptions={{ type: "step" }}
            nodeTypes={{ default: Table }}
            connectionLineType={ConnectionLineType.Step}
            defaultMarkerColor="blue"
            onDrop={onDrop}
            onDragOver={onDragOver}
            // onInit={rfInstance}
          >
            <Background
              variant={BackgroundVariant.Lines}
              color="#4d4d67"
              bgColor="#2b2d47"
            />
            <MiniMap maskColor="#151626" bgColor="#2b2d47" pannable />
            <Controls position="bottom-left" />
          </ReactFlow>
        </div>
        <AlertDialog
          type="error"
          title={error.title}
          message={error.message}
          isOpen={error.error}
          onClose={() => setError({ error: false, title:"", message: "" })}
        />
        <About
          isOpen={isAboutClicked}
          onClose={() => setIsAboutClicked(false)}
        />
        <DownloadModal
          isOpen={isDownloadDiagramClicked}
          onClose={() => setIsDownloadDiagramClicked(false)}
          diagramWidth={diagramDimensions.width}
          diagramHeight={diagramDimensions.height}
          getViewport={getViewport}
        />
      </main>
      <footer className="flex w-screen justify-between bg-slate-900">
        <div className=" py-1 w-max">
          <a className="m-4 text-sm text-white">
            Created by{" "}
            <button className="text-purple-300 hover:text-purple-500 font-medium text-sm">
              javier.vidalm@outlook.com
            </button>
          </a>
        </div>
        <div className=" py-1 w-max">
          <a className="m-4">
            <button
              className="hover:text-purple-500 text-sm text-white"
              onClick={openAboutModal}
            >
              About
            </button>
          </a>
        </div>
      </footer>
    </div>
  );
}

function AppWithProvider() {
  return (
    <ReactFlowProvider>
      <App />
    </ReactFlowProvider>
  );
}

export default AppWithProvider;
