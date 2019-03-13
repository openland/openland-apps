import * as React from 'react';
import { View, Image, TouchableOpacity, ActivityIndicator, Linking, Platform } from 'react-native';
import ImagePicker, { Image as PickerImage } from 'react-native-image-crop-picker';
import { UploadCareDirectUploading } from '../utils/UploadCareDirectUploading';
import { UploadStatus } from 'openland-engines/messenger/types';
import { XStoreContext } from 'openland-y-store/XStoreContext';
import { XStoreState } from 'openland-y-store/XStoreState';
import { startLoader, stopLoader } from './ZGlobalLoader';
import { ZAvatar } from './ZAvatar';
import { handlePermissionDismiss } from 'openland-mobile/utils/permissions/handlePermissionDismiss';

interface AvatarImageRef {
    uuid: string;
    crop?: { x: number, y: number, w: number, h: number } | null;
}

export interface ZAvatarPickerProps {
    size?: number;
    initialUrl?: string
    field?: string;
    valueStoreKey?: string;
    value?: AvatarImageRef | null;
    onChanged?: (value: AvatarImageRef | null) => void;
    render?: React.ComponentType<{ url?: string, file?: string, loading: boolean, showPicker: () => void }>;
}

class ZAvatarPickerComponent extends React.PureComponent<ZAvatarPickerProps & { store?: XStoreState }, { loading: boolean, localPath?: string }> {

    state = {
        file: undefined,
        loading: false,

        localPath: undefined,
    };

    private currentIteration = 0;

    upload = (data: { path: string, width?: number, height?: number }) => {
        startLoader();
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
                    stopLoader();
                } else if (v.status === UploadStatus.FAILED) {
                    this.setState({ loading: false });
                    stopLoader();
                }
            }
        });
    }

    private handlePicker = async () => {
        try {
            let res: PickerImage | null = null;
            try {
                let r = await ImagePicker.openPicker({
                    width: 1024,
                    height: 1024,
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
        let value = this.props.value;
        if (this.props.field || this.props.valueStoreKey) {
            let existing = this.props.store!!.readValue(this.props.valueStoreKey || ('fields.' + this.props.field));
            if (existing) {
                value = existing;
            }
        }
        let valueUrl = undefined;

        valueUrl = this.props.initialUrl;

        if (value) {
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

        let size = this.props.size || 88;
        return this.props.render ? <this.props.render url={valueUrl} file={this.state.file} loading={this.state.loading} showPicker={this.handlePicker} /> : (
            <TouchableOpacity onPress={this.handlePicker}>
                <View width={size} height={size} borderRadius={size / 2}>
                    {valueUrl && <ZAvatar src={valueUrl} size={size} />}
                    <View position="absolute" alignItems="center" justifyContent="center" style={{ width: size, height: size, borderRadius: size / 2, borderWidth: 1, borderColor: '#eff0f2' }}>
                        {!this.state.loading && <Image style={{ tintColor: valueUrl ? 'white' : 'gray', opacity: 0.8, width: 26, height: 21 }} resizeMode="stretch" source={require('assets/ic-photo-full.png')} />}
                        {this.state.loading && (
                            <View width={34} height={34} backgroundColor="rgba(255, 255, 255, 0.6)" borderRadius={17} justifyContent="center">
                                <ActivityIndicator color="rgba(0, 0, 0, 0.4)" />
                            </View>
                        )}
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}

export class ZAvatarPicker extends React.PureComponent<ZAvatarPickerProps> {
    render() {
        if (this.props.field || this.props.valueStoreKey) {
            return (
                <XStoreContext.Consumer>
                    {store => {
                        if (!store) {
                            throw Error('No store!');
                        }
                        return <ZAvatarPickerComponent store={store} {...this.props} />;
                    }}
                </XStoreContext.Consumer>
            );
        }
        return <ZAvatarPickerComponent {...this.props} />;
    }
}