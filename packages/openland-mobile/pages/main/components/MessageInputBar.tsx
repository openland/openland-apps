import * as React from 'react';
import { View, TextInput } from 'react-native';
import { ZKeyboardAwareBar } from '../../../components/layout/ZKeyboardAwareBar';
import { SDevice } from 'react-native-s/SDevice';
import { ZBlurredView } from 'openland-mobile/components/ZBlurredView';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { MessageInputBarProps, MessageInputInner } from './MessageInputInner';

export const MessageInputBar = React.forwardRef((props: MessageInputBarProps & { bottomView?: any, reloadButton?: any, overrideTransform?: number }, ref: React.RefObject<TextInput>) => {
    let theme = React.useContext(ThemeContext);

    return (
        <ZKeyboardAwareBar overrideTransform={props.overrideTransform}>
            {props.reloadButton}
            {props.suggestions && (
                <ZBlurredView intensity="normal" style={{ position: 'absolute', bottom: '100%', left: 0, right: 0, marginBottom: SDevice.safeArea.bottom }}>
                    {props.suggestions}
                </ZBlurredView>
            )}

            <View style={{ flexDirection: 'column', alignItems: 'stretch', position: 'relative' }}>
                {!!props.topView && (
                    <View style={{ marginBottom: -8 }}>
                        {props.topView}
                    </View>
                )}

                <MessageInputInner {...props} theme={theme} ref={ref} stickerKeyboardShown={props.stickerKeyboardShown} />
                {props.bottomView}
            </View>
        </ZKeyboardAwareBar>
    );
});