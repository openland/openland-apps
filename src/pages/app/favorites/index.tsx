import * as React from 'react';
import { XHead } from '../../../components/X/XHead';
import { withApp } from '../../../components/App/withApp';
import { AppContent } from '../../../components/App/AppContent';
import { XCard } from '../../../components/X/XCard';
import { withParcelsFavorites } from '../../../api';
import { XArea } from '../../../components/X/XArea';
import { XMoney } from '../../../components/X/XMoney';

export default withApp(withParcelsFavorites((props) => {
    return (
        <>
            <XHead title={['Statecraft', 'Favorites']} />
            <AppContent>
                <XCard shadow="medium">
                    <XCard.Header text="Favorites" />
                    <XCard.Table>
                        <XCard.Table.Header>
                            <XCard.Table.Cell>Parcel ID</XCard.Table.Cell>
                            <XCard.Table.Cell>Area</XCard.Table.Cell>
                            <XCard.Table.Cell>Supervisor District</XCard.Table.Cell>
                            <XCard.Table.Cell>Land Value</XCard.Table.Cell>
                            <XCard.Table.Cell>Improvement Value</XCard.Table.Cell>
                        </XCard.Table.Header>
                        <tbody>
                            {props.data.items.map((v) => (
                                <tr key={v.id} onClick={() => props.router.push('/app/parcels/' + v.id)}>
                                    <XCard.Table.Cell>{v.title}</XCard.Table.Cell>
                                    <XCard.Table.Cell>{v.extrasArea && <XArea area={v.extrasArea} />}</XCard.Table.Cell>
                                    <XCard.Table.Cell>{v.extrasSupervisorDistrict}</XCard.Table.Cell>
                                    <XCard.Table.Cell>{v.extrasLandValue && <XMoney value={v.extrasLandValue} />}</XCard.Table.Cell>
                                    <XCard.Table.Cell>{v.extrasImprovementValue && <XMoney value={v.extrasImprovementValue} />}</XCard.Table.Cell>
                                </tr>
                            ))}
                        </tbody>
                    </XCard.Table>
                </XCard>
            </AppContent>
        </>
    )
}));