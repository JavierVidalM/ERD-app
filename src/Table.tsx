/* eslint-disable @typescript-eslint/no-explicit-any */
import { Handle, Position } from "@xyflow/react";
import { useEffect, useState } from "react";
import { KeyIcon } from "./assets/icons/KeyIcon";
import { tableColumns } from "./types/tableTypes";
import { namesFormatter } from "./utils/nameFormatter";
import { getRandomColor } from "./utils/tableStyler";

export default function Table({ data }: any) {
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [title, setTitle] = useState(data.label);
  const [columns, setColumns] = useState<tableColumns[]>(data.columns || []);
  const [isEditingColumn, setIsEditingColumn] = useState(false);
  const [color] = useState(() => getRandomColor());

  const columnTypes = [
    "varchar",
    "int",
    "text",
    "datetime",
    "boolean",
    "double",
  ];

  useEffect(() => {
    setColumns(data.columns || []);
  }, [data.columns]);

  const handleEditingTitle = () => {
    setIsEditingTitle(true);
  };

  const handleEditingColumn = () => {
    setIsEditingColumn(true);
  };

  const handleTitleChange = (event: any) => {
    // if (!event.target.value) setTitle(title);
    const newTitle = namesFormatter(event.target.value);
    // if (newTitle === "") {
    //   setTitle(data.label);
    // } else {
    setTitle(newTitle);
    // }
  };

  const handleColumnNameChange = (event: any, columnId: number) => {

    const inputValue = event.target.value;
    setColumns(
      columns.map((column) => {
        if (column.id === columnId) {
          return {
            ...column,
            columnName: inputValue ? namesFormatter(inputValue) : "",
          };
        }
        return column;
      })
    );
  };

  const handleBlur = () => {
    setIsEditingTitle(false);
    setIsEditingColumn(false);

    setColumns(columns.map(column => ({
      ...column, columnName: column.columnName.trim() === "" ? 'text' : column.columnName
    })));

    if (title.trim() === "") {
      setTitle(data.label);
    }
  };

  const handleEnterSave = (event: any) => {
    if (event.key === "Enter") {
      setIsEditingTitle(false);
      setIsEditingColumn(false);

      setColumns(columns.map(column => ({
        ...column, columnName: column.columnName.trim() === "" ? 'text' : column.columnName
      })));

      if (title.trim() === "") {
        setTitle(data.label);
      }
    }

  };

  const addColumn = () => {
    const newColumn: tableColumns = {
      id: columns.length,
      tableId: data.id,
      isPrimaryKey: false,
      isForeignKey: false,
      columnName: "text",
      columnType: "varchar",
    };

    setColumns([...columns, newColumn]);
  };

  const changeColumnKeyType = (columnId: number) => {
    setColumns((prevColumns) =>
      prevColumns.map((column) => {
        if (column.id === columnId) {
          if (!column.isPrimaryKey && !column.isForeignKey) {
            return { ...column, isPrimaryKey: true };
          }
          if (column.isPrimaryKey) {
            return { ...column, isPrimaryKey: false, isForeignKey: true };
          }
          return { ...column, isForeignKey: false };
        }
        return column;
      })
    );
  };

  return (
    <div className="w-full">
      <div
        onDoubleClick={handleEditingTitle}
        className={`flex px-5 py-3 ${color.bg} rounded-t-lg justify-between items-center relative`}
      >
        {isEditingTitle ? (
          <input
            type="text"
            value={title}
            onChange={handleTitleChange}
            onKeyDown={handleEnterSave}
            onBlur={handleBlur}
            className={`w-full border-transparent text-center focus-visible:outline-none font-medium text-base ${color.bg}`}
          />
        ) : (
          <div className="w-full font-medium text-base">{title}</div>
        )}
        <button className="absolute right-2 top-2 px-2 hover:bg-slate-900/50 hover:text-white rounded bg-slate-700/30 text-black font-bold">
          -
        </button>
      </div>
      <div className="">
        {columns?.map((column: tableColumns, index) => (
          <div
            key={column.id}
            className="w-full h-10 flex items-center border-t-slate-200 border-t-1 group"
          >
            <Handle
              type="source"
              position={Position.Left}
              id={`${index}-left`}
              className="!opacity-0 group-hover:!opacity-100 transition-opacity"
              style={{
                left: -8,
                top: `${42 + index * 48 + 28}px`,
                background: "#555",
              }}
            />
            <Handle
              type="target"
              position={Position.Right}
              id={`${index}-right`}
              className="!opacity-0 group-hover:!opacity-100 transition-opacity"
              style={{
                right: -8,
                top: `${42 + index * 48 + 28}px`,
                background: "#555",
              }}
              
            />
            <div
              className="w-1/5 h-full flex items-center justify-center"
              onDoubleClick={() => changeColumnKeyType(column.id)}
            >
              {(column.isPrimaryKey || column.isForeignKey) && (
                <KeyIcon
                  className={` w-5 ${
                    column.isPrimaryKey ? "fill-yellow-400" : "fill-indigo-500"
                  }`}
                />
              )}
            </div>
            <div className="w-full h-full" onDoubleClick={handleEditingColumn}>
              {isEditingColumn ? (
                <input
                  type="text"
                  value={column.columnName}
                  onChange={(e) => handleColumnNameChange(e, column.id)}
                  onKeyDown={handleEnterSave}
                  onBlur={handleBlur}
                  className="w-full h-full border-transparent text-start focus-visible:outline-none px-2"
                />
              ) : (
                <div className="flex min-w-fit h-full font-medium content-center align-middle items-center justify-start px-1 text-ellipsis ">
                  {column.columnName}
                </div>
              )}
            </div>
            <select name={column.columnType} className="appearance-none mr-2 text-end">
              {columnTypes.map((type, index) => {
                return <option value={index} key={index}>{type}</option>;
              })}
            </select>
          </div>
        ))}
      </div>
      <div className="h-1 w-full border-t-1 border-slate-200" />
      <div className="pb-1">
        <button
          className="w-min h-min px-3 pb-px rounded-2xl hover:bg-slate-600 font-black text-white"
          onClick={() => addColumn()}
        >
          +
        </button>
      </div>
    </div>
  );
}
