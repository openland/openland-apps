import * as React from 'react';
import { withData } from '../utils/withData';
import { UserInfoProvider } from '../components/UserInfo';
import { XDocumentRoot } from '../components/X/Scaffold/XDocumentRoot';
import { Header } from './Header';
import { Footer } from './Footer';
import { withAreaQuery } from '../api';

export function withAreaPage(WrappedComponent: React.ComponentType<{}>) {
    return withData(withAreaQuery((props) => (
        <UserInfoProvider user={props.data.me} area={props.data.area} router={props.router}>
            <XDocumentRoot>
                <Header />
                <WrappedComponent />
                <Footer />
            </XDocumentRoot>
        </UserInfoProvider>
    )));
};