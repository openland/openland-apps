import * as React from 'react';
import { View } from 'react-native';
import { ZKeyboardAwareBar } from '../../../components/layout/ZKeyboardAwareBar';
import { SDevice } from 'react-native-s/SDevice';
import { ZBlurredView } from 'openland-mobile/components/ZBlurredView';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { MessageInputBarProps, MessageInputInner } from './MessageInputInner';

export const MessageInputBar = React.forwardRef((props: MessageInputBarProps, ref: any) => {
    let theme = React.useContext(ThemeContext);

    return (
        <ZKeyboardAwareBar>
            {props.suggestions && (
                <ZBlurredView intensity="normal" style={{ position: 'absolute', bottom: '100%', left: 0, right: 0, marginBottom: SDevice.safeArea.bottom }}>
                    {props.suggestions}
                </ZBlurredView>
            )}

            <View style={{ flexDirection: 'column', alignItems: 'stretch' }}>
                {props.topView}

                <MessageInputInner {...props} theme={theme} ref={ref} />
            </View>
        </ZKeyboardAwareBar>
    );
});