import * as React from 'react';
import { FullMessage_GeneralMessage_spans } from 'openland-api/Types';
import { css, cx } from 'linaria';
import { SpannedStringView } from './SpannedStringView';
import { spansPreprocess } from '../../data/spansPreprocess';
import { SpannedString } from '../../data/SpannedString';

export interface MessageTextComponentProps {
    spans?: FullMessage_GeneralMessage_spans[];
    isComment?: boolean;
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

export const MessageTextComponent = React.memo<MessageTextComponentProps & { message: string }>(
    ({ shouldCrop, message, spans, isEdited, asPinMessage, isService, isComment }) => {
        let spannedString = spansPreprocess(message, spans, { disableBig: asPinMessage });
        return (
            <div className={cx(styleSpansMessageContainer, shouldCrop && cropTextStyle)}>
                <span>
                    <SpannedStringView spannedString={spannedString} isService={isService} />
                    {isEdited && !isComment && <span className={EditLabelStyle}>(Edited)</span>}
                </span>
            </div>
        );
    },
);

export const MessageTextComponentSpanned = React.memo<
    MessageTextComponentProps & {
        spannedString: SpannedString;
    }
>(({ shouldCrop, spannedString, isEdited, isService, isComment }) => {
    return (
        <div className={cx(styleSpansMessageContainer, shouldCrop && cropTextStyle)}>
            <span>
                <SpannedStringView spannedString={spannedString} isService={isService} />
                {isEdited && !isComment && <span className={EditLabelStyle}>(Edited)</span>}
            </span>
        </div>
    );
});
