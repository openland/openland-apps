import * as React from 'react';
import * as UploadCare from 'uploadcare-widget';

export interface XFileUploadRenderProps {
    doUpload: () => void;
    doClear: () => void;
    isLoading: boolean;
    progress: number;
    file: UploadedFile | null;
}

export interface XImageCrop {
    left: number;
    top: number;
    width: number;
    height: number;
}

export interface XFileUploadProps {
    component: React.ComponentType<XFileUploadRenderProps>;
    cropParams?: string;

    file?: UploadedFile | null;
    onChanged?: (file: UploadedFile | null) => void;

    initialUrl?: string | null;

    imageOnly?: boolean;
}

export interface UploadedFile {
    isImage: boolean;
    uuid: string;
    crop: XImageCrop | null;
    width: number | null;
    height: number | null;
    name: string | null;
    size: string | null;
}

export class XFileUpload extends React.Component<XFileUploadProps, { isLoading: boolean, progress: number, file: UploadedFile | null | undefined }> {

    private isControlled: boolean = false;

    constructor(props: XFileUploadProps) {
        super(props);
        this.isControlled = props.file !== undefined;
        this.state = { isLoading: false, file: this.props.file, progress: 0 };
    }

    componentWillUpdate(nextProps: Readonly<XFileUploadProps>, nextState: Readonly<{ isLoading: boolean; file: UploadedFile | null | undefined }>, nextContext: any): void {
        if ((nextProps.file !== undefined) !== (this.props.file !== undefined)) {
            throw 'You can\'t make controlled component to be not controlled';
        }
    }

    componentDidMount() {
        if (this.props.initialUrl) {
            let file = UploadCare.fileFrom('url', this.props.initialUrl);
            this.doStartUpload(file);
        }
    }

    doUpload = () => {
        let file = this.state.file;
        if (this.isControlled) {
            file = this.props.file;
        }
        let uploaded = file
            ? UploadCare.fileFrom(
                'uploaded',
                file.crop ? 'https://ucarecdn.com/' + file.uuid + `/-/crop/${file.crop.width}x${file.crop.height}/${file.crop.left},${file.crop.top}/` : file.uuid)
            : null;
        let dialog = UploadCare.openDialog(uploaded, {
            publicKey: 'b70227616b5eac21ba88',
            imagesOnly: this.props.imageOnly === false ? false : true,
            crop: this.props.cropParams,
            imageShrink: '1024x1024',
        });
        dialog.done((r) => {
            this.doStartUpload(r);
        });
    }

    doStartUpload(file: UploadCare.File) {
        this.setState({ isLoading: true, progress: 0 });
        file.progress((p) => {
            this.setState({ progress: p.progress });
        });
        file.done((f) => {
            let fileu: UploadedFile = {
                isImage: f.isImage,
                uuid: f.uuid,
                crop: f.crop ? f.crop : null,
                width: f.originalImageInfo && f.originalImageInfo.width || null,
                height: f.originalImageInfo && f.originalImageInfo.height || null,
                name: f.name,
                size: f.size
            };
            if (this.isControlled) {
                this.setState({ isLoading: false, progress: 1 });
            } else {
                this.setState({ isLoading: false, progress: 1, file: fileu });
            }
            if (this.props.onChanged) {
                this.props.onChanged(fileu);
            }
        });
    }

    doClear = () => {
        if (this.isControlled) {
            this.setState({ isLoading: false });
        } else {
            this.setState({ isLoading: false, file: null });
        }
        if (this.props.onChanged) {
            this.props.onChanged(null);
        }
    }

    render() {
        let file = this.isControlled ? this.props.file : this.state.file;
        let Component = this.props.component;
        return (
            <Component
                file={file || null}
                isLoading={this.state.isLoading}
                doClear={this.doClear}
                doUpload={this.doUpload}
                progress={this.state.progress}
            />
        );
    }
}