import * as React from 'react';
import { withApp } from '../../../components/withApp';
import { DevDocsScaffold } from './components/DevDocsScaffold';
import { XContent } from 'openland-x-layout/XContent';
import { XTitle } from 'openland-x/XTitle';
import { XTabs } from 'openland-x/XTabs';
import { XVertical2 } from 'openland-x/XVertical2';

export default withApp('UI Framework - Tabs', 'viewer', props => {
    return (
        <DevDocsScaffold title="Tabs">
            <XContent>
                <XVertical2>
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
                </XVertical2>
            </XContent>
        </DevDocsScaffold>
    );
});
