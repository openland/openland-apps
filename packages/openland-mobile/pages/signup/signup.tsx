import * as React from 'react';
import { Platform } from 'react-native';
import { getClient } from '../../utils/apolloClient';
import { AccountQuery } from 'openland-api';
import { ZLoader } from '../../components/ZLoader';
import { backoff } from 'openland-y-utils/timer';
import { ZPictureModal } from '../../components/modal/ZPictureModal';
import { SessionStateFullFragment } from 'openland-api/Types';
import { SignupUser } from './SignupUser';
import { ASSafeAreaProvider } from 'react-native-async-view/ASSafeAreaContext';
import { SignupOrg } from './SignupOrg';
import { Waitlist } from './Waitlist';

export class Signup extends React.Component<{ initialSessionState: SessionStateFullFragment, onComplete: () => void }, { state: 'loading' | 'user' | 'org' | 'complete' | 'pending' }> {

    private ref = React.createRef<ZPictureModal>();

    constructor(props: { initialSessionState: SessionStateFullFragment, onComplete: () => void }) {
        super(props);

        this.state = {
            state: this.resolveState(props.initialSessionState)
        };
    }

    resolveState(session: SessionStateFullFragment): 'user' | 'org' | 'complete' | 'loading' | 'pending' {
        // if (!session.isProfileCreated) {
        //     return 'user';
        // } else if (!session.isAccountExists) {
        //     return 'org';
        // } else if (!session.isAccountActivated) {
        //     return 'pending';
        // } else if (session.isCompleted) {
        //     this.props.onComplete();
        // }
        // return 'loading';

        return 'pending';

    }

    next = () => {
        (async () => {
            this.setState({ state: 'loading' });
            let res = await backoff(async () => await getClient().client.query<any>({
                query: AccountQuery.document,
                fetchPolicy: 'network-only'
            }));
            this.setState({ state: this.resolveState(res.data.sessionState) });
        })();
    }

    render() {
        return (
            <>
                <ASSafeAreaProvider bottom={Platform.OS === 'ios' ? 54 : 0} top={Platform.OS === 'ios' ? 152 : 0}>
                    {this.state.state === 'loading' && <ZLoader appearance="large" />}
                    {this.state.state === 'user' && <SignupUser onComplete={this.next} />}
                    {this.state.state === 'org' && <SignupOrg onComplete={this.next} />}
                    {this.state.state === 'pending' && <Waitlist />}

                </ASSafeAreaProvider>
            </>
        );

    }
}