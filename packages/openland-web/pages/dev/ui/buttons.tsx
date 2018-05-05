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
                        <XButton size="x-large">x-large</XButton>
                        <XButton size="large">large</XButton>
                        <XButton>default</XButton>
                        <XButton size="small">small</XButton>
                        <XButton size="x-small">x-small</XButton>
                    </XHorizontal>
                    <XTitle>Styles</XTitle>
                    <XHorizontal>
                        <XButton style="primary">primary</XButton>
                        <XButton style="danger">danger</XButton>
                        <XButton>default</XButton>
                        <XButton style="ghost">ghost</XButton>
                        <XButton style="flat">flat</XButton>
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