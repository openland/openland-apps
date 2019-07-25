import * as React from 'react';
import { URelativeDate } from 'openland-web/components/unicorn/URelativeDate';
import { css } from 'linaria';

const wrapper = css`
    display: flex;
    flex-direction: row;
`;

const dateClass = css`
    color: #676D7A; // ThemeDefault.foregroundSecondary
`;

interface CommentToolsProps {
    date: number;
    onReplyClick: () => void;
    onDeleteClick: () => void;
}

export const CommentTools = React.memo((props: CommentToolsProps) => {
    const { date, onReplyClick, onDeleteClick } = props;

    return (
        <div className={wrapper}>
            <URelativeDate date={date} className={dateClass} />
            <div onClick={onReplyClick}>Reply</div>
            <div onClick={onDeleteClick}>Delete</div>
        </div>
    );
});