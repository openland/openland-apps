import * as React from 'react';
import { ASFlex } from 'react-native-async-view/ASFlex';
import { ASText } from 'react-native-async-view/ASText';
import { useThemeGlobal } from 'openland-mobile/themes/ThemeContext';
import { Dimensions } from 'react-native';

const screenWidth = Dimensions.get('screen').width;

export const AsyncNewMessageDivider = React.memo((props) => {
    let theme = useThemeGlobal();
    
    return (
        <ASFlex flexDirection={'column'} alignItems="center" justifyContent="center" backgroundColor={theme.backgroundPrimary} marginLeft={12} marginRight={12} height={32} marginBottom={-6}>
            <ASFlex width={screenWidth - 24} height={0.5} backgroundColor={theme.foregroundQuaternary} />
            <ASFlex marginTop={-8} backgroundColor={theme.backgroundPrimary}>
                <ASText color={theme.foregroundSecondary} fontSize={13} marginLeft={12} marginRight={12}>
                    New messages
                </ASText>
            </ASFlex>
        </ASFlex>
    );
});