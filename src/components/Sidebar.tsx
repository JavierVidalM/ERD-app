import { KeyIcon } from "../assets/icons/KeyIcon";

interface SidebarProps {
  onDragStart: (event: React.DragEvent, nodeType: string) => void;
  onClean: () => void;
  onDownload: () => void;
}


export const Sidebar: React.FC<SidebarProps> = ({ onDragStart, onClean, onDownload }) => {
  const menubar = "flex p-2 text-white border-b-1 border-slate-600 select-none";
  const menuItem = "relative mr-4 cursor-pointer group select-none";
  const menuItemSpan = "hover:text-purple-400 select-none";
  const submenu = "hidden absolute bg-slate-400 text-white list-none w-max m-0 rounded-4px shadow-md w-max group-hover:block select-none";
  const submenuItem = "py-2 pl-2 pr-8 hover:text-purple-400 hover:bg-slate-600 select-none";
  const separator = <li className={"w-full h-px bg-slate-500"} />;

  return (
    <div className="bg-slate-500 w-1/6">

      {/* 
      
      MENUBAR START
      
      */}

      <div className={menubar}>
        <div className={menuItem}>
          <span className={menuItemSpan}>File</span>
          <ul className={submenu}>
            <li className={submenuItem} >New</li>
            <li className={submenuItem}>Open</li>
            <li className={submenuItem}>Save</li>
            {separator}
            <li className={submenuItem} onClick={() => onDownload()}>Export Diagram</li>
          </ul>
        </div>
        <div className={menuItem}>
        <span className={menuItemSpan}>Edit</span>
          <ul className={submenu}>
            <li className={submenuItem}>Undo</li>
            <li className={submenuItem}>Redo</li>
            <li className={submenuItem}>Copy</li>
            <li className={submenuItem}>Paste</li>
          </ul>
        </div>
        <div className={menuItem}>
        <span className={menuItemSpan}>View</span>
        <ul className={submenu}>
          <li className={submenuItem}>Zoom In</li>
          <li className={submenuItem}>Zoom Out</li>
          <li className={submenuItem}>Fit to Screen</li>
          <li className={submenuItem}>Full Screen</li>
        </ul>
        </div>
      </div>

      {/* 
      
      MENUBAR END
      
      */}
      
      <div className="flex justify-center py-6">
        <table
          className="w-5/6 h-28 bg-white rounded-lg select-none"
          onDragStart={(event) => onDragStart(event, "default")}
          draggable
        >
          <thead>
            <tr>
              <th
                className="p-4 font-medium bg-slate-300 rounded-t-lg"
                colSpan={2}
              >
                table_name
              </th>
            </tr>
          </thead>
          <tbody className="h-12">
            <tr>
              <td className="w-6 items-center justify-center px-1">
                <KeyIcon className="w-5 fill-yellow-400" />
              </td>
              <td className="text-start px-2">column_name</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="flex border-t-1 border-slate-600 justify-center py-6">
        <section className="absolute bottom-10">
          <button
          title="Limpiar"
            className="bg-purple-400 py-3 px-6 mx-1 rounded-lg hover:bg-purple-500 hover:text-white"
            onClick={() => onClean()}
          >
            🧹
          </button>
          <button
          title="Descargar Diagrama"
            className="bg-purple-400 py-3 px-6 mx-1 rounded-lg hover:bg-purple-500 hover:text-white"
            onClick={() => onDownload()}
          >
            💾
          </button>
        </section>
      </div>
    </div>
  );
};
