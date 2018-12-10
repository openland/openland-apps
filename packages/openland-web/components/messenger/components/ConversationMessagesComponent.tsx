import * as React from 'react';
import Glamorous from 'glamorous';
import { MessageListComponent } from './view/MessageListComponent';
import { XLoader } from 'openland-x/XLoader';
// import { XAvatar } from 'openland-x/XAvatar';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import { MessagesContainer } from './view/MessagesContainer';
import {
    ConversationEngine,
    ConversationStateHandler,
} from 'openland-engines/messenger/ConversationEngine';
import { ModelMessage } from 'openland-engines/messenger/types';
import { TypignsComponent, TypingContext } from './TypingsComponent';
import { UserShort, SharedRoomKind } from 'openland-api/Types';
import { EditPostProps } from './MessengerRootComponent';

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

const TypingString = Glamorous.div({
    opacity: 0.5,
    fontSize: 12,
    fontWeight: 500,
    letterSpacing: -0.2,
    color: '#334562',
    marginTop: 8,
    marginBottom: 8,
});

const TypingComponent = (props: { chatId: string }) => (
    <TypingWrapper>
        <TypignsComponent conversatonId={props.chatId}>
            <TypingContext.Consumer>
                {typing => (
                    <TypingContent
                        separator={5}
                        alignItems="center"
                        flexGrow={1}
                    >
                        {/* {typing.users && (
                            <TypingAvatarWrapper>
                                {typing.users.map((i, j) => (
                                    <TypingAvatar
                                        size="x-small"
                                        key={'typing_img_' + j}
                                        style="colorus"
                                        objectName={i.userName}
                                        objectId={i.userId}
                                        cloudImageUuid={i.userPic || undefined}
                                    />
                                ))}
                            </TypingAvatarWrapper>
                        )} */}
                        {typing.typing && (
                            <TypingString>{typing.typing}</TypingString>
                        )}
                    </TypingContent>
                )}
            </TypingContext.Consumer>
        </TypignsComponent>
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
    editPostHandler: (data: EditPostProps) => void;
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

    loadBefore = (id: string) => {
        this.props.conversation.loadBefore(id);
    };

    render() {
        return (
            <MessagesContainer>
                <MessageListComponent
                    me={this.props.me}
                    loadBefore={this.loadBefore}
                    conversation={this.props.conversation}
                    conversationType={this.props.conversationType}
                    messages={this.props.messages}
                    inputShower={this.props.inputShower}
                    ref={this.messagesList}
                    conversationId={this.props.conversationId}
                    editPostHandler={this.props.editPostHandler}
                />
                <XLoader loading={this.props.loading} />
                <TypingComponent chatId={this.props.conversationId} />
            </MessagesContainer>
        );
    }
}
