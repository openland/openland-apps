import * as React from 'react';
import { MessageCounterReactions, MessageReactionType } from 'openland-api/spacex.types';
import { css, cx } from 'linaria';
import { TextDensed } from 'openland-web/utils/TextStyles';
import { useClient } from 'openland-api/useClient';
import { trackEvent } from 'openland-x-analytics';
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
    reaction: MessageReactionType;
    onClick: (reaction: MessageReactionType) => void;
}

const ReactionItem = React.memo((props: ReactionItemProps) => {
    const { onClick, reaction } = props;

    return (
        <div className={reactionsItem} onClick={() => onClick(reaction)}>
            <img src={reactionImage(reaction)} />
        </div>
    );
});

export interface MessageReactionsProps {
    message: {
        id?: string;
        key?: string;
        reactionFullCounter: string;
        reactionCounters: MessageCounterReactions[];
    };
    engine?: ConversationEngine;
}

export const MessageReactions = React.memo<MessageReactionsProps>(props => {
    console.log(props.message);
    const { id, reactionFullCounter, reactionCounters } = props.message;
    const client = useClient();
    const handleReactionClick = React.useCallback(
        async (reaction: MessageReactionType) => {
            if (id) {
                const remove = reactionCounters && reactionCounters.filter(r => r.setByMe).length > 0;
                // let remove =
                //     reactionsReducedEmojify &&
                //     reactionsReducedEmojify.filter(
                //         userReaction =>
                //             userReaction.my &&
                //             userReaction.reaction === reaction,
                //     ).length > 0;
                if (reaction === MessageReactionType.DONATE) {
                    return;
                }
                if (remove) {
                    // if (engine && key) {
                    //     engine.unsetReaction(key, reaction);
                    // }
                    await client.mutateMessageUnsetReaction({ messageId: id, reaction });
                } else {
                    // if (engine && key) {
                    //     engine.setReaction(key, reaction);
                    // }
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

    if (reactionCounters.length <= 0) {
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
                {reactionCounters.map((r, i) => (
                    <ReactionItem
                        key={'reaction-' + r.reaction + '-' + i}
                        reaction={r.reaction}
                        onClick={handleReactionClick}
                    />
                ))}
            </div>

            <div className={cx(TextDensed, reactionsText)}>{reactionFullCounter}</div>
        </div>
    );
});
