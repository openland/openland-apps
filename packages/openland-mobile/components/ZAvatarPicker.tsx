import * as React from 'react';
import { View, Image, TouchableOpacity, StatusBar, ActivityIndicator } from 'react-native';
import ImagePicker, { Image as PickerImage } from 'react-native-image-crop-picker';
import { UploadCareDirectUploading } from '../utils/UploadCareDirectUploading';
import { UploadStatus } from 'openland-engines/messenger/types';
import { ZImage } from './ZImage';
import { XStoreContext } from 'openland-y-store/XStoreContext';
import { XStoreState } from 'openland-y-store/XStoreState';

interface AvatarImageRef {
    uuid: string;
    crop?: { x: number, y: number, w: number, h: number } | null;
}

export interface ZAvatarPickerProps {
    field?: string;
    valueStoreKey?: string;
    value?: AvatarImageRef | null;
    onChanged?: (value: AvatarImageRef | null) => void;
}

class ZAvatarPickerComponent extends React.PureComponent<ZAvatarPickerProps & { store?: XStoreState }, { file?: string, loading: boolean }> {

    state = {
        file: undefined,
        loading: false
    };

    private currentIteration = 0;
    private handlePicker = async () => {
        let res: PickerImage | null = null;
        try {
            StatusBar.setBarStyle('dark-content');
            let r = await ImagePicker.openPicker({
                width: 1024,
                height: 1024,
                cropping: true
            });
            if (!Array.isArray(r)) {
                res = r;
            }
        } catch (e) {
            // Ignore
        } finally {
            StatusBar.setBarStyle('light-content');
        }
        if (res) {
            let source = (res as any).sourceURL as string;
            this.setState({ file: res.path, loading: true });
            let up = ++this.currentIteration;
            let uploading = new UploadCareDirectUploading('photo.jpg', source);
            uploading.watch((v) => {
                if (up === this.currentIteration) {
                    if (v.status === UploadStatus.COMPLETED) {
                        if (this.props.onChanged) {
                            this.props.onChanged({
                                uuid: v.uuid!!,
                                crop: {
                                    x: res!!.cropRect!!.x,
                                    y: res!!.cropRect!!.y,
                                    w: res!!.cropRect!!.width,
                                    h: res!!.cropRect!!.height
                                }
                            });
                        }
                        if (this.props.valueStoreKey || this.props.field) {
                            this.props.store!!.writeValue(this.props.valueStoreKey || ('fields.' + this.props.field), {
                                uuid: v.uuid!!,
                                crop: {
                                    x: res!!.cropRect!!.x,
                                    y: res!!.cropRect!!.y,
                                    w: res!!.cropRect!!.width,
                                    h: res!!.cropRect!!.height
                                }
                            });
                        }
                        this.setState({ loading: false });
                    } else if (v.status === UploadStatus.FAILED) {
                        this.setState({ file: undefined, loading: false });
                    }
                }
            });
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

        return (
            <TouchableOpacity onPress={this.handlePicker}>
                <View width={66} height={66} backgroundColor="grey" borderRadius={33}>
                    {!this.state.file && valueUrl && <ZImage source={{ uri: valueUrl }} width={66} height={66} style={{ borderRadius: 33 }} />}
                    {this.state.file && <Image source={{ uri: this.state.file }} style={{ width: 66, height: 66, borderRadius: 33 }} />}
                    <View position="absolute" alignItems="center" justifyContent="center" style={{ width: 66, height: 66, borderRadius: 33, backgroundColor: 'rgba(0,0,0,0.3)' }}>
                        {!this.state.loading && <Image source={require('assets/ic-photo-full.png')} />}
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