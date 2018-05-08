import * as React from 'react';
import { MessagePage } from './MessagePage';
import { trackError } from '../utils/analytics';
import { XContent } from 'openland-x-layout/XContent';

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
                    <XContent>
                        Unexpected error
                    </XContent>
                </MessagePage>
            );
        }
        return <>{this.props.children}</>;
    }
}