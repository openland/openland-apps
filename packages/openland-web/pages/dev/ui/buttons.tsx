import '../../../globals';
import * as React from 'react';
import { withApp } from '../../../components/withApp';
import { DevDocsScaffold } from '../../../components/DevDocsScaffold';
import { XButton as XButton2 } from '../../../components/X/XButton';
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
                        <XButton text="default" />
                        <XButton size="small" text="small" />
                        <XButton size="x-small" text="x-small" />
                    </XHorizontal>
                    <XTitle>Styles</XTitle>
                    <XHorizontal>
                        <XButton style="primary" text="primary" />
                        <XButton style="danger" text="danger" />
                        <XButton text="default" />
                        <XButton style="ghost" text="ghost" />
                        <XButton style="flat" text="flat" />
                    </XHorizontal>

                    <XTitle>Loading</XTitle>
                    <XHorizontal>
                        <XButton style="primary" loading={true} text="primary" />
                        <XButton style="danger" loading={true} text="danger" />
                        <XButton loading={true} text="default" />
                        <XButton style="ghost" loading={true} text="ghost" />
                        <XButton style="flat" loading={true} text="flat" />
                    </XHorizontal>

                    <XTitle>Classic</XTitle>
                    <XButton2 alignSelf="flex-start">Default</XButton2>
                    <XButton2 alignSelf="flex-start" style="dark" disabled={true}>Bordered</XButton2>

                    <XButton2 alignSelf="flex-start" style="dark" icon="launch">icon</XButton2>
                    <XButton2 alignSelf="flex-start" icon="close" />

                    <XButton2 alignSelf="flex-start" style="dark" size="large">Large</XButton2>
                    <XButton2 alignSelf="flex-start" style="dark" size="large" bounce={true} disabled={true}>Bounce</XButton2>
                    <XButton2 alignSelf="flex-start" style="important">Important</XButton2>
                    <XButton2 alignSelf="flex-start" loading={true} />
                    <XButton2 alignSelf="flex-start" loading={true} disabled={true}>Loading</XButton2>
                </XVertical>
            </XContent>
        </DevDocsScaffold>
    );
});