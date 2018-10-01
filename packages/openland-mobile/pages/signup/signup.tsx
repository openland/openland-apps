import { SessionStateFull } from 'openland-api/Types';
import { SRouter } from 'react-native-s/SRouter';
import { backoff } from 'openland-y-utils/timer';
import { getClient } from '../../utils/apolloClient';
import { AccountQuery } from 'openland-api';
import { AppUpdateTracker } from '../../utils/UpdateTracker';
import { Alert } from 'react-native';

export const resolveNextPage: (session: SessionStateFull, current: string) => string = (session: SessionStateFull, current: string) => {    
    if (!session.isProfileCreated) {
        return 'SignupUser';
    } else if (!session.isAccountExists) {
        return 'NewOrganization';
    } else if (!session.isAccountActivated) {
        return 'Waitlist';
    } else if (session.isCompleted) {
        AppUpdateTracker.restartApp();
        return current;
    }
    throw new Error('inconsistent state');
};

export const resolveNextPageCompleteAction: (page?: string) => ( (router: SRouter) => void) | undefined = (page: string) => {
    if (page === 'NewOrganization') {
        return async (router) => await next(router);
    }
    return undefined;
};

export const next = async (router: SRouter) => {
    let res = await backoff(async () => await getClient().client.query<any>({
        query: AccountQuery.document,
        fetchPolicy: 'network-only'
    }));
    let nextPage = resolveNextPage(res.data.sessionState, router.route);
    router.push(nextPage, { action: resolveNextPageCompleteAction(nextPage) });
};
