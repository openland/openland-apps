import * as React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { withCityQuery } from '../api/';
import Findings from './Findings';
import Projects from './Projects';
import Sources from './Sources';
import * as C from './Components';

export default withCityQuery(C.withLoader((props) => {
    return (
        <C.UserProvider user={props.data.me}>
            <C.RootContainer>
                <C.Sidebar title={props.data.account.name} subtitle={props.data.account.city} image={'/img/sf.jpg'} >
                    <C.SidebarMenu title="Findings" icon="findings" path="/findings">
                        <C.SidebarSubmenu title="Charts" path={'/findings/charts'} key={'charts'} />
                        <C.SidebarSubmenu title="Recomendations" path={'/findings/recomendations'} key={'recomendations'} />
                    </C.SidebarMenu>
                    <C.SidebarMenu title="Projects" icon="projects" path="/projects" defaultPath={'/projects/' + props.data.projects[0].slug} expanded={true}>
                        {props.data.projects.map((p) => {
                            return <C.SidebarSubmenu title={p.name} path={'/projects/' + p.slug} key={p.slug} />;
                        })}
                    </C.SidebarMenu>
                    <C.SidebarMenu title="Data Sources" path="/sources" icon="data-sources" />
                </C.Sidebar>
                <Switch>
                    <Route path="/findings" component={Findings} />
                    <Route path="/projects" component={Projects} />
                    <Route path="/sources" component={Sources} />
                    <Redirect to="/findings" />
                </Switch>
            </C.RootContainer>
        </C.UserProvider>
    );
}));