import * as React from 'react';
import { css } from 'linaria';
import { URickInputInstance, URickTextValue } from 'openland-web/components/unicorn/URickInput';
import { SendMessageComponent } from 'openland-web/fragments/chat/components/SendMessageComponent';
import { StickerFragment } from 'openland-api/Types';

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
    onSentAttach: (files: File[]) => void;
    onStickerSent: (sticker: StickerFragment) => void;
    groupId?: string;
    compact?: boolean;
    forceAutofocus?: boolean;
}

export const CommentInput = React.memo((props: CommentInputProps) => {
    const { onSent, onSentAttach, onStickerSent, groupId, compact } = props;
    const ref = React.useRef<URickInputInstance>(null);

    React.useLayoutEffect(() => {
        let timer: any;
        if (props.forceAutofocus && ref.current) {
            timer = setTimeout(() => {
                ref.current!.focus();
            }, 300);
        }
        return () => clearTimeout(timer);
    }, []);
    return (
        <div className={compact ? wrapperCompactClass : wrapperClass}>
            <SendMessageComponent
                groupId={groupId}
                onTextSentAsync={onSent}
                onAttach={onSentAttach}
                onStickerSentAsync={onStickerSent}
                rickRef={ref}
                placeholder="Write a comment..."
            />
        </div>
    );
});
