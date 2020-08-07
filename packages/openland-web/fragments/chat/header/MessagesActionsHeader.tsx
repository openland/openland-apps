import * as React from 'react';
import { RoomChat_room } from 'openland-api/spacex.types';
import { MessengerContext, MessengerEngine } from 'openland-engines/MessengerEngine';
import { css, cx } from 'linaria';
import { XView } from 'react-mental';
import { pluralForm } from 'openland-y-utils/plural';
import { UButton } from 'openland-web/components/unicorn/UButton';
import { UIcon } from 'openland-web/components/unicorn/UIcon';
import CloseIcon from 'openland-icons/s/ic-close-16.svg';
import { TextTitle3 } from 'openland-web/utils/TextStyles';
import { showDeleteMessageModal as showDeleteMessagesModal } from '../components/MessengerRootComponent';
import { useLayout } from 'openland-unicorn/components/utils/LayoutContext';
import { useShortcuts } from 'openland-x/XShortcuts/useShortcuts';
import { useRole } from 'openland-x-permissions/XWithRole';
import { ConversationEngine } from 'openland-engines/messenger/ConversationEngine';
import { useForward } from '../messenger/message/actions/forward';
import { useChatMessagesActions } from 'openland-y-runtime/MessagesActionsState';

const containerClass = css`
    position: absolute;
    display: flex;
    transition: transform cubic-bezier(0, 0, 0.2, 1) 150ms, opacity cubic-bezier(0, 0, 0.2, 1) 150ms;
    opacity: 0;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: var(--backgroundPrimary);
    transform: translateY(-56px);
    will-change: transform;
    z-index: 10;
`;

const containerVisibleClass = css`
    transform: translateY(0);
    opacity: 1;
`;

// TODO: ref as PageLayout animations
const animateCenterDown = css`
    animation: anim 150ms cubic-bezier(0, 0, 0.2, 1);
    @keyframes anim {
        from {
            opacity: 1;
            transform: translateY(0);
        }
        to {
            opacity: 0;
            transform: translateY(20px);
        }
    }
    transform: translateY(20px);
    opacity: 0;
`;

const animateCenterUp = css`
    animation: anim 150ms cubic-bezier(0, 0, 0.2, 1);
    @keyframes anim {
        from {
            opacity: 1;
            transform: translateY(0);
        }
        to {
            opacity: 0;
            transform: translateY(-20px);
        }
    }
    opacity: 0;
    transform: translateY(-20px);
`;

const animateDownCenter = css`
    animation: anim 150ms cubic-bezier(0, 0, 0.2, 1);
    @keyframes anim {
        from {
            transform: translateY(20px);
        }
        to {
            transform: translateY(0);
        }
    }
    transform: translateY(0);
`;

const animateUpCenter = css`
    animation: anim 150ms cubic-bezier(0, 0, 0.2, 1);
    @keyframes anim {
        from {
            transform: translateY(-20px);
        }
        to {
            transform: translateY(0);
        }
    }
    transform: translateY(0);
`;

const Counter = (props: { messagesCount: number, onClick: () => void }) => {
    let layout = useLayout();
    let countRef = React.useRef(0);

    let count = props.messagesCount || 1;
    let old = countRef.current;
    let increment = count > old;

    countRef.current = count;

    let width = count.toString().length * 12;
    return (
        <XView
            flexDirection="row"
            alignItems="center"
            justifyContent="flex-start"
            onClick={props.onClick}
            cursor="pointer"
        >
            <span className={TextTitle3}>
                <span
                    key={count + '_old'}
                    className={increment ? animateCenterDown : animateCenterUp}
                    style={{ width, display: 'inline-block', position: 'absolute' }}
                >
                    {old}
                </span>
                <span
                    key={count + '_new'}
                    className={increment ? animateUpCenter : animateDownCenter}
                    style={{ width, display: 'inline-block' }}
                >
                    {count}
                </span>
                {layout === 'desktop' && ` ${pluralForm(count, ['message', 'messages'])} selected`}
            </span>
            <XView width={32} height={32} alignItems="center" justifyContent="center">
                <UIcon icon={<CloseIcon />} />
            </XView>
        </XView>
    );
};

const Buttons = (props: {
    conversation: ConversationEngine;
    messenger: MessengerEngine;
    chat: RoomChat_room;
}) => {
    let { getState, clear, reply } = useChatMessagesActions({ conversationId: props.conversation.conversationId, userId: props.conversation.isPrivate ? props.conversation.user?.id : undefined });
    let deleteCallback = React.useCallback(() => {
        let ids = getState().action === 'selected'
            ? getState().messages
                .filter((m) => !!m.id)
                .map((m) => m.id!)
            : [];
        showDeleteMessagesModal(ids, props.messenger.client, clear);
    }, [getState()]);
    let forward = useForward(props.chat.id);
    let forwardCallback = React.useCallback(() => {
        forward();
    }, []);
    let replyCallback = React.useCallback(() => {
        reply();
    }, [getState()]);
    let canReply = props.conversation.canSendMessage;
    let canDelete =
        useRole('super-admin') ||
        !getState().messages.filter((m) => m.sender.id !== props.messenger.user.id).length ||
        (props.chat.__typename === 'SharedRoom' && props.chat.role === 'OWNER') ||
        (props.chat.__typename === 'SharedRoom' && props.chat.role === 'ADMIN');
    return (
        <XView flexDirection="row">
            {canDelete && (
                <div className={animateUpCenter}>
                    <UButton onClick={deleteCallback} text="Delete" style="secondary" />
                </div>
            )}
            {canReply && <UButton onClick={replyCallback} text="Reply" marginLeft={8} />}
            <UButton onClick={forwardCallback} text="Forward" marginLeft={8} />
        </XView>
    );
};

export const MessagesActionsHeader = (props: { chat: RoomChat_room }) => {
    let { getState, clear } = useChatMessagesActions({ conversationId: props.chat.id, userId: props.chat.__typename === 'PrivateRoom' ? props.chat.user.id : undefined });
    let containerRef = React.useRef<HTMLDivElement>(null);
    let messenger = React.useContext(MessengerContext);
    let conversation = messenger.getConversation(props.chat.id);
    useShortcuts({
        keys: ['Escape'], callback: () => {
            if (getState().action === 'none') {
                return false;
            } else {
                clear();
                return true;
            }
        }
    });
    const selectingCount = getState().action === 'selected' && getState().messages.length;

    React.useEffect(() => {
        if (containerRef.current) {
            containerRef.current.className = cx(
                containerClass,
                selectingCount && containerVisibleClass,
            );
        }
    }, [selectingCount]);

    return (
        <div ref={containerRef} className={containerClass}>
            <XView
                flexGrow={1}
                justifyContent="space-between"
                alignItems="center"
                flexDirection="row"
            >
                <Counter messagesCount={getState().action === 'selected' ? getState().messages.length : 0} onClick={clear} />
                <Buttons
                    conversation={conversation}
                    messenger={messenger}
                    chat={props.chat}
                />
            </XView>
        </div>
    );
    //
};
