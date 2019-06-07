import * as React from 'react';
import { ASText } from 'react-native-async-view/ASText';
import { ASFlex } from 'react-native-async-view/ASFlex';
import { ASImage } from 'react-native-async-view/ASImage';
import { AppTheme } from 'openland-mobile/themes/themes';
import { DataSourceMessageItem } from 'openland-engines/messenger/ConversationEngine';
import { formatTime } from 'openland-mobile/utils/formatTime';

interface EmojiOnlyContentProps {
    theme: AppTheme;
    message: DataSourceMessageItem;
    content: any[];
}

export const EmojiOnlyContent = React.memo<EmojiOnlyContentProps>((props) => {
    const { theme, message, content } = props;

    return (
        <ASFlex backgroundColor={theme.backgroundColor}>
            <ASFlex flexDirection="column" alignItems="stretch" marginRight={message.isOut ? 6 : undefined}>
                {content}

                <ASFlex
                    alignItems="flex-end"
                    justifyContent={message.isOut ? 'flex-end' : 'flex-start'}
                    marginLeft={!message.isOut ? 2 : undefined}
                >
                    <ASFlex
                        flexDirection="row"
                        height={14}
                        backgroundColor={theme.reactionsBackground}
                        borderRadius={4}
                        alignItems="center"
                        justifyContent="center"
                    >
                        {message.isEdited && (
                            <ASFlex width={10} height={10} marginTop={1} marginLeft={5} justifyContent="flex-start" alignItems="center">
                                <ASImage source={require('assets/ic-edited-10.png')} width={10} height={10} tintColor={theme.reactionsColor} opacity={message.isOut ? 0.7 : 0.5} />
                            </ASFlex>
                        )}
                        <ASText
                            marginLeft={3}
                            marginRight={!message.isOut ? 3 : 0}
                            fontSize={11}
                            color={theme.reactionsColor}
                        >
                            {formatTime(message.date)}
                        </ASText>
                        {message.isOut && (
                            <ASFlex width={13} height={13} marginLeft={3} marginTop={1} marginRight={0} justifyContent="flex-start" alignItems="center">
                                {message.isSending && <ASImage source={require('assets/ic-status-sending-10.png')} width={10} height={10} tintColor={theme.reactionsColor} opacity={0.7} />}
                                {!message.isSending && <ASImage source={require('assets/ic-status-sent-10.png')} width={10} height={10} tintColor={theme.reactionsColor} opacity={0.7} />}
                            </ASFlex>
                        )}
                    </ASFlex>
                </ASFlex>
            </ASFlex>
        </ASFlex>
    );
});