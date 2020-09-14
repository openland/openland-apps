import * as React from 'react';
import { View } from 'react-native';
import { SDevice } from 'react-native-s/SDevice';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { MessageInputInner, MessageInputBarProps } from './MessageInputInner';
import { StickerPicker } from './stickers/StickerPicker';
import { StickerFragment } from 'openland-api/spacex.types';

export const MessageInputBar = React.forwardRef((props: MessageInputBarProps & { reloadButton: any, onStickerSent?: (sticker: StickerFragment) => void }, ref: any) => {
    const { reloadButton, onStickerSent, suggestions, topView, stickerKeyboardShown, stickerKeyboardHeight } = props;

    let theme = React.useContext(ThemeContext);

    return (
        <>
            {reloadButton}
            <View marginBottom={SDevice.safeArea.bottom}>
                <View style={{ flexDirection: 'column', alignItems: 'stretch' }}>
                    {suggestions && (
                        <View style={{ backgroundColor: theme.backgroundPrimary, position: 'absolute', bottom: '100%', left: 0, right: 0 }}>
                            {suggestions}
                        </View>
                    )}

                    {topView && (
                        <View backgroundColor={theme.backgroundPrimary}>
                            {topView}
                        </View>
                    )}

                    <MessageInputInner
                        {...props}
                        theme={theme}
                        ref={ref}
                        stickerKeyboardShown={onStickerSent && stickerKeyboardShown}
                    />

                    {stickerKeyboardShown && onStickerSent && (
                        <StickerPicker theme={theme} onStickerSent={onStickerSent} height={stickerKeyboardHeight} />
                    )}
                </View>
            </View>
        </>
    );
});