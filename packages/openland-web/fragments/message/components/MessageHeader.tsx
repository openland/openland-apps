import * as React from 'react';
import { XView } from 'react-mental';
import { TextStyles } from 'openland-web/utils/TextStyles';
import { UIconButton } from 'openland-web/components/unicorn/UIconButton';
import MoreIcon from 'openland-icons/s/ic-more-v-24.svg';
import LikeIcon from 'openland-icons/s/ic-like-24.svg';
import { FullMessage, MessageReactionType, CommentSubscriptionType } from 'openland-api/spacex.types';
import { MessengerContext } from 'openland-engines/MessengerEngine';
import { convertMessage } from 'openland-engines/messenger/ConversationEngine';
import { usePopper } from 'openland-web/components/unicorn/usePopper';
import { convertDsMessage, DataSourceWebMessageItem } from 'openland-web/fragments/chat/messenger/data/WebMessageItemDataSource';
import { UPopperController } from 'openland-web/components/unicorn/UPopper';
import { UPopperMenuBuilder } from 'openland-web/components/unicorn/UPopperMenuBuilder';
import ReplyIcon from 'openland-icons/s/ic-reply-24.svg';
import ForwardIcon from 'openland-icons/s/ic-forward-24.svg';
import PinIcon from 'openland-icons/s/ic-pin-24.svg';
import DeleteIcon from 'openland-icons/s/ic-delete-24.svg';
import FollowIcon from 'openland-icons/s/ic-follow-24.svg';
import UnfollowIcon from 'openland-icons/s/ic-follow-off-24.svg';
import { ConversationEngine } from 'openland-engines/messenger/ConversationEngine';
import { showDeleteMessageModal } from 'openland-web/fragments/chat/components/MessengerRootComponent';
import { useChatMessagesActionsMethods } from 'openland-y-utils/MessagesActionsState';
import { useForward } from 'openland-web/fragments/chat/messenger/message/actions/forward';
import { useToast } from 'openland-web/components/unicorn/UToast';
import { ReactionPickerInstance, ReactionPicker } from 'openland-web/fragments/chat/messenger/message/reactions/ReactionPicker';
import { useClient } from 'openland-api/useClient';
import { showCheckLock } from 'openland-web/fragments/wallet/modals/showPayConfirm';
import { trackEvent } from 'openland-x-analytics';
import { showDonationReactionWarning } from 'openland-web/fragments/chat/messenger/message/reactions/showDonationReactionWarning';
import { useStackRouter } from 'openland-unicorn/components/StackRouter';

const useBuildMessageMenu = (engine: ConversationEngine) => {
    const router = useStackRouter();
    const forward = useForward(engine.conversationId, engine.isPrivate && engine.user ? engine.user.id : undefined, !engine.canReply);
    const { reply } = useChatMessagesActionsMethods({ conversationId: engine.conversationId, userId: engine.isPrivate ? engine.user?.id : undefined });
    const toastHandlers = useToast();
    return (ctx: UPopperController, message: DataSourceWebMessageItem, isSubscribed: boolean) => {
        let menu = new UPopperMenuBuilder();
        const role = engine.role;
        if (message.id) {
            menu.item({
                title: isSubscribed ? 'Unfollow thread' : 'Follow thread', icon: isSubscribed ? <UnfollowIcon /> : <FollowIcon />, onClick: async () => {
                    if (isSubscribed) {
                        await engine.engine.client.mutateUnSubscribeFromComments({ peerId: message.id! });
                    } else {
                        await engine.engine.client.mutateSubscribeToComments({ peerId: message.id!, type: CommentSubscriptionType.ALL });
                    }
                    toastHandlers.show({
                        type: 'success',
                        text: isSubscribed ? 'Unsubscribed' : 'Subscribed'
                    });
                }
            });
        }
        if (engine.canSendMessage && engine.canReply) {
            menu.item({
                title: 'Reply', icon: <ReplyIcon />, onClick: () => {
                    reply(message);
                    if (message.source && message.source.__typename === 'MessageSourceChat') {
                        const mailPath = `/mail/${message.source.chat.id}`;
                        if (router.pages.length <= 1 || router.pages[router.pages.length - 2].path !== mailPath) {
                            router.push(mailPath);
                        } else {
                            router.pop();
                        }
                    }
                }
            });
        }
        menu.item({
            title: 'Forward', icon: <ForwardIcon />, onClick: () => {
                forward([message]);
            }
        });
        if (engine.canPin && message.id) {
            const toPin = !engine.pinId || engine.pinId !== message.id;
            menu.item({
                title: toPin ? 'Pin' : 'Unpin', icon: <PinIcon />, action: async () => {
                    if (toPin) {
                        await engine.engine.client.mutatePinMessage({ messageId: message.id!, chatId: engine.conversationId });
                    } else {
                        await engine.engine.client.mutateUnpinMessage({ chatId: engine.conversationId });
                    }
                    toastHandlers.show({
                        type: 'success',
                        text: toPin ? 'Message pinned' : 'Message unpinned'
                    });
                }
            });
        }
        if (message.sender.id === engine.engine.user.id || role === 'ADMIN' || role === 'OWNER') {
            menu.item({
                title: 'Delete', icon: <DeleteIcon />, onClick: () => showDeleteMessageModal([message.id!], engine.engine.client)
            });
        }
        return menu.build(ctx);
    };
};

