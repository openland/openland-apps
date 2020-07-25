import * as React from 'react';
import { MessagesStore } from 'openland-engines/new/MessagesStore';
import { XView } from 'react-mental';
import { InvertedDiv, ScrollValues, InvertedDivInstance } from './InvertedDiv';
import { XLoader } from 'openland-x/XLoader';
import { StoredMessage } from 'openland-engines/new/StoredMessage';

type LoadFrom = { type: 'latest' } | { type: 'message', id: string };
const EDGE_DISTANCE = 300;

const SnapshotMessagesRenderer = React.memo((props: {
    hasMoreNext: boolean,
    hasMorePrev: boolean,
    messages: StoredMessage[],
    focusSeq: number | null,
    onTopReached: () => void,
    onBottomReached: () => void
}) => {

    const ref = React.useRef<InvertedDivInstance>(null);

    const onScroll = React.useMemo(() => {
        return (values: ScrollValues) => {
            if (values.scrollTop < EDGE_DISTANCE) {
                props.onTopReached();
            }
            if (values.scrollBottom < EDGE_DISTANCE) {
                props.onBottomReached();
            }
        };
    }, []);

    React.useLayoutEffect(() => {
        let div = ref.current!;
        if (props.focusSeq !== null) {
            let index = props.messages.findIndex((v) => v.seq >= props.focusSeq!);
            if (index >= 0) {
                div.scrollToIndex(index + 1 /* Skip header view */);
            }
        }
    }, []);

    return (
        <InvertedDiv ref={ref} onScroll={onScroll} useLastItemAsPadding={true}>
            <XView key="header" height={100}>
                {props.hasMorePrev && <XLoader loading={true} />}
            </XView>
            {props.messages.map((m) => (
                <XView height={100} key={m.id} backgroundColor={m.seq === props.focusSeq ? 'red' : undefined}>
                    {m.fallback}
                </XView>
            ))}
            <XView key="footer" height={props.hasMoreNext ? 48 : 0}>
                {props.hasMoreNext && (
                    <XLoader loading={true} />
                )}
            </XView>
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
            {state.type === 'messages' && (
                <SnapshotMessagesRenderer
                    messages={state.messages}
                    hasMorePrev={state.hasMorePrev}
                    hasMoreNext={state.hasMoreNext}
                    focusSeq={state.focusSeq}
                    onTopReached={snapshotView.requestLoadPrevIfNeeded}
                    onBottomReached={snapshotView.requestLoadNextIfNeeded}
                />
            )}
        </XView>
    );
});