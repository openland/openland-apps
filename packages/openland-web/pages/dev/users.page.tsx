import * as React from 'react';
import { withApp } from '../../components/withApp';
import { withOnlineUsers } from '../../api/withOnlineUsers';
import { DevToolsScaffold } from './components/DevToolsScaffold';
import { withQueryLoader } from '../../components/withQueryLoader';
import { XHeader } from 'openland-x/XHeader';
import { XTable } from 'openland-x/XTable';
import { XText } from 'openland-x/XText';
import { XAvatar } from 'openland-x/XAvatar';

export default withApp('Super Organizations', 'super-admin', withOnlineUsers(withQueryLoader((props) => {
    return (
        <DevToolsScaffold title="Users">
            <XHeader text="Online users" />
                <XTable>
                    <XTable.Body>
                        {props.data.onlineUsers.map(u => (
                            <XTable.Row>
                                <XTable.Cell width={100}>
                                    <XAvatar cloudImageUuid={u.user.photo || undefined} />
                                </XTable.Cell>
                                <XTable.Cell width={400}>
                                    <XText>{u.user.name}</XText>
                                </XTable.Cell>
                                <XTable.Cell>
                                    <XText>{u.location!!.locationName}</XText>
                                </XTable.Cell>
                            </XTable.Row>
                        ))}
                    </XTable.Body>
                </XTable>
        </DevToolsScaffold>
    );
})));