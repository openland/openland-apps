import * as React from 'react';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import { XWithRole } from 'openland-x-permissions/XWithRole';
import { XView } from 'react-mental';
import { XButton } from 'openland-x/XButton';
import { UserShort } from 'openland-api/Types';
import { withPinMessage } from 'openland-web/api/withPinMessage';
import CloseIcon from 'openland-icons/ic-close.svg';
import { MessagesStateContext } from 'openland-web/components/messenger/MessagesStateContext';
import { XModalForm } from 'openland-x-modal/XModalForm2';
import { css } from 'linaria';
import { XText } from 'openland-x/XText';
import { XMutation } from 'openland-x/XMutation';
import { useClient } from 'openland-web/utils/useClient';

const PinMessageButton = withPinMessage(props => (
    <XMutation mutation={props.pinMessage} onSuccess={(props as any).onSuccess}>
        <XButton text="Pin" />
    </XMutation>
)) as React.ComponentType<{
    variables: { chatId: string; messageId: string };
    onSuccess: () => void;
}>;

const ClearIconClass = css`
    margin-top: 4px;
    margin-left: 5px;
    cursor: pointer;
    width: 16px;
    height: 16px;
    & > path {
        fill: #bcc3cc;
    }
    &:hover > path {
        fill: #000000;
    }
`;

const DeleteMessagesFrom = (props: {
    messagesIds: string[];
    onDelete: () => void;
}) => {
    const client = useClient();
    return (<XModalForm
        submitProps={{
            text: 'Delete',
            style: 'danger',
        }}
        title="Delete message"
        target={<XButton text="Delete" style="default" />}
        defaultAction={async () => {
            await client.mutateRoomDeleteMessages({
                mids: (props as any).messagesIds,
            });
            await (props as any).onDelete();
        }}
    >
        <XText>Delete selected messages for everyone? This cannot be undone.</XText>
    </XModalForm>
    );
}

export const ChatForwardHeaderView = (props: {
    me: UserShort;
    roomId: string;
    privateRoom: boolean;
    publicRoom: boolean;
    canMePinMessage: boolean;
    myId: string;
}) => {
    const state = React.useContext(MessagesStateContext);
    let pinMessageAccess = false;
    let { selectedMessages } = state;
    let selectedMessageArr = Array.from(selectedMessages);
    const firstStepPinAccess =
        !props.privateRoom &&
        selectedMessages.size === 1 &&
        !selectedMessageArr[0].isService &&
        selectedMessageArr[0].sender.id === props.myId;

    if (firstStepPinAccess && !props.publicRoom) {
        pinMessageAccess = true;
    }

    if (firstStepPinAccess && props.publicRoom && props.canMePinMessage) {
        pinMessageAccess = true;
    }

    const { forwardMessagesId, resetAll } = state;
    if (forwardMessagesId && forwardMessagesId.size) {
        let size = forwardMessagesId.size;
        return (
            <XView
                flexDirection="row"
                alignItems="center"
                maxWidth={950}
                width="100%"
                justifyContent="space-between"
                minWidth={0}
                flexShrink={1}
            >
                <XView fontSize={16} lineHeight={1.38} color="#000000" flexGrow={1}>
                    <XView flexDirection="row">
                        {size} {size === 1 ? 'message selected' : 'messages selected'}
                        <CloseIcon
                            className={ClearIconClass}
                            onClick={() => {
                                state.resetAll();
                            }}
                        />
                    </XView>
                </XView>
                <XHorizontal alignItems="center" separator={5}>
                    <XWithRole role="super-admin">
                        <DeleteMessagesFrom
                            messagesIds={Array.from(state.selectedMessages).map(m => m.id!!)}
                            onDelete={resetAll}
                        />
                    </XWithRole>
                    <XWithRole role="super-admin" negate={true}>
                        {!Array.from(state.selectedMessages).find(
                            msg => msg.sender.id !== props.me.id,
                        ) && (
                                <DeleteMessagesFrom
                                    messagesIds={Array.from(state.selectedMessages).map(m => m.id!!)}
                                    onDelete={resetAll}
                                />
                            )}
                    </XWithRole>
                    {pinMessageAccess && (
                        <PinMessageButton
                            variables={{
                                chatId: props.roomId,
                                messageId: Array.from(state.selectedMessages)[0].id!,
                            }}
                            onSuccess={state.resetAll}
                        />
                    )}
                    <XButton
                        text="Reply"
                        style="primary"
                        onClick={() =>
                            state.setReplyMessages(state.forwardMessagesId, new Set(), new Set())
                        }
                    />
                    <XButton
                        text="Forward"
                        style="primary"
                        onClick={() => state.forwardMessages()}
                    />
                </XHorizontal>
            </XView>
        );
    } else {
        return null;
    }
};
