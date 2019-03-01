import * as React from 'react';
import { UploadContext } from './FileUploading/UploadContext';
import { MessageComposeComponentDraftProps } from './MessageComposeComponentDesktop';
import { useHandleSend } from './useHandleSend';
import { useHandleChange } from './useHandleChange';
import { DumpSendMessage } from './DumpSendMessage';
import { MobileSendMessage } from './SendMessage/MobileSendMessage';
import { useMentions } from './useMentions';
import { withUserInfo } from '../../components/UserInfo';
import { withMessageState } from 'openland-web/api/withMessageState';
import { withGetDraftMessage } from 'openland-web/api/withMessageState';
import { withChannelMembers } from 'openland-web/api/withChannelMembers';
import { ModelMessage } from 'openland-engines/messenger/types';
import UploadCare from 'uploadcare-widget';
import { ConversationEngine } from 'openland-engines/messenger/ConversationEngine';
import { XWithRouter } from 'openland-x-routing/withRouter';
import { MutationFunc } from 'react-apollo';
import { UserInfo } from '../../components/UserInfo';
import { MessagesStateContextProps } from '../../components/messenger/MessagesStateContext';
import {
    ReplyMessageVariables,
    ReplyMessage,
    SaveDraftMessageVariables,
    SaveDraftMessage,
    RoomEditMessageVariables,
    RoomEditMessage,
    MessageFull_mentions,
    SharedRoomKind,
    PostMessageType,
    RoomMembers_members,
} from 'openland-api/Types';

export interface MessageComposeComponentProps {
    conversationType?: SharedRoomKind | 'PRIVATE';
    isActive: boolean;
    conversationId?: string;
    conversation?: ConversationEngine;
    enabled?: boolean;
    onSend?: (text: string, mentions: MessageFull_mentions[] | null) => void;
    onSendFile?: (file: UploadCare.File) => void;
    onChange?: (text: string) => void;
    handleHideChat?: (show: boolean, postType: PostMessageType | null) => void;
    getMessages?: () => ModelMessage[];
}

export type MessageComposeComponentInnerProps = {
    TextInputComponent?: any;
    messagesContext: MessagesStateContextProps;
    replyMessage: MutationFunc<ReplyMessage, Partial<ReplyMessageVariables>>;
    saveDraft: MutationFunc<SaveDraftMessage, Partial<SaveDraftMessageVariables>>;
    editMessage: MutationFunc<RoomEditMessage, Partial<RoomEditMessageVariables>>;
    draft?: string | null;
} & MessageComposeComponentProps &
    XWithRouter &
    UserInfo &
    MessageComposeComponentT;

export const MobileMessageComposeInner = (
    messageComposeProps: MessageComposeComponentInnerProps,
) => {
    const [inputValue, setInputValue] = React.useState('');
    const { handleDrop } = React.useContext(UploadContext);
    const inputRef = React.useRef<HTMLDivElement>(null);

    const mentionsState = useMentions({
        members: messageComposeProps.members,
    });

    const { handleChange } = useHandleChange({
        setInputValue,
        onChange: messageComposeProps.onChange,
    });

    const { handleSend } = useHandleSend({
        conversationId: messageComposeProps.conversationId,
        onSend: messageComposeProps.onSend,
        inputValue,
        setInputValue,
        inputRef,
    });

    // TODO maybe some other pattern here
    return (
        <DumpSendMessage
            TextInputComponent={MobileSendMessage}
            handleDrop={handleDrop}
            handleChange={handleChange}
            handleSend={handleSend}
            inputRef={inputRef}
            inputValue={inputValue}
            enabled={messageComposeProps.enabled}
            mentionsState={mentionsState}
            handleHideChat={messageComposeProps.handleHideChat}
        />
    );
};

type MessageComposeComponentT = MessageComposeWithDraft & {
    members?: RoomMembers_members[];
};

export const MessageComposeComponent = withMessageState(
    withUserInfo(MobileMessageComposeInner),
) as React.ComponentType<MessageComposeComponentT>;

type MessageComposeWithDraft = MessageComposeComponentProps & {
    draft?: string | null;
};

const MessageComposeComponentChannelMembers = withChannelMembers(props => {
    const typedProps = props as typeof props & MessageComposeWithDraft;

    return <MessageComposeComponent members={typedProps.data.members} {...typedProps} />;
}) as React.ComponentType<MessageComposeWithDraft>;

export type MessageComposeComponentDraftProps = MessageComposeComponentProps & {
    TextInputComponent?: any;
    variables?: {
        roomId?: string;
        conversationId?: string;
        organizationId: string | null;
    };
    getMessages?: () => ModelMessage[];
};

export const MobileMessageCompose = withGetDraftMessage(props => {
    const typedProps = props as typeof props & MessageComposeComponentDraftProps;

    return (
        <MessageComposeComponentChannelMembers {...typedProps} draft={typedProps.data.message} />
    );
}) as React.ComponentType<MessageComposeComponentDraftProps>;
