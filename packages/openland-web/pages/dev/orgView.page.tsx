import '../../globals';
import * as React from 'react';
import { withApp } from '../../components/withApp';
import {
    withSuperAccount, withSuperAccountActivate, withSuperAccountSuspend, withSuperAccountMemberAdd,
    UserSelect, withSuperAccountFeatureAdd, withSuperAccountFeatureRemove,
    withSuperAccountMemberRemove
} from '../../api/';
import { XHeader } from 'openland-x/XHeader';
import { DevToolsScaffold } from './components/DevToolsScaffold';
import { XButton } from 'openland-x/XButton';
import { XButtonMutation } from 'openland-x/XButtonMutation';
import { XTable } from 'openland-x/XTable';
import { XFooter } from 'openland-x/XFooter';
import { XModalTargeted } from 'openland-x-modal/XModalTargeted';
import { XForm } from 'openland-x-forms/XForm';

const ActivateButton = withSuperAccountActivate((props) => <XButtonMutation style="primary" mutation={props.activate}>Activate</XButtonMutation>);
const SuspendButton = withSuperAccountSuspend((props) => <XButtonMutation style="danger" mutation={props.suspend}>Suspend</XButtonMutation>);

const AddMemberForm = withSuperAccountMemberAdd((props) => {
    return (
        <XForm submitMutation={props.add} mutationDirect={true}>
            <XForm.Field title="User">
                <XForm.Select field="userId" component={UserSelect} />
            </XForm.Field>
            <XFooter>
                <XForm.Submit style="primary" text="Add" />
            </XFooter>
        </XForm>
    );
});

const RemoveMemberForm = withSuperAccountMemberRemove((props) => {
    return (
        <XForm submitMutation={props.remove} mutationDirect={true}>
            <XForm.Field title="User">
                <XForm.Select field="userId" component={UserSelect} />
            </XForm.Field>
            <XFooter>
                <XForm.Submit style="danger" text="Remove" />
            </XFooter>
        </XForm>
    );
});

const AddFeature = withSuperAccountFeatureAdd((props) => {
    return (
        <XForm submitMutation={props.add} mutationDirect={true}>
            <XForm.Field title="Feature">
                <XForm.Select field="featureId" options={props.data.featureFlags.map((v) => ({ value: v.id, title: v.title }))} />
            </XForm.Field>
            <XFooter>
                <XForm.Submit style="primary" text="Add"/>
            </XFooter>
        </XForm>
    );
});

const RemoveFeature = withSuperAccountFeatureRemove((props) => {
    return (
        <XForm submitMutation={props.remove} mutationDirect={true}>
            <XForm.Field title="Feature">
                <XForm.Select field="featureId" options={props.data.featureFlags.map((v) => ({ value: v.id, title: v.title }))} />
            </XForm.Field>
            <XFooter>
                <XForm.Submit style="danger" text="Remove"/>
            </XFooter>
        </XForm>
    );
});

export default withApp('Super Organization', 'super-admin', withSuperAccount((props) => {
    return (
        <DevToolsScaffold title={props.data.superAccount.title}>
            <XHeader text={props.data.superAccount.title} description={'Current State: ' + props.data.superAccount.state}>
                <XModalTargeted fullScreen={false} title="Adding new member">
                    <XModalTargeted.Target>
                        <XButton text="Add member" />
                    </XModalTargeted.Target>
                    <XModalTargeted.Content>
                        <AddMemberForm />
                    </XModalTargeted.Content>
                </XModalTargeted>
                <XModalTargeted fullScreen={false} title="Remove member">
                    <XModalTargeted.Target>
                        <XButton text="Remove Member" />
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
                        <XButton style="primary" text="Add feature" />
                    </XModalTargeted.Target>
                    <XModalTargeted.Content>
                        <AddFeature />
                    </XModalTargeted.Content>
                </XModalTargeted>
                <XModalTargeted fullScreen={false} title="Adding Feature">
                    <XModalTargeted.Target>
                        <XButton text="Remove feature" />
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