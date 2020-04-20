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
        <TouchableOpacity onPress={props.showPicker}>
            <View width={width} height={height} borderRadius={radius}>
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
                    position="absolute"
                    alignItems="center"
                    justifyContent="center"
                    style={{
                        width,
                        height,
                        borderRadius: radius,
                        backgroundColor: props.url
                            ? theme.overlayLight
                            : theme.backgroundTertiaryTrans,
                    }}
                >
                    {!props.loading && (
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
    );
});
