import * as React from 'react';
import { OpenApolloClient } from 'openland-y-graphql/apolloClient';
import { TalkSession } from './engine/TalkSession';
import { TalkMediaComponent } from './TalkMediaComponent';

export const TalkContext = React.createContext<{
    cid?: string,
    peerId?: string,
    state?: 'connecting' | 'online',
    joinCall: (cid: string) => Promise<void>,
    leaveCall: () => void
}>(undefined as any);

export interface TalkProviderComponentProps {
    client: OpenApolloClient;
}

export class TalkProviderComponent extends React.Component<TalkProviderComponentProps, {
    cid?: string,
    convId?: string,
    peerId?: string
}> {

    private session?: TalkSession;

    constructor(props: TalkProviderComponentProps) {
        super(props);
        this.state = {};
    }

    joinCall = async (cid: string) => {
        if (this.session) {
            this.session.close();
        }
        this.session = new TalkSession(cid, this.props.client, this.handleStateChange);
        this.setState({ cid });
    }

    private handleStateChange = (peerId: string, convId: string) => {
        this.setState({ peerId, convId });
    }

    leaveCall = () => {
        if (this.session) {
            this.session.close();
        }
        this.setState({ cid: undefined, peerId: undefined, convId: undefined });
    }

    render() {
        return (
            <TalkContext.Provider
                value={{
                    joinCall: this.joinCall,
                    leaveCall: this.leaveCall,
                    cid: this.state.cid,
                    peerId: this.state.peerId,
                    state: this.state.cid ? (this.state.peerId ? 'online' : 'connecting') : undefined
                }}
            >
                {this.state.cid && this.state.peerId && this.state.convId && (
                    <TalkMediaComponent id={this.state.cid} peerId={this.state.peerId} />
                )}
                {this.props.children}
            </TalkContext.Provider>
        );
    }
}