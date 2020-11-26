import * as React from 'react';
import { withApp } from '../../../components/withApp';
import { DevDocsScaffold } from './components/DevDocsScaffold';
import { View } from 'react-native';
import { Deferred } from 'openland-unicorn/components/Deferred';
import { XLoader } from 'openland-x/XLoader';
import { useClient } from 'openland-api/useClient';
import { UpdatesEngine } from 'openland-engines/updates/UpdatesEngine';
import { Persistence } from 'openland-engines/persistence/Persistence';
import { InMemoryKeyValueStore } from 'openland-y-utils/InMemoryKeyValueStore';

export default withApp('Pegasus', ['super-admin', 'software-developer'], props => {

    let client = useClient();
    React.useEffect(() => {
        let persistence = new Persistence(new InMemoryKeyValueStore());
        let engine = new UpdatesEngine(client, persistence);
        engine.start();
        return () => engine.close();
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