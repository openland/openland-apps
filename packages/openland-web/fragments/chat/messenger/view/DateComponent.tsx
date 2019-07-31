import * as React from 'react';
import { css, cx } from 'linaria';
import { DataSourceDateItem } from 'openland-engines/messenger/ConversationEngine';
import { TextCaption } from 'openland-web/utils/TextStyles';

const dateDividerContainer = css`
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: center;
    height: 32px;
    position: relative;
    margin: 4px 0;
`;

const dateText = css`
    color: #676d7a;
    text-align: center;
`;

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export const DateComponent = (props: { item: DataSourceDateItem }) => {
    let { item } = props;
    let now = new Date();
    let date = 'Today';
    if (now.getFullYear() === item.year) {
        if (now.getMonth() !== item.month || now.getDate() !== item.date) {
            date = months[item.month] + ' ' + item.date;
        }
    } else {
        date = item.year + ', ' + months[item.month] + ' ' + item.date;
    }
    return (
        <div key={'date-' + item.date} className={dateDividerContainer}>
            <div className={cx(dateText, TextCaption)}>{date}</div>
        </div>
    );
};
