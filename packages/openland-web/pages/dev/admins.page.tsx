import '../../globals';
import * as React from 'react';
import { withApp } from '../../components/withApp';
import { withSuperAdmins } from '../../api/withSuperAdmins';
import { UserSelect } from '../../api/UserSelect';
import { withSuperAdminAdd } from '../../api/withSuperAdminAdd';
import { withSuperAdminRemove } from '../../api/withSuperAdminRemove';
import { XHeader } from 'openland-x/XHeader';
import { XButton } from 'openland-x/XButton';
import { XTable } from 'openland-x/XTable';
import { XForm } from 'openland-x-forms/XForm';
import { DevToolsScaffold } from './components/DevToolsScaffold';
import { XModalForm } from 'openland-x-modal/XModalForm';
import { XFormField } from 'openland-x-forms/XFormField';

const AddSuperAdminForm = withSuperAdminAdd((props) => {
    return (
        <XModalForm
            title="Add Super Admin"
            submitMutation={props.add}
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
                        { title: 'Software Developer', value: 'SOFTWARE_DEVELOPER' }
                    ]}
                />
            </XFormField>
        </XModalForm>
    );
});

const RemoveSuperAdminForm = withSuperAdminRemove((props) => {
    return (
        <XModalForm
            title="Remove Super Admin"
            submitMutation={props.remove} 
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
});

export default withApp('Super Admins', 'super-admin', withSuperAdmins((props) => {
    return (
        <DevToolsScaffold title="Super Admins">
            <XHeader text="Super Admins" description={props.data.superAdmins.length + ' total'}>
                <AddSuperAdminForm />
                <RemoveSuperAdminForm />
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