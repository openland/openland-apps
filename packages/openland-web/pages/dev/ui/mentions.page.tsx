import '../../../globals';
import * as React from 'react';
import { withApp } from '../../../components/withApp';
import { DevDocsScaffold } from './components/DevDocsScaffold';
import { XVertical } from 'openland-x-layout/XVertical';
import { XContent } from 'openland-x-layout/XContent';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import { XTitle } from 'openland-x/XTitle';
import { MentionsEntry, mentionsData } from 'openland-x/XRichTextInput';

export default withApp('UI Framework - Mentions', 'viewer', (props) => {
    return (
        <DevDocsScaffold title="Mentions">
            <XContent>
                <XVertical>
                    <XTitle>MentionsEntry</XTitle>
                    <XHorizontal>
                        <MentionsEntry mention={mentionsData[0]} />
                    </XHorizontal>
                </XVertical>
            </XContent>
        </DevDocsScaffold>
    );
});