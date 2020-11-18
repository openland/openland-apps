import * as React from 'react';
import { css } from 'linaria';
import { URickInputInstance, URickTextValue } from 'openland-web/components/unicorn/URickInput';
import { SendMessageComponent } from 'openland-web/fragments/chat/components/SendMessageComponent';
import { StickerFragment } from 'openland-api/spacex.types';

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
    onSent: (data: URickTextValue) => Promise<boolean>;
    onSentAttach: (files: File[], text: URickTextValue | undefined, isImage: boolean) => void;
    onStickerSent: (sticker: StickerFragment) => void;
    groupId?: string;
    compact?: boolean;
    forceAutofocus?: boolean;
}

export type CommentInputRef = Pick<URickInputInstance, 'getText' | 'clear'>;

export const CommentInput = React.memo(React.forwardRef<CommentInputRef, CommentInputProps>((props, forwardedRef) => {
    const { onSent, onSentAttach, onStickerSent, groupId, compact } = props;
    const ref = React.useRef<URickInputInstance>(null);

    React.useImperativeHandle(forwardedRef, () => ({
        getText: () => ref.current!.getText(),
        clear: () => ref.current!.clear(),
    }));

    React.useLayoutEffect(() => {
        let timer: any;
        if (props.forceAutofocus && ref.current) {
            timer = setTimeout(() => {
                ref.current!.focus();
            }, 300);
        }
        return () => clearTimeout(timer);
    }, []);

    const handleAttach = React.useCallback((files: File[], text: URickTextValue | undefined, isImage: boolean) => {
        ref.current?.clear();
        onSentAttach(files, text, isImage);
    }, []);
    return (
        <div className={compact ? wrapperCompactClass : wrapperClass}>
            <SendMessageComponent
                groupId={groupId}
                onTextSentAsync={onSent}
                onAttach={handleAttach}
                onStickerSentAsync={onStickerSent}
                rickRef={ref}
                hideDonation={true}
                placeholder="Write a comment..."
            />
        </div>
    );
}));
