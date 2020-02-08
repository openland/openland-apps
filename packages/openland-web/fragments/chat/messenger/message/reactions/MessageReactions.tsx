import * as React from 'react';
import { MessageReactionType } from 'openland-api/spacex.types';
import { css, cx } from 'linaria';
import { TextDensed } from 'openland-web/utils/TextStyles';
import { useClient } from 'openland-web/utils/useClient';
import { trackEvent } from 'openland-x-analytics';
import { ReactionReducedEmojify } from 'openland-engines/reactions/types';
import { useCaptionPopper } from 'openland-web/components/CaptionPopper';
import { ReactionsUsersInstance, ReactionsUsers } from 'openland-web/components/ReactionsUsers';
import { ConversationEngine } from 'openland-engines/messenger/ConversationEngine';

export const reactionImage = (r: MessageReactionType) =>
    `https://cdn.openland.com/shared/reactions/${r}.png`;

const reactionsWrapper = css`
    display: flex;
    align-self: flex-start;
    align-items: center;
    background-color: var(--backgroundTertiary);
    height: 28px;
    border-radius: 14px;
    padding: 5px 12px;
    margin-right: 8px;
`;

const reactionsText = css`
    color: var(--foregroundSecondary);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const reactionsItems = css`
    display: flex;
    align-items: center;
    flex-direction: row;
    padding-right: 2px;
`;

const reactionsItem = css`
    cursor: pointer;
    width: 16px;
    height: 16px;
    margin-right: 4px;
    flex-shrink: 0;
    
    img {
        display: block;
        width: 16px;
        height: 16px;
    }
`;

interface ReactionItemProps {
    value: ReactionReducedEmojify;
    onClick: (reaction: MessageReactionType) => void;
}

const ReactionItem = React.memo((props: ReactionItemProps) => {
    const { value, onClick } = props;

    // Sorry universe
    const listRef = React.useRef<ReactionsUsersInstance>(null);
    const usersRef = React.useRef(value.users);
    usersRef.current = value.users;

    React.useEffect(
        () => {
            if (listRef && listRef.current) {
                listRef.current.update(value.users);
            }
        },
        [listRef, value.users],
    );

    const [show] = useCaptionPopper({
        getText: ctx => <ReactionsUsers initialUsers={usersRef.current} ref={listRef} ctx={ctx} />,
        placement: 'bottom',
        scope: 'reaction-item',
        width: 280,
    });

    return (
        <div className={reactionsItem} onClick={() => onClick(value.reaction)} onMouseEnter={show}>
            <img src={reactionImage(value.reaction)} />
        </div>
    );
});

export interface MessageReactionsProps {
    message: {
        id?: string;
        key?: string;
        reactionsReducedEmojify: ReactionReducedEmojify[];
        reactionsLabelEmojify: string | JSX.Element;
    };
    engine?: ConversationEngine;
}

export const MessageReactions = React.memo<MessageReactionsProps>(props => {
    const { engine } = props;
    const { id, key, reactionsReducedEmojify, reactionsLabelEmojify } = props.message;
    const client = useClient();
    const handleReactionClick = React.useCallback(
        (reaction: MessageReactionType) => {
            if (id) {
                let remove =
                    reactionsReducedEmojify &&
                    reactionsReducedEmojify.filter(
                        userReaction =>
                            userReaction.my &&
                            userReaction.reaction === reaction,
                    ).length > 0;
                if (remove) {
                    if (engine && key) {
                        engine.unsetReaction(key, reaction);
                    }
                    client.mutateMessageUnsetReaction({ messageId: id, reaction });
                } else {
                    if (engine && key) {
                        engine.setReaction(key, reaction);
                    }
                    trackEvent('reaction_sent', {
                        reaction_type: reaction.toLowerCase(),
                        double_tap: 'not',
                    });

                    client.mutateMessageSetReaction({ messageId: id, reaction });
                }
            }
        },
        [id, reactionsReducedEmojify],
    );

    if (reactionsReducedEmojify.length <= 0) {
        return null;
    }

    return (
        <div
            className={cx(reactionsWrapper, 'message-buttons-wrapper')}
            onClick={e => {
                e.preventDefault();
                e.stopPropagation();
            }}
        >
            <div className={reactionsItems}>
                {reactionsReducedEmojify.map((r, i) => (
                    <ReactionItem
                        key={'reaction-' + r.reaction + '-' + i}
                        value={r}
                        onClick={handleReactionClick}
                    />
                ))}
            </div>

            <div className={cx(TextDensed, reactionsText)}>{reactionsLabelEmojify}</div>
        </div>
    );
});
