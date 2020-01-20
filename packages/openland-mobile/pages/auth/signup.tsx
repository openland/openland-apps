import { SessionStateFull } from 'openland-api/Types';
import { SRouter } from 'react-native-s/SRouter';
import { backoff } from 'openland-y-utils/timer';
import { getClient } from '../../utils/graphqlClient';
import RNRestart from 'react-native-restart';
import { NavigationManager } from 'react-native-s/navigation/NavigationManager';
import { AppStorage as Storage } from 'openland-y-runtime/AppStorage';
import { trackEvent } from 'openland-mobile/analytics';

export const resolveNextPage = (session: SessionStateFull) => {
    if (!session.isProfileCreated) {
        return 'SignupUser';
    } else if (!session.isAccountExists) {
        return 'SignupOrg';
    } else if (!session.isActivated) {
        trackEvent('registration_complete');

        return 'Waitlist';
    } else if (session.isCompleted) {
        trackEvent('registration_complete');
        Storage.writeKey('discover_start', true).then(() => {
            RNRestart.Restart();
        }).catch(() => {
            throw new Error('start discover error');
        });
    }
    throw new Error('inconsistent state');
};

export let next: (router: SRouter | NavigationManager) => void;

export const resolveNextPageCompleteAction: (page?: string) => ((router: SRouter) => void) | undefined = (page: string) => {
    if (page === 'SignupOrg') {
        return async (router) => await next(router);
    }
    return undefined;
};

next = async (router: SRouter | NavigationManager) => {
    const res = await backoff(async () => await getClient().refetchAccount()); // TODO: Refetch!
    const nextPage = resolveNextPage(res.sessionState);
    if (nextPage) {
        router.pushAndResetRoot(nextPage, { action: resolveNextPageCompleteAction(nextPage) });
    }
};
