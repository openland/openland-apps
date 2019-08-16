import * as React from 'react';
import { MessageReactionType, FullMessage_GeneralMessage_reactions } from 'openland-api/Types';
import { MessengerContext } from 'openland-engines/MessengerEngine';
import { css, cx } from 'linaria';
import { TextDensed } from 'openland-web/utils/TextStyles';
import { useClient } from 'openland-web/utils/useClient';
import { trackEvent } from 'openland-x-analytics';
import { ReactionReducedEmojify, ReactionUser, ReactionUserEmojify } from 'openland-engines/reactions/types';
import { useCaptionPopper } from 'openland-web/components/CaptionPopper';

export const reactionImage = (r: MessageReactionType) => `https://cdn.openland.com/shared/reactions/${r}.png`;

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

interface ReactionItemProps {
    value: ReactionReducedEmojify;
    onClick: (reaction: MessageReactionType) => void;
}

interface UsersListInstance {
    update: (newUsers: ReactionUserEmojify[]) => void;
}

// Sorry universe
const UsersList = React.memo(React.forwardRef((props: { initialUsers: ReactionUserEmojify[] }, ref: React.Ref<UsersListInstance>) => {
    const [users, setUsers] = React.useState<ReactionUserEmojify[]>(props.initialUsers);

    React.useImperativeHandle(ref, () => ({
        update: (newUsers: ReactionUser[]) => {
            setUsers(newUsers);
        },
    }));

    return (
        <>
            {users.map((u, i) =>
                <div key={`user-${u.name}-${i}`}>
                    {u.name}
                </div>
            )}
        </>
    );
}));

const ReactionItem = React.memo((props: ReactionItemProps) => {
    const { value, onClick } = props;

    // Sorry universe
    const listRef = React.useRef<UsersListInstance>(null);
    const usersRef = React.useRef(value.users);
    usersRef.current = value.users;

    React.useEffect(() => {
        if (listRef && listRef.current) {
            listRef.current.update(value.users);
        }
    }, [listRef, value.users]);

    const [show] = useCaptionPopper({
        getText: () => (
            <UsersList initialUsers={usersRef.current} ref={listRef} />
        ),
        placement: 'bottom',
        scope: 'reaction-item'
    });

    return (
        <div
            className={reactionsItem}
            onClick={() => onClick(value.reaction)}
            onMouseEnter={show}
        >
            <img src={reactionImage(value.reaction)} />
        </div>
    );
});

interface MessageReactionsProps {
    messageId?: string;
    reactions: FullMessage_GeneralMessage_reactions[];
    reactionsReduced: ReactionReducedEmojify[];
    reactionsLabel: string | JSX.Element;
}

export const MessageReactions = React.memo<MessageReactionsProps>(props => {
    const { messageId, reactions, reactionsReduced, reactionsLabel } = props;
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

    return (
        <div
            className={cx(reactionsWrapper, 'message-buttons-wrapper')}
            onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
            }}
        >
            <div className={reactionsItems}>
                {reactionsReduced.map((r, i) => (
                    <ReactionItem
                        key={'reaction-' + r.reaction + '-' + i}
                        value={r}
                        onClick={handleReactionClick}
                    />
                ))}
            </div>

            <div className={cx(TextDensed, reactionsText)}>
                {reactionsLabel}
            </div>
        </div>
    );
});
