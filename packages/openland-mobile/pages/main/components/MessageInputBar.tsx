import * as React from 'react';
import { View, TextInput } from 'react-native';
import { ZKeyboardAwareBar } from '../../../components/layout/ZKeyboardAwareBar';
import { SDevice } from 'react-native-s/SDevice';
import { ZBlurredView } from 'openland-mobile/components/ZBlurredView';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { MessageInputBarProps, MessageInputInner } from './MessageInputInner';
import { StickerFragment } from 'openland-api/spacex.types';
import { StickerPicker } from './stickers/StickerPicker';

export const MessageInputBar = React.forwardRef((props: MessageInputBarProps & { reloadButton?: any, onStickerSent?: (sticker: StickerFragment) => void }, ref: React.RefObject<TextInput>) => {
    let theme = React.useContext(ThemeContext);

    return (
        <ZKeyboardAwareBar>
            {props.reloadButton}
            {props.suggestions && (
                <ZBlurredView intensity="normal" style={{ position: 'absolute', bottom: '100%', left: 0, right: 0, marginBottom: SDevice.safeArea.bottom }}>
                    {props.suggestions}
                </ZBlurredView>
            )}

            <View style={{ flexDirection: 'column', alignItems: 'stretch' }}>
                {!!props.topView && (
                    <View marginBottom={-8}>
                        {props.topView}
                    </View>
                )}

                <MessageInputInner {...props} theme={theme} ref={ref} stickerKeyboardShown={props.onStickerSent && props.stickerKeyboardShown} />
            </View>

            {props.stickerKeyboardShown && props.onStickerSent && (
                <StickerPicker theme={theme} onStickerSent={props.onStickerSent} height={props.stickerKeyboardHeight} />
            )}
        </ZKeyboardAwareBar>
    );
});