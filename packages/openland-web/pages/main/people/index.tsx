import '../../../globals';
import * as React from 'react';
import { XHead } from '../../../components/X/XHead';
import { withApp } from '../../../components/withApp';
import { XCard } from '../../../components/X/XCard';
import { XButton } from '../../../components/X/XButton';
import { AppContent } from '../../../components/App/AppContent';
import { XHeader } from '../../../components/X/XHeader';

export default withApp('People', 'viewer', () => {
    return (
        <>
            <XHead title="People" />
            <AppContent>
                <XCard shadow="medium" separators={true}>
                    <XHeader text="People" description="Place for your all contacts"><XButton>Add</XButton></XHeader>
                    <XCard.Content>
                        Yay!
                </XCard.Content>
                </XCard>
            </AppContent>
        </>
    );
});