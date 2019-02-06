import { SessionStateFull } from 'openland-api/Types';
import { SRouter } from 'react-native-s/SRouter';
import { backoff } from 'openland-y-utils/timer';
import { getClient } from '../../utils/apolloClient';
import RNRestart from 'react-native-restart';

export const resolveNextPage: (session: SessionStateFull, current: string) => string = (session: SessionStateFull, current: string) => {
    if (!session.isProfileCreated) {
        return 'SignupUser';
    } else if (!session.isAccountExists) {
        return 'NewOrganization';
    } else if (!session.isAccountActivated) {
        return 'Waitlist';
    } else if (session.isCompleted) {
        RNRestart.Restart();
        return current;
    }
    throw new Error('inconsistent state');
};

export var next: (router: SRouter) => void;

export const resolveNextPageCompleteAction: (page?: string) => ((router: SRouter) => void) | undefined = (page: string) => {
    if (page === 'NewOrganization') {
        return async (router) => await next(router);
    }
    return undefined;
};

next = async (router: SRouter) => {
    let res = await backoff(async () => await getClient().queryAccount()); // TODO: Refetch!
    let nextPage = resolveNextPage(res.sessionState, router.route);
    router.push(nextPage, { action: resolveNextPageCompleteAction(nextPage) });
};
