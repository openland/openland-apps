import * as React from 'react';
import { ASFlex } from 'react-native-async-view/ASFlex';
import { AsyncAvatar } from './AsyncAvatar';
import { ConversationEngine, DataSourceMessageItem } from 'openland-engines/messenger/ConversationEngine';
import { ASPressEvent } from 'react-native-async-view/ASPressEvent';
import { AsyncMessageContentView } from './AsyncMessageContentView';
import { AsyncMessageReactionsView } from './AsyncMessageReactionsView';
import { useThemeGlobal } from 'openland-mobile/themes/ThemeContext';
import { useMessageSelected } from 'openland-engines/messenger/MessagesActionsState';
import { ASImage } from 'react-native-async-view/ASImage';
import { rm } from 'react-native-async-view/internals/baseStyleProcessor';
import { ThemeGlobal } from 'openland-y-utils/themes/ThemeGlobal';
import { UnsupportedContent } from './content/UnsupportedContent';
import { buildBaseImageUrl } from 'openland-y-utils/photoRefUtils';

const SelectCheckbox = React.memo((props: { engine: ConversationEngine, message: DataSourceMessageItem, theme: ThemeGlobal }) => {
    const [selected, toggleSelect] = useMessageSelected(props.engine.messagesActionsStateEngine, props.message);
    return (
        <ASFlex marginLeft={-200} renderModes={rm({ 'selection': { marginLeft: 8 } })} overlay={true} alignItems="center">
            <ASFlex onPress={toggleSelect} width={24} height={24} borderRadius={12} backgroundColor={selected ? props.theme.accentPrimary : props.theme.foregroundQuaternary} >
                <ASFlex overlay={true} alignItems="center" justifyContent="center">
                    <ASFlex width={22} height={22} borderRadius={11} alignItems="center" justifyContent="center" backgroundColor={selected ? props.theme.accentPrimary : props.theme.backgroundPrimary}>
                        {selected && <ASImage source={require('assets/ic-checkmark.png')} tintColor={props.theme.foregroundInverted} width={14} height={14} />}
                    </ASFlex>
                </ASFlex>
            </ASFlex>
        </ASFlex>
    );
});

export interface AsyncMessageViewProps {
    conversationId: string;
    message: DataSourceMessageItem;
    engine: ConversationEngine;
    onMessagePress: (message: DataSourceMessageItem) => void;
    onMessageDoublePress: (message: DataSourceMessageItem) => void;
    onMessageLongPress: (message: DataSourceMessageItem) => void;
    onUserPress: (message: DataSourceMessageItem) => (id: string) => void;
    onGroupPress: (message: DataSourceMessageItem) => (id: string) => void;
    onOrganizationPress: (message: DataSourceMessageItem) => (id: string) => void;
    onHashtagPress: (d?: string) => void;
    onDocumentPress: (document: DataSourceMessageItem) => void;
    onMediaPress: (message: DataSourceMessageItem) => (fileMeta: { imageWidth: number, imageHeight: number }, event: { path: string } & ASPressEvent, radius?: number, senderName?: string, date?: number) => void;
    onCommentsPress: (message: DataSourceMessageItem) => void;
    onReplyPress: (message: DataSourceMessageItem, quotedMessage: DataSourceMessageItem) => void;
    onReactionsPress: (message: DataSourceMessageItem) => void;
}

type SendingIndicatorT = 'pending' | 'sending' | 'sent' | 'hide';

const AsyncMessageViewAvatar = (props: { message: DataSourceMessageItem, handleUserPress: (id: string) => void }) => {
    const { isOut, attachBottom, sender, overrideAvatar, overrideName } = props.message;

    if (isOut || attachBottom) {
        return null;
    } else {
        return (
            <ASFlex marginRight={12} onPress={() => props.handleUserPress(sender.id)} alignItems="flex-end">
                <AsyncAvatar
                    size="small"
                    src={overrideAvatar ? buildBaseImageUrl(overrideAvatar) : sender.photo}
                    placeholderKey={sender.id}
                    placeholderTitle={overrideName || sender.name}
                />
            </ASFlex>
        );
    }
};

