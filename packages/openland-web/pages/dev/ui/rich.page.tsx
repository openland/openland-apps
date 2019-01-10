import * as React from 'react';
import { withApp } from '../../../components/withApp';
import { DevDocsScaffold } from './components/DevDocsScaffold';
import { XContent } from 'openland-x-layout/XContent';
import { XVertical } from 'openland-x-layout/XVertical';
import { XTitle } from 'openland-x/XTitle';
import { XRichTextInput2 } from 'openland-x/XRichTextInput2';
import { XView } from 'react-mental';

export default withApp('UI Framework - Rich Input', 'viewer', props => {
    let [currentWord, setCurrentWord] = React.useState<string | undefined>(undefined);
    return (
        <DevDocsScaffold title="Rich Input">
            <XContent>
                <XVertical>
                    <XTitle>Simple</XTitle>
                    <XView height={24}>
                        {currentWord}
                    </XView>
                    <XView backgroundColor="rgba(0,0,0,0.1)">
                        <XRichTextInput2 onCurrentWordChanged={setCurrentWord} />
                    </XView>
                </XVertical>
            </XContent>
        </DevDocsScaffold>
    );
});
