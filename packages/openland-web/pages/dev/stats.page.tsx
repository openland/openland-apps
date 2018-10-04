import * as React from 'react';
import { withApp } from '../../components/withApp';
import { withSuperCities } from '../../api/withSuperCities';
import { DevToolsScaffold } from './components/DevToolsScaffold';
import { XHeader } from 'openland-x/XHeader';
import { withQueryLoader } from '../../components/withQueryLoader';
import { XText } from 'openland-x/XText';
import { withChatsStats, withMessagesStats } from '../../api/withChatsStats';
import { XTable } from 'openland-x/XTable';
import { XAvatar } from 'openland-x/XAvatar';
import { LineChart, XAxis, Line, CartesianGrid, Tooltip, AreaChart, Brush, YAxis, Area } from 'recharts';
import { DateFormater } from 'openland-x-format/XDate';
import { canUseDOM } from 'openland-x-utils/canUseDOM';

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

function getWeekNumber(d: Date) {
    var d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    var dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    var yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    return Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
}

const MessagesChart = withMessagesStats((props) => {
    if (!props.data || !props.data.messagesSentStats || !props.variables || !canUseDOM) {
        return null;
    }

    let data = [...props.data.messagesSentStats].sort((a, b) => Number(a.date) - Number(b.date)).map(e => ({ count: e.count, date: (props.variables as any)!.trunc === 'week' ? getWeekNumber(new Date(Number(e.date))) : DateFormater(Number(e.date)) }));

    return (
        <LineChart
            width={1000}
            height={400}
            data={data}
            margin={{ top: 40, right: 100, bottom: 20, left: 100 }}
        >
            <CartesianGrid vertical={false} />
            <XAxis dataKey="date" />
            <YAxis domain={['auto', 'auto']} />
            <Tooltip
                wrapperStyle={{
                    borderColor: 'white',
                    boxShadow: '2px 2px 3px 0px rgb(204, 204, 204)',
                }}
            />
            <Line dataKey="count" stroke="#ff7300" dot={false} />
            {/* <Brush dataKey="date" startIndex={data.length - 40}>
                <AreaChart>
                    <CartesianGrid />
                    <YAxis hide domain={['auto', 'auto']} />
                    <Area dataKey="count" stroke="#ff7300" fill="#ff7300" dot={false} />
                </AreaChart>
            </Brush> */}
        </LineChart>

    );
});

const Mutes = withChatsStats((props) => (
    props.data.statsChats ?
        (
            <>
                <XHeader text="Mutes" />
                <XText >email mute {props.data.statsChats.usersMutedEmail}</XText>
                <XText>openland beta mute {props.data.statsChats.usersMutedOpenlandBeta}</XText>
            </>
        ) : null
));

const LeaderBoard = withChatsStats((props) => (
    props.data.statsChats ?
        (
            <>
                <XHeader text="Messages sent in 2 weeks" />
                <XTable>
                    <XTable.Body>
                        {props.data.statsChats.messagesLeaderboard.map(u => (
                            <XTable.Row>
                                <XTable.Cell>
                                    <XText>{u.count}</XText>
                                </XTable.Cell>
                                <XTable.Cell>
                                    <XAvatar cloudImageUuid={u.user.photo || undefined} />
                                </XTable.Cell>
                                <XTable.Cell>
                                    <XText>{u.user.name}</XText>
                                </XTable.Cell>
                            </XTable.Row>
                        ))}
                    </XTable.Body>
                </XTable>

            </>
        ) : null
));

export default withApp('Super Organizations', 'super-admin', withSuperCities(withQueryLoader((props) => {

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
            <XHeader text=" Messages daily" />
            <MessagesChart variables={{ fromDate: '0', toDate: new Date().getTime().toString(), trunc: 'day' }} />
            <XHeader text=" Messages weekly" />
            <MessagesChart variables={{ fromDate: '0', toDate: new Date().getTime().toString(), trunc: 'week' }} />
            <XHeader text=" Messages monthly, include Openland team" />
            <MessagesChart variables={{ fromDate: '0', toDate: new Date().getTime().toString(), trunc: 'month', excudeTeam: false }} />

            <XHeader text="Total" />
            <Stats variables={{ fromDate: (new Date(0).getTime()).toString(), toDate: (new Date().getTime()).toString() }} />

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

            <Mutes variables={{ fromDate: '0', toDate: new Date().getTime().toString() }} />
            <LeaderBoard variables={{ fromDate: (new Date().getTime() - 1000 * 60 * 60 * 24 * 7 * 2).toString(), toDate: new Date().getTime().toString() }} />

        </DevToolsScaffold>
    );
})));