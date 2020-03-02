import * as React from 'react';
import { withApp } from '../../components/withApp';
import { UButton } from 'openland-web/components/unicorn/UButton';
import { DevToolsScaffold } from './components/DevToolsScaffold';
import { useClient } from 'openland-api/useClient';
import { SuperAdminRole } from 'openland-api/spacex.types';
import { XView } from 'react-mental';
import { XModalFooter } from 'openland-web/components/XModalFooter';
import { XModalContent } from 'openland-web/components/XModalContent';
import { showModalBox } from 'openland-x/showModalBox';
import { useForm } from 'openland-form/useForm';
import { useField } from 'openland-form/useField';
import { TextLabel1, TextTitle1, TextLabel2 } from 'openland-web/utils/TextStyles';
import { XScrollView3 } from 'openland-x/XScrollView3';
import { UUserView } from 'openland-web/components/unicorn/templates/UUserView';
import { UInput } from 'openland-web/components/unicorn/UInput';
import { USelectField } from 'openland-web/components/unicorn/USelect';
import { ExplorePeople } from 'openland-web/fragments/create/ExplorePeople';
import { XLoader } from 'openland-x/XLoader';

export const AddSuperAdminForm = ({ hide }: { hide: () => void }) => {
    const [searchQuery, setSearchQuery] = React.useState('');
    const [selectedUsers, setSelectedUsers] = React.useState<null | Map<string, string>>(null);
    const client = useClient();
    const form = useForm();
    const roleField = useField('input.role', SuperAdminRole.EDITOR, form);

    const selectMembers = (label: string, value: string) => {
        const selected = new Map();
        selected.set(value, label);
        setSelectedUsers(selected);
    };

    const add = async () => {
        if (!selectedUsers) {
            return;
        }
        await client.mutateSuperAdminAdd({
            userId: selectedUsers.keys().next().value,
            role: roleField.value,
        });

        await client.refetchSuperAdmins();

        hide();
    };

    return (
        <XView borderRadius={8}>
            <XView flexGrow={1}>
                <XView zIndex={10} paddingBottom={10}>
                    <UInput
                        label="Search"
                        value={searchQuery}
                        onChange={setSearchQuery}
                        marginBottom={10}
                    />
                    <USelectField
                        placeholder="Role"
                        field={roleField as any}
                        options={[
                            { label: 'Editor', value: 'EDITOR' },
                            { label: 'Super Admin', value: 'SUPER_ADMIN' },
                            {
                                label: 'Software Developer',
                                value: 'SOFTWARE_DEVELOPER',
                            },
                        ]}
                    />
                </XView>
                <XView
                    flexGrow={1}
                    flexShrink={1}
                    marginHorizontal={-24}
                    maxHeight={300}
                    height={300}
                >
                    <React.Suspense fallback={<XLoader />}>
                        <ExplorePeople
                            query={searchQuery}
                            onPick={selectMembers}
                            selectedUsers={selectedUsers}
                        />
                    </React.Suspense>
                </XView>
            </XView>
            <XModalFooter>
                <XView marginRight={12}>
                    <UButton text="Cancel" style="tertiary" size="large" onClick={hide} />
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

const RemoveSuperAdminForm = ({ hide, uId }: { hide: () => void; uId: string }) => {
    const client = useClient();

    const remove = async () => {
        await client.mutateSuperAdminRemove({
            userId: uId,
        });
        await client.refetchSuperAdmins();
        hide();
    };

    return (
        <XView borderRadius={8}>
            <XModalContent>Are you sure?</XModalContent>
            <XModalFooter>
                <XView marginRight={12}>
                    <UButton text="Cancel" style="tertiary" size="large" onClick={hide} />
                </XView>
                <UButton text="Remove" style="danger" size="large" onClick={remove} />
            </XModalFooter>
        </XView>
    );
};

export const showRemoveSuperAdminFormModal = (uId: string) => {
    showModalBox(
        {
            title: 'Remove Super Admin',
        },
        ctx => <RemoveSuperAdminForm hide={ctx.hide} uId={uId} />,
    );
};

export default withApp('Super Admins', ['super-admin', 'software-developer'], () => {
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
            </XView>
            <XScrollView3>
                <XView maxWidth={600}>
                    {superAdmins.map(v => (
                        <UUserView
                            onClick={() => null}
                            user={v.user}
                            rightElement={
                                <XView flexDirection="row">
                                    <span className={TextLabel1}>{v.role}</span>
                                    <UButton
                                        text="Remove"
                                        size="small"
                                        onClick={() => showRemoveSuperAdminFormModal(v.user.id)}
                                    />
                                </XView>
                            }
                        />
                    ))}
                </XView>
            </XScrollView3>
        </DevToolsScaffold>
    );
});
