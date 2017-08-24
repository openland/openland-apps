import * as React from 'react';
import { Route } from 'react-router-dom';
import { withCityQuery } from '../api/';
import Findings from './Findings';
import Projects from './Projects';
import Sources from './Sources';
import * as C from './Components';

import './Styles.css';

const City = withCityQuery(C.withLoader((props) => {
    return (
        <div className="city-container">
            <C.Sidebar title={props.data.account.name} subtitle={props.data.account.city} image={'/img/sf.jpg'} >
                <C.SidebarMenu title="Findings" path="/" />
                <C.SidebarMenu title="Projects">
                    {props.data.projects.map((p) => {
                        return <C.SidebarSubmenu title={p.name} path={'/projects/' + p.slug} />;
                    })}
                </C.SidebarMenu>
                <C.SidebarMenu title="Data Sources" path="/sources" />
            </C.Sidebar>
            <div className="city-content">
                <Route exact={true} path="/" component={Findings} />
                <Route path="/projects" component={Projects} />
                <Route path="/sources" component={Sources} />
            </div>
        </div>
    );
}));

export default City;