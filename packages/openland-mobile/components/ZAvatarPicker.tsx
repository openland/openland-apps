import * as React from 'react';
import { View, Image, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import ImagePicker, { Image as PickerImage } from 'react-native-image-crop-picker';
import { UploadCareDirectUploading } from '../utils/UploadCareDirectUploading';
import { UploadStatus } from 'openland-engines/messenger/types';
import { ZImage } from './ZImage';
import { XStoreContext } from 'openland-y-store/XStoreContext';
import { XStoreState } from 'openland-y-store/XStoreState';
import { startLoader, stopLoader } from './ZGlobalLoader';

interface AvatarImageRef {
    uuid: string;
    crop?: { x: number, y: number, w: number, h: number } | null;
}

export interface ZAvatarPickerProps {
    field?: string;
    valueStoreKey?: string;
    value?: AvatarImageRef | null;
    onChanged?: (value: AvatarImageRef | null) => void;
    showLoaderOnUpload?: boolean;
    render?: React.ComponentType<{ url?: string, file?: string, loading: boolean, showPicker: () => void }>;
}

class ZAvatarPickerComponent extends React.PureComponent<ZAvatarPickerProps & { store?: XStoreState }, { file?: string, loading: boolean }> {

    state = {
        file: undefined,
        loading: false
    };

    private currentIteration = 0;
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
                console.log(e);
                // Ignore
            }
            if (res) {
                if (this.props.showLoaderOnUpload) {
                    startLoader();
                }
                this.setState({ file: res.path, loading: true });
                let up = ++this.currentIteration;
                let uploading = new UploadCareDirectUploading('photo.jpg', res.path);
                uploading.watch((v) => {
                    if (up === this.currentIteration) {
                        if (v.status === UploadStatus.COMPLETED) {
                            if (this.props.onChanged) {
                                this.props.onChanged({
                                    uuid: v.uuid!!,
                                    crop: {
                                        x: 0,
                                        y: 0,
                                        w: res!!.width,
                                        h: res!!.height
                                    }
                                });
                            }
                            if (this.props.valueStoreKey || this.props.field) {
                                this.props.store!!.writeValue(this.props.valueStoreKey || ('fields.' + this.props.field), {
                                    uuid: v.uuid!!,
                                    crop: {
                                        x: 0,
                                        y: 0,
                                        w: res!!.width,
                                        h: res!!.height
                                    }
                                });
                            }
                            this.setState({ loading: false });
                            stopLoader();
                        } else if (v.status === UploadStatus.FAILED) {
                            this.setState({ file: undefined, loading: false });
                            stopLoader();
                        }
                    }
                });
            }
        } catch (e) {
            console.log(e);
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
        if (value) {
            valueUrl = 'https://ucarecdn.com/' + value.uuid + '/';
            if (value.crop) {
                valueUrl += `-/crop/${value.crop.w}x${value.crop.h}/${value.crop.x},${value.crop.y}/`;
            }
        }

        return this.props.render ? <this.props.render url={valueUrl} file={this.state.file} loading={this.state.loading} showPicker={this.handlePicker} /> : (
            <TouchableOpacity onPress={this.handlePicker}>
                <View width={90} height={90} borderRadius={45}>
                    {!this.state.file && valueUrl && <ZImage source={{ uri: valueUrl }} width={66} height={66} style={{ borderRadius: 33 }} />}
                    {this.state.file && <Image source={{ uri: this.state.file }} style={{ width: 66, height: 66, borderRadius: 33 }} />}
                    <View position="absolute" alignItems="center" justifyContent="center" style={{ width: 90, height: 90, borderRadius: 45, backgroundColor: 'white', borderWidth: 1, borderColor: '#eff0f2' }}>
                        {!this.state.loading && <Image style={{tintColor: 'gray', opacity: 0.8, width: 26, height: 21 }} resizeMode="stretch" source={require('assets/ic-photo-full.png')} />}
                        {this.state.loading && <ActivityIndicator color="#fff" />}
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