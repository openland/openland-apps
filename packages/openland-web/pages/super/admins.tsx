import '../../globals';
import * as React from 'react';
import { withApp } from '../../components/withApp';
import { withSuperAdmins, UserSelect, withSuperAdminAdd, withSuperAdminRemove } from '../../api';
import { AppContent } from '../../components/App/AppContent';
import { XCard } from '../../components/X/XCard';
import { XTable } from '../../components/X/XTable';
import { XButton } from '../../components/X/XButton';
import { XModalTargeted } from '../../components/X/XModalTargeted';
import { XForm } from '../../components/X/XForm';

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
            <XCard.Footer>
                <XForm.Submit style="dark">Add</XForm.Submit>
            </XCard.Footer>
        </XForm>
    );
});

const RemoveSuperAdminForm = withSuperAdminRemove((props) => {
    return (
        <XForm submitMutation={props.remove} mutationDirect={true}>
            <XForm.Field title="User">
                <XForm.Select field="userId" component={UserSelect} />
            </XForm.Field>
            <XCard.Footer>
                <XForm.Submit style="dark">Remove</XForm.Submit>
            </XCard.Footer>
        </XForm>
    );
});

export default withApp('Super Admins', 'super-admin', withSuperAdmins((props) => {
    return (
        <AppContent>
            <XCard shadow="medium">
                <XCard.Header text="Super Admins" description={props.data.superAdmins.length + ' total'}>
                    <XModalTargeted fullScreen={false} title="Adding New Super Admin">
                        <XModalTargeted.Target>
                            <XButton>Add New</XButton>
                        </XModalTargeted.Target>
                        <XModalTargeted.Content>
                            <AddSuperAdminForm />
                        </XModalTargeted.Content>
                    </XModalTargeted>
                    <XModalTargeted fullScreen={false} title="Removing Super Admin">
                        <XModalTargeted.Target>
                            <XButton>Remove Exising</XButton>
                        </XModalTargeted.Target>
                        <XModalTargeted.Content>
                            <RemoveSuperAdminForm />
                        </XModalTargeted.Content>
                    </XModalTargeted>
                </XCard.Header>
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

            </XCard>
        </AppContent>
    );
}));