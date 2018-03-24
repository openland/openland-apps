import '../../globals';
import * as React from 'react';
import { withApp } from '../../components/withApp';
import { XCard } from '../../components/X/XCard';
import { AppContent } from '../../components/App/AppContent';

const Page = withApp('test', 'viewer', (props) => {
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
Page.displayName = 'PageRoot';

export default Page;