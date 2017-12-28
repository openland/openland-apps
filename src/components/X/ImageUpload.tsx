import * as React from 'react';
import { XButton } from './XButton';
import { XPicture } from './XPicture';
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

    render() {
        return (
            <>
            <div style={{ paddingBottom: 8 }}>
                {this.state.uuid && <XPicture picture={'https://ucarecdn.com/' + this.state.uuid + '/-/preview/200x200/'} />}
                <XButton onClick={this.doUpload} loading={this.state.isLoading}>Upload Logo</XButton>
            </div>
            </>
        );
    }
}