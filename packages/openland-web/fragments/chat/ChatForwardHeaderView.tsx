import * as React from 'react';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import { XWithRole } from 'openland-x-permissions/XWithRole';
import { XView } from 'react-mental';
import { XButton } from 'openland-x/XButton';
import { UserShort } from 'openland-api/Types';
import CloseIcon from 'openland-icons/ic-close.svg';
import { MessagesStateContext } from 'openland-web/components/messenger/MessagesStateContext';
import { withDeleteMessages } from 'openland-web/api/withDeleteMessage';
import { XMutation } from 'openland-x/XMutation';
import { css } from 'linaria';

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

const DeleteMessagesButton = withDeleteMessages(props => (
    <XMutation
        mutation={props.deleteMessages}
        onSuccess={(props as any).onSuccess}
        variables={{
            roomId: (props as any).roomId,
            mids: (props as any).messagesIds,
        }}
    >
        {props.children}
    </XMutation>
)) as React.ComponentType<{
    roomId: string;
    messagesIds: string[];
    onSuccess: () => void;
}>;

export const ChatForwardHeaderView = (props: { me: UserShort; roomId: string }) => {
    const state = React.useContext(MessagesStateContext);
    const { forwardMessagesId } = state;
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
                        <DeleteMessagesButton
                            roomId={props.roomId}
                            messagesIds={Array.from(state.selectedMessages).map(m => m.id!!)}
                            onSuccess={state.resetAll}
                        >
                            <XButton text="Delete" style="default" />
                        </DeleteMessagesButton>
                    </XWithRole>
                    <XWithRole role="super-admin" negate={true}>
                        {!Array.from(state.selectedMessages).find(
                            msg => msg.sender.id !== props.me.id,
                        ) && (
                                <DeleteMessagesButton
                                    roomId={props.roomId}
                                    messagesIds={Array.from(state.selectedMessages).map(m => m.id!!)}
                                    onSuccess={state.resetAll}
                                >
                                    <XButton text="Delete" style="default" />
                                </DeleteMessagesButton>
                            )}
                    </XWithRole>
                    <XButton
                        text="Reply"
                        style="primary"
                        onClick={() => state.setReplyMessages(state.forwardMessagesId, null, null)}
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
