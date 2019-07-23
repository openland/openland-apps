import * as React from 'react';
import { FullMessage_GeneralMessage_reactions, MessageReactionType } from 'openland-api/Types';
import { MessengerContext } from 'openland-engines/MessengerEngine';
import { extractReactionsSorted } from './extractReactions';
import { css, cx } from 'linaria';
import { TypeCaption } from 'openland-web/utils/TypeStyles';

const reactionsWrapper = css`
    display: flex;
    align-self: flex-start;
    align-items: center;
    background-color: #F0F2F5; // ThemeDefault.backgroundTertiary
    height: 28px;
    border-radius: 14px;
    padding: 5px 12px;
`;

const reactionsText = css`
    color: #676D7A; // ThemeDefault.foregroundSecondary
`;

const reactionsItems = css`
    align-items: center;
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
    reactions?: FullMessage_GeneralMessage_reactions[];
}

export const MessageReactions = React.memo<MessageReactionsProps>(props => {
    const { reactions } = props;
    const messenger = React.useContext(MessengerContext);
    const handleReactionClick = React.useCallback((reaction: MessageReactionType) => {
        console.warn('boom', reaction);
    }, []);

    if (!reactions || reactions.length <= 0) {
        return null;
    }

    const { reactionsSorted, usersString } = extractReactionsSorted(reactions, messenger.user.id);

    return (
        <div className={reactionsWrapper}>
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
