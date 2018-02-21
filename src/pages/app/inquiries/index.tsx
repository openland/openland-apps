import * as React from 'react';
import { XHead } from '../../../components/X/XHead';
import { withApp } from '../../../components/App/withApp';
import { AppContent } from '../../../components/App/AppContent';
import { XCard } from '../../../components/X/XCard';

export default withApp((props) => {
    return (
        <>
            <AppContent>
                <XHead title={['Statecraft', 'Search Inquiries']} />
                <XCard shadow="medium">
                    <XCard.Content>
                        Hey here!
                    </XCard.Content>
                </XCard>
            </AppContent>
        </>
    )
});