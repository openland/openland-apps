import * as React from 'react';
import { withRouter, RouterState } from '../utils/withRouter';
import { MessagePage } from './MessagePage';
import { XCard } from './X/XCard';

class RootErrorBoundaryHandler extends React.Component<{ router: RouterState }, { isError: boolean }> {
    constructor(props: { router: RouterState }) {
        super(props);
        this.state = { isError: false };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        this.setState({ isError: true });
    }

    render() {
        console.warn('RootErrorBoundary render')
        if (this.state.isError) {
            return (
                <MessagePage>
                    <XCard.Content>
                        Unexpected error
                    </XCard.Content>
                </MessagePage>
            )
        }
        return <>{this.props.children}</>;
    }
};

export const RootErrorBoundary = withRouter<{}>(RootErrorBoundaryHandler);