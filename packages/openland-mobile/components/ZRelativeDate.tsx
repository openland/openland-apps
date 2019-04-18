import * as React from 'react';
import { Text, TextProps } from 'react-native';
import { formatRelativeTime } from 'openland-mobile/utils/formatTime';

interface ZRelativeDateProps extends TextProps {
    date: string;
}

interface ZRelativeDateState {
    huminizedDate: string;
}

export class ZRelativeDate extends React.Component<ZRelativeDateProps, ZRelativeDateState> {
    private interval: NodeJS.Timeout | undefined = undefined;

    constructor(props: ZRelativeDateProps) {
        super(props);

        this.state = {
            huminizedDate: formatRelativeTime(this.props.date)
        }
    }

    componentDidMount() {
        this.interval = setInterval(() => {
            this.setState({
                huminizedDate: formatRelativeTime(this.props.date)
            })
        }, 1000 * 60);
    }

    componentWillUnmount() {
        if (this.interval) {
            clearInterval(this.interval);
        }
    }

    render () {
        const { date, ...other } = this.props;

        return (
            <Text {...other}>{this.state.huminizedDate}</Text>
        )
    }
};