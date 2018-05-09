import '../../../globals';
import * as React from 'react';
import { withApp } from '../../../components/withApp';
import { DevDocsScaffold } from './components/DevDocsScaffold';
import { XVertical } from 'openland-x-layout/XVertical';
import { XContent } from 'openland-x-layout/XContent';
import { XTitle } from 'openland-x/XTitle';
import { XSwitcher } from 'openland-x/XSwitcher';

export default withApp('UI Framework - Tabs', 'viewer', (props) => {
    return (
        <DevDocsScaffold title="Tabs">
            <XContent>
                <XVertical>
                    <XTitle>Switchers</XTitle>
                    <XSwitcher>
                        <XSwitcher.Item query={{ field: 'tab' }}>Tab 1</XSwitcher.Item>
                        <XSwitcher.Item query={{ field: 'tab', value: '2' }} count={10}>Tab 2</XSwitcher.Item>
                        <XSwitcher.Item query={{ field: 'tab', value: '3' }}>Tab 3</XSwitcher.Item>
                    </XSwitcher>
                    <XTitle>Flat Style</XTitle>
                    <XSwitcher flatStyle={true}>
                        <XSwitcher.Item query={{ field: 'tab' }}>Tab 1</XSwitcher.Item>
                        <XSwitcher.Item query={{ field: 'tab', value: '2' }} count={10}>Tab 2</XSwitcher.Item>
                        <XSwitcher.Item query={{ field: 'tab', value: '3' }}>Tab 3</XSwitcher.Item>
                    </XSwitcher>
                </XVertical>
            </XContent>
        </DevDocsScaffold>
    );
});