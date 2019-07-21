import * as React from 'react';
import { XView } from 'react-mental';
import { withApp } from '../../components/withApp';
import { MutationFunc } from 'react-apollo';
import { XLoader } from 'openland-x/XLoader';
import { UserSelect } from '../../api/UserSelect';
import { XHeader } from 'openland-x/XHeader';
import { DevToolsScaffold } from './components/DevToolsScaffold';
import { XButton } from 'openland-x/XButton';
import { XTable } from 'openland-x/XTable';
import { XForm } from 'openland-x-forms/XForm';
import { XModalForm } from 'openland-x-modal/XModalForm';
import { XFormField } from 'openland-x-forms/XFormField';
import { XOverflow } from '../../components/XOverflow';
import { useClient } from 'openland-web/utils/useClient';
import { useXRouter } from 'openland-x-routing/useXRouter';
import { XModal, XModalFooter } from 'openland-x-modal/XModal';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import { showModalBox } from 'openland-x/showModalBox';
import { useForm } from 'openland-form/useForm';
import { useField } from 'openland-form/useField';
import { XModalContent } from 'openland-web/components/XModalContent';
import { XVertical } from 'openland-x-layout/XVertical';
import { InputField } from 'openland-web/components/InputField';
import { SelectWithDropdown } from '../main/mail/SelectWithDropdown';
import { FeatureFlags_featureFlags } from 'openland-api/Types';

const ActivateButton = ({ accountId }: { accountId: string }) => {
    const client = useClient();

    return (
        <XButton
            style="primary"
            action={() => {
                client.mutateSuperAccountActivate({
                    accountId,
                });
            }}
            text="Activate"
            flexShrink={0}
        />
    );
};

const SuspendButton = ({ accountId }: { accountId: string }) => {
    const client = useClient();

    return (
        <XButton
            style="danger"
            action={() =>
                client.mutateSuperAccountSuspend({
                    accountId,
                })
            }
            text="Suspend"
            flexShrink={0}
        />
    );
};

const PendButton = ({ accountId }: { accountId: string }) => {
    const client = useClient();

    return (
        <XButton
            style="danger"
            action={() =>
                client.mutateSuperAccountPend({
                    accountId,
                })
            }
            text="Pend"
            flexShrink={0}
        />
    );
};

interface DeleteButtonProps {
    accountId: string;
    orgId: string;
}

export const showSuperDeleteOrganizationModal = ({ orgId, accountId }: DeleteButtonProps) =>
    showModalBox(
        {
            title: 'Delete organization',
        },
        ctx => {
            const client = useClient();

            return (
                <XView borderRadius={8}>
                    <XModalFooter>
                        <XView marginRight={12}>
                            <XButton text="Cancel" style="ghost" size="large" onClick={ctx.hide} />
                        </XView>
                        <XButton
                            text="Delete"
                            style="danger"
                            size="large"
                            action={async () => {
                                await client.mutateDeleteOrganization({
                                    organizationId: orgId,
                                });
                                await client.refetchSuperAccount({
                                    accountId,
                                });
                            }}
                        />
                    </XModalFooter>
                </XView>
            );
        },
    );

const DeleteButton = (props: DeleteButtonProps) => {
    return (
        <XButton
            text="Delete"
            style="danger"
            flexShrink={0}
            onClick={() => showSuperDeleteOrganizationModal(props)}
        />
    );
};

const DeleteUserModal = ({ userId, hide }: { userId: string; hide: () => void }) => {
    const client = useClient();

    const form = useForm();
    const remove = () =>
        form.doAction(async () => {
            await client.mutateDeleteUser({
                id: userId,
            });

            hide();
        });

    return (
        <XView borderRadius={8}>
            <XModalFooter>
                <XView marginRight={12}>
                    <XButton text="Cancel" style="ghost" size="large" onClick={hide} />
                </XView>
                <XButton
                    text="Delete"
                    style="danger"
                    size="large"
                    onClick={remove}
                    loading={form.loading}
                />
            </XModalFooter>
        </XView>
    );
};

export const showDeleteUserModal = (userId: string) => {
    showModalBox(
        {
            title: 'Block user?',
        },
        ctx => {
            return <DeleteUserModal userId={userId} hide={ctx.hide} />;
        },
    );
};

const AlterOrgPublishedButton = ({
    orgId,
    published,
    accountId,
}: {
    orgId: string;
    published: boolean;
    accountId: string;
}) => {
    const client = useClient();

    return (
        <XButton
            text={published ? 'Hide from search' : 'Publish'}
            style="flat"
            action={async () => {
                await client.mutateOrganizationAlterPublished({
                    organizationId: orgId,
                    published: !published,
                });

                await client.refetchSuperAccount({
                    accountId,
                });
            }}
        />
    );
};

