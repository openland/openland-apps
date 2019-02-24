import * as React from 'react';
import { ASFlex } from 'react-native-async-view/ASFlex';
import { ASText } from 'react-native-async-view/ASText';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';

let months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
];

export const AsyncDateSeparator = React.memo<{ year: number, month: number, date: number }>((props) => {
    let theme = React.useContext(ThemeContext);
    let now = new Date();
    let date = 'Today';
    if (now.getFullYear() === props.year) {
        if (now.getMonth() !== props.month || now.getDate() !== props.date) {
            date = months[props.month] + ' ' + props.date;
        }
    } else if (now.getFullYear() === props.year + 1) {
        if (props.month < now.getMonth()) {
            date = props.year + ', ' + months[props.month] + ' ' + props.date;
        } else {
            date = months[props.month] + ' ' + props.date;
        }
    } else {
        date = props.year + ', ' + months[props.month] + ' ' + props.date;
    }
    return (
        <ASFlex alignItems="center" justifyContent="center" backgroundColor={theme.backgroundColor}>
            {/* <ASFlex marginTop={16} height={20} backgroundColor="rgba(153,162,176,0.6)" borderRadius={10}> */}
            <ASText marginTop={20} marginBottom={4} color="#8a8a8f" fontSize={14} height={20} marginLeft={6} marginRight={6}>{date}</ASText>
            {/* </ASFlex> */}
        </ASFlex>
    );
});