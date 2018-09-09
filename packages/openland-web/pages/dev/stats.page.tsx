import '../../globals';
import * as React from 'react';
import { withApp } from '../../components/withApp';
import { withSuperCities } from '../../api/withSuperCities';
import { DevToolsScaffold } from './components/DevToolsScaffold';
import { XHeader } from 'openland-x/XHeader';
import { withQueryLoader } from '../../components/withQueryLoader';
import { XText } from 'openland-x/XText';
import { withChatsStats } from '../../api/withChatsStats';
import { XTable } from 'openland-x/XTable';

const Stats = withChatsStats((props) => (
    <>

        {props.data.statsChats && <XText >messages sent {props.data.statsChats.messagesSent}</XText>}
        {props.data.statsChats && <XText>users active {props.data.statsChats.usersActive}</XText>}
    </>
));

const MessagesCell = withChatsStats((props) => (
    props.data.statsChats ? <XTable.Cell > <XText > {props.data.statsChats.messagesSent}</XText></XTable.Cell > : <XTable.Cell >...</XTable.Cell >
));

const UsersCell = withChatsStats((props) => (
    props.data.statsChats ? <XTable.Cell > <XText > {props.data.statsChats.usersActive}</XText></XTable.Cell > : <XTable.Cell >...</XTable.Cell >
));

export default withApp('Super Organizations', 'super-admin', withSuperCities(withQueryLoader((props) => {
    console.warn(props);

    let header: any = [(<XTable.Cell >{''}</XTable.Cell >), (<XTable.Cell >{'10 w ago'}</XTable.Cell >)];
    let messagesStats: any = [(<XTable.Cell ><XText>Messages</XText></XTable.Cell >)];
    let i = 10;
    do {
        header.push(<XTable.Cell >{''}</XTable.Cell >);
        messagesStats.push(
            <MessagesCell variables={{ fromDate: (new Date().getTime() - 1000 * 60 * 60 * 24 * 7 * i).toString(), toDate: (new Date().getTime() - 1000 * 60 * 60 * 24 * 7 * (i - 1)).toString() }} />
        );
    } while (--i > 0);
    header.pop();
    header.pop();
    header.push(<XTable.Cell >{'now'}</XTable.Cell >);

    let usersStats: any = [(<XTable.Cell ><XText>Users</XText></XTable.Cell >)];
    let j = 10;
    do {
        usersStats.push(
            <UsersCell variables={{ fromDate: (new Date().getTime() - 1000 * 60 * 60 * 24 * 7 * j).toString(), toDate: (new Date().getTime() - 1000 * 60 * 60 * 24 * 7 * (j - 1)).toString() }} />
        );
    } while (--j > 0);

    return (
        <DevToolsScaffold title="Stats">
            <XHeader text="Messenger weekly stats" />
            <XTable>
                <XTable.Body>
                    <XTable.Row>
                        {header}
                    </XTable.Row>
                    <XTable.Row>
                        {messagesStats}
                    </XTable.Row>
                    <XTable.Row>
                        {usersStats}
                    </XTable.Row>
                </XTable.Body>

            </XTable>
        </DevToolsScaffold>
    );
})));