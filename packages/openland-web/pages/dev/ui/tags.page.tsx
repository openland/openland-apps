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
                    <XHorizontal>
                        <XTag rounded={true} size="large" text="large" />
                        <XTag rounded={true} text="default" />
                    </XHorizontal>
                    <XTitle>Colors</XTitle>
                    <XHorizontal>
                        <XTag text="default" />
                        <XTag style="primary" text="primary" />
                        <XTag style="green" text="green" />
                        <XTag style="ghost" text="ghost" />
                    </XHorizontal>
                    <XHorizontal>
                        <XTag rounded={true} text="default" />
                        <XTag rounded={true} style="primary" text="primary" />
                        <XTag rounded={true} style="green" text="green" />
                        <XTag rounded={true} style="ghost" text="ghost" />
                    </XHorizontal>
                    <XTitle>With Icon</XTitle>
                    <XHorizontal>
                        <XTag size="large" text="Automotive" iconLeft="star" />
                        <XTag style="primary" text="primary" iconLeft="star" />
                        <XTag size="large" text="Automotive" icon="close" />
                        <XTag style="primary" text="primary" icon="close" />
                    </XHorizontal>
                    <XHorizontal>
                        <XTag rounded={true} size="large" text="Automotive" iconLeft="star" />
                        <XTag rounded={true} style="primary" text="primary" iconLeft="star" />
                        <XTag rounded={true} size="large" text="Automotive" icon="x-close" />
                        <XTag rounded={true} style="primary" text="primary" icon="x-close" />
                    </XHorizontal>
                </XVertical>
            </XContent>
        </DevDocsScaffold>
    );
});