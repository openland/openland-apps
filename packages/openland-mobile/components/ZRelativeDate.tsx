import * as React from 'react';
import { Text, TextProps } from 'react-native';
import { formatRelativeTimeShort } from 'openland-y-utils/formatTime';

interface ZRelativeDateProps extends TextProps {
    date: string | number;
}

interface ZRelativeDateState {
    huminizedDate: string;
}

export class ZRelativeDate extends React.Component<ZRelativeDateProps, ZRelativeDateState> {
    private interval: NodeJS.Timeout | undefined = undefined;

    constructor(props: ZRelativeDateProps) {
        super(props);

        this.state = {
            huminizedDate: formatRelativeTimeShort(this.props.date)
        };
    }

    componentDidMount() {
        this.interval = setInterval(() => {
            this.setState({
                huminizedDate: formatRelativeTimeShort(this.props.date)
            });
        }, 1000 * 60);
    }

    componentWillUnmount() {
        if (this.interval) {
            clearInterval(this.interval);
        }
    }

    render() {
        const { date, ...other } = this.props;

        return (
            <Text {...other}>{this.state.huminizedDate}</Text>
        );
    }
}