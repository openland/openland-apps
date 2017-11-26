import * as React from 'react';
import { Switch, Redirect, Route } from 'react-router';
import ViewAll from './ViewAll';
import ViewItem from './ViewItem';
import { Page, Background, Content } from '../../Components/Page';
import { Header } from '../../Components/Header';
export default function () {
    return (
        <Page title="Building Permits">
            <Header title="Building Permits" />
            <Background />
            <Content>
                <Switch>
                    <Route path="/db/permits/:permitId" exact={true} component={ViewItem} />
                    <Route path="/db/permits" exact={true} component={ViewAll} />
                    <Redirect to="/404" />
                </Switch>
            </Content>
        </Page>
    );
}