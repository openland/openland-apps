import * as React from 'react';
import { ZAvatarPickerRenderProps } from 'openland-mobile/components/ZAvatarPicker';
import { View, TouchableOpacity, Image, Dimensions } from 'react-native';
import { ZImage } from 'openland-mobile/components/ZImage';
import { RadiusStyles } from 'openland-mobile/styles/AppStyles';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { LoaderSpinner } from 'openland-mobile/components/LoaderSpinner';

export const ZSocialPickerRender = React.memo((props: ZAvatarPickerRenderProps) => {
    const deviceWidth = Dimensions.get('screen').width;
    const theme = React.useContext(ThemeContext);
    let width = 240;
    let height = 126;
    const radius = RadiusStyles.Medium;

    if (props.fullWidth) {
        width = deviceWidth - 32;
        height = Math.round((width * 8) / 16);
    }

    return (
        <View style={{ position: 'relative' }}>
            <TouchableOpacity onPress={props.showPicker}>
                <View
                    style={{
                        width,
                        height,
                        borderRadius: radius,
                        borderWidth: props.url ? 1 : undefined,
                        borderColor: props.url ? 'rgba(0, 0 ,0, 0.04)' : undefined,
                        overflow: 'hidden'
                    }}
                >
                    {props.url && (
                        <ZImage
                            highPriority={true}
                            width={width}
                            height={height}
                            source={props.url}
                            borderRadius={radius}
                        />
                    )}
                    <View
                        style={{
                            position: 'absolute',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width,
                            height,
                            borderRadius: radius,
                            backgroundColor: props.url
                                ? props.loading ? theme.overlayLight : undefined
                                : theme.backgroundTertiaryTrans,
                        }}
                    >
                        {!props.loading && !props.url && (
                            <Image
                                style={{
                                    tintColor: props.url
                                        ? theme.foregroundContrast
                                        : theme.foregroundQuaternary,
                                    width: 36,
                                    height: 36,
                                }}
                                source={require('assets/ic-camera-36.png')}
                            />
                        )}
                        {props.loading && <LoaderSpinner color={theme.foregroundContrast} />}
                    </View>
                </View>
            </TouchableOpacity>
            {props.clearable && props.url && (
                <TouchableOpacity
                    onPress={props.handleClear}
                    style={{
                        position: 'absolute',
                        right: 0,
                        top: 0,
                    }}
                >
                    <View
                        style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: 56,
                            height: 56,
                            borderRadius: 12
                        }}
                    >
                        <Image
                            source={require('assets/ic-clear-24.png')}
                            style={{
                                width: 24,
                                height: 24,
                                tintColor: theme.foregroundContrast,
                                borderRadius: 100,
                                zIndex: 1,
                            }}
                        />
                        <View
                            style={{
                                position: 'absolute',
                                width: 24,
                                height: 24,
                                backgroundColor: 'rgba(0,0,0,0.2)',
                                borderRadius: 100,
                                zIndex: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)',
                                shadowRadius: 8,
                                shadowOpacity: 1
                            }}
                        />
                    </View>
                </TouchableOpacity>
            )}
        </View>
    );
});
