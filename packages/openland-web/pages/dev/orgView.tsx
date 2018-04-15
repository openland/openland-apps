import '../../globals';
import * as React from 'react';
import { withApp } from '../../components/withApp';
import { XCard } from '../../components/X/XCard';
import { XTable } from '../../components/X/XTable';
import {
    withSuperAccount, withSuperAccountActivate, withSuperAccountSuspend, withSuperAccountMemberAdd,
    UserSelect, withSuperAccountFeatureAdd, withSuperAccountFeatureRemove,
    withSuperAccountMemberRemove
} from '../../api/';
import { XButtonMutation } from '../../components/X/XButtonMutation';
import { XForm } from '../../components/X/XForm';
import { XButton } from '../../components/X/XButton';
import { XModalTargeted } from '../../components/X/XModalTargeted';
import { withLoader } from '../../components/Incubator/withLoader';
import { XHeader } from '../../components/X/XHeader';
import { DevToolsScaffold } from '../../components/DevToolsScaffold';

const ActivateButton = withSuperAccountActivate((props) => <XButtonMutation style="important" mutation={props.activate}>Activate</XButtonMutation>);
const SuspendButton = withSuperAccountSuspend((props) => <XButtonMutation style="dark" mutation={props.suspend}>Suspend</XButtonMutation>);

const AddMemberForm = withSuperAccountMemberAdd((props) => {
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

const RemoveMemberForm = withSuperAccountMemberRemove((props) => {
    return (
        <XForm submitMutation={props.remove} mutationDirect={true}>
            <XForm.Field title="User">
                <XForm.Select field="userId" component={UserSelect} />
            </XForm.Field>
            <XCard.Footer>
                <XForm.Submit style="dark">Remove</XForm.Submit>
            </XCard.Footer>
        </XForm>
    );
});

const AddFeature = withSuperAccountFeatureAdd(withLoader((props) => {
    return (
        <XForm submitMutation={props.add} mutationDirect={true}>
            <XForm.Field title="Feature">
                <XForm.Select field="featureId" options={props.data.featureFlags.map((v) => ({ value: v.id, title: v.title }))} />
            </XForm.Field>
            <XCard.Footer>
                <XForm.Submit style="dark">Add</XForm.Submit>
            </XCard.Footer>
        </XForm>
    );
}));

const RemoveFeature = withSuperAccountFeatureRemove(withLoader((props) => {
    return (
        <XForm submitMutation={props.remove} mutationDirect={true}>
            <XForm.Field title="Feature">
                <XForm.Select field="featureId" options={props.data.featureFlags.map((v) => ({ value: v.id, title: v.title }))} />
            </XForm.Field>
            <XCard.Footer>
                <XForm.Submit style="dark">Remove</XForm.Submit>
            </XCard.Footer>
        </XForm>
    );
}));

export default withApp('Super Organization', 'super-admin', withSuperAccount((props) => {
    return (
        <DevToolsScaffold title={props.data.superAccount.title}>
            <XHeader text={props.data.superAccount.title} description={'Current State: ' + props.data.superAccount.state}>
                <XModalTargeted fullScreen={false} title="Adding new member">
                    <XModalTargeted.Target>
                        <XButton>Add Member</XButton>
                    </XModalTargeted.Target>
                    <XModalTargeted.Content>
                        <AddMemberForm />
                    </XModalTargeted.Content>
                </XModalTargeted>
                <XModalTargeted fullScreen={false} title="Remove member">
                    <XModalTargeted.Target>
                        <XButton>Remove Member</XButton>
                    </XModalTargeted.Target>
                    <XModalTargeted.Content>
                        <RemoveMemberForm />
                    </XModalTargeted.Content>
                </XModalTargeted>
                {props.data.superAccount.state !== 'ACTIVATED' && <ActivateButton />}
                {props.data.superAccount.state === 'ACTIVATED' && <SuspendButton />}
            </XHeader>
            <XHeader text="Members" description={props.data.superAccount.members.length + ' total'} />
            <XTable>
                <XTable.Header>
                    <XTable.Cell>Name</XTable.Cell>
                    <XTable.Cell>Email</XTable.Cell>
                </XTable.Header>
                <XTable.Body>
                    {props.data.superAccount.members.map((v) => (
                        <XTable.Row key={v.id} noHover={true}>
                            <XTable.Cell>{v.name}</XTable.Cell>
                            <XTable.Cell>{v.email}</XTable.Cell>
                        </XTable.Row>
                    ))}
                </XTable.Body>
            </XTable>
            <XHeader text="Features" description={props.data.superAccount.features.length + ' total'}>
                <XModalTargeted fullScreen={false} title="Adding Feature">
                    <XModalTargeted.Target>
                        <XButton style="important">Add Feature</XButton>
                    </XModalTargeted.Target>
                    <XModalTargeted.Content>
                        <AddFeature />
                    </XModalTargeted.Content>
                </XModalTargeted>
                <XModalTargeted fullScreen={false} title="Adding Feature">
                    <XModalTargeted.Target>
                        <XButton>Remove Feature</XButton>
                    </XModalTargeted.Target>
                    <XModalTargeted.Content>
                        <RemoveFeature />
                    </XModalTargeted.Content>
                </XModalTargeted>
            </XHeader>
            <XTable>
                <XTable.Header>
                    <XTable.Cell>Key</XTable.Cell>
                    <XTable.Cell>Title</XTable.Cell>
                </XTable.Header>
                <XTable.Body>
                    {props.data.superAccount.features.map((v) => (
                        <XTable.Row key={v.id} noHover={true}>
                            <XTable.Cell>{v.key}</XTable.Cell>
                            <XTable.Cell>{v.title}</XTable.Cell>
                        </XTable.Row>
                    ))}
                </XTable.Body>
            </XTable>
        </DevToolsScaffold>
    );
}));