import '../../../globals';
import * as React from 'react';
import { withApp } from '../../../components/withApp';
import { DevDocsScaffold } from '../../../components/DevDocsScaffold';
import { XVertical } from '../../../components/X/XVertical';
import { XContent } from '../../../components/X/XContent';
import { XInput } from 'openland-x/XInput';
import { XHorizontal } from '../../../components/X/XHorizontal';
import { XTitle } from '../../../components/X/XTitle';

export default withApp('UI Framework - Inputs', 'viewer', (props) => {
    return (
        <DevDocsScaffold title="Inputs">
            <XContent>
                <XVertical>
                    <XTitle>Sizes</XTitle>
                    <XHorizontal>
                        <XInput format="large" title="qwe" />
                        <XInput format="medium" />
                        <XInput format="default" />
                        <XInput format="small" />
                    </XHorizontal>
                    <XTitle>With apply button</XTitle>
                    <XVertical>
                        <XInput format="large" title="qwe" applying={true} alignSelf="flex-start" />
                        <XInput format="medium" applying={true} alignSelf="flex-start"  />
                        <XInput format="default" applying={true} alignSelf="flex-start"  />
                        <XInput format="small" applying={true} alignSelf="flex-start"  />
                    </XVertical>
                </XVertical>
            </XContent>
        </DevDocsScaffold>
    );
});