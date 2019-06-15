import * as React from 'react';
import { formatRelativeTime } from 'openland-mobile/utils/formatTime';
import { ASTextProps, ASText } from 'react-native-async-view/ASText';

interface ZRelativeDateAsyncProps extends ASTextProps {
    date: string | number;
}

interface ZRelativeDateAsyncState {
    huminizedDate: string;
}

export class ZRelativeDateAsync extends React.Component<ZRelativeDateAsyncProps, ZRelativeDateAsyncState> {
    private interval: NodeJS.Timeout | undefined = undefined;

    constructor(props: ZRelativeDateAsyncProps) {
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
            <ASText {...other}>{this.state.huminizedDate}</ASText>
        )
    }
};