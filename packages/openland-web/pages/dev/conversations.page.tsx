import '../../globals';
import * as React from 'react';
import { withApp } from '../../components/withApp';
import { DevToolsScaffold } from './components/DevToolsScaffold';
import { XHeader } from 'openland-x/XHeader';
import { XTable } from 'openland-x/XTable';
import { withQueryLoader } from '../../components/withQueryLoader';
import { withAllChats } from '../../api/withAllChats';

export default withApp('Super Chats', 'super-admin', withAllChats(withQueryLoader((props) => {
    return (
        <DevToolsScaffold title="Chats">
            <XHeader text="All Chats" description={props.data.chats.length + ' total'}>{}</XHeader>
            <XTable>
                <XTable.Body>
                    {props.data.chats.map((v) => (
                        <XTable.Row path={'/super/chat/' + v.id}><XTable.Cell>{v.title}</XTable.Cell></XTable.Row>
                    ))}
                </XTable.Body>
            </XTable>
        </DevToolsScaffold>
    );
})));