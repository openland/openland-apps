import * as React from 'react';
import { XAvatarUploadBasicProps, XAvatarUploadBasic } from './basics/XAvatarUploadBasic';
import { XStoreState } from 'openland-x-store/XStoreState';
import { XStoreContext } from 'openland-x-store/XStoreContext';
import { XImageCrop } from './files/XFileUpload';

class XAvatarUploadStored extends React.PureComponent<XAvatarUploadProps & { store: XStoreState }> {
    handleChange = (uuid: string | null, crop: XImageCrop | null) => {
        let key = this.props.valueStoreKey || ('fields.' + this.props.field);
        if (uuid && crop) {
            this.props.store.writeValue(key, { uuid: uuid, crop: { x: crop.left, y: crop.top, w: crop.width, h: crop.height } });
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

        return (
            <XAvatarUploadBasic {...other} onChanged={this.handleChange} uuid={uuid} crop={crop} />
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