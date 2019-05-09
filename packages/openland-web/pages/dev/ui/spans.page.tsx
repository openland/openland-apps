import * as React from 'react';
import { withApp } from '../../../components/withApp';
import { DevDocsScaffold } from './components/DevDocsScaffold';
import { XContent } from 'openland-x-layout/XContent';
import { XVertical2 } from 'openland-x/XVertical2';
import { XTextArea } from 'openland-x/XTextArea';
import { XTitle } from 'openland-x/XTitle';
import { FullMessage_GeneralMessage_spans } from 'openland-api/Types';
import { preprocessSpans } from 'openland-y-utils/SpansProcessor';
import { prepareLegacySpans } from 'openland-y-utils/findSpans';
import { Span } from 'openland-y-utils/spans/Span';
import { renderSpans } from 'openland-y-utils/spans/renderSpans';
import { parseSpans } from 'openland-y-utils/spans/parseSpans';
import { processSpans } from 'openland-y-utils/spans/proccessSpans';

const SpanView = (props: { span: Span, children?: any }) => {
    const { span, children } = props;

    if (span.type === 'text') {
        return <span>{span.text}</span>
    } else if (span.type === 'new_line') {
        return <br />
    } else {
        return (
            <span style={{ background: 'red' }}>{children}</span>
        );
    }
}

export default withApp('UI Framework - Spans', 'viewer', props => {
    const [ data, setData ] = React.useState<{ text: string, spans: FullMessage_GeneralMessage_spans[]}>({ text: '', spans: [] });

    return (
        <DevDocsScaffold title="Spans">
            <XContent>
                <XVertical2>
                    <div style={{ background: 'red', fontSize: 20, color: 'white', padding: 20 }}>
                        TODO:
                        <br />
                        - right offset for raw spans with new lines
                    </div>
                    <br />
                    <div>text1 *_italic_ boldtext :loud _italic_:* text2 *_italic_ boldtext :loud _italic_:* text3</div>
                    <br />

                    <XTextArea onChange={(value) => { setData({ text: value, spans: prepareLegacySpans(parseSpans(value)) }) }} />

                    <div>{renderSpans(SpanView, processSpans(data.text, data.spans))}</div>

                    <XTitle>Parsed:</XTitle>
                    {data.spans.map((s, i) => <div key={'parsed-span-' + i}>{JSON.stringify(s)}</div>)}

                    <XTitle>Processed (Legacy):</XTitle>
                    {preprocessSpans(data.text, data.spans).map((s, i) => <div key={'processed-span-' + i}>{JSON.stringify(s)}</div>)}

                    <XTitle>Processed (with childs):</XTitle>
                    {processSpans(data.text, data.spans).map((s, i) => <div key={'processed-span-' + i}>{JSON.stringify(s)}</div>)}
                </XVertical2>
            </XContent>
        </DevDocsScaffold>
    );
});
