import * as React from 'react';
import { formatRelativeTime } from 'openland-y-utils/formatTime';

interface URelativeDateProps {
    date: string | number;
    className?: string;
}

interface URelativeDateState {
    huminizedDate: string;
}

export class URelativeDate extends React.Component<URelativeDateProps, URelativeDateState> {
    private interval: NodeJS.Timeout | undefined = undefined;

    constructor(props: URelativeDateProps) {
        super(props);

        this.state = {
            huminizedDate: formatRelativeTime(this.props.date)
        };
    }

    componentDidMount() {
        this.interval = setInterval(() => {
            this.setState({
                huminizedDate: formatRelativeTime(this.props.date)
            });
        }, 1000 * 60);
    }

    componentWillUnmount() {
        if (this.interval) {
            clearInterval(this.interval);
        }
    }

    render() {
        const { className } = this.props;

        return (
            <span className={className}>{this.state.huminizedDate}</span>
        );
    }
}