//
// Polyfills
// 

import { canUseDOM } from 'openland-y-utils/canUseDOM';
if (canUseDOM) {
    require('web-animations-js');
}

//
// Styles
//

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

//
// Init
//

import React from 'react';
import bugsnag from '@bugsnag/js';
import bugsnagReact from '@bugsnag/plugin-react';
import { getConfig } from 'openland-web/config';
import { CrashReporting } from 'openland-engines/CrashReporting';
import { VERSION } from 'openland-web/version';
let config = getConfig();
const bugsnagClient = bugsnag({
    apiKey: 'face7f06bcc3b1b0d5d60ed0fe912a88',
    releaseStage: config.env,
    notifyReleaseStages: ['production', 'next'],
    appVersion: VERSION
});
bugsnagClient.use(bugsnagReact, React);
CrashReporting.setReporter({
    notify: (src) => bugsnagClient.notify(src),
    setUserId: (src) => bugsnagClient.user = { id: src }
});

import './init';
import '../globals';

//
//  App
//

import App, { AppProps, Container } from 'next/app';

import { withData } from './root/withData';
import { RootErrorBoundary } from './root/RootErrorBoundary';
import moment from 'moment-timezone';
import { getClientStorage, SharedStorage } from 'openland-x-utils/SharedStorage';
import { XStorageProvider } from 'openland-x-routing/XStorageProvider';
import { XRouterProvider } from 'openland-x-routing/XRouterProvider';
import { Routes } from '../routes';
import { AppContainer } from './root/AppContainer';
import { EnvironmentContext } from './root/EnvironmentContext';
import { OpenlandClient } from 'openland-api/OpenlandClient';
import { OpenlandApiContext } from 'openland-web/utils/OpenlandApiProvider';
import { GQLClientContext } from 'openland-api/useClient';

const ErrorBoundary = bugsnagClient.getPlugin('react');

export default withData(
    class MyApp extends App<{
        apollo: OpenlandClient;
        storage: SharedStorage;
        host: string;
        protocol: string;
        isApp: boolean;
    }> {

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

            if (canUseDOM) {
                let tz = moment.tz.guess();
                let storage = getClientStorage();
                storage.writeValue('timezone', tz);
            }
        }

        render() {
            const { Component, pageProps } = this.props;
            return (
                <ErrorBoundary>
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
                                            <GQLClientContext.Provider value={this.props.apollo}>
                                                <RootErrorBoundary>
                                                    <AppContainer>
                                                        {/* <XView justifyContent="center" width="50%">
                                                    <TestCommentsComponent />
                                                </XView> */}
                                                        {/* <XView justifyContent="center" width="50%">
                                                    <TestMessengerComponent />
                                                </XView> */}
                                                        <Component {...pageProps} />
                                                    </AppContainer>
                                                </RootErrorBoundary>
                                            </GQLClientContext.Provider>
                                        </OpenlandApiContext.Provider>
                                    </ClientCacheProvider>
                                </XRouterProvider>
                            </XStorageProvider>
                        </EnvironmentContext.Provider>
                    </Container>
                </ErrorBoundary>
            );
        }
    },
);
