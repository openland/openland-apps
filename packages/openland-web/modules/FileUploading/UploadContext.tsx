import * as React from 'react';

type FileT = UploadCare.File | null | undefined;
type FileSrcT = string | null | undefined;
type FileNameT = string | null | undefined;

export interface ContextT {
    file: FileT;
    fileSrc: FileSrcT;
    fileId?: string | null;
    fileSize?: number | null;
    fileName: FileNameT;
    fileRemover: () => void;
    handleDrop: (file: any) => void;
    handleSetImage: (a: { fileId: string }) => void;
    handleSetFile: (a: { fileId: string; fileName: string; fileSize: number }) => void;
}

export const UploadContext = React.createContext<ContextT>({
    file: undefined,
    fileSrc: undefined,
    fileId: undefined,
    fileSize: undefined,
    fileName: undefined,
    fileRemover: () => null,
    handleDrop: () => null,
    handleSetImage: () => null,
    handleSetFile: () => null,
});

export class UploadContextProvider extends React.Component<any, ContextT> {
    constructor(props: any) {
        super(props);

        this.state = {
            file: null,
            fileSrc: null,
            fileName: null,
            fileId: null,
            fileSize: null,
            fileRemover: this.fileRemover,
            handleDrop: this.handleDrop,
            handleSetImage: this.handleSetImage,
            handleSetFile: this.handleSetFile,
        };
    }

    private handleSetImage = ({ fileId }: { fileId: string }) => {
        this.setState({
            fileSrc: `https://ucarecdn.com/${fileId}/`,
            fileId: fileId,
        });
    };

    private handleSetFile = ({
        fileId,
        fileName,
        fileSize,
    }: {
        fileId: string;
        fileName: string;
        fileSize: number;
    }) => {
        this.setState({
            fileId,
            fileName,
            fileSize,
        });
    };

    private handleDrop = (droppedFile: any) => {
        const reader = new FileReader();
        reader.readAsDataURL(droppedFile);
        reader.onloadend = () => {
            if (droppedFile.type.match('image')) {
                this.setState({
                    file: droppedFile,
                    fileSrc: reader.result as any,
                    fileSize: droppedFile.size,
                    fileName: null,
                    fileId: null,
                });
            } else {
                this.setState({
                    file: droppedFile,
                    fileSrc: null,
                    fileSize: droppedFile.size,
                    fileId: null,
                    fileName: droppedFile.name,
                });
            }
        };
    };

    private fileRemover = () => {
        this.setState({
            file: null,
            fileSrc: null,
            fileName: null,
            fileId: null,
            fileSize: null,
        });
    };

    render() {
        return (
            <UploadContext.Provider value={this.state}>
                {this.props.children}
            </UploadContext.Provider>
        );
    }
}
