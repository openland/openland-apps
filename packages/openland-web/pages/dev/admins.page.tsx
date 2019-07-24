import * as React from 'react';
import { withApp } from '../../components/withApp';
import { UserSelect } from '../../api/UserSelect';
import { XHeader } from 'openland-x/XHeader';
import { XButton } from 'openland-x/XButton';
import { XTable } from 'openland-x/XTable';
import { DevToolsScaffold } from './components/DevToolsScaffold';
import { useClient } from 'openland-web/utils/useClient';
import { SuperAdminRole } from 'openland-api/Types';
import { XView } from 'react-mental';
import { XModalContent } from 'openland-web/components/XModalContent';
import { XVertical } from 'openland-x-layout/XVertical';
import { XModalFooter } from 'openland-x-modal/XModal';
import { showModalBox } from 'openland-x/showModalBox';
import { SelectWithDropdown } from '../main/mail/SelectWithDropdown';
import { useForm } from 'openland-form/useForm';
import { useField } from 'openland-form/useField';

export const AddSuperAdminForm = ({ hide }: { hide: () => void }) => {
    const client = useClient();

    const form = useForm();

    const userField = useField('input.user', null as any, form);
    const roleField = useField('input.role', SuperAdminRole.EDITOR, form);

    const add = () =>
        form.doAction(async () => {
            if (!userField.value) {
                return;
            }

            await client.mutateSuperAdminAdd({
                userId: (userField.value as { value: string }).value,
                role: roleField.value,
            });

            hide();
        });

    return (
        <XView borderRadius={8}>
            <XModalContent>
                <XVertical flexGrow={1} separator={8}>
                    <UserSelect value={userField.input.value} onChange={userField.input.onChange} />
                    <SelectWithDropdown
                        {...roleField.input}
                        size="large"
                        title={'User role'}
                        selectOptions={[
                            { label: 'Editor', value: 'EDITOR' },
                            { label: 'Super Admin', value: 'SUPER_ADMIN' },
                            {
                                label: 'Software Developer',
                                value: 'SOFTWARE_DEVELOPER',
                            },
                        ]}
                    />
                </XVertical>
            </XModalContent>
            <XModalFooter>
                <XView marginRight={12}>
                    <XButton text="Cancel" style="ghost" size="large" onClick={hide} />
                </XView>
                <XButton
                    text="Add"
                    style="danger"
                    size="large"
                    loading={form.loading}
                    onClick={add}
                />
            </XModalFooter>
        </XView>
    );
};

export const showAddSuperAdminFormModal = () => {
    showModalBox(
        {
            title: 'Add Super Admin',
        },
        ctx => <AddSuperAdminForm hide={ctx.hide} />,
    );
};

const RemoveSuperAdminForm = ({ hide }: { hide: () => void }) => {
    const client = useClient();

    const form = useForm();

    const userField = useField('input.user', null as any, form);

    const remove = () =>
        form.doAction(async () => {
            if (!userField.value) {
                return;
            }

            await client.mutateSuperAdminRemove({
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
                <XButton text="Leave" style="danger" size="large" onClick={remove} />
            </XModalFooter>
        </XView>
    );
};

export const showRemoveSuperAdminFormModal = () => {
    showModalBox(
        {
            title: 'Remove Super Admin',
        },
        ctx => <RemoveSuperAdminForm hide={ctx.hide} />,
    );
};

export default withApp('Super Admins', 'super-admin', () => {
    const client = useClient();
    const superAdmins = client.useSuperAdmins().superAdmins;
    return (
        <DevToolsScaffold title="Super Admins">
            <XHeader text="Super Admins" description={superAdmins.length + ' total'}>
                <XButton text="Add New" onClick={() => showAddSuperAdminFormModal()} />
                <XButton text="Remove existing" onClick={() => showRemoveSuperAdminFormModal()} />
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
