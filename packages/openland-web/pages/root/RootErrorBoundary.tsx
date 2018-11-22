import * as React from 'react';
import { trackError } from 'openland-x-analytics';
import { ErrorPage } from './ErrorPage';
import { canUseDOM } from 'openland-x-utils/canUseDOM';
import { loadConfig } from 'openland-x-config';
import { buildConfig } from 'openland-web/config';
import * as Sentry from '@sentry/browser';

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
        let cfg = canUseDOM ? loadConfig() : buildConfig();
        if (cfg.sentryEndpoint && cfg.release) {
            Sentry.configureScope(scope => {
                Object.keys(errorInfo).forEach(key => {
                    scope.setExtra(key, errorInfo[key]);
                });
            });
            Sentry.captureException(error);
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