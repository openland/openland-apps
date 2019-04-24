import * as React from 'react';

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

export class UploadContextProvider extends React.Component<any, ContextT> {
    constructor(props: any) {
        super(props);

        this.state = {
            file: null,
            fileSrc: null,
            fileName: null,
            fileRemover: this.fileRemover,
            handleDrop: this.handleDrop,
        };
    }

    private handleDrop = (droppedFile: any) => {
        const reader = new FileReader();
        reader.readAsDataURL(droppedFile);
        reader.onloadend = () => {
            if (droppedFile.type.match('image')) {
                this.setState({
                    file: droppedFile,
                    fileSrc: reader.result as any,
                    fileName: null,
                });
            } else {
                this.setState({
                    file: droppedFile,
                    fileSrc: null,
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
