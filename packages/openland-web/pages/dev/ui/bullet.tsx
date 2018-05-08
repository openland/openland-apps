import '../../../globals';
import * as React from 'react';
import { withApp } from '../../../components/withApp';
import { DevDocsScaffold } from '../../../components/DevDocsScaffold';
import { XVertical } from 'openland-x/XVertical';
import { XContent } from 'openland-x/XContent';
import { XHorizontal } from 'openland-x/XHorizontal';
import { XBullet } from 'openland-x/XBullet';
import { XTitle } from 'openland-x/XTitle';

export default withApp('UI Framework - Bullets', 'viewer', (props) => {
    return (
        <DevDocsScaffold title="Bullets">
            <XContent>
                <XVertical>
                    <XTitle>Colors</XTitle>
                    <XHorizontal>
                        <XBullet>default</XBullet>
                        <XBullet color="red">red</XBullet>
                        <XBullet color="green">green</XBullet>
                        <XBullet color="yellow">yellow</XBullet>
                    </XHorizontal>
                </XVertical>
            </XContent>
        </DevDocsScaffold>
    );
});