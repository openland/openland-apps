import * as React from 'react';
import { URickTextValue } from 'openland-web/components/unicorn/URickInput';
import { SendMessageComponent } from 'openland-web/fragments/chat/components/SendMessageComponent';

interface CommentInputProps {
    onSent: (data: URickTextValue) => void;
    groupId?: string;
}

export const CommentInput = React.memo((props: CommentInputProps) => {
    const { onSent, groupId } = props;

    return (
        <div>
            <SendMessageComponent
                groupId={groupId}
                onTextSent={onSent}
                placeholder="Write a comment..."
            />
        </div>
    );
});