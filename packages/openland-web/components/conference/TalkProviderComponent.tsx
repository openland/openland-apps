import * as React from 'react';
import { OpenApolloClient } from 'openland-y-graphql/apolloClient';
import { TalkSession } from './engine/TalkSession';
import { TalkMediaComponent } from './TalkMediaComponent';
import UUID from 'uuid/v4';

export const TalkContext = React.createContext<{
    cid?: string;
    peerId?: string;
    state?: 'connecting' | 'online';
    muted?: boolean;
    streams?: { [key: string]: MediaStream };
    toggleMute: () => void;
    joinCall: (cid: string) => Promise<void>;
    leaveCall: () => void;
}>(undefined as any);

export interface TalkProviderComponentProps {
    client: OpenApolloClient;
}

export class TalkProviderComponent extends React.Component<
    TalkProviderComponentProps,
    {
        cid?: string;
        convId?: string;
        peerId?: string;
        sessionId?: string;
        muted: boolean;
        streams?: { [key: string]: MediaStream };
    }
    > {
    private session?: TalkSession;

    constructor(props: TalkProviderComponentProps) {
        super(props);
        this.state = { muted: false };
    }

    joinCall = async (cid: string) => {
        if (this.session) {
            this.session.close();
        }
        let sessionId = UUID();
        this.session = new TalkSession(
            sessionId,
            cid,
            this.props.client,
            this.handleStateChange,
        );
        this.setState({ cid, sessionId });
    };

    private handleStateChange = (peerId: string, convId: string) => {
        this.setState({ peerId, convId });
    };

    private handleStreamsUpdated = (
        peerId: string,
        streams: { [key: string]: MediaStream },
    ) => {
        if (this.state.peerId === peerId) {
            this.setState({ streams });
        }
    };

    leaveCall = () => {
        if (this.session) {
            this.session.close();
        }
        this.setState({ cid: undefined, peerId: undefined, convId: undefined });
    };

    toggleMute = () => {
        this.setState({ muted: !this.state.muted });
    };

    render() {
        return (
            <TalkContext.Provider
                value={{
                    joinCall: this.joinCall,
                    leaveCall: this.leaveCall,
                    toggleMute: this.toggleMute,
                    cid: this.state.cid,
                    peerId: this.state.peerId,
                    muted: this.state.muted,
                    state: this.state.cid
                        ? this.state.peerId
                            ? 'online'
                            : 'connecting'
                        : undefined,
                }}
            >
                {this.state.cid &&
                    this.state.peerId &&
                    this.state.convId &&
                    this.state.sessionId && (
                        <TalkMediaComponent
                            id={this.state.cid}
                            peerId={this.state.peerId}
                            muted={this.state.muted}
                            sessionId={this.state.sessionId}
                            onStreamsUpdated={this.handleStreamsUpdated}
                        />
                    )}
                {this.props.children}
            </TalkContext.Provider>
        );
    }
}
