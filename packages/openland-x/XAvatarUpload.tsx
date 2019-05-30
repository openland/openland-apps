import * as React from 'react';
import { XAvatarUploadBasicProps, XAvatarUploadBasic } from './basics/XAvatarUploadBasic';
import { XStoreState } from 'openland-y-store/XStoreState';
import { XStoreContext } from 'openland-y-store/XStoreContext';
import { UploadedFile, XImageCropT } from './files/XFileUpload';

export type StoredFileT = {
    uuid: string;
    name?: string | null;
    size?: string | null;
    isImage: boolean;
    width: number | null;
    height: number | null;
    crop: XImageCropT | null;
};

export const toValue = (file: UploadedFile | null): StoredFileT | null => {
    if (file && file.isImage) {
        if (file.crop) {
            return {
                isImage: true,
                uuid: file.uuid,
                width: file.width,
                height: file.height,
                crop: {
                    x: Math.round(file.crop.left),
                    y: Math.round(file.crop.top),
                    w: Math.round(file.crop.width),
                    h: Math.round(file.crop.height),
                },
            };
        } else {
            let side = Math.min(file.width!!, file.height!!);
            return {
                isImage: true,
                uuid: file.uuid,
                width: file.width,
                height: file.height,
                crop: {
                    x: Math.round((file.width!! - side) / 2),
                    y: Math.round((file.height!! - side) / 2),
                    w: Math.round(side),
                    h: Math.round(side),
                },
            };
        }
    }
    return null;
};

export const fromValue = (value2?: StoredFileT | null): UploadedFile | null => {
    if (!value2) {
        return null;
    }
    let uuid = value2 ? value2.uuid : null;
    let name = value2 ? value2.name : null;
    let size = value2 ? value2.size : null;
    let crop = uuid
        ? value2.crop
            ? {
                  left: Math.round(value2.crop.x),
                  top: Math.round(value2.crop.y),
                  width: Math.round(value2.crop.w),
                  height: Math.round(value2.crop.h),
              }
            : null
        : null;

    return uuid
        ? {
              uuid: uuid,
              crop: crop,
              isImage: true,
              width: crop ? crop.width : null,
              height: crop ? crop.height : null,
              name: name ? name : null,
              size: size ? size : null,
          }
        : null;
};

export const XAvatarFormFieldComponent = ({
    onChange,
    value,
    ...rest
}: {
    placeholder?: { add: any; change: any };
    value?: StoredFileT | null;
    onChange: (file: StoredFileT | null) => void;
    size?: 'small' | 'xSmall' | 'normal' | 'large' | 'default';
    initialUrl?: string | null;
    cropParams?: string;
    dataTestId?: string;
}) => {
    return (
        <XAvatarUploadBasic
            {...rest}
            value={fromValue(value)}
            onChange={(file: UploadedFile | null) => {
                onChange(toValue(file));
            }}
        />
    );
};

// TODO Kill this
class XAvatarUploadStored extends React.PureComponent<XAvatarUploadProps & { store: XStoreState }> {
    handleChange = (file: UploadedFile | null) => {
        let key = this.props.valueStoreKey || 'fields.' + this.props.field;
        if (file && file.isImage) {
            this.props.store.writeValue(key, toValue(file));
        } else {
            this.props.store.writeValue(key, null);
        }
    };

    render() {
        let { valueStoreKey, field, ...other } = this.props;
        let key = this.props.valueStoreKey || 'fields.' + this.props.field;
        let value2 = this.props.store.readValue(key);
        const value = fromValue(value2);

        return <XAvatarUploadBasic {...other} onChange={this.handleChange} value={value} />;
    }
}

// TODO Kill this
export interface XAvatarUploadProps extends XAvatarUploadBasicProps {
    field?: string;
    valueStoreKey?: string;
}

// TODO Kill this
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
