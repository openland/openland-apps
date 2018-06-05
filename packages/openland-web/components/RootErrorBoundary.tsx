import * as React from 'react';
import { MessagePage } from './MessagePage';
import { trackError } from 'openland-x-analytics';
import { MessagePageContent } from './MessagePageContent';

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
                    <MessagePageContent title="Ooops!">
                        Something went wrong. Our engineers already working on the problem.
                    </MessagePageContent>
                </MessagePage>
            );
        }
        return <>{this.props.children}</>;
    }
}