import * as React from 'react';
import { DataSourceWebMessageItem } from '../data/WebMessageItemDataSource';
import { css } from 'linaria';
import { SpannedView } from './content/SpannedView';

const messageWrapClass = css`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-grow: 1;
    flex-shrink: 1;
    text-align: center;
    margin-top: 4px;
    margin-bottom: 4px;
`;

const styleSpansMessageContainer = css`
    display: inline;
    white-space: pre-wrap;
    word-wrap: break-word;
    max-width: 100%;
    font-size: 13px;
    line-height: 18px;
    color: #676D7A;
`;

interface ServiceMessageProps {
    message: DataSourceWebMessageItem;
}

export const ServiceMessage = (props: ServiceMessageProps) => (
    <div className={messageWrapClass}>
        <div className={styleSpansMessageContainer}>
            <span>
                <SpannedView spans={props.message.textSpans} isService />
            </span>
        </div>
    </div>
);
