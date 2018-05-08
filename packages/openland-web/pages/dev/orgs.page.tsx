import '../../globals';
import * as React from 'react';
import { withApp } from '../../components/withApp';
import { withSuperAccounts, withSuperAccountAdd } from '../../api/';
import { XHeader } from 'openland-x/XHeader';
import { DevToolsScaffold } from '../../components/DevToolsScaffold';
import { XButton } from 'openland-x/XButton';
import { XTable } from 'openland-x/XTable';
import { XFooter } from 'openland-x/XFooter';
import { XModalTargeted } from 'openland-x-modal/XModalTargeted';
import { XForm } from 'openland-x-forms/XForm';

const AddAccountForm = withSuperAccountAdd((props) => {
    return (
        <XForm submitMutation={props.add} mutationDirect={true}>
            <XForm.Field title="Organization Name">
                <XForm.Text field="title" />
            </XForm.Field>
            <XFooter>
                <XForm.Submit style="primary" text="Add"/>
            </XFooter>
        </XForm>
    );
});

export default withApp('Super Organizations', 'super-admin', withSuperAccounts((props) => {
    return (
        <DevToolsScaffold title="Accounts">
            <XHeader text="Accounts" description={props.data.superAccounts.length + ' total'}>
                <XModalTargeted fullScreen={false} title="Adding Account">
                    <XModalTargeted.Target>
                        <XButton text="Add account" />
                    </XModalTargeted.Target>
                    <XModalTargeted.Content>
                        <AddAccountForm />
                    </XModalTargeted.Content>
                </XModalTargeted>
            </XHeader>
            <XTable>
                <XTable.Header>
                    <XTable.Cell>Title</XTable.Cell>
                    <XTable.Cell>State</XTable.Cell>
                    <XTable.Cell>{}</XTable.Cell>
                </XTable.Header>
                <XTable.Body>
                    {props.data.superAccounts.map((v) => (
                        <XTable.Row key={v.id} noHover={true}>
                            <XTable.Cell>{v.title}</XTable.Cell>
                            <XTable.Cell>{v.state}</XTable.Cell>
                            <XTable.Cell>
                                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                    <XButton path={'/super/orgs/' + v.id} style="ghost" text="View"/>
                                </div>
                            </XTable.Cell>
                        </XTable.Row>
                    ))}
                </XTable.Body>
            </XTable>
        </DevToolsScaffold>
    );
}));