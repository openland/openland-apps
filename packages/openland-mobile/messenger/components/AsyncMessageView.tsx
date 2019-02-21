import * as React from 'react';
import { ASFlex } from 'react-native-async-view/ASFlex';
import { AsyncAvatar } from './AsyncAvatar';
import { ConversationEngine, DataSourceMessageItem } from 'openland-engines/messenger/ConversationEngine';
import { ASPressEvent } from 'react-native-async-view/ASPressEvent';
import { AsyncMessageContentView } from './AsyncMessageContentView';
import { AsyncMessageIntroView } from './AsyncMessageIntroView';
import { NavigationManager } from 'react-native-s/navigation/NavigationManager';
import { AsyncMessageReactionsView } from './AsyncMessageReactionsView';
import { AsyncBubbleView } from './AsyncBubbleView';
import { DefaultConversationTheme } from 'openland-mobile/pages/main/themes/ConversationThemeResolver';
import { TextContent } from './content/TextContent';
import { randomEmptyPlaceholderEmoji } from 'openland-mobile/utils/tolerance';
import { ASText } from 'react-native-async-view/ASText';

export interface AsyncMessageViewProps {
    message: DataSourceMessageItem;
    engine: ConversationEngine;
    onMessageLongPress: (message: DataSourceMessageItem) => void;
    onAvatarPress: (id: string) => void;
    onDocumentPress: (document: DataSourceMessageItem) => void;
    onMediaPress: (media: DataSourceMessageItem, event: { path: string } & ASPressEvent) => void;
    navigationManager: NavigationManager;
}

let renderSpecialMessage = (message: DataSourceMessageItem, navigationManager: NavigationManager, onDocumentPress: (document: DataSourceMessageItem) => void) => {
    let type: string | undefined | null;
    let urlAugmnentation = message.urlAugmentation;
    type = urlAugmnentation ? urlAugmnentation.type : undefined;

    if (type === 'intro') {
        return (
            <AsyncMessageIntroView message={message} navigationManager={navigationManager} onDocumentPress={onDocumentPress} />
        );
    }

    return null;
};

export const messageBgColor = 'white';

export class AsyncMessageView extends React.PureComponent<AsyncMessageViewProps> {

    // themeSub?: () => void;

    // constructor(props: AsyncMessageViewProps) {
    //     super(props);
    //     this.state = { theme: getDefaultConversationTheme(props.engine.conversationId) }
    // }

    // componentWillMount() {
    //     ConversationThemeResolver.subscribe(this.props.engine.conversationId, theme => this.setState({ theme: theme })).then(sub => this.themeSub = sub);

    // }

    // componentWillUnmount() {
    //     if (this.themeSub) {
    //         this.themeSub();
    //     }
    // }

    private handleAvatarPress = () => {
        this.props.onAvatarPress(this.props.message.senderId);
    }

    private handleLongPress = () => {
        this.props.onMessageLongPress(this.props.message);
    }

    render() {
        let res = [];
        if ((this.props.message.text || this.props.message.reply || this.props.message.file)) {
            res.push(
                <AsyncMessageContentView key={'message-content'} engine={this.props.engine} message={this.props.message} onMediaPress={this.props.onMediaPress} onDocumentPress={this.props.onDocumentPress} onUserPress={this.props.onAvatarPress} />
            );
        }
        if (res.length === 0) {
            res.push(
                <AsyncBubbleView key={'message-unsupported'} isOut={this.props.message.isOut} compact={this.props.message.attachBottom} colorIn={DefaultConversationTheme.bubbleColorIn}>
                    <ASFlex overlay={true} flexGrow={1} alignItems="center">
                        <ASText marginLeft={20} fontSize={30}>{randomEmptyPlaceholderEmoji()}</ASText>
                    </ASFlex>
                    <ASFlex flexDirection="column" marginLeft={40}>
                        <TextContent padded={false} message={{ ...this.props.message, text: 'Message is not supported on your version of Openland.\nPlease update the app to view it.' }} onUserPress={this.props.onAvatarPress} onDocumentPress={this.props.onDocumentPress} onMediaPress={this.props.onMediaPress} />
                    </ASFlex>
                </AsyncBubbleView >
            );

        }
        return (
            <ASFlex flexDirection="column" alignItems="stretch" onLongPress={this.handleLongPress} backgroundColor={!this.props.message.isOut ? messageBgColor : undefined}>

                <ASFlex key="margin-top" backgroundColor={messageBgColor} height={(this.props.message.attachTop ? 2 : 14) + 2} marginTop={-2} />

                <ASFlex flexDirection="column" flexGrow={1} alignItems="stretch">

                    <ASFlex flexDirection="row" flexGrow={1} alignItems="stretch">
                        <ASFlex key="margin-left-1" backgroundColor={messageBgColor} width={(this.props.message.attachBottom ? 36 : 0) + 10} />

                        {!this.props.message.isOut && !this.props.message.attachBottom &&
                            <ASFlex marginRight={3} onPress={this.handleAvatarPress} alignItems="flex-end">
                                <AsyncAvatar
                                    size={32}
                                    src={this.props.message.senderPhoto}
                                    placeholderKey={this.props.message.senderId}
                                    placeholderTitle={this.props.message.senderName}
                                />
                            </ASFlex>
                        }
                        <ASFlex key="margin-left-2" backgroundColor={messageBgColor} width={(this.props.message.isOut ? 10 : 0)} />

                        {this.props.message.isOut && <ASFlex backgroundColor={messageBgColor} flexGrow={1} flexShrink={1} minWidth={0} flexBasis={0} alignSelf="stretch" />}
                        <ASFlex flexDirection="column" alignItems="stretch" marginLeft={this.props.message.isOut ? -4 : 0}>
                            {res}
                        </ASFlex>
                        <ASFlex key="margin-right" backgroundColor={messageBgColor} width={4} />

                    </ASFlex>

                    {this.props.message.reactions && <AsyncMessageReactionsView message={this.props.message} />}
                    <ASFlex backgroundColor="white" height={50} marginBottom={-50} />

                </ASFlex>
                <ASFlex key="margin-bottom" backgroundColor={messageBgColor} height={4} marginBottom={-2} />

            </ASFlex>
        );
    }
}