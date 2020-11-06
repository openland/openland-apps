import * as React from 'react';
import { TextInput, View } from 'react-native';
import { SDevice } from 'react-native-s/SDevice';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { MessageInputInner, MessageInputBarProps } from './MessageInputInner';

export const MessageInputBar = React.forwardRef((props: MessageInputBarProps & { bottomView?: any, reloadButton?: any, useTracker?: boolean }, ref: React.RefObject<TextInput>) => {
    const { reloadButton, suggestions, topView, stickerKeyboardShown } = props;

    let theme = React.useContext(ThemeContext);

    return (
        <>
            {reloadButton}
            <View marginBottom={SDevice.safeArea.bottom}>
                <View style={{ flexDirection: 'column', alignItems: 'stretch', position: 'relative' }}>
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
                        stickerKeyboardShown={stickerKeyboardShown}
                    />

                    {props.bottomView}
                </View>
            </View>
        </>
    );
});