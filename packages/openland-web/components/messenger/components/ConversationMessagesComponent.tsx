import * as React from 'react';
import Glamorous from 'glamorous';
import { MessageListComponent } from './view/MessageListComponent';
import { XLoader } from 'openland-x/XLoader';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import { MessagesContainer } from './view/MessagesContainer';
import {
    ConversationEngine,
} from 'openland-engines/messenger/ConversationEngine';
import { ModelMessage } from 'openland-engines/messenger/types';
import { UserShort, SharedRoomKind } from 'openland-api/Types';
import { EditPostProps } from './MessengerRootComponent';
import { TypingsView } from '../typings/TypingsView';

const TypingWrapper = Glamorous.div({
    display: 'flex',
    alignItems: 'flex-start',
    width: '100%',
    flexShrink: 0,
    position: 'absolute',
    bottom: 0,
    left: 0,
});

const TypingContent = Glamorous(XHorizontal)({
    backgroundColor: '#fff',
    maxHeight: 33,
    maxWidth: 930,
    paddingLeft: 112,
    paddingRight: 40,
    margin: 'auto',
});

const TypingComponent = (props: { chatId: string }) => (
    <TypingWrapper>
        <TypingContent>
            <TypingsView conversationId={props.chatId} />
        </TypingContent>
    </TypingWrapper>
);

interface ConversationMessagesComponentProps {
    conversation: ConversationEngine;
    conversationId: string;
    conversationType?: SharedRoomKind | 'PRIVATE';
    loading: boolean;
    messages: ModelMessage[];
    inputShower?: (show: boolean) => void;
    me?: UserShort | null;
    editPostHandler?: (data: EditPostProps) => void;
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
            <MessagesContainer>
                <MessageListComponent
                    me={this.props.me}
                    conversation={this.props.conversation}
                    conversationType={this.props.conversationType}
                    messages={this.props.messages}
                    inputShower={this.props.inputShower}
                    ref={this.messagesList}
                    conversationId={this.props.conversationId}
                    editPostHandler={this.props.editPostHandler}
                />
                {this.props.loading && <XLoader loading={this.props.loading} />}
                <TypingComponent chatId={this.props.conversationId} />
            </MessagesContainer>
        );
    }
}
