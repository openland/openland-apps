import * as React from 'react';
import { MessageReactionType } from 'openland-api/Types';
import { MessengerContext } from 'openland-engines/MessengerEngine';
import { extractReactionsSorted } from './extractReactions';
import { css, cx } from 'linaria';
import { TextCaption } from 'openland-web/utils/TextStyles';
import { useClient } from 'openland-web/utils/useClient';
import { trackEvent } from 'openland-x-analytics';
import { DataSourceWebMessageItem } from '../../data/WebMessageItemDataSource';

const reactionsImagesMap: { [key in MessageReactionType]: string } = {
    'LIKE': 'https://cdn.openland.com/shared/emoji/64/2764.png',
    'THUMB_UP': 'https://cdn.openland.com/shared/emoji/64/1f44d.png',
    'JOY': 'https://cdn.openland.com/shared/emoji/64/1f602.png',
    'SCREAM': 'https://cdn.openland.com/shared/emoji/64/1f631.png',
    'CRYING': 'https://cdn.openland.com/shared/emoji/64/1f622.png',
    'ANGRY': 'https://cdn.openland.com/shared/emoji/64/1f92c.png'
};

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
    margin-right: 4px;

    img {
        display: block;
        width: 16px;
        height: 16px;
    }
`;

interface MessageReactionsProps {
    message: DataSourceWebMessageItem;
}

export const MessageReactions = React.memo<MessageReactionsProps>(props => {
    const { message } = props;
    const { id, reactions } = message;
    const messenger = React.useContext(MessengerContext);
    const client = useClient();
    const handleReactionClick = React.useCallback((reaction: MessageReactionType) => {
        if (id) {
            let remove = reactions && reactions.filter(userReaction => userReaction.user.id === messenger.user.id && userReaction.reaction === reaction).length > 0;
            if (remove) {
                client.mutateMessageUnsetReaction({ messageId: id, reaction });
            } else {
                trackEvent('reaction_sent', { reaction_type: reaction.toLowerCase(), double_tap: 'not' });

                client.mutateMessageSetReaction({ messageId: id, reaction });
            }
        }
    }, [id, reactions]);

    if (reactions.length <= 0) {
        return null;
    }

    const { reactionsSorted, usersString } = extractReactionsSorted(reactions, messenger.user.id);

    return (
        <div
            className={cx(reactionsWrapper, 'message-buttons-wrapper')}
            onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
            }}
        >
            <div className={reactionsItems}>
                {reactionsSorted.map((item, index) => (
                    <div
                        key={'reaction-' + item.reaction + '-' + index}
                        className={reactionsItem}
                        onClick={() => handleReactionClick(item.reaction)}
                    >
                        <img src={reactionsImagesMap[item.reaction]} />
                    </div>
                ))}
            </div>

            <div className={cx(TextCaption, reactionsText)}>
                {usersString}
            </div>
        </div>
    );
});
