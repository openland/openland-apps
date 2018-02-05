import * as React from 'react';
import { withData } from '../../utils/withData';
import { UserInfoProvider } from '../Base/UserInfo';
import { XDocumentRoot } from '../X/Scaffold/XDocumentRoot';
import { Header } from '../Navigation/Header';
import { Footer } from './Footer';
import { withAreaQuery } from '../../api';

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