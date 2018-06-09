import '../../../globals';
import * as React from 'react';
import { withApp } from '../../../components/withApp';
import { DevDocsScaffold } from './components/DevDocsScaffold';
import { XVertical } from 'openland-x-layout/XVertical';
import { XContent } from 'openland-x-layout/XContent';
import { XStore } from 'openland-x-store/XStore';
import { XInput } from 'openland-x/XInput';
import { XTitle } from 'openland-x/XTitle';
import { XTextArea } from 'openland-x/XTextArea';
export default withApp('UI Framework - Store', 'viewer', (props) => {
    return (
        <DevDocsScaffold title="Store">
            <XContent>
                <XVertical>
                    <XStore onChanged={(data) => console.warn(data)}>
                        <XVertical>
                            <XTitle>Simple</XTitle>
                            <XInput valueStoreKey="stage" />
                            <XInput valueStoreKey="stage" />
                            <XTextArea valueStoreKey="stage"/>
                            <XTitle>Invalid</XTitle>
                            <XInput invalidStoreKey="stage" />
                        </XVertical>
                    </XStore>
                </XVertical>
            </XContent>
        </DevDocsScaffold>
    );
});