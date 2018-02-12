import * as React from 'react';
import { withApp } from '../../../components/App/withApp';
import { XCard } from '../../../components/X/XCard';
import { withBlock } from '../../../api/index';
import { AppContent } from '../../../components/App/AppContent';
import { XButton } from '../../../components/X/XButton';
import { convertMapPatch, findCenter } from '../../../utils/map';

export default withApp(withBlock((props) => {
    return (
        <AppContent>
            <XCard shadow="medium">
                <XCard.Header title={'Block #' + props.data.item.title}>
                    <XButton>Edit</XButton>
                </XCard.Header>
                <XCard.PropertyList>
                    <XCard.Property title="Block Area">{props.data.item.extrasArea}</XCard.Property>
                    <XCard.Property title="Supervisor District">{props.data.item.extrasSupervisorDistrict}</XCard.Property>
                </XCard.PropertyList>
            </XCard>
            {props.data.item.geometry && (
                <XCard shadow="medium">
                    <XCard.Map location={findCenter(convertMapPatch(props.data.item.geometry))} />
                </XCard>
            )}
        </AppContent>
    );
}));