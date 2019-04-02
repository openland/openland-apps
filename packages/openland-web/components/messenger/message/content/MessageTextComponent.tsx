import * as React from 'react';
import { FullMessage_GeneralMessage_spans } from 'openland-api/Types';
import { css, cx } from 'linaria';
import { XMemo } from 'openland-y-utils/XMemo';
import { SpansMessage } from './service/ServiceMessageDefault';
import { XButton } from 'openland-x/XButton';
import { XView } from 'react-mental';
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
            <SpansMessage
                message={message}
                spans={spans}
                isEdited={isEdited}
                asPinMessage={asPinMessage}
            />

            <XView width={100}>
                <XButton
                    text="Discuss"
                    size="default"
                    onClick={() => {
                        console.log('click click!');
                    }}
                />
            </XView>
        </div>
    ),
);
