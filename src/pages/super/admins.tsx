import '../../globals';
import * as React from 'react';
import { withApp } from '../../components/withApp';
import { withSuperAdmins, UserSelect, withSuperAdminAdd, withSuperAdminRemove } from '../../api';
import { AppContent } from '../../components/App/AppContent';
import { XCard } from '../../components/X/XCard';
import { XButton } from '../../components/X/XButton';
import { XModal } from '../../components/X/XModal';
import { XForm } from '../../components/X/XForm';

const AddSuperAdminForm = withSuperAdminAdd((props) => {
    return (
        <XForm submitMutation={props.add} mutationDirect={true}>
            <XForm.Field title="User">
                <XForm.Select field="userId" component={UserSelect} />
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

export default withApp('super-admin', withSuperAdmins((props) => {
    return (
        <AppContent>
            <XCard shadow="medium">
                <XCard.Header text="Super Admins" description={props.data.superAdmins.length + ' total'}>
                    <XModal fullScreen={false} title="Adding New Super Admin">
                        <XModal.Target>
                            <XButton>Add New</XButton>
                        </XModal.Target>
                        <XModal.Content>
                            <AddSuperAdminForm />
                        </XModal.Content>
                    </XModal>
                    <XModal fullScreen={false} title="Removing Super Admin">
                        <XModal.Target>
                            <XButton>Remove Exising</XButton>
                        </XModal.Target>
                        <XModal.Content>
                            <RemoveSuperAdminForm />
                        </XModal.Content>
                    </XModal>
                </XCard.Header>
                <XCard.Table>
                    <XCard.Table.Header>
                        <XCard.Table.Cell width={100}>
                            First Name
                        </XCard.Table.Cell>
                        <XCard.Table.Cell width={100}>
                            Last Name
                        </XCard.Table.Cell>
                        <XCard.Table.Cell>
                            Email
                        </XCard.Table.Cell>
                    </XCard.Table.Header>
                    <XCard.Table.Body>
                        {props.data.superAdmins.map((v) => (
                            <tr key={v.id}>
                                <XCard.Table.Cell width={100}>{v.firstName}</XCard.Table.Cell>
                                <XCard.Table.Cell width={100}>{v.lastName}</XCard.Table.Cell>
                                <XCard.Table.Cell>{v.email}</XCard.Table.Cell>
                            </tr>
                        ))}
                    </XCard.Table.Body>
                </XCard.Table>

            </XCard>
        </AppContent>
    );
}));