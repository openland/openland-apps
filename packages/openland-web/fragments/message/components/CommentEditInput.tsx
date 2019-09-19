import * as React from 'react';
import { URickTextValue, convertToInputValue } from 'openland-web/components/unicorn/URickInput';
import { SendMessageComponent } from 'openland-web/fragments/chat/components/SendMessageComponent';
import { css } from 'linaria';
import { Span } from 'openland-y-utils/spans/Span';

const wrapperClass = css`
    padding: 8px 0;
    width: 100%;
`;

interface CommentEditInputProps {
    onSave: (data: URickTextValue) => void;
    text: string;
    textSpans: Span[];
    groupId?: string;
}

export const CommentEditInput = React.memo((props: CommentEditInputProps) => {
    const { onSave, groupId, text, textSpans } = props;

    const value = convertToInputValue(text, textSpans);

    return (
        <div className={wrapperClass}>
            <SendMessageComponent
                groupId={groupId}
                onTextSentAsync={onSave}
                placeholder="Write a comment..."
                initialText={value}
            />
        </div>
    );
});