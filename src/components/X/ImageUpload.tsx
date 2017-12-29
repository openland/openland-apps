import * as React from 'react';
import { XButton } from './XButton';
import { XCloudImage } from './XCloudImage';
import * as UploadCare from 'uploadcare-widget';

export class ImageUpload extends React.Component<{}, { isLoading: boolean, uuid: string | null }> {

    // private uploader: HTMLInputElement | null = null;
    // private widget: any | null = null;

    constructor(props: {}) {
        super(props);
        this.state = { isLoading: false, uuid: null };
    }

    doUpload = () => {
        let dialog = UploadCare.openDialog(null, { publicKey: 'b70227616b5eac21ba88' });
        let ths = this;
        dialog.done((r) => {
            ths.setState({ isLoading: true });
            r.progress((p) => {
                console.warn(p.progress);
            });
            r.done((f) => {
                ths.setState({ isLoading: false, uuid: f.uuid });
                console.warn(f);
            });
        });
    }

    doClear = () => {
        this.setState({ isLoading: false, uuid: null });
    }

    render() {
        return (
            <>
            <div style={{ paddingBottom: 8 }}>
                <div>
                    <XButton onClick={this.doUpload} loading={this.state.isLoading} positive={true}>Upload Logo</XButton>
                    {this.state.uuid && <XButton onClick={this.doClear} negative={true}>Remove Logo</XButton>}
                </div>
                {this.state.uuid && (
                    <div style={{ marginTop: 8, width: 200, height: 200 }}>
                        <XCloudImage src={this.state.uuid} maxHeight={200} maxWidth={200} resize="fill" />
                    </div>
                )}
            </div>
            </>
        );
    }
}