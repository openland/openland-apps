import * as React from 'react';
import { URickTextValue } from 'openland-web/components/unicorn/URickInput';
import { SendMessageComponent } from 'openland-web/fragments/chat/components/SendMessageComponent';
import { css } from 'linaria';

const wrapperClass = css`
    padding: 8px 0;
    width: 100%;
`;

interface CommentInputProps {
    onSent: (data: URickTextValue) => void;
    onSentAttach: (files: File[]) => void;
    groupId?: string;
    compact?: boolean;
}

export const CommentInput = React.memo((props: CommentInputProps) => {
    const { onSent, onSentAttach, groupId, compact } = props;

    return (
        <div className={wrapperClass}>
            <SendMessageComponent
                groupId={groupId}
                onTextSentAsync={onSent}
                onAttach={onSentAttach}
                placeholder="Write a comment..."
            />
        </div>
    );
});