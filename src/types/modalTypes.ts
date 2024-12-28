/* eslint-disable @typescript-eslint/no-explicit-any */

interface BaseDialogProps {
    isOpen: boolean,
    onClose: () => void,
}

export interface AboutModalProps extends BaseDialogProps {
    // isOpen: boolean,
    // onClose: () => void,
};

export interface DownloadModalProps extends BaseDialogProps {
    diagramWidth: number;
    diagramHeight: number;
    getViewport: any;
};

export interface AlertDialogProps extends BaseDialogProps {
    type: "message" | "alert" | "error";
    title: string;
    message: string;
}