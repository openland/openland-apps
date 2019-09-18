import * as React from 'react';
import { DataSourceWebMessageItem } from '../data/WebMessageItemDataSource';
import { css, cx } from 'linaria';
import { SpannedView } from './content/SpannedView';
import { TextDensed } from 'openland-web/utils/TextStyles';

const wrapperClass = css`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-grow: 1;
    flex-shrink: 1;
    text-align: center;
    margin: 4px 16px;
    padding: 6px 0;
`;

const innerClass = css`
    display: inline;
    white-space: pre-wrap;
    word-wrap: break-word;
    max-width: 680px;
    color: var(--foregroundSecondary);
    margin: 0 auto;
`;

interface ServiceMessageProps {
    message: DataSourceWebMessageItem;
}

export const ServiceMessage = (props: ServiceMessageProps) => (
    <div className={wrapperClass}>
        <div className={cx(innerClass, TextDensed)}>
            <span>
                <SpannedView spans={props.message.textSpans} isService={true} />
            </span>
        </div>
    </div>
);
