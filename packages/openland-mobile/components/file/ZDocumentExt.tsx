import * as React from 'react';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { View, Text, StyleSheet, ViewStyle, TextStyle, Image } from 'react-native';
import { TextStyles } from 'openland-mobile/styles/AppStyles';
import { LoaderSpinner } from '../LoaderSpinner';
import { colorByExtension } from 'openland-mobile/utils/colorByExtension';

const styles = StyleSheet.create({
    box: {
        width: 72,
        height: 72,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    } as ViewStyle,
    background: {
        position: 'absolute',
        top: 0,
        left: 0
    },
    corners: {
        position: 'absolute',
        right: 0,
        top: 0,
        flexDirection: 'column'
    } as ViewStyle,
    label: {
        ...TextStyles.Detail,
        position: 'absolute',
        bottom: 8,
        left: 4, right: 4,
        textAlign: 'center'
    } as TextStyle,
    labelLarge: {
        ...TextStyles.Label2,
        position: 'absolute',
        bottom: 12,
        left: 8, right: 8,
        textAlign: 'center'
    } as TextStyle,
    loader: {
        position: 'absolute',
        top: 0, right: 0, left: 0, bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    } as ViewStyle,
});

const getExtension = (name: string) => {
    const nameSplit = name.split('.');

    return nameSplit.length > 1 ? nameSplit[nameSplit.length - 1] : 'file';
};

interface ZDocumentExtProps {
    name: string;
    loading?: boolean;
    size?: 'medium' | 'large';
}

export const ZDocumentExt = (props: ZDocumentExtProps) => {
    const theme = React.useContext(ThemeContext);
    const { name, loading, size = 'medium' } = props;

    const ext = getExtension(name);
    const boxSize = size === 'large' ? 72 : 40;
    const cornerFirstImage = size === 'large' ? require('assets/ic-file-preview-corner-1-18.png') : require('assets/ic-file-preview-corner-1-10.png');
    const cornerSecondImage = size === 'large' ? require('assets/ic-file-preview-corner-2-18.png') : require('assets/ic-file-preview-corner-2-10.png');
    const containerImage = size === 'large' ? require('assets/ic-document-preview-72.png') : require('assets/ic-document-preview-40.png');
    const tintColor = theme.type === 'Light' ? (colorByExtension(ext, theme) || theme.accentPrimary) : theme.tintInverted;

    return (
        <View style={[styles.box, { width: boxSize, height: boxSize }]}>
            <Image
                source={containerImage}
                style={[styles.background, { tintColor }]}
            />
            <View style={styles.corners}>
                <Image source={cornerFirstImage} />
                <Image source={cornerSecondImage} />
            </View>
            {!loading && (
                <Text style={[size === 'large' ? styles.labelLarge : styles.label, { color: theme.foregroundContrast }]} numberOfLines={1} ellipsizeMode="tail" allowFontScaling={false}>
                    {ext.toUpperCase()}
                </Text>
            )}
            {loading && (
                <View style={styles.loader}>
                    <LoaderSpinner size={size === 'large' ? 'medium' : 'small'} color={theme.foregroundContrast} />
                </View>
            )}
        </View>
    );
};