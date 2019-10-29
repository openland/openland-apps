import * as React from 'react';
import { css, cx } from 'linaria';
import { SpannedView } from './SpannedView';
import { Span } from 'openland-y-utils/spans/Span';
import { TextCaption } from 'openland-web/utils/TextStyles';

export interface MessageTextComponentProps {
    spans: Span[];
    edited?: boolean;
    shouldCrop?: boolean;
}

const spansMessageWrapper = css`
    display: flex;
    max-width: 680px;
`;

const styleSpansMessageContainer = css`
    display: block;
    white-space: pre-wrap;
    word-wrap: break-word;
    max-width: 100%;
    font-size: 15px;
    line-height: 24px;
    width: 100%;
    font-weight: 400;
    color: var(--foregroundPrimary);

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
    color: var(--foregroundTertiary);
    display: inline-flex;
    align-items: center;
    user-select: none;
`;

export const MessageTextComponent = React.memo<MessageTextComponentProps>(props => {
    const { shouldCrop, spans, edited } = props;

    return (
        <div className={spansMessageWrapper}>
            <div className={cx(styleSpansMessageContainer, shouldCrop && cropTextStyle)}>
                <span>
                    <SpannedView spans={spans} />
                    {!!edited && (
                        <span className={cx(EditLabelStyle, TextCaption)}>
                            {'\u00A0'}
                            (edited)
                        </span>
                    )}
                </span>
            </div>
        </div>
    );
});
