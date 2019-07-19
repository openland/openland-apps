import * as React from 'react';
import { XView } from 'react-mental';
import { MessageListComponent } from './view/MessageListComponent';
import { ConversationEngine } from 'openland-engines/messenger/ConversationEngine';
import { UserShort, SharedRoomKind, RoomChat_room } from 'openland-api/Types';
import { TypingsView } from './typings/TypingsView';
import { XLoader } from 'openland-x/XLoader';

interface ConversationMessagesComponentProps {
    isChannel: boolean;
    conversation: ConversationEngine;
    conversationId: string;
    conversationType?: SharedRoomKind | 'PRIVATE';
    loading: boolean;
    inputShower?: (show: boolean) => void;
    me?: UserShort | null;
    scrollPosition?: (data: number) => void;
    room: RoomChat_room;
}

export class ConversationMessagesComponent extends React.PureComponent<
    ConversationMessagesComponentProps
> {
    messagesList = React.createRef<MessageListComponent>();

    scrollToBottom = () => {
        if (this.messagesList.current) {
            this.messagesList.current.scrollToBottom();
        }
    }

    render() {
        return (
            <XView flexDirection="column" flexGrow={1} flexShrink={1} overflow="hidden">
                <MessageListComponent
                    isChannel={this.props.isChannel}
                    me={this.props.me}
                    conversation={this.props.conversation}
                    conversationType={this.props.conversationType}
                    inputShower={this.props.inputShower}
                    ref={this.messagesList}
                    conversationId={this.props.conversationId}
                    scrollPosition={this.props.scrollPosition}
                    room={this.props.room}
                />
                <TypingsView conversationId={this.props.conversationId} />
                {this.props.loading && <XLoader loading={this.props.loading} />}
            </XView>
        );
    }
}
