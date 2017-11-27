import * as React from 'react';
import { Switch, Redirect, Route } from 'react-router';
import ViewAll from './ViewAll';
import ViewPipeline from './ViewPipeline';
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
                    <Route path="/db/permits" exact={true} component={ViewAll} />
                    <Route path="/db/permits/pipeline" exact={true} component={ViewPipeline} />
                    <Route path="/db/permits/:permitId" exact={true} component={ViewItem} />
                    <Redirect to="/404" />
                </Switch>
            </Content>
        </Page>
    );
}