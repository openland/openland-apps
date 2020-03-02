import * as React from 'react';
import { XView } from 'react-mental';
import { withApp } from '../../components/withApp';
import { XLoader } from 'openland-x/XLoader';
// import { UserSelect } from '../../components/UserSelect';
import { DevToolsScaffold } from './components/DevToolsScaffold';
import { UButton } from 'openland-web/components/unicorn/UButton';
import { useClient } from 'openland-api/useClient';
import { useXRouter } from 'openland-x-routing/useXRouter';
import { XModalFooter } from 'openland-web/components/XModalFooter';
import { showModalBox } from 'openland-x/showModalBox';
import { useForm } from 'openland-form/useForm';
import { useField } from 'openland-form/useField';
import { FeatureFlags_featureFlags } from 'openland-api/spacex.types';
import { UInput } from 'openland-web/components/unicorn/UInput';
import { USelectField } from 'openland-web/components/unicorn/USelect';

const ActivateButton = ({ accountId }: { accountId: string }) => {
    const client = useClient();

    return (
        <UButton
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
        <UButton
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
        <UButton
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

const showSuperDeleteOrganizationModal = ({ orgId, accountId }: DeleteButtonProps) =>
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
                            <UButton
                                text="Cancel"
                                style="tertiary"
                                size="large"
                                onClick={ctx.hide}
                            />
                        </XView>
                        <UButton
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
        <UButton
            text="Delete"
            style="danger"
            flexShrink={0}
            onClick={() => showSuperDeleteOrganizationModal(props)}
        />
    );
};

// const DeleteUserModal = ({ userId, hide }: { userId: string; hide: () => void }) => {
//     const client = useClient();
//
//     const form = useForm();
//     const remove = () =>
//         form.doAction(async () => {
//             await client.mutateDeleteUser({
//                 id: userId,
//             });
//
//             hide();
//         });
//
//     return (
//         <XView borderRadius={8}>
//             <XModalFooter>
//                 <XView marginRight={12}>
//                     <UButton text="Cancel" style="tertiary" size="large" onClick={hide} />
//                 </XView>
//                 <UButton
//                     text="Delete"
//                     style="danger"
//                     size="large"
//                     onClick={remove}
//                     loading={form.loading}
//                 />
//             </XModalFooter>
//         </XView>
//     );
// };

// const showDeleteUserModal = (userId: string) => {
//     showModalBox(
//         {
//             title: 'Block user?',
//         },
//         ctx => {
//             return <DeleteUserModal userId={userId} hide={ctx.hide} />;
//         },
//     );
// };

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
        <UButton
            text={published ? 'Hide from search' : 'Publish'}
            style="secondary"
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
            <XView flexGrow={1}>
                {/*<UserSelect value={userField.input.value} onChange={userField.input.onChange} />*/}
            </XView>
            <XModalFooter>
                <XView marginRight={12}>
                    <UButton text="Cancel" style="tertiary" size="large" onClick={hide} />
                </XView>
                <UButton
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

