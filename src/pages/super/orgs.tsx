import '../../globals';
import * as React from 'react';
import { withApp } from '../../components/withApp';
import { AppContent } from '../../components/App/AppContent';
import { withSuperAccounts } from '../../api';
import { XCard } from '../../components/X/XCard';
import { XButton } from '../../components/X/XButton';

export default withApp('super-admin', withSuperAccounts((props) => {
    return (
        <AppContent>
            <XCard shadow="medium">
                <XCard.Header text="Accounts" description={props.data.superAccounts.length + ' total'} />
                <XCard.Table>
                    <XCard.Table.Header>
                        <XCard.Table.Cell>Title</XCard.Table.Cell>
                        <XCard.Table.Cell>State</XCard.Table.Cell>
                        <XCard.Table.Cell>{}</XCard.Table.Cell>
                    </XCard.Table.Header>
                    <XCard.Table.Body>
                        {props.data.superAccounts.map((v) => (
                            <tr key={v.id}>
                                <XCard.Table.Cell>{v.title}</XCard.Table.Cell>
                                <XCard.Table.Cell>{v.state}</XCard.Table.Cell>
                                <XCard.Table.Cell>
                                    <div>
                                        <XButton path={'/super/orgs/' + v.id}>View</XButton>
                                    </div>
                                </XCard.Table.Cell>
                            </tr>
                        ))}
                    </XCard.Table.Body>
                </XCard.Table>
            </XCard>
        </AppContent>
    );
}));