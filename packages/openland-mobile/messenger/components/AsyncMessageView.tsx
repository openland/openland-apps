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
import { DefaultConversationTheme } from 'openland-mobile/pages/main/themes/ConversationThemeResolver';
import { useThemeGlobal } from 'openland-mobile/themes/ThemeContext';
import { AsyncMessageChannelReactionsView } from './AsyncMessageChannelReactionsView';
import { SRouter } from 'react-native-s/SRouter';

export interface AsyncMessageViewProps {
    message: DataSourceMessageItem;
    engine: ConversationEngine;
    onMessageLongPress: (message: DataSourceMessageItem) => void;
    onAvatarPress: (id: string) => void;
    onDocumentPress: (document: DataSourceMessageItem) => void;
    onMediaPress: (fileMeta: { imageWidth: number, imageHeight: number }, event: { path: string } & ASPressEvent) => void;
    onReactionPress: (message: DataSourceMessageItem, r: string) => void;
    onCommentsPress: (message: DataSourceMessageItem) => void;
    navigationManager: NavigationManager;
}

export const AsyncMessageView = React.memo<AsyncMessageViewProps>((props) => {

    let theme = useThemeGlobal();

    let handleAvatarPress = () => {
        props.onAvatarPress(props.message.senderId);
    }
    let handleLongPress = () => {
        props.onMessageLongPress(props.message);
    }

    let res;
    if ((props.message.text || props.message.reply || (props.message.attachments && props.message.attachments.length))) {
        res =
            <AsyncMessageContentView theme={theme} key={'message-content'} engine={props.engine} message={props.message} onMediaPress={props.onMediaPress} onDocumentPress={props.onDocumentPress} onUserPress={props.onAvatarPress} />;
    }
    if (!res) {
        res =
            <AsyncBubbleView key={'message-unsupported'} isOut={props.message.isOut} compact={props.message.attachBottom} appearance="text" colorIn={DefaultConversationTheme.bubbleColorIn} backgroundColor={theme.backgroundColor}>
                <ASFlex overlay={true} flexGrow={1} alignItems="center">
                    <ASText marginLeft={Platform.OS === 'android' ? undefined : 20} fontSize={30}>{randomEmptyPlaceholderEmoji()}</ASText>
                </ASFlex>
                <ASFlex flexDirection="column" marginLeft={Platform.OS === 'android' ? 50 : 40}>
                    <TextContent
                        padded={false}
                        fontStyle="italic"
                        message={{ ...props.message, spans: undefined, attachments: [], text: 'Message is not supported on your version of Openland.\nPlease update the app to view it.' }}
                        onUserPress={props.onAvatarPress}
                        onDocumentPress={props.onDocumentPress}
                        onMediaPress={props.onMediaPress}
                        useAsync={true}
                    />
                </ASFlex>
            </AsyncBubbleView>;
    }

    return (
        <ASFlex flexDirection="column" alignItems="stretch" onLongPress={handleLongPress} backgroundColor={!props.message.isOut ? theme.backgroundColor : undefined}>
            <ASFlex key="margin-top" backgroundColor={theme.backgroundColor} height={(props.message.attachTop ? 2 : 14) + 2} marginTop={-2} />

            <ASFlex flexDirection="column" flexGrow={1} alignItems="stretch">
                <ASFlex flexDirection="row" flexGrow={1} alignItems="stretch">
                    <ASFlex key="margin-left-1" backgroundColor={theme.backgroundColor} width={(props.message.attachBottom ? 36 : 0) + 10} />

                    {!props.message.isOut && !props.message.attachBottom &&
                        <ASFlex marginRight={3} onPress={handleAvatarPress} alignItems="flex-end">
                            <AsyncAvatar
                                size={32}
                                src={props.message.senderPhoto}
                                placeholderKey={props.message.senderId}
                                placeholderTitle={props.message.senderName}
                            />
                        </ASFlex>
                    }

                    <ASFlex key="margin-left-2" backgroundColor={theme.backgroundColor} width={(props.message.isOut ? 10 : 0)} />

                    {props.message.isOut && <ASFlex backgroundColor={theme.backgroundColor} flexGrow={1} flexShrink={1} minWidth={0} flexBasis={0} alignSelf="stretch" />}

                    {res}

                    <ASFlex key="margin-right" backgroundColor={theme.backgroundColor} width={4} />
                </ASFlex>

                {!props.engine.isChannel && props.message.reactions && <AsyncMessageReactionsView theme={theme} message={props.message} />}
                {props.engine.isChannel && <AsyncMessageChannelReactionsView theme={theme} message={props.message} onReactionPress={props.onReactionPress} onCommentsPress={props.onCommentsPress} />}

                <ASFlex backgroundColor={theme.backgroundColor} height={50} marginBottom={-50} />
            </ASFlex>

            <ASFlex key="margin-bottom" backgroundColor={theme.backgroundColor} height={4} marginBottom={-2} />
        </ASFlex>
    );
});