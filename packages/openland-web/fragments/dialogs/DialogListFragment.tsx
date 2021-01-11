import * as React from 'react';
import { XView } from 'react-mental';
import { DialogListView } from './components/DialogListView';
import { GlobalSearch_items } from 'openland-api/spacex.types';
import { dialogListWebDataSource } from './components/DialogListWebDataSource';
import { MessengerContext } from 'openland-engines/MessengerEngine';
import { DialogState } from 'openland-engines/updates/engines/dialogs/DialogState';
import { DialogDataSourceItem } from 'openland-engines/messenger/DialogListEngine';

interface DialogListFragmentProps {
    onSearchItemSelected: (a: GlobalSearch_items) => void;
    onDialogPress: (id: string) => void;
}

let enableExperiemental = true;

function convertExperimentalItem(me: string, src: DialogState): DialogDataSourceItem {
    const isOut = src.topMessage ? src.topMessage.sender.id === me : false;
    const isService = src.topMessage ? src.topMessage.__typename === 'ServiceMessage' : false;
    const sender: string | undefined = isOut ? 'You' : undefined; // TODO: Fix me
    return {
        key: src.key,
        flexibleId: src.key,
        title: src.title,
        photo: src.photo ? src.photo : undefined,
        kind: src.kind === 'private' ? 'PRIVATE' : src.kind === 'group-secret' ? 'GROUP' : 'PUBLIC',
        isPremium: src.premium,
        isChannel: src.channel,
        featured: src.featured,
        isMuted: src.muted,

        // Content
        fallback: src.topMessage ? src.topMessage.fallback : '',
        message: src.topMessage ? src.topMessage.message ? src.topMessage.message : undefined : undefined,
        date: src.topMessage ? parseInt(src.topMessage.date, 10) : undefined,
        isOut,
        isService,
        forward: src.topMessage ? src.topMessage.__typename === 'GeneralMessage' && !!src.topMessage.quotedMessages.length && !src.topMessage.message : false,
        sender,
        showSenderName: !!(src.topMessage && (isOut || src.kind !== 'private') && sender) && !isService,

        // Counters
        unread: src.counter,
        haveMention: src.mentions > 0,

        // Compatibility
        membership: 'NONE'
    };
}

export const DialogListFragment = React.memo((props: DialogListFragmentProps) => {
    let messenger = React.useContext(MessengerContext);
    const source = React.useMemo(() => dialogListWebDataSource(messenger.experimentalUpdates && enableExperiemental ? messenger.experimentalUpdates.dialogs.dialogsAll.source.map((src) => convertExperimentalItem(messenger.user.id, src)) : messenger.dialogList.dataSource), []);
    return (
        <XView flexGrow={1} flexBasis={0} backgroundColor="var(--backgroundPrimary)" contain="content">
            <DialogListView
                source={source}
                onSearchItemSelected={props.onSearchItemSelected}
                onDialogClick={props.onDialogPress}
            />
        </XView>
    );
});
