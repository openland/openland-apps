import * as React from 'react';
import { css, cx } from 'linaria';
import { TypeCaption } from 'openland-web/utils/TypeStyles';
import { XViewRouterContext } from 'react-mental';

const buttonWrapper = css`
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

const buttonSelectedWrapper = css`
    background-color: #FFFFFF; // ThemeDefault.backgroundTertiary
`;

interface MessageCommentsButtonProps {
    messageId: string;
    count: number;
    selected: boolean;
}

export const MessageCommentsButton = React.memo<MessageCommentsButtonProps>(props => {
    const { messageId, count, selected } = props;
    const router = React.useContext(XViewRouterContext);

    return (
        <div
            className={cx(TypeCaption, buttonWrapper, selected && buttonSelectedWrapper)}
            onClick={() => {
                if (router) {
                    router.navigate('/message/' + messageId);
                }
            }}
        >
            {!!count && `${count} comments`}
            {!count && 'Comments'}
        </div>
    );
});
