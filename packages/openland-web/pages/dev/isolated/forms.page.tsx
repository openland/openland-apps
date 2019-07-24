import * as React from 'react';
import { withApp } from '../../../components/withApp';
import { DevDocsScaffold } from './components/DevDocsScaffold';

import { XContent } from 'openland-x-layout/XContent';
import { XVertical2 } from 'openland-x/XVertical2';
import { XVertical } from 'openland-x-layout/XVertical';

import { XView } from 'react-mental';

export default withApp('Isolated - forms', 'viewer', props => {
    return (
        <DevDocsScaffold title="forms">
            <XContent>
                <XVertical2>
                    <XVertical width="400px">
                        <XView fontSize={20}>Edit message inline</XView>
                        {/* <EditMessageInline
                            key="foobar"
                            isComment={false}
                            minimal={false}
                            onClose={() => console.log('close')}
                            message={editFormMessage}
                            variables={{
                                roomId: gfdsgsRoom.id,
                            }}
                        /> */}
                    </XVertical>
                </XVertical2>
            </XContent>
        </DevDocsScaffold>
    );
});