export const AsyncMessageView = React.memo<AsyncMessageViewProps>((props) => {
    const theme = useThemeGlobal(false);
    const { conversationId, message, engine, onMessageDoublePress, onMessagePress, onMessageLongPress, onUserPress, onGroupPress, onDocumentPress, onMediaPress, onCommentsPress, onReplyPress, onReactionsPress, onOrganizationPress, onHashtagPress } = props;
    const { isOut, attachTop, attachBottom, commentsCount, reactions, isSending } = message;

    const [sendingIndicator, setSendingIndicator] = React.useState<SendingIndicatorT>('hide');

    React.useEffect(() => {
        let timer: any;
        if (isSending && sendingIndicator === 'hide') {
            setSendingIndicator('pending');
            timer = setTimeout(() => {
                setSendingIndicator('sending');
            }, 500);
        }
        if (!isSending && sendingIndicator === 'sending') {
            setSendingIndicator('sent');
            timer = setTimeout(() => {
                setSendingIndicator('hide');
            }, 500);
        }
        return () => {
            clearInterval(timer);
        };
    }, [isSending]);

    const messageRef = React.useRef(message);
    messageRef.current = message;

    let lastTap: number;
    const handlePress = () => {
        onMessagePress(message);

        if (!isSending) {
            const now = Date.now();
            const DOUBLE_PRESS_DELAY = 300;

            if (lastTap && (now - lastTap) < DOUBLE_PRESS_DELAY) {
                onMessageDoublePress(message);
            } else {
                lastTap = now;
            }
        }
    };
    const handleLongPress = React.useCallback(() => onMessageLongPress(message), [message]);
    const handleCommentPress = React.useCallback(() => onCommentsPress(message), [message]);
    const handleMediaPress = onMediaPress(message);
    const handleUserPress = onUserPress(message);
    const handleOrganizationPress = onOrganizationPress(message);
    const handleGroupPress = onGroupPress(message);
    const handleReplyPress = React.useCallback((quoted: DataSourceMessageItem) => onReplyPress(message, quoted), [message]);

    let res;

    if (message.text || message.reply || (message.attachments && message.attachments.length) || message.sticker) {
        res = <AsyncMessageContentView conversationId={conversationId} theme={theme} key={'message-content'} message={message} onMediaPress={handleMediaPress} onLongPress={handleLongPress} onDocumentPress={onDocumentPress} onUserPress={handleUserPress} onGroupPress={handleGroupPress} onOrganizationPress={handleOrganizationPress} onHashtagPress={onHashtagPress} onReplyPress={handleReplyPress} />;
    }

    if (!res) {
        res = <UnsupportedContent message={message} theme={theme} />;
    }

    const showReactions = ((engine.isChannel || commentsCount > 0) || reactions.length > 0) && !isSending;
    const marginTop = attachTop ? 4 : 12;
    const marginBottom = attachBottom && showReactions ? 6 : 0;

    return (
        <ASFlex flexDirection="column" alignItems="stretch" onPress={handlePress} onLongPress={handleLongPress}>
            <ASFlex key="margin-top" height={marginTop} />

            <ASFlex flexDirection="column" flexGrow={1} alignItems="stretch">
                <ASFlex flexDirection="row" flexGrow={1} alignItems="stretch">
                    <ASFlex key="margin-left" renderModes={isOut ? undefined : rm({ 'selection': { width: (attachBottom ? 44 : 0) + 42 } })} width={(attachBottom ? 44 : 0) + 12} />

                    <AsyncMessageViewAvatar handleUserPress={handleUserPress} message={message} />

                    {isOut && (
                        <ASFlex flexGrow={1} flexShrink={1} minWidth={0} flexBasis={0} alignSelf="stretch" alignItems="flex-end" justifyContent="flex-end">
                            <ASFlex marginRight={12} marginBottom={10} width={16} height={16}>
                                {sendingIndicator === 'sending' && (
                                    <ASImage
                                        source={require('assets/ic-recent-16.png')}
                                        width={16}
                                        height={16}
                                        tintColor={theme.foregroundQuaternary}
                                    />
                                )}
                                {sendingIndicator === 'sent' && (
                                    <ASImage
                                        source={require('assets/ic-success-16.png')}
                                        width={16}
                                        height={16}
                                        tintColor={theme.accentPositive}
                                    />
                                )}
                            </ASFlex>
                        </ASFlex>
                    )}

                    {res}

                    <ASFlex key="margin-right" width={12} />
                </ASFlex>

                {showReactions && <AsyncMessageReactionsView theme={theme} message={message} isChannel={engine.isChannel} onCommentsPress={handleCommentPress} onReactionsPress={() => onReactionsPress(message)} />}
            </ASFlex>

            <ASFlex key="margin-bottom" height={marginBottom} />

            <SelectCheckbox engine={engine} message={message} theme={theme} />
        </ASFlex>
    );
});