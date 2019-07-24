import * as React from 'react';
import { FullMessage_GeneralMessage_reactions, MessageReactionType } from 'openland-api/Types';
import { MessengerContext } from 'openland-engines/MessengerEngine';
import { extractReactionsSorted } from './extractReactions';
import { css, cx } from 'linaria';
import { TypeCaption } from 'openland-web/utils/TypeStyles';
import { useClient } from 'openland-web/utils/useClient';
import { trackEvent } from 'openland-x-analytics';

const reactionsWrapper = css`
    display: flex;
    align-self: flex-start;
    align-items: center;
    background-color: #F0F2F5; // ThemeDefault.backgroundTertiary
    height: 28px;
    border-radius: 14px;
    padding: 5px 12px;
    margin-right: 8px;
`;

const reactionsSelectedWrapper = css`
    background-color: #FFFFFF; // ThemeDefault.backgroundPrimary
`;

const reactionsText = css`
    color: #676D7A; // ThemeDefault.foregroundSecondary
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
    background: red;
    margin-right: 4px;
`;

interface MessageReactionsProps {
    messageId?: string;
    reactions: FullMessage_GeneralMessage_reactions[];
    selected: boolean;
}

export const MessageReactions = React.memo<MessageReactionsProps>(props => {
    const { messageId, reactions, selected } = props;
    const messenger = React.useContext(MessengerContext);
    const client = useClient();
    const handleReactionClick = React.useCallback((reaction: MessageReactionType) => {
        if (messageId) {
            let remove = reactions && reactions.filter(userReaction => userReaction.user.id === messenger.user.id && userReaction.reaction === reaction).length > 0;
            if (remove) {
                client.mutateMessageUnsetReaction({ messageId, reaction });
            } else {
                trackEvent('reaction_sent', { reaction_type: reaction.toLowerCase(), double_tap: 'not' });

                client.mutateMessageSetReaction({ messageId, reaction });
            }
        }
    }, [messageId, reactions]);

    if (reactions.length <= 0) {
        return null;
    }

    const { reactionsSorted, usersString } = extractReactionsSorted(reactions, messenger.user.id);

    return (
        <div className={cx(reactionsWrapper, selected && reactionsSelectedWrapper)}>
            <div className={reactionsItems}>
                {reactionsSorted.map((item, index) => (
                    <div
                        key={'reaction-' + item.reaction + '-' + index}
                        className={reactionsItem}
                        onClick={() => handleReactionClick(item.reaction)}
                    />
                ))}
            </div>

            <div className={cx(TypeCaption, reactionsText)}>
                {usersString}
            </div>
        </div>
    );
});