const AddMemberForm = ({ hide, accountId }: { accountId: string; hide: () => void }) => {
    const client = useClient();

    const form = useForm();
    const userField = useField('input.user', null as any, form);

    const add = () =>
        form.doAction(async () => {
            if (!userField.value) {
                return;
            }

            await client.mutateSuperAccountMemberAdd({
                accountId,
                userId: (userField.value as { value: string }).value,
            });

            hide();
        });

    return (
        <XView borderRadius={8}>
            <XModalContent>
                <XVertical flexGrow={1} separator={8}>
                    <UserSelect value={userField.input.value} onChange={userField.input.onChange} />
                </XVertical>
            </XModalContent>
            <XModalFooter>
                <XView marginRight={12}>
                    <XButton text="Cancel" style="ghost" size="large" onClick={hide} />
                </XView>
                <XButton
                    text="Add"
                    style="primary"
                    size="large"
                    onClick={add}
                    loading={form.loading}
                />
            </XModalFooter>
        </XView>
    );
};

export const showAddMemberFormModal = (accountId: string) => {
    showModalBox(
        {
            title: 'Add member to organization',
        },
        ctx => {
            return <AddMemberForm accountId={accountId} hide={ctx.hide} />;
        },
    );
};

const RemoveMemberForm = ({ hide, accountId }: { accountId: string; hide: () => void }) => {
    const client = useClient();

    const form = useForm();
    const userField = useField('input.user', null as any, form);

    const remove = () =>
        form.doAction(async () => {
            if (!userField.value) {
                return;
            }

            await client.mutateSuperAccountMemberRemove({
                accountId,
                userId: (userField.value as { value: string }).value,
            });

            hide();
        });

    return (
        <XView borderRadius={8}>
            <XModalContent>
                <XVertical flexGrow={1} separator={8}>
                    <UserSelect value={userField.input.value} onChange={userField.input.onChange} />
                </XVertical>
            </XModalContent>
            <XModalFooter>
                <XView marginRight={12}>
                    <XButton text="Cancel" style="ghost" size="large" onClick={hide} />
                </XView>
                <XButton
                    text="Remove"
                    style="danger"
                    size="large"
                    onClick={remove}
                    loading={form.loading}
                />
            </XModalFooter>
        </XView>
    );
};

export const showRemoveMemberFormModal = (accountId: string) => {
    showModalBox(
        {
            title: 'Remove member from organization',
        },
        ctx => {
            return <RemoveMemberForm accountId={accountId} hide={ctx.hide} />;
        },
    );
};

const AddFeatureModal = ({ accountId, hide }: { accountId: string; hide: () => void }) => {
    const client = useClient();
    const form = useForm();
    const data = client.useWithoutLoaderFeatureFlags();

    const featureIdField = useField(
        'input.featureId',
        null as FeatureFlags_featureFlags | null,
        form,
    );

    React.useEffect(
        () => {
            if (!data) {
                return;
            }

            featureIdField.input.onChange(
                data.featureFlags.length > 0 ? data.featureFlags[0] : null,
            );
        },
        [data],
    );

    if (!data) {
        return <XLoader loading={true} />;
    }

    const add = () =>
        form.doAction(async () => {
            if (!featureIdField.value) {
                return;
            }

            client.mutateFeatureFlagAdd({
                key: featureIdField.value.key,
                title: featureIdField.value.title,
            });
            hide();
        });

    return (
        <XView borderRadius={8}>
            <XModalContent>
                <XVertical flexGrow={1} separator={8}>
                    {featureIdField.value && (
                        <SelectWithDropdown
                            {...featureIdField.input}
                            value={featureIdField.value!.id}
                            size="large"
                            title={'feature'}
                            selectOptions={data.featureFlags.map((v: any) => ({
                                label: v.title,
                                value: v.id,
                            }))}
                        />
                    )}
                </XVertical>
            </XModalContent>
            <XModalFooter>
                <XView marginRight={12}>
                    <XButton text="Cancel" style="ghost" size="large" onClick={hide} />
                </XView>
                <XButton
                    text="Add"
                    style="primary"
                    size="large"
                    onClick={add}
                    loading={form.loading}
                />
            </XModalFooter>
        </XView>
    );
};

export const showAddFeatureModal = (accountId: string) => {
    showModalBox(
        {
            title: 'Add feature to organization',
        },
        ctx => {
            return <AddFeatureModal accountId={accountId} hide={ctx.hide} />;
        },
    );
};

