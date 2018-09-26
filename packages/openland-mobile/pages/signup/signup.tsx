import { SessionStateFullFragment } from 'openland-api/Types';
import { backoff } from 'openland-y-utils/timer';
import { getClient } from '../../utils/apolloClient';
import { AccountQuery } from 'openland-api';

let cachedSignupModel: SignupModel | null = null;

export function initSignupModel(session: SessionStateFullFragment, onComplete: () => void) {
    cachedSignupModel = new SignupModel(session, onComplete);

    return cachedSignupModel!!;
}
export function getSignupModel() {
    if (!cachedSignupModel) {
        throw Error('SignupModel is not inited');
    }
    return cachedSignupModel!!;
}

export class SignupModel {
    page = 'init';
    onComplete: () => void;
    constructor(session: SessionStateFullFragment, onComplete: () => void) {
        this.page = this.resolveNextPage(session);
        this.onComplete = onComplete;
    }

    next = async () => {
        let res = await backoff(async () => await getClient().client.query<any>({
            query: AccountQuery.document,
            fetchPolicy: 'network-only'
        }));
        let nextPage = this.resolveNextPage(res.data.sessionState);
        if (nextPage === 'complete') {
            this.onComplete();
        } else {
            this.page = nextPage;
        }
        return this.page;
    }

    private resolveNextPage: (session: SessionStateFullFragment) => string = (session: SessionStateFullFragment) => {
        // if (!session.isProfileCreated) {
        //     return 'SignupUser';
        // } else if (!session.isAccountExists) {
        //     return 'SignupOrg';
        // } else if (!session.isAccountActivated) {
        //     return 'Waitlist';
        // } else if (session.isCompleted) {
        //     return 'complete';
        // }
        // throw new Error('inconsistnet state');
        if (this.page === 'init') {
            return 'SignupUser';
        } else if (this.page === 'SignupUser') {
            return 'SignupOrg';
        } else if (this.page === 'SignupOrg') {
            return 'Waitlist';
        }
        return 'complete';
    }
}