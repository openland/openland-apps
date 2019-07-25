import * as React from 'react';
import { css, cx } from 'linaria';
import { TextCaption } from 'openland-web/utils/TextStyles';
import { XViewRouterContext } from 'react-mental';
import { DataSourceWebMessageItem } from '../../data/WebMessageItemDataSource';
import { plural } from 'openland-y-utils/plural';

export const messageCommentsButtonWrapper = css`
    display: flex;
    align-self: flex-start;
    align-items: center;
    background-color: #F0F2F5; // ThemeDefault.backgroundTertiary
    height: 28px;
    border-radius: 14px;
    padding: 5px 12px;
    margin-right: 8px;
    color: #676D7A; // ThemeDefault.foregroundSecondary
    cursor: pointer;
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
                className={cx(TextCaption, messageCommentsButtonWrapper, 'message-buttons-wrapper')}
                onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();

                    if (router) {
                        router.navigate('/message/' + id);
                    }
                }}
            >
                [ICON]
                {!!commentsCount && plural(commentsCount, ['comment', 'comments'])}
                {!commentsCount && 'Comments'}
            </div>
        );
    }

    return null;
});
