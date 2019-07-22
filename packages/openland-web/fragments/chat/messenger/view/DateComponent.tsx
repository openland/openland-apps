import * as React from 'react';
import { DataSourceDateItem } from 'openland-engines/messenger/ConversationEngine';
import { XView } from 'react-mental';

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
        <XView
            key={'date-' + item.date}
            justifyContent="center"
            alignItems="center"
            zIndex={1}
            marginTop={24}
            marginBottom={0}
        >
            <XView
                justifyContent="center"
                alignItems="center"
                backgroundColor="#ffffff"
                borderRadius={50}
                paddingLeft={10}
                paddingRight={10}
                paddingTop={2}
                paddingBottom={2}
            >
                <XView fontSize={13} color="rgba(0, 0, 0, 0.4)">
                    {date}
                </XView>
            </XView>
        </XView>
    );
};