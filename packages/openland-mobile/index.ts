// Install fonts
import './utils/installAndroidFonts';
// Start notifications ASAP
import 'openland-y-runtime/AppNotifications';

// Disable annoying yellow box
console.disableYellowBox = true;

import { Sentry } from 'react-native-sentry';
if (!__DEV__) {
    Sentry.config('https://39d8c1bb34664416aeffd47a1faccb7a@sentry.io/1290872').install();
}

// Init static Auth0 Client just for case
import Auth0 from 'react-native-auth0';
export const Auth0Client = new Auth0({
    domain: 'auth.openland.com',
    clientId: 'v3R2Rr6D4LzzcWKHf91jwKJyDnEm4L96',
    // redirectUri: window.location.origin + '/auth/complete',
    // audience: 'https://statecraft.auth0.com/userinfo',
    // responseType: 'token id_token',
    // scope: 'openid profile email'
});

// App Root
import { AppRegistry, UIManager } from 'react-native';
// Enable layout animations on Android
if (UIManager.setLayoutAnimationEnabledExperimental) { UIManager.setLayoutAnimationEnabledExperimental(true); }
// import Routes from './routes';
import { withUpdateTracker } from './utils/UpdateTracker';
import { withGlobalLoader } from './components/ZGlobalLoader';
import { Init } from './pages/Init';
AppRegistry.registerComponent('openland', () => withUpdateTracker(withGlobalLoader(Init)));