const RemoveFeature = ({ accountId }: { accountId: string }) => {
    const client = useClient();
    const data = client.useWithoutLoaderFeatureFlags();

    if (!data) {
        return <XLoader loading={true} />;
    }

    const mutate = async ({ variables: { featureId } }: { variables: { featureId: string } }) =>
        await client.mutateFeatureFlagDisable({
            accountId,
            featureId,
        });

    return (
        <XModalForm
            title="Remove feature from organization"
            submitMutation={mutate as MutationFunc<{}>}
            mutationDirect={true}
            actionStyle="danger"
            actionName="Remove"
            target={<XButton style="danger" text="Remove feature" />}
        >
            <XFormField title="Feature">
                <XForm.Select
                    field="featureId"
                    options={data.featureFlags.map((v: any) => ({
                        value: v.id,
                        title: v.title,
                    }))}
                />
            </XFormField>
        </XModalForm>
    );
};

const Edit = ({ accountId, orgTitle }: { accountId: string; orgTitle: string }) => {
    const client = useClient();

    const mutate = async ({ variables: { title } }: { variables: { title: string } }) =>
        await client.mutateSuperAccountRename({
            accountId,
            title,
        });

    return (
        <XModalForm
            title="Edit organization"
            actionName="Rename"
            target={<XButton text="Edit" flexShrink={0} />}
            submitMutation={mutate as MutationFunc<{}>}
            mutationDirect={true}
        >
            <XForm.Text
                field="title"
                autofocus={true}
                value={orgTitle}
                placeholder="Organization Name"
            />
        </XModalForm>
    );
};

export default withApp('Super Organization', 'super-admin', () => {
    const client = useClient();
    const router = useXRouter();
    const accountId = router.routeQuery.accountId as string;
    const superAccount = client.useSuperAccount({ accountId }).superAccount;
    const actionsButton = superAccount.state === 'ACTIVATED';

    return (
        <DevToolsScaffold title={superAccount.title}>
            <XHeader text={superAccount.title} description={'Current State: ' + superAccount.state}>
                <Edit orgTitle={superAccount.title} accountId={accountId} />
                {superAccount.state !== 'DELETED' && (
                    <>
                        <XButton
                            text="Add member"
                            flexShrink={0}
                            onClick={() => showAddMemberFormModal(accountId)}
                        />
                        <XButton
                            style="danger"
                            text="Remove member"
                            flexShrink={0}
                            onClick={() => showRemoveMemberFormModal(accountId)}
                        />
                    </>
                )}
                {!actionsButton &&
                    superAccount.state !== 'DELETED' && <ActivateButton accountId={accountId} />}
                {actionsButton && <SuspendButton accountId={accountId} />}
                {actionsButton && <PendButton accountId={accountId} />}
                {actionsButton && <DeleteButton accountId={accountId} orgId={superAccount.orgId} />}
                <XOverflow
                    placement="bottom-end"
                    content={
                        <AlterOrgPublishedButton
                            accountId={accountId}
                            orgId={superAccount.orgId}
                            published={superAccount.published}
                        />
                    }
                />
            </XHeader>
            <XHeader text="Members" description={superAccount.members.length + ' total'} />
            <XTable>
                <XTable.Header>
                    <XTable.Cell>Name</XTable.Cell>
                    <XTable.Cell>Email</XTable.Cell>
                </XTable.Header>
                <XTable.Body>
                    {superAccount.members.map(v => (
                        <XTable.Row key={v.id} noHover={true}>
                            <XTable.Cell>{v.name}</XTable.Cell>
                            <XTable.Cell>{v.email}</XTable.Cell>
                            <XTable.Cell>
                                <XButton
                                    text="Block"
                                    style="danger"
                                    flexShrink={0}
                                    onClick={() => showDeleteUserModal(v.id)}
                                />
                            </XTable.Cell>
                        </XTable.Row>
                    ))}
                </XTable.Body>
            </XTable>
            <XHeader text="Features" description={superAccount.features.length + ' total'}>
                <XButton text="Add feature" onClick={() => showAddFeatureModal(accountId)} />

                <RemoveFeature accountId={accountId} />
            </XHeader>
            <XTable>
                <XTable.Header>
                    <XTable.Cell>Key</XTable.Cell>
                    <XTable.Cell>Title</XTable.Cell>
                </XTable.Header>
                <XTable.Body>
                    {superAccount.features.map(v => (
                        <XTable.Row key={v.id} noHover={true}>
                            <XTable.Cell>{v.key}</XTable.Cell>
                            <XTable.Cell>{v.title}</XTable.Cell>
                        </XTable.Row>
                    ))}
                </XTable.Body>
            </XTable>
        </DevToolsScaffold>
    );
});
