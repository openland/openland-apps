import * as React from 'react';
import { View, TextInput } from 'react-native';
import { ZKeyboardAwareBar } from '../../../components/layout/ZKeyboardAwareBar';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { MessageInputBarProps, MessageInputInner } from './MessageInputInner';
import { ASKeyboardTracker } from 'react-native-async-view/ASKeyboardTracker';

export const MessageInputBar = React.forwardRef((props: MessageInputBarProps & { reloadButton?: any, useTracker?: boolean }, ref: React.RefObject<TextInput>) => {
    let theme = React.useContext(ThemeContext);

    const Wrapper = props.useTracker ? ASKeyboardTracker : ZKeyboardAwareBar;

    return (
        <>
            {props.reloadButton}
            <Wrapper disableTransform={!!props.useTracker}>
                <View style={{ flexDirection: 'column', alignItems: 'stretch' }}>
                    {props.suggestions && (
                        <View style={{ backgroundColor: theme.backgroundPrimary, position: 'absolute', bottom: '100%', left: 0, right: 0 }}>
                            {props.suggestions}
                        </View>
                    )}

                    {props.topView && (
                        <View backgroundColor={theme.backgroundPrimary}>
                            {props.topView}
                        </View>
                    )}

                    <MessageInputInner
                        {...props}
                        theme={theme}
                        ref={ref}
                        stickerKeyboardShown={props.stickerKeyboardShown}
                    />
                </View>
            </Wrapper>
        </>
    );
});