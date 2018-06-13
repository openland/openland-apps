import * as React from 'react';
import * as UploadCare from 'uploadcare-widget';

export interface XFileUploadRenderProps {
    doUpload: () => void;
    doClear: () => void;
    isLoading: boolean;
    progress: number;
    crop: XImageCrop | null;
    uuid: string | null;
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

    crop?: XImageCrop | null;
    uuid?: string | null;
    onChanged?: (uuid: string | null, crop: XImageCrop | null) => void;
}

export class XFileUpload extends React.Component<XFileUploadProps, { isLoading: boolean, progress: number, uuid: string | null | undefined, crop: XImageCrop | null | undefined }> {

    private isControlled: boolean = false;

    constructor(props: XFileUploadProps) {
        super(props);
        this.isControlled = props.uuid !== undefined;
        this.state = { isLoading: false, uuid: this.props.uuid || null, crop: this.props.crop || null, progress: 0 };
    }

    componentWillUpdate(nextProps: Readonly<XFileUploadProps>, nextState: Readonly<{ isLoading: boolean; uuid: string | null | undefined }>, nextContext: any): void {
        if ((nextProps.uuid !== undefined) !== (this.props.uuid !== undefined)) {
            throw 'You can\'t make controlled component to be not controlled';
        }
    }

    doUpload = () => {
        let uuid = this.state.uuid;
        let crop = this.state.crop;
        if (this.isControlled) {
            uuid = this.props.uuid;
            crop = this.props.crop;
        }
        let uploaded = uuid
            ? UploadCare.fileFrom(
                'uploaded',
                crop ? 'https://ucarecdn.com/' + uuid + `/-/crop/${crop.width}x${crop.height}/${crop.left},${crop.top}/` : uuid)
            : null;
        console.warn(uploaded);
        let dialog = UploadCare.openDialog(uploaded, {
            publicKey: 'b70227616b5eac21ba88',
            imagesOnly: true,
            crop: this.props.cropParams,
            imageShrink: '1024x1024',
        });
        dialog.done((r) => {
            this.setState({ isLoading: true, progress: 0 });
            r.progress((p) => {
                this.setState({ progress: p.progress });
            });
            r.done((f) => {
                console.warn(f);
                let crop2 = f.crop ? f.crop : null;
                if (this.isControlled) {
                    this.setState({ isLoading: false, progress: 1 });
                } else {
                    this.setState({ isLoading: false, progress: 1, uuid: f.uuid, crop: crop2 });
                }
                if (this.props.onChanged) {
                    this.props.onChanged(f.uuid, crop2);
                }
            });
        });
    }

    doClear = () => {
        if (this.isControlled) {
            this.setState({ isLoading: false });
        } else {
            this.setState({ isLoading: false, uuid: null });
        }
        if (this.props.onChanged) {
            this.props.onChanged(null, null);
        }
    }

    render() {
        let uuid = this.isControlled ? this.props.uuid : this.state.uuid;
        let crop = this.isControlled ? this.props.crop : this.state.crop;
        let Component = this.props.component;
        return (
            <Component
                uuid={uuid || null}
                crop={crop || null}
                isLoading={this.state.isLoading}
                doClear={this.doClear}
                doUpload={this.doUpload}
                progress={this.state.progress}
            />
        );
    }
}