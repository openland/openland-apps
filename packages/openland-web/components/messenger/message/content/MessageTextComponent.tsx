import * as React from 'react';
import { FullMessage_GeneralMessage_spans } from 'openland-api/Types';
import { css, cx } from 'linaria';
import { XMemo } from 'openland-y-utils/XMemo';
import { SpannedStringView } from './SpannedStringView';

export interface MessageTextComponentProps {
    spans?: FullMessage_GeneralMessage_spans[];
    message: string;
    isEdited: boolean;
    isService?: boolean;
    shouldCrop?: boolean;
    asPinMessage?: boolean;
}

const styleSpansMessageContainer = css`
    display: inline;
    white-space: pre-wrap;
    word-wrap: break-word;
    max-width: 100%;
    font-size: 14px;
    line-height: 22px;
    letter-spacing: 0;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.8);
`;

const cropTextStyle = css`
    max-width: 100%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
`;

export const MessageTextComponent = XMemo<MessageTextComponentProps>(
    ({ shouldCrop, message, spans, isEdited, asPinMessage }) => (
        <div className={cx(styleSpansMessageContainer, shouldCrop && cropTextStyle)}>
            <SpannedStringView
                message={message}
                spans={spans}
                isEdited={isEdited}
                asPinMessage={asPinMessage}
            />
        </div>
    ),
);
