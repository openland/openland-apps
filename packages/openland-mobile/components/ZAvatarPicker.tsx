import * as React from 'react';
import { View, Image, TouchableOpacity, Text } from 'react-native';
import ImagePicker, { Image as PickerImage } from 'react-native-image-crop-picker';
import { UploadCareDirectUploading } from '../utils/UploadCareDirectUploading';
import { UploadStatus } from 'openland-engines/messenger/types';
import { XStoreContext } from 'openland-y-store/XStoreContext';
import { XStoreState } from 'openland-y-store/XStoreState';
import { startLoader, stopLoader } from './ZGlobalLoader';
import { ZAvatar, ZAvatarSize, avatarSizes } from './ZAvatar';
import { handlePermissionDismiss } from 'openland-mobile/utils/permissions/handlePermissionDismiss';
import { XMemo } from 'openland-y-utils/XMemo';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { ThemeGlobal } from 'openland-y-utils/themes/ThemeGlobal';
import LoaderSpinner from './LoaderSpinner';

interface AvatarImageRef {
    uuid: string;
    crop?: { x: number, y: number, w: number, h: number } | null;
}

export interface ZAvatarPickerRenderProps {
    url?: string;
    file?: string;
    loading: boolean;
    showPicker: () => void;
}

export interface ZAvatarPickerProps {
    size?: ZAvatarSize;
    initialUrl?: string;
    field?: string;
    valueStoreKey?: string;
    value?: AvatarImageRef | null;
    onChanged?: (value: AvatarImageRef | null) => void;
    render?: React.ComponentType<ZAvatarPickerRenderProps>;
    pickSize?: {
        width: number;
        height: number;
    };
}

class ZAvatarPickerComponent extends React.PureComponent<ZAvatarPickerProps & { store?: XStoreState, theme: ThemeGlobal }, { loading: boolean, localPath?: string }> {

    state = {
        file: undefined,
        loading: false,

        localPath: undefined,
    };

    private currentIteration = 0;

    upload = (data: { path: string, width?: number, height?: number }) => {
        // startLoader();
        this.setState({ loading: true });
        let up = ++this.currentIteration;
        let uploading;
        uploading = new UploadCareDirectUploading('photo.jpg', data.path);

        uploading.watch((v) => {
            if (up === this.currentIteration) {
                if (v.status === UploadStatus.COMPLETED) {
                    if (this.props.onChanged) {
                        this.props.onChanged({
                            uuid: v.uuid!!,
                            ...data.width && data.height ?
                                {
                                    crop: {
                                        x: 0,
                                        y: 0,
                                        w: data!!.width!!,
                                        h: data!!.height!!
                                    }
                                } : {}
                        });
                    }
                    if (this.props.valueStoreKey || this.props.field) {
                        this.props.store!!.writeValue(this.props.valueStoreKey || ('fields.' + this.props.field), {
                            uuid: v.uuid!!,
                            ...data.width && data.height ?
                                {
                                    crop: {
                                        x: 0,
                                        y: 0,
                                        w: data!!.width!!,
                                        h: data!!.height!!
                                    }
                                } : {}
                        });
                    }
                    this.setState({ loading: false });
                    // stopLoader();
                } else if (v.status === UploadStatus.FAILED) {
                    this.setState({ loading: false });
                    // stopLoader();
                }
            }
        });
    }

    private handlePicker = async () => {
        try {
            let res: PickerImage | null = null;
            try {
                let r = await ImagePicker.openPicker({
                    width: this.props.pickSize ? this.props.pickSize.width : 1024,
                    height: this.props.pickSize ? this.props.pickSize.height : 1024,
                    cropping: true
                });
                if (!Array.isArray(r)) {
                    res = r;
                } else {
                    res = r[0];
                }
                console.log(r);
            } catch (e) {
                if (e.code === 'E_PERMISSION_MISSING') {
                    handlePermissionDismiss('gallery');
                }

                console.log(e);
                // Ignore
            }
            if (res) {
                this.setState({
                    localPath: res.path
                });

                this.upload(res);
            }
        } catch (e) {
            console.log(e);
        }
    }
    componentDidMount() {
        if (this.props.initialUrl) {
            this.upload({ path: this.props.initialUrl });
        }
    }
    componentWillUnmount() {
        // Reset watcher
        this.currentIteration++;
    }

    render() {
        let { value, theme } = this.props;
        if (this.props.field || this.props.valueStoreKey) {
            let existing = this.props.store!!.readValue(this.props.valueStoreKey || ('fields.' + this.props.field));
            if (existing) {
                value = existing;
            }
        }
        let valueUrl = undefined;

        valueUrl = this.props.initialUrl;

        if (value && typeof value.uuid === 'string') {
            if (value.uuid.startsWith('https://ucarecdn.com/')) {
                valueUrl = value.uuid;
            } else {
                valueUrl = 'https://ucarecdn.com/' + value.uuid + '/';
                if (value.crop) {
                    valueUrl += `-/crop/${value.crop.w}x${value.crop.h}/${value.crop.x},${value.crop.y}/`;
                }
            }
        }

        if (this.state.localPath) {
            valueUrl = this.state.localPath;
        }

        let size = avatarSizes[this.props.size || 'x-large'].size;
        return this.props.render ? <this.props.render url={valueUrl} file={this.state.file} loading={this.state.loading} showPicker={this.handlePicker} /> : (
            <TouchableOpacity onPress={this.handlePicker}>
                <View width={size} height={size} borderRadius={size / 2} backgroundColor={theme.backgroundTertiary}>
                    {!valueUrl && !this.state.loading && (
                        <View position="absolute" alignItems="center" justifyContent="center" style={{ width: size, height: size, borderRadius: size / 2 }}>
                            <Image source={require('assets/ic-picker-48.png')} style={{ tintColor: theme.foregroundTertiary, width: 48, height: 48 }} />
                        </View>
                    )}
                    {!!valueUrl && (
                        <View width={size} height={size}>
                            <ZAvatar src={valueUrl} size={this.props.size || 'x-large'} />

                            {!this.state.loading && (
                                <View position="absolute" bottom={2} right={2} width={28} height={28} padding={2} backgroundColor={theme.backgroundPrimary} borderRadius={14}>
                                    <View width={24} height={24} backgroundColor={theme.accentPrimary} borderRadius={12} alignItems="center" justifyContent="center">
                                        <Image source={require('assets/ic-picker-selected-16.png')} style={{ tintColor: theme.contrastSpecial, width: 16, height: 16 }} />
                                    </View>
                                </View>
                            )}
                        </View>
                    )}
                    {this.state.loading && (
                        <View position="absolute" alignItems="center" justifyContent="center" width={size} height={size} borderRadius={size / 2} backgroundColor={theme.overlayLight}>
                            <LoaderSpinner />
                        </View>
                    )}
                </View>
            </TouchableOpacity>
        );
    }
}

export const ZAvatarPicker = XMemo<ZAvatarPickerProps>(props => {
    const theme = React.useContext(ThemeContext);

    if (props.field || props.valueStoreKey) {
        return (
            <XStoreContext.Consumer>
                {store => {
                    if (!store) {
                        throw Error('No store!');
                    }
                    return <ZAvatarPickerComponent store={store} theme={theme} {...props} />;
                }}
            </XStoreContext.Consumer>
        );
    }

    return <ZAvatarPickerComponent theme={theme} {...props} />;
});