import '../../globals';
import * as React from 'react';
import { withApp } from '../../components/withApp';
import { withUserInfo } from '../../components/UserInfo';
import { XHeader } from 'openland-x/XHeader';
import { DevToolsScaffold } from '../../components/DevToolsScaffold';
import { XContent } from 'openland-x-layout/XContent';
import { XTable } from 'openland-x/XTable';

export default withApp('Super Debug', ['super-admin', 'software-developer'], withUserInfo((props) => {
    return (
        <DevToolsScaffold title="Debugging">
            <XHeader text="Your roles" />
            <XTable>
                <XTable.Header>
                    <XTable.Cell>Permission Name</XTable.Cell>
                    <XTable.Cell>Description</XTable.Cell>
                </XTable.Header>
                <XTable.Body>
                    {props.roles.map((v) => (
                        <XTable.Row>
                            <XTable.Cell>{v}</XTable.Cell>
                            <XTable.Cell>{}</XTable.Cell>
                        </XTable.Row>
                    ))}
                </XTable.Body>
            </XTable>
            <XHeader text="Your Organization" />
            <XContent>
                {props.account && (
                    <>
                        <div>{props.account.title}</div>
                    </>
                )}
            </XContent>
        </DevToolsScaffold>
    );
}));