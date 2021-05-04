import * as React from 'react';
import { withApp } from '../../../components/withApp';
import { DevDocsScaffold } from './components/DevDocsScaffold';
import { View } from 'react-native';
import { Deferred } from 'openland-unicorn/components/Deferred';
import { XLoader } from 'openland-x/XLoader';
import { openWebStorage } from 'openland-api/storage/openWebStorage';
// import { useClient } from 'openland-api/useClient';
// import { UpdatesEngine } from 'openland-engines/updates/UpdatesEngine';
// import { Persistence } from 'openland-engines/persistence/Persistence';
// import { InMemoryKeyValueStore } from 'openland-y-utils/InMemoryKeyValueStore';
// import { DialogState } from 'openland-engines/updates/engines/dialogs/DialogState';
// import { DialogDataSourceItem } from 'openland-engines/messenger/DialogListEngine';
// import { DialogListView } from 'openland-web/fragments/dialogs/components/DialogListView';
// import { dialogListWebDataSource } from 'openland-web/fragments/dialogs/components/DialogListWebDataSource';

// function convertItem(src: DialogState): DialogDataSourceItem {
//     return {
//         key: src.key,
//         flexibleId: src.key,
//         title: src.title,
//         photo: src.photo ? src.photo : undefined,
//         kind: src.kind === 'private' ? 'PRIVATE' : 'GROUP',

//         // Content
//         fallback: src.topMessage ? src.topMessage.fallback : '',
//         message: src.topMessage ? src.topMessage.message ? src.topMessage.message : undefined : undefined,
//         date: src.topMessage ? parseInt(src.topMessage.date, 10) : undefined,

//         // Counters
//         unread: src.counter,
//         haveMention: src.mentions > 0,

//         // Compatibility
//         membership: 'NONE'
//     };
// }

export default withApp('Pegasus', ['super-admin', 'software-developer'], props => {

    // let client = useClient();
    // let me = client.useAccount().me!.id;
    // let engine = React.useMemo(() => {
    //     let persistence = new Persistence(new InMemoryKeyValueStore());
    //     let eng = new UpdatesEngine(me, client, persistence);
    //     eng.start();
    //     return eng;
    // }, []);
    // React.useEffect(() => {
    //     return () => engine.close();
    // }, [engine]);

    // let source = React.useMemo(() => {
    //     return dialogListWebDataSource(engine.dialogs.dialogsAll.source.map((s) => convertItem(s)));
    // }, []);

    React.useMemo(() => {
        let storage = openWebStorage('pegasus', 1);
        storage.writeKey('hello-' + Math.random(), 'world');
    }, []);

    return (
        <DevDocsScaffold title="Pegasus">
            <Deferred>
                <React.Suspense fallback={<XLoader loading={true} />}>
                    <View style={{ flexGrow: 1, flexShrink: 1, alignSelf: 'stretch', minHeight: 1000 }}>
                        {/* <DialogListView source={source} /> */}
                    </View>
                </React.Suspense>
            </Deferred>
        </DevDocsScaffold>
    );
});