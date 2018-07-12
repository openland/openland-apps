import '../../../globals';
import * as React from 'react';
import { withApp } from '../../../components/withApp';
import { DevDocsScaffold } from './components/DevDocsScaffold';
import { XVertical } from 'openland-x-layout/XVertical';
import { XContent } from 'openland-x-layout/XContent';
import { XTag } from 'openland-x/XTag';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import { XTitle } from 'openland-x/XTitle';

export default withApp('UI Framework - Tags', 'viewer', (props) => {
    return (
        <DevDocsScaffold title="Tags">
            <XContent>
                <XVertical>
                    <XTitle>Sizes</XTitle>
                    <XHorizontal>
                        <XTag size="large" text="large" />
                        <XTag text="default" />
                    </XHorizontal>
                    <XTitle>Colors</XTitle>
                    <XHorizontal>
                        <XTag color="primary" text="primary" />
                        <XTag text="default" />
                    </XHorizontal>
                    <XTitle>With Icon</XTitle>
                    <XHorizontal>
                        <XTag size="large" text="Automotive" icon="close" />
                        <XTag text="primary" icon="close" />
                    </XHorizontal>
                </XVertical>
            </XContent>
        </DevDocsScaffold>
    );
});