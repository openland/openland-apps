import * as React from 'react';
import { MessageReactionCounter, MessageReactionType } from 'openland-api/spacex.types';
import { css, cx } from 'linaria';
import { TextDensed } from 'openland-web/utils/TextStyles';
import { useClient } from 'openland-api/useClient';
import { trackEvent } from 'openland-x-analytics';
import { ConversationEngine } from 'openland-engines/messenger/ConversationEngine';

import LikeIcon from 'openland-icons/s/ic-reaction-like-16.svg';

const buttonWrapper = css`
  height: 28px;
  width: 72px;
  border-radius: 14px;
  padding: 5px 12px;
  margin-right: 8px;
  display: flex;
  align-self: flex-start;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  background-color: var(--backgroundTertiary);
  color: var(--foregroundSecondary);

  &:hover {
    background-color: var(--backgroundTertiaryHover);
  }
`;

export interface MessageLikeButtonProps {
    message: {
        id?: string;
        key?: string;
        reactionCounters: MessageReactionCounter[];
    };
    engine?: ConversationEngine;
}

export const MessageLikeButton = React.memo<MessageLikeButtonProps>((props) => {
    const { engine } = props;
    const { id, key, reactionCounters } = props.message;
    const client = useClient();

    const handleClick = React.useCallback(
        async (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
            e.preventDefault();
            e.stopPropagation();

            if (id) {
                if (engine && key) {
                    engine.setReaction(key, MessageReactionType.LIKE);
                }
                trackEvent('reaction_sent', {
                    reaction_type: MessageReactionType.LIKE.toLowerCase(),
                    double_tap: 'not',
                });

                await client.mutateMessageSetReaction({ messageId: id, reaction: MessageReactionType.LIKE });
            }
        },
        [id],
    );

    if (reactionCounters.length !== 0) {
        return null;
    }

    return (
        <div
            className={cx(buttonWrapper, 'message-buttons-wrapper')}
            onClick={handleClick}
        >
            <LikeIcon />

            <div className={TextDensed}>
               Like
            </div>
        </div>
    );
});
