import * as React from 'react';
import { ASFlex } from 'react-native-async-view/ASFlex';
import { ASText } from 'react-native-async-view/ASText';

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

export class AsyncDateSeparator extends React.PureComponent<{ year: number, month: number, date: number }> {
    render() {
        let now = new Date();
        let date = 'Today';
        if (now.getFullYear() === this.props.year) {
            if (now.getMonth() !== this.props.month || now.getDate() !== this.props.date) {
                date = months[this.props.month] + ' ' + this.props.date;
            }
        } else {
            date = this.props.year + ', ' + months[this.props.month] + ' ' + this.props.date;
        }
        return (
            <ASFlex alignItems="center" justifyContent="center" backgroundColor="white">
                {/* <ASFlex marginTop={16} height={20} backgroundColor="rgba(153,162,176,0.6)" borderRadius={10}> */}
                <ASText marginTop={20} marginBottom={4} color="#8a8a8f" fontSize={14} height={20} marginLeft={6} marginRight={6}>{date}</ASText>
                {/* </ASFlex> */}
            </ASFlex>
        );
    }
}