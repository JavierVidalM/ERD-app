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
  ReactFlowProvider,
  reconnectEdge,
  useReactFlow,
} from "@xyflow/react";
import { useCallback, useState } from "react";
import About from "./AboutModal";
import DownloadButton from "./components/DownloadDiagram";
import { useDnD } from "./components/DragAndDropTable";
import Table from "./Table";
import { Sidebar } from "./components/DiagramSideBar";

{
  /*
  
    TO DO


    - POSIBLY ADD THE COLUMN DATA TYPE
    - ADD FUNCTIONS TO COPY/PASTE TABLES
    - IMPLEMENT THE CONNECTIONS SYSTEM BETWEEN THE TABLES AND EACH COLUMN OF THE TABLE
    - ADD TYPES TO AVOID FUTURE PROBLEMS
    - Save the diagram localy and save the state of the canvas localy too to avoid lossing progress


    - THINK ABOUT WHAT THINGS ADD TO THE SIDE PANEL
      - BESIDES STYLES, FONTS, ETC

    - MAKE SCREENSHOTS
      - SCREENSHOTS BASED ON SELECTED ELEMENTS

    - POSSIBLY ADD TABS
      - *1-> Add a tab with info about the site and the canvas will have tables connected to each other showing some info to makeit more attractive

    - IMPROVE THE WRITED CODE, EVALUATE MOVE THINGS TO COMPONENTS, REFACTOR SOME CODE, ETC
    
    - Add funciton to hide the side panel
    - Move the side panel to a separate component



    M O V E   A L L   T H I S   C O M M E N T S   T O   A N O T H E R   P L A C E
    AND UPLOAD THE CODE TO GITHUB



  */
}

function App() {
  const [tables, setTables] = useState([]);
  const [relations, setRelations] = useState([]);
  const [isAboutClicked, setIsAboutClicked] = useState(false);
  const { screenToFlowPosition } = useReactFlow();
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
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
    setType(nodeType);
  }

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      const nodeType = event.dataTransfer.getData('application/reactflow');

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
              columnName: 'id',
              isPrimaryKey: true,
              columnType: "varchar",
            }
          ]
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
  }

  return (
    <div className="flex flex-col min-h-screen ">
      <main className="flex flex-grow justify-start bg-slate-300">
        {/* sidebar */}
        <Sidebar onDragStart={onDragStart} onClean={cleanTables}/>
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
          >
            <DownloadButton />
            <Background
              variant={BackgroundVariant.Lines}
              color="#4d4d67"
              bgColor="#2b2d47"
            />
            <MiniMap maskColor="#151626" bgColor="#2b2d47" pannable />
            <Controls position="bottom-left" />
          </ReactFlow>
        </div>
        <About
          isOpen={isAboutClicked}
          onClose={() => setIsAboutClicked(false)}
          
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
  )
}

export default AppWithProvider;
