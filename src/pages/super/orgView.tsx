import '../../globals';
import * as React from 'react';
import { withApp } from '../../components/withApp';
import { AppContent } from '../../components/App/AppContent';
import { XCard } from '../../components/X/XCard';
import { XTable } from '../../components/X/XTable';
import { withSuperAccount, withSuperAccountActivate, withSuperAccountSuspend, withSuperAccountMemberAdd, UserSelect } from '../../api';
import { XButtonMutation } from '../../components/X/XButtonMutation';
import { XForm } from '../../components/X/XForm';
import { XButton } from '../../components/X/XButton';
import { XModalTargeted } from '../../components/X/XModalTargeted';

const ActivateButton = withSuperAccountActivate((props) => <XButtonMutation style="important" mutation={props.activate}>Activate</XButtonMutation>);
const SuspendButton = withSuperAccountSuspend((props) => <XButtonMutation style="dark" mutation={props.suspend}>Suspend</XButtonMutation>);

const AddAddMemberForm = withSuperAccountMemberAdd((props) => {
    return (
        <XForm submitMutation={props.add} mutationDirect={true}>
            <XForm.Field title="User">
                <XForm.Select field="userId" component={UserSelect} />
            </XForm.Field>
            <XCard.Footer>
                <XForm.Submit style="dark">Add</XForm.Submit>
            </XCard.Footer>
        </XForm>
    );
});

export default withApp('super-admin', withSuperAccount((props) => {

    return (
        <AppContent>
            <XCard shadow="medium">
                <XCard.Header text={props.data.superAccount.title} description={'Current State: ' + props.data.superAccount.state}>
                    <XModalTargeted fullScreen={false} title="Adding New Super Admin">
                        <XModalTargeted.Target>
                            <XButton>Add Member</XButton>
                        </XModalTargeted.Target>
                        <XModalTargeted.Content>
                            <AddAddMemberForm />
                        </XModalTargeted.Content>
                    </XModalTargeted>
                    {props.data.superAccount.state !== 'ACTIVATED' && <ActivateButton />}
                    {props.data.superAccount.state === 'ACTIVATED' && <SuspendButton />}
                </XCard.Header>
            </XCard>

            <XCard shadow="medium">
                <XCard.Header text="Members" description={props.data.superAccount.members.length + ' total'} />
                <XTable>
                    <XTable.Header>
                        <XTable.Cell>Name</XTable.Cell>
                        <XTable.Cell>Email</XTable.Cell>
                        <XTable.Cell>{}</XTable.Cell>
                    </XTable.Header>
                    <XTable.Body>
                        {props.data.superAccount.members.map((v) => (
                            <XTable.Row key={v.id}>
                                <XTable.Cell>{v.name}</XTable.Cell>
                                <XTable.Cell>{v.email}</XTable.Cell>
                            </XTable.Row>
                        ))}
                    </XTable.Body>
                </XTable>
            </XCard>
        </AppContent>
    );
}));