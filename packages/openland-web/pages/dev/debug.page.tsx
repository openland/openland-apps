import '../../globals';
import * as React from 'react';
import { withApp } from '../../components/withApp';
import { withUserInfo } from '../../components/UserInfo';
import { XHeader } from 'openland-x/XHeader';
import { DevToolsScaffold } from './components/DevToolsScaffold';
import { XContent } from 'openland-x-layout/XContent';
import { XTable } from 'openland-x/XTable';
import { XRoleContext } from 'openland-x-permissions/XRoleContext';
import { withMyOrganizations } from '../../api/withMyOrganizations';
import { withQueryLoader } from '../../components/withQueryLoader';
import { withDebugSendWelcomeEmail } from '../../api/withDebugSendWelcomeEmail';
import { XButton } from 'openland-x/XButton';

export const SendWelcome = withDebugSendWelcomeEmail((props) => {
    return <XButton action={async () => props.sendWelcome({})} alignSelf="flex-start" text="Send Email" />;
});

export default withApp('Super Debug', ['super-admin', 'software-developer'], withMyOrganizations(withQueryLoader(withUserInfo((props) => {
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
                {props.organization && (
                    <>
                        <div>{props.organization.name}</div>
                    </>
                )}
            </XContent>
            <XHeader text="All Organizations" />
            <XTable>
                <XTable.Header>
                    <XTable.Cell>Organization Name</XTable.Cell>
                </XTable.Header>
                <XTable.Body>
                    {props.data.myOrganizations.map((v) => (
                        <XTable.Row>
                            <XTable.Cell>{v.name}</XTable.Cell>
                        </XTable.Row>
                    ))}
                </XTable.Body>
            </XTable>
            <XHeader text="Send welcome email" />
            <XContent>
                <SendWelcome />
            </XContent>
        </DevToolsScaffold>
    );
}))));