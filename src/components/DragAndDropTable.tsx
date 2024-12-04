// DragAndDropTable.tsx
import { createContext, useContext, useState, Dispatch, SetStateAction } from "react";

type DnDContextType = [string | null, Dispatch<SetStateAction<string | null>>];

const DnDContext = createContext<DnDContextType>([null, () => {}]);

export const DnDProvider = ({ children }: { children: React.ReactNode }) => {
    const [type, setType] = useState<string | null>(null);

    return (
        <DnDContext.Provider value={[type, setType]}>
            {children}
        </DnDContext.Provider>
    );
}

export const useDnD = () => useContext(DnDContext);

export default DnDContext;