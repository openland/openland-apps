import * as React from 'react';
import { View, ViewStyle, StyleSheet } from 'react-native';
import { RadiusStyles } from 'openland-mobile/styles/AppStyles';
import { useTheme } from 'openland-mobile/themes/ThemeContext';
import FastImage from 'react-native-fast-image';

interface DiscoverCoverProps extends ViewStyle {
    path?: string;
}

export const DiscoverCover = (props: DiscoverCoverProps) => {
    let theme = useTheme();
    const {width, height, path, ...other} = props;
    return (
        <View 
            style={{
                position: 'relative',
                width: props.width,
                height: props.height,
                borderRadius: RadiusStyles.Large,
                backgroundColor: theme.backgroundTertiary,
            }}
            {...other}
        >
            <FastImage 
                source={{uri: props.path}}
                style={{
                    ...StyleSheet.absoluteFillObject,
                    width: props.width,
                    height: props.height,
                    borderRadius: RadiusStyles.Large,
                }}
            />
            <View 
                style={{
                    ...StyleSheet.absoluteFillObject, 
                    borderRadius: RadiusStyles.Large,
                    borderWidth: 0.5,
                    borderColor: theme.border, 
                }} 
            />
        </View>
    );
};
