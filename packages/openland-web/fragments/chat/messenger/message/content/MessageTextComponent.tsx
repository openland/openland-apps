import * as React from 'react';
import { css, cx } from 'linaria';
import { SpannedView } from './SpannedView';
import { Span, SpanType } from 'openland-y-utils/spans/Span';
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
    white-space: nowrap;
    text-overflow: ellipsis;
`;

const EditLabelStyle = css`
    vertical-align: baseline;
    color: var(--foregroundTertiary);
    display: inline-flex;
    align-items: center;
    user-select: none;
`;

const cropBy = {
    [SpanType.loud]: 36,
    [SpanType.emoji]: 46,
    [SpanType.rotating]: 28,
    [SpanType.insane]: 28,
};

export const MessageTextComponent = React.memo<MessageTextComponentProps>(props => {
    const { shouldCrop, spans, edited } = props;
    const [firstSpan] = spans;
    const spanType = firstSpan && firstSpan.type;
    const maxHeight = `${cropBy[spanType] || 24}px`;
    const hasMaxHeight = shouldCrop && spanType !== SpanType.code_block;

    return (
        <div className={spansMessageWrapper}>
            <div className={cx(styleSpansMessageContainer, shouldCrop && cropTextStyle)} style={{maxHeight: hasMaxHeight ? maxHeight : undefined}}>
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
