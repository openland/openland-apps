import * as React from 'react';
import { withApp } from '../../../components/App/withApp';
import { XCard } from '../../../components/X/XCard';
import { withParcels } from '../../../api/index';
import { AppContent } from '../../../components/App/AppContent';
import { XButton } from '../../../components/X/XButton';

export default withApp(withParcels((props) => {
    return (
        <AppContent>
            <XCard shadow="medium" separators={true}>
                <XCard.Header title="Parcels">
                    <XButton>Add New</XButton>
                </XCard.Header>
                <XCard.Table>
                    <XCard.Table.Header>
                        <XCard.Table.Cell>Parcel ID</XCard.Table.Cell>
                        <XCard.Table.Cell>Area</XCard.Table.Cell>
                        <XCard.Table.Cell>Supervisor District</XCard.Table.Cell>
                    </XCard.Table.Header>
                    <tbody>
                        {props.data.items.edges.map((v) => (
                            <tr key={v.node.id} onClick={() => props.router.push('/app/parcels/' + v.node.id)}>
                                <XCard.Table.Cell>{v.node.title}</XCard.Table.Cell>
                                <XCard.Table.Cell>{v.node.extrasArea}</XCard.Table.Cell>
                                <XCard.Table.Cell>{v.node.extrasSupervisorDistrict}</XCard.Table.Cell>
                            </tr>
                        ))}
                    </tbody>
                </XCard.Table>
                <XCard.Footer text={props.data.items.pageInfo.itemsCount + ' items'}>
                    <XButton query={{ field: 'page', value: (props.data.items.pageInfo.currentPage - 1).toString() }}>Prev</XButton>
                    <XButton query={{ field: 'page', value: (props.data.items.pageInfo.currentPage + 1).toString() }}>Next</XButton>
                </XCard.Footer>
            </XCard>
        </AppContent>
    );
}));