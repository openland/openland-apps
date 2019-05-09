import * as React from 'react';
import { XView } from 'react-mental';
import { MessageListComponent } from './view/MessageListComponent';
import { XLoader } from 'openland-x/XLoader';
import { MessagesContainer } from './view/MessagesContainer';
import { ConversationEngine } from 'openland-engines/messenger/ConversationEngine';
import { ModelMessage } from 'openland-engines/messenger/types';
import { UserShort, SharedRoomKind, RoomChat_room } from 'openland-api/Types';
import { TypingsView } from './typings/TypingsView';

const TypingComponent = React.memo((props: { chatId: string }) => (
    <XView
        alignItems="center"
        width={'100%'}
        flexShrink={0}
        position={'absolute'}
        bottom={0}
        left={0}
    >
        <XView
            alignItems="flex-start"
            width={'100%'}
            backgroundColor={'#fff'}
            maxHeight={33}
            maxWidth={930}
            paddingLeft={60}
            paddingRight={40}
        >
            <TypingsView conversationId={props.chatId} />
        </XView>
    </XView>
));

interface ConversationMessagesComponentProps {
    isChannel: boolean;
    conversation: ConversationEngine;
    conversationId: string;
    conversationType?: SharedRoomKind | 'PRIVATE';
    loading: boolean;
    messages: ModelMessage[];
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
    };

    render() {
        return (
            <MessagesContainer conversationId={this.props.conversationId}>
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
                {this.props.loading && <XLoader loading={this.props.loading} />}
                <TypingComponent chatId={this.props.conversationId} />
            </MessagesContainer>
        );
    }
}
