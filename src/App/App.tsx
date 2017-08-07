import * as React from 'react';
import { Route, RouteComponentProps } from 'react-router-dom';

// import AppHeader from './AppHeader';
import HousingHome from './Housing/Home';

export default function (props: RouteComponentProps<{}>) {
    return (
        <div className="root">
            {/* <AppHeader /> */}
            <Route exact={true} path="/app/housing" component={HousingHome} />
        </div>
    );
}