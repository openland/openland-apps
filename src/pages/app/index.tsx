import * as React from 'react';
import { withApp } from '../../components/App/withApp';
import { AppSidebar } from '../../components/App/AppSidebar';
import { AppContent } from '../../components/App/AppContent';
import { XCard } from '../../components/X/XCard';

export default withApp((props) => {
    return (
        <>
        <AppSidebar>
            <AppSidebar.Item title="Projects" />
            <AppSidebar.Item title="Parcels" />
            <AppSidebar.Item title="Zoning" />
            <AppSidebar.Item title="Permits" />
            <AppSidebar.Item title="Entitlements" />
        </AppSidebar>
        <AppContent>
            <XCard shadow="medium">
                <XCard.Content>
                    Hello!
                </XCard.Content>
            </XCard>
            <XCard shadow="medium">
                <XCard.Content>
                    Hello!
                </XCard.Content>
            </XCard>
        </AppContent>
        </>
    );
});