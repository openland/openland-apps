import * as React from 'react';
import { withApp } from '../../../components/withApp';
import { DevDocsScaffold } from '../../../components/DevDocsScaffold';
import { XButton } from '../../../components/X/XButton';
import { XVertical } from '../../../components/X/XVertical';

export default withApp('UI Framework - Buttons', 'viewer', (props) => {
    return (
        <DevDocsScaffold title="Buttons">
            <XVertical>
                <XButton alignSelf="flex-start">Default</XButton>
                <XButton alignSelf="flex-start" style="dark" disabled={true}>Bordered</XButton>

                <XButton alignSelf="flex-start" style="dark" icon="launch">icon</XButton>
                <XButton alignSelf="flex-start" icon="close" />

                <XButton alignSelf="flex-start" style="dark" size="large">Large</XButton>
                <XButton alignSelf="flex-start" style="dark" size="large" bounce={true} disabled={true}>Bounce</XButton>
                <XButton alignSelf="flex-start" style="important">Important</XButton>
                <XButton alignSelf="flex-start" loading={true} />
                <XButton alignSelf="flex-start" loading={true} disabled={true}>Loading</XButton>
            </XVertical>
        </DevDocsScaffold>
    );
});