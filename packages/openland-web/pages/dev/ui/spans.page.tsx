import * as React from 'react';
import { withApp } from '../../../components/withApp';
import { DevDocsScaffold } from './components/DevDocsScaffold';
import { XContent } from 'openland-x-layout/XContent';
import { XVertical2 } from 'openland-x/XVertical2';
import { XTextArea } from 'openland-x/XTextArea';
import { XTitle } from 'openland-x/XTitle';
import { FullMessage_GeneralMessage_spans } from 'openland-api/Types';
import { prepareLegacySpans, findSpans } from 'openland-y-utils/findSpans';
import { processSpans } from 'openland-y-utils/spans/processSpans';
import { SpannedView } from 'openland-web/components/messenger/message/content/SpannedView';

export default withApp('UI Framework - Spans', 'viewer', props => {
    const [ data, setData ] = React.useState<{ text: string, spans: FullMessage_GeneralMessage_spans[]}>({ text: '', spans: [] });

    return (
        <DevDocsScaffold title="Spans">
            <XContent>
                <XVertical2>
                    <XTextArea onChange={(value) => { setData({ text: value, spans: prepareLegacySpans(findSpans(value)) }) }} />

                    <SpannedView spans={processSpans(data.text, data.spans)} />

                    <XTitle>Parsed:</XTitle>
                    {data.spans.map((s, i) => <div key={'parsed-span-' + i}>{JSON.stringify(s)}</div>)}
                </XVertical2>
            </XContent>
        </DevDocsScaffold>
    );
});
