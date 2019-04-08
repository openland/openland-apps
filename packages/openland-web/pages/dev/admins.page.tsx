import * as React from 'react';
import { withApp } from '../../components/withApp';
import { UserSelect } from '../../api/UserSelect';
import { XHeader } from 'openland-x/XHeader';
import { XButton } from 'openland-x/XButton';
import { XTable } from 'openland-x/XTable';
import { XForm } from 'openland-x-forms/XForm';
import { DevToolsScaffold } from './components/DevToolsScaffold';
import { XModalForm } from 'openland-x-modal/XModalForm';
import { XFormField } from 'openland-x-forms/XFormField';
import { useClient } from 'openland-web/utils/useClient';
import { SuperAdminRole } from 'openland-api/Types';
import { MutationFunc } from 'react-apollo';

const AddSuperAdminForm = () => {
    const client = useClient();
    const mutate = async ({
        variables: { userId, role },
    }: {
        variables: { userId: string; role: SuperAdminRole };
    }) => {
        await client.mutateSuperAdminAdd({
            userId,
            role,
        });
    };

    return (
        <XModalForm
            title="Add Super Admin"
            submitMutation={mutate as MutationFunc<{}>}
            mutationDirect={true}
            actionName="Add"
            target={<XButton text="Add New" />}
        >
            <XFormField title="User">
                <XForm.Select field="userId" component={UserSelect} />
            </XFormField>
            <XFormField title="Role">
                <XForm.Select
                    field="role"
                    options={[
                        { title: 'Editor', value: 'EDITOR' },
                        { title: 'Super Admin', value: 'SUPER_ADMIN' },
                        {
                            title: 'Software Developer',
                            value: 'SOFTWARE_DEVELOPER',
                        },
                    ]}
                />
            </XFormField>
        </XModalForm>
    );
};

const RemoveSuperAdminForm = () => {
    const client = useClient();

    const mutate = async ({ variables: { userId } }: { variables: { userId: string } }) =>
        await client.mutateSuperAdminRemove({
            userId,
        });

    return (
        <XModalForm
            title="Remove Super Admin"
            submitMutation={mutate as MutationFunc<{}>}
            mutationDirect={true}
            actionName="Remove"
            actionStyle="danger"
            target={<XButton text="Remove existing" />}
        >
            <XFormField title="User">
                <XForm.Select field="userId" component={UserSelect} />
            </XFormField>
        </XModalForm>
    );
};

export default withApp('Super Admins', 'super-admin', () => {
    const client = useClient();
    const superAdmins = client.useSuperAdmins().superAdmins;
    return (
        <DevToolsScaffold title="Super Admins">
            <XHeader text="Super Admins" description={superAdmins.length + ' total'}>
                <AddSuperAdminForm />
                <RemoveSuperAdminForm />
            </XHeader>
            <XTable>
                <XTable.Header>
                    <XTable.Cell width={100}>First Name</XTable.Cell>
                    <XTable.Cell width={100}>Last Name</XTable.Cell>
                    <XTable.Cell>Email</XTable.Cell>
                    <XTable.Cell>Role</XTable.Cell>
                </XTable.Header>
                <XTable.Body>
                    {superAdmins.map(v => (
                        <XTable.Row key={v.user.id}>
                            <XTable.Cell width={100}>{v.user.firstName}</XTable.Cell>
                            <XTable.Cell width={100}>{v.user.lastName}</XTable.Cell>
                            <XTable.Cell>{v.email}</XTable.Cell>
                            <XTable.Cell>{v.role}</XTable.Cell>
                        </XTable.Row>
                    ))}
                </XTable.Body>
            </XTable>
        </DevToolsScaffold>
    );
});
