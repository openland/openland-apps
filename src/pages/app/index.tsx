import '../../globals';
import * as React from 'react';
import { withApp } from '../../components/App/withApp';
import { XCard } from '../../components/X/XCard';
import { AppContent } from '../../components/App/AppContent';

export default withApp((props) => {
    return (
        <AppContent>
            <XCard shadow="medium">
                <XCard.Content>
                    Hello!
                </XCard.Content>
            </XCard>
        </AppContent>
    );
});