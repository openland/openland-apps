import * as React from 'react';
import { ASFlex } from 'react-native-async-view/ASFlex';
import { ASText } from 'react-native-async-view/ASText';
import { useThemeGlobal } from 'openland-mobile/themes/ThemeContext';
import { Dimensions } from 'react-native';

const screenWidth = Dimensions.get('screen').width;

export const AsyncNewMessageDivider = React.memo((props) => {
    const theme = useThemeGlobal();

    return (
        <ASFlex width={screenWidth} flexDirection="row" backgroundColor={theme.backgroundPrimary} marginLeft={12} marginRight={12} height={32}>
            <ASFlex height={0.5} backgroundColor={theme.foregroundQuaternary} flexGrow={1} flexShrink={1} flexBasis={0} alignSelf="stretch" marginTop={8} />
            <ASFlex backgroundColor={theme.backgroundPrimary}>
                <ASText color={theme.foregroundSecondary} fontSize={13} marginLeft={12} marginRight={12}>
                    New messages
                </ASText>
            </ASFlex>
            <ASFlex height={0.5} backgroundColor={theme.foregroundQuaternary} flexGrow={1} flexShrink={1} flexBasis={0} alignSelf="stretch" marginTop={8} />
        </ASFlex>
    );
});