import * as React from 'react';
import { ASFlex } from 'react-native-async-view/ASFlex';
import { AsyncAvatar } from './AsyncAvatar';
import { ConversationEngine, DataSourceMessageItem } from 'openland-engines/messenger/ConversationEngine';
import { ASPressEvent } from 'react-native-async-view/ASPressEvent';
import { AsyncMessageContentView } from './AsyncMessageContentView';
import { NavigationManager } from 'react-native-s/navigation/NavigationManager';
import { AsyncMessageReactionsView } from './AsyncMessageReactionsView';
import { AsyncBubbleView } from './AsyncBubbleView';
import { TextContent } from './content/TextContent';
import { randomEmptyPlaceholderEmoji } from 'openland-mobile/utils/tolerance';
import { ASText } from 'react-native-async-view/ASText';
import { Platform } from 'react-native';
import { useThemeGlobal } from 'openland-mobile/themes/ThemeContext';
import { ServiceMessageDefault } from './service/ServiceMessageDefaut';
import { useMessageSelected } from 'openland-engines/messenger/MessagesActionsState';
import { ASImage } from 'react-native-async-view/ASImage';
import { XMemo } from 'openland-y-utils/XMemo';
import { rm } from 'react-native-async-view/internals/baseStyleProcessor';
import { ThemeGlobal } from 'openland-y-utils/themes/ThemeGlobal';
import { MessageReactionType } from 'openland-api/Types';
import { SpanType } from 'openland-y-utils/spans/Span';

const SelectCheckbox = XMemo<{ engine: ConversationEngine, message: DataSourceMessageItem, theme: ThemeGlobal }>((props) => {
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
    message: DataSourceMessageItem;
    engine: ConversationEngine;
    onMessageDoublePress: (message: DataSourceMessageItem) => void;
    onMessageLongPress: (message: DataSourceMessageItem) => void;
    onUserPress: (id: string) => void;
    onGroupPress: (id: string) => void;
    onDocumentPress: (document: DataSourceMessageItem) => void;
    onMediaPress: (fileMeta: { imageWidth: number, imageHeight: number }, event: { path: string } & ASPressEvent, radius?: number, senderName?: string, date?: number) => void;
    onReactionPress: (message: DataSourceMessageItem, r: MessageReactionType) => void;
    onCommentsPress: (message: DataSourceMessageItem) => void;
    onReactionsPress: (message: DataSourceMessageItem) => void;
    navigationManager: NavigationManager;
}

export const AsyncMessageView = React.memo<AsyncMessageViewProps>((props) => {

    let theme = useThemeGlobal();
    let lastTap: number;

    let handleUserPress = (id: string) => {
        props.onUserPress(id);
    };
    let handleGroupPress = (id: string) => {
        props.onGroupPress(id);
    };
    let handleDoublePress = () => {
        if (!props.message.isSending) {
            const now = Date.now();
            const DOUBLE_PRESS_DELAY = 300;

            if (lastTap && (now - lastTap) < DOUBLE_PRESS_DELAY) {
                props.onMessageDoublePress(props.message);
            } else {
                lastTap = now;
            }
        }
    };
    let handleLongPress = () => {
        if (!props.message.isSending) {
            props.onMessageLongPress(props.message);
        }
    };
    let handleCommentsPress = () => {
        props.onCommentsPress(props.message);
    };
    let handleReactionsPress = () => {
        props.onReactionsPress(props.message);
    };

    let res;

    if (props.message.isService) {
        return <ServiceMessageDefault message={props.message} onUserPress={handleUserPress} onGroupPress={handleGroupPress} theme={theme} />;
    }

    if ((props.message.text || props.message.reply || (props.message.attachments && props.message.attachments.length))) {
        res =
            <AsyncMessageContentView theme={theme} key={'message-content'} message={props.message} onMediaPress={props.onMediaPress} onDocumentPress={props.onDocumentPress} onUserPress={props.onUserPress} onGroupPress={handleGroupPress} />;
    }
    if (!res) {
        const unsupportedText = 'Message is not supported on your version of Openland.\nPlease update the app to view it.';
        res =
            <AsyncBubbleView key="message-unsupported" isOut={props.message.isOut} attachTop={props.message.attachTop} attachBottom={props.message.attachBottom} colorIn={theme.bubbleIn} colorOut={theme.bubbleOut}>
                <ASFlex overlay={true} flexGrow={1} alignItems="center">
                    <ASText marginLeft={Platform.OS === 'ios' ? 15 : 2} fontSize={30}>{randomEmptyPlaceholderEmoji()}</ASText>
                </ASFlex>
                <ASFlex flexDirection="column" marginLeft={Platform.OS === 'ios' ? 45 : 50}>
                    <TextContent
                        emojiOnly={false}
                        theme={theme}
                        fontStyle="italic"
                        message={{ ...props.message, spans: undefined, textSpans: [{ type: SpanType.italic, offset: 0, length: unsupportedText.length, childrens: [{ type: SpanType.text, text: unsupportedText, offset: 0, length: unsupportedText.length }] }], attachments: [], text: unsupportedText }}
                        onUserPress={props.onUserPress}
                        onGroupPress={props.onGroupPress}
                        onDocumentPress={props.onDocumentPress}
                        onMediaPress={props.onMediaPress}
                    />
                </ASFlex>
            </AsyncBubbleView>;
    }

    return (
        <ASFlex flexDirection="column" alignItems="stretch" onPress={handleDoublePress} onLongPress={handleLongPress} backgroundColor={!props.message.isOut ? theme.backgroundPrimary : undefined}>

            <ASFlex key="margin-top" backgroundColor={theme.backgroundPrimary} height={(props.message.attachTop ? 2 : 14) + 2} marginTop={-2} />

            <ASFlex flexDirection="column" flexGrow={1} alignItems="stretch">
                <ASFlex flexDirection="row" flexGrow={1} alignItems="stretch">
                    <ASFlex key="margin-left-1" renderModes={props.message.isOut ? undefined : rm({ 'selection': { width: (props.message.attachBottom ? 44 : 0) + 42 } })} backgroundColor={theme.backgroundPrimary} width={(props.message.attachBottom ? 44 : 0) + 12} />

                    {!props.message.isOut && !props.message.attachBottom &&
                        <ASFlex marginRight={12} onPress={() => handleUserPress(props.message.senderId)} alignItems="flex-end">
                            <AsyncAvatar
                                size="small"
                                src={props.message.senderPhoto}
                                placeholderKey={props.message.senderId}
                                placeholderTitle={props.message.senderName}
                            />
                        </ASFlex>
                    }

                    {props.message.isOut && <ASFlex backgroundColor={theme.backgroundPrimary} flexGrow={1} flexShrink={1} minWidth={0} flexBasis={0} alignSelf="stretch" />}

                    {res}

                    <ASFlex key="margin-right" backgroundColor={theme.backgroundPrimary} width={12} />
                </ASFlex>

                {!props.message.isSending && (<AsyncMessageReactionsView theme={theme} message={props.message} isChannel={props.engine.isChannel} onCommentsPress={handleCommentsPress} onReactionsPress={handleReactionsPress} />)}

                <ASFlex backgroundColor={theme.backgroundPrimary} height={50} marginBottom={-50} />
            </ASFlex>

            <ASFlex key="margin-bottom" backgroundColor={theme.backgroundPrimary} height={4} marginBottom={-2} />
            <SelectCheckbox engine={props.engine} message={props.message} theme={theme} />

        </ASFlex>
    );
});