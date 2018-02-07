import * as React from 'react';
import { XButton2 } from './XButton2';
import { XCloudImage } from './XCloudImage';
import * as UploadCare from 'uploadcare-widget';

export interface XImageUploadProps {
    uuid?: string | null;
    onChanged?: (uuid: string | null) => void
}

export class XImageUpload extends React.Component<XImageUploadProps, { isLoading: boolean, uuid: string | null }> {

    private isControlled: boolean = false;

    constructor(props: XImageUploadProps) {
        super(props);
        this.isControlled = props.uuid !== undefined;
        console.warn(props);
        this.state = {isLoading: false, uuid: null};
    }

    componentWillUpdate(nextProps: Readonly<XImageUploadProps>, nextState: Readonly<{ isLoading: boolean; uuid: string | null }>, nextContext: any): void {
        if ((nextProps.uuid !== undefined) !== (this.props.uuid !== undefined)) {
            console.warn(nextProps);
            console.warn(this.props);
            throw 'You can\'t make controlled component to be not controlled';
        }
    }

    doUpload = () => {
        let dialog = UploadCare.openDialog(null, {publicKey: 'b70227616b5eac21ba88'});
        dialog.done((r) => {
            this.setState({isLoading: true});
            r.progress((p) => {
                console.warn(p.progress);
            });
            r.done((f) => {
                if (this.isControlled) {
                    this.setState({isLoading: false});
                } else {
                    this.setState({isLoading: false, uuid: f.uuid});
                }
                if (this.props.onChanged) {
                    this.props.onChanged(f.uuid);
                }
                console.warn(f);
            });
        });
    };

    doClear = () => {
        if (this.isControlled) {
            this.setState({isLoading: false});
        } else {
            this.setState({isLoading: false, uuid: null});
        }
        if (this.props.onChanged) {
            this.props.onChanged(null);
        }
    };

    render() {
        let uuid = this.isControlled ? this.props.uuid : this.state.uuid;
        return (
            <div style={{paddingBottom: 8}}>
                <div>
                    <XButton2 onClick={this.doUpload} loading={this.state.isLoading} positive={true}>
                        Upload Logo
                    </XButton2>
                    {uuid && <XButton2 onClick={this.doClear} negative={true}>Remove Logo</XButton2>}
                </div>
                {uuid && (
                    <div style={{marginTop: 8, width: 200, height: 200}}>
                        <XCloudImage src={uuid} maxHeight={200} maxWidth={200} resize="fit"/>
                    </div>
                )}
            </div>
        );
    }
}