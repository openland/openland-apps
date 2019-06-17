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
import { Span } from 'openland-y-utils/spans/Span';
import { css } from 'linaria';

const SpanRenderClass = css`
    display: inline;
    white-space: pre-wrap;
    word-wrap: break-word;
    max-width: 100%;
    font-size: 14px;
    line-height: 22px;
    letter-spacing: 0;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.8);
`;

export default withApp('UI Framework - Spans', 'viewer', props => {
    const [text, setText] = React.useState<string>('');
    const [spans, setSpans] = React.useState<FullMessage_GeneralMessage_spans[]>([]);
    const [processed, setProcessed] = React.useState<Span[]>([]);

    React.useEffect(
        () => {
            setProcessed(processSpans(text, spans));
        },
        [text, spans],
    );

    return (
        <DevDocsScaffold title="Spans">
            <XContent>
                <XVertical2>
                    <XTextArea
                        onChange={value => {
                            setText(value);
                            setSpans(prepareLegacySpans(findSpans(value)));
                        }}
                    />

                    <div className={SpanRenderClass}>
                        <SpannedView spans={processed} />
                    </div>

                    <XTitle>Parsed:</XTitle>
                    {spans.map((s, i) => (
                        <div key={'parsed-span-' + i}>{JSON.stringify(s)}</div>
                    ))}
                </XVertical2>
            </XContent>
        </DevDocsScaffold>
    );
});
