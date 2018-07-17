import '../../globals';
import * as React from 'react';
import { withApp } from '../../components/withApp';
import { withSuperAccountActivate } from '../../api/withSuperAccountActivate';
import { withSuperAccountSuspend } from '../../api/withSuperAccountSuspend';
import { withSuperAccountPend } from '../../api/withSuperAccountPend';
import { withSuperAccountFeatureAdd } from '../../api/withSuperAccountFeatureAdd';
import { withSuperAccountFeatureRemove } from '../../api/withSuperAccountFeatureRemove';
import { withSuperAccountMemberAdd } from '../../api/withSuperAccountMemberAdd';
import { withSuperAccountMemberRemove } from '../../api/withSuperAccountMemberRemove';
import { withSuperAccountRename } from '../../api/withSuperAccountRename';
import { UserSelect } from '../../api/UserSelect';
import { XHeader } from 'openland-x/XHeader';
import { DevToolsScaffold } from './components/DevToolsScaffold';
import { XButton } from 'openland-x/XButton';
import { XTable } from 'openland-x/XTable';
import { XForm } from 'openland-x-forms/XForm';
import { XModalForm } from 'openland-x-modal/XModalForm';
import { XFormField } from 'openland-x-forms/XFormField';
import { withQueryLoader } from '../../components/withQueryLoader';
import { withSuperAccount } from '../../api/withSuperAccount';
import { withOrganizationPublishedAlterSuper } from '../../api/withOrganizationPublishedAlter';
import { XOverflow } from '../../components/Incubator/XOverflow';

const ActivateButton = withSuperAccountActivate((props) => <XButton style="primary" action={() => props.activate({})} text="Activate" />);
const SuspendButton = withSuperAccountSuspend((props) => <XButton style="danger" action={() => props.suspend({})} text="Suspend" />);
const PendButton = withSuperAccountPend((props) => <XButton style="danger" action={() => props.pend({})} text="Pend" />);
const AlterOrgPublishedButton = withOrganizationPublishedAlterSuper((props) => {
    return (
        <XButton text={(props as any).published ? 'Hide from search' : 'Publish'} style="flat" action={async () => props.alterPublished({ variables: { organizationId: (props as any).orgId, published: !(props as any).published } })} />
    );
}) as React.ComponentType<{ orgId: string, published: boolean, refetchVars: { published: boolean } }>;

const AddMemberForm = withSuperAccountMemberAdd((props) => {
    return (
        <XModalForm
            title="Add member to organization"
            submitMutation={props.add}
            mutationDirect={true}
            actionName="Add"
            target={<XButton text="Add member" />}
        >
            <XFormField title="User">
                <XForm.Select field="userId" component={UserSelect} />
            </XFormField>
        </XModalForm>
    );
});

const RemoveMemberForm = withSuperAccountMemberRemove((props) => {
    return (
        <XModalForm
            title="Remove member from organization"
            submitMutation={props.remove}
            mutationDirect={true}
            actionStyle="danger"
            actionName="Remove"
            target={<XButton style="danger" text="Remove member" />}
        >
            <XFormField title="User">
                <XForm.Select field="userId" component={UserSelect} />
            </XFormField>
        </XModalForm>
    );
});

const AddFeature = withSuperAccountFeatureAdd((props) => {
    return (
        <XModalForm
            title="Add feature to organization"
            submitMutation={props.add}
            mutationDirect={true}
            actionName="Add"
            target={<XButton text="Add feature" />}
        >
            <XFormField title="Feature">
                <XForm.Select field="featureId" options={props.data.featureFlags.map((v) => ({ value: v.id, title: v.title }))} />
            </XFormField>
        </XModalForm>
    );
});

const RemoveFeature = withSuperAccountFeatureRemove((props) => {
    return (
        <XModalForm
            title="Remove feature from organization"
            submitMutation={props.remove}
            mutationDirect={true}
            actionStyle="danger"
            actionName="Remove"
            target={<XButton style="danger" text="Remove feature" />}
        >
            <XFormField title="Feature">
                <XForm.Select field="featureId" options={props.data.featureFlags.map((v) => ({ value: v.id, title: v.title }))} />
            </XFormField>
        </XModalForm>
    );
});

const Edit = withSuperAccountRename((props) => {
    return (
        <XModalForm
            title="Edit organization"
            actionName="Rename"
            target={<XButton text="Edit" />}
            submitMutation={props.rename}
            mutationDirect={true}
        >
            <XForm.Text
                field="title"
                autofocus={true}
                value={(props as any).orgTitle}
                placeholder="Organization Name"
            />
        </XModalForm>
    );
}) as React.ComponentType<{ orgTitle: string }>;

export default withApp('Super Organization', 'super-admin', withSuperAccount(withQueryLoader((props) => {
    return (
        <DevToolsScaffold title={props.data.superAccount.title}>
            <XHeader text={props.data.superAccount.title} description={'Current State: ' + props.data.superAccount.state}>
                <Edit orgTitle={props.data.superAccount.title} />
                <AddMemberForm />
                <RemoveMemberForm />
                {props.data.superAccount.state !== 'ACTIVATED' && <ActivateButton />}
                {props.data.superAccount.state === 'ACTIVATED' && <SuspendButton />}
                {props.data.superAccount.state === 'ACTIVATED' && <PendButton />}
                <XOverflow placement="bottom-end" content={<AlterOrgPublishedButton orgId={props.data.superAccount.orgId} published={props.data.superAccount.published} refetchVars={{ published: props.data.superAccount.published }} />} />
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
                <AddFeature />
                <RemoveFeature />
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
})));