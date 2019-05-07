import * as React from 'react';
import { withApp } from '../../../components/withApp';
import { DevDocsScaffold } from './components/DevDocsScaffold';
import { XContent } from 'openland-x-layout/XContent';
import { XVertical2 } from 'openland-x/XVertical2';
import { XTextArea } from 'openland-x/XTextArea';
import { XTitle } from 'openland-x/XTitle';
import { MessageSpanInput } from 'openland-api/Types';
import { findSpans } from 'openland-y-utils/findSpans';

export default withApp('UI Framework - Spans parsing', 'viewer', props => {
    const [ spans, setSpans ] = React.useState<MessageSpanInput[]>([]);

    return (
        <DevDocsScaffold title="Spans parsing">
            <XContent>
                <XVertical2>
                    <XTextArea onChange={(text) => setSpans(findSpans(text))} />

                    <XTitle>Spans:</XTitle>
                    {JSON.stringify(spans)}
                </XVertical2>
            </XContent>
        </DevDocsScaffold>
    );
});
