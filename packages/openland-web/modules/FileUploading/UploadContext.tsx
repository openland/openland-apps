import * as React from 'react';

type FileT = UploadCare.File | null | undefined;
type FileSrcT = string | null | undefined;
type FileNameT = string | null | undefined;

export interface ContextT {
    file: FileT;
    fileSrc: FileSrcT;
    fileId?: string | null;
    fileName: FileNameT;
    fileRemover: () => void;
    handleDrop: (file: any) => void;
    handleSetFileId: (fileId: string) => void;
}

export const UploadContext = React.createContext<ContextT>({
    file: undefined,
    fileSrc: undefined,
    fileId: undefined,
    fileName: undefined,
    fileRemover: () => null,
    handleDrop: () => null,
    handleSetFileId: () => null,
});

export class UploadContextProvider extends React.Component<any, ContextT> {
    constructor(props: any) {
        super(props);

        this.state = {
            file: null,
            fileSrc: null,
            fileName: null,
            fileId: null,
            fileRemover: this.fileRemover,
            handleDrop: this.handleDrop,
            handleSetFileId: this.handleSetFileId,
        };
    }

    private handleSetFileId = (fileId: string) => {
        this.setState({
            fileSrc: `https://ucarecdn.com/${fileId}/`,
            fileId: fileId,
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
                    fileName: null,
                    fileId: null,
                });
            } else {
                this.setState({
                    file: droppedFile,
                    fileSrc: null,
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
