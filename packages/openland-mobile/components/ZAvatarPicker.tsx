import * as React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import ImagePicker, { Image as PickerImage } from 'react-native-image-crop-picker';
import { UploadCareDirectUploading } from '../utils/UploadCareDirectUploading';
import { UploadStatus } from 'openland-engines/messenger/types';
import { ZAvatar, ZAvatarSize, avatarSizes } from './ZAvatar';
import { handlePermissionDismiss } from 'openland-mobile/utils/permissions/handlePermissionDismiss';
import { XMemo } from 'openland-y-utils/XMemo';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { ThemeGlobal } from 'openland-y-utils/themes/ThemeGlobal';
import LoaderSpinner from './LoaderSpinner';
import { FormField } from 'openland-form/useField';

interface AvatarImageRef {
    uuid: string;
    crop?: { x: number, y: number, w: number, h: number } | null;
}

export interface ZAvatarPickerRenderProps {
    url?: string;
    loading: boolean;
    showPicker: () => void;
}

export interface ZAvatarPickerProps {
    size?: ZAvatarSize;
    initialUrl?: string;
    field?: FormField<AvatarImageRef | null>;
    valueStoreKey?: string;
    value?: AvatarImageRef | null;
    onChanged?: (value: AvatarImageRef | null) => void;
    render?: React.ComponentType<ZAvatarPickerRenderProps>;
    pickSize?: {
        width: number;
        height: number;
    };
}

const ZAvatarPickerComponent = (props: ZAvatarPickerProps & { theme: ThemeGlobal }) => {
    const [localPath, setLocalPath] = React.useState<string | undefined>(undefined);
    const [loading, setLoading] = React.useState<boolean>(false);
    
    let currentIteration = 0;

    const upload = (data: { path: string, width?: number, height?: number }) => {
        setLoading(true);
        let up = ++currentIteration;
        let uploading;
        uploading = new UploadCareDirectUploading('photo.jpg', data.path);

        uploading.watch((v) => {
            if (up === currentIteration) {
                if (v.status === UploadStatus.COMPLETED) {
                    if (props.onChanged) {
                        props.onChanged({
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
                
                    setLoading(false);
                } else if (v.status === UploadStatus.FAILED) {
                    setLoading(false);
                }
            }
        });
    };

    const handlePicker = async () => {
        try {
            let res: PickerImage | null = null;
            try {
                let r = await ImagePicker.openPicker({
                    width: props.pickSize ? props.pickSize.width : 1024,
                    height: props.pickSize ? props.pickSize.height : 1024,
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
                setLocalPath(res.path);
                upload(res);
            }
        } catch (e) {
            console.log(e);
        }
    };

    React.useEffect(() => {
        if (props.initialUrl) {
            upload({ path: props.initialUrl });
        }

        return () => {
            currentIteration++;
        };
    }, []);

    let { value, theme } = props;
    let valueUrl = undefined;

    valueUrl = props.initialUrl;

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

    if (localPath) {
        valueUrl = localPath;
    }

    let size = avatarSizes[props.size || 'x-large'].size;
    return props.render ? <props.render url={valueUrl} loading={loading} showPicker={handlePicker} /> : (
        <TouchableOpacity onPress={handlePicker}>
            <View width={size} height={size} borderRadius={size / 2} backgroundColor={theme.backgroundTertiary}>
                {!valueUrl && !loading && (
                    <View position="absolute" alignItems="center" justifyContent="center" style={{ width: size, height: size, borderRadius: size / 2 }}>
                        <Image source={require('assets/ic-picker-48.png')} style={{ tintColor: theme.foregroundTertiary, width: 48, height: 48 }} />
                    </View>
                )}
                {!!valueUrl && (
                    <View width={size} height={size}>
                        <ZAvatar src={valueUrl} size={props.size || 'x-large'} />

                        {!loading && (
                            <View position="absolute" bottom={2} right={2} width={28} height={28} padding={2} backgroundColor={theme.backgroundPrimary} borderRadius={14}>
                                <View width={24} height={24} backgroundColor={theme.accentPrimary} borderRadius={12} alignItems="center" justifyContent="center">
                                    <Image source={require('assets/ic-picker-selected-16.png')} style={{ tintColor: theme.contrastSpecial, width: 16, height: 16 }} />
                                </View>
                            </View>
                        )}
                    </View>
                )}
                {loading && (
                    <View position="absolute" alignItems="center" justifyContent="center" width={size} height={size} borderRadius={size / 2} backgroundColor={theme.overlayLight}>
                        <LoaderSpinner />
                    </View>
                )}
            </View>
        </TouchableOpacity>
    );
};

export const ZAvatarPicker = XMemo<ZAvatarPickerProps>(props => {
    const { field } = props;
    const theme = React.useContext(ThemeContext);
    
    if (field && field.input) {
        return (
            <ZAvatarPickerComponent 
                {...props} 
                theme={theme}
                value={field.input.value}
                onChanged={(ref) => {
                    field.input.onChange(ref);

                    if (props.onChanged) {
                        props.onChanged(ref);
                    }
                }}
            />
        );
    }
    
    return <ZAvatarPickerComponent theme={theme} {...props} />;
});