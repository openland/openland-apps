import * as React from 'react';
import { withApp } from '../../../components/App/withApp';
import { XCard } from '../../../components/X/XCard';
import { withParcel } from '../../../api/index';
import { AppContent } from '../../../components/App/AppContent';
import { XButton } from '../../../components/X/XButton';
import { convertMapPatch, findCenter } from '../../../utils/map';
import { XMap } from '../../../components/X/XMap';

export default withApp(withParcel((props) => {
    return (
        <AppContent>
            <XCard shadow="medium">
                <XCard.Header title={'Parcel #' + props.data.item.title}>
                    <XButton>Edit</XButton>
                </XCard.Header>
                <XCard.PropertyList>
                    <XCard.Property title="Parcel Area">{props.data.item.extrasArea}</XCard.Property>
                    <XCard.Property title="Supervisor District">{props.data.item.extrasSupervisorDistrict}</XCard.Property>
                </XCard.PropertyList>
            </XCard>
            {props.data.item.geometry && (
                <XCard shadow="medium">
                    <XCard.Map location={findCenter(convertMapPatch(props.data.item.geometry))}>
                        <XMap.Overlay
                            id={'some'}
                            records={[{ id: 'parcel', geometry: props.data.item.geometry }]}
                    />
                    </XCard.Map>
                </XCard>
            )}
        </AppContent>
    )
}));