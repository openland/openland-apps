import { canUseDOM } from 'openland-y-utils/canUseDOM';
import { XStyleFactoryRegistry } from 'react-mental';
import { css, rehydrate } from 'glamor';
import { ClientCacheProvider } from 'openland-graphql/ClientCache';
if (canUseDOM) {
    rehydrate(JSON.parse((window as any).GLAMOR_IDS));
}
XStyleFactoryRegistry.registerFactory({
    createStyle: styles => {
        return css(styles).toString();
    },
});

import './_app.css';
import './init';
import '../globals';
import { XView } from 'react-mental';
import React from 'react';
import App, { AppProps, Container } from 'next/app';
import * as Sentry from '@sentry/browser';
import { loadConfig } from 'openland-x-config';
import { buildConfig } from '../config';
import { withData } from './root/withData';
import { RootErrorBoundary } from './root/RootErrorBoundary';
import moment from 'moment-timezone';
import { getClientStorage, SharedStorage } from 'openland-x-utils/SharedStorage';
import { trackPage } from 'openland-x-analytics';
import { XStorageProvider } from 'openland-x-routing/XStorageProvider';
import { XRouterProvider } from 'openland-x-routing/XRouterProvider';
import { Routes } from '../routes';
import { AppContainer } from './root/AppContainer';
import { EnvironmentContext } from './root/EnvironmentContext';
import { OpenlandClient } from 'openland-api/OpenlandClient';
import { OpenlandApiContext } from 'openland-web/utils/OpenlandApiProvider';
import { MessageStateProviderComponent } from 'openland-web/components/messenger/MessagesStateContext';
import { XRouterContext } from 'openland-x-routing/XRouterContext';
import { XRouter } from 'openland-x-routing/XRouter';
import { XShortcutsRoot } from 'openland-x/XShortcuts';
import { MessengerFragment } from 'openland-web/fragments/MessengerFragment';
import { CommentsModalInnerNoRouter } from 'openland-web/components/messenger/message/content/comments/CommentsModalInner';
import { IsActiveContext } from 'openland-web/pages/main/mail/components/Components';

const TestWrapper = ({ children }: { children: any }) => {
    const router = React.useContext(XRouterContext) as XRouter;
    return (
        <React.Suspense fallback={<div />}>
            <XShortcutsRoot>
                <MessageStateProviderComponent router={router}>
                    {children}
                </MessageStateProviderComponent>
            </XShortcutsRoot>
        </React.Suspense>
    );
};

const TestCommentsComponent = () => {
    return (
        <TestWrapper>
            <CommentsModalInnerNoRouter
                messageId="0DkElrP40mfJe1JbL0aXCWKa30"
                roomId="1pm4Xrl3BpiDaQgayqAbuK1gDj"
            />
        </TestWrapper>
    );
};

const TestMessengerComponent = () => {
    return (
        <TestWrapper>
            <IsActiveContext.Provider value={true}>
                <MessengerFragment id={'1pm4Xrl3BpiDaQgayqAbuK1gDj'} isActive />
            </IsActiveContext.Provider>
        </TestWrapper>
    );
};

export default withData(
    class MyApp extends App<{
        apollo: OpenlandClient;
        storage: SharedStorage;
        host: string;
        protocol: string;
        isApp: boolean;
    }> {
        private isSentryEnabled = false;

        constructor(
            props: {
                apollo: OpenlandClient;
                storage: SharedStorage;
                host: string;
                protocol: string;
                isApp: boolean;
            } & AppProps,
        ) {
            super(props as any);
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
                    <EnvironmentContext.Provider value={{ isApp: this.props.isApp }}>
                        <XStorageProvider
                            storage={canUseDOM ? getClientStorage() : this.props.storage}
                        >
                            <XRouterProvider
                                routes={Routes}
                                hostName={this.props.host}
                                protocol={this.props.protocol}
                            >
                                <ClientCacheProvider>
                                    <OpenlandApiContext.Provider value={this.props.apollo}>
                                        <RootErrorBoundary>
                                            <AppContainer>
                                                <XView justifyContent="center" width="50%">
                                                    <TestCommentsComponent />
                                                </XView>
                                                <XView justifyContent="center" width="50%">
                                                    <TestMessengerComponent />
                                                </XView>
                                                {/* <Component {...pageProps} /> */}
                                                {/* <TestCommentMessageComponent /> */}
                                                {/* <TestInlineEditMessageComponent /> */}
                                                {/* <TestInlineEditCommentComponent /> */}
                                            </AppContainer>
                                        </RootErrorBoundary>
                                    </OpenlandApiContext.Provider>
                                </ClientCacheProvider>
                            </XRouterProvider>
                        </XStorageProvider>
                    </EnvironmentContext.Provider>
                </Container>
            );
        }
    },
);
