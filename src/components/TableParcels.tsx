import * as React from 'react';
import * as Types from '../api/Types';
import { XButton } from './X/XButton';
import { XCard } from './X/XCard';
import { XArea } from './X/XArea';
import { XMoney } from './X/XMoney';
import { withRouter } from '../utils/withRouter';

export const TableParcels = withRouter<{ items: Types.ParcelShortFragment[] }>((props) => {
    return (
        <XCard.Table>
            <XCard.Table.Header>
                <XCard.Table.Cell>Parcel ID</XCard.Table.Cell>
                <XCard.Table.Cell>Area</XCard.Table.Cell>
                <XCard.Table.Cell>Supervisor District</XCard.Table.Cell>
                <XCard.Table.Cell>Land Value</XCard.Table.Cell>
                <XCard.Table.Cell>Improvement Value</XCard.Table.Cell>
                <XCard.Table.Cell>Zoning</XCard.Table.Cell>
                <XCard.Table.Cell>Favorites</XCard.Table.Cell>
            </XCard.Table.Header>
            <tbody>
                {props.items.map((v) => (
                    <tr key={v.id} onClick={() => props.router.push('/app/parcels/' + v.id)}>
                        <XCard.Table.Cell>{v.title}</XCard.Table.Cell>
                        <XCard.Table.Cell>{v.extrasArea && <XArea area={v.extrasArea} />}</XCard.Table.Cell>
                        <XCard.Table.Cell>{v.extrasSupervisorDistrict}</XCard.Table.Cell>
                        <XCard.Table.Cell>{v.extrasLandValue && <XMoney value={v.extrasLandValue} />}</XCard.Table.Cell>
                        <XCard.Table.Cell>{v.extrasImprovementValue && <XMoney value={v.extrasImprovementValue} />}</XCard.Table.Cell>
                        <XCard.Table.Cell>{v.extrasZoning && v.extrasZoning.join()}</XCard.Table.Cell>
                        <XCard.Table.Cell>
                            <XButton
                                size="large"
                                borderless={true}
                                icon={v.likes.liked ? 'favorite' : 'favorite_border'}
                            />
                        </XCard.Table.Cell>
                    </tr>
                ))}
            </tbody>
        </XCard.Table>
    )
});