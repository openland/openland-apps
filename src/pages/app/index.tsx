import * as React from 'react';
import { withApp } from '../../components/App/withApp';
import { AppSidebar } from '../../components/App/AppSidebar';
import { AppContent } from '../../components/App/AppContent';
import { XCard } from '../../components/X/XCard';
import { withSFBuildingProjects } from '../../api/index';

export default withApp(withSFBuildingProjects((props) => {
    return (
        <>
        <AppSidebar>
            <AppSidebar.Item title="Projects" />
            <AppSidebar.Item title="Parcels" />
            <AppSidebar.Item title="Zoning" />
            <AppSidebar.Item title="Permits" />
            <AppSidebar.Item title="Entitlements" />
        </AppSidebar>
        <AppContent>
            <XCard shadow="medium">
                <XCard.Table>
                    <XCard.Table.Header>
                        <XCard.Table.Cell>Name</XCard.Table.Cell>
                        <XCard.Table.Cell>Net Units</XCard.Table.Cell>
                        <XCard.Table.Cell>Year End</XCard.Table.Cell>
                        <XCard.Table.Cell>Address</XCard.Table.Cell>
                        <XCard.Table.Cell>Address 2</XCard.Table.Cell>
                    </XCard.Table.Header>
                    <tbody>
                        {props.data.items.edges.map((v) => (
                            <tr key={v.node.id}>
                                <XCard.Table.Cell>{v.node.name}</XCard.Table.Cell>
                                <XCard.Table.Cell>{v.node.proposedUnits!! - v.node.existingUnits!!}</XCard.Table.Cell>
                                <XCard.Table.Cell>{v.node.extrasYearEnd}</XCard.Table.Cell>
                                <XCard.Table.Cell>{v.node.extrasAddress}</XCard.Table.Cell>
                                <XCard.Table.Cell>{v.node.extrasAddressSecondary}</XCard.Table.Cell>
                            </tr>
                        ))}
                    </tbody>
                </XCard.Table>
            </XCard>
        </AppContent>
        </>
    );
}));