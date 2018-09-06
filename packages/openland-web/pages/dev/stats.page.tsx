import '../../globals';
import * as React from 'react';
import { withApp } from '../../components/withApp';
import { withSuperCities } from '../../api/withSuperCities';
import { DevToolsScaffold } from './components/DevToolsScaffold';
import { XHeader } from 'openland-x/XHeader';
import { withQueryLoader } from '../../components/withQueryLoader';
import { XText } from 'openland-x/XText';
import { withChatsStats } from '../../api/withChatsStats';

const Stats = withChatsStats((props) => (
    <>

        {props.data.statsChats && <XText >messages sent {props.data.statsChats.messagesSent}</XText>}
        {props.data.statsChats && <XText>users active {props.data.statsChats.usersActive}</XText>}
    </>
));

export default withApp('Super Organizations', 'super-admin', withSuperCities(withQueryLoader((props) => {
    console.warn(props);

    return (
        <DevToolsScaffold title="Stats">
            <XHeader text="daily" />
            <Stats variables={{ fromDate: (new Date().getTime() - 1000 * 60 * 60 * 24).toString(), toDate: new Date().getTime().toString() }} />
            <XHeader text="weekly" />
            <Stats variables={{ fromDate: (new Date().getTime() - 1000 * 60 * 60 * 24 * 7).toString(), toDate: new Date().getTime().toString() }} />
            <XHeader text="monthly" />
            <Stats variables={{ fromDate: (new Date().getTime() - 1000 * 60 * 60 * 24 * 7 * 30).toString(), toDate: new Date().getTime().toString() }} />
        </DevToolsScaffold>
    );
})));