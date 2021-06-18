import * as React from 'react';
import { ASFlex } from 'react-native-async-view/ASFlex';
import { ASText } from 'react-native-async-view/ASText';
import { useThemeGlobal } from 'openland-mobile/themes/ThemeContext';
import DateTimeFormatter from 'openland-y-runtime/DateTimeFormatter';

// let months = [
//     'January',
//     'February',
//     'March',
//     'April',
//     'May',
//     'June',
//     'July',
//     'August',
//     'September',
//     'October',
//     'November',
//     'December'
// ];

export const AsyncDateSeparator = React.memo<{ year: number, month: number, date: number }>((props) => {
    let theme = useThemeGlobal();
    let date = (new Date(props.year, props.month, props.date)).getTime();
    // let now = new Date();
    // let date = 'Today';

    // if (now.getFullYear() === props.year) {
    //     if ((now.getDate() - 1) === props.date && now.getMonth() === props.month) {
    //         date = 'Yesterday';
    //     } else if (now.getMonth() !== props.month || now.getDate() !== props.date) {
    //         date = months[props.month] + ' ' + props.date;
    //     }
    // } else if (now.getFullYear() === props.year + 1) {
    //     if (props.month < now.getMonth()) {
    //         date = props.year + ', ' + months[props.month] + ' ' + props.date;
    //     } else {
    //         date = months[props.month] + ' ' + props.date;
    //     }
    // } else {
    //     date = props.year + ', ' + months[props.month] + ' ' + props.date;
    // }

    return (
        <ASFlex alignItems="center" justifyContent="center">
            <ASText
                marginTop={10}
                marginBottom={0}
                color={theme.foregroundSecondary}
                fontSize={13}
                lineHeight={18}
                marginLeft={36}
                marginRight={36}
            >
                {DateTimeFormatter.formatDateFull(date, true)}
            </ASText>
        </ASFlex>
    );
});