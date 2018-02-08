import * as React from 'react';
import { withApp } from '../../../components/App/withApp';
import { XCard } from '../../../components/X/XCard';
import { withSFBuildingProject } from '../../../api/index';
import { XTitle } from '../../../components/X/XTitle';

export default withApp(withSFBuildingProject((props) => {
    return (
        <>
        <XCard shadow="medium">
            <XTitle>{props.data.project.name}</XTitle>
            <XCard.Content>
                {props.data.project.proposedUnits}
            </XCard.Content>
            {/* <XCard.Table>
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
            </XCard.Table> */}
        </XCard>
        </>
    );
}));