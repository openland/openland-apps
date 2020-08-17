import * as React from 'react';
import { MessageReactionCounter, MessageReactionType } from 'openland-api/spacex.types';
import { css, cx } from 'linaria';
import { TextDensed } from 'openland-web/utils/TextStyles';
import { useClient } from 'openland-api/useClient';
import { trackEvent } from 'openland-x-analytics';
import { ConversationEngine } from 'openland-engines/messenger/ConversationEngine';
import { showReactionsList } from './showReactionsList';

export const reactionImage = (r: MessageReactionType) =>
    `https://cdn.openland.com/shared/reactions/${r}.png`;

const reactionsWrapper = css`
    display: flex;
    align-self: flex-start;
    align-items: center;
    background-color: var(--backgroundTertiary);
    height: 28px;
    border-radius: 14px;
    padding: 5px 0 5px 12px;
    margin-right: 8px;
`;

const reactionsText = css`
    color: var(--foregroundSecondary);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    cursor: pointer;
    padding-right: 12px;
`;

const reactionsItems = css`
    display: flex;
    align-items: center;
    flex-direction: row;
    padding-right: 2px;
`;

const reactionsItem = css`
    width: 16px;
    height: 16px;
    margin-right: 4px;
    flex-shrink: 0;

    img {
        transition: transform 0.1s ease-in;
        display: block;
        width: 16px;
        height: 16px;
    }
`;

const reactionsSetUnsetItem = css`
    cursor: pointer;
    &:hover img {
        transform: translateY(-2px);
    }
`;

interface ReactionItemProps {
    value: MessageReactionCounter;
    onClick: (reaction: MessageReactionType) => void;
    canChange: boolean;
}

const ReactionItem = React.memo((props: ReactionItemProps) => {
    const { value, onClick, canChange } = props;

    return (
        <div
            className={cx(canChange && reactionsSetUnsetItem, reactionsItem)}
            onClick={canChange ? () => onClick(value.reaction) : undefined}
        >
            <img src={reactionImage(value.reaction)} />
        </div>
    );
});

export interface MessageReactionsProps {
    message: {
        id?: string;
        key?: string;
        reactionCounters: MessageReactionCounter[];
    };
    engine?: ConversationEngine;
}

export const MessageReactions = React.memo<MessageReactionsProps>((props) => {
    const { engine } = props;
    const { id, key, reactionCounters } = props.message;
    const client = useClient();
    const handleReactionClick = React.useCallback(
        async (reaction: MessageReactionType) => {
            if (id) {
                const remove = !!reactionCounters.find((r) => r.reaction === reaction && r.setByMe);
                if (reaction === MessageReactionType.DONATE) {
                    return;
                }
                if (remove) {
                    if (engine && key) {
                        engine.unsetReaction(key, reaction);
                    }
                    await client.mutateMessageUnsetReaction({ messageId: id, reaction });
                } else {
                    if (engine && key) {
                        engine.setReaction(key, reaction);
                    }
                    trackEvent('reaction_sent', {
                        reaction_type: reaction.toLowerCase(),
                        double_tap: 'not',
                    });

                    await client.mutateMessageSetReaction({ messageId: id, reaction });
                }
            }
        },
        [id, reactionCounters],
    );

    if (reactionCounters.length === 0) {
        return null;
    }

    const count = reactionCounters.reduce((sum, r) => sum + r.count, 0);
    const likedByMe = !!reactionCounters.find((r) => r.setByMe);
    const otherLikes = !!reactionCounters.find((r) => (r.setByMe && r.count !== 1) || (!r.setByMe));

    return (
        <div
            className={cx(reactionsWrapper, 'message-buttons-wrapper')}
            onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
            }}
        >
            <div className={reactionsItems}>
                {reactionCounters.map((r, i) => {
                    const canChange = r.reaction !== MessageReactionType.DONATE;
                    return (
                        <ReactionItem
                            key={'reaction-' + r.reaction + '-' + i}
                            value={r}
                            onClick={handleReactionClick}
                            canChange={canChange}
                        />
                    );
                })}
            </div>

            <div
                className={cx(TextDensed, reactionsText)}
                onClick={() => showReactionsList(props.message.id || '')}
            >
                {likedByMe && !otherLikes
                    ? 'You'
                    : likedByMe && otherLikes
                    ? `You + ${count - 1}`
                    : count}
            </div>
        </div>
    );
});
