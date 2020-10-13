import * as React from 'react';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { TextStylesAsync } from 'openland-mobile/styles/AppStyles';
import { ASFlex } from 'react-native-async-view/ASFlex';
import { ASImage } from 'react-native-async-view/ASImage';
import { ASText } from 'react-native-async-view/ASText';
import { colorByExtension } from 'openland-mobile/utils/colorByExtension';
import { ASPressEvent } from 'react-native-async-view/ASPressEvent';

const getExtension = (name: string) => {
    const nameSplit = name.split('.');

    return nameSplit.length > 1 ? nameSplit[nameSplit.length - 1] : 'file';
};

interface ASDocumentExtProps {
    name: string;
    isInverted?: boolean;
    size?: 'medium' | 'large';
    onPress?: () => void;
    onLongPress?: (e: ASPressEvent) => void;
}

export const ASDocumentExt = (props: ASDocumentExtProps) => {
    const theme = React.useContext(ThemeContext);
    const { name, size = 'medium', isInverted = false, onPress, onLongPress } = props;

    const ext = getExtension(name);
    const boxSize = size === 'large' ? 72 : 40;
    const cornerSize = size === 'large' ? 18 : 10;
    const cornerFirstImage = size === 'large' ? require('assets/ic-file-preview-corner-1-18.png') : require('assets/ic-file-preview-corner-1-10.png');
    const cornerSecondImage = size === 'large' ? require('assets/ic-file-preview-corner-2-18.png') : require('assets/ic-file-preview-corner-2-10.png');
    const containerImage = size === 'large' ? require('assets/ic-document-preview-72.png') : require('assets/ic-document-preview-40.png');
    const tintColor = theme.type === 'Light' && !isInverted ? (colorByExtension(ext, theme) || theme.accentPrimary) : theme.tintInverted;

    return (
        <ASFlex
            width={boxSize}
            height={boxSize}
            flexDirection="row"
            alignItems="center"
            justifyContent="center"
            onPress={onPress}
            onLongPress={onLongPress}
        >
            <ASImage
                source={containerImage}
                width={boxSize}
                height={boxSize}
                tintColor={tintColor}
            />
            <ASFlex overlay={true} flexDirection="column" alignItems="stretch">
                <ASFlex marginLeft={boxSize - cornerSize} flexDirection="column" width={cornerSize} height={cornerSize * 2}>
                    <ASImage source={cornerFirstImage} width={cornerSize} height={cornerSize} />
                    <ASImage source={cornerSecondImage} width={cornerSize} height={cornerSize} />
                </ASFlex>
                <ASFlex justifyContent="center">
                    <ASText
                        {...size === 'large' ? TextStylesAsync.Label2 : TextStylesAsync.Detail}
                        flexShrink={1}
                        color={theme.foregroundContrast}
                        numberOfLines={1}
                        marginBottom={size === 'large' ? 10 : 4}
                        marginLeft={size === 'large' ? 8 : 4}
                        marginRight={size === 'large' ? 8 : 4}
                    >
                        {ext.toUpperCase()}
                    </ASText>
                </ASFlex>
            </ASFlex>
        </ASFlex>
    );
};