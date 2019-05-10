import * as React from 'react';
import { FullMessage_GeneralMessage_spans } from 'openland-api/Types';
import { css, cx } from 'linaria';
import { SpannedView } from './SpannedView';
import { processSpans } from 'openland-y-utils/spans/proccessSpans';
import { Span } from 'openland-y-utils/spans/Span';
import { emojifyText } from '../../data/spansMessageTextPreprocess';

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
    ({ shouldCrop, message, spans, isEdited, asPinMessage, isService }) => {
        // let spannedString = spansPreprocess(message, spans, { disableBig: asPinMessage });

        let parts = processSpans(message, spans, (text) => emojifyText(text));

        return (
            <div className={cx(styleSpansMessageContainer, shouldCrop && cropTextStyle)}>
                <span>
                    <SpannedView spans={parts} />
                    {isEdited && <span className={EditLabelStyle}>(Edited)</span>}
                </span>
            </div>
        );
    },
);

export const MessageTextComponentSpanned = React.memo<{
    spans: Span[];
    isEdited: boolean;
    isService?: boolean;
    shouldCrop?: boolean;
    asPinMessage?: boolean;
    deleted?: boolean;
}>(({ shouldCrop, spans, isEdited, isService, deleted }) => {
    return (
        <div className={cx(styleSpansMessageContainer, shouldCrop && cropTextStyle)}>
            <span>
                <SpannedView spans={spans} />
                {isEdited && <span className={EditLabelStyle}>(Edited)</span>}
            </span>
        </div>
    );
});
