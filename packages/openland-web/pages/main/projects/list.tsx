import '../../../globals';
import * as React from 'react';
import { withApp } from '../../../components/withApp';
import { XCard } from '../../../components/X/XCard';
import { XTable } from '../../../components/X/XTable';
import { withSFBuildingProjects } from '../../../api/';
import { AppContent } from '../../../components/App/AppContent';
import { XButton } from '../../../components/X/XButton';

export default withApp('Projects', 'viewer', withSFBuildingProjects((props) => {
    return (
        <AppContent>
            <XCard shadow="medium">
                <XCard.Header text="Building Projects">
                    <XButton>Add New</XButton>
                </XCard.Header>
                <XTable>
                    <XTable.Header>
                        <XTable.Cell>Name</XTable.Cell>
                        <XTable.Cell>Net Units</XTable.Cell>
                        <XTable.Cell>Year End</XTable.Cell>
                        <XTable.Cell>Address</XTable.Cell>
                        <XTable.Cell>Address 2</XTable.Cell>
                    </XTable.Header>
                    <XTable.Body>
                        {props.data.items.edges.map((v) => (
                            <XTable.Row key={v.node.id} onClick={() => props.router.push('/projects/' + v.node.slug)}>
                                <XTable.Cell>{v.node.name}</XTable.Cell>
                                <XTable.Cell>{v.node.proposedUnits!! - v.node.existingUnits!!}</XTable.Cell>
                                <XTable.Cell>{v.node.extrasYearEnd}</XTable.Cell>
                                <XTable.Cell>{v.node.extrasAddress}</XTable.Cell>
                                <XTable.Cell>{v.node.extrasAddressSecondary}</XTable.Cell>
                            </XTable.Row>
                        ))}
                    </XTable.Body>
                </XTable>
                <XCard.Footer text={props.data.items.pageInfo.itemsCount + ' items'}>
                    <XButton>Prev</XButton>
                    <XButton>Next</XButton>
                </XCard.Footer>
            </XCard>
        </AppContent>
    );
}));