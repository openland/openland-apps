import * as React from 'react';
import { trackError } from 'openland-x-analytics';
import { ErrorPage } from './ErrorPage';
import { WHITE_LISTED_ERROR_NAME } from 'openland-x-graphql/throwErrors';

export class RootErrorBoundary extends React.Component<
    {},
    { isError: boolean; code?: number; message?: string }
> {
    constructor(props: {}) {
        super(props);
        this.state = { isError: false };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        trackError(error);

        if (error.name === WHITE_LISTED_ERROR_NAME) {
            this.setState({ isError: true, code: 500, message: error.message });
        }

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
            return <ErrorPage statusCode={this.state.code} message={this.state.message} />;
        }
        return <>{this.props.children}</>;
    }
}
