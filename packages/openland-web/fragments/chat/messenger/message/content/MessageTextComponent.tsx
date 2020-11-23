import * as React from 'react';
import { css, cx } from 'linaria';
import { SpannedView } from './SpannedView';
import { Span } from 'openland-y-utils/spans/Span';
import { TextCaption } from 'openland-web/utils/TextStyles';

export interface MessageTextComponentProps {
    mId?: string;
    spans: Span[];
    edited?: boolean;
    chatId?: string;
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

const EditLabelStyle = css`
    vertical-align: baseline;
    color: var(--foregroundTertiary);
    display: inline-flex;
    align-items: center;
    user-select: none;
`;

export const MessageTextComponent = React.memo((props: MessageTextComponentProps) => {
    const { spans, edited, chatId } = props;

    return (
        <div className={spansMessageWrapper}>
            <div className={styleSpansMessageContainer}>
                <span>
                    <SpannedView spans={spans} mId={props.mId} chatId={chatId} />
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
