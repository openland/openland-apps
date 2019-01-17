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

export class AsyncMessageView extends React.PureComponent<AsyncMessageViewProps> {

    private handleAvatarPress = () => {
        this.props.onAvatarPress(this.props.message.senderId);
    }

    private handleLongPress = () => {
        this.props.onMessageLongPress(this.props.message);
    }

    render() {
        let specialMessage = renderSpecialMessage(this.props.message, this.props.navigationManager, this.props.onDocumentPress);

        // fix needed - layour breaks if wraped in one more flex
        let buttonsAvatarHackMargin = renderButtons(this.props.message, this.props.navigationManager).length * 36;
        buttonsAvatarHackMargin += (!specialMessage && this.props.message.reactions && !!(this.props.message.reactions.length)) ? 22 : 0;
        let ios = Platform.OS === 'ios';
        return (
            <ASFlex flexDirection="row" marginLeft={!this.props.message.isOut && this.props.message.attachBottom ? (ios ? 33 : 51) : 4} marginRight={4} marginTop={this.props.message.attachTop ? 2 : 14} marginBottom={2} alignItems="flex-end" onLongPress={this.handleLongPress}>
                {!this.props.message.isOut && !this.props.message.attachBottom &&
                    <ASFlex marginRight={ios ? -1 : 3} marginLeft={ios ? 4 : 7} onPress={this.handleAvatarPress} marginBottom={buttonsAvatarHackMargin}>
                        <AsyncAvatar
                            size={ios ? 28 : 36}
                            src={this.props.message.senderPhoto}
                            placeholderKey={this.props.message.senderId}
                            placeholderTitle={this.props.message.senderName}
                        />
                    </ASFlex>
                }
                <ASFlex flexDirection="column" alignItems={this.props.message.isOut ? 'flex-end' : 'flex-start'} flexGrow={1} flexBasis={0} marginLeft={this.props.message.isOut ? 50 : 0} marginRight={this.props.message.isOut ? 0 : 50}>
                    {!specialMessage && this.props.message.text && !this.props.message.file && (
                        <AsyncMessageTextView message={this.props.message} onUserPress={this.props.onAvatarPress} />
                    )}
                    {!specialMessage && this.props.message.file && this.props.message.file.isImage && (
                        <AsyncMessageMediaView message={this.props.message} onPress={this.props.onMediaPress} />
                    )}
                    {!specialMessage && this.props.message.file && !this.props.message.file.isImage && (
                        <AsyncMessageDocumentView message={this.props.message} onPress={this.props.onDocumentPress} />
                    )}
                    {!specialMessage && this.props.message.reactions && <AsyncMessageReactionsView message={this.props.message} />}

                    {specialMessage}
                </ASFlex>
            </ASFlex>
        );
    }
}