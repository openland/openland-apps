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
            <XHead title="People" />
            <XCard shadow="medium" separators={true}>
                <XCard.Header text="People" description="Place for your all contacts"><XButton>Add</XButton></XCard.Header>
                <XCard.Content>
                    Yay!
                </XCard.Content>
            </XCard>
        </AppContent>
    );
});