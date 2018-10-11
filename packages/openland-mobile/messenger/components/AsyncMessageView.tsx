import * as React from 'react';
import { ASFlex } from 'react-native-async-view/ASFlex';
import { AsyncAvatar } from './AsyncAvatar';
import { ConversationEngine, DataSourceMessageItem } from 'openland-engines/messenger/ConversationEngine';
import { AsyncMessageMediaView } from './AsyndMessageMediaView';
import { ASPressEvent } from 'react-native-async-view/ASPressEvent';
import { AsyncMessageTextView } from './AsyncMessageTextView';
import { AsyncMessageDocumentView } from './AsyncMessageDocumentView';
import { ASText } from 'react-native-async-view/ASText';

export interface AsyncMessageViewProps {
    message: DataSourceMessageItem;
    engine: ConversationEngine;
    onMessagePress: (message: DataSourceMessageItem) => void;
    onAvatarPress: (id: string) => void;
    onDocumentPress: (document: DataSourceMessageItem) => void;
    onMediaPress: (media: DataSourceMessageItem, event: { path: string } & ASPressEvent) => void;
}

export class AsyncMessageView extends React.PureComponent<AsyncMessageViewProps> {

    private handlePress = () => {
        this.props.onAvatarPress(this.props.message.senderId);
    }

    private handleLongPress = () => {
        this.props.onMessagePress(this.props.message);
    }

    render() {
        return (
            <ASFlex flexDirection="row" marginLeft={!this.props.message.isOut && this.props.message.attachBottom ? 33 : 4} marginRight={4} marginTop={this.props.message.attachTop ? 2 : 14} marginBottom={2} alignItems="flex-end" onLongPress={this.handleLongPress}>
                {!this.props.message.isOut && !this.props.message.attachBottom &&
                    <ASFlex marginBottom={0} marginRight={-1} marginLeft={4} onPress={this.handlePress}>
                        <AsyncAvatar
                            size={28}
                            src={this.props.message.senderPhoto}
                            placeholderKey={this.props.message.senderId}
                            placeholderTitle={this.props.message.senderName}
                        />
                    </ASFlex>
                }
                <ASFlex flexDirection="column" alignItems={this.props.message.isOut ? 'flex-end' : 'flex-start'} flexGrow={1} flexBasis={0} marginLeft={this.props.message.isOut ? 50 : 0} marginRight={this.props.message.isOut ? 0 : 50}>
                    {this.props.message.text && !this.props.message.file && (
                        <AsyncMessageTextView message={this.props.message} />
                    )}
                    {this.props.message.file && this.props.message.file.isImage && (
                        <AsyncMessageMediaView message={this.props.message} onPress={this.props.onMediaPress} />
                    )}
                    {this.props.message.file && !this.props.message.file.isImage && (
                        <AsyncMessageDocumentView message={this.props.message} onPress={this.props.onDocumentPress} />
                    )}
                </ASFlex>
            </ASFlex>
        );
    }
}