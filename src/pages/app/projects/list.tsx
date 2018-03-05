import * as React from 'react';
import { withApp } from '../../../components/App/withApp';
import { XCard } from '../../../components/X/XCard';
import { withSFBuildingProjects } from '../../../api/index';
import { AppContent } from '../../../components/App/AppContent';
import { XButton } from '../../../components/X/XButton';

export default withApp(withSFBuildingProjects((props) => {
    return (
        <AppContent>
            <XCard shadow="medium">
                <XCard.Header text="Building Projects">
                    <XButton>Add New</XButton>
                </XCard.Header>
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
                            <tr key={v.node.id} onClick={() => props.router.push('/projects/' + v.node.slug)}>
                                <XCard.Table.Cell>{v.node.name}</XCard.Table.Cell>
                                <XCard.Table.Cell>{v.node.proposedUnits!! - v.node.existingUnits!!}</XCard.Table.Cell>
                                <XCard.Table.Cell>{v.node.extrasYearEnd}</XCard.Table.Cell>
                                <XCard.Table.Cell>{v.node.extrasAddress}</XCard.Table.Cell>
                                <XCard.Table.Cell>{v.node.extrasAddressSecondary}</XCard.Table.Cell>
                            </tr>
                        ))}
                    </tbody>
                </XCard.Table>
                <XCard.Footer text={props.data.items.pageInfo.itemsCount + ' items'}>
                    <XButton>Prev</XButton>
                    <XButton>Next</XButton>
                </XCard.Footer>
            </XCard>
        </AppContent>
    );
}));