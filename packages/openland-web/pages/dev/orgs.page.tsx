import '../../globals';
import * as React from 'react';
import { withApp } from '../../components/withApp';
import { withSuperAccounts, withSuperAccountAdd } from '../../api/';
import { XHeader } from 'openland-x/XHeader';
import { DevToolsScaffold } from './components/DevToolsScaffold';
import { XButton } from 'openland-x/XButton';
import { XTable } from 'openland-x/XTable';
import { XForm } from 'openland-x-forms/XForm';
import { XModalForm } from 'openland-x-modal/XModalForm';

const AddAccountForm = withSuperAccountAdd((props) => {
    return (
        <XModalForm
            title="Add new organization"
            target={<XButton text="Add account" />}
            submitMutation={props.add}
            mutationDirect={true}
            actionName="Add">
            <XForm.Field title="Organization Name">
                <XForm.Text field="title" />
            </XForm.Field>
        </XModalForm>
    );
});

export default withApp('Super Organizations', 'super-admin', withSuperAccounts((props) => {
    return (
        <DevToolsScaffold title="Accounts">
            <XHeader text="Accounts" description={props.data.superAccounts.length + ' total'}>
                <AddAccountForm />
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
                                    <XButton path={'/super/orgs/' + v.id} style="ghost" text="View" />
                                </div>
                            </XTable.Cell>
                        </XTable.Row>
                    ))}
                </XTable.Body>
            </XTable>
        </DevToolsScaffold>
    );
}));