import '../../../globals';
import * as React from 'react';
import { withApp } from '../../../components/withApp';
import { DevDocsScaffold } from '../../../components/DevDocsScaffold';
import { XVertical } from '../../../components/X/XVertical';
import { XContent } from '../../../components/X/XContent';
import { XHorizontal } from '../../../components/X/XHorizontal';
import { XTitle } from '../../../components/X/XTitle';
import { XBullet } from 'openland-x/XBullet';

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