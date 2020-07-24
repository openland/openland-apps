import * as React from 'react';
import { MessagesStore } from 'openland-engines/new/MessagesStore';
import { XView } from 'react-mental';
import { InvertedDiv } from './InvertedDiv';
import { XLoader } from 'openland-x/XLoader';
import { Snapshot } from 'openland-engines/new/MessageViewSnapshot';
import { StoredMessage } from 'openland-engines/new/StoredMessage';

type LoadFrom = { type: 'latest' } | { type: 'message', id: string };

const SnapshotMessagesRenderer = React.memo((props: { hasMoreNext: boolean, hasMorePrev: boolean, messages: StoredMessage[], loadFrom: LoadFrom }) => {
    return (
        <InvertedDiv>
            <XView key="header" height={100}>
                {props.hasMorePrev && <XLoader loading={true} />}
            </XView>
            {props.messages.map((m) => (
                <XView height={100} key={m.id}>
                    {m.fallback}
                </XView>
            ))}
        </InvertedDiv>
    );
});

export interface MessagesComponentProps {
    store: MessagesStore;
    loadFrom: LoadFrom;
}

export const MessagesComponent = React.memo((props: MessagesComponentProps) => {

    // Save loadFrom in memo since it could not be changed
    const loadFrom = React.useMemo(() => props.loadFrom, []);

    // Resolve snapshot view
    const snapshotView = React.useMemo(() => {
        if (loadFrom.type === 'latest') {
            return props.store.createSnapshotViewAtLatest();
        } else {
            return props.store.createSnapshotViewAt(loadFrom.id);
        }
    }, []);

    const state = snapshotView.useState();

    return (
        <XView width="100%" flexGrow={1} flexShrink={1} flexBasis={0}>
            {state.type === 'loading' && (<XLoader loading={true} />)}
            {state.type === 'no-access' && (<XView>No Access</XView>)}
            {state.type === 'messages' && (<SnapshotMessagesRenderer messages={state.messages} hasMorePrev={state.hasMorePrev} hasMoreNext={state.hasMoreNext} loadFrom={loadFrom} />)}
        </XView>
    );
});