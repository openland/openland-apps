import * as React from 'react';
import { withApp } from '../../../components/withApp';
import { DevDocsScaffold } from './components/DevDocsScaffold';
import { XView } from 'react-mental';
import { URickInput } from 'openland-web/components/unicorn/URickInput';
import { canUseDOM } from 'openland-y-utils/canUseDOM';

export default withApp('Rick Text Input', 'viewer', props => {
    return (
        <DevDocsScaffold title="Rick Input">
            <XView
                flexDirection="column"
                paddingHorizontal={64}
            >
                {canUseDOM && <URickInput
                    placeholder="Write a message...."
                    onTextChange={(tx) => console.log(tx)}
                />}
            </XView>
        </DevDocsScaffold>
    );
});