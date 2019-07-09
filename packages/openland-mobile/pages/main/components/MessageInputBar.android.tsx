import * as React from 'react';
import { View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { androidMessageInputListOverlap } from './ConversationView';
import { SDevice } from 'react-native-s/SDevice';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { MessageInputInner, MessageInputBarProps } from './MessageInputInner';

export const MessageInputBar = React.forwardRef((props: MessageInputBarProps, ref: any) => {
    let theme = React.useContext(ThemeContext);

    return (
        <View marginBottom={SDevice.safeArea.bottom}>
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

                <MessageInputInner {...props} theme={theme} ref={ref} />
            </View>
        </View>
    );
});