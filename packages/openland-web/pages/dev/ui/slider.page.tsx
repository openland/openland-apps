import '../../../globals';
import * as React from 'react';
import { withApp } from '../../../components/withApp';
import { DevDocsScaffold } from './components/DevDocsScaffold';
import { XVertical } from 'openland-x-layout/XVertical';
import { XContent } from 'openland-x-layout/XContent';
import { XTitle } from 'openland-x/XTitle';
import { XSlider, XRange } from 'openland-x/XSlider';

export default withApp('UI Framework - Sliders', 'viewer', (props) => {
    return (
        <DevDocsScaffold title="Sliders">
            <XContent>
                <XVertical>
                    <XTitle>Sliders</XTitle>
                    <XSlider min={0} max={100} />
                    <XTitle>Range</XTitle>
                    <XRange min={0} max={100} />
                </XVertical>
            </XContent>
        </DevDocsScaffold>
    );
});