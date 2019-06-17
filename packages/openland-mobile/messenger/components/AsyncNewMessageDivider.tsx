import * as React from 'react';
import { ASFlex } from 'react-native-async-view/ASFlex';
import { ASText } from 'react-native-async-view/ASText';
import { AppTheme } from 'openland-mobile/themes/themes';
import { useThemeGlobal } from 'openland-mobile/themes/ThemeContext';

export const AsyncNewMessageDivider = React.memo((props) => {
    let theme = useThemeGlobal();

    return (
        <ASFlex alignItems="center" justifyContent="center" backgroundColor={theme.backgroundColor}>
            <ASText marginTop={20} marginBottom={4} color="#8a8a8f" fontSize={14} height={20} marginLeft={6} marginRight={6}>{'New messages'}</ASText>
        </ASFlex>
    );
});