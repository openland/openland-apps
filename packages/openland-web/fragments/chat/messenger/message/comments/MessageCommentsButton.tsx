import * as React from 'react';
import { css, cx } from 'linaria';
import { TextDensed } from 'openland-web/utils/TextStyles';
import { XViewRouterContext } from 'react-mental';
import { DataSourceWebMessageItem } from '../../data/WebMessageItemDataSource';
import { plural } from 'openland-y-utils/plural';
import CommentsIcon from 'openland-icons/s/ic-discuss-16.svg';

const messageCommentsButtonWrapper = css`
    display: flex;
    align-self: flex-start;
    align-items: center;
    background-color: var(--backgroundTertiary);
    height: 28px;
    border-radius: 14px;
    padding: 5px 12px;
    margin-right: 8px;
    color: var(--foregroundSecondary);
    cursor: pointer;
    & span {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
`;

const iconWrapper = css`
    display: flex;
    align-items: center;
    margin-right: 6px;
    flex-shrink: 0;

    svg {
        width: 16px;
        height: 16px;
        
        path {
            fill: var(--accentPrimary);
        }
    }
`;

interface MessageCommentsButtonProps {
    message: DataSourceWebMessageItem;
    isChannel: boolean;
}

export const MessageCommentsButton = React.memo<MessageCommentsButtonProps>(props => {
    const { message, isChannel } = props;
    const { id, commentsCount } = message;
    const router = React.useContext(XViewRouterContext);

    if ((isChannel || commentsCount > 0) && id) {
        return (
            <div
                className={cx(TextDensed, messageCommentsButtonWrapper, 'message-buttons-wrapper')}
                onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();

                    if (router) {
                        router.navigate('/message/' + id);
                    }
                }}
            >
                <div className={iconWrapper}>
                    <CommentsIcon />
                </div>
                <span>
                    {!!commentsCount && plural(commentsCount, ['comment', 'comments'])}
                    {!commentsCount && 'Comments'}
                </span>
            </div>
        );
    }

    return null;
});
