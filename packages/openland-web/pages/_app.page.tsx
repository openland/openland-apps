import { canUseDOM } from 'openland-x-utils/canUseDOM';
import * as Mental from 'mental-styles';
import { css, rehydrate } from 'glamor';
if (canUseDOM) {
    rehydrate(JSON.parse((window as any).GLAMOR_IDS));
}
Mental.XStyleFactoryRegistry.registerFactory({
    createStyle: (styles) => {
        return css(styles).toString()
    }
})

import './_app.css';
import './init';
import '../globals';
import React from 'react';
import App, { AppProps, Container } from 'next/app';
import * as Sentry from '@sentry/browser';
import { loadConfig } from 'openland-x-config';
import { buildConfig } from '../config';
import { withData } from './root/withData';
import { OpenApolloClient } from 'openland-y-graphql/apolloClient';
import { YApolloProvider } from 'openland-y-graphql/YApolloProvider';
import { RootErrorBoundary } from './root/RootErrorBoundary';
import moment from 'moment-timezone';
import {
    getClientStorage,
    SharedStorage,
} from 'openland-x-utils/SharedStorage';
import { trackPage } from 'openland-x-analytics';
import { XStorageProvider } from 'openland-x-routing/XStorageProvider';
import { XRouterProvider } from 'openland-x-routing/XRouterProvider';
import { Routes } from '../routes';
import { AppContainer } from './root/AppContainer';

export default withData(
    class MyApp extends App<{
        apollo: OpenApolloClient;
        storage: SharedStorage;
        host: string;
        protocol: string;
    }> {
        private isSentryEnabled = false;

        constructor(
            props: {
                apollo: OpenApolloClient;
                storage: SharedStorage;
                host: string;
                protocol: string;
            } & AppProps,
        ) {
            super(props);
            let cfg = canUseDOM ? loadConfig() : buildConfig();
            if (cfg.sentryEndpoint && cfg.release) {
                this.isSentryEnabled = true;
                Sentry.init({ dsn: cfg.sentryEndpoint, release: cfg.release });
            }

            if (canUseDOM) {
                let tz = moment.tz.guess();
                let storage = getClientStorage();
                storage.writeValue('timezone', tz);
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

        componentDidMount() {
            // Hack to track initial page view
            trackPage();
        }

        render() {
            const { Component, pageProps } = this.props;
            return (
                <Container>
                    <XStorageProvider
                        storage={
                            canUseDOM ? getClientStorage() : this.props.storage
                        }
                    >
                        <XRouterProvider
                            routes={Routes}
                            hostName={this.props.host}
                            protocol={this.props.protocol}
                        >
                            <YApolloProvider client={this.props.apollo}>
                                <RootErrorBoundary>
                                    <AppContainer>
                                        <Component {...pageProps} />
                                    </AppContainer>
                                </RootErrorBoundary>
                            </YApolloProvider>
                        </XRouterProvider>
                    </XStorageProvider>
                </Container>
            );
        }
    },
);
