import * as React from 'react';
import { withData } from '../utils/withData';
import { UserInfoProvider } from '../components/UserInfo';
import { PageContainer } from './PageContainer';
import { Header } from './Header';
import { Footer } from './Footer';
import { withAreaQuery } from '../api';

export function withAreaPage(WrappedComponent: React.ComponentType<{}>) {
    return withData(withAreaQuery((props) => (
        <UserInfoProvider user={props.data.me} router={props.router}>
            <PageContainer>
                <Header />
                <WrappedComponent />
                <Footer />
            </PageContainer>
        </UserInfoProvider>
    )));
};