export const MessageHeader = (props: { message: FullMessage | null, isSubscribed: boolean }) => {
    const { message } = props;

    if (!message || message.__typename === 'ServiceMessage') {
        return null;
    }

    const messenger = React.useContext(MessengerContext);
    const toastHandlers = useToast();
    const client = useClient();

    const chatId = message.source && message.source.__typename === 'MessageSourceChat' && message.source.chat.id;

    const dsMessage = chatId && convertDsMessage(convertMessage(message, chatId, messenger));

    const conversation = chatId && messenger.getConversation(chatId);

    const buildMessageMenu = conversation && useBuildMessageMenu(conversation);
    const [menuVisible, menuShow] = buildMessageMenu && dsMessage ? usePopper(
        { placement: 'bottom-end', hideOnClick: true, scope: 'message-header', updatedDeps: props.isSubscribed },
        ctx => buildMessageMenu(ctx, dsMessage, props.isSubscribed),
    ) : [false, () => { /* no op */ }];

    const pickerRef = React.useRef<ReactionPickerInstance>(null);

    const handleReactionClick = async (reaction: MessageReactionType, remove?: boolean) => {
        if (!conversation) {
            return;
        }

        const messageId = message.id;
        const messageKey = conversation.getMessageKeyById(message.id);
        const reactions = message.reactionCounters;

        const donate = async () => {
            if (!messageId) {
                return;
            }

            try {
                toastHandlers.show({
                    type: 'loading',
                    text: 'Loading',
                    autoclose: false
                });
                await client.mutateMessageSetDonationReaction({ messageId });
                toastHandlers.show({
                    type: 'success',
                    text: 'You’ve donated $1',
                });
            } catch (e) {
                let wallet = await client.queryMyWallet();
                if (wallet.myWallet.isLocked) {
                    toastHandlers.hide();
                    showCheckLock();
                } else {
                    toastHandlers.show({
                        type: 'failure',
                        text: e.message,
                    });
                }
                throw e;
            }
        };

        const setEmoji = () => {
            conversation.setReaction(messageKey, reaction);
            trackEvent('reaction_sent', {
                reaction_type: reaction.toLowerCase(),
                double_tap: 'not',
            });
        };

        const unsetEmoji = () => {
            conversation.unsetReaction(messageKey, reaction);
        };

        if (messageId) {
            if (remove === undefined ? !!reactions.find(r => r.reaction === reaction && r.setByMe) : remove) {
                if (reaction !== MessageReactionType.DONATE) {
                    unsetEmoji();
                    await client.mutateMessageUnsetReaction({ messageId, reaction });
                }
            } else {
                if (reaction === MessageReactionType.DONATE) {
                    try {
                        await showDonationReactionWarning();
                        try {
                            setEmoji();
                            await donate();
                        } catch (e) {
                            unsetEmoji();
                        }
                    } catch (e) { /* noop */ }
                } else {
                    setEmoji();
                    await client.mutateMessageSetReaction({ messageId, reaction });
                }
            }
        }
    };

    React.useEffect(
        () => {
            if (pickerRef && pickerRef.current) {
                pickerRef.current.update(message.reactionCounters);
            }
        },
        [pickerRef, message.reactionCounters],
    );

    const [reactionsVisible, reactionsShow] = usePopper(
        { placement: 'top', hideOnLeave: true, borderRadius: 20, scope: 'message-header' },
        () => (
            <ReactionPicker
                ref={pickerRef}
                reactionCounters={message.reactionCounters}
                onPick={handleReactionClick}
            />
        ),
    );

    return (
        <XView
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
            flexGrow={1}
            flexBasis={0}
            minWidth={0}
        >
            <XView
                height={32}
                color="var(--foregroundPrimary)"
                {...TextStyles.Title1}
            >
                Thread
            </XView>
            {chatId && (
                <XView
                    flexDirection="row"
                >
                    <UIconButton
                        icon={<LikeIcon />}
                        color="var(--foregroundSecondary)"
                        size="large"
                        active={reactionsVisible}
                        onMouseEnter={reactionsShow}
                        onClick={e => {
                            e.stopPropagation();
                            handleReactionClick(MessageReactionType.LIKE);
                        }}
                    />
                    <UIconButton
                        icon={<MoreIcon />}
                        color="var(--foregroundSecondary)"
                        size="large"
                        onClick={menuShow}
                        active={menuVisible}
                    />
                </XView>
            )}
        </XView>
    );
};