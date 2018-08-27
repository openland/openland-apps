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
                        <XTag color="primary" text="primary" />
                        <XTag text="default" />
                        <XTag color="gray" text="gray" />
                        <XTag color="green" text="green" />
                        <XTag color="ghost" text="gost" />
                    </XHorizontal>
                    <XHorizontal>
                        <XTag rounded={true} color="primary" text="primary" />
                        <XTag rounded={true} text="default" />
                        <XTag rounded={true} color="gray" text="gray" />
                        <XTag rounded={true} color="green" text="green" />
                        <XTag rounded={true} color="ghost" text="gost" />
                    </XHorizontal>
                    <XTitle>With Icon</XTitle>
                    <XHorizontal>
                        <XTag size="large" text="Automotive" iconLeft="star" />
                        <XTag text="primary" iconLeft="star" />
                        <XTag size="large" text="Automotive" icon="close" />
                        <XTag text="primary" icon="close" />
                    </XHorizontal>
                    <XHorizontal>
                        <XTag rounded={true} size="large" text="Automotive" iconLeft="star" />
                        <XTag rounded={true} text="primary" iconLeft="star" />
                        <XTag rounded={true} size="large" text="Automotive" icon="close" />
                        <XTag rounded={true} text="primary" icon="close" />
                    </XHorizontal>
                </XVertical>
            </XContent>
        </DevDocsScaffold>
    );
});