const showAddMemberFormModal = (accountId: string) => {
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
            <XView flexGrow={1}>
                {/*<UserSelect value={userField.input.value} onChange={userField.input.onChange} />*/}
            </XView>
            <XModalFooter>
                <XView marginRight={12}>
                    <UButton text="Cancel" style="tertiary" size="large" onClick={hide} />
                </XView>
                <UButton
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

const showRemoveMemberFormModal = (accountId: string) => {
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
    const data = client.useFeatureFlags({ suspense: false });

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
            <XView flexGrow={1}>
                {featureIdField.value && (
                    <USelectField
                        field={featureIdField as any}
                        value={featureIdField.value!.id}
                        placeholder={'feature'}
                        options={data.featureFlags.map((v: any) => ({
                            label: v.title,
                            value: v.id,
                        }))}
                    />
                )}
            </XView>
            <XModalFooter>
                <XView marginRight={12}>
                    <UButton text="Cancel" style="tertiary" size="large" onClick={hide} />
                </XView>
                <UButton
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

const showAddFeatureModal = (accountId: string) => {
    showModalBox(
        {
            title: 'Add feature to organization',
        },
        ctx => {
            return <AddFeatureModal accountId={accountId} hide={ctx.hide} />;
        },
    );
};

const RemoveFeatureModal = ({ accountId, hide }: { accountId: string; hide: () => void }) => {
    const client = useClient();
    const form = useForm();
    const data = client.useFeatureFlags({ suspense: false });

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

    const remove = () =>
        form.doAction(async () => {
            if (!featureIdField.value) {
                return;
            }

            await client.mutateFeatureFlagDisable({
                accountId,
                featureId: featureIdField.value.id,
            });
            hide();
        });

    return (
        <XView borderRadius={8}>
            <XView flexGrow={1}>
                {featureIdField.value && (
                    <USelectField
                        field={featureIdField as any}
                        value={featureIdField.value!.id}
                        placeholder={'feature'}
                        options={data.featureFlags.map((v: any) => ({
                            label: v.title,
                            value: v.id,
                        }))}
                    />
                )}
            </XView>
            <XModalFooter>
                <XView marginRight={12}>
                    <UButton text="Cancel" style="tertiary" size="large" onClick={hide} />
                </XView>
                <UButton
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

const showRemoveFeatureModal = (accountId: string) => {
    showModalBox(
        {
            title: 'Remove feature from organization',
        },
        ctx => {
            return <RemoveFeatureModal accountId={accountId} hide={ctx.hide} />;
        },
    );
};

interface EditOrganizationModal {
    accountId: string;
    orgTitle: string;
}

const EditOrganizationModal = ({
    accountId,
    orgTitle,
    hide,
}: EditOrganizationModal & { hide: () => void }) => {
    const client = useClient();

    const form = useForm();
    const titleField = useField('input.title', orgTitle || '', form);

    const rename = () =>
        form.doAction(async () => {
            await client.mutateSuperAccountRename({
                accountId,
                title: titleField.value,
            });

            hide();
        });

    return (
        <XView borderRadius={8}>
            <XView flexGrow={1}>
                <UInput label={'Organization Name'} {...titleField.input} />
            </XView>
            <XModalFooter>
                <XView marginRight={12}>
                    <UButton text="Cancel" style="tertiary" size="large" onClick={hide} />
                </XView>
                <UButton
                    text="Rename"
                    style="primary"
                    size="large"
                    onClick={rename}
                    loading={form.loading}
                />
            </XModalFooter>
        </XView>
    );
};

const showEditOrganizationModal = (props: EditOrganizationModal) => {
    showModalBox(
        {
            title: 'Edit organization',
        },
        ctx => {
            return <EditOrganizationModal hide={ctx.hide} {...props} />;
        },
    );
};

export default withApp('Super Organization', ['super-admin', 'software-developer'], () => {
    const client = useClient();
    const router = useXRouter();
    const accountId = router.routeQuery.accountId as string;
    const superAccount = client.useSuperAccount({ accountId }).superAccount;
    const actionsButton = superAccount.state === 'ACTIVATED';

    return (
        <DevToolsScaffold title={superAccount.title}>
            <div>{superAccount.title}</div>
            <div>{'Current State: ' + superAccount.state}</div>
            <XView flexDirection="row" justifyContent="space-between">
                <UButton
                    text="Edit"
                    flexShrink={0}
                    onClick={() =>
                        showEditOrganizationModal({
                            accountId,
                            orgTitle: superAccount.title,
                        })
                    }
                />
                {superAccount.state !== 'DELETED' && (
                    <>
                        <UButton
                            text="Add member"
                            flexShrink={0}
                            onClick={() => showAddMemberFormModal(accountId)}
                        />
                        <UButton
                            style="danger"
                            text="Remove member"
                            flexShrink={0}
                            onClick={() => showRemoveMemberFormModal(accountId)}
                        />
                    </>
                )}
                {!actionsButton && superAccount.state !== 'DELETED' && (
                    <ActivateButton accountId={accountId} />
                )}
                {actionsButton && <SuspendButton accountId={accountId} />}
                {actionsButton && <PendButton accountId={accountId} />}
                {actionsButton && <DeleteButton accountId={accountId} orgId={superAccount.orgId} />}
                <AlterOrgPublishedButton
                    accountId={accountId}
                    orgId={superAccount.orgId}
                    published={superAccount.published}
                />
            </XView>
            <div>Members</div>
            <div>{superAccount.members.length + ' total'}</div>
            {/* <XTable>
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
                                <UButton
                                    text="Block"
                                    style="danger"
                                    flexShrink={0}
                                    onClick={() => showDeleteUserModal(v.id)}
                                />
                            </XTable.Cell>
                        </XTable.Row>
                    ))}
                </XTable.Body>
            </XTable> */}
            <div>Features</div>
            <div>{superAccount.features.length + ' total'}</div>
            <XView flexDirection="row" justifyContent="space-between">
                <UButton text="Add feature" onClick={() => showAddFeatureModal(accountId)} />
                <UButton
                    style="danger"
                    text="Remove feature"
                    onClick={() => showRemoveFeatureModal(accountId)}
                />
            </XView>
            {/* <XTable>
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
            </XTable> */}
        </DevToolsScaffold>
    );
});
