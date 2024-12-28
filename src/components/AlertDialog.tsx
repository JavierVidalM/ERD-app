import { AlertDialogProps } from "../types/modalTypes";
import Button from "./Buttons";

export const AlertDialog = ({
  type,
  title,
  message,
  onClose,
  isOpen,
}: AlertDialogProps) => {
  if (!isOpen) return null;

  const getTypeStyles = (type: string) => {
    switch (type) {
      case "message":
        return "bg-purple-400";
      case "alert":
        return "bg-yellow-500";
      case "error":
        return "bg-red-500";
      default:
        return "";
    }
  };

  const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
        onClose();
    }
  }

  return (
    <div className="select-none fixed inset-0 flex items-center justify-center bg-black/30" onClick={handleOutsideClick}>
      <dialog
        className="p-6 rounded-md flex flex-col w-1/3 h-fit bg-slate-200 shadow-lg shadow-slate-900"
      >
        <div className={`${getTypeStyles(type)} absolute top-0 left-0 h-3 w-full rounded-t`} />
        <h2 className="mt-4 text-lg font-medium">{title}</h2>
        <p className="w-full h-0.5 rounded-full bg-slate-400 mt-4"/>
        <div className="mt-4">
          <p>{message}</p>
        </div>
        <div className="flex justify-end mt-8" >
          <Button onClick={onClose}>
            Confirmar</Button>
        </div>
      </dialog>
    </div>
  );
};
