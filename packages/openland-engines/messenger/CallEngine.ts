import { MessengerEngine } from '../MessengerEngine';
import gql from 'graphql-tag';

const StartPrivateCall = gql`
    mutation StartPrivateCall($uid: ID!) {
        callStartPrivate(uid: $uid, timeout: 5000) {
            id
            caller {
                id
                name
                photo
            }
            callee {
                id
                name
                photo
            }
        }
    }
`;

class Call {
    stop = () => {
        //
    }
}

export class CallEngine {
    readonly engine: MessengerEngine;

    constructor(engine: MessengerEngine) {
        this.engine = engine;
    }

    start = async () => {
        // let settingsSubscription = this.engine.client.client.subscribe({
        //     query: SUBSCRIBE_SETTINGS
        // });
    }

    startPrivateCall = async (uid: string) => {
        let res = await this.engine.client.client.mutate(({
            mutation: StartPrivateCall,
            variables: {
                uid
            }
        }));
    }
}