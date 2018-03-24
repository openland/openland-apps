import * as React from 'react';
import { MessagePage } from './MessagePage';
import { XCard } from './X/XCard';
import { trackError } from '../utils/analytics';

export class RootErrorBoundary extends React.Component<{}, { isError: boolean }> {
    constructor(props: {}) {
        super(props);
        this.state = { isError: false };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        trackError(error);
        this.setState({ isError: true });
    }

    render() {
        if (this.state.isError) {
            return (
                <MessagePage>
                    <XCard.Content>
                        Unexpected error
                    </XCard.Content>
                </MessagePage>
            );
        }
        return <>{this.props.children}</>;
    }
}