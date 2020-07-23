import * as React from 'react';
import { withApp } from '../../../components/withApp';
import { DevDocsScaffold } from './components/DevDocsScaffold';
import { View } from 'react-native';
import { Deferred } from 'openland-unicorn/components/Deferred';
import { XLoader } from 'openland-x/XLoader';
import { useClient } from 'openland-api/useClient';
import { PersistenceProviderInMemory } from 'openland-engines/new/PersistenceProviderInMemory';
import { Persistence } from 'openland-engines/new/Persistence';
import { Messages } from 'openland-engines/new/Messages';

export default withApp('Pegasus', ['super-admin', 'software-developer'], props => {

    const client = useClient();

    const source = React.useMemo(() => {
        const chatId = '61MyVnm7Yyi3rWQzzMQEilmpYB';
        let persistenceProvider = new PersistenceProviderInMemory();
        let persistence = new Persistence(persistenceProvider);
        let messages = new Messages(client, persistence);
        let store = messages.getStore(chatId);
        return store.createSnapshotViewAtLatest();
    }, []);

    let state = source.useState();
    console.log(state);

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