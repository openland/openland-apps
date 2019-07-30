import * as React from 'react';
import { URickTextValue } from 'openland-web/components/unicorn/URickInput';
import { SendMessageComponent } from 'openland-web/fragments/chat/components/SendMessageComponent';
import { css } from 'linaria';

const wrapper = css`
    padding: 16px 12px;
    max-width: 816px;
    width: 100%;
    margin: 0 auto;
`;

interface CommentInputProps {
    onSent: (data: URickTextValue) => void;
    groupId?: string;
}

export const CommentInput = React.memo((props: CommentInputProps) => {
    const { onSent, groupId } = props;

    return (
        <div className={wrapper}>
            <SendMessageComponent
                groupId={groupId}
                onTextSent={onSent}
                placeholder="Write a comment..."
            />
        </div>
    );
});