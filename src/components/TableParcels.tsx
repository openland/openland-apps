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
                <XCard.Table.Cell>Address</XCard.Table.Cell>
                <XCard.Table.Cell justifyContent="flex-end">Area</XCard.Table.Cell>
                <XCard.Table.Cell justifyContent="flex-end">Land Value</XCard.Table.Cell>
                <XCard.Table.Cell justifyContent="flex-end">Improvement Value</XCard.Table.Cell>
                <XCard.Table.Cell>Zoning</XCard.Table.Cell>
                <XCard.Table.Cell justifyContent="flex-end">Favorites</XCard.Table.Cell>
            </XCard.Table.Header>
            <tbody>
                {props.items.map((v) => (
                    <tr key={v.id} onClick={() => props.router.push('/parcels/' + v.id)}>
                        <XCard.Table.Cell>{v.title}</XCard.Table.Cell>
                        <XCard.Table.Cell>{v.addresses.length > 0 && `${v.addresses[0].streetNumber} ${v.addresses[0].streetName} ${v.addresses[0].streetNameSuffix}`}</XCard.Table.Cell>
                        <XCard.Table.Cell justifyContent="flex-end">{v.extrasArea && <XArea area={v.extrasArea} />}</XCard.Table.Cell>
                        <XCard.Table.Cell justifyContent="flex-end">{v.extrasLandValue && <XMoney value={v.extrasLandValue} />}</XCard.Table.Cell>
                        <XCard.Table.Cell justifyContent="flex-end">{v.extrasImprovementValue && <XMoney value={v.extrasImprovementValue} />}</XCard.Table.Cell>
                        <XCard.Table.Cell>{v.extrasZoning && v.extrasZoning.join()}</XCard.Table.Cell>
                        <XCard.Table.Cell justifyContent="flex-end">
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