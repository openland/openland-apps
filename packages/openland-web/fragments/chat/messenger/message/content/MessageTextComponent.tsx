import * as React from 'react';
import { css, cx } from 'linaria';
import { SpannedView } from './SpannedView';
import { Span } from 'openland-y-utils/spans/Span';
import { UIcon } from 'openland-web/components/unicorn/UIcon';
import EditIcon from 'openland-icons/s/ic-msg-edit-16.svg';
import { TextCaption } from 'openland-web/utils/TextStyles';

export interface MessageTextComponentProps {
    spans: Span[];
    edited: boolean;
    shouldCrop?: boolean;
}

const spansMessageWrapper = css`
    display: flex;
    max-width: 680px;
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
    color: var(--foregroundSecondary);
    display: inline-flex;
    align-items: center;
`;

export const MessageTextComponent = React.memo<MessageTextComponentProps>(
    ({ shouldCrop, spans, edited }) => {
        return (
            <div className={spansMessageWrapper}>
                <div className={cx(styleSpansMessageContainer, shouldCrop && cropTextStyle)}>
                    <span>
                        <SpannedView spans={spans} />
                        {edited && (
                            <span className={cx(EditLabelStyle, TextCaption)}>
                                {'\u00A0'}
                                <UIcon icon={<EditIcon />} color={'var(--foregroundTertiary)'} />
                                Edited
                            </span>
                        )}
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
                    {edited && (
                        <span className={EditLabelStyle}>
                            {'\u00A0'}
                            (edited)
                        </span>
                    )}
                </span>
            </div>
        );
    },
);
