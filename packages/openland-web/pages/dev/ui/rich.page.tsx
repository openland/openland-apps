import * as React from 'react';
import { withApp } from '../../../components/withApp';
import { DevDocsScaffold } from './components/DevDocsScaffold';
import { XContent } from 'openland-x-layout/XContent';
import { XVertical } from 'openland-x-layout/XVertical';
import { XTitle } from 'openland-x/XTitle';
import { XRichTextInput2 } from 'openland-x/XRichTextInput2';
import { XView } from 'react-mental';
import { XButton } from 'openland-x/XButton';

export default withApp('UI Framework - Rich Input', 'viewer', props => {
    let [currentWord, setCurrentWord] = React.useState<string | undefined>(undefined);
    let ref = React.useRef<XRichTextInput2>(null);
    return (
        <DevDocsScaffold title="Rich Input">
            <XContent>
                <XVertical>
                    <XTitle>Simple</XTitle>
                    <XView height={24}>{currentWord}</XView>
                    <XButton
                        text="set mention"
                        onClick={() => {
                            ref.current!.applyMention({ id: 'someid', name: 'Fabulous developer' });
                        }}
                    />
                    <XView backgroundColor="rgba(0,0,0,0.1)">
                        <XRichTextInput2 ref={ref} onCurrentWordChanged={setCurrentWord} />
                    </XView>
                </XVertical>
            </XContent>
        </DevDocsScaffold>
    );
});
