import { KeyIcon } from "../assets/icons/KeyIcon";

interface SidebarProps {
    onDragStart: (event: React.DragEvent, nodeType: string) => void;
    onClean: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ onDragStart, onClean }) => {
    return (
        <div className="bg-slate-500 w-1/6 py-6">
          <div className="flex border-t-1 border-slate-600 justify-center py-6" >
              <table className="w-5/6 h-28 bg-white rounded-lg select-none" onDragStart={(event) => onDragStart(event, 'default')} draggable>
                <thead>
                  <tr>
                    <th className="p-4 font-medium bg-slate-300 rounded-t-lg" colSpan={2}>table_name</th>
                  </tr>
                </thead>
                <tbody  className="h-12">
                  <tr>
                    <td className="w-6 items-center justify-center px-1">
                        <KeyIcon className="w-5 fill-yellow-400"/>
                    </td>
                    <td className="text-start px-2">column_name</td>
                  </tr>
                </tbody>
              </table>
          </div>
          <div className="flex border-t-1 border-slate-600 justify-center py-6">
            <section className="absolute bottom-10">
                <button 
                className="bg-purple-400 p-3 rounded-lg hover:bg-purple-500 hover:text-white"
                onClick={() => onClean()}>
                    Limpiar 🧹
                </button>
            </section>
          </div>
        </div>
    )
}