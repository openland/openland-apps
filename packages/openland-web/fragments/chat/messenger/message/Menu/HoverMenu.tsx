import * as React from 'react';
import { css, cx } from 'linaria';
import { Placement } from 'popper.js';
import { DataSourceWebMessageItem } from '../../data/WebMessageItemDataSource';
import MoreIcon from 'openland-icons/s/ic-more-v-24.svg';
import CommentIcon from 'openland-icons/s/ic-message-24.svg';
import LikeIcon from 'openland-icons/s/ic-like-24.svg';
import { usePopper } from 'openland-web/components/unicorn/usePopper';
import { ConversationEngine } from 'openland-engines/messenger/ConversationEngine';
import { buildMessageMenu } from './MessageMenu';
import { XViewRouterContext } from 'react-mental';
import { MessageReactionType } from 'openland-api/spacex.types';
import { ReactionPicker, ReactionPickerInstance } from '../reactions/ReactionPicker';
import { MessengerContext } from 'openland-engines/MessengerEngine';
import { useClient } from 'openland-api/useClient';
import { trackEvent } from 'openland-x-analytics';
import { UIconButton } from 'openland-web/components/unicorn/UIconButton';
import { useWithWidth } from 'openland-web/hooks/useWithWidth';
import { showDonationReactionWarning } from '../reactions/showDonationReactionWarning';
import { useToast } from 'openland-web/components/unicorn/UToast';
import { showCheckLock } from 'openland-web/fragments/wallet/modals/showPayConfirm';

const menuContainerClass = css`
    position: absolute;
    opacity: 0;
    top: 20px;
    right: -36px;
    display: flex;
    flex-direction: row;
    flex-shrink: 0;
    background-color: var(--backgroundPrimary);
    border-radius: 8px;
    @media(max-width: 1350px) {
      right: 0;
    }
`;
const attachTop = css`
    top: -4px;
`;
const forceVisible = css`
    opacity: 1;
`;
const forceInvisible = css`
    display: none;
`;

interface HoverMenuProps {
    message: DataSourceWebMessageItem;
    engine: ConversationEngine;
}

export const HoverMenu = React.memo<HoverMenuProps>(props => {
    const { message } = props;
    const [width] = useWithWidth();
    const client = useClient();
    const messenger = React.useContext(MessengerContext);
    const router = React.useContext(XViewRouterContext);
    const messageRef = React.useRef(message);
    const [menuPlacement, setMenuPlacement] = React.useState<Placement>('bottom-end');
    const toastHandlers = useToast();

    React.useLayoutEffect(
        () => {
            if (width && width > 1600) {
                setMenuPlacement('right-start');
            } else if (width && width < 1600) {
                setMenuPlacement('bottom-end');
            }
        },
        [width],
    );

    messageRef.current = message;
    const [menuVisible, menuShow] = usePopper(
        { placement: menuPlacement, hideOnClick: true },
        ctx => buildMessageMenu(ctx, messageRef.current, props.engine, router!),
    );
    const handleCommentClick = React.useCallback(
        e => {
            e.stopPropagation();

            if (router && message.id) {
                router.navigate(`/message/${message.id}`);
            }
        },
        [message.id],
    );

    // Sorry universe
    const pickerRef = React.useRef<ReactionPickerInstance>(null);
    const messageIdRef = React.useRef(message.id);
    messageIdRef.current = message.id;
    const messageKeyRef = React.useRef(message.key);
    messageKeyRef.current = message.key;
    const reactionsRef = React.useRef(message.reactions);
    reactionsRef.current = message.reactions;

    React.useEffect(
        () => {
            if (pickerRef && pickerRef.current) {
                pickerRef.current.update(reactionsRef.current);
            }
        },
        [pickerRef, reactionsRef.current],
    );

    const handleReactionClick = async (reaction: MessageReactionType) => {
        const messageId = messageIdRef.current;
        const messageKey = messageKeyRef.current;
        const reactions = reactionsRef.current;

        const donate = async() => {
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
            props.engine.setReaction(messageKey, reaction);
            trackEvent('reaction_sent', {
                reaction_type: reaction.toLowerCase(),
                double_tap: 'not',
            });
        };

        const unsetEmoji = () => {
            props.engine.unsetReaction(messageKey, reaction);
        };

        if (messageId) {
            const remove =
                reactions &&
                reactions.filter(
                    userReaction =>
                        userReaction.user.id === messenger.user.id &&
                        userReaction.reaction === reaction,
                ).length > 0;
            if (remove) {
                if (reaction !== MessageReactionType.DONATE) {
                    unsetEmoji();
                    client.mutateMessageUnsetReaction({ messageId, reaction });
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
                    client.mutateMessageSetReaction({ messageId, reaction });
                    setEmoji();
                }
            }
        }
    };

    const [reactionsVisible, reactionsShow] = usePopper(
        { placement: 'top', hideOnLeave: true, borderRadius: 20, scope: 'reaction-picker' },
        () => (
            <ReactionPicker
                ref={pickerRef}
                reactions={reactionsRef.current}
                onPick={handleReactionClick}
            />
        ),
    );
    const visible = menuVisible || reactionsVisible;

    return (
        <div
            className={cx(
                menuContainerClass,
                message.attachTop && attachTop,
                'hover-menu-container',
                visible && forceVisible,
                message.isSending && forceInvisible,
            )}
        >
            <UIconButton
                icon={<LikeIcon />}
                color="var(--foregroundTertiary)"
                size="small"
                active={reactionsVisible}
                onMouseEnter={reactionsShow}
                onClick={e => {
                    e.stopPropagation();
                    handleReactionClick(MessageReactionType.LIKE);
                }}
            />
            <UIconButton
                icon={<CommentIcon />}
                color="var(--foregroundTertiary)"
                size="small"
                onClick={handleCommentClick}
            />
            <UIconButton
                icon={<MoreIcon />}
                color="var(--foregroundTertiary)"
                size="small-densed"
                onClick={menuShow}
                active={menuVisible}
            />
        </div>
    );
});
