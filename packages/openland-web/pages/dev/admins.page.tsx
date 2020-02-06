import * as React from 'react';
import { withApp } from '../../components/withApp';
import { UButton } from 'openland-web/components/unicorn/UButton';
import { DevToolsScaffold } from './components/DevToolsScaffold';
import { useClient } from 'openland-web/utils/useClient';
import { SuperAdminRole } from 'openland-api/spacex.types';
import { XView } from 'react-mental';
import { XModalContent } from 'openland-web/components/XModalContent';
import { XVertical } from 'openland-x-layout/XVertical';
import { XModalFooter } from 'openland-x-modal/XModal';
import { showModalBox } from 'openland-x/showModalBox';
import { SelectWithDropdown } from '../components/SelectWithDropdown';
import { useForm } from 'openland-form/useForm';
import { useField } from 'openland-form/useField';
import { TextLabel1, TextTitle1, TextLabel2 } from 'openland-web/utils/TextStyles';
import { XScrollView3 } from 'openland-x/XScrollView3';
import { UUserView } from 'openland-web/components/unicorn/templates/UUserView';

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
                    {/* <UserSelect value={userField.input.value} onChange={userField.input.onChange} /> */}
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
                    <UButton text="Cancel" style="secondary" size="large" onClick={hide} />
                </XView>
                <UButton
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
                    {/* <UserSelect value={userField.input.value} onChange={userField.input.onChange} /> */}
                </XVertical>
            </XModalContent>
            <XModalFooter>
                <XView marginRight={12}>
                    <UButton text="Cancel" style="secondary" size="large" onClick={hide} />
                </XView>
                <UButton text="Leave" style="danger" size="large" onClick={remove} />
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
            <XView flexDirection="row" alignItems="center">
                <XView flexGrow={1}>
                    <span className={TextTitle1}>Super Admins</span>
                    <span className={TextLabel2}>{superAdmins.length + ' total'}</span>
                </XView>
                <UButton text="Add New" onClick={() => showAddSuperAdminFormModal()} />
                <UButton text="Remove existing" onClick={() => showRemoveSuperAdminFormModal()} />
            </XView>
            <XScrollView3>
                <XView maxWidth={600}>
                    {superAdmins.map(v => (
                        <UUserView
                            user={v.user}
                            rightElement={<span className={TextLabel1}>{v.role}</span>}
                        />
                    ))}
                </XView>
            </XScrollView3>
        </DevToolsScaffold>
    );
});
