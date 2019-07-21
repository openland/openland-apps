import * as React from 'react';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import { XWithRole } from 'openland-x-permissions/XWithRole';
import { XView } from 'react-mental';
import { XButton } from 'openland-x/XButton';
import { UserShort } from 'openland-api/Types';
import CloseIcon from 'openland-icons/ic-close.svg';
import { MessagesStateContext } from 'openland-web/fragments/chat/messenger/MessagesStateContext';
import { XModalForm } from 'openland-x-modal/XModalForm2';
import { css } from 'linaria';
import { XText } from 'openland-x/XText';
import { useClient } from 'openland-web/utils/useClient';
import { XModalFooter } from 'openland-x-modal/XModal';
import { XModalContent } from 'openland-web/components/XModalContent';
import { showModalBox } from 'openland-x/showModalBox';

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

interface DeleteMessagesFromProps {
    messagesIds: string[];
    onDelete: () => void;
}

const DeleteMessagesFrom = (props: DeleteMessagesFromProps & { hide: () => void }) => {
    const client = useClient();

    return (
        <XView borderRadius={8}>
            <XModalContent>
                <XText>Delete selected messages for everyone? This cannot be undone.</XText>
            </XModalContent>
            <XModalFooter>
                <XView marginRight={12}>
                    <XButton text="Cancel" style="ghost" size="large" onClick={props.hide} />
                </XView>
                <XButton
                    text="Delete"
                    style="danger"
                    size="large"
                    onClick={async () => {
                        await client.mutateRoomDeleteMessages({
                            mids: props.messagesIds,
                        });
                        await props.onDelete();
                        props.hide();
                    }}
                />
            </XModalFooter>
        </XView>
    );
};

export const showDeleteMessagesFromModal = (props: DeleteMessagesFromProps) => {
    showModalBox({ title: 'Delete messages' }, ctx => (
        <DeleteMessagesFrom {...props} hide={ctx.hide} />
    ));
};

export const ChatForwardHeaderView = (props: {
    me: UserShort;
    roomId: string;
    privateRoom: boolean;
    isChannel: boolean;
}) => {
    const state = React.useContext(MessagesStateContext);
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
                        <XButton
                            text="Delete"
                            style="default"
                            onClick={() =>
                                showDeleteMessagesFromModal({
                                    messagesIds: Array.from(state.selectedMessages).map(
                                        m => m.id!!,
                                    ),
                                    onDelete: resetAll,
                                })
                            }
                        />
                    </XWithRole>
                    <XWithRole role="super-admin" negate={true}>
                        {!Array.from(state.selectedMessages).find(
                            msg => msg.sender.id !== props.me.id,
                        ) && (
                            <XButton
                                text="Delete"
                                style="default"
                                onClick={() =>
                                    showDeleteMessagesFromModal({
                                        messagesIds: Array.from(state.selectedMessages).map(
                                            m => m.id!!,
                                        ),
                                        onDelete: resetAll,
                                    })
                                }
                            />
                        )}
                    </XWithRole>
                    {!props.isChannel && (
                        <XButton
                            text="Reply"
                            style="primary"
                            onClick={() =>
                                state.setReplyMessages(
                                    state.forwardMessagesId,
                                    new Set(),
                                    new Set(),
                                )
                            }
                        />
                    )}
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
