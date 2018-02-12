import * as React from 'react';
import { withApp } from '../../../components/App/withApp';
import { XCard } from '../../../components/X/XCard';
import { withBlock } from '../../../api/index';
import { AppContent } from '../../../components/App/AppContent';
import { XButton } from '../../../components/X/XButton';

export default withApp(withBlock((props) => {
    return (
        <AppContent>
            <XCard shadow="medium">
                <XCard.Header title="Blocks">
                    <XButton>Add New</XButton>
                </XCard.Header>
                <XCard.PropertyList>
                    <XCard.Property title="Block Area">{props.data.item.extrasArea}</XCard.Property>
                    <XCard.Property title="Supervisor District">{props.data.item.extrasSupervisorDistrict}</XCard.Property>
                </XCard.PropertyList>
            </XCard>
        </AppContent>
    );
}));