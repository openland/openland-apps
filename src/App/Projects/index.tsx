import * as React from 'react';
import { Route, Switch, Redirect } from 'react-router';
import View from './View';
import Edit from './Edit';
import { withProjectsQuery } from '../../api/Project';
import { withLoader } from '../Components/withLoader';

const PickDefaultProject = withProjectsQuery(withLoader((props) => {
    if (props.data.projects.length === 0) {
        return <Redirect to={'/'} />;
    }
    return <Redirect to={'/projects/' + props.data.projects[0].slug} />;
}));

export default function () {
    return (
        <Switch>
            <Route path="/projects/:projectId/edit" component={Edit} />
            <Route path="/projects/:projectId" component={View} />
            <Route path="/projects/" component={PickDefaultProject} />
            <Redirect to="/404" />
        </Switch>
    );
}