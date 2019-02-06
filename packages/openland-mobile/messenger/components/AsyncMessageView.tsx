import * as React from 'react';
import { ASFlex } from 'react-native-async-view/ASFlex';
import { AsyncAvatar } from './AsyncAvatar';
import { ConversationEngine, DataSourceMessageItem } from 'openland-engines/messenger/ConversationEngine';
import { AsyncMessageMediaView } from './AsyndMessageMediaView';
import { ASPressEvent } from 'react-native-async-view/ASPressEvent';
import { AsyncMessageTextView } from './AsyncMessageTextView';
import { AsyncMessageDocumentView } from './AsyncMessageDocumentView';
import { AsyncMessageIntroView, renderButtons } from './AsyncMessageIntroView';
import { NavigationManager } from 'react-native-s/navigation/NavigationManager';
import { AsyncMessageReactionsView } from './AsyncMessageReactionsView';
import { Platform } from 'react-native';
import { ASView } from 'react-native-async-view/ASView';
import { ConversationTheme, ConversationThemeResolver, getDefaultConversationTheme } from 'openland-mobile/pages/main/themes/ConversationThemeResolver';

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

    themeSub?: () => void;

    constructor(props: AsyncMessageViewProps) {
        super(props);
        this.state = { theme: getDefaultConversationTheme(props.engine.conversationId) }
    }

    componentWillMount() {
        ConversationThemeResolver.subscribe(this.props.engine.conversationId, theme => this.setState({ theme: theme })).then(sub => this.themeSub = sub);

    }

    componentWillUnmount() {
        if (this.themeSub) {
            this.themeSub();
        }
    }
    private handleAvatarPress = () => {
        this.props.onAvatarPress(this.props.message.senderId);
    }

    private handleLongPress = () => {
        this.props.onMessageLongPress(this.props.message);
    }

    render() {
        let specialMessage = renderSpecialMessage(this.props.message, this.props.navigationManager, this.props.onDocumentPress);

        let ios = Platform.OS === 'ios';
        let isMedia = !specialMessage && this.props.message.file && this.props.message.file.isImage;
        return (
            <ASFlex flexDirection="column" alignItems="stretch" onLongPress={this.handleLongPress} backgroundColor={!this.props.message.isOut ? messageBgColor : undefined}>

                <ASFlex key="margin-top" backgroundColor={messageBgColor} height={this.props.message.attachTop ? 2 : 14} />

                <ASFlex flexDirection="column" flexGrow={1} alignItems="stretch">

                    <ASFlex flexDirection="row" flexGrow={1} alignItems="stretch">
                        <ASFlex key="margin-left" backgroundColor={messageBgColor} width={(this.props.message.attachBottom ? 32 : 0) + 10} />

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
                        <ASFlex key="margin-left" backgroundColor={messageBgColor} width={(isMedia ? 5 : this.props.message.isOut ? 10 : 0)} />

                        {this.props.message.isOut && <ASFlex backgroundColor={messageBgColor} flexGrow={1} flexShrink={1} minWidth={0} flexBasis={0} alignSelf="stretch" />}
                        <ASFlex flexDirection="column" alignItems="stretch" marginLeft={this.props.message.isOut ? -4 : 0}>
                            {!specialMessage && (this.props.message.text || this.props.message.reply) && !this.props.message.file && (
                                <AsyncMessageTextView engine={this.props.engine} message={this.props.message} onMediaPress={this.props.onMediaPress} onDocumentPress={this.props.onDocumentPress} onUserPress={this.props.onAvatarPress} />
                            )}
                            {isMedia && (
                                <AsyncMessageMediaView message={this.props.message} onPress={this.props.onMediaPress} />
                            )}
                            {!specialMessage && this.props.message.file && !this.props.message.file.isImage && (
                                <AsyncMessageDocumentView message={this.props.message} onPress={this.props.onDocumentPress} />
                            )}

                        </ASFlex>
                        <ASFlex key="margin-right" backgroundColor={messageBgColor} width={(isMedia ? 5 : 0) + 4} />

                    </ASFlex>

                    {!specialMessage && this.props.message.reactions && <AsyncMessageReactionsView message={this.props.message} />}

                    {specialMessage}
                </ASFlex>
                <ASFlex key="margin-bottom" backgroundColor={messageBgColor} height={2} />

            </ASFlex>
        );
    }
}