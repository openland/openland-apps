import * as React from 'react';
import { withApp } from '../../../components/App/withApp';
import { XCard } from '../../../components/X/XCard';
import { withBlock, ParcelTileSource, BlockTileSource } from '../../../api/index';
import { AppContent } from '../../../components/App/AppContent';
import { XButton } from '../../../components/X/XButton';
import { convertMapPatch, findCenter } from '../../../utils/map';
import { XArea } from '../../../components/X/XArea';
import { XMapPolygonLayer } from '../../../components/X/XMapPolygonLayer';

export default withApp(withBlock((props) => {
    return (
        <AppContent>
            <XCard shadow="medium" separators={true}>
                <XCard.Header title={'Block #' + props.data.item.title}>
                    <XButton>Edit</XButton>
                </XCard.Header>
                <XCard.PropertyList>
                    {props.data.item.extrasArea &&
                        <XCard.Property title="Area"><XArea area={props.data.item.extrasArea} /></XCard.Property>
                    }
                    {props.data.item.extrasSupervisorDistrict &&
                        <XCard.Property title="Supervisor District">{props.data.item.extrasSupervisorDistrict}</XCard.Property>
                    }
                    {props.data.item.extrasZoning &&
                        <XCard.Property title="Zoning">{props.data.item.extrasZoning.join()}</XCard.Property>
                    }
                </XCard.PropertyList>
            </XCard>

            {props.data.item.parcels.length > 0 && props.data.item.geometry && (
                <XCard shadow="medium" separators={true}>
                    <XCard.Map location={findCenter(convertMapPatch(props.data.item.geometry))}>
                        <ParcelTileSource layer="parcels" minZoom={16} />
                        <BlockTileSource layer="blocks" minZoom={12} />
                        <XMapPolygonLayer
                            source="parcels"
                            layer="parcels"
                            minZoom={16}
                            flyOnClick={true}
                        />
                        <XMapPolygonLayer
                            source="blocks"
                            layer="blocks"
                            minZoom={12}
                            maxZoom={16}
                            flyOnClick={true}
                            selectedId={props.data.item.id}
                            onClick={(v) => props.router.push('/app/blocks/' + v)}
                        />
                    </XCard.Map>
                </XCard>
            )}

            {props.data.item.parcels.length > 0 && (
                <XCard shadow="medium" separators={true}>
                    <XCard.Header>Parcels</XCard.Header>
                    <XCard.Table>
                        <XCard.Table.Header>
                            <XCard.Table.Cell>Lot Id</XCard.Table.Cell>
                            <XCard.Table.Cell>Zoning</XCard.Table.Cell>
                        </XCard.Table.Header>
                        <tbody>
                            {props.data.item.parcels.map((v) => (
                                <tr key={v.id} onClick={() => props.router.push('/app/parcels/' + v.id)}>
                                    <XCard.Table.Cell>{v.title}</XCard.Table.Cell>
                                    <XCard.Table.Cell>{v.extrasZoning ? v.extrasZoning.join() : 'unknown'}</XCard.Table.Cell>
                                </tr>)
                            )}
                        </tbody>
                    </XCard.Table>
                </XCard>
            )}
        </AppContent>
    );
}));