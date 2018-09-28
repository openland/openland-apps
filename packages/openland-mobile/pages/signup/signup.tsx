import { SessionStateFull } from 'openland-api/Types';
import { backoff } from 'openland-y-utils/timer';
import { getClient } from '../../utils/apolloClient';
import { AccountQuery } from 'openland-api';

export class SignupModel {
    page = 'init';
    onComplete: () => void;
    constructor(session: SessionStateFull, onComplete: () => void) {
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

    private resolveNextPage: (session: SessionStateFull) => string = (session: SessionStateFull) => {
        if (!session.isProfileCreated) {
            return 'SignupUser';
        } else if (!session.isAccountExists) {
            return 'NewOrganization';
        } else if (!session.isAccountActivated) {
            return 'Waitlist';
        } else if (session.isCompleted) {
            return 'complete';
        }
        throw new Error('inconsistent state');
        // for testing
        // if (this.page === 'init') {
        //     return 'SignupUser';
        // } else if (this.page === 'SignupUser') {
        //     return 'SignupOrg';
        // } else if (this.page === 'SignupOrg') {
        //     return 'Waitlist';
        // }
        // return 'complete';
    }
}

let cachedSignupModel: SignupModel | null = null;

export function initSignupModel(session: SessionStateFull, onComplete: () => void) {
    cachedSignupModel = new SignupModel(session, onComplete);

    return cachedSignupModel!!;
}
export function getSignupModel() {
    if (!cachedSignupModel) {
        throw Error('SignupModel is not inited');
    }
    return cachedSignupModel!!;
}