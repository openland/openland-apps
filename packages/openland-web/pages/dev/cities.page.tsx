import '../../globals';
import * as React from 'react';
import { withApp } from '../../components/withApp';
import { withSuperCities } from '../../api/';
import { DevToolsScaffold } from './components/DevToolsScaffold';
import { XHeader } from 'openland-x/XHeader';

export default withApp('Super Organizations', 'super-admin', withSuperCities((props) => {
    return (
        <DevToolsScaffold title="Accounts">
            <XHeader text="Super Cities" description={props.data.superCities.length + ' total'}>{}</XHeader>
        </DevToolsScaffold>
    );
}));