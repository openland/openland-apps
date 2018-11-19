import * as React from 'react';
import { trackError } from 'openland-x-analytics';
import { ErrorPage } from './ErrorPage';

export class RootErrorBoundary extends React.Component<{}, { isError: boolean, code?: number }> {
    constructor(props: {}) {
        super(props);
        this.state = { isError: false };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        trackError(error);
        console.warn(JSON.stringify(error));
        let code: number | undefined;
        if ((error as any).graphQLErrors) {
            if ((error as any).graphQLErrors.length > 0) {
                code = (error as any).graphQLErrors[0].code || 500;
            }
        }
        this.setState({ isError: true, code: code });
    }

    render() {
        if (this.state.isError) {
            return (<ErrorPage statusCode={this.state.code} />);
        }
        return <>{this.props.children}</>;
    }
}