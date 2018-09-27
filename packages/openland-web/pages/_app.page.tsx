import React from 'react';
import App, { AppProps } from 'next/app';
import * as Sentry from '@sentry/browser';
import { loadConfig } from 'openland-x-config';

export default class MyApp extends App {

    private isSentryEnabled = false;

    constructor(props: AppProps) {
        super(props);
        let cfg = loadConfig();
        if (cfg.sentryEndpoint && cfg.release) {
            this.isSentryEnabled = true;
            Sentry.init({ dsn: cfg.sentryEndpoint, release: cfg.release });
        }
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        if (this.isSentryEnabled) {
            Sentry.configureScope(scope => {
                Object.keys(errorInfo).forEach(key => {
                    scope.setExtra(key, errorInfo[key]);
                });
            });
            Sentry.captureException(error);
        }

        // This is needed to render errors correctly in development / production
        super.componentDidCatch!!(error, errorInfo);
    }
}