import '../../globals';
import * as React from 'react';
import { withApp } from '../../components/withApp';
import { withSuperAccounts, withSuperAccountAdd } from '../../api/';
import { XCard } from '../../components/X/XCard';
import { XForm } from '../../components/X/XForm';
import { XModalTargeted } from '../../components/X/XModalTargeted';
import { XHeader } from '../../components/X/XHeader';
import { DevToolsScaffold } from '../../components/DevToolsScaffold';
import { XButton } from 'openland-x/XButton';
import { XTable } from 'openland-x/XTable';

const AddAccountForm = withSuperAccountAdd((props) => {
    return (
        <XForm submitMutation={props.add} mutationDirect={true}>
            <XForm.Field title="Organization Name">
                <XForm.Text field="title" />
            </XForm.Field>
            <XCard.Footer>
                <XForm.Submit style="primary" text="Add"/>
            </XCard.Footer>
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