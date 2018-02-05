import * as React from 'react';
import { withData } from '../../utils/withData';
import { UserInfoProvider } from '../Base/UserInfo';
import { QueryProps } from 'react-apollo';
import Error from 'next/error';
import { XDocumentRoot } from '../X/Scaffold/XDocumentRoot';
import { Loader } from '../Incubator/Loaders';
import '../../utils/routing';
import { Header } from './Header';
import { Footer } from './Footer';
import '../../utils/analytics';
import { withAreaQuery } from '../../api';

//
// Root Loader. We shouldn't render anything untill page is loaded since we have global progress indicator.
//

function withRootLoader<P>(WrappedComponent: React.ComponentType<P>): React.ComponentType<{ data: QueryProps } & P> {
    return function (props: { data: QueryProps } & P) {
        if (props.data.loading) {
            return <Loader key="__loader" />;
        } else if (props.data.error != null) {
            return (
                <Error key="_message" statusCode={500} />
            );
        }

        return (
            <WrappedComponent {...props} key="_component" />
        );
    };
}

//
// Page HoC
//

export function withPage(WrappedComponent: React.ComponentType<{}>) {
    return withData(withAreaQuery(withRootLoader((props) => (
        <UserInfoProvider user={props.data.me} area={props.data.area} router={props.router}>
            <XDocumentRoot>
                <Header />
                <WrappedComponent />
                <Footer />
            </XDocumentRoot>
        </UserInfoProvider>
    ))));
}

export function withPageFullScreen(WrappedComponent: React.ComponentType<{}>) {
    return withData(withAreaQuery(withRootLoader((props) => (
        <UserInfoProvider user={props.data.me} area={props.data.area} router={props.router}>
            <XDocumentRoot>
                <Header />
                <WrappedComponent />
            </XDocumentRoot>
        </UserInfoProvider>
    ))));
}

export function withLandingPage(WrappedComponent: React.ComponentType<{}>) {
    return withData(withAreaQuery(withRootLoader((props) => (
        <UserInfoProvider user={props.data.me} area={props.data.area} router={props.router}>
            <XDocumentRoot>
                <WrappedComponent />
            </XDocumentRoot>
        </UserInfoProvider>
    ))));
}