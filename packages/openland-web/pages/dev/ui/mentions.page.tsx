import '../../../globals';
import * as React from 'react';
import { withApp } from '../../../components/withApp';
import { DevDocsScaffold } from './components/DevDocsScaffold';
import { XVertical } from 'openland-x-layout/XVertical';
import { XContent } from 'openland-x-layout/XContent';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import { XBullet } from 'openland-x/XBullet';
import { XTitle } from 'openland-x/XTitle';

export default withApp('UI Framework - Mentions', 'viewer', (props) => {
    return (
        <DevDocsScaffold title="Mentions">
            <XContent>
                <XVertical>
                    <XTitle>Mentions</XTitle>
                    <XHorizontal>
                        <XBullet>default 123</XBullet>
                    </XHorizontal>
                </XVertical>
            </XContent>
        </DevDocsScaffold>
    );
});