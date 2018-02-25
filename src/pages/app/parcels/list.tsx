import * as React from 'react';
import { withApp } from '../../../components/App/withApp';
import { XCard } from '../../../components/X/XCard';
import { withParcels } from '../../../api/index';
import { AppContent } from '../../../components/App/AppContent';
import { XButton } from '../../../components/X/XButton';
import { XArea } from '../../../components/X/XArea';
import { XMoney } from '../../../components/X/XMoney';
import { XHead } from '../../../components/X/XHead';
import { AppFilters } from '../../../components/App/AppFilters';

export default withApp(withParcels((props) => {
    return (
        <>
            <XHead title={['Statecraft', 'Database']} />
            <AppContent>
                <XCard shadow="medium" separators={true}>
                    <XCard.Header text={props.data.items.pageInfo.itemsCount + ' parcels found'} description="San Francisco">
                        <AppFilters isActive={true} onChange={(v) => props.router.pushQuery('query', v ? JSON.stringify(v) : undefined)} />
                    </XCard.Header>
                    <XCard.Loader loading={props.data.loading || false}>
                        <XCard.Table>
                            <XCard.Table.Header>
                                <XCard.Table.Cell>Parcel ID</XCard.Table.Cell>
                                <XCard.Table.Cell>Area</XCard.Table.Cell>
                                <XCard.Table.Cell>Supervisor District</XCard.Table.Cell>
                                <XCard.Table.Cell>Land Value</XCard.Table.Cell>
                                <XCard.Table.Cell>Improvement Value</XCard.Table.Cell>
                            </XCard.Table.Header>
                            <tbody>
                                {props.data.items.edges.map((v) => (
                                    <tr key={v.node.id} onClick={() => props.router.push('/app/parcels/' + v.node.id)}>
                                        <XCard.Table.Cell>{v.node.title}</XCard.Table.Cell>
                                        <XCard.Table.Cell>{v.node.extrasArea && <XArea area={v.node.extrasArea} />}</XCard.Table.Cell>
                                        <XCard.Table.Cell>{v.node.extrasSupervisorDistrict}</XCard.Table.Cell>
                                        <XCard.Table.Cell>{v.node.extrasLandValue && <XMoney value={v.node.extrasLandValue} />}</XCard.Table.Cell>
                                        <XCard.Table.Cell>{v.node.extrasImprovementValue && <XMoney value={v.node.extrasImprovementValue} />}</XCard.Table.Cell>
                                    </tr>
                                ))}
                            </tbody>
                        </XCard.Table>
                    </XCard.Loader>
                    <XCard.Footer text={props.data.items.pageInfo.itemsCount + ' items'}>
                        {props.data.items.pageInfo.currentPage > 1 && (
                            <XButton query={{ field: 'page', value: (props.data.items.pageInfo.currentPage - 1).toString() }}>Prev</XButton>
                        )}
                        {(props.data.items.pageInfo.currentPage < props.data.items.pageInfo.pagesCount - 1) && (
                            <XButton query={{ field: 'page', value: (props.data.items.pageInfo.currentPage + 1).toString() }}>Next</XButton>
                        )}
                    </XCard.Footer>
                </XCard>
            </AppContent>
        </>
    );
}));