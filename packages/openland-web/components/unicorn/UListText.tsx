import * as React from 'react';
import { XView, XViewProps } from 'react-mental';
import { TextStyles } from 'openland-web/utils/TextStyles';
import { emoji } from 'openland-y-utils/emoji';
import { css } from 'linaria';

const wrapper = css`
    span {
        display: inline;
    }
`;

const getRows = (value: string) => {
    const processedRows: (JSX.Element | string)[] = [];
    const rows = value.split('\n');

    rows.map((row, index) => {
        processedRows.push(<div key={`line-${index}-${row}`}>{emoji(row)}</div>);
    });

    return processedRows;
};

interface UListTextProps extends XViewProps {
    value?: string | JSX.Element;
}

export const UListText = (props: UListTextProps) => {
    const { value, ...other } = props;

    return (
        <XView
            {...other}
            {...TextStyles.Body}
            paddingHorizontal={16}
            color="var(--foregroundPrimary)"
            flexGrow={1}
            flexShrink={1}
        >
            <div className={wrapper}>
                {typeof value === 'string' && getRows(value)}
                {typeof value !== 'string' && value}
            </div>
        </XView>
    );
};