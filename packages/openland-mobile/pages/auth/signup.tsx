import { SessionStateFull } from 'openland-api/Types';
import { SRouter } from 'react-native-s/SRouter';
import { backoff } from 'openland-y-utils/timer';
import { getClient } from '../../utils/graphqlClient';
import RNRestart from 'react-native-restart';
import { NavigationManager } from 'react-native-s/navigation/NavigationManager';
import { trackEvent } from 'openland-mobile/analytics';

export const resolveNextPage = (session: SessionStateFull) => {
    if (!session.isProfileCreated) {
        return 'SignupUser';
    } else if (!session.isAccountExists) {
        return 'SignupOrg';
    } else if (!session.isAccountActivated) {
        trackEvent('registration_complete');

        return 'Waitlist';
    } else if (session.isCompleted) {
        trackEvent('registration_complete');

        RNRestart.Restart();
    }
    throw new Error('inconsistent state');
};

export var next: (router: SRouter | NavigationManager) => void;

export const resolveNextPageCompleteAction: (page?: string) => ((router: SRouter) => void) | undefined = (page: string) => {
    if (page === 'SignupOrg') {
        return async (router) => await next(router);
    }
    return undefined;
};

next = async (router: SRouter | NavigationManager) => {
    let res = await backoff(async () => await getClient().refetchAccount()); // TODO: Refetch!
    let nextPage = resolveNextPage(res.sessionState);
    if (nextPage) {
        router.push(nextPage, { action: resolveNextPageCompleteAction(nextPage) });
    }
};
