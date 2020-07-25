import * as React from 'react';
import { withApp } from '../../../components/withApp';
import { DevDocsScaffold } from './components/DevDocsScaffold';
import { useClient } from 'openland-api/useClient';
import { PersistenceProviderInMemory } from 'openland-engines/new/PersistenceProviderInMemory';
import { Persistence } from 'openland-engines/new/Persistence';
import { Messages } from 'openland-engines/new/Messages';
import { MessagesComponent } from 'openland-web/fragments/new/MessagesComponent';
import { XView } from 'react-mental';

export default withApp('Pegasus', ['super-admin', 'software-developer'], props => {

    const client = useClient();

    const store = React.useMemo(() => {
        const chatId = '61MyVnm7Yyi3rWQzzMQEilmpYB';
        let persistenceProvider = new PersistenceProviderInMemory();
        let persistence = new Persistence(persistenceProvider);
        let messages = new Messages(client, persistence);
        return messages.getStore(chatId);
    }, []);

    return (
        <DevDocsScaffold title="Pegasus">
            <XView height={800}>
                <MessagesComponent store={store} loadFrom={{ type: 'message', id: 'dB9xPD0Q5KtwpnR7nLbgUomZb1' }} />
            </XView>
        </DevDocsScaffold>
    );
});