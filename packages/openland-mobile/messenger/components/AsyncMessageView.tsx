import * as React from 'react';
import { ASFlex } from 'react-native-async-view/ASFlex';
import { AsyncAvatar } from './AsyncAvatar';
import { ConversationEngine, DataSourceMessageItem } from 'openland-engines/messenger/ConversationEngine';
import { ASPressEvent } from 'react-native-async-view/ASPressEvent';
import { AsyncMessageContentView } from './AsyncMessageContentView';
import { AsyncMessageReactionsView } from './AsyncMessageReactionsView';
import { useThemeGlobal } from 'openland-mobile/themes/ThemeContext';
import { ASImage } from 'react-native-async-view/ASImage';
import { rm } from 'react-native-async-view/internals/baseStyleProcessor';
import { ThemeGlobal } from 'openland-y-utils/themes/ThemeGlobal';
import { UnsupportedContent } from './content/UnsupportedContent';
import { buildBaseImageUrl } from 'openland-y-utils/photoRefUtils';
import { ChatMessagesActions, MessagesAction } from 'openland-y-utils/MessagesActionsState';
import { useForward } from '../MobileMessenger';
import { useChatMessagesActionsMethods, useChatMessagesSelected, useChatMessagesSelectionMode } from 'openland-y-utils/MessagesActionsState';
import { showStickerPackModal } from 'openland-mobile/pages/main/components/stickers/showStickerPackModal';

const SelectCheckbox = React.memo((props: { selected: boolean, theme: ThemeGlobal, onPress: () => void }) => {
    const { selected, onPress, theme } = props;

    return (
        <ASFlex marginLeft={-200} renderModes={rm({ 'selection': { marginLeft: 8 } })} overlay={true} alignItems="center">
            <ASFlex onPress={onPress} width={24} height={24} borderRadius={12} backgroundColor={selected ? theme.accentPrimary : theme.foregroundQuaternary} >
                <ASFlex overlay={true} alignItems="center" justifyContent="center">
                    <ASFlex width={22} height={22} borderRadius={11} alignItems="center" justifyContent="center" backgroundColor={selected ? theme.accentPrimary : theme.backgroundPrimary}>
                        {selected && <ASImage source={require('assets/ic-checkmark.png')} tintColor={theme.foregroundInverted} width={14} height={14} />}
                    </ASFlex>
                </ASFlex>
            </ASFlex>
        </ASFlex>
    );
});

export interface AsyncMessageViewProps {
    conversationId: string;
    canReply?: boolean;
    message: DataSourceMessageItem;
    engine: ConversationEngine;
    hideReactions?: boolean;
    onMessagePress?: (message: DataSourceMessageItem) => void;
    onMessageDoublePress: (message: DataSourceMessageItem) => void;
    onMessageLongPress?: (message: DataSourceMessageItem, actions: { action?: MessagesAction, reply: ChatMessagesActions['reply'], edit: ChatMessagesActions['edit'], toggleSelect: ChatMessagesActions['toggleSelect'], forward: (messages: DataSourceMessageItem[]) => void }) => void;
    onUserPress: (id: string) => void;
    onGroupPress: (id: string) => void;
    onOrganizationPress: (id: string) => void;
    onHashtagPress: (d?: string, chatId?: string) => void;
    onDocumentPress: (document: DataSourceMessageItem) => void;
    onMediaPress: (fileMeta: { imageWidth: number, imageHeight: number }, event: { path: string } & ASPressEvent, radius?: number, senderName?: string, date?: number) => void;
    onCommentsPress: (messageId: string) => void;
    onReplyPress: (quotedMessage: DataSourceMessageItem) => void;
    onReactionsPress: (message: DataSourceMessageItem) => void;
}

type SendingIndicatorT = 'pending' | 'sending' | 'sent' | 'hide';

const AsyncMessageViewAvatar = (props: { message: DataSourceMessageItem, handleUserPress: (id: string) => void }) => {
    const { isOut, attachBottom, sender, overrideAvatar } = props.message;

    if (isOut || attachBottom) {
        return null;
    } else {
        return (
            <ASFlex marginRight={12} onPress={() => props.handleUserPress(sender.id)} alignItems="flex-end">
                <AsyncAvatar
                    size="small"
                    id={sender.id}
                    photo={overrideAvatar ? buildBaseImageUrl(overrideAvatar) : sender.photo}
                />
            </ASFlex>
        );
    }
};

