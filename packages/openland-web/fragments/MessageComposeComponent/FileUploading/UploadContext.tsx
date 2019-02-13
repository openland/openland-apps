import * as React from 'react';
import { DropZone } from './DropZone';

type FileT = UploadCare.File | null | undefined;
type FileSrcT = string | null | undefined;
type FileNameT = string | null | undefined;

export interface ContextT {
    file: FileT;
    fileSrc: FileSrcT;
    fileName: FileNameT;
    fileRemover: () => void;
    handleDrop: (file: any) => void;
}

export const UploadContext = React.createContext<ContextT>({
    file: undefined,
    fileSrc: undefined,
    fileName: undefined,
    fileRemover: () => null,
    handleDrop: () => null,
});

export const UploadContextProvider = ({ children }: any) => {
    const [file, setFile] = React.useState<FileT>(null);
    const [fileSrc, setFileSrc] = React.useState<FileSrcT>(null);
    const [fileName, setFileName] = React.useState<FileNameT>(null);

    const fileRemover = () => {
        setFile(null);
        setFileSrc(null);
        setFileName(null);
    };

    const handleDrop = (droppedFile: any) => {
        const reader = new FileReader();
        reader.readAsDataURL(droppedFile);
        reader.onloadend = () => {
            if (droppedFile.type.match('image')) {
                setFile(droppedFile);
                setFileSrc(reader.result as any);
                setFileName(null);
            } else {
                setFile(droppedFile);
                setFileSrc(null);
                setFileName(droppedFile.name);
            }
        };
    };

    return (
        <UploadContext.Provider
            value={{
                file,
                fileSrc,
                fileName,
                fileRemover,
                handleDrop,
            }}
        >
            <DropZone height="calc(100% - 115px)" onFileDrop={handleDrop} />
            {children}
        </UploadContext.Provider>
    );
};
