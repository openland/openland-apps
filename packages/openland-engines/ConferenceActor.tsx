import * as React from 'react';
import { YApolloContext } from 'openland-y-graphql/YApolloProvider';
import { AppUserMedia } from 'openland-y-runtime/AppUserMedia';
import { AppMediaStream } from 'openland-y-runtime-api/AppUserMediaApi';
import { MessengerContext } from 'openland-engines/MessengerEngine';
import { ConferenceMediaActor } from './ConferenceMediaActor';

export interface TalkMediaComponentProps {
    id: string;
    peerId: string;
    muted: boolean;
}

export interface TalkMediaComponentState {
    mediaStream?: AppMediaStream;
}

function useUserAudio() {
    let [stream, setStream] = React.useState<AppMediaStream | null>(null);
    React.useEffect(() => {
        var unmounted = false;
        var loadedStream: AppMediaStream | null;
        AppUserMedia.getUserAudio().then((str) => {
            if (unmounted) {
                str.close();
            } else {
                loadedStream = str;
                setStream(str);
            }
        });
        return () => {
            unmounted = true;
            if (loadedStream) {
                loadedStream.close();
            }
        }
    }, []);

    return stream;
}

export const ConferenceActor = React.memo<TalkMediaComponentProps>((props) => {
    let apollo = React.useContext(YApolloContext);
    let conference = React.useContext(MessengerContext).client.useConference({ id: props.id }).conference;
    let stream = useUserAudio();

    // Configure stream
    if (stream) {
        stream.muted = props.muted;
    } else {
        return null;
    }

    // Find active connections
    let connections = conference.peers.filter(v => v.connection);
    if (connections.length === 0) {
        return null;
    }

    // Active connection actors
    return <>{connections.map(v => (
        <ConferenceMediaActor
            key={v.id}
            apollo={apollo!}
            conference={conference}
            connection={v.connection!}
            peerId={v.id}
            stream={stream!}
            ownPeerId={props.peerId}
        />
    ))}</>;
});