import '../../globals';
import * as React from 'react';
import { withApp } from '../../components/withApp';
import { withUserInfo } from '../../components/UserInfo';
import { XHeader } from 'openland-x/XHeader';
import { DevToolsScaffold } from './components/DevToolsScaffold';
import { XContent } from 'openland-x-layout/XContent';
import { XTable } from 'openland-x/XTable';
import { XRoleContext } from 'openland-x-permissions/XRoleContext';
import { withDebugAccounts } from '../../api';

export default withApp('Super Debug', ['super-admin', 'software-developer'], withDebugAccounts(withUserInfo((props) => {
    console.warn(props.data.orgs);
    return (
        <DevToolsScaffold title="Debugging">
            <XHeader text="Your roles" />
            <XTable>
                <XTable.Header>
                    <XTable.Cell>Permission Name</XTable.Cell>
                    <XTable.Cell>Description</XTable.Cell>
                </XTable.Header>
                <XTable.Body>
                    <XRoleContext.Consumer>
                        {roles => roles!!.roles.map((v) => (
                            <XTable.Row>
                                <XTable.Cell>{v}</XTable.Cell>
                                <XTable.Cell>{}</XTable.Cell>
                            </XTable.Row>
                        ))}
                    </XRoleContext.Consumer>
                </XTable.Body>
            </XTable>
            <XHeader text="Current Organization" />
            <XContent>
                {props.account && (
                    <>
                        <div>{props.account.title}</div>
                    </>
                )}
            </XContent>
            <XHeader text="All Organizations" />
            <XTable>
                <XTable.Header>
                    <XTable.Cell>Organization Name</XTable.Cell>
                </XTable.Header>
                <XTable.Body>
                    {props.data.orgs && props.data.orgs.map((v) => (
                        <XTable.Row>
                            <XTable.Cell>{v.title}</XTable.Cell>
                        </XTable.Row>
                    ))}
                </XTable.Body>
            </XTable>
        </DevToolsScaffold>
    );
})));