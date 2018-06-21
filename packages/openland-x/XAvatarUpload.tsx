import * as React from 'react';
import { XAvatarUploadBasicProps, XAvatarUploadBasic } from './basics/XAvatarUploadBasic';
import { XStoreState } from 'openland-x-store/XStoreState';
import { XStoreContext } from 'openland-x-store/XStoreContext';
import { UploadedFile } from './files/XFileUpload';

class XAvatarUploadStored extends React.PureComponent<XAvatarUploadProps & { store: XStoreState }> {
    handleChange = (file: UploadedFile | null) => {
        let key = this.props.valueStoreKey || ('fields.' + this.props.field);
        if (file && file.isImage) {
            if (file.crop) {
                this.props.store.writeValue(key, { uuid: file.uuid, crop: { x: file.crop.left, y: file.crop.top, w: file.crop.width, h: file.crop.height } });
            } else {
                let side = Math.min(file.width!!, file.height!!);
                this.props.store.writeValue(key, { uuid: file.uuid, crop: { x: (file.width!! - side) / 2, y: (file.height!! - side) / 2, w: side, h: side } });
            }
        } else {
            this.props.store.writeValue(key, null);
        }
    }

    render() {
        let { valueStoreKey, field, ...other } = this.props;
        let key = this.props.valueStoreKey || ('fields.' + this.props.field);
        let value = this.props.store.readValue(key);
        let uuid = value ? value.uuid : null;
        let crop = uuid ? (value.crop ? { left: value.crop.x, top: value.crop.y, width: value.crop.w, height: value.crop.h } : null) : null;
        let file = uuid ? { uuid: uuid, crop: crop, isImage: true, width: null, height: null } : null;
        return (
            <XAvatarUploadBasic {...other} onChanged={this.handleChange} file={file} />
        );
    }
}

export interface XAvatarUploadProps extends XAvatarUploadBasicProps {
    field?: string;
    valueStoreKey?: string;
}

export class XAvatarUpload extends React.PureComponent<XAvatarUploadProps> {
    render() {
        let { valueStoreKey, field, ...other } = this.props;
        if (valueStoreKey || field) {
            let valueStoreKeyCached = valueStoreKey;
            let fieldCached = field;
            return (
                <XStoreContext.Consumer>
                    {store => {
                        if (!store) {
                            throw Error('No store!');
                        }
                        return (
                            <XAvatarUploadStored
                                {...other}
                                valueStoreKey={valueStoreKeyCached}
                                field={fieldCached}
                                store={store}
                            />
                        );
                    }}
                </XStoreContext.Consumer>
            );
        } else {
            return <XAvatarUploadBasic {...other} />;
        }
    }
}