import * as React from 'react';
import { ASFlex } from 'react-native-async-view/ASFlex';
import { ASText } from 'react-native-async-view/ASText';
import { useThemeGlobal } from 'openland-mobile/themes/ThemeContext';

export const AsyncNewMessageDivider = React.memo((props) => {
    const theme = useThemeGlobal();

    return (
        <ASFlex alignSelf="stretch" alignItems="center" flexDirection="row" marginLeft={12} marginRight={12} height={32} marginTop={4}>
            <ASFlex height={0.5} backgroundColor={theme.foregroundQuaternary} flexGrow={1} flexShrink={1} flexBasis={0} alignSelf="center" />
            <ASFlex backgroundColor={theme.backgroundPrimary}>
                <ASText color={theme.foregroundSecondary} fontSize={13} marginLeft={12} marginRight={12}>
                    New messages
                </ASText>
            </ASFlex>
            <ASFlex height={0.5} backgroundColor={theme.foregroundQuaternary} flexGrow={1} flexShrink={1} flexBasis={0} alignSelf="center" />
        </ASFlex>
    );
});