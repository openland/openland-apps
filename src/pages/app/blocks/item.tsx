import * as React from 'react';
import { withApp } from '../../../components/App/withApp';
import { XCard } from '../../../components/X/XCard';
import { withBlock } from '../../../api/index';
import { AppContent } from '../../../components/App/AppContent';
import { XButton } from '../../../components/X/XButton';
import { convertMapPatch, findCenter } from '../../../utils/map';
import { XMap } from '../../../components/X/XMap';
import { XArea } from '../../../components/X/XArea';

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
                </XCard.PropertyList>
            </XCard>
            {props.data.item.parcels.length === 0 && props.data.item.geometry && (
                <XCard shadow="medium" separators={true}>
                    <XCard.Map location={findCenter(convertMapPatch(props.data.item.geometry))}>
                        <XMap.Overlay id={'some'} records={[{ id: props.data.item.id, geometry: props.data.item.geometry }]} />
                    </XCard.Map>
                </XCard>
            )}

            {props.data.item.parcels.length > 0 && props.data.item.geometry && (
                <XCard shadow="medium" separators={true}>
                    <XCard.Map location={findCenter(convertMapPatch(props.data.item.geometry))}>
                        <XMap.Overlay
                            id={'some'}
                            records={props.data.item.parcels.filter((v) => v.geometry).map((v) => ({ id: v.id, geometry: v.geometry!! }))}
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
                        </XCard.Table.Header>
                        <tbody>
                            {props.data.item.parcels.map((v) => (
                                <tr key={v.id} onClick={() => props.router.push('/app/parcels/' + v.id)}>
                                    <XCard.Table.Cell>{v.title}</XCard.Table.Cell>
                                </tr>)
                            )}
                        </tbody>
                    </XCard.Table>
                </XCard>
            )}
        </AppContent>
    );
}));