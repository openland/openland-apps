import '../../../globals';
import * as React from 'react';
import { withApp } from '../../../components/withApp';
import { DevDocsScaffold } from './components/DevDocsScaffold';
import { XContent } from 'openland-x-layout/XContent';

export default withApp('UI Framework - Subscriptions', 'viewer', (props) => {
    return (
        <DevDocsScaffold title="Subscriptions">
            <XContent>
                {/* <XVertical>
                    <XTitle>Tabs</XTitle>
                    <XTabs>
                        <XTabs.Item query={{ field: 'tab' }}>Tab 1</XTabs.Item>
                        <XTabs.Item query={{ field: 'tab', value: '2' }}>Tab 2</XTabs.Item>
                        <XTabs.Item query={{ field: 'tab', value: '3' }}>Tab 3</XTabs.Item>
                    </XTabs>
                    <XTitle>Inline</XTitle>
                    <XTabs inline={true}>
                        <XTabs.Item query={{ field: 'tab' }}>Tab 1</XTabs.Item>
                        <XTabs.Item query={{ field: 'tab', value: '2' }}>Tab 2</XTabs.Item>
                        <XTabs.Item query={{ field: 'tab', value: '3' }}>Tab 3</XTabs.Item>
                    </XTabs>
                </XVertical> */}
            </XContent>
        </DevDocsScaffold>
    );
});