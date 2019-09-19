import * as React from 'react';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { View, Text, StyleSheet, ViewStyle, TextStyle, ImageStyle, Image } from 'react-native';
import { TextStyles } from 'openland-mobile/styles/AppStyles';

const styles = StyleSheet.create({
    previewContainer: {
        width: 72,
        height: 72,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    } as ViewStyle,
    ext: {
        ...TextStyles.Label2,
        color: '#FFF',
        position: 'absolute',
        bottom: 10,
        width: 72,
        textAlign: 'center'
    } as TextStyle,
    previewCornerImages: {
        position: 'absolute',
        right: 0,
        top: 0,
        flexDirection: 'column'
    } as ViewStyle,
    previewBackground: {
        position: 'absolute',
        top: 0,
        left: 0
    },
    arrowDownIcon: {
        tintColor: '#FFF'
    } as ImageStyle
});

export const ZFileIconPreview = (props: { ext: string; }) => {
    const theme = React.useContext(ThemeContext);

    const fileTypesColor = {
        'xlsx': theme.tintGreen,
        'zip': theme.tintOrange,
        'pdf': theme.tintRed
    };

    const tintColor = fileTypesColor[props.ext] || theme.accentPrimary;

    return (
        <View style={styles.previewContainer}>
            <Image
                source={require('assets/ic-document-preview-72.png')}
                style={[styles.previewBackground, { tintColor }]}
            />
            <View style={styles.previewCornerImages}>
                <Image source={require('assets/ic-file-preview-corner-1-18.png')} />
                <Image source={require('assets/ic-file-preview-corner-2-18.png')} />
            </View>
            {!!props.ext ? (
                <Text style={styles.ext}>{props.ext.toUpperCase()}</Text>
            ) : (
                    <Image
                        source={require('assets/ic-down-24.png')}
                        style={styles.arrowDownIcon}
                    />
                )}
        </View>
    );
};