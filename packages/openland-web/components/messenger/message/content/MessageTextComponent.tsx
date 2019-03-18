import * as React from 'react';
import { FullMessage_GeneralMessage_spans } from 'openland-api/Types';
import { css } from 'linaria';
import { XMemo } from 'openland-y-utils/XMemo';
import { SpansMessage } from './service/ServiceMessageDefault';

export interface MessageTextComponentProps {
    spans?: FullMessage_GeneralMessage_spans[];
    message: string;
    isEdited: boolean;
    isService?: boolean;
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

export const MessageTextComponent = XMemo<MessageTextComponentProps>(props => (
    <div className={styleSpansMessageContainer}>
        <SpansMessage message={props.message} spans={props.spans} isEdited={props.isEdited} />
    </div>
));
