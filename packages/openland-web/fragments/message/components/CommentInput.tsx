import * as React from 'react';
import { URickTextValue } from 'openland-web/components/unicorn/URickInput';
import { SendMessageComponent } from 'openland-web/fragments/chat/components/SendMessageComponent';
import { css } from 'linaria';

const wrapperClass = css`
    padding: 16px;
    max-width: 824px;
    width: 100%;
    margin: 0 auto;
`;

const wrapperCompactClass = css`
    padding: 8px 0;
    width: 100%;
`;

interface CommentInputProps {
    onSent: (data: URickTextValue) => void;
    groupId?: string;
    compact?: boolean;
}

export const CommentInput = React.memo((props: CommentInputProps) => {
    const { onSent, groupId, compact } = props;

    return (
        <div className={compact ? wrapperCompactClass : wrapperClass}>
            <SendMessageComponent
                groupId={groupId}
                onTextSent={onSent}
                placeholder="Write a comment..."
            />
        </div>
    );
});