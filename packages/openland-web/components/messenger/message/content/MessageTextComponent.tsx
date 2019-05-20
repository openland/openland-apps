import * as React from 'react';
import { css, cx } from 'linaria';
import { SpannedView } from './SpannedView';
import { Span } from 'openland-y-utils/spans/Span';
import { useCheckPerf } from 'openland-web/hooks/useCheckPerf';

export interface MessageTextComponentProps {
    isComment?: boolean;
    spans: Span[];
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
    white-space: pre-wrap;
    word-wrap: break-word;
    text-overflow: ellipsis;
    max-height: 20px;
`;

const EditLabelStyle = css`
    display: inline-block;
    vertical-align: baseline;
    color: rgba(0, 0, 0, 0.4);
    font-size: 13px;
    font-weight: 400;
    line-height: 22px;
    padding-left: 6px;
    letter-spacing: 0;
`;

export const MessageTextComponent = React.memo<MessageTextComponentProps>(
    ({ shouldCrop, spans, isEdited, asPinMessage, isService, isComment }) => {
        // useCheckPerf({ name: 'MessageTextComponent' });
        return (
            <div className={cx(styleSpansMessageContainer, shouldCrop && cropTextStyle)}>
                <span>
                    <SpannedView spans={spans} />
                    {isEdited && !isComment && <span className={EditLabelStyle}>(Edited)</span>}
                </span>
            </div>
        );
    },
);

export const MessageTextComponentSpanned = React.memo<MessageTextComponentProps>(
    ({ shouldCrop, spans, isEdited, isService, isComment }) => {
        // useCheckPerf({ name: 'MessageTextComponentSpanned' });
        return (
            <div className={cx(styleSpansMessageContainer, shouldCrop && cropTextStyle)}>
                <span>
                    <SpannedView spans={spans} />
                    {isEdited && !isComment && <span className={EditLabelStyle}>(Edited)</span>}
                </span>
            </div>
        );
    },
);
