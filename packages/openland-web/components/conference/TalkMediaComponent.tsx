import * as React from 'react';
import { YQuery } from 'openland-y-graphql/YQuery';
import { ConferenceQuery } from 'openland-api';
import { TalkMediaStreamComponent } from './TalkMediaStreamComponent';
import { YApolloContext } from 'openland-y-graphql/YApolloProvider';

export interface TalkMediaComponentProps {
    id: string;
    peerId: string;
    muted: boolean;
    onStreamsUpdated: (peerId: string, streams: { [key: string]: MediaStream }) => void;
}

export interface TalkMediaComponentState {
    mediaStream?: MediaStream;
}

export class TalkMediaComponent extends React.Component<TalkMediaComponentProps, TalkMediaComponentState> {
    private _mounted = true;
    private streams: { [key: string]: MediaStream } = {};

    constructor(props: TalkMediaComponentProps) {
        super(props);
        this.state = {};
    }

    onStreamCreated = (peerId: string, stream: MediaStream) => {
        this.streams = { ...this.streams };
        this.streams[peerId] = stream;

        this.props.onStreamsUpdated(this.props.peerId, this.streams);
    }

    onStreamClosed = (peerId: string) => {
        this.streams = { ...this.streams };
        delete this.streams[peerId];

        this.props.onStreamsUpdated(this.props.peerId, this.streams);
    }

    componentDidMount() {
        navigator.mediaDevices.getUserMedia({ audio: true, video: true }).then((stream) => {
            setTimeout(
                () => {
                    if (this._mounted) {
                        if (this.props.muted) {
                            for (let t of stream.getAudioTracks()) {
                                t.enabled = false;
                            }
                        } else {
                            for (let t of stream.getAudioTracks()) {
                                t.enabled = true;
                            }
                        }
                        this.setState({ mediaStream: stream });
                    } else {
                        for (let t of stream.getTracks()) {
                            t.stop();
                        }
                    }
                },
                10);
        });
    }

    componentWillReceiveProps(nextProps: TalkMediaComponentProps) {
        if (nextProps.muted !== this.props.muted && this.state.mediaStream) {
            let stream = this.state.mediaStream!;
            if (nextProps.muted) {
                for (let t of stream.getAudioTracks()) {
                    t.enabled = false;
                }
            } else {
                for (let t of stream.getAudioTracks()) {
                    t.enabled = true;
                }
            }
        }
    }

    componentWillUnmount() {
        this._mounted = false;
        if (this.state.mediaStream) {
            for (let t of this.state.mediaStream.getTracks()) {
                t.stop();
            }
        }
    }

    render() {
        return this.state.mediaStream ? (
            <YApolloContext.Consumer>
                {apollo =>
                    <YQuery query={ConferenceQuery} variables={{ id: this.props.id }}>
                        {data => {
                            let connections = data.data!.conference.peers.filter((v) => v.connection);
                            if (connections.length === 0) {
                                return null;
                            }
                            return (
                                <>
                                    {connections.map((v) => (
                                        <TalkMediaStreamComponent
                                            apollo={apollo!}
                                            id={data.data!.conference.id}
                                            key={v.id}
                                            peerId={v.id}
                                            stream={this.state.mediaStream!}
                                            ownPeerId={this.props.peerId}
                                            connection={v.connection!}
                                            onStreamCreated={this.onStreamCreated}
                                            onStreamClosed={this.onStreamClosed}
                                        />
                                    ))}
                                </>
                            );
                        }}
                    </YQuery>
                }
            </YApolloContext.Consumer>
        ) : null;
    }
}