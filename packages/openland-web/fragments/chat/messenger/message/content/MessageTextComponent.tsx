import * as React from 'react';
import { css, cx } from 'linaria';
import { SpannedView } from './SpannedView';
import { Span } from 'openland-y-utils/spans/Span';

export interface MessageTextComponentProps {
    spans: Span[];
    edited: boolean;
    shouldCrop?: boolean;
}

const spansMessageWrapper = css`
    display: flex;
`;

const styleSpansMessageContainer = css`
    display: inline;
    white-space: pre-wrap;
    word-wrap: break-word;
    max-width: 100%;
    font-size: 15px;
    line-height: 24px;
    letter-spacing: 0;
    font-weight: 400;
    color: #171b1f; // ThemeDefault.foregroundPrimary
    
    & > span br:last-child {
        display: none;
    }
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
    vertical-align: baseline;
    color: rgba(0, 0, 0, 0.4);
    font-size: 13px;
    font-weight: 400;
    line-height: 22px;
    letter-spacing: 0;
`;

export const MessageTextComponent = React.memo<MessageTextComponentProps>(
    ({ shouldCrop, spans, edited }) => {
        return (
            <div className={spansMessageWrapper}>
                <div className={cx(styleSpansMessageContainer, shouldCrop && cropTextStyle)}>
                    <span>
                        <SpannedView spans={spans} />
                        {edited && <span className={EditLabelStyle}>{'\u00A0'}(edited)</span>}
                    </span>
                </div>
            </div>
        );
    },
);

export const MessageTextComponentSpanned = React.memo<MessageTextComponentProps>(
    ({ shouldCrop, spans, edited }) => {
        return (
            <div className={cx(styleSpansMessageContainer, shouldCrop && cropTextStyle)}>
                <span>
                    <SpannedView spans={spans} />
                    {edited && <span className={EditLabelStyle}>{'\u00A0'}(edited)</span>}
                </span>
            </div>
        );
    },
);
