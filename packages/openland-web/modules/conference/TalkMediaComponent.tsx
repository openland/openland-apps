import * as React from 'react';
import { YQuery } from 'openland-y-graphql/YQuery';
import { ConferenceQuery } from 'openland-api';
import { TalkMediaStreamComponent } from './TalkMediaStreamComponent';
import { YApolloContext } from 'openland-y-graphql/YApolloProvider';
import { AppUserMedia } from 'openland-y-runtime/AppUserMedia';
import { AppMediaStream } from 'openland-y-runtime-api/AppUserMediaApi';

export interface TalkMediaComponentProps {
    id: string;
    sessionId: string;
    peerId: string;
    muted: boolean;
    onStreamsUpdated: (peerId: string, streams: { [key: string]: MediaStream }) => void;
}

export interface TalkMediaComponentState {
    mediaStream?: AppMediaStream;
}

export class TalkMediaComponent extends React.Component<
    TalkMediaComponentProps,
    TalkMediaComponentState
    > {
    private _mounted = true;

    constructor(props: TalkMediaComponentProps) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        AppUserMedia.getUserAudio()
            .then(stream => {
                setTimeout(() => {
                    if (this._mounted) {
                        stream.muted = this.props.muted;
                        this.setState({ mediaStream: stream });
                    } else {
                        stream.close();
                    }
                }, 10);
            });
    }

    componentWillReceiveProps(nextProps: TalkMediaComponentProps) {
        if (nextProps.muted !== this.props.muted && this.state.mediaStream) {
            let stream = this.state.mediaStream!;
            stream.muted = nextProps.muted;
        }
    }

    componentWillUnmount() {
        this._mounted = false;
        if (this.state.mediaStream) {
            this.state.mediaStream.close();
        }
    }

    render() {
        return this.state.mediaStream ? (
            <YApolloContext.Consumer>
                {apollo => (
                    <YQuery query={ConferenceQuery} variables={{ id: this.props.id }}>
                        {data => {
                            let connections = data.data!.conference.peers.filter(v => v.connection);
                            if (connections.length === 0) {
                                return null;
                            }
                            return (
                                <>
                                    {connections.map(v => (
                                        <TalkMediaStreamComponent
                                            apollo={apollo!}
                                            id={data.data!.conference.id}
                                            conference={data.data!.conference}
                                            key={v.id}
                                            peerId={v.id}
                                            stream={this.state.mediaStream!}
                                            ownPeerId={this.props.peerId}
                                            connection={v.connection!}
                                        // onStreamCreated={this.onStreamCreated}
                                        // onStreamClosed={this.onStreamClosed}
                                        />
                                    ))}
                                </>
                            );
                        }}
                    </YQuery>
                )}
            </YApolloContext.Consumer>
        ) : null;
    }
}
