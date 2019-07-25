import * as React from 'react';
import { URelativeDate } from 'openland-web/components/unicorn/URelativeDate';
import { css, cx } from 'linaria';
import { TextCaption } from 'openland-web/utils/TextStyles';

const wrapperClass = css`
    display: flex;
    flex-direction: row;
    margin-top: 8px;
`;

const dateClass = css`
    color: #676D7A; // ThemeDefault.foregroundSecondary
`;

const replyClass = css`
    cursor: pointer;
    margin-left: 8px;
    color: #0C7FF2; // ThemeDefault.accentPrimary
`;

const deleteClass = css`
    cursor: pointer;
    margin-left: 8px;
    color: #676D7A; // ThemeDefault.foregroundSecondary
`;

interface CommentToolsProps {
    date: number;
    deleted: boolean;
    onReplyClick: () => void;
    onDeleteClick: () => void;
}

export const CommentTools = React.memo((props: CommentToolsProps) => {
    const { date, deleted, onReplyClick, onDeleteClick } = props;

    return (
        <div className={wrapperClass}>
            <URelativeDate date={date} className={cx(TextCaption, dateClass)} />

            {!deleted && (
                <>
                    <div className={cx(TextCaption, replyClass)} onClick={onReplyClick}>Reply</div>
                    <div className={cx(TextCaption, deleteClass)} onClick={onDeleteClick}>Delete</div>
                </>
            )}
        </div>
    );
});