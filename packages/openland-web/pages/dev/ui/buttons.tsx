import '../../../globals';
import * as React from 'react';
import { withApp } from '../../../components/withApp';
import { DevDocsScaffold } from '../../../components/DevDocsScaffold';
import { XVertical } from '../../../components/X/XVertical';
import { XContent } from '../../../components/X/XContent';
import { XButton } from 'openland-x/XButton';
import { XHorizontal } from '../../../components/X/XHorizontal';
import { XTitle } from '../../../components/X/XTitle';

export default withApp('UI Framework - Buttons', 'viewer', (props) => {
    return (
        <DevDocsScaffold title="Buttons">
            <XContent>
                <XVertical>
                    <XTitle>Sizes</XTitle>
                    <XHorizontal>
                        <XButton size="x-large" text="x-large" />
                        <XButton size="large" text="large" />
                        <XButton size="medium" text="medium" />
                        <XButton text="default" />
                        <XButton size="small" text="small" />
                    </XHorizontal>
                    <XTitle>Styles</XTitle>
                    <XHorizontal>
                        <XButton style="primary" text="primary" />
                        <XButton style="danger" text="danger" />
                        <XButton text="default" />
                        <XButton style="ghost" text="ghost" />
                        <XButton style="flat" text="flat" />
                    </XHorizontal>
                    <XTitle>Icons</XTitle>
                    <XHorizontal>
                        <XButton size="x-large" text="x-large" icon="star" />
                        <XButton size="large" text="large" icon="star" />
                        <XButton size="medium" text="medium" icon="star" />
                        <XButton text="default" icon="star" />
                        <XButton size="small" text="small" icon="star" />
                    </XHorizontal>
                    <XTitle>Loading</XTitle>
                    <XHorizontal>
                        <XButton style="primary" loading={true} text="primary" />
                        <XButton style="danger" loading={true} text="danger" />
                        <XButton loading={true} text="default" />
                        <XButton style="ghost" loading={true} text="ghost" />
                        <XButton style="flat" loading={true} text="flat" />
                    </XHorizontal>
                    <XTitle>Disabled</XTitle>
                    <XHorizontal>
                        <XButton style="primary" text="primary" disabled={true} />
                        <XButton style="danger" text="danger" disabled={true} />
                        <XButton text="default" disabled={true} />
                        <XButton style="ghost" text="ghost" disabled={true} />
                        <XButton style="flat" text="flat" disabled={true} />
                    </XHorizontal>
                </XVertical>
            </XContent>
        </DevDocsScaffold>
    );
});