export const AsyncMessageView = React.memo<AsyncMessageViewProps>((props) => {
    const theme = useThemeGlobal(false);
    const { conversationId, canReply, hideReactions, message, engine, onMessagePress, onMessageDoublePress, onMessageLongPress, onUserPress, onGroupPress, onDocumentPress, onMediaPress, onCommentsPress, onReplyPress, onReactionsPress, onOrganizationPress, onHashtagPress } = props;
    const {
        isOut,
        attachTop,
        attachBottom,
        commentsCount,
        reactionCounters,
        isSending
    } = message;
    const { getState, reply, edit } = useChatMessagesActionsMethods(props.conversationId);
    const [selected, toggleSelect] = useChatMessagesSelected({ conversationId: props.conversationId, messageKey: message.key });
    const isSelecting = useChatMessagesSelectionMode(props.conversationId);

    const [sendingIndicator, setSendingIndicator] = React.useState<SendingIndicatorT>('hide');
    const forward = useForward(conversationId, !canReply);

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
    const handleDoublePress = () => {
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
    const handlePress = () => {
        if (isSelecting) {
            toggleSelect(message);
            return;
        }

        if (message.sticker) {
            showStickerPackModal(message.sticker.pack.id);
            return;
        }

        if (onMessagePress) {
            onMessagePress(message);
        }

        handleDoublePress();
    };
    const handleLongPress = () => {
        if (isSelecting) {
            return;
        }

        if (onMessageLongPress) {
            onMessageLongPress(message, { action: getState().action, reply, edit, toggleSelect, forward });
        }
    };
    const handleCommentPress = React.useCallback(() => {
        if (message.id) {
            onCommentsPress(message.id);
        }
    }, [message]);
    const handleMediaPress = React.useCallback((fileMeta: { imageWidth: number, imageHeight: number }, event: { path: string } & ASPressEvent, radius?: number, senderName?: string, date?: number) => {
        if (isSelecting) {
            toggleSelect(message);
            return;
        }
        onMediaPress(fileMeta, event, radius, senderName, date);
    }, [isSelecting, message]);
    const handleUserPress = React.useCallback((id: string) => {
        if (isSelecting) {
            toggleSelect(message);
            return;
        }
        onUserPress(id);
    }, [isSelecting, message]);
    const handleOrganizationPress = React.useCallback((id: string) => {
        if (isSelecting) {
            toggleSelect(message);
            return;
        }
        onOrganizationPress(id);
    }, [isSelecting, message]);
    const handleGroupPress = React.useCallback((id: string) => {
        if (isSelecting) {
            toggleSelect(message);
            return;
        }
        onGroupPress(id);
    }, [isSelecting, message]);
    const handleReplyPress = React.useCallback((quoted: DataSourceMessageItem) => {
        if (isSelecting) {
            toggleSelect(message);
            return;
        }
        onReplyPress(quoted);
    }, [isSelecting, message]);
    const handleSelectPress = React.useCallback(() => {
        toggleSelect(message);
    }, [message, toggleSelect]);

    let res;

    if (message.text || message.reply || (message.attachments && message.attachments.length) || message.sticker) {
        res = (
            <AsyncMessageContentView
                conversationId={conversationId}
                theme={theme}
                key={'message-content'}
                message={message}
                onMediaPress={handleMediaPress}
                onLongPress={handleLongPress}
                onDocumentPress={onDocumentPress}
                onUserPress={handleUserPress}
                onGroupPress={handleGroupPress}
                onOrganizationPress={handleOrganizationPress}
                onHashtagPress={onHashtagPress}
                onReplyPress={handleReplyPress}
                onPress={handleDoublePress}
            />
        );
    }

    if (!res) {
        res = <UnsupportedContent message={message} theme={theme} />;
    }

    const showReactions = ((engine.isChannel || commentsCount > 0) || reactionCounters.length > 0) && !isSending && !hideReactions;
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

                {showReactions && <AsyncMessageReactionsView theme={theme} message={message} isChannel={engine.isChannel} onCommentsPress={handleCommentPress} onReactionsPress={() => onReactionsPress(message)} onLikePress={onMessageDoublePress} />}
            </ASFlex>

            <ASFlex key="margin-bottom" height={marginBottom} />

            <SelectCheckbox
                selected={selected}
                onPress={handleSelectPress}
                theme={theme}
            />
        </ASFlex>
    );
});