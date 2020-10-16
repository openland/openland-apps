import * as React from 'react';
import { withApp } from '../../../components/withApp';
import { DevDocsScaffold } from './components/DevDocsScaffold';
import { View } from 'react-native';
import { Deferred } from 'openland-unicorn/components/Deferred';
import { XLoader } from 'openland-x/XLoader';
import { useClient } from 'openland-api/useClient';

export default withApp('Pegasus', ['super-admin', 'software-developer'], props => {

    let client = useClient();
    React.useEffect(() => {
        client.subscribeWatchUpdates((e) => {
            console.warn(e);
        });
    }, []);

    return (
        <DevDocsScaffold title="Pegasus">
            <Deferred>
                <React.Suspense fallback={<XLoader loading={true} />}>
                    <View style={{ flexGrow: 1, flexShrink: 1, alignSelf: 'stretch' }}>
                        {}
                    </View>
                </React.Suspense>
            </Deferred>
        </DevDocsScaffold>
    );
});