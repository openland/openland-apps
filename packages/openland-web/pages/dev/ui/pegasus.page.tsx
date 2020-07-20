import * as React from 'react';
import { withApp } from '../../../components/withApp';
import { DevDocsScaffold } from './components/DevDocsScaffold';
import { View } from 'react-native';
import { Deferred } from 'openland-unicorn/components/Deferred';
import { XLoader } from 'openland-x/XLoader';
import { useClient } from 'openland-api/useClient';
import { MessagesApi } from 'openland-engines/new/MessagesApi';
import { MessagesStore } from 'openland-engines/new/MessagesStore';
import { PersistenceProviderInMemory } from 'openland-engines/new/PersistenceProviderInMemory';
import { Persistence } from 'openland-engines/new/Persistence';
import { MessagesUpdates } from 'openland-engines/new/MessagesUpdates';

export default withApp('Pegasus', ['super-admin', 'software-developer'], props => {

    const client = useClient();

    const source = React.useMemo(() => {
        const chatId = '61MyVnm7Yyi3rWQzzMQEilmpYB';
        const api = new MessagesApi(client);
        let persistenceProvider = new PersistenceProviderInMemory();
        let persistence = new Persistence(persistenceProvider);
        let updates = MessagesUpdates.open(persistence, api);
        updates.onDialogsUpdates = async (events) => {
            console.log(events);
        };
        updates.onChatUpdates = async (id, events) => {
            console.log(id, events);
        };
        updates.start();
        updates.needChat(chatId);
        return updates;
        // let store = MessagesStore.open(chatId, persistence, api);
        // return store.createSourceAt('ygMVnqpDOvs4a701aaLACo9Z77');
    }, []);

    // const [store, setStore] = React.useState<MessagesStore | null>(null);
    // React.useEffect(() => {
    //     const chatId = '61MyVnm7Yyi3rWQzzMQEilmpYB';
    //     const api = new MessagesApi(client);
    //     let persistenceProvider = new PersistenceProviderInMemory();
    //     let persistence = new Persistence(persistenceProvider);
    //     MessagesStore.open(chatId, persistence, api).then((v) => {
    //         setStore(v);
    //     });
    // }, []);

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