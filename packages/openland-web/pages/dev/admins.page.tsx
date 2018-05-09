import '../../globals';
import * as React from 'react';
import { withApp } from '../../components/withApp';
import { withSuperAdmins, UserSelect, withSuperAdminAdd, withSuperAdminRemove } from '../../api/';
import { XHeader } from 'openland-x/XHeader';
import { XButton } from 'openland-x/XButton';
import { XTable } from 'openland-x/XTable';
import { XFooter } from 'openland-x/XFooter';
import { XModalTargeted } from 'openland-x-modal/XModalTargeted';
import { XForm } from 'openland-x-forms/XForm';
import { DevToolsScaffold } from './components/DevToolsScaffold';

const AddSuperAdminForm = withSuperAdminAdd((props) => {
    return (
        <XForm submitMutation={props.add} mutationDirect={true}>
            <XForm.Field title="User">
                <XForm.Select field="userId" component={UserSelect} />
            </XForm.Field>
            <XForm.Field title="Role">
                <XForm.Select
                    field="role"
                    options={[
                        { title: 'Editor', value: 'EDITOR' },
                        { title: 'Super Admin', value: 'SUPER_ADMIN' },
                        { title: 'Software Developer', value: 'SOFTWARE_DEVELOPER' }
                    ]}
                />
            </XForm.Field>
            <XFooter>
                <XForm.Submit style="primary" text="Add" />
            </XFooter>
        </XForm>
    );
});

const RemoveSuperAdminForm = withSuperAdminRemove((props) => {
    return (
        <XForm submitMutation={props.remove} mutationDirect={true}>
            <XForm.Field title="User">
                <XForm.Select field="userId" component={UserSelect} />
            </XForm.Field>
            <XFooter>
                <XForm.Submit style="primary" text="Remove" />
            </XFooter>
        </XForm>
    );
});

export default withApp('Super Admins', 'super-admin', withSuperAdmins((props) => {
    return (
        <DevToolsScaffold title="Super Admins">
            <XHeader text="Super Admins" description={props.data.superAdmins.length + ' total'}>
                <XModalTargeted fullScreen={false} title="Adding New Super Admin">
                    <XModalTargeted.Target>
                        <XButton text="Add New" />
                    </XModalTargeted.Target>
                    <XModalTargeted.Content>
                        <AddSuperAdminForm />
                    </XModalTargeted.Content>
                </XModalTargeted>
                <XModalTargeted fullScreen={false} title="Removing Super Admin">
                    <XModalTargeted.Target>
                        <XButton text="Remove Exising" />
                    </XModalTargeted.Target>
                    <XModalTargeted.Content>
                        <RemoveSuperAdminForm />
                    </XModalTargeted.Content>
                </XModalTargeted>
            </XHeader>
            <XTable>
                <XTable.Header>
                    <XTable.Cell width={100}>
                        First Name
                        </XTable.Cell>
                    <XTable.Cell width={100}>
                        Last Name
                        </XTable.Cell>
                    <XTable.Cell>
                        Email
                        </XTable.Cell>
                    <XTable.Cell>
                        Role
                        </XTable.Cell>
                </XTable.Header>
                <XTable.Body>
                    {props.data.superAdmins.map((v) => (
                        <XTable.Row key={v.user.id}>
                            <XTable.Cell width={100}>{v.user.firstName}</XTable.Cell>
                            <XTable.Cell width={100}>{v.user.lastName}</XTable.Cell>
                            <XTable.Cell>{v.user.email}</XTable.Cell>
                            <XTable.Cell>{v.role}</XTable.Cell>
                        </XTable.Row>
                    ))}
                </XTable.Body>
            </XTable>
        </DevToolsScaffold>
    );
}));