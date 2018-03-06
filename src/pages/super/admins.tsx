import * as React from 'react';
import { withApp } from '../../components/withApp';
import { withSuperAdmins } from '../../api';
import { AppContent } from '../../components/App/AppContent';
import { XCard } from '../../components/X/XCard';
import { XButton } from '../../components/X/XButton';

export default withApp('super-admin', withSuperAdmins((props) => {
    return (
        <AppContent>
            <XCard shadow="medium">
                <XCard.Header text="Super Admins" description={props.data.superAdmins.length + ' total'}>
                    <XButton>Add New</XButton>
                </XCard.Header>
                <XCard.Table>
                    <XCard.Table.Header>
                        <XCard.Table.Cell>
                            First Name
                        </XCard.Table.Cell>
                        <XCard.Table.Cell>
                            Last Name
                        </XCard.Table.Cell>
                    </XCard.Table.Header>
                    <XCard.Table.Body>
                        {props.data.superAdmins.map((v) => (
                            <tr>
                                <XCard.Table.Cell>{v.firstName}</XCard.Table.Cell>
                                <XCard.Table.Cell>{v.lastName}</XCard.Table.Cell>
                            </tr>
                        ))}
                    </XCard.Table.Body>
                </XCard.Table>

            </XCard>
        </AppContent>
    )
}));