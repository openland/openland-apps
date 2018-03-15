import '../../../globals';
import * as React from 'react';
import { XHead } from '../../../components/X/XHead';
import { withApp } from '../../../components/withApp';
import { XCard } from '../../../components/X/XCard';
import { XButton } from '../../../components/X/XButton';
import { AppContent } from '../../../components/App/AppContent';

export default withApp('viewer', () => {
    return (
        <AppContent>
            <XHead title="Portfolio" />
            <XCard shadow="medium" separators={true}>
                <XCard.Header text="Portfolio"><XButton>Add</XButton></XCard.Header>
                <XCard.Content>
                    Yay!
                </XCard.Content>
            </XCard>
        </AppContent>
